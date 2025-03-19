import axios from "axios";
import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, TextField, Box, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deledeCart } from "../features/cartSlice";
import { addOrder } from "../api/orderService.js";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import "./EndOrder.css";

const steps = ["פרטי משלוח", "תשלום", "אישור הזמנה"];

export default function EndOrder() {
    const [activeStep, setActiveStep] = useState(0);
    const [openPopup, setOpenPopup] = useState(false);
    const user = useSelector(state => state.user.currentUser);
    const arrCart = useSelector(state => state.cart.arr);
    const sum = useSelector(state => state.cart.sum);
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const navigate = useNavigate();
    const disp = useDispatch();

    // חישוב תאריכים
    const today = new Date().toLocaleDateString();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    const formattedDeliveryDate = deliveryDate.toLocaleDateString();

    const { control, handleSubmit, formState: { errors }, trigger, reset, setValue, watch } = useForm({
        mode: "onTouched",
        defaultValues: { fullName: "", email: "", address: "" }
    });

    useEffect(() => {
        if (user) reset({ fullName: user.userName || "", email: user.email || "", address: user.address || "" });
    }, [user, reset]);
    useEffect(() => {
        window.scrollTo(0, 0); // מגלגל את הדף למעלה בכל שינוי של activeStep
    }, [activeStep]);

    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid && activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => setActiveStep((prev) => prev - 1);
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
    });

    const handleInputChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handleFocus = (e) => {
        setCardData({ ...cardData, focus: e.target.name });
    };

    const onSubmit = async (data) => {
        const orderData = {
            address: data.address,
            userId: user._id,
            products: arrCart.map(product => ({
                product: product,
                count: product.qty
            })),
            price: sum,
            finalPrice: sum,
        };

        try {
            await addOrder(orderData, user?.token);
            console.log("ההזמנה נשמרה בהצלחה");
            setOpenPopup(true);
        } catch (error) {
            console.error("אירעה שגיאה בהגשה:", error);
        }
        if (err.response?.status === 401) {
            alert("⛔ עליך להתחבר כדי להשלים הזמנה!");
            navigate("/login"); // ✅ הפניה לדף התחברות
        }

    };

    return (
        <Box className="end-order-container" >
            <Box sx={{ width: "100%", maxWidth: 600, margin: "auto", mt: 4 }} className="end-order-stepper">
                <Stepper activeStep={activeStep} alternativeLabel sx={{ direction: "ltr" }}>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ mt: 3 }}>
                    {/* שלב 1 - פרטי משלוח */}
                    {activeStep === 0 && (
                        <Box  >
                            <Typography variant="h6" sx={{ mb: 2 }}>פרטי משלוח</Typography>

                            <form style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                <TextField
                                    type="text"
                                    name="fullName"
                                    label="Full Name *"
                                    variant="outlined"
                                    value={watch("fullName")}
                                    onChange={(e) => setValue("fullName", e.target.value)}
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                    fullWidth
                                />

                                <TextField
                                    type="email"
                                    name="email"
                                    label="Email *"
                                    variant="outlined"
                                    value={watch("email")}
                                    onChange={(e) => setValue("email", e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    fullWidth
                                />

                                <TextField
                                    type="text"
                                    name="address"
                                    label="Shipping Address *"
                                    variant="outlined"
                                    value={watch("address")}
                                    onChange={(e) => setValue("address", e.target.value)}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    fullWidth
                                />
                            </form>

                            <Box className="end-order-buttons">
                                <Button variant="contained" onClick={handleNext}>המשך</Button>
                            </Box>
                        </Box>
                    )}
                    {activeStep === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2 }}>אמצעי תשלום</Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                <Cards
                                    number={cardData.number}
                                    name={cardData.name}
                                    expiry={cardData.expiry}
                                    cvc={cardData.cvc}
                                    focused={cardData.focus} // 👈 חשוב! זה מה שגורם להיפוך
                                />
                            </Box>

                            <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <TextField
                                    type="tel"
                                    name="number"
                                    label="מספר כרטיס"
                                    variant="outlined"
                                    value={cardData.number}
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                    fullWidth
                                />
                                <TextField
                                    type="text"
                                    name="name"
                                    label="שם בעל הכרטיס"
                                    variant="outlined"
                                    value={cardData.name}
                                    onChange={handleInputChange}
                                    onFocus={handleFocus}
                                    fullWidth
                                />
                                <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>

                                    <TextField
                                        type="text"
                                        name="expiry"
                                        label="תאריך תפוגה (MM/YY)"
                                        variant="outlined"
                                        value={cardData.expiry}
                                        onChange={handleInputChange}
                                        onFocus={handleFocus}
                                        fullWidth
                                    />
                                    <TextField
                                        type="tel"
                                        name="cvc"
                                        label="CVC"
                                        variant="outlined"
                                        value={cardData.cvc}
                                        onChange={handleInputChange}
                                        onFocus={handleFocus}
                                        fullWidth
                                    />
                                </Box>
                            </form>

                            <Box className="end-order-buttons">
                                <Button onClick={handleBack}>חזור</Button>
                                <Button variant="contained" onClick={handleNext}>המשך</Button>
                            </Box>
                        </Box>
                    )}


                    {/* שלב 2 - אישור הזמנה */}
                    {activeStep === 2 && (
                        <Box >
                            <Typography variant="h6" sx={{ mb: 2 }}>Order Confirmation</Typography>

                            {arrCart.map(order => (
                                <Box key={order._id} className="order-item">
                                    {/* תמונה - משמאל */}
                                    <Box style={{ position: "relative" }}>
                                        <span className="order-qty">{order.qty}</span>

                                        <img
                                            src={`${order.img}${order.name}.jpg`}
                                            onError={(e) => e.currentTarget.src = `${order.img}${order.name}.png`}
                                            alt={order.name}
                                        />
                                        {/* עיגול כמות */}
                                    </Box>

                                    {/* שם המוצר - במרכז */}
                                    <Typography className="order-name">{order.name}</Typography>

                                    {/* מחיר - בצד ימין */}
                                    <Typography className="order-price">₪{order.price} </Typography>
                                </Box>
                            ))}

                            {/* סה"כ מחיר */}
                            <Typography className="total-price" sx={{ fontWeight: "bold", mt: 2, fontSize: "25px" }}>סה"כ לתשלום: ₪{sum} </Typography>

                            {/* כפתורים */}
                            <Box className="end-order-buttons">
                                <Button onClick={handleBack}>חזור</Button>
                                <Button variant="contained" color="success" onClick={handleSubmit(onSubmit)}>סיום</Button>
                            </Box>
                        </Box>
                    )}


                </Box>

                {/* Popup Confirmation */}
                <Dialog
                    open={openPopup}
                    onClose={() => setOpenPopup(false)}
                    sx={{ "& .MuiDialog-paper": { width: "500px", direction: "rtl" } }} // הגדרת רוחב + כיוון ימין לשמאל
                >
                    <DialogTitle sx={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "1.5rem" }}>
                        ההזמנה נקלטה בהצלחה
                    </DialogTitle>

                    <DialogContent>
                        <Typography><strong>מספר הזמנה:</strong> {orderNumber}</Typography>
                        <Typography><strong>ההזמנה נקלטה בתאריך:</strong> {today}</Typography>
                        <Typography><strong>תגיע בתאריך:</strong> {formattedDeliveryDate}</Typography>
                        <Typography><strong>לכתובת:</strong> {watch("address")}</Typography>
                        <Typography sx={{ mt: 2, fontWeight: "bold" }}>תודה ולהתראות! </Typography>
                    </DialogContent>

                    <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button
                            variant="contained"
                            color="black"
                            onClick={() => {
                                disp(deledeCart());
                                navigate("/home");
                            }}
                        >
                            לדף הבית
                        </Button>

                        <Button
                            variant="contained"
                            color="black"
                            onClick={() => {
                                disp(deledeCart());
                                navigate("/MyOrder");
                            }}
                        >
                            צפייה בהזמנה
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Box >

    );
}
