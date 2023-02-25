import React from "react";
import { useParams, Redirect } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import EditUserPage from "../components/page/editUserPage";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../store/users";
import UsersLoader from "../components/ui/HOC/usersLoader";
const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    console.log(userId);
    const currentUserId = useSelector(getCurrentUser());
    return (
        <>
            <UsersLoader>
                {userId
                    ? (edit
                        ? (userId === currentUserId)
                            ? <EditUserPage/>
                            : <Redirect to={`/users/${currentUserId}/edit`}/>
                        : <UserPage userId={userId} />)
                    : <UsersListPage />
                }
            </UsersLoader>
        </>
    );
};
export default Users;
