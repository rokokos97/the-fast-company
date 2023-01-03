import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserCard = ({ user }) => {
    const history = useHistory();
    const handelReset = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <>
                <div className="card w-50 m-2">
                    <h4 className="card-header">{user.name}</h4>
                    <div className="card-body">
                        <h5 className="card-title">profession: {user.profession.name} </h5>
                        <h5 className="card-title">qualities: {<QualitiesList qualities={user.qualities}/>} </h5>
                        <h5 className="card-title">rate: {user.rate}</h5>
                        <h5 className="card-title">c: {user.rate}</h5>
                        <button className="btn btn-primary" onClick={handelReset}>All Users</button>
                    </div>
                </div>
            </>
        );
    }
    return <h1 className={"m-3"}>Loading...</h1>;
};
UserCard.propTypes = {
    user: PropTypes.object
};
export default UserCard;
