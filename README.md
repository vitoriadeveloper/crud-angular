# Documentação
Este projeto está na versão  17.3.8. do Angular e tem como objetivo um crud em Angular para fins de conhecimento e aprendizado.

## Topics
- [Documentação](#documentação)
  - [Topics](#topics)
  - [Como rodar a aplicação](#como-rodar-a-aplicação)
  - [ProductService](#productservice)
  - [RegisterComponent](#registercomponent)
    - [Injeções](#injeções)
    - [Métodos](#métodos)
    - [Further help](#further-help)
  - [TableComponent](#tablecomponent)
    - [Métodos](#métodos-1)

## Como rodar a aplicação
Comece clonando o repositório e em seguida executando o código abaixo.
```bash
npm run install
```

Após a criação da pasta node_modules, execute o comando abaixo,
```bash
npm run start
```

## ProductService
O ProductService é um serviço injetável que fornece métodos para interagir com uma lista de produtos armazenados no sessionStorage do navegador.
- `storageKey` - É a variável responsável por armazenar os itens cadastrados na session storage.
- --
- `items` - É como os produtos serão chamados na session storage.
- --
- `getItem()` - Função responsável por obter a lista de produtos cadastrados na session storage e retorna um Observable que emite essa lista.
- --
- `saveItems()` - Função responsável por salvar a lista de produtos na session storage.
- --
- `addItem()` - Função responsável por adicionar um novo produto a lista do array da session storage e recebe como parâmetro o item a ser salvo. Retorna um OBSERVABLE que emite quando a operação for concluída.
- --
- `updateItem()` - Função responsável por atualizar um novo produto a lista do array da session storage, recebe como parâmetro o index do item e o novo valor dele a ser salvo. Retorna um OBSERVABLE que emite quando a operação for concluída ou quando tiver um erro.
- --
- `deleteItem()` - Função responsável por deleter um item da session storage, recebe como parâmetro o index do item a ser deletado. Retorna um OBSERVABLE que emite quando a operação for concluída ou quando tiver um erro.

## RegisterComponent
O RegisterComponent é um componente standalone do Angular usado para registrar e editar produtos. Ele fornece um formulário com validação e interação com o serviço de produtos.
- `itemForm` - FormGroup para gerenciamento do formulário do produto.
- --
- `isEditing` - Booleano que indica se o formulário está em modo de edição.
- --
- `currentItemIndex` - Índice do item atualmente sendo editado.
- --
- `isExpired` e `isInvalidDateRange`: Indicadores de erro específicos para datas no formulário.
- --
  ### Injeções
  - `route` - Gerencia a navegação do componente.
  - --
  - `fb` - FormBuilder usado para construir o FormGroup.
- --
- `productService` - Serviço para manipulação de produtos.
- --
- `activatedRoute`: Obtém parâmetros da rota ativa.
- --
- `toastr` - Serviço para exibição de mensagens toast.
- --
- `datePipe` - Pipe personalizado para formatação de datas.

### Métodos
- `ngOnInit()` - Inicializa o formulário e verifica se o componente está em modo de edição com base nos parâmetros da rota.
- `createForm()` - Cria o formulário do produto com validação personalizada para datas.
- `dateValidator()` - Valida as datas do formulário, assegurando que a data de validade não seja anterior à data atual e que a data de fabricação seja anterior à data de validade para produtos perecíveis.
- `updateErrorStates()` -  Atualiza os estados de erro para exibição no formulário.
- `onClickCancelButton()` - Navega de volta para a página inicial ao cancelar a operação.
- `onSubmit()` - Processa os dados do formulário, validando e salvando o produto. Exibe notificações de sucesso ou erro.
- `loadItemData` - Carrega os dados de um item específico para edição com base no índice fornecido.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## TableComponent
O TableComponent é um componente standalone do Angular usado para exibir e gerenciar uma lista de produtos. Fornece funcionalidades como editar ou excluir um item.

- `products: Product[]` - Armazena a lista de produtos obtidos do serviço.
  
### Métodos 
- `ngOnInit()` - Método que inicia o ciclo de vida do angular e chama o `getProducts()`
- --
- `getProducts()` - Faz uma requisição para obter os produtos utilizando `ProductService`. Atualiza a propriedade products com a lista de produtos ou exibe uma mensagem de erro caso a requisição não dê certo.
- --
- `editProducts()` - Recebe um parâmetro que seria o index, e navega para a página para editar o produto específico identificado pelo seu index.
---
- `showSucess()` - Exibe uma notificação de sucesso usando o `ToastrService`.
---
- `showError()` - Exibe uma notificação de erro usando o `ToastrService`.
- ---
- `deleteProduct()` - Excluir um produto específico identificado pelo seu index que recebe como parâmetro. Antes de excluir, solicita uma confirmação do usuário. Após a exclusão, exibe uma mensagem de sucesso e atualiza a lista de produtos. Se ocorrer um erro durante a exclusão, exibe uma mensagem de erro.
- --
