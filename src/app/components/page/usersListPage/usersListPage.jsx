import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import { paginate } from "../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/userTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions";

const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const { users } = useUser();
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const professions = useSelector(getProfessions());
    const { currentUser } = useAuth();
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handelDelete = (userId) => {
        // setUsers(users.filter((filteredUser) => filteredUser._id !== userId));
        setCurrentPage(1);
    };
    const handelBookmark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
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
    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf
                ? data.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                )
                : data;
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    return (
        <div className={"d-flex flex-shrink-0"}>
            <div className={"d-flex flex-column p-2"}>
                {professions && !professionsLoading && (
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                        onResat={handleReset}
                    />
                )}
            </div>
            <div className={"vw-100 px-4"}>
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
};

UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;
