// src/routes.js

import CatalogPage from "./pages/CatalogPage";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
// import LoginPage from "./pages/LoginPage"; // Uncomment if you have authentication
// import NotFoundPage from "./pages/NotFoundPage"; // Optional: custom 404 page

const routes = [
  {
    path: "/catalog",
    element: <CatalogPage />,
    label: "Catalog",
    // icon: <CatalogIcon />, // Optional: for navigation menus
    // roles: ["USER", "ADMIN"], // Optional: for role-based access
  },
  {
    path: "/booking/:equipmentId",
    element: <BookingPage />,
    label: "Booking",
    // roles: ["USER", "ADMIN"],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    label: "Admin",
    // roles: ["ADMIN"],
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  //   label: "Login",
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  //   label: "404",
  // },
];

export default routes;
