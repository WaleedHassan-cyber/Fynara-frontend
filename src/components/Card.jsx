import React from "react";

import "./Card.css";

export const Card = ({
  title,
  description,
  buttonText,
  link,
  Icon,
}) => {
  return (

      <div className="card-container"><h2></h2>
      {title &&  <h2 className="card-title">{title}</h2>}
      {description && <p className="card-description">{description}</p>}
      {buttonText && link && (
        <a href={link} className="card-btn">
         <i className={Icon}></i> {buttonText}
        </a>
      )}
    </div>
  );
};