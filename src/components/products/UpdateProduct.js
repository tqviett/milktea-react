import { React, useState, useEffect } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const { firebaseId } = useParams();

  let [inputValue1, setInputValue1] = useState("");
  let [inputValue2, setInputValue2] = useState("");
  let [inputValue3, setInputValue3] = useState("");
  let [inputValue4, setInputValue4] = useState("");
  let [inputValue5, setInputValue5] = useState("");
  let [inputValue6, setInputValue6] = useState("");
  let [inputValue7, setInputValue7] = useState("");
  let [inputValue8, setInputValue8] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!firebaseId) {
          console.error("firebaseId is not defined");
          return;
        }

        const db = getDatabase(app);
        const dbRef = ref(db, "drinks/" + firebaseId);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const targetObject = snapshot.val();
          setInputValue1(targetObject.drinks_name);
          setInputValue2(targetObject.description);
          setInputValue3(targetObject.drinks_image);
          setInputValue4(targetObject.price);
          setInputValue5(targetObject.rating);
          setInputValue6(targetObject.sale);
          setInputValue7(targetObject.sold_count);
          setInputValue8(targetObject.status);
        } else {
          alert("Không lấy được dữ liệu");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Có lỗi xảy ra khi lấy dữ liệu");
      }
    };

    fetchData();
  }, [firebaseId]);
  const overwriteData = async () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "drinks/" + firebaseId);
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

  return (
    <div>
      <h1>Update Product</h1>
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
      <button onClick={overwriteData}>update data</button>
      <br />
      <button className="button1" onClick={() => navigate("/")}>
        GO ViewProduct
      </button>
    </div>
  );
}
export default UpdateProduct;
