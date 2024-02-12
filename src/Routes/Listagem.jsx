import { useState, useEffect } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import TableContainer from "../components/Table/TableContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";

export default function Listagem() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  useEffect(() => {
    // Recuperar os itens armazenados no localStorage
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedItems);
  }, []);

  // Função para abrir o modal de confirmação antes de deletar um item
  const handleDeleteItem = (index) => {
    setDeletingIndex(index);
    setShowModal(true);
  };

  // Função para deletar um item
  const deleteItemConfirmed = () => {
    const updatedItems = items.filter((item, i) => i !== deletingIndex);
    setItems(updatedItems);
    // Salvar a nova lista de itens no localStorage
    localStorage.setItem("items", JSON.stringify(updatedItems));

    // Exibir o toast de sucesso
    toast.success("Item deletado com sucesso!");

    // Fechar o modal
    setShowModal(false);
  };

  // Função para lidar com a edição de um item
  const handleEditItem = (index) => {
    // Redirecionar para a página de edição com o ID do item
    window.location.href = `/cadastro/${index}/editar`;
  };

  return (
    <div className="flex-col lg:mx-24 md:mx-4 self-start w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl ms-4 md:ms-0 py-6 md:pb-6 font-semibold text-[#493983]">
          Lista dos Itens
        </h1>
        <Link to="/cadastro">
          <button className="bg-violet-500 sm:px-4 sm:py-2 p-2 rounded-full sm:rounded-md text-white flex items-center gap-2 md:mt-4 mt-1 me-4 md:me-0 hover:bg-violet-600 shadow">
            <span>
              <IoIosAddCircle className="md:h-6 md:w-6 h-8 w-8" />
            </span>
            <span className="font-semibold hidden sm:flex">Novo item</span>
          </button>
        </Link>
      </div>
      <div className="bg-white lg:px-12 md:p-8 rounded-md shadow w-full overflow-auto">
        <TableContainer.Container>
          <TableContainer.Thead>
            <TableContainer.Tr>
              <TableContainer.Th>Nome</TableContainer.Th>
              <TableContainer.Th>Unidade</TableContainer.Th>
              <TableContainer.Th>Quantidade</TableContainer.Th>
              <TableContainer.Th>Preço</TableContainer.Th>
              <TableContainer.Th>Perecível</TableContainer.Th>
              <TableContainer.Th>Data de Fab.</TableContainer.Th>
              <TableContainer.Th>Validade</TableContainer.Th>
              <TableContainer.Th></TableContainer.Th>
            </TableContainer.Tr>
          </TableContainer.Thead>
          <TableContainer.Tbody>
            {items.map((item, index) => (
              <TableContainer.Tr key={index}>
                <TableContainer.Td>{item.itemName}</TableContainer.Td>
                <TableContainer.Td>{item.measurement}</TableContainer.Td>
                <TableContainer.Td>{item.quantityValue}</TableContainer.Td>
                <TableContainer.Td>{item.price}</TableContainer.Td>
                <TableContainer.Td>{item.perishable}</TableContainer.Td>
                <TableContainer.Td>{item.manufacturingDate}</TableContainer.Td>
                <TableContainer.Td>{item.expirationDate}</TableContainer.Td>
                <TableContainer.Td>
                  <TableContainer.ButtonContainer>
                    <button
                      onClick={() => handleEditItem(index)}
                      className="bg-blue-500 p-2 rounded-md hover:bg-blue-600"
                    >
                      <FaEdit className="text-white md:h-4 md:w-4 h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(index)}
                      className="bg-red-500 p-2 rounded-md hover:bg-red-600"
                    >
                      <FaRegTrashAlt className="text-white md:h-4 md:w-4 h-3 w-3" />
                    </button>
                  </TableContainer.ButtonContainer>
                </TableContainer.Td>
              </TableContainer.Tr>
            ))}
          </TableContainer.Tbody>
        </TableContainer.Container>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center transition-all">
            <div className="bg-white flex flex-col p-8 rounded-md">
              <TiDeleteOutline className="w-20 h-20 text-red-500 self-center mb-2" />
              <p className="">Tem certeza de que deseja excluir este item?</p>
              <div className="flex items-center justify-end border-t border-gray-300 w-full pt-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="mr-4 bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400/60 text-slate-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteItemConfirmed}
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 text-white"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
