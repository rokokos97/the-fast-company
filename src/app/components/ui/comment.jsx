import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";

const Comment = ({ content, created_at: create, id_: id, userId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const commentLeft = (timeStamp) => {
        const timePassed = Date.now() - timeStamp;
        console.log(timePassed);
        if (timePassed < 1000 * 60) { return "1 minutes left"; }
        if (timePassed > 1000 * 60 && timePassed < 1000 * 60 * 5) { return " - 5 minutes left"; }
        if (timePassed > 1000 * 60 * 5 && timePassed < 1000 * 60 * 10) { return " - 10 minutes left"; }
        if (timePassed > 1000 * 60 * 10 && timePassed < 1000 * 60 * 30) { return " - 30 minutes left"; }
        if (timePassed > 1000 * 60 * 60 && timePassed < 1000 * 60 * 60 * 24) { return " - day left"; }
        if (timePassed > 1000 * 60 * 60 * 24 && timePassed < 1000 * 60 * 60 * 24 * 31) { return " - month left"; }
        if (timePassed > 1000 * 60 * 60 * 24 * 31 && timePassed < 1000 * 60 * 60 * 24 * 31) { return " - few month left"; }
        if (timePassed > 1000 * 60 * 60 * 24 * 31 * 12) { return " - more then year left"; }
    };
    console.log(commentLeft(create));
    return <> { user &&
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                Math.random() + 1
                            )
                                .toString(36)
                                .substring(7)}.svg`}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1 ">
                                        {user.name}
                                        <span className="small">
                                            {commentLeft(create)}
                                        </span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <p className="small mb-0">{content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    </>;
};
Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.string,
    id_: PropTypes.string,
    userId: PropTypes.string
};
export default Comment;
