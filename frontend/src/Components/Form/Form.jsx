import React, { useState, useEffect, useRef } from 'react';
import styles from './Form.module.css';
import axios from 'axios';
import api from '../../api/axios';

const Form = ({ selectedCourse, setSelectedCourse, getCourses }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructor: '',
        image: null
    });

    const titleInputRef = useRef(null);

    useEffect(() => {
        if (!selectedCourse) return;

        setFormData({
            title: selectedCourse.title,
            description: selectedCourse.description,
            instructor: selectedCourse.instructor,
            image: null
        });

        titleInputRef.current?.focus();
        titleInputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, [selectedCourse]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.instructor) return;

        try {
            let imgURL = selectedCourse?.imgURL || "";

            if (formData.image) {
                const cloudData = new FormData();
                cloudData.append("file", formData.image);
                cloudData.append("upload_preset", "courseflow_upload");
                cloudData.append("folder", "courseflow");

                const cloudRes = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
                    cloudData
                );

                imgURL = cloudRes.data.secure_url;
            }

            const token = localStorage.getItem("token");

            if (selectedCourse) {
                await api.put(
                    `courses/${selectedCourse._id}`,
                    {
                        title: formData.title,
                        description: formData.description,
                        instructor: formData.instructor,
                        imgURL
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setSelectedCourse(null);
            } else {
                await api.post(
                    `/courses`,
                    {
                        title: formData.title,
                        description: formData.description,
                        instructor: formData.instructor,
                        imgURL
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            setFormData({ title: '', description: '', instructor: '', image: null });
            getCourses();
            e.target.reset();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <h2 className={styles.formTitle}>
                    {selectedCourse ? "Edit Course" : "Add New Course"}
                </h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Course Title</label>
                            <input
                                ref={titleInputRef}
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter course title"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Instructor Name</label>
                            <input
                                type="text"
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleChange}
                                placeholder="Enter instructor name"
                                className={styles.input}
                                required
                            />
                        </div>

                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Course Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter course description"
                            className={styles.textarea}
                            rows="4"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Course Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {selectedCourse ? "Edit Course" : "Add Course"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;

