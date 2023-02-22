import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionByIds, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionByIds(id));
    if (!professionLoading) {
        return (
            <p>{prof.name}</p>
        );
    } else {
        return "loading...";
    }
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
