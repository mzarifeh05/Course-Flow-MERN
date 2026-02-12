import React from 'react'
import logo from '../../assets/logo.png'
import style from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={style.container}>
            <div className={style.content}>
                <div className={style.section}>
                    <img src={logo} alt="logo" className={style.logo} />
                    <p className={style.description}>
                        Empowering learners worldwide with quality education and practical skills for a brighter future.
                    </p>
                </div>

                <div className={style.section}>
                    <h3>Quick Links</h3>
                    <ul>
                        <li>About Us</li>
                        <li>Courses</li>
                        <li>Instructors</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className={style.section}>
                    <h3>Resources</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>FAQs</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                <div className={style.section}>
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Email: info@courseflow.com</li>
                        <li>Phone: +962 123 4567</li>
                        <li>Address: Amman, Jordan</li>
                    </ul>
                </div>
            </div>

            <div className={style.bottom}>
                <p>&copy; {new Date().getFullYear()} Course Fllow. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer