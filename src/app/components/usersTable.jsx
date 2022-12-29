import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UsersTable = ({ users, onSort, selectedSort, onDelete, onToggleBookMark }) => {
    const columns = {
        name: { iter: "name", name: "Name" },
        qualities: { name: "Qualities" },
        profession: { iter: "profession.name", name: "Profession" },
        completedMeetings: { iter: "completedMeetings", name: "Meets" },
        rate: { iter: "rate", name: "Rate" },
        bookmark: { iter: "bookmark", name: "Bookmark" },
        delete: {}
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }}/>
            <TableBody
                items={users}
                {...{ onDelete, onToggleBookMark, columns }}
            />
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};
export default UsersTable;
