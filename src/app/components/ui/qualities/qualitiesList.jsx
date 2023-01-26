import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (!isLoading) {
        return <>
            {qualities.map((qual) => (
                <Quality key={qual} id={qual} />
            ))}
        </>;
    } else {
        return "loading quality";
    }
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;
