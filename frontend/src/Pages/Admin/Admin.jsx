import React, { useState, useEffect } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Form from '../../Components/Form/Form'
import Cards from '../../Components/Cards/Cards'
import Footer from '../../Components/Footer/Footer'
import api from '../../api/axios'

const Admin = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const getCourses = async () => {
        try {
            const res = await api.get('/courses');
            setCourses(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <div>
            <NavBar />
            <Form
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                getCourses={getCourses}
            />
            <Cards
                courses={courses}
                setSelectedCourse={setSelectedCourse}
                getCourses={getCourses}
            />
            <Footer />
        </div>
    )
}

export default Admin
