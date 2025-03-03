import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productServer";

const categories = ["Electronics", "Clothing", "Food", "Books", "Toys"]; // קטגוריות לדוגמה
const ingredientsList = ["Sugar", "Salt", "Flour", "Butter", "Eggs", "Milk", "Chocolate"]; // מרכיבים לדוגמה

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate(); // לנווט לעמוד הבית אחרי הוספת מוצר

    const onSubmit = async (data) => {
        // הפיכת המרכיבים והקטגוריות למערכים
        const formattedData = {
            ...data,
            ingredient: Array.isArray(data.ingredient) ? data.ingredient : [data.ingredient]
        };

        addProduct(formattedData)
            .then(() => {
                alert("מוצר נוסף בהצלחה");
                navigate("/home");
                reset();
            })
            .catch((err) => {
                console.log(err);
                alert(err.response?.data?.message || "שגיאה בהוספת המוצר");
            });
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Add New Product</h2>
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
                    <select {...register("ingredient")} multiple style={{ height: "100px" }}>
                        {ingredientsList.map((ing) => (
                            <option key={ing} value={ing}>{ing}</option>
                        ))}
                    </select>
                </div>

                <input type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddProduct;
