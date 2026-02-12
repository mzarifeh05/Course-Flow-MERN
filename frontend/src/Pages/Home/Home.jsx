import React, { useState, useEffect } from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import Cards from '../../Components/Cards/Cards'
import api from '../../api/axios'
import style from './Home.module.css'

const Home = () => {
    const [courses, setCourses] = useState([]);

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
            <Cards courses={courses} />
            <Footer />
        </div>
    )
}

export default Home;
