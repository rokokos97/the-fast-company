import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table, { TableBody, TableHeader } from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark }) => {
    const columns = {
        name: {
            path: "name",
            name: "Name",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Qualities",
            component: (user) => (<Qualities qualities={user.qualities}/>)
        },
        profession: {
            name: "Profession",
            component: (user) => (<Profession id={user.profession}/>)
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Meets"
        },
        rate: {
            path: "rate",
            name: "Rate"
        },
        bookmark: {
            path: "bookmark",
            name: "Bookmark",
            component: (user) => (
                <Bookmark
                    status={ user.bookmark }
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        }
    };
    return (
        <Table selectedSort={selectedSort} onSort={onSort} columns={columns} data={users}>
            <TableHeader selectedSort={selectedSort} onSort={onSort} columns={columns}/>
            <TableBody data={users} columns={columns}/>
        </Table>);
};

UserTable.propTypes = {
    selectedSort: PropTypes.object,
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};
export default UserTable;
