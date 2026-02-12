import React, { useState } from 'react';
import style from './Register.module.css';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios'

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (!formData.firstName) tempErrors.firstName = "First Name required";
        if (!formData.lastName) tempErrors.lastName = "Last Name required";
        if (!formData.email) tempErrors.email = "Email required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid Email";

        if (!formData.password) tempErrors.password = "Password required";
        else if (formData.password.length < 6) tempErrors.password = "Min 6 chars";

        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");

        if (!validate()) return;

        try {
            await api.post("/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            });

            navigate("/login");

        } catch (err) {
            if (err.response && err.response.data) {
                setServerError(err.response.data.message || "Register failed");
            } else {
                setServerError("Server error or no connection");
            }
        }
    };

    return (
        <div className={style.pageContainer}>
            <div className={style.formContainer}>
                <img src={logo} alt="Logo" className={style.logo} />
                <h2>Create Account</h2>
                <p className={style.subtitle}>Join us and start learning today</p>

                {serverError && <p className={style.errorMsg}>{serverError}</p>}

                <form onSubmit={handleSubmit}>
                    <div className={style.row}>
                        <div className={style.inputGroup}>
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="e.g. Mark"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={errors.firstName ? style.errorInput : ''}
                            />
                            {errors.firstName && <span className={style.errorMsg}>{errors.firstName}</span>}
                        </div>
                        <div className={style.inputGroup}>
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="e.g. Christen"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={errors.lastName ? style.errorInput : ''}
                            />
                            {errors.lastName && <span className={style.errorMsg}>{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className={style.inputGroup}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="name@example.com"
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
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? style.errorInput : ''}
                        />
                        {errors.password && <span className={style.errorMsg}>{errors.password}</span>}
                    </div>

                    <div className={style.inputGroup}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? style.errorInput : ''}
                        />
                        {errors.confirmPassword && <span className={style.errorMsg}>{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className={style.submitBtn}>Sign Up</button>

                    <p className={style.footerText}>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;