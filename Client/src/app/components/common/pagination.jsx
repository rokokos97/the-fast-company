import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

function Pagination({ countItem, pageSize, onPageChange, currentPage }) {
    const pageCount = Math.ceil(countItem / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);
    return (
        <nav>
            <ul className="pagination pagination-lg justify-content-center">
                {pages.map((page) => (
                    <li
                        key={`page_${page}`}
                        className={`page-item${
                            page === currentPage ? " active" : ""
                        }`}
                    >
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
Pagination.propTypes = {
    countItem: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};
export default Pagination;
