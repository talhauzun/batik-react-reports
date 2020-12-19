import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5001/",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("token")
  }
});