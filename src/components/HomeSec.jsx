import React from "react";
import { useState } from "react";
import "./HomeSec.css";
import Curtains from "./Curtains";
import Three from "./Three";
import Sofas from "./Sofas";


const HomeSec = () => {
  const [showComponent, setShowComponent] = useState('ComponentA');

  const handleButtonClick = (componentName) => {
    setShowComponent(componentName);
  };
  return (
    <>
      <div className="section">
        <h1>New Arrivals</h1>
        <div className="btn-group">
          <button onClick={() => handleButtonClick('ComponentA')}>3 pc suit</button>
          <button  onClick={() => handleButtonClick('ComponentB')}>Curtains</button>
          <button onClick={() => handleButtonClick('ComponentC')}>Sofas</button>
        </div>
      </div>
        <div className="flexbox">
        {showComponent === 'ComponentA' && <Three/>}
        {showComponent === 'ComponentB' && <Curtains/>}
        {showComponent === 'ComponentC' && <Sofas/>}
      </div>
      {/* <div className="flexbox">
        <ProductCard
          badge="Hot"
          src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1383&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          pc="Vallentine Frok"
          pa="Pure red dress"
          sprice="Rs4000"
          oprice="Rs3400"
        />
        <ProductCard
          badge="40% OFF"
          src="https://dakaan.pk/product_images/1693055938_2981c9c09b79b48e.jpeg"
          pc="Women-bag"
          pa="Women lether Bag"
          sprice="Rs4000"
          oprice="Rs3400"
        />
        <ProductCard
          badge="Hot"
          src="https://i0.wp.com/grandeurfashion.pk/wp-content/uploads/2022/01/W85-2-scaled.jpg?fit=900%2C1350&ssl=1"
          pc="Women-bag"
          pa="Women lether Bag"
          sprice="Rs4000"
          oprice="Rs3400"
        />
        <ProductCard
          badge="Hot"
          src="https://elagia.com/cdn/shop/files/IMG_3855_a67d85c7-6685-40be-aa43-c8b707a2e8f7.jpg?v=1700732957&width=740"
          pc="Women-bag"
          pa="Women lether Bag"
          sprice="Rs4000"
          oprice="Rs3400"
        />
        <ProductCard
          badge="Hot"
          src="https://cdn-live.sanaullastore.com/sanaulla-live/products/product_images/fozia-khalid-pret-embroidered-cotton-3-piece-suit-aquamarine_1.jpg%3Fwidth%3D640"
          pc="Women-bag"
          pa="Women lether Bag"
          sprice="Rs4000"
          oprice="Rs3400"
        />
        <ProductCard
          badge="Hot"
          src="https://cdn-live.sanaullastore.com/sanaulla-live/products/product_images/fozia-khalid-pret-embroidered-cotton-3-piece-suit-mulberry_1.jpg%3Fwidth%3D640"
          pc="Women-bag"
          pa="Women lether Bag"
          sprice="Rs4000"
          oprice="Rs3400"
        />
        <ProductCard
          badge="Hot"
          src="https://askanigroup.com/wp-content/uploads/2021/07/fiza-noor-baghi-fn-14-01.jpg"
          pc="Women-bag"
          pa="Women lether Bag"
          sprice="Rs4000"
          oprice="Rs3400"
        />
      </div> */}
      
    </>
  );
};

export default HomeSec;
