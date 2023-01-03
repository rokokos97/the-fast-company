import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../components/pagination";
import { paginate } from "../components/utils/paginate";
import api from "../api";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/userTable";
import _ from "lodash";
import { useParams } from "react-router-dom";
import UserCard from "../components/userCard";

const Users = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const { userId } = useParams();

    const [users, setUsers] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        api.users.getUserById(userId).then((data) => setUser(data));
    }, [userId]);
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
    const handelSort = (item) => {
        setSortBy(item);
    };
    console.log(user);
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        // useEffect(() => {
        //     if (usersCrop.length === 0) setCurrentPage(1);
        // }, [usersCrop]);
        return (
            user
                ? <UserCard user={user}/>
                : <div className={"d-flex flex-shrink-0"}>
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
                        <SearchStatus usersNumber={count}/>
                        {(count > 0) && (
                            <UserTable
                                users={usersCrop}
                                onSort={handelSort}
                                selectedSort={sortBy}
                                onDelete={handelDelete}
                                onToggleBookMark={handelBookmark}/>
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
    return <h1 className={"m-3"}>Loading...</h1>;
};
Users.propTypes = {
    users: PropTypes.array
};
export default Users;
