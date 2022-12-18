import React,{useState} from "react";
import api from "../api"
const Users=()=>{
    const [users,setUsers]=useState(api.users.fetchAll());
    const renderPhrase=(number)=>{
        const lastOne = Number(number.toString().slice(-1))
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    }
    const handelDelete=(userId)=>
        setUsers(users.filter((user)=>user._id!==userId))
    return <>
        <h2>
            <span
                className={"m-1 badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
            >
                    {users.length > 0
                        ? `${users.length + " " + renderPhrase(users.length)} с тобой сегодня`
                        : "Никто с тобой не тусанет"}
                </span>
        </h2>
        {users.length>0&&<table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Кнопка</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user)=>(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map((item)=>
                        <span key={item.id} className={"badge m-1 bg-"+item.color}>
                            {item.name}
                        </span>)}
                    </td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td>
                        <button
                            className={"btn btn-danger"}
                            onClick={()=>{handelDelete(user._id)}}>удалить</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        }
    </>
}
export default Users