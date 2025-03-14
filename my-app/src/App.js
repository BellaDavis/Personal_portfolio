// Filename - App.js
import React, { useState, useRef } from 'react';
import "./App.css";
import "./Navbar.css";

{/*May need to tweek this - currently types out the nav items when the mouse hovers over the items. I may want to only do that when the page first is opened*/}
const Navbar = () => {
  const navLinks = ["About", "Projects", "Experience"];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [displayedText, setDisplayedText] = useState(navLinks.map(link => link));
  const typingIntervalRef = useRef(null);
  const isTypingRef = useRef(false);

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
        <div className="logo-container">
          <a href="/" className="Discord">
            <img src="/1714463825421.png" alt="logo 1" className="logo" style={{ height: "40px" }}/>
          </a>
          <a href="/" className="LinkedIn">
            <img src="/linkedin_logo.png" alt="logo 2" className="logo" style={{ height: "65px" }}/>
          </a>
          <a href="/" className="Gmail">
            <img src="/Gmail_icon.png" alt="logo 3" className="logo" style={{ height: "33px" }} />
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
            <section id="about" className="section">about</section>
            <section id="skills" className="section">skills</section>
            <section id="projects" className="section">projects</section>
            <section id="experience" className="section">experience</section>
          </div>
        </div>


        {/*Background banner - want to add image*/}
          {/*<div className="banner">
            </div>*/}

          {/* About me page - picture of me and a summary*/}

          {/* Card Animation */}
          {/*<div className="container">
                <div className="card">
                    <div className="slide slide1">
                        <div className="content">
                            <div className="icon">
                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div className="slide slide2">
                        <div className="content">
                            <h3>
                                Hello There!
                            </h3>
                            <p>
                                help
                            </p>
                        </div>
                    </div>
                </div>
            </div>*/}


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

