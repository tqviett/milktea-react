import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./components/products/AddProduct";
import ViewProduct from "./components/products/ViewProduct";
import UpdateViewProduct from "./components/products/UpdateViewProduct";
import UpdateProduct from "./components/products/UpdateProduct";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ViewProduct />} />
          <Route path="/add-new-product" element={<AddProduct />} />
          <Route path="/view-product" element={<ViewProduct />} />
          <Route path="/update-view-product" element={<UpdateViewProduct />} />
          <Route path="/update-product/:firebaseId" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
