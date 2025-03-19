import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productServer";
import { useSelector } from "react-redux";
import {
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Typography,
    Box
} from "@mui/material";

const categories = ["תוספות", "סלטים", "סנדוויצים"]; // קטגוריות לדוגמה
const ingredientsList = ["Sugar", "Salt", "Flour", "Butter", "Eggs", "Milk", "Chocolate"]; // מרכיבים לדוגמה

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset
    } = useForm();

    const user = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            ingredient: Array.isArray(data.ingredient) ? data.ingredient : [data.ingredient]
        }; console.log("Data being sent:", formattedData);


        addProduct(formattedData, user?.token)
            .then(() => {
                alert("מוצר נוסף בהצלחה!");
                navigate("/home");
                reset();
            })
            .catch((err) => {
                console.log(err);
                alert(err.response?.data?.message || "שגיאה בהוספת המוצר");
            });
    };

    return (
        <Box
            sx={{
                maxWidth: "500px",
                margin: "auto",
                padding: "20px",
                boxShadow: 3,
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" sx={{ mb: 2, color: "#333" }}>
                הוספת מוצר חדש
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "15px" ,marginBottom: "10px"}}>
                {/* שם המוצר */}
                <TextField
                    label="שם המוצר"
                    {...register("name", { required: "חובה להזין שם מוצר" })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />

                {/* תיאור המוצר */}
                <TextField
                    label="תיאור המוצר"
                    multiline
                    rows={3}
                    {...register("description")}
                />

                {/* כתובת תמונה */}
                <TextField
                    label="קישור לתמונה"
                    {...register("img")}
                />

                {/* מחיר */}
                <TextField
                    label="מחיר"
                    {...register("price", { required: "חובה להזין שם מוצר" })}
                    error={!!errors.name}

                    type="number"
                />

                {/* תאריך */}
                {/* תאריך */}
                <TextField
                    label="תאריך"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register("date")}
                    defaultValue={new Date().toISOString().split("T")[0]} // הגדרת תאריך ברירת מחדל להיום
                />
                {/* בחירת קטגוריה */}
                <FormControl fullWidth>
                    <InputLabel>קטגוריה</InputLabel>
                    <Select
                        {...register("category", { required: "חובה לבחור קטגוריה" })}
                        defaultValue=""
                        error={!!errors.category}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.category && <Typography color="error">{errors.category.message}</Typography>}
                </FormControl>

                {/* בחירת מרכיבים */}
                <FormControl fullWidth>
                    <InputLabel>מרכיבים</InputLabel>
                    <Select
                        multiple
                        value={Array.isArray(watch("ingredient")) ? watch("ingredient") : []}
                        onChange={(e) => setValue("ingredient", e.target.value)}
                    >
                        {ingredientsList.map((ing) => (
                            <MenuItem key={ing} value={ing}>
                                {ing}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                {/* כפתור שליחה */}
                <Button variant="contained" color="black" type="submit">
                    הוסף מוצר
                </Button>
            </form>
        </Box >
    );
};

export default AddProduct;
