import React from 'react'
import css from '../css/Footer.module.css'
import { FaCopyright, FaFacebook, FaGithub, FaTelegram } from "react-icons/fa";

function Footer () {
    return (
        <div className={css.Footer}>
            <div>
                <div className={css.catagory}>
                    <h3>Post catagories</h3>
                    <div className={css.anchor}>
                        <a href="#">History</a>
                        <a href="#">Culture</a>
                        <a href="#">Science</a>
                        <a href="#">Fact</a>
                        <a href="#">News</a>
                    </div>

                </div>
                <div className={css.about}>
                    <h3>About us</h3>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi modi, quia asperiores alias soluta sequi hic, commodi perspiciatis ab voluptas nesciunt ut qui placeat est pariatur dicta? Magnam, aut obcaecati.
                    </p>
                    <div className={css.adress}>
                        <a href=""><FaGithub /></a>
                        <a href=""><FaFacebook /></a>
                        <a href=""><FaTelegram /></a>
                    </div>
                </div>

                <div className={css.contact}>
                    <h3>Contact us</h3>
                    <div className={css.form}>
                        <form >
                            <label>Email:</label>
                            <input className='input' type="email" />
                            <label>Write message:</label>
                            <textarea rows="5"></textarea>
                            <button className='button' type='submit'>Send</button>
                        </form>
                    </div>

                </div>
            </div>
            <div style={{ background: "white", borderRadius: "0.5rem", padding: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <p style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <FaCopyright /> 2024 Titsuh Design. Trademarks and brands are the property of their respective owners.</p>
            </div>
        </div>
    )
}

export default Footer