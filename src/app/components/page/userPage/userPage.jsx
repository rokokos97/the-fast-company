import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";
import MeetingCard from "../../ui/meetingCard";
import CommentsCard from "../../ui/commentsCard";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user}/>
                            <QualitiesCard data={user.qualities}/>
                            <MeetingCard value={user.completedMeetings}/>
                        </div>
                        <div className="col-md-8">
                            <CommentsCard/>
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
