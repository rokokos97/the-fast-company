import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../api";

const Comment = ({ content, created_at: create, id_: id, userId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    console.log("user", user);
    return <> { user &&
        <div className="bg-light card-body  mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start ">
                        <img
                            src="https://avatars.dicebear.com/api/avataaars/qweqwdas"
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
                                            {create}
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
