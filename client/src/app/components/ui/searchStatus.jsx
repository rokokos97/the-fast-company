import React from "react";
import PropTypes from "prop-types";

function SearchStatus({ usersNumber }) {
    const renderBadgeClass = () => (usersNumber > 0 ? "primary" : "danger");
    const renderPhrase = (number) => {
        switch (number) {
            case 0:
                return "No one";
            case 1:
                return "Only one person";
            default:
                return `${number}`;
        }
    };
    return (
        <span
            className={`badge bg-${renderBadgeClass()} m-2`}
        >{`${renderPhrase(usersNumber)} hang out with you tonight`}</span>
    );
}
SearchStatus.propTypes = {
    usersNumber: PropTypes.number
};
export default SearchStatus;
