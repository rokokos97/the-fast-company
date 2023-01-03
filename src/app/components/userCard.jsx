import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ id }) => {
    return (
        <>
            <div className="card" style="width: 18rem;">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
                <div className="card-footer">
                    Card footer
                </div>
            </div>
        </>
    );
};
UserCard.propTypes = {
    id: PropTypes.string
};
export default UserCard;
