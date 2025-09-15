import React from "react";
import DisplayProduct from "../components/DisplayProduct.jsx";
import Features from "../components/Features.jsx";
import LinksImg from "../components/LinksImg.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { useParams } from "react-router-dom";
const Product = () => {
  const { category } = useParams();
  return (
    <>
      <Breadcrumb crumb={category?`For ${category}`:"Shop"} />
      <DisplayProduct header={category ? `For ${category}` : "OUR PRODUCTS"} category={category || ""} />
      <LinksImg />
      <Features />
    </>
  );
};

export default Product;
