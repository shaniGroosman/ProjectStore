import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { checkUser, addUser } from "../api/userService";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // const userExists = await checkUser(data);
        
        // if (userExists) {
        //     alert("משתמש כבר קיים");
        //     navigate("/LogIn");
        // } else {
            addUser(data)
                .then((res) => {
                    alert("משתמש נוסף בהצלחה");
                    navigate("/LogIn");
                })
                .catch((err) => {
                    console.log(err);
                    alert(err.response.data.message );
                });
        
    };
    
    return (
        <div style={{ maxWidth: "300px", margin: "auto", textAlign: "center" }}>
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username</label>
                    <input type="text" {...register("username", { required: "Username is required" })} />
                    <p style={{ color: "red" }}>{errors.username?.message}</p>
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format"
                            }
                        })}
                    />
                    <p style={{ color: "red" }}>{errors.email?.message}</p>
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                    />
                    <p style={{ color: "red" }}>{errors.password?.message}</p>
                </div>

                <button type="submit">SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;
