import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import _ from "lodash";
import CommentsList from "./commentsList";

const CommentsCard = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    console.log(comments);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);
    const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
    console.log(sortedComments);
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
                    <CommentsList comments={sortedComments}/>
                </div>
            </div>}
    </>;
};

export default CommentsCard;
