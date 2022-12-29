import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import RenderPhrase from "./renderPhrase";
import UsersTable from "./usersTable";
import _ from "lodash";

function Users() {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [users, setUsers] = useState(null);
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handelDelete = (id) => {
        setUsers(users.filter((filteredUser) => filteredUser._id !== id));
    };
    const handelBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
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
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        // useEffect(() => {
        //     if (usersCrop.length === 0) setCurrentPage(1);
        // }, [usersCrop]);
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
                    <RenderPhrase usersNumber={count}/>
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handelDelete}
                            onToggleBookMark={handelBookmark}
                        />
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
    } else {
        return <h1>Loading...</h1>;
    }
    ;
}

Users.propTypes = {
    users: PropTypes.array
};
export default Users;
