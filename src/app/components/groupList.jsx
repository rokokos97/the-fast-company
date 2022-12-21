import React from "react";
import PropTypes from "prop-types";
const GroupList = ({
    items,
    contentProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
    onResat
}) => {
    console.log(items);
    return (
        <>
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        key={items[item][contentProperty]}
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(items[item])}
                        role={"button"}
                    >
                        {items[item][valueProperty]}
                    </li>
                ))}
            </ul>
            <button className={"btn btn-secondary m-2"} onClick={onResat}>
                Reset
            </button>
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: "name",
    contentProperty: "_id"
};

GroupList.propTypes = {
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object,
    onResat: PropTypes.func
};
export default GroupList;
