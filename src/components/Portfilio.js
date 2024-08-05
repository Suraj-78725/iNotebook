import React from 'react'
import '../style/Portfilio.css';
const Portfilio=()=> {
  return (
    <>
     <div className="Portfilio-container">
        <ul className="navlist">
            <li><a href="#">iNotebook</a></li>
        </ul>
        <div className="left-container">
            <div className="icon">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-linkedin-in"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-codepen"></i>
            </div>
            <div className="content">
                <p className="intro">Hi! I <span>Am Suraj </span></p>
                <h1 >Web Developer</h1>
                <p className="detail">Hi, I'm Suraj Bansode, a dedicated web developer passionate about crafting exceptional digital experiences. With a keen eye for design and a strong foundation in coding, I specialize in building responsive, user-centric websites that effectively communicate brand messages. I thrive on challenges and am constantly seeking opportunities to expand my skill set. Let's create something amazing together!</p>
                <div className="btn-container">
                    <button>
                        Hire me
                    </button>
                    <button>
                        Project
                    </button>
                </div>
            </div>
        </div>
        <div className="right-container"></div>
        <div className="design">
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    </div>
    </>
  );
}

export default Portfilio;