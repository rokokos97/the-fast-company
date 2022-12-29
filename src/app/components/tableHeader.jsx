import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.iter === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>{Object.keys(columns).map((column) => (
                <th
                    key={column}
                    onClick={columns[column].iter ? () => handleSort(columns[column].iter) : undefined}
                    scope="col"
                    role={columns[column].iter ? "button" : null}
                >{columns[column].name}</th>))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object
};
export default TableHeader;
