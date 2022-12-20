import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemCont, pageSize } = props;
  const pageCount = Math.ceil(itemCont / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <>
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li key={"page_" + page} className="page-itam">
              <a href="#" className="page-link">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
