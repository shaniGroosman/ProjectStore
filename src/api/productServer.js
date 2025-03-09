import axios from "axios";

// const baseUrl = "https://nodeproject-i0da.onrender.com/api/product"
const baseUrl = "http://localhost:4040/api/product"

export const getAllProduct = (numPage) => {
    return axios.get(baseUrl+"?page="+numPage+"&limit=2");
};
export const getTotalPages = () => {
    return axios.get(`${baseUrl}/totalCount?limit=2`);
};

export const getProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
};

export const addProduct = (product) => {
    return axios.post(`${baseUrl}`, product ,{Headers:{
        authorization:token
    }

    });
   
};

export const update = (id, updateData) => {
    return axios.put(`${baseUrl}/${id}`, updateData);
};

export const deleteProduct = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}



// קבלת מוצר לפי ID
// export const getProductById = async (id) => {
//     if (!id) throw new Error("getProductById: Missing product ID");

//     try {
//         const response = await axios.get(`${baseUrl}/${id}`);
//         return response;
//     } catch (error) {
//         console.error("Error in getProductById:", error);
//         throw error;
//     }
// };

// עדכון מוצר לפי ID
// export const update = async (id, updatedData) => {
//     if (!id) throw new Error("update: Missing product ID");

//     try {
//         const response = await axios.put(`${baseUrl}/${id}`, updatedData);
//         return response;
//     } catch (error) {
//         console.error("Error in update:", error);
//         throw error;
//     }
// };
