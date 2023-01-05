import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import _ from "lodash";
import TextFiled from "./textField";

const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(null);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState("");

    const [users, setUsers] = useState(0);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

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
        setSearch("");
    };
    const handleReset = () => {
        setSelectedProf(null);
    };
    const handelSort = (item) => {
        setSortBy(item);
    };
    const handelSearch = ({ target }) => {
        setSearch(target.value);
        setSelectedProf(null);
    };
    const searchRegex = new RegExp(`${search}`);
    if (users) {
        // const searchUsers = users.filter((user) => searchRegex.test(user.name.toLowerCase()));
        // console.log(searchUsers);
        const filteredUsers = selectedProf
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users.filter((user) => searchRegex.test(user.name.toLowerCase()));
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
                    <TextFiled value={search} type={"text"} name={"search"} onChange={handelSearch} />
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
