import { React, useState } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

function ViewProduct() {
  const navigate = useNavigate();

  let [drinkArray, setdrinkArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "drinks");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setdrinkArray(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
  };

  return (
    <div>
      <h1>View Product</h1>
      <button onClick={fetchData}> Display Data </button>
      <ul>
        {drinkArray.map((item, index) => (
          <li key={index}>
            {item.drinks_name}:{item.description}:
            {item.drinks_image}:{item.price}:
            {item.rating}:{item.sale}:
            {item.sold_count}:{item.status}
          </li>
        ))}
      </ul>
      <button className="button1" onClick={() => navigate("/update-view-product")}>
        GO UPDATE View Product 
      </button>{" "}
      <br />
      <button className="button1" onClick={() => navigate("/")}>
        GO ViewProduct
      </button>
    </div>
  );
}

export default ViewProduct;
