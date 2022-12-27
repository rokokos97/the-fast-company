import React from "react";
import PropTypes from "prop-types";

const SortArrow = ({ selectedSort }) => {
    console.log("selectedSort arrow", selectedSort.order);
    return <i className={"bi bi-caret-" + (selectedSort.order === "asc" ? "up" : "down") + "-fill"}></i>;
};
SortArrow.propTypes = {
    selectedSort: PropTypes.object.isRequired
};
export default SortArrow;
