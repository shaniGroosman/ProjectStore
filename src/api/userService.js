import axios from "axios";

const baseUrl="https://nodeproject-i0da.onrender.com/api/user"

export const checkUser = (data) => {
    return axios.post(`${baseUrl}/login`, data);
};




export const  addUser=(user)=>{
    return axios.post(`${baseUrl}`, user)
};

export const login = (username,password) => {
    return axios.post(`${baseUrl}/login`,{username,password:password});
}