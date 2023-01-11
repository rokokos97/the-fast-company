import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push(`/users/${userId}/edit`);
    };
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="card text-center col-md-6 offset-md-3">
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">Profession: {user.profession.name}</p>
                                <p className="card-text"><QualitiesList qualities={user.qualities} /></p>
                                <p className="card-text">completedMeetings: {user.completedMeetings}</p>
                                <p className="card-text">Rate: {user.rate}</p>
                                <button className={"btn btn-primary w-100 wx-auto"} onClick={handleClick}>Edit info</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
