// ========== Função para cadastrar um novo item ==========
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const dataCompra = document.getElementById("dataCompra").value;
      const modelo = document.getElementById("modelo").value;
      const usuario = document.getElementById("usuario").value;

      const item = {
        id: Date.now(),
        nome,
        dataCompra,
        modelo,
        usuario,
      };

      let itens = JSON.parse(localStorage.getItem("cmdb-itens")) || [];
      itens.push(item);
      localStorage.setItem("cmdb-itens", JSON.stringify(itens));

      alert("Item cadastrado com sucesso!");
      form.reset();
    });
  }

  // ========== Se estiver na página de listagem ==========
  const tabela = document.getElementById("tabelaItens");

  if (tabela) {
    carregarItensTabela();
  }

  // ========== Se estiver na Home com campo de busca ==========
  const campoBusca = document.getElementById("buscaNome");
  if (campoBusca) {
    const botaoBusca = document.querySelector("button[onclick='buscarItem()']");
    if (botaoBusca) {
      botaoBusca.addEventListener("click", buscarItem);
    }
  }
});

// ========== Carregar tabela de itens ==========
function carregarItensTabela() {
  const itens = JSON.parse(localStorage.getItem("cmdb-itens")) || [];
  const tabela = document.getElementById("tabelaItens").querySelector("tbody");
  tabela.innerHTML = "";

  itens.forEach((item) => {
    const linha = `
      <tr>
        <td>${item.nome}</td>
        <td>${item.dataCompra}</td>
        <td>${item.modelo}</td>
        <td>${item.usuario}</td>
        <td><button onclick="excluirItem(${item.id})">Excluir</button></td>
      </tr>
    `;
    tabela.innerHTML += linha;
  });
}

// ========== Excluir item ==========
function excluirItem(id) {
  let itens = JSON.parse(localStorage.getItem("cmdb-itens")) || [];
  itens = itens.filter((item) => item.id !== id);
  localStorage.setItem("cmdb-itens", JSON.stringify(itens));
  carregarItensTabela();
}

// ========== Buscar item por nome ==========
function buscarItem() {
  const termo = document.getElementById("buscaNome").value.toLowerCase();
  const itens = JSON.parse(localStorage.getItem("cmdb-itens")) || [];
  const resultado = document.getElementById("resultadoBusca");

  const encontrados = itens.filter((item) =>
    item.nome.toLowerCase().includes(termo)
  );

  if (encontrados.length === 0) {
    resultado.innerHTML = `<p>Nenhum item encontrado.</p>`;
    return;
  }

  let html = `
    <table border="1" cellspacing="0" cellpadding="10">
      <tr>
        <th>Nome</th>
        <th>Data de Compra</th>
        <th>Modelo</th>
        <th>Usuário</th>
      </tr>
  `;

  encontrados.forEach((item) => {
    html += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.dataCompra}</td>
        <td>${item.modelo}</td>
        <td>${item.usuario}</td>
      </tr>
    `;
  });

  html += "</table>";
  resultado.innerHTML = html;
}
