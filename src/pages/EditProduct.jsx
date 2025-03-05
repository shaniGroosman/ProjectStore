import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductById, update } from "../api/productServer";
import { updateCartProduct } from "../features/cartSlice";

const ingredientsList = ["Sugar", "Salt", "Flour", "Butter", "Eggs", "Milk", "Chocolate"];

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: "",
            description: "",
            img: "",
            price: "",
            date: "",
            ingredient: []
        }
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                alert("Invalid product ID");
                navigate("/home");
                return;
            }

            try {
                const response = await getProductById(id);
                reset({
                    name: response.data.name,
                    description: response.data.description,
                    img: response.data.img,
                    price: response.data.price,
                    date: response.data.date ? response.data.date.split("T")[0] : "",
                    ingredient: response.data.ingredient || []
                });
                setLoading(false);
            } catch {
                alert("Failed to load product data");
                navigate("/home");
            }
        };

        fetchProduct();
    }, [id, reset, navigate]);

    const onSubmit = async (data) => {
        if (!id) {
            alert("Error: Product ID is missing!");
            return;
        }

        const updatedData = {
            ...data,
            ingredient: Array.isArray(data.ingredient) ? data.ingredient : [data.ingredient]
        };

        try {
            await update(id, updatedData);
            localStorage.setItem(`product_${id}`, JSON.stringify(updatedData));
            dispatch(updateCartProduct({ id, updatedData }));
            alert("Product updated successfully!");
            navigate("/home");
        } catch {
            alert("Error updating product");
        }
    };

    if (loading) return <p>Loading product details...</p>;

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                    <label>Product Name</label>
                    <input type="text" {...register("name", { required: "Product Name is required" })} />
                    <p style={{ color: "red" }}>{errors.name?.message}</p>
                </div>

                <div>
                    <label>Description</label>
                    <textarea {...register("description")}></textarea>
                </div>

                <div>
                    <label>Image URL</label>
                    <input type="text" {...register("img")} />
                </div>

                <div>
                    <label>Price</label>
                    <input type="number" step="0.01" {...register("price")} />
                </div>

                <div>
                    <label>Date</label>
                    <input type="date" {...register("date")} />
                </div>

                <div>
                    <label>Ingredients (Select multiple)</label>
                    <select {...register("ingredient")} multiple>
                        {ingredientsList.map((ing) => (
                            <option key={ing} value={ing}>
                                {ing}
                            </option>
                        ))}
                    </select>
                </div>

                <input type="submit" value="Update Product" />
            </form>
        </div>
    );
};

export default EditProduct;
