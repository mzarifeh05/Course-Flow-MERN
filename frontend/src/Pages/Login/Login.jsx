import React, { useState } from 'react';
import style from './Login.module.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios'

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.email) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
        if (!formData.password) tempErrors.password = "Password is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validate()) return;

        try {
            const res = await api.post("/login", formData);

            localStorage.setItem("token", res.data.token);

            navigate("/");
        } catch (err) {
            if (err.response && err.response.data) {
                setServerError(err.response.data.message || "Login failed");
            } else {
                setServerError("Server error or no connection");
            }
        }
    };

    return (
        <div className={style.pageContainer}>
            <div className={style.formContainer}>
                <img src={logo} alt="Logo" className={style.logo} />
                <h2>Welcome Back</h2>
                <p className={style.subtitle}>Login to continue your learning journey</p>

                {serverError && <p className={style.errorMsg}>{serverError}</p>}

                <form onSubmit={handleSubmit}>
                    <div className={style.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? style.errorInput : ''}
                        />
                        {errors.email && <span className={style.errorMsg}>{errors.email}</span>}
                    </div>

                    <div className={style.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? style.errorInput : ''}
                        />
                        {errors.password && <span className={style.errorMsg}>{errors.password}</span>}
                    </div>

                    <button type="submit" className={style.submitBtn}>Login</button>

                    <p className={style.footerText}>
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;