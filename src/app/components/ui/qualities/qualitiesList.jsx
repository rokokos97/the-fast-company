import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualitiesIdList }) => {
    const { qualities } = useQualities();

    return <>
        {qualitiesIdList.map((qualityId) => {
            const quality = qualities.find((qual) => qual._id === qualityId);
            return <Qualitie key={quality._id} {...quality} />;
        })
        }
    </>;
};
QualitiesList.propTypes = {
    qualitiesIdList: PropTypes.array.isRequired
};
export default QualitiesList;
