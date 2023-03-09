import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { initialize, status, progress, error } = useMockData();
    const handleClick = () => {
        console.log("clicked");
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1>Main page</h1>
            <h3>Initial data in FireBase</h3>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}%</li>
                {error && <li>Error: {error}</li>}
            </ul>
            <button className={"btn btn-primary"} onClick={handleClick}>
                {" "}
                Initial
            </button>
        </div>
    );
};

export default Main;
