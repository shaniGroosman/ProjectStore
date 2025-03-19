import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userService";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";
import { TextField, Button, Box, Typography, Paper, Link, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        login(data.userName, data.password)
            .then((res) => {
                dispatch(userIn(res.data));
                navigate("/home");

            })
            .catch(() => {
                setLoginError("שם משתמש או סיסמה שגויים, נסה שוב.");
                reset();
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#f5f5f5"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "20%",
                    maxWidth: 400
                }}
            >
                <Typography variant="h5" gutterBottom>
                    התחברות
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="שם משתמש"
                            variant="outlined"
                            {...register("userName", { required: "יש להזין שם משתמש" })}
                            error={!!errors.userName}
                            helperText={errors.userName?.message}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            label="סיסמה"
                            variant="outlined"
                            {...register("password", {
                                required: "יש להזין סיסמה",
                                minLength: { value: 6, message: "הסיסמה חייבת להכיל לפחות 6 תווים" },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                    {loginError && (
                        <Typography color="error" variant="body2" gutterBottom>
                            {loginError}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" sx={{ backgroundColor: "red", color: "white" }} fullWidth>
                        התחבר
                    </Button>

                    <Typography variant="body2" sx={{ mt: 2 }}>
                        עדיין לא נרשמתם?{" "}
                        <Link
                            href="/SignUp"
                            underline="hover"
                            sx={{
                                color: "red",
                                "&:hover": { color: "black" }
                            }}
                        >
                            הירשמו כאן
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default LogIn;
