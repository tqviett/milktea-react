import { lazy } from "react";
import Loadable from "../ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/home/Dashboard"))
);

// utilities routing
const CreateProduct = Loadable(
  lazy(() => import("../views/products/CreateProduct"))
);
const ViewProduct = Loadable(
  lazy(() => import("../views/products/ViewProduct"))
);
const UpdateProduct = Loadable(
  lazy(() => import("../views/products/UpdateProduct"))
);

const MainRoutes = [
  {
    path: "/",
    element: <DashboardDefault />,
  },
  {
    path: "/dashboard",
    element: <DashboardDefault />,
  },
  {
    path: "/view-product",
    element: <ViewProduct />,
  },
  {
    path: "create-new-product",
    element: <CreateProduct />,
  },
  {
    path: "/update-product/:firebaseId",
    element: <UpdateProduct />,
  },
];

export default MainRoutes;
