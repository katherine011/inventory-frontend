import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddItems from "./components/__organism/AddItems";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/addItems", element: <AddItems /> },
  { path: "/*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors position="bottom-left" />
  </StrictMode>
);
