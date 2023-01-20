import React from "react";
import SelectedField from "../common/form/selectedFild";

const AddComment = () => {
    return <>
        <SelectedField
            label={"User"}
            name={"name"}
            defaultOption={"Choose..."}
            options={name}/>
    </>;
};

export default AddComment;
