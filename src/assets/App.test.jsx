import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { enableFetchMocks } from 'jest-fetch-mock';
import { MenuLateral } from '../components/menu-lateral/menu-lateral';
import { CardUnidades } from '../components/cardUnidades/cardUnidades'
import { ListaUnidades} from '../components/listaUnidades/listaUnidades';
import { CadastroUnidade } from '../components/cadastroUnidade/Cadastro'

enableFetchMocks(); // Configura a simulação de fetch


//NAVBAR
describe("Testes do Componente MenuLateral", () => {
  it("renderiza o componente corretamente com logo e 3 botões/links", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <MenuLateral />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo");
    const dashboardLink = screen.getByText("Dashboard");
    const unidadesLink = screen.getByText("Unidades");
    const cadastroLink = screen.getByText("Cadastro de energia geradora");

    expect(logo).toBeInTheDocument();
    expect(dashboardLink).toBeInTheDocument();
    expect(unidadesLink).toBeInTheDocument();
    expect(cadastroLink).toBeInTheDocument();
  });

  it("o botão da rota default inicia selecionado e os demais não selecionados", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <MenuLateral />
      </MemoryRouter>
    );

    const dashboardLink = screen.getByText("Dashboard");
    const unidadesLink = screen.getByText("Unidades");
    const cadastroLink = screen.getByText("Cadastro de energia geradora");

    expect(dashboardLink).toHaveClass("active");
    expect(unidadesLink).not.toHaveClass("active");
    expect(cadastroLink).not.toHaveClass("active");
  });

  it("a página é alterada corretamente quando clica em algum botão", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <MenuLateral />
      </MemoryRouter>
    );

    const unidadesLink = screen.getByText("Unidades");
    fireEvent.click(unidadesLink);

    const unidadesPageTitle = screen.getByText("Unidades");
    expect(unidadesPageTitle).toBeInTheDocument();
  });

  it("a página é alterada para a default quando clica no logo", () => {
    render(
      <MemoryRouter initialEntries={["/unidade-geradora"]}>
        <MenuLateral />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Logo");
    fireEvent.click(logo);

    const dashboardPageTitle = screen.getByText("Dashboard");
    expect(dashboardPageTitle).toBeInTheDocument();
  });
});

//UNIDADES

describe('Testes do Componente CardUnidades', () => {
  it('renderiza o componente corretamente com título “Unidades”', () => {
    render(<CardUnidades titulo="Unidades" valor="10" />);
    
    // Verifica se o título "Unidades" está presente no componente renderizado
    expect(screen.getByText('Unidades')).toBeInTheDocument();
  });

  it('ao clicar no botão “Nova unidade”, deve renderizar o cadastro de unidade', () => {
    const mockOnClick = jest.fn();
    
    render(
      <div>
        <CardUnidades titulo="Unidades" valor="10" />
        <button onClick={mockOnClick}>Nova unidade</button>
      </div>
    );
    
    // Verifica se o componente de cadastro de unidade não está presente inicialmente
    expect(screen.queryByText('Cadastro de Unidade Geradora')).not.toBeInTheDocument();

    // Clica no botão "Nova unidade"
    userEvent.click(screen.getByText('Nova unidade'));

    // Verifica se o componente de cadastro de unidade está presente após o clique
    expect(screen.getByText('Cadastro de Unidade Geradora')).toBeInTheDocument();
  });
});

