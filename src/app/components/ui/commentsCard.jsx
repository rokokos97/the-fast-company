import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import _ from "lodash";
import CommentsList from "./commentsList";

const CommentsCard = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);
    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    const handleDelete = (id) => {
        api.comments.remove(id).then((data) => setComments(comments.filter((comment) => comment._id !== data)));
        console.log(id);
    };
    return <>
        <div className="card mb-2">
            {" "}
            <div className="card-body ">
                add comment
            </div>
        </div>
        {sortedComments.length > 0 &&
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr/>
                    <CommentsList comments={sortedComments} onDelete={handleDelete}/>
                </div>
            </div>}
    </>;
};

export default CommentsCard;
