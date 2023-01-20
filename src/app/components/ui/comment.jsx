import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { displayTime } from "../../utils/displayTime";

const Comment = ({ content, created_at: create, _id: id, userId, onDelete }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
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
                                            { }
                                            {displayTime(create)}
                                        </span>
                                    </p>
                                    <button className="btn btn-sm text-primary d-flex align-items-center" onClick={() => { onDelete(id); }}>
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
    onDelete: PropTypes.func,
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.string,
    userId: PropTypes.string
};
export default Comment;
