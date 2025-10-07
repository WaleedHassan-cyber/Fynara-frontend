import React from "react";
import "./FeatureSection.css";
import { Search } from "lucide-react";
import Breakcrumb from "../components/Breadcrumb.jsx";
const FeatureSection = () => {
  return (
    <>
      <section className="feature-hero">
        <h1>Features</h1>
      </section>

      <Breakcrumb crumb="Features" />
      <section className="feature-container">
        <div className="feature-wrapper">
          {/* ===== Left Blog Posts ===== */}
          <div className="feature-left">
            {/* Post 1 */}
            <div className="feature-post">
              <div className="feature-post-img">
                <span className="feature-date">
                  <span>22</span> <small>Jan 2018</small>
                </span>
                <img
                  src="https://preview.colorlib.com/theme/cozastore/images/blog-04.jpg.webp"
                  alt="blog"
                />
              </div>
              <div className="feature-post-content">
                <h3>8 Inspiring Ways to Wear Dresses in the Winter</h3>
                <p>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Fusce eget dictum tortor.
                  Donec dictum vitae sapien eu varius.
                </p>
                <div className="feature-meta">
                  <span>By Admin</span> |{" "}
                  <span>StreetStyle, Fashion, Couple</span> |{" "}
                  <span>8 Comments</span>
                </div>
                <a href="#" className="feature-read">
                  Continue Reading →
                </a>
              </div>
            </div>

            {/* Post 2 */}
            <div className="feature-post">
              <div className="feature-post-img">
                <span className="feature-date">
                  <span>18</span> <small>Jan 2018</small>
                </span>
                <img
                  src="https://preview.colorlib.com/theme/cozastore/images/blog-05.jpg.webp"
                  alt="blog"
                />
              </div>
              <div className="feature-post-content">
                <h3>The Great Big List of Men’s Gifts for the Holidays</h3>
                <p>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Fusce eget dictum tortor.
                  Donec dictum vitae sapien eu varius.
                </p>
                <div className="feature-meta">
                  <span>By Admin</span> |{" "}
                  <span>StreetStyle, Fashion, Couple</span> |{" "}
                  <span>8 Comments</span>
                </div>
                <a href="#" className="feature-read">
                  Continue Reading →
                </a>
              </div>
            </div>

            {/* Post 3 */}
            <div className="feature-post">
              <div className="feature-post-img">
                <span className="feature-date">
                  <span>16</span> <small>Jan 2018</small>
                </span>
                <img
                  src="https://preview.colorlib.com/theme/cozastore/images/blog-06.jpg.webp"
                  alt="blog"
                />
              </div>
              <div className="feature-post-content">
                <h3>5 Winter-to-Spring Fashion Trends to Try Now</h3>
                <p>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Fusce eget dictum tortor.
                  Donec dictum vitae sapien eu varius.
                </p>
                <div className="feature-meta">
                  <span>By Admin</span> |{" "}
                  <span>StreetStyle, Fashion, Couple</span> |{" "}
                  <span>8 Comments</span>
                </div>
                <a href="#" className="feature-read">
                  Continue Reading →
                </a>
              </div>
            </div>
          </div>

          {/* ===== Right Sidebar ===== */}
          <div className="feature-sidebar">
            {/* Search */}
            <div className="feature-search">
              <input type="text" placeholder="Search" />
              <button>
                <Search />
              </button>
            </div>

            {/* Categories */}
            <div className="feature-widget">
              <h4>Categories</h4>
              <ul>
                <li>Fashion</li>
                <li>Beauty</li>
                <li>Street Style</li>
                <li>Life Style</li>
                <li>DIY & Crafts</li>
              </ul>
            </div>

            {/* Featured Products */}
            <div className="feature-widget">
              <h4>Featured Products</h4>
              <div className="feature-product">
                <img
                  src="https://preview.colorlib.com/theme/cozastore/images/product-min-01.jpg.webp"
                  alt="White Shirt"
                />
                <div>
                  <p>White Shirt With Pleat Detail Back</p>
                  <span>$19.00</span>
                </div>
              </div>
              <div className="feature-product">
                <img
                  src="https://preview.colorlib.com/theme/cozastore/images/product-min-02.jpg.webp"
                  alt="Converse"
                />
                <div>
                  <p>Converse All Star Hi Black Canvas</p>
                  <span>$39.00</span>
                </div>
              </div>
              <div className="feature-product">
                <img
                  src="https://preview.colorlib.com/theme/cozastore/images/product-min-03.jpg.webp"
                  alt="Watch"
                />
                <div>
                  <p>Nixon Porter Leather Watch In Tan</p>
                  <span>$17.00</span>
                </div>
              </div>
            </div>

            {/* Archive */}
            <div className="feature-widget">
              <h4>Archive</h4>
              <ul>
                <li>July 2018 (9)</li>
                <li>June 2018 (39)</li>
                <li>May 2018 (29)</li>
                <li>April 2018 (35)</li>
                <li>March 2018 (22)</li>
              </ul>
            </div>

            {/* Tags */}
            <div className="feature-widget">
              <h4>Tags</h4>
              <div className="feature-tags">
                <span>Fashion</span>
                <span>Lifestyle</span>
                <span>Denim</span>
                <span>Streetstyle</span>
                <span>Crafts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;
