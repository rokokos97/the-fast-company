import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';
import PropTypes from 'prop-types';

const User = ({
  id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qual) => (
          <Qualitie key={qual._id} {...qual} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <BookMark status={bookmark} onClick={() => onToggleBookMark(_id)} />
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          delete
        </button>
      </td>
    </tr>
  );
};
User.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  qualities: PropTypes.string,
  profession: PropTypes.string,
  completedMeetings: PropTypes.number,
  rate: PropTypes.number,
  onDelete: PropTypes.func.isRequired,
  bookmark: PropTypes.bool,
  onToggleBookMark: PropTypes.func,
};
export default User;
