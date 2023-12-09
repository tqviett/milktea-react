import { React, useState } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");
  let [inputValue3, setInputValue3] = useState("");
  let [inputValue4, setInputValue4] = useState("");
  let [inputValue5, setInputValue5] = useState("");
  let [inputValue6, setInputValue6] = useState("");
  let [inputValue7, setInputValue7] = useState("");
  let [inputValue8, setInputValue8] = useState("");

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "drinks"));
    set(newDocRef, {
      drinks_name: inputValue1,
      description: inputValue2,
      drinks_image: inputValue3,
      price: inputValue4,
      rating: inputValue5,
      sale: inputValue6,
      sold_count: inputValue7,
      status: inputValue8,
    })
      .then(() => {
        alert("data saved successfully");
      })
      .catch((error) => {
        alert("error:", error.message);
      });
  };

  const navigate = useNavigate();
  
  return (
    <div class="">
      <h1>View Product</h1>
      <p>Name</p>
      <input
        type="text"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <br />
      <p>Description</p>
      <input
        type="text"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <br />
      <p>Image</p>
      <input
        type="text"
        value={inputValue3}
        onChange={(e) => setInputValue3(e.target.value)}
      />
      <br />
      <p>Price</p>
      <input
        type="text"
        value={inputValue4}
        onChange={(e) => setInputValue4(e.target.value)}
      />
      <br />
      <p>Rating</p>
      <input
        type="text"
        value={inputValue5}
        onChange={(e) => setInputValue5(e.target.value)}
      />
      <br />
      <p>Sale</p>
      <input
        type="text"
        value={inputValue6}
        onChange={(e) => setInputValue6(e.target.value)}
      />
      <br />
      <p>Sould Count</p>
      <input
        type="text"
        value={inputValue7}
        onChange={(e) => setInputValue7(e.target.value)}
      />
      <br />
      <p>Status</p>
      <input
        type="text"
        value={inputValue8}
        onChange={(e) => setInputValue8(e.target.value)}
      />
      <br />
      <button onClick={saveData}>Sava data</button>
      <button onClick={() => navigate("/view-product")}>
        GO view product
      </button>{" "}
      <br />
      <button onClick={() => navigate("/")}> HOMEPAGE</button>
    </div>
  );
}
export default AddProduct;
