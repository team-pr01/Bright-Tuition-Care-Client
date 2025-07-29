import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { HelmetProvider } from "react-helmet-async";
// import SmoothScroll from "./components/SmoothScroll";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* <SmoothScroll> */}
        <RouterProvider router={router} />
      {/* </SmoothScroll> */}
    </HelmetProvider>
  </React.StrictMode>
);
