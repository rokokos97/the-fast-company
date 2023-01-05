import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import _ from "lodash";

const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState(0);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handelDelete = (id) => {
        setUsers(users.filter((filteredUser) => filteredUser._id !== id));
        setCurrentPage(1);
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
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleProfessionSelect = (item) => {
        if (searchQuery !== "")setSearchQuery("");
        setSelectedProf(item);
    };
    const handleReset = () => {
        setSelectedProf(null);
    };
    const handelSort = (item) => {
        setSortBy(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSearchQuery(target.value);
        setSelectedProf(null);
    };
    if (users) {
        const filteredUsers = searchQuery
            ? users.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf
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
                    <SearchStatus usersNumber={count}/>
                    <div>
                        <input
                            type="text"
                            name={searchQuery}
                            placeholder={"Search..."}
                            onChange={handleSearchQuery}
                            value={searchQuery}
                            className={"w-100 p-1 m-2"}
                        />
                    </div>
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
    return <h1 className={"m-2"}>Loading...</h1>;
};
UsersList.propTypes = {
    users: PropTypes.array
};
export default UsersList;
