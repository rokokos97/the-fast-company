import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRouth = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    return <Route
        {...rest}
        render={(props) => {
            if (!currentUser) {
                return <Redirect
                    to= {{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }}
                />;
            }
            return Component
                ? <Component { ...props }/>
                : children;
        }}
    />;
};
ProtectedRouth.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default ProtectedRouth;
