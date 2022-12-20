import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const handelPageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const usersCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {usersCrop.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemCont={count}
        pageSize={pageSize}
        onPageChange={handelPageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default Users;
