import axios from "axios";

// const baseUrl="https://nodeproject-i0da.onrender.com/api/user"
const baseUrl = "http://localhost:4040/api/user"


export const checkUser = (data) => {
    return axios.post(`${baseUrl}/login`, data);
};



export const  addUser=(user)=>{
    return axios.post(`${baseUrl}`, user)
};

export const login = (userName, password) => {
    return axios.post(`${baseUrl}/login`, { userName, password });
};
