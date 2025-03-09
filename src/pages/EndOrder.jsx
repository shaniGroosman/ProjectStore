import axios from "axios";
import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, TextField, Box, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { deledeCart } from "../features/cartSlice";
import {addOrder}   from "../api/orderService.js"


const steps = ["פרטי משלוח", "פרטי תשלום", "אישור הזמנה"];

export default function EndOrder() {
    const [activeStep, setActiveStep] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const user = useSelector(state => state.user.currentUser);
    const arrCart = useSelector(state => state.cart.arr);
    const cnt = useSelector(state => state.cart.count);
    const sum = useSelector(state => state.cart.sum);
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const navigate = useNavigate();
    const disp = useDispatch();
    // חישוב תאריכים
    const today = new Date().toLocaleDateString();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString();

    const [cardData, setCardData] = useState({
        number: "", name: "", expiry: "", cvc: "", focus: "",
    });

    useEffect(() => {
        const savedCard = JSON.parse(localStorage.getItem("savedCard"));
        if (savedCard) setCardData(savedCard);
    }, []);

    const { control, handleSubmit, formState: { errors }, trigger, reset, setValue, watch } = useForm({
        mode: "onTouched",
        defaultValues: { fullName: "", email: "", address: "", number: "", name: "", expiry: "", cvc: "" }
    });

    useEffect(() => {
        if (user) reset({ fullName: user.userName || "", email: user.email || "", address: user.address || "" });
    }, [user, reset]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedCardData = { ...cardData, [name]: value };

        setCardData(updatedCardData);
        setValue(name, value);
        trigger(name);
        localStorage.setItem("savedCard", JSON.stringify(updatedCardData));
    };

    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid) setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);

    const onSubmit = async (data) => {
        const orderData = {
            address: data.address,
            userId: user._id, // או נתון מתאים אחר של המשתמש
            products: arrCart.map(product => ({
                product: product, // יש לוודא שהמוצר נמצא בצורה הנכונה
                count: product.qty
            })),
            price: sum,
            finalPrice: sum, // אם יש הנחות או שינויים אחרים תעדכן כאן
        };

        try {
            const response = await addOrder(orderData);  // שליחה לשרת
            console.log("ההזמנה נשמרה בהצלחה", response.data);
            setOpenPopup(true); // הצגת פופאפ אחרי הצלחה
            localStorage.removeItem("savedCard"); // לא לשכוח לנקות את הנתונים
        } catch (error) {
            console.error("אירעה שגיאה בהגשה:", error);
            // הצגת הודעת שגיאה במקרה של בעיה
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
            </Stepper>

            <Box sx={{ mt: 3 }}>
                {/* שלב 1 - פרטי משלוח */}
                {activeStep === 0 && (
                    <Box component="form">
                        <Typography variant="h6" sx={{ mb: 2 }}>Shipping Information</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="fullName"
                                    control={control}
                                    rules={{ required: "שדה חובה" }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Full Name *" fullWidth
                                            error={!!errors.fullName} helperText={errors.fullName?.message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{ required: "שדה חובה", pattern: { value: /^\S+@\S+$/i, message: "כתובת מייל לא תקינה" } }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Email *" fullWidth
                                            error={!!errors.email} helperText={errors.email?.message} />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="address"
                                    control={control}
                                    rules={{ required: "שדה חובה" }}
                                    render={({ field }) => (
                                        <TextField {...field} label="Shipping Address *" fullWidth
                                            error={!!errors.address} helperText={errors.address?.message} />
                                    )}
                                />
                            </Grid>
                        </Grid>

                        <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>Continue</Button>
                    </Box>
                )}

                {/* שלב 2 - פרטי תשלום */}
                {activeStep === 1 && (
                    <Box component="form">
                        <Typography variant="h6" sx={{ mb: 2 }}>Payment Details</Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                            <Cards {...cardData} />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField name="number" label="Card Number" fullWidth value={cardData.number} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="name" label="Cardholder Name" fullWidth value={cardData.name} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name="expiry" label="Expiry (MM/YY)" fullWidth value={cardData.expiry} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name="cvc" label="CVV" fullWidth value={cardData.cvc} onChange={handleInputChange} />
                            </Grid>
                        </Grid>

                        <Button onClick={handleBack} sx={{ mt: 2 }}>Back</Button>
                        <Button variant="contained" onClick={handleNext} sx={{ mt: 2, ml: 2 }}>Continue</Button>
                    </Box>
                )}

                {/* שלב 3 - אישור הזמנה */}
                {activeStep === 2 && (
                    <Box>
                        <Typography variant="h6">Order Confirmation</Typography>
                        {arrCart.map(order => (
                        <li key={order._id}>{order.name}   {order.qty} *{order.price}</li>))}
                        <Typography>Total: {sum} ₪</Typography>

                        <Button onClick={handleBack} sx={{ mt: 2 }}>Back</Button>
                        <Button variant="contained" color="success"
                            onClick={() => {
                                handleSubmit(onSubmit)(); // הפעלת טופס
                                // הצגת התראה
                            }}
                            sx={{ mt: 2, ml: 2 }}>Confirm</Button>
                    </Box>
                )}
            </Box>

            {/* Popup Confirmation */}
            <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
                <DialogTitle>ההזמנה נקלטה בהצלחה 🎉</DialogTitle>
                <DialogContent>
                    <Typography>מספר הזמנה: {orderNumber}</Typography>
                    <Typography>ההזמנה נקלטה בתאריך: {today}</Typography>
                    <Typography>תגיע בתאריך: {formattedDeliveryDate}</Typography>
                    <Typography>לכתובת: {watch("address")}</Typography>
                    <Typography>תודה ולהתראות! 😊</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        disp(deledeCart()); // מחיקת עגלת הקניות
                        navigate("/home"); // ניווט לדף הבית
                    }}
                    >לדף הבית</Button>
                    <Button onClick={() => {
                        disp(deledeCart()); // מחיקת עגלת הקניות
                        navigate("/MyOrder"); // ניווט לדף הבית
                    }}>צפייה בהזמנה</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
