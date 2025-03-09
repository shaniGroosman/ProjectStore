import axios from "axios";

const baseUrl = "http://localhost:4040/api/order"

export const addOrder = (data) => {
    return axios.post(`${baseUrl}`, data);
};

export const getByUserId = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}