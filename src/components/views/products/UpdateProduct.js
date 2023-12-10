import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  TextField,
  Checkbox,
  Snackbar,
  Paper,
  Typography,
  Container,
  Grid,
  FormControlLabel,
} from "@mui/material";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const { firebaseId } = useParams();

  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    image: "",
    price: "",
    rating: "",
    discount: "",
    quantitySold: "",
    status: "0",
  });

  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!firebaseId) {
          console.error("firebaseId is not defined");
          return;
        }

        const db = getDatabase();
        const dbRef = ref(db, "drinks/" + firebaseId);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const targetObject = snapshot.val();
          setFormData({
            productName: targetObject.drinks_name,
            description: targetObject.description,
            image: targetObject.drinks_image,
            price: String(targetObject.price),
            rating: String(targetObject.rating),
            discount: String(targetObject.sale),
            quantitySold: String(targetObject.sold_count),
            status: String(targetObject.status),
          });
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

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
          ? 1
          : 0
        : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };
  const overwriteData = async () => {
    const db = getDatabase();
    const newDocRef = ref(db, "drinks/" + firebaseId);
    set(newDocRef, {
      drinks_name: formData.productName,
      description: formData.description,
      drinks_image: formData.image,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      sale: parseFloat(formData.discount),
      sold_count: parseInt(formData.quantitySold),
      status: formData.status,
    })
      .then(() => {
        setNotificationOpen(true);
      })
      .catch((error) => {
        alert("error:", error.message);
      });
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
    navigate("/view-product");
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        style={{
          padding: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" style={{ marginBottom: 20 }}>
          CẬP NHẬT TRÀ SỮA
        </Typography>
        <form style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Tên sản phẩm"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Mô tả"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Giá"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Đánh giá"
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Giảm giá(%)"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Số lượng đã bán(cốc)"
                name="quantitySold"
                type="number"
                value={formData.quantitySold}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={formData.status}
                    onChange={handleChange}
                    name="status"
                  />
                }
                label="Status"
              />
            </Grid>
          </Grid>
          <Button
            onClick={overwriteData}
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Cập nhật
          </Button>
        </form>
        <Snackbar
          open={notificationOpen}
          autoHideDuration={6000}
          onClose={handleNotificationClose}
          message="Cập nhật sản phẩm thành công"
        />
        <Button onClick={() => navigate("/view-product")}>
          Danh sách sản phẩm
        </Button>{" "}
        <Button onClick={() => navigate("/")}>Trang chủ</Button>
      </Paper>
      <Fab
        style={{ position: "fixed", right: 20, bottom: 110 }}
        color="primary"
        aria-label="add"
        onClick={() => navigate("/create-new-product")}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}

export default UpdateProduct;
