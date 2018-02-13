import {
  TOPICS,
  MENTOR,
  AVAILIBILTY,
  APT_TIME,
  MENTORLIST,
  USER_APTS
} from "./types";
import history from "../history";
import axios from "axios";

export const updateTopics = values => {
  history.push("/mentors");
  return {
    type: TOPICS,
    payload: values
  };
};

export const updateMentor = value => {
  history.push("/schedule");
  return {
    type: MENTOR,
    payload: value.mentor
  };
};

export const fetchAvailibilites = mentor => {
  return dispatch => {
    axios.get(`/getavailabilities?mentor=${mentor}`).then(res => {
      dispatch({
        type: AVAILIBILTY,
        payload: res.data
      });
    });
  };
};

export const fetchMentors = () => {
  return dispatch => {
    axios
      .get("/getmentordata")
      .then(res => {
        dispatch({
          type: MENTORLIST,
          payload: res.data
        });
      })
      .catch(error => console.log(error));
  };
};

export const updateAptTime = (value, loggedin) => {
  localStorage.setItem("endOfFlow", "finished");
  if (loggedin) {
    history.push("/success");
  } else {
    history.push("/register");
  }
  return {
    type: APT_TIME,
    payload: value
  };
};

export const fetchAppointments = () => {
  return dispatch => {
    axios
      .get("/getappointments", {
        headers: { authorization: localStorage.getItem("token") }
      })
      .then(res => {
        dispatch({
          type: USER_APTS,
          payload: res.data
        });
      });
  };
};
