import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onDelete }) => {
    return <>
        {comments && comments.map((comment) =>
            <Comment key={comment._id} {...comment} onDelete={onDelete}/>)
        }
    </>;
};
CommentsList.propTypes = {
    onDelete: PropTypes.func,
    comments: PropTypes.array
};
export default CommentsList;
