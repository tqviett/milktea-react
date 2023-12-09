import { React, useState } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function UpdateViewProduct() {
  const navigate = useNavigate();

  let [drinkArray, setdrinkArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "drinks/");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {

      const myData = snapshot.val();
      const temporaryData = Object.keys(myData).map(myFireId =>{
         return {
            ...myData[myFireId],
            drinksid: myFireId
         }
      });

      setdrinkArray(temporaryData);
    } else {
      alert("error");
    }
  };
  
  const deleteDrink= async (drinksIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "drinks/"+ drinksIdParam);
    await remove(dbRef);
    window.location.reload();
  }

  return (
    <div>
      <h1> View Product</h1>
      <button onClick={fetchData}> Display Data </button>
      <ul>
        {drinkArray.map((item, index) => (
          <li key={index}>
            {item.drinksid}:
            {item.drinks_name}:{item.description}:
            {item.drinks_image}:{item.price}:
            {item.rating}:{item.sale}:
            {item.sold_count}:{item.status}
            <button onClick={()=> navigate(`/update-product/${item.drinksid}`)}>UPDATE</button>
            <button onClick={()=> deleteDrink(item.drinksid)}>DELETE</button>

          </li>
        ))}
      </ul>
      
      <button className="button1" onClick={() => navigate("/add-new-product")}>
        GO ADD PRODUCT
      </button>
    </div>
  );
}

export default UpdateViewProduct;
