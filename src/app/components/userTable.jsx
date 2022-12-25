import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UserTable = ({ users, onSort, selectedSort }) => {
    const columns = {
        name: { path: "name", name: "Name" },
        qualities: { name: "Qualities" },
        profession: { path: "profession.name", name: "Profession" },
        completedMeetings: { path: "completedMeetings", name: "Meets" },
        rate: { path: "rate", name: "Rate" },
        bookmark: { path: "bookmark", name: "Bookmark" },
        delete: {}
    };
    return (
        <table className="table">
            <TableHeader selectedSort={selectedSort} onSort={onSort} columns={columns}/>
            <TableBody data={users} columns={columns}/>
        </table>
    );
};

UserTable.propTypes = {
    selectedSort: PropTypes.object,
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func
};
export default UserTable;