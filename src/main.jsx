import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Listagem from "./Routes/Listagem.jsx";
import ErrorPage from "./Routes/ErrorPage.jsx";
import Cadastro from "./Routes/Cadastro.jsx";
import EditarLista from "./Routes/EditarLista.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="cadastro" />,
      },
      {
        path: "cadastro",
        element: <Cadastro />,
      },
      {
        path: "cadastro/:id/editar",
        element: <EditarLista />,
      },
      {
        path: "lista",
        element: <Listagem />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
