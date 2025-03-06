import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userService";
import { useDispatch } from "react-redux";
import { userIn } from "../features/userSlice";

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

    const onSubmit = async (data) => {
        login(data.userName, data.password)
            .then((res) => {
                dispatch(userIn(res.data));
                navigate("/home");
            })
            .catch((err) => {
                setLoginError("שם משתמש או סיסמה שגויים, נסה שוב.");
                reset(); // מאפס את השדות בטופס
            });
    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>UserName</label>
                    <input type="text" {...register("userName", { required: "Username is required" })} />
                    <p style={{ color: "red" }}>{errors.username?.message}</p>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                            validate: (value) => {
                                const hasFourNumbers = (value.match(/\d/g) || []).length >= 4;
                                const hasTwoLetters = (value.match(/[a-zA-Z]/g) || []).length >= 2;
                                if (!hasFourNumbers) return "Password must contain at least 4 numbers";
                                if (!hasTwoLetters) return "Password must contain at least 2 letters";
                                return true;
                            }
                        })}
                    />
                    <p style={{ color: "red" }}>{errors.password?.message}</p>
                </div>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LogIn;