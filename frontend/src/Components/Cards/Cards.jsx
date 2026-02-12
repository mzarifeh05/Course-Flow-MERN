import React, { useState, useEffect } from 'react';
import style from './Cards.module.css';
import placeholderImage from '../../assets/placeholder-image.png';
import deleteIcon from '../../assets/delete-icon.svg';
import groupIcon from '../../assets/group-icon.svg';
import api from '../../api/axios';
import { jwtDecode } from "jwt-decode";

const Cards = ({ courses = [], setSelectedCourse, getCourses }) => {
    const [enrolledMap, setEnrolledMap] = useState({});
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);

    const [showParticipantsModal, setShowParticipantsModal] = useState(false);
    const [currentParticipants, setCurrentParticipants] = useState([]);
    const [loadingParticipants, setLoadingParticipants] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(decoded.role);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Invalid token");
            }
        }
    }, []);

    useEffect(() => {
        if (courses.length > 0 && userId) {
            const initialEnrollment = {};
            courses.forEach(course => {
                if (course.students.includes(userId)) {
                    initialEnrollment[course._id] = true;
                }
            });
            setEnrolledMap(initialEnrollment);
        }
    }, [courses, userId]);

    const handleEnrollToggle = async (courseId) => {
        const token = localStorage.getItem("token");
        if (!token) return alert("Please login to enroll");

        const isCurrentlyEnrolled = enrolledMap[courseId];
        const action = isCurrentlyEnrolled ? "unenroll" : "enroll";

        try {
            await api.post(
                `/courses/${courseId}/${action}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setEnrolledMap(prev => ({
                ...prev,
                [courseId]: !isCurrentlyEnrolled
            }));

            if (getCourses) getCourses();
        } catch (err) {
            console.error(err);
            alert("Error processing request");
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!getCourses) return;

        try {
            await api.delete(`/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            getCourses();
        } catch (err) {
            console.log(err);
        }
    };

    const handleViewParticipants = async (studentIds) => {
        if (role !== 'admin') return;

        setShowParticipantsModal(true);
        setLoadingParticipants(true);
        setCurrentParticipants([]);

        try {
            const studentDataPromises = studentIds.map(id =>
                api.get(`/users/${id}`)
            );

            const responses = await Promise.all(studentDataPromises);

            const students = responses.map(res => ({
                id: res.data._id,
                name: `${res.data.firstName} ${res.data.lastName}`
            }));

            setCurrentParticipants(students);
        } catch (error) {
            console.error("Error fetching students", error);
        } finally {
            setLoadingParticipants(false);
        }
    };

    return (
        <div className={style.overlay}>
            {courses.map(course => (
                <div className={style.container} key={course._id}>
                    <img
                        src={course.imgURL || placeholderImage}
                        alt="course-image"
                    />

                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                    <h4>{course.instructor}</h4>

                    <div>
                        <div
                            className={role === 'admin' ? style.clickableArea : ''}
                            onClick={() => handleViewParticipants(course.students)}
                        >
                            <img src={groupIcon} alt="icon" />
                            <p>{course.students.length}/50 Participants</p>
                        </div>

                        {role === "student" && (
                            <button
                                onClick={() => handleEnrollToggle(course._id)}
                                className={enrolledMap[course._id] ? style.btn : ''}
                            >
                                {enrolledMap[course._id] ? "Enrolled" : "Enroll"}
                            </button>
                        )}

                        {setSelectedCourse && (
                            <button onClick={() => setSelectedCourse(course)}>
                                Edit
                            </button>
                        )}

                        {setSelectedCourse && (
                            <button onClick={() => handleDelete(course._id)}>
                                <img src={deleteIcon} alt="delete" />
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {showParticipantsModal && (
                <div className={style.modalOverlay} onClick={() => setShowParticipantsModal(false)}>
                    <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={style.modalHeader}>
                            <h3>Enrolled Students</h3>
                            <button
                                className={style.closeBtn}
                                onClick={() => setShowParticipantsModal(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className={style.participantsList}>
                            {loadingParticipants ? (
                                <p style={{ textAlign: 'center' }}>Loading...</p>
                            ) : currentParticipants.length > 0 ? (
                                currentParticipants.map((student, index) => (
                                    <div key={student.id || index} className={style.studentRow}>
                                        {student.name}
                                    </div>
                                ))
                            ) : (
                                <p style={{ textAlign: 'center', color: '#888' }}>
                                    No students enrolled.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
