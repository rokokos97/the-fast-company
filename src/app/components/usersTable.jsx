import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onDelete,
    onToggleBookMark
}) => {
    const columns = {
        name: { path: "name", name: "Name" },
        qualities: {
            name: "Qualities",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Profession" },
        completedMeetings: { path: "completedMeetings", name: "Meets" },
        rate: { path: "rate", name: "Rate" },
        bookmark: {
            path: "bookmark",
            name: "Bookmark",
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className={"btn btn-danger"}
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        >
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody data={users} {...{ columns }} />
        </Table>
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
