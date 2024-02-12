import { useRouteError } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="md:flex block h-screen w-full">
      <Sidebar />
      <div className="flex flex-col space-y-3 items-center justify-center lg:mx-24 mx-4 w-full">
        <h1 className="text-7xl font-semibold text-[#493983]">Oops!</h1>
        <h3 className="font-medium text-xl text-slate-800">
          Desculpe, ocorreu um erro inesperado.
        </h3>
        <h4 className="text-gray-400/80 text-lg italic">
          {error.statusText || error.message}
        </h4>
      </div>
    </div>
  );
}
