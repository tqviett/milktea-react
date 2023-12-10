import React, { useState } from 'react';
import {
  Button,
  TextField,
  Paper,
  Typography,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from '@mui/material';
import { getDatabase, ref, push, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    image: '',
    price: '',
    rating: '',
    discount: '',
    quantitySold: '',
    status: false,
  });

  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigate = useNavigate();
  
  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? (event.target.checked ? 1 : 0) : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const saveData = async () => {
   const db = getDatabase();
   const newDocRef = push(ref(db, "drinks"));
 
   // Chuyển đổi các trường sang kiểu số nếu có thể
   const price = parseFloat(formData.price);
   const rating = parseFloat(formData.rating);
   const sale = parseFloat(formData.discount);
   const soldCount = parseInt(formData.quantitySold);
 
   // Kiểm tra nếu chuyển đổi thành công, sử dụng giá trị mới, ngược lại sử dụng giá trị ban đầu
   set(newDocRef, {
     drinks_name: formData.productName,
     description: formData.description,
     drinks_image: formData.image,
     price: isNaN(price) ? formData.price : price,
     rating: isNaN(rating) ? formData.rating : rating,
     sale: isNaN(sale) ? formData.discount : sale,
     sold_count: isNaN(soldCount) ? formData.quantitySold : soldCount,
     status: formData.status,
    })
    .then(() => {
      setNotificationOpen(true);
    })
    .catch((error) => {
      console.error("Error: " + error.message);
    });
};


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', formData);
    saveData(); // Lưu dữ liệu khi form được submit
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} style={{ padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" style={{ marginBottom: 20 }}>
          THÊM TRÀ SỮA MỚI
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                control={<Checkbox color="primary" checked={formData.status === 1} onChange={handleChange} name="status" />}
                label="Status"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={saveData}
          >
            Submit
          </Button>
        </form>
        <Button onClick={() => navigate("/view-product")}>
          Go to view product
        </Button>{" "}
        <Button onClick={() => navigate("/")}>Homepage</Button>
        <Snackbar
          open={notificationOpen}
          autoHideDuration={6000}
          onClose={handleNotificationClose}
          message="Thêm sản phẩm mới thành công"
        />
      </Paper>
    </Container>
  );
};

export default Dashboard;
