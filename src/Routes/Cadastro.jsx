import { useState } from "react";
import FormContainer from "../components/Form/FormContainer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cadastro() {
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

  // Estado para armazenar os itens
  const [, setItems] = useState([]);

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
    setQuantityValue("0");
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

  // Função para lidar com a mudança no checkbox
  const handlePerishableYesChange = () => {
    if (!perishable) {
      setPerishable(true);
    }
  };

  // Função para lidar com a mudança no checkbox "Não"
  const handlePerishableNoChange = () => {
    if (perishable) {
      setPerishable(false);
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
  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar se o campo Nome do Item está preenchido
    if (itemName.trim() === "") {
      setItemNameError("Por favor, preencha este campo.");
      return;
    }

    // Verificar se o campo Unidade de Medida está selecionado
    if (measurement.trim() === "") {
      setMeasurementError("Por favor, selecione a Unidade de Medida.");
      return;
    }

    // Verificar se o campo Preço está preenchido
    if (price.trim() === "" || price.trim() === "R$") {
      setPriceError("Por favor, preencha o campo Preço.");
      return;
    }

    // Verificar se a data de fabricação foi preenchida
    if (manufacturingDate.trim() === "") {
      setManufacturingDateError(
        "Por favor, preencha o campo Data de Fabricação."
      );
      return;
    }

    // Função para formatar a data no formato "dd/MM/yyyy"
    function formatDate(data) {
      if (!data) return ""; // Retorna uma string vazia se a data for undefined
      const partesData = data.split("-");
      const day = partesData[2];
      const month = partesData[1];
      const year = partesData[0];
      return `${day}/${month}/${year}`;
    }

    // Verificar se a data de validade é obrigatória (se o produto for perecível)
    if (perishable && expirationDate.trim() === "") {
      setPerishableError("Por favor, preencha o campo Data de Validade.");
      return;
    }

    // Verificar se a data de fabricação é superior à data de validade
    if (
      expirationDate.trim() !== "" &&
      manufacturingDate.trim() !== "" &&
      new Date(manufacturingDate) > new Date(expirationDate)
    ) {
      setPerishableError("O produto se encontra vencido.");
      return;
    }

    // Criar um novo item
    const newItem = {
      itemName: itemName,
      measurement: measurement,
      quantityValue: quantityValue,
      price: price,
      expirationDate: formatDate(expirationDate),
      manufacturingDate: formatDate(manufacturingDate),
      perishable: perishable ? "Sim" : "Não",
    };

    // Verificar se já existem itens salvos no localStorage
    let storedItems = localStorage.getItem("items");
    let items = [];

    if (storedItems) {
      items = JSON.parse(storedItems);
      // Verifica se o itemName já existe em algum item do localStorage
      const itemExists = items.some(
        (item) => item.itemName.toLowerCase() === itemName.toLowerCase()
      );
      if (itemExists) {
        setItemNameError(
          "Nome já cadastrado. Por favor, escolha um nome diferente."
        );
        toast.error(
          "Este nome já foi cadastrado. Por favor, escolha um nome diferente."
        );
        return;
      }
    }

    setItems([...items, newItem]);
    localStorage.setItem("items", JSON.stringify([...items, newItem]));

    // Se tudo for validado corretamente
    // Resetar os campos de entrada e os campos de erro
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

    console.log({
      itemName: itemName,
      measurement: measurement,
      quantityValue: quantityValue,
      price: price,
      expirationDate: formatDate(expirationDate),
      manufacturingDate: formatDate(manufacturingDate),
      perishable: perishable ? "Sim" : "Não",
    });

    // Exibir o toast de sucesso
    toast.success("Item adicionado com sucesso!");
  };

  return (
    <div className="flex-col lg:mx-24 md:mx-8 w-full">
      <h1 className="text-4xl ms-4 md:ms-0 py-6 md:pb-6 font-semibold text-[#493983]">
        Cadastrar Item
      </h1>
      <div className="bg-white lg:px-12 md:p-8 rounded-md shadow">
        <div className="bg-white md:px-0 px-8 md:pt-0 pt-6 w-full rounded-md">
          <FormContainer onSubmit={handleSubmit}>
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
                disabled={!perishable}
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
                  checked={perishable}
                  onChange={handlePerishableYesChange}
                />
                <span className="translate-x-[-10px] text-[#493983] font-semibold ">
                  Sim
                </span>
                <FormContainer.CheckboxOption
                  id="perishableNo"
                  name="perishible"
                  value="Não"
                  checked={!perishable}
                  onChange={handlePerishableNoChange}
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
              <FormContainer.Button onClick={handleSubmit}>
                Salvar
              </FormContainer.Button>
            </FormContainer.ButtonContainer>
          </FormContainer>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
