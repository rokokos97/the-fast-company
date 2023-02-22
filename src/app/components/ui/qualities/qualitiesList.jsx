import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useSelector } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus } from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return "loading quality...";
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    return <>
        {qualitiesList.map((qual) => (
            <Quality key={qual._id} {...qual} />
        ))}
    </>;
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;
