import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/commentService";
const CommentContext = React.createContext();

export const useComment = () => {
    return useContext(CommentContext);
};
export const CommentProvider = ({ children }) => {
    const { userId } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    async function createComment(data) {
        const comment = {
            ...data,
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
            _id: nanoid()
        };
        try {
            const { content } = await commentService.createComment(comment);
            setComments(prevState => [...prevState, content]);
        } catch (error) {
            catchError(error);
        }
    }
    async function getComments() {
        try {
            const { content } = await commentService.getComment(userId);
            setComments(content);
        } catch (error) {
            catchError(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function removeComment(id) {
        try {
            const { content } = await commentService.removeComment(id);
            if (content === null) {
                setComments(prevState =>
                    prevState.filter((c) => c._id !== id)
                );
            }
        } catch (error) {
            catchError(error);
        }
    }
    useEffect(() => {
        getComments();
    }, [userId]);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    const catchError = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    return (
        <CommentContext.Provider value={{ isLoading, comments, createComment, removeComment }}>
            { children }
        </CommentContext.Provider>
    );
};
CommentProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
