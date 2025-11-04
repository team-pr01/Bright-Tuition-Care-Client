import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // ✅ make sure this path matches your store file

// import SmoothScroll from "./components/SmoothScroll";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        {/* <SmoothScroll> */}
          <RouterProvider router={router} />
        {/* </SmoothScroll> */}
        <Toaster />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
