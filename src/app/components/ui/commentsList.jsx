import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments }) => {
    console.log("comments", comments);
    return <>
        {comments && comments.map((comment) =>
            <Comment key={comment._id} {...comment}/>)
        }
    </>;
};
CommentsList.propTypes = {
    comments: PropTypes.array
};
export default CommentsList;
