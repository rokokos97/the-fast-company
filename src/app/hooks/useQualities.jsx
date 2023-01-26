import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/qualityService";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualitiesContext = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
};
export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getQualities = async () => {
            try {
                const qualities = await qualityService.get();
                setQualities(qualities.content);
                setIsLoading(false);
            } catch (error) {
                const { message } = error.response.data;
                toast.error(message);
                setError(message);
            }
        };
        getQualities();
    }, []);
    const catchError = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    const getQuality = (id) => {
        return qualities.find((quality) => quality._id === id);
    };
    const addQuality = async (data) => {
        try {
            const { content } = await qualityService.create(data);
            setQualities(prevState => [...prevState, content]);
            return content;
        } catch (error) {
            catchError(error);
        }
    };
    const deleteQuality = async (id) => {
        try {
            const { content } = await qualityService.delete(id);
            setQualities(prevState => {
                return prevState.filter((item) => item._id !== content._id);
            });
            return content;
        } catch (error) {
            catchError(error);
        }
    };
    const updateQuality = async ({ _id: id, ...data }) => {
        try {
            const { content } = await qualityService.update(id, data);
            setQualities(prevState => prevState.map((item) => {
                if (item._id === content._id) {
                    return content;
                }
                return item;
            }));
            return content;
        } catch (error) {
            catchError(error);
        }
    };
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    return <QualitiesContext.Provider value={
        {
            qualities,
            getQuality,
            updateQuality,
            addQuality,
            deleteQuality
        }
    }>
        {!isLoading
            ? children
            : <h1>Qualities Loading...</h1>
        }
    </QualitiesContext.Provider>;
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
