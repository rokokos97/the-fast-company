import React from "react";
import PropTypes from "prop-types";

function Bookmark({ status, ...rest }) {
    return (
        <button {...rest} type="button" className="btn btn-outline-danger">
            <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>
        </button>
    );
}
Bookmark.propTypes = {
    status: PropTypes.bool
};
export default Bookmark;
