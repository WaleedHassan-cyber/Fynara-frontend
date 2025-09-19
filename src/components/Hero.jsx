import React, { useState } from "react";
import { Search, ShoppingCart, Heart, Globe, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import "./Hero.css";

const Hero = () => {
  const userDetail = JSON.parse(localStorage.getItem("user:detail"));
  const [showAuth, setShowAuth] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

          {/* Navigation (desktop only) */}
          <nav className="nav">
            <Link to="/">Home</Link>
            <div className="relative">
              <Link to="/products" className="shop-link">
                Shop
                <span className="hot">HOT</span>
              </Link>
            </div>
            <Link to="#">Features</Link>
            <Link to="#">Blog</Link>
            <Link to="#">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          {/* Right Side */}
          <div className="header-icons">
            <button className="icon-button">
              <Search className="navicon" />
            </button>

            {userDetail ? (
              <>
                <Link to="/cart" className="icon-button">
                  <ShoppingCart className="navicon" />
                  <span className="badge bounce">2</span>
                </Link>
                <button className="icon-button">
                  <Heart className="navicon" />
                  <span className="badge">1</span>
                </button>
                <button className="icon-button">
                  <User className="navicon" />
                </button>
              </>
            ) : (
              <>
                <span onClick={() => setShowAuth(true)} className="auth-link">
                  Login
                </span>
                <span className="divider">/</span>
                <span onClick={() => setShowAuth(true)} className="auth-link">
                  Register
                </span>
              </>
            )}

            {/* Hamburger menu (mobile only) */}
            <button
              className="hamburger"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="navicon" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">SHOPPII</span>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsSidebarOpen(false)}>Shop</Link>
          <Link to="#" onClick={() => setIsSidebarOpen(false)}>Features</Link>
          <Link to="#" onClick={() => setIsSidebarOpen(false)}>Blog</Link>
          <Link to="#" onClick={() => setIsSidebarOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsSidebarOpen(false)}>Contact</Link>
        </nav>

        <div className="sidebar-footer">
          {userDetail ? (
            <>
              <Link to="/cart" className="sidebar-link">
                <ShoppingCart size={18}/> Cart (2)
              </Link>
              <Link to="/wishlist" className="sidebar-link">
                <Heart size={18}/> Wishlist (1)
              </Link>
              <Link to="/profile" className="sidebar-link">
                <User size={18}/> Profile
              </Link>
            </>
          ) : (
            <div className="sidebar-auth">
              <span onClick={() => setShowAuth(true)}>Login</span> /{" "}
              <span onClick={() => setShowAuth(true)}>Register</span>
            </div>
          )}
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </header>
  );
};

export default Hero;
