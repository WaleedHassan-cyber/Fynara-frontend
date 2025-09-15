import React, { useState } from "react";
import { Search, ShoppingCart, Heart, Globe, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import "./Hero.css";

const Hero = () => {
  const userDetail = JSON.parse(localStorage.getItem("user:detail"));
  const [showAuth, setShowAuth] = useState(false);
  return (
    <header className="hero">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <span className="top-message">
            Free shipping for standard order over $100
          </span>
          <div className="top-right">
            <span className="hidden-md">Help & FAQs</span>
            <span className="hidden-md">My Account</span>
            <div className="language">
              <Globe className="navicon" />
              <span>EN</span>
            </div>
            <span>USD</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          {/* Logo */}
          <div className="logo">
            <span className="logo-primary">SHOPPII</span>
            <span className="logo-secondary">STORE</span>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <a href="/">Home</a>
            <div className="relative">
              <a href="/products" className="shop-link">
                Shop
                <span className="hot">HOT</span>
              </a>
            </div>
            <a href="#">Features</a>
            <a href="#">Blog</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>

          {/* Right Side */}
          <div className="header-icons">
            <button className="icon-button">
              <Search className="navicon" />
            </button>

            {userDetail ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="icon-button">
                  <ShoppingCart className="navicon" />
                  <span className="badge bounce">2</span>
                </Link>

                {/* Wishlist */}
                <button className="icon-button">
                  <Heart className="navicon" />
                  <span className="badge">1</span>
                </button>

                {/* Profile */}
                <button className="icon-button">
                  <User className="navicon" />
                </button>
              </>
            ) : (
              <>
                {/* Login / Register */}
                <span onClick={() => setShowAuth(true)} className="auth-link">
                  Login
                </span>
                <span className="divider">/</span>
                <span onClick={() => setShowAuth(true)} className="auth-link">
                  Register
                </span>
              </>
            )}
          </div>
        </div>
      </div>
       {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
};

export default Hero;
