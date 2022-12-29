import React from "react";
import PropTypes from "prop-types";

const TableBody = ({ items, columns }) => {
    console.log("items", items);
    console.log("columns", columns);
    return (
        <tbody>
            <tr>{Object.keys(columns).map((c) => (
                <td key={c}>{columns[c].name}</td>
            ))}</tr>
            {/* {items.map((item) => ( */}
            {/*    <User key={item._id} onDelete={onDelete} onToggleBookMark={onToggleBookMark} {...item}/> */}
            {/* ))} */}
        </tbody>
    );
};
TableBody.propTypes = {
    items: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    columns: PropTypes.object
};
export default TableBody;
