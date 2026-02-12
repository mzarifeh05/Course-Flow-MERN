import React, { useState, useEffect } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Cards from '../../Components/Cards/Cards'
import api from '../../api/axios'
import { jwtDecode } from "jwt-decode";

const Student = () => {
    const [myCourses, setMyCourses] = useState([]);

    const getMyCourses = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.id;

            const res = await api.get('/courses');
            
            const registeredCourses = res.data.filter(course => 
                course.students.includes(userId)
            );

            setMyCourses(registeredCourses);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMyCourses();
    }, []);

    return (
        <div>
            <NavBar />
            
            <div style={{ minHeight: '80vh', padding: '20px' }}>
                <h1 style={{ textAlign: 'center', color: '#333' }}>My Learning List</h1>
                
                {myCourses.length > 0 ? (
                    <Cards courses={myCourses} getCourses={getMyCourses} />
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h3>You haven't enrolled in any courses yet.</h3>
                        <p>Go to the Home page to explore courses!</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Student;