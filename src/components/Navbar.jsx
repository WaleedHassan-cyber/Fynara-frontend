import React,{useState} from "react";
import "./Navbar.css";
import { MenuItems } from "./MainItems";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [Clicked, setClicked] = useState(true); // use to chnge icon
  const [iconClick, seticonClick] = useState(true) // use to show navbar in responsivenss
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
 const togglIcon = ()=>{
   setClicked(!Clicked)
 }

 const handleIcon = ()=>{
    seticonClick(!iconClick)
 }

 const toggleDropdown = () => {
   setIsDropdownOpen(!isDropdownOpen);
 };



  return (
    <nav className="NavbarItems">
      <h1 className="NavbarLogo">Shoppi</h1>

      <div className="menu-icons" onClick={togglIcon} >
        <i onClick={handleIcon} className={Clicked ? "fas fa-bars" : "fas fa-times"}></i>
      </div>
      <ul className={iconClick?"nav-menu":"nav-menu active"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
