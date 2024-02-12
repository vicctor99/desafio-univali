import { useEffect, useState } from "react";
import FormContainer from "../components/Form/FormContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditarLista() {
  // Definindo o estado inicial para cada campo do formulário
  const [itemName, setItemName] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [price, setPrice] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [perishable, setPerishable] = useState(false);
  const [quantityValue, setQuantityValue] = useState("0");
  const [itemNameError, setItemNameError] = useState("");
  const [measurementError, setMeasurementError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [manufacturingDateError, setManufacturingDateError] = useState("");
  const [perishableError, setPerishableError] = useState("");
  const [quantityValueError, setQuantityValueError] = useState("");

  useEffect(() => {
    // Extrair o itemId da URL
    const url = window.location.href;
    const parts = url.split("/");
    const itemId = parts[parts.length - 2]; // Pegar o penúltimo elemento

    // Função para formatar a data no formato para "yyyy-MM-dd"
    function formatDate(dateString) {
      if (!dateString) return "";
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    }

    // Recuperar os dados do itemId armazenados no localStorage
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];

    // Verifica se o item com o ID fornecido existe
    if (itemId >= 0 && itemId < storedItems.length) {
      // Acessa o item com base no ID fornecido
      const itemNaPosicaoEncontrada = storedItems[itemId];
      console.log("itemId selecionado: " + itemId);
      console.log(
        "valor de storedItems: ",
        JSON.stringify(storedItems[itemId])
      );

      // Formata as datas
      const formattedExpirationDate = formatDate(
        itemNaPosicaoEncontrada.expirationDate
      );
      const formattedManufacturingDate = formatDate(
        itemNaPosicaoEncontrada.manufacturingDate
      );

      // Definir os estados com os valores recuperados
      setItemName(itemNaPosicaoEncontrada.itemName || "");
      setMeasurement(itemNaPosicaoEncontrada.measurement || "");
      setQuantityValue(itemNaPosicaoEncontrada.quantityValue || "");
      setPrice(itemNaPosicaoEncontrada.price || "");
      setExpirationDate(formattedExpirationDate);
      setManufacturingDate(formattedManufacturingDate);
      setPerishable(itemNaPosicaoEncontrada.perishable || false);

      console.log("Item encontrado:", itemNaPosicaoEncontrada);
    } else {
      window.location.href = `/cadastro`;
      console.log("itemId selecionado: " + itemId);
      console.log(
        "valor de storedItems: ",
        JSON.stringify(storedItems[itemId])
      );
    }
  }, []);

  // Função para validar apenas letras
  const handleItemNameChange = (event) => {
    let newValue = event.target.value;
    newValue = newValue.replace(/[^a-zA-Z\s]/g, "");

    setItemName(newValue);
    setItemNameError("");
  };

  // Função para lidar com a mudança na unidade de medida
  const handleMeasurementChange = (event) => {
    const newValue = event.target.value;
    setMeasurement(newValue);

    if (newValue.trim() === "") {
      setMeasurementError("Por favor, selecione a Unidade de Medida.");
    } else {
      setMeasurementError("");
    }

    // Limpa o valor de quantityValue quando a unidade de medida é alterada
    setQuantityValue("");
  };

  // Função para lidar com a mudança na quantidade
  const handleQuantityChange = (event) => {
    let newValue = event.target.value;
    // Define a string formatada
    let formattedValue = "";

    // Remove tudo que não é número
    newValue = newValue.replace(/[^\d]/g, "");

    // Remove os zeros à esquerda
    newValue = newValue.replace(/^0+/g, "");

    // Adiciona a abreviação
    let abbreviation = "";
    switch (measurement) {
      case "litro":
        abbreviation = " lt";
        break;
      case "quilograma":
        abbreviation = " kg";
        break;
      case "unidade":
        abbreviation = " un";
        formattedValue = newValue + abbreviation;
        setQuantityValue(formattedValue);
        return;
      default:
        break;
    }

    // Adiciona a abreviação à string formatada
    if (newValue.length > 0) {
      if (newValue.length === 1) {
        formattedValue = "0,00" + newValue + abbreviation;
      } else if (newValue.length === 2) {
        formattedValue = "0,0" + newValue + abbreviation;
      } else if (newValue.length === 3) {
        formattedValue = "0," + newValue + abbreviation;
      } else {
        formattedValue =
          newValue.slice(0, -3) + "," + newValue.slice(-3) + abbreviation;
      }
    }

    setQuantityValue(formattedValue);
  };

  // Função para lidar com a tecla de retrocesso (backspace)
  const handleBackspace = (event) => {
    const newValue = event.target.value;

    // Verifica se a tecla pressionada é a tecla de retrocesso (backspace)
    if (event.keyCode === 8) {
      // Remove a abreviação da string formatada
      let formattedValue = newValue.replace(/\s+\S*$/, "");

      // Atualiza o estado com a string formatada sem a abreviação
      setQuantityValue(formattedValue);
    }
  };

  // Função para lidar com a mudança no campo de preço
  const handlePriceChange = (event) => {
    let newValue = event.target.value;

    // Remove tudo que não é número
    newValue = newValue.replace(/[^\d]/g, "");

    // Remove os zeros à esquerda
    newValue = newValue.replace(/^0+/g, "");

    // Adiciona a máscara de dinheiro
    let formattedValue = "R$ ";

    if (newValue.length === 0) {
      setPrice(""); // Se o campo estiver vazio, remove a vírgula
      return;
    }

    if (newValue.length === 1) {
      formattedValue += "0,0" + newValue;
    } else if (newValue.length === 2) {
      formattedValue += "0," + newValue;
    } else {
      formattedValue += newValue.slice(0, -2) + "," + newValue.slice(-2);
    }

    setPrice(formattedValue);
    setPriceError("");
  };

  // Fun~çao para limpar o campo validade se o checkbox for === "Não"
  const handlePerishableChange = (event) => {
    const value = event.target.value;
    setPerishable(value);

    // Verifica se o valor selecionado é "Não"
    if (value === "Não") {
      setExpirationDate("");
    }
  };

  // Função para limpar o formulário
  const handleClearForm = () => {
    setItemName("");
    setMeasurement("");
    setPrice("");
    setExpirationDate("");
    setManufacturingDate("");
    setPerishable(false);
    setQuantityValue("0");
    setItemNameError("");
    setMeasurementError("");
    setPriceError("");
    setManufacturingDateError("");
    setPerishableError("");
    setQuantityValueError("");
  };

  const navigate = useNavigate();

  // Funçaõ para redirecionar o usuário
  const handleClearFormAndRedirect = () => {
    navigate("/lista"); // Redireciona para a página de listagem
    handleClearForm();
  };

  // Função para enviar o formulário
  const handleUpdate = (event) => {
    event.preventDefault();

    // Realizar as verificações necessárias antes de atualizar o localStorage
    if (itemName.trim() === "") {
      setItemNameError("Por favor, preencha este campo.");
      return;
    }

    if (measurement.trim() === "") {
      setMeasurementError("Por favor, selecione a Unidade de Medida.");
      return;
    }

    if (price.trim() === "" || price.trim() === "R$") {
      setPriceError("Por favor, preencha o campo Preço.");
      return;
    }

    if (manufacturingDate.trim() === "") {
      setManufacturingDateError(
        "Por favor, preencha o campo Data de Fabricação."
      );
      return;
    }

    if (perishable === "Sim" && expirationDate.trim() === "") {
      setPerishableError("Por favor, preencha o campo Data de Validade.");
      return;
    }

    if (
      expirationDate.trim() !== "" &&
      manufacturingDate.trim() !== "" &&
      new Date(manufacturingDate) > new Date(expirationDate)
    ) {
      setPerishableError("Data de Fabricação superior à Data de Validade.");
      return;
    }

    // Se todas as verificações passarem, proceda com a atualização do localStorage
    // Extrair o itemId da URL
    const url = window.location.href;
    const parts = url.split("/");
    const itemId = parseInt(parts[parts.length - 2]); // Convertendo para número

    // Recuperar os itens do localStorage
    const storedItems = JSON.parse(localStorage.getItem("items")) || [];

    // Função para formatar a data no formato "dd/MM/yyyy"
    function formatDate(data) {
      if (!data) return ""; // Retorna uma string vazia se a data for undefined
      const partesData = data.split("-");
      const day = partesData[2];
      const month = partesData[1];
      const year = partesData[0];
      return `${day}/${month}/${year}`;
    }

    // Verificar se o índice é válido
    if (itemId >= 0 && itemId < storedItems.length) {
      // Criar um novo item com os valores atualizados
      const updatedItem = {
        ...storedItems[itemId], // Usando o índice como identificador
        itemName: itemName,
        measurement: measurement,
        quantityValue: quantityValue,
        price: price,
        expirationDate: formatDate(expirationDate),
        manufacturingDate: formatDate(manufacturingDate),
        perishable: perishable,
      };

      // Atualizar o item no array de itens
      storedItems[itemId] = updatedItem;

      // Atualizar o localStorage com os itens atualizados
      localStorage.setItem("items", JSON.stringify(storedItems));

      // Exibir o toast de sucesso
      toast.success("Item editado com sucesso!");
      window.location.href = `/lista`;
      console.log("Item editado:", updatedItem);
    } else {
      toast.error("Índice inválido para edição!");
    }
  };

  return (
    <div className="flex-col lg:mx-24 mx-4 self-start w-full">
      <h1 className="text-4xl ms-4 md:ms-0 py-6 md:pb-6 font-semibold text-[#493983]">
        Editar Item
      </h1>
      <div className="bg-white w-full lg:px-12 px-8 py-8 rounded-md shadow">
        <div className="bg-white w-full rounded-md">
          <FormContainer onSubmit={handleUpdate}>
            {/* Nome do Item  */}
            <FormContainer.FieldContainer>
              <FormContainer.Label htmlFor="item-name">
                Nome do item
              </FormContainer.Label>
              <FormContainer.Input
                id="item-name"
                name="item-name"
                type="text"
                placeholder="Nome do item"
                value={itemName}
                onChange={handleItemNameChange}
                maxLength={50}
                error={!!itemNameError}
              />
              {itemNameError && (
                <span className="text-red-500 text-sm">{itemNameError}</span>
              )}
            </FormContainer.FieldContainer>
            {/* Unidade de Medida */}
            <FormContainer.FieldContainer>
              <FormContainer.Label htmlFor="measurement">
                Unidade de medida
              </FormContainer.Label>
              <FormContainer.Select
                id="measurement"
                name="measurement"
                value={measurement}
                onChange={handleMeasurementChange}
                error={!!measurementError}
              >
                <FormContainer.Option value="" hidden>
                  Selecionar
                </FormContainer.Option>
                <FormContainer.Option value="litro">Litro</FormContainer.Option>
                <FormContainer.Option value="quilograma">
                  Quilograma
                </FormContainer.Option>
                <FormContainer.Option value="unidade">
                  Unidade
                </FormContainer.Option>
              </FormContainer.Select>
              {measurementError && (
                <span className="text-red-500 text-sm">{measurementError}</span>
              )}
            </FormContainer.FieldContainer>
            {/* Quantidade  */}
            <FormContainer.FieldContainer>
              <FormContainer.Label htmlFor="quantity">
                Quantidade
              </FormContainer.Label>
              <FormContainer.Input
                id="quantity"
                name="quantity"
                type="text"
                placeholder="Quantidade"
                value={quantityValue}
                onChange={handleQuantityChange}
                disabled={!measurement}
                error={!!quantityValueError}
                onKeyDown={handleBackspace}
              />
              {quantityValueError && (
                <span className="text-red-500 text-sm">
                  {quantityValueError}
                </span>
              )}
            </FormContainer.FieldContainer>
            {/* Preço  */}
            <FormContainer.FieldContainer>
              <FormContainer.Label htmlFor="price">Preço</FormContainer.Label>
              <FormContainer.Input
                id="price"
                name="price"
                type="text"
                placeholder="R$ 0,00"
                value={price}
                onChange={handlePriceChange}
                error={!!priceError}
              />
              {priceError && (
                <span className="text-red-500 text-sm">{priceError}</span>
              )}
            </FormContainer.FieldContainer>
            {/* Data de Validade  */}
            <FormContainer.FieldContainer>
              <FormContainer.Label htmlFor="expiration-date">
                Data de validade
              </FormContainer.Label>
              <FormContainer.Input
                id="expiration-date"
                name="expiration-date"
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                disabled={perishable === "Não"}
                error={!!perishableError}
              />
              {perishableError && (
                <span className="text-red-500 text-sm">{perishableError}</span>
              )}
            </FormContainer.FieldContainer>
            {/* Data de Fabricação  */}
            <FormContainer.FieldContainer>
              <FormContainer.Label htmlFor="manufacturing-date">
                Data de fabricação
              </FormContainer.Label>
              <FormContainer.Input
                id="manufacturing-date"
                name="manufacturing-date"
                type="date"
                value={manufacturingDate}
                onChange={(e) => setManufacturingDate(e.target.value)}
                error={!!manufacturingDateError}
              />
              {manufacturingDateError && (
                <span className="text-red-500 text-sm">
                  {manufacturingDateError}
                </span>
              )}
            </FormContainer.FieldContainer>
            {/* Produto Perecível  */}
            <FormContainer.FieldContainer>
              <FormContainer.Label htmlFor="perishable">
                Produto perecível
              </FormContainer.Label>
              <FormContainer.Checkbox>
                <FormContainer.CheckboxOption
                  id="perishableYes"
                  name="perishible"
                  value="Sim"
                  checked={perishable === "Sim"}
                  onChange={handlePerishableChange}
                />
                <span className="translate-x-[-10px] text-[#493983] font-semibold ">
                  Sim
                </span>
                <FormContainer.CheckboxOption
                  id="perishableNo"
                  name="perishible"
                  value="Não"
                  checked={perishable === "Não"}
                  onChange={handlePerishableChange}
                />
                <span className="translate-x-[-10px] text-[#493983] font-semibold ">
                  Não
                </span>
              </FormContainer.Checkbox>
            </FormContainer.FieldContainer>
            {/* Botões  */}
            <FormContainer.ButtonContainer>
              <FormContainer.Button
                onClick={handleClearFormAndRedirect}
                btnDanger={true}
              >
                Cancelar
              </FormContainer.Button>
              <FormContainer.Button onClick={handleUpdate}>
                Salvar
              </FormContainer.Button>
            </FormContainer.ButtonContainer>
          </FormContainer>
        </div>
      </div>
    </div>
  );
}

export default EditarLista;
