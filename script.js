// Função para pegar dados do localStorage
function pegarItens() {
  const itensJSON = localStorage.getItem('cmdb-itens');
  return itensJSON ? JSON.parse(itensJSON) : [];
}

// Função para salvar dados no localStorage
function salvarItens(itens) {
  localStorage.setItem('cmdb-itens', JSON.stringify(itens));
}

// Cadastro do formulário
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const dataCompra = document.getElementById('dataCompra').value;
    const modelo = document.getElementById('modelo').value.trim();
    const usuario = document.getElementById('usuario').value.trim();

    if (!nome || !dataCompra || !modelo || !usuario) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    let itens = pegarItens();

    itens.push({
      id: Date.now(),
      nome,
      dataCompra,
      modelo,
      usuario,
    });

    salvarItens(itens);

    document.getElementById('msgSucesso').textContent = 'Item cadastrado com sucesso!';
    formCadastro.reset();
  });
}

// Listagem dos itens na tabela
function carregarItensTabela() {
  const tabelaBody = document.querySelector('#tabelaItens tbody');
  if (!tabelaBody) return;

  const itens = pegarItens();

  tabelaBody.innerHTML = '';

  itens.forEach(item => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.dataCompra}</td>
      <td>${item.modelo}</td>
      <td>${item.usuario}</td>
      <td>
        <button onclick="excluirItem(${item.id})" style="color: red;">Excluir</button>
      </td>
    `;

    tabelaBody.appendChild(tr);
  });
}

// Função para excluir item
function excluirItem(id) {
  if (!confirm('Tem certeza que deseja excluir este item?')) return;

  let itens = pegarItens();
  itens = itens.filter(item => item.id !== id);
  salvarItens(itens);
  carregarItensTabela();
}

// Carregar tabela automaticamente na página lista.html
if (document.getElementById('tabelaItens')) {
  carregarItensTabela();
}