//LISTA DE UNIDADES
describe("Testes do Componente ListaUnidades", () => {
  const mockData = [
    {
      id: 1,
      apelido: "Unidade 1",
      local: "Local 1",
      marca: "Marca 1",
      modelo: "Modelo 1",
    },
    {
      id: 2,
      apelido: "Unidade 2",
      local: "Local 2",
      marca: "Marca 2",
      modelo: "Modelo 2",
    },
  ];

  beforeEach(() => {
    fetch.resetMocks(); // Limpa os mocks de fetch antes de cada teste
  });

  it("renderiza o componente com o título 'Lista de Unidades'", () => {
    render(<ListaUnidades mudarFormulario={() => {}} />);
    const titleElement = screen.getByText("Lista de Unidades");
    expect(titleElement).toBeInTheDocument();
  });

  it("renderiza a tabela com o cabeçalho correto", () => {
    render(<ListaUnidades mudarFormulario={() => {}} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(5);
    expect(headers[0]).toHaveTextContent("ID");
    expect(headers[1]).toHaveTextContent("Apelido");
    expect(headers[2]).toHaveTextContent("Local");
    expect(headers[3]).toHaveTextContent("Marca");
    expect(headers[4]).toHaveTextContent("Modelo");
  });

  it("renderiza a primeira linha da tabela corretamente com dados simulados", () => {
    fetch.mockResponseOnce(JSON.stringify(mockData)); // Simula a resposta da API
    render(<ListaUnidades mudarFormulario={() => {}} />);
    const idElement = screen.getByText("1");
    const apelidoElement = screen.getByText("Unidade 1");
    const localElement = screen.getByText("Local 1");
    const marcaElement = screen.getByText("Marca 1");
    const modeloElement = screen.getByText("Modelo 1");
    expect(idElement).toBeInTheDocument();
    expect(apelidoElement).toBeInTheDocument();
    expect(localElement).toBeInTheDocument();
    expect(marcaElement).toBeInTheDocument();
    expect(modeloElement).toBeInTheDocument();
  });

  it("chama editarUnidade quando o botão 'Editar' é clicado", () => {
    const editarUnidade = jest.fn(); // Mock da função editarUnidade
    render(<ListaUnidades mudarFormulario={() => {}} />);
    fetch.mockResponseOnce(JSON.stringify(mockData)); // Simula a resposta da API
    const editarButton = screen.getByText("Editar");
    fireEvent.click(editarButton);
    expect(editarUnidade).toHaveBeenCalled();
  });

  it("chama removerUnidade quando o botão 'Remover' é clicado", () => {
    const removerUnidade = jest.fn(); // Mock da função removerUnidade
    render(<ListaUnidades mudarFormulario={() => {}} />);
    fetch.mockResponseOnce(JSON.stringify(mockData)); // Simula a resposta da API
    const removerButton = screen.getByText("Remover");
    fireEvent.click(removerButton);
    expect(removerUnidade).toHaveBeenCalled();
  });

  it("chama mudarFormulario quando o botão 'Nova Unidade' é clicado", () => {
    const mudarFormulario = jest.fn(); // Mock da função mudarFormulario
    render(<ListaUnidades mudarFormulario={mudarFormulario} />);
    const novaUnidadeButton = screen.getByText("Nova Unidade");
    fireEvent.click(novaUnidadeButton);
    expect(mudarFormulario).toHaveBeenCalled();
  });
});

//CADASTRO DA UNIDADE GERADORA

const mockMudarFormulario = jest.fn();

// Mock da função axios.post
jest.mock('axios');
axios.post.mockResolvedValue({ status: 201 });

describe('Testes do Componente CadastroUnidade', () => {
  beforeEach(() => {
    render(<CadastroUnidade mudarFormulario={mockMudarFormulario} />);
  });

  it('renderiza o componente corretamente com título “Cadastro de Unidade Geradora”', () => {
    const titulo = screen.getByText('Cadastro de Unidade Geradora');
    expect(titulo).toBeInTheDocument();
  });

  it('não chama a função mudarFormulario se algum campo obrigatório não estiver preenchido', () => {
    const salvarButton = screen.getByText('Salvar');
    fireEvent.click(salvarButton);
    expect(mockMudarFormulario).not.toHaveBeenCalled();
  });

  it('chama a função mudarFormulario com a opção correta ao preencher todos os campos obrigatórios', () => {
    const apelidoInput = screen.getByPlaceholderText('Painel 1');
    const localInput = screen.getByPlaceholderText('Rua Alberto 430');
    const marcaInput = screen.getByPlaceholderText('marca');
    const modeloInput = screen.getByPlaceholderText('155w');
    const salvarButton = screen.getByText('Salvar');

    fireEvent.change(apelidoInput, { target: { value: 'Painel 1' } });
    fireEvent.change(localInput, { target: { value: 'Rua Alberto 430' } });
    fireEvent.change(marcaInput, { target: { value: 'marca' } });
    fireEvent.change(modeloInput, { target: { value: '155w' } });

    fireEvent.click(salvarButton);
    expect(mockMudarFormulario).toHaveBeenCalledWith();
  });

  it('limpa as informações do formulário ao clicar em "Salvar"', () => {
    const apelidoInput = screen.getByPlaceholderText('Painel 1');
    const localInput = screen.getByPlaceholderText('Rua Alberto 430');
    const marcaInput = screen.getByPlaceholderText('marca');
    const modeloInput = screen.getByPlaceholderText('155w');
    const salvarButton = screen.getByText('Salvar');

    fireEvent.change(apelidoInput, { target: { value: 'Painel 1' } });
    fireEvent.change(localInput, { target: { value: 'Rua Alberto 430' } });
    fireEvent.change(marcaInput, { target: { value: 'marca' } });
    fireEvent.change(modeloInput, { target: { value: '155w' } });

    fireEvent.click(salvarButton);

    expect(apelidoInput.value).toBe('');
    expect(localInput.value).toBe('');
    expect(marcaInput.value).toBe('');
    expect(modeloInput.value).toBe('');
  });

  it('altera o estado do checkbox entre checado e não checado', () => {
    const checkbox = screen.getByLabelText('Ativo');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('inicia com os campos vazios quando não há unidade selecionada', () => {
    const apelidoInput = screen.getByPlaceholderText('Painel 1');
    const localInput = screen.getByPlaceholderText('Rua Alberto 430');
    const marcaInput = screen.getByPlaceholderText('marca');
    const modeloInput = screen.getByPlaceholderText('155w');
    
    expect(apelidoInput.value).toBe('');
    expect(localInput.value).toBe('');
    expect(marcaInput.value).toBe('');
    expect(modeloInput.value).toBe('');
  });

  it('realiza uma requisição POST na API ao preencher todos os campos obrigatórios', async () => {
    const apelidoInput = screen.getByPlaceholderText('Painel 1');
    const localInput = screen.getByPlaceholderText('Rua Alberto 430');
    const marcaInput = screen.getByPlaceholderText('marca');
    const modeloInput = screen.getByPlaceholderText('155w');
    const salvarButton = screen.getByText('Salvar');

    fireEvent.change(apelidoInput, { target: { value: 'Painel 1' } });
    fireEvent.change(localInput, { target: { value: 'Rua Alberto 430' } });
    fireEvent.change(marcaInput, { target: { value: 'marca' } });
    fireEvent.change(modeloInput, { target: { value: '155w' } });

    fireEvent.click(salvarButton);

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/unidades',
      {
        apelido: 'Painel 1',
        local: 'Rua Alberto 430',
        marca: 'marca',
        modelo: '155w',
        ativa: false,
      }
    );
  });
})
