import { Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Product from "./routes/Product";
import Contact from "./routes/Contact";
import "./App.css";



function App() {
  return (
    <>
    <div className="App">
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Product/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>
     </Routes>
    </div>
      
    </>
  );
}
export default App;
