import React from 'react'
import "./LinksImg.css";
const banners = [
    { img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-1.jpg.webp", text: "Laundry Essentials" },
    { img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-2.jpg.webp", text: "Stylish Outfits" },
    { img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-3.jpg.webp", text: "Knitting Supplies" },
    { img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-4.jpg.webp", text: "Handmade Fashion" },
    { img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-5.jpg.webp", text: "Skin Care" },
    { img: "https://preview.colorlib.com/theme/ashion/img/instagram/insta-6.jpg.webp", text: "Comfort Wear" },
  ];
const LinksImg = () => {
  

  return (
    <div className="linksimg-container">
      {banners.map((banner, i) => (
        <div className="linksimg" key={i}>
          <img src={banner.img} alt={banner.text} />
          <div className="overlay">
            <p>{banner.text}</p>
          </div>
        </div>
      ))}
    </div>
    )}

export default LinksImg