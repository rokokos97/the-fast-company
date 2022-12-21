import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";
import RenderPhrase from "./components/renderPhrase";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handelDelete = (id) => {
        setUsers(users.filter((filteredUser) => filteredUser._id !== id));
    };
    const handelBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
        // const userIndex = users.findIndex(user=>user._id===id)
        // const bookmarkUsers=[...users]
        // bookmarkUsers[userIndex].bookmark=!bookmarkUsers[userIndex].bookmark
        // setUsers(bookmarkUsers)
    };
    return (
        <>
            <RenderPhrase usersNumber={users.length} />
            <Users
                users={users}
                onDelete={handelDelete}
                onToggleBookMark={handelBookmark}
            />
        </>
    );
}

export default App;
