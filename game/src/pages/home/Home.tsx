import React from "react";
import "./Home.css";
import { Link } from "react-router";

const Home = () => (
  <div className="crt-container">
    <div className="scanline"></div>
    <div className="crt"></div>
    <div className="container">
      <marquee behavior="scroll" direction="left" className="top-marquee">
        ★★★ UNDER CONSTRUCTION ★★★ VISITOR NUMBER: 0000008 ★★★ BEST VIEWED IN
        NETSCAPE NAVIGATOR 4.0 ★★★
      </marquee>

      <h1 className="title neonText flicker">TAMA★GOCHI</h1>

      <div className="pet-container">
        <div className="pixel-pet bounce">
          <div className="eye left"></div>
          <div className="eye right"></div>
          <div className="mouth"></div>
        </div>
        <img
          src="/under-construction.gif"
          alt="under construction"
          className="construction-gif"
        />
      </div>

      <Link to="/game" className="play-button glow-on-hover">
        <span className="arcade-text">INSERT COIN</span>
        <div className="glow"></div>
      </Link>

      <div className="guestbook-link">
        <img src="/pink.gif" alt="divider" />
        <Link to="/guestbook" className="geocities-link">
          SIGN MY GUESTBOOK
        </Link>
        <img src="/day.gif" alt="divider" />
      </div>

      <div className="phone-buttons">
        <div className="volume-buttons"></div>
        <div className="power-button"></div>
      </div>
    </div>
  </div>
);

export default Home;
