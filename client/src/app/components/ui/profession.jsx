import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionsByIds } from "../../store/professions";

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionsByIds(id));
    if (!profession) return "loading...";
    return <p>{profession.name}</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
