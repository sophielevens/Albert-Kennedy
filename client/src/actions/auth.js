import axios from "axios";
import history from "../history";

export const registerUser = values => {
  return dispatch => {
    axios
      .post("/signup", values)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        history.push("/success");
      })
      .catch(console.log);
  };
};

export const signinUser = values => {
  return dispatch => {
    axios
      .post("/signin", values)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        history.push("/profile");
      })
      .catch(console.log);
  };
};
