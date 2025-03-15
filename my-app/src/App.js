// Filename - App.js
import React, { useState, useRef } from 'react';
import "./App.css";
import "./Navbar.css";

{/*May want to add dark mode: https://oakharborwebdesigns.com/blog/how-to-add-dark-mode-to-your-website/*/}
{/*May need to tweek this - currently types out the nav items when the mouse hovers over the items. I may want to only do that when the page first is opened*/}
const Navbar = () => {
  const navLinks = ["About", "Projects", "Experience"];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [displayedText, setDisplayedText] = useState(navLinks.map(link => link));
  const typingIntervalRef = useRef(null);
  const isTypingRef = useRef(false);

  {/*May want to look at editing the animation for when the screen gets smaller as the
  typing animation doesn't work that well then*/}
  const handleMouseEnter = (index) => {
    // If already typing, don't start a new typing effect
    if (isTypingRef.current) {
      return;
    }

    setHoveredIndex(index);

    // Clear any existing interval just to be safe
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    // Reset the text to empty string
    const newDisplayedText = [...displayedText];
    newDisplayedText[index] = "";
    setDisplayedText(newDisplayedText);

    // Set the typing flag to true
    isTypingRef.current = true;

    // Start typing effect
    let i = 0;
    const text = navLinks[index];
    typingIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        const newDisplay = [...displayedText];
        newDisplay[index] = text.substring(0, i + 1);
        setDisplayedText(newDisplay);
        i++;
      } else {
        clearInterval(typingIntervalRef.current);
        isTypingRef.current = false; // Reset the typing flag when done
      }
    }, 40); // Adjust speed here
  };

  // Reset all text when mouse leaves the navbar
  const handleMouseLeave = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    setDisplayedText(navLinks.map(link => link));
    isTypingRef.current = false;
  };

  // Helper function to generate proper href for each link
  const getHref = (linkName) => {
    if (linkName.toLowerCase() === "about") {
      return "/"; // Home page is typically the root
    } else {
      return `#${linkName.toLowerCase()}`;
    }
  };

  return (

      <nav className="navbar" onMouseLeave={handleMouseLeave}>
        <a className="contact">Contact:   </a>
        <div className="logo-container">
          <a href="" className="Github">
            <div className="grid">
              <img src="/github-logo.png" alt="logo 1" className="logo" style={{height: "30px"}}/>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/bella-kamont/" className="LinkedIn">
            <img src="/linkedin_logo.png" alt="logo 2" className="logo" style={{ height: "34px" }}/>
          </a>
          {/* Directs the person to send an email*/}
          <a href="mailto:kamontbella12@gmail.com?subject=Inquiry&body=Hello Bella," className="Gmail" >
            <img src="/Gmail_icon.png" alt="logo 3" className="logo" style={{ height: "25px" }} />
          </a>
        </div>

        <ul className="nav-list">
          {navLinks.map((name, index) => (
              <li
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
              >
                <a
                    href={`${getHref(name)}`}
                    className={hoveredIndex === index ? "typing-effect" : ""}
                >
                  {displayedText[index]}
                </a>
              </li>
          ))}
        </ul>
      </nav>
  );
};

function App() {
  return (
      <div>
        < Navbar/>

        <div className="app-container">
            <div className="content">
                <div id="about" className="section">
                    <div className="about-content-wrapper">  {/* Add this wrapper */}
                        <div className="about-container">
                            <img src="/face_shot.jpg" alt="logo 1" className="profile-image"/>
                        </div>
                        <div className="write-up">
                            <h1>Hello, I'm Bella!</h1>
                            <p>
                                Growing up as the oldest sibling in a single-parent household, I was the go-to tech support for my mother. Whether it was a stubborn printer, or a finicky router, I was always the one to come to the rescue. This early experience fostered my problem-solving skills and passion for troubleshooting technical challenges. However, it wasn’t until after I graduated high school that I became fascinated with the field of Computer Science. The summer before my freshman year at UVM, I stumbled across YouTube videos that introduced me to coding, and I was hooked. I switched from not knowing what I wanted to study, to a major in computer science. This switch turned out to be an amazing decision. Over the past three years of my studies, I have gained valuable knowledge, hands-on experience, and an amazing community of peers. Now, I am eager to take the next step in my professional career by applying my skills in a technical internship.
                            </p>
                        </div>
                    </div>
                </div>

                {/* This would be good for some of the other sections: https://forfrontend.com/animated-css-cards*/}
                <div id="skills" className="section">
                </div>

                <div id="projects" className="section">

                </div>

                <div id="experience" className="section">

                </div>
            </div>
        </div>


          {/*Background banner - want to add image*/}
          {/*<div className="banner">
            </div>*/}

          {/* About me page - picture of me and a summary*/}

          {/* Card Animation */}
          {/**/}


          {/* This where the different information about me will be highlighted. */}

          <footer className="footer">
              <p className="text-footer">
                  Bella Kamont
          </p>
        </footer>
      </div>
  );
}

export default App;

