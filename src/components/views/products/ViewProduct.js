import React, { useEffect, useState } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import app from "../../../firebaseConfig";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";

function ViewProduct() {
  const navigate = useNavigate();
  const [drinkArray, setDrinkArray] = useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "drinks/");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const myData = snapshot.val();
      const temporaryData = Object.keys(myData).map((myFireId) => ({
        ...myData[myFireId],
        drinksid: myFireId,
      }));

      setDrinkArray(temporaryData);
    } else {
      alert("error");
    }
  };

  // Delete products
  const deleteDrink = async (drinksIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "drinks/" + drinksIdParam);
    await remove(dbRef);
    fetchData(); // Refresh data after deletion
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <TableContainer component={Paper}>
        <Fab
          style={{ position: 'fixed', right: 20, bottom: 20 }}
          color="primary"
          aria-label="add"
          onClick={() => navigate("/create-new-product")}
        >
          <AddIcon />
        </Fab>
        <Table
          style={{ minWidth: 650, minHeight: 200 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Tên sản phẩm</h4>
              </TableCell>
              <TableCell align="center">
                <h4>Mô tả</h4>
              </TableCell>
              <TableCell align="center">
                <h4>Ảnh mô tả</h4>
              </TableCell>
              <TableCell align="center">
                <h4>Giá</h4>
              </TableCell>
              <TableCell align="center">
                <h4>Đánh giá</h4>
              </TableCell>
              <TableCell align="center">
                <h4>giảm giá(%)</h4>
              </TableCell>
              <TableCell align="center">
                <h4>số lượng đã bán(cốc)</h4>
              </TableCell>
              <TableCell align="center">
                <h4>status</h4>
              </TableCell>
              <TableCell align="center">
                <h4>Thao tác</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drinkArray.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.drinks_name}
                </TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">
                  <img
                    src={item.drinks_image}
                    alt="Drink Image"
                    style={{ maxHeight: "50px" }}
                  />
                </TableCell>
                <TableCell align="center">{item.price}</TableCell>
                <TableCell align="center">{item.rating}</TableCell>
                <TableCell align="center">{item.sale}</TableCell>
                <TableCell align="center">{item.sold_count}</TableCell>
                <TableCell align="center">{item.status}</TableCell>
                <TableCell align="center">
                  <Button
                    style={{ marginRight: "8px" }}
                    size="small"
                    variant="contained"
                    startIcon={<BuildIcon />}
                    onClick={() => navigate(`/update-product/${item.drinksid}`)}
                  >
                    UPDATE
                  </Button>
                  <Button
                    style={{ marginRight: "8px" }}
                    size="small"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteDrink(item.drinksid)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default ViewProduct;
