# Desafio Univali: Victor Silva

# Projeto feito em: React Vite + Tailwind CSS + Padrão de composição


### Prática de Composição em React

Neste projeto, adotei a prática de composição ao projetar o componente `Table.Container`. Esta abordagem tem como objetivo promover a reutilização de código, facilitar a manutenção e tornar nossos componentes mais flexíveis e adaptáveis.

### Por que Usamos a Prática de Composição?

1. **Flexibilidade e Reutilização:**  
   A divisão do componente `Table.Container` em componentes menores, como `Table.Title`, `Table.Paragraph` e `Table.Button`, nos permite reutilizar esses componentes em várias partes do nosso aplicativo. Isso significa que podemos usar o mesmo componente de título, parágrafo ou botão em diferentes contextos sem a necessidade de escrever código adicional.

2. **Facilidade de Manutenção:**  
   Ao dividir nosso componente em componentes menores e especializados, tornamos nosso código mais fácil de entender e manter. Cada componente é responsável por uma única funcionalidade, o que facilita a identificação de possíveis problemas e simplifica a implementação de alterações futuras.

3. **Adaptabilidade:**  
   A prática de composição nos permite criar componentes flexíveis e adaptáveis que podem se ajustar às necessidades específicas do nosso aplicativo. Por exemplo, podemos remover o componente `Table.Button` do `Table.Container` sem afetar o restante do código, demonstrando assim a capacidade de adaptar nosso componente conforme necessário.

### Exemplo de Uso

```jsx
<Table.Container>
    <Table.Title>Título</Table.Title>
    <Table.Paragraph>Parágrafo</Table.Paragraph>
    <Table.Button>Botão</Table.Button>
</Table.Container>
````




# Documentação das Rotas

Este projeto utiliza várias rotas para diferentes funcionalidades. Abaixo está uma explicação detalhada de cada rota e sua finalidade:

## Rota: Cadastro

- **Descrição**: Esta rota leva a um formulário de cadastro, onde os usuários podem inserir novos itens.

## Rota: Listagem

- **Descrição**: Ao acessar esta rota, os usuários serão apresentados com uma tabela contendo todos os itens cadastrados anteriormente.

## Rota: EditarLista

- **Descrição**: Esta rota leva a um formulário pré-preenchido com os dados do item selecionado na rota de listagem. Os campos do formulário são preenchidos automaticamente com base no ID do item selecionado.

## Rota: ErrorPage

- **Descrição**: Em caso de erro ou acesso a uma rota inexistente, os usuários serão redirecionados para esta página de erro, que fornece uma mensagem informativa sobre o erro ocorrido.

