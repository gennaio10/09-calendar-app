import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartDeleted = () => {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().calendar.activeEvent;
      const resp = await fetchConToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventStartUpdated = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();

      if (body.ok) {
        const { eventosUsuario } = body;
        const events = prepareEvents(eventosUsuario);
        dispatch(eventLoaded(events));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventstartAddNew = (event) => {
  return async (dispatch, getState) => {
    try {
      const { title, start, end, notes } = event;
      const resp = await fetchConToken(
        "events",
        { title, start, end, notes },
        "POST"
      );
      const body = await resp.json();
      if (body.ok) {
        const { eventoGuardado } = body;
        const { uid, name } = getState().auth;
        dispatch(
          eventAddNew({
            ...event,
            id: eventoGuardado.id,
            user: {
              _id: uid,
              name: name,
            },
          })
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: body.msg,
          toast: true,
          timer: 5000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventLogout = () => {
  return {
    type: types.eventLogout,
  };
};
