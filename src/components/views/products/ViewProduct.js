import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import app from "../../../firebaseConfig";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";

function ViewProduct() {
  const navigate = useNavigate();
  const [drinkArray, setDrinkArray] = React.useState([]);

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

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <DataGrid
        rows={drinkArray}
        columns={[
          { field: "drinks_name", headerName: "Tên sản phẩm", width: 200 },
          { field: "description", headerName: "Mô tả", width: 200 },
          {
            field: "drinks_image",
            headerName: "Ảnh mô tả",
            width: 200,
            renderCell: (params) => (
              <img
                src={params.value}
                alt="Drink"
                style={{ maxHeight: "50px" }}
              />
            ),
          },
          { field: "price", headerName: "Giá", type: "number", width: 150 },
          {
            field: "rating",
            headerName: "Đánh giá",
            type: "number",
            width: 150,
          },
          {
            field: "sale",
            headerName: "Giảm giá(%)",
            type: "number",
            width: 150,
          },
          {
            field: "sold_count",
            headerName: "Số lượng đã bán(cốc)",
            type: "number",
            width: 200,
          },
          { field: "status", headerName: "Status", width: 150 },
          {
            field: "action",
            headerName: "Thao tác",
            width: 200,
            renderCell: (params) => (
              <>
                <Fab
                  size="small"
                  color="primary"
                  aria-label="update"
                  onClick={() =>
                    navigate(`/update-product/${params.row.drinksid}`)
                  }
                >
                  <BuildIcon />
                </Fab>
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="delete"
                  onClick={() => deleteDrink(params.row.drinksid)}
                  style={{ marginLeft: "8px" }}
                >
                  <DeleteIcon />
                </Fab>
              </>
            ),
          },
        ]}
        pagination
        pageSize={10} // Số lượng dòng trên mỗi trang
        rowsPerPageOptions={[5]} // Các tùy chọn số lượng dòng mỗi trang
        disableRowSelectionOnClick
        getRowId={(row) => row.drinksid}
      />
      <Fab
        style={{ position: "fixed", right: 20, bottom: 110 }}
        color="primary"
        aria-label="add"
        onClick={() => navigate("/create-new-product")}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default ViewProduct;
