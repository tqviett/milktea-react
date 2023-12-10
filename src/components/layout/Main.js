import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Routes from "../routes/IndexRoutes";

const defaultTheme = createTheme();

export default function Main() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Container component="main">
          <Routes />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
