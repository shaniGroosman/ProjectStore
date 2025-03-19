import axios from "axios";

// const baseUrl = "http://localhost:4040/api/order"
const baseUrl = "https://nodeproject-i0da.onrender.com/api/order"


export const addOrder = (data, token) => {
    return axios.post(`${baseUrl}`, data, {
        headers: {
            authorization: token
        }
    });
};

export const getByUserId = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}
export const getAllOrders = () => {
    return axios.get(baseUrl )
}
export const updateStatusOrder=(id)=>{
    return axios.put(`${baseUrl}/${id}`)
}