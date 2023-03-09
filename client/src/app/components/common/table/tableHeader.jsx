import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handelSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const renderSortArrow = (selectedSort, currentPath) => {
        if (currentPath === selectedSort.path) {
            return (
                <i
                    className={"bi bi-caret-" + (selectedSort.order === "asc"
                        ? "up"
                        : "down") + "-fill"}>
                </i>);
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={columns[column].path
                            ? () => handelSort(columns[column].path)
                            : undefined}
                        role={columns[column].path
                            ? "button"
                            : ""}
                        scope="col">{columns[column].name} {renderSortArrow(selectedSort, columns[column].path)}</th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
