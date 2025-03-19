import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProductById, update } from "../api/productServer";
import {
    TextField, Button, Select, MenuItem, InputLabel,
    FormControl, Typography, Box, Stack
} from "@mui/material";

const categories = ["תוספות", "סלטים", "סנדוויצים"]; // קטגוריות לדוגמה
const ingredientsList = ["Sugar", "Salt", "Flour", "Butter", "Eggs", "Milk", "Chocolate"];

const EditProduct = () => {
    const user = useSelector(state => state.user.currentUser);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
        defaultValues: {
            name: "",
            description: "",
            img: "",
            price: "",
            date: "",
            category: "",
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

                // **עדכון הקטגוריה לברירת המחדל**
                setValue("category", response.data.category || "");

                setLoading(false);
            } catch {
                alert("Failed to load product data");
                navigate("/home");
            }
        };

        fetchProduct();
    }, [id, reset, navigate, setValue]);

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
            console.log("🔵 Sending update request...", updatedData);
            await update(id, updatedData, user?.token);
            alert("Product updated successfully!");
            navigate("/home");
        } catch (error) {
            console.error("🚨 Error updating product:", error);
            alert("Error updating product");
        }
    };

    if (loading) return <p>Loading product details...</p>;

    const watchIngredients = watch("ingredient") || [];
    const watchCategory = watch("category"); // **הוספנו מעקב אחר הקטגוריה**

    return (
        <Box sx={{
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            boxShadow: 3,
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
            mt: 5,
        }}>
            <Typography variant="h4" sx={{ mb: 2, color: "#333" }}>
                עריכת מוצר
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <TextField label="שם המוצר" {...register("name", { required: "חובה להזין שם מוצר" })}
                    error={!!errors.name} helperText={errors.name?.message} />

                <TextField label="תיאור המוצר" multiline rows={3} {...register("description")} />

                <TextField label="קישור לתמונה" {...register("img")} />

                <TextField label="מחיר" type="number" {...register("price")} />

                <TextField label="תאריך" type="date" InputLabelProps={{ shrink: true }} {...register("date")} />

                {/* בחירת קטגוריה */}
                <FormControl fullWidth>
                    <InputLabel>קטגוריה</InputLabel>
                    <Select
                        {...register("category", { required: "חובה לבחור קטגוריה" })}
                        value={watchCategory || ""}
                        onChange={(e) => setValue("category", e.target.value)}
                        error={!!errors.category}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                        ))}
                    </Select>
                    {errors.category && <Typography color="error">{errors.category.message}</Typography>}
                </FormControl>

                {/* בחירת מרכיבים */}
                <FormControl fullWidth>
                    <InputLabel>מרכיבים</InputLabel>
                    <Select
                        multiple
                        value={Array.isArray(watchIngredients) ? watchIngredients : []}
                        onChange={(e) => setValue("ingredient", e.target.value)}
                    >
                        {ingredientsList.map((ing) => (
                            <MenuItem key={ing} value={ing}>{ing}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* כפתורי שליחה וביטול בשורה אחת */}
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="contained"
                        sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}
                        type="submit">
                        עדכן מוצר
                    </Button>

                    <Button variant="contained"
                        sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}
                        onClick={() => navigate("/home")}>
                        ביטול
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default EditProduct;
