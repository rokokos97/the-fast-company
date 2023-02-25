import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionService from "../services/professionService";
const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};
export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessionsList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    const getProfession = (id) => {
        return professions.find((prof) => prof._id === id);
    };
    const getProfessionsList = async () => {
        try {
            const professions = await professionService.get();
            console.log(professions);
            setProfessions(professions.content);
            setIsLoading(false);
        } catch (error) {
            catchError(error);
        }
    };
    const catchError = (error) => {
        const { message } = error.response.data;
        setError(message);
    };
    return (
        <ProfessionContext.Provider value={{ isLoading, professions, getProfession }}>
            { children }
        </ProfessionContext.Provider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
