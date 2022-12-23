import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import RenderPhrase from "./renderPhrase";

function Users({ users: allUsers, ...rest }) {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handleReset = () => {
        setSelectedProf(null);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter(
            (user) =>
                JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
        )
        : allUsers;
    const count = filteredUsers.length;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);
    useEffect(() => {
        if (usersCrop.length === 0) setCurrentPage(1);
    }, [usersCrop]);
    return (
        <div className={"d-flex flex-shrink-0"}>
            <div className={"d-flex flex-column p-2"}>
                {professions && (
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                        onResat={handleReset}
                        // contentProperty="_id"
                        // valueProperty="name"
                    />
                )}
            </div>
            <div className={"vw-100"}>
                <RenderPhrase usersNumber={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Qualities</th>
                                <th scope="col">Profession</th>
                                <th scope="col">Meets</th>
                                <th scope="col">Rate</th>
                                <th scope="col">Bookmark</th>
                                <th scope="col" />
                            </tr>
                        </thead>
                        <tbody>
                            {usersCrop.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                        </tbody>
                    </table>
                )}
                <Pagination
                    countItem={count}
                    pageSize={pageSize}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
}

Users.propTypes = {
    users: PropTypes.array
};
export default Users;
