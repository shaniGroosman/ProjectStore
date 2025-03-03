import axios from "axios";

const baseUrl = "https://nodeproject-i0da.onrender.com/api/product"

export const getAllProduct = () => {
    return axios.get(baseUrl)
}

export const getProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}

export const addProduct = (product) =>{
    return axios.post(`${baseUrl}`, product);
}