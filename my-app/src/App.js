// Filename - App.js
import React, { useState, useRef } from 'react';
import "./App.css";
import "./Navbar.css";

{/*May need to tweek this - currently types out the nav items when the mouse hovers over the items. I may want to only do that when the page first is opened*/}
const Navbar = () => {
  const navLinks = ["Home", "About", "Projects", "Contact"];
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
    }, 50); // Adjust speed here
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
    if (linkName.toLowerCase() === "home") {
      return "/"; // Home page is typically the root
    } else {
      return `/${linkName.toLowerCase()}`; // Other pages get their lowercase name as path
    }
  };

  return (
    <nav className="navbar" onMouseLeave={handleMouseLeave}>
      <ul className="nav-list">
        {navLinks.map((name, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
          >
            <a
              href={getHref(name)}
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
            < Navbar />

            {/*Background banner - want to add image*/}
            <div className="banner">
            </div>

            {/* About me page - picture of me and a summary*/}
            <section className="section">
                <div className="box-main">
                    <div className="firsthalf">
                        <h1 className="text-big" id="about">
                            About Me!
                        </h1>
                        <p className="text-small">
                            This is all about me
                        </p>
                    </div>
                </div>
            </section>


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

