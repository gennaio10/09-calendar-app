import React from "react";
import { useDispatch } from "react-redux";
import { eventDeleted } from "../../actions/events";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleClickDeleted = () => {
    dispatch(eventDeleted());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleClickDeleted}>
      <i className="fas fa-trash"></i>
    </button>
  );
};
