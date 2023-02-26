import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList from "../common/comments/commentsList";
import AddCommentForm from "../common/comments/addCommentForm";
import { useComment } from "../../hooks/useComment";
import { useDispatch, useSelector } from "react-redux";
import { getComments, getCommentsLoadingStatus, loadCommentsList } from "../../store/comments";

const Comments = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList());
    }, []);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments);
    const { createComment, removeComment } = useComment();
    const handleSubmit = (data) => {
        createComment(data);
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return <>
        <div className="card mb-2">
            {" "}
            <div className="card-body ">
                <AddCommentForm onSubmit={handleSubmit} />
            </div>
        </div>
        {sortedComments.length > 0 && (
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {!isLoading
                        ? <CommentsList
                            comments={sortedComments}
                            onRemove={handleRemoveComment}
                        />
                        : "Loading"
                    }
                </div>
            </div>
        )}
    </>;
};
export default Comments;
