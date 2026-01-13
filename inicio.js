

// ================= MODAL =================
document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    closeBtn.closest(".modal").style.display = "none";
  });
});

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }
});

// ================= MAPA =================
const regioes = {
  norte: { "Acre": 22, "Amapá": 16, "Amazonas": 62, "Pará": 144, "Rondônia": 52, "Roraima": 15, "Tocantins": 139 },
  nordeste: { "Alagoas": 102, "Bahia": 417, "Ceará": 184, "Maranhão": 217, "Paraíba": 223, "Pernambuco": 185, "Piauí": 224, "Rio Grande do Norte": 167, "Sergipe": 75 },
  "centro-oeste": { "Distrito Federal": 1, "Goiás": 246, "Mato Grosso": 141, "Mato Grosso do Sul": 79 },
  sudeste: { "Espírito Santo": 78, "Minas Gerais": 853, "Rio de Janeiro": 92, "São Paulo": 645 },
  sul: { "Paraná": 399, "Rio Grande do Sul": 497, "Santa Catarina": 295 }
};

const botoesRegioes = document.querySelectorAll(".btn-regiao");
const botoesEstados = document.getElementById("botoes-estados");
const tituloEstados = botoesEstados.querySelector("h1");
const mapaContainer = document.getElementById("mapa-container");
const mapaContatoEsquer = document.querySelector(".MapaContatoEsquer h4");

const estadosCorrigidos = { "Ceará": "Fortaleza, Ceará, Brasil", "São Paulo": "Estado de São Paulo, Brasil" };

// Evento clique nos botões de região
botoesRegioes.forEach(botao => {
  botao.addEventListener("click", () => {
    ativarBotao(botao, ".btn-regiao");
    const regiao = botao.dataset.regiao;

    // Mantém o ícone no título
    tituloEstados.innerHTML = `<i class="bi bi-geo-alt"></i> Estado - ${regiao.charAt(0).toUpperCase() + regiao.slice(1)}`;

    renderEstados(regioes[regiao], regiao);
  });
});

// Renderiza os estados com quantidade de cidades e efeito ativo
function renderEstados(estadosObj, regiao) {
  let html = `<h1><i class="bi bi-geo-alt"></i> Estado - ${regiao.charAt(0).toUpperCase() + regiao.slice(1)}</h1>`;
  for (const estado in estadosObj) {
    html += `
      <button class="btn-estado" data-estado="${estado}" data-regiao="${regiao}">
        <div class="estado-nome">${estado}</div>
        <div class="estado-cidades">${estadosObj[estado]} cidades</div>
      </button>
    `;
  }
  botoesEstados.innerHTML = html;

  document.querySelectorAll(".btn-estado").forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove a classe ativo de todos os estados
      document.querySelectorAll(".btn-estado").forEach(b => b.classList.remove("ativo"));
      // Adiciona ativo ao clicado
      btn.classList.add("ativo");

      const estado = btn.dataset.estado;
      const regiao = btn.dataset.regiao;
      tituloEstados.innerHTML = `<i class="bi bi-geo-alt"></i> Estado - ${regiao.charAt(0).toUpperCase() + regiao.slice(1)} / ${estado}`;

      mostrarMapa(estadosCorrigidos[estado] || `${estado}, Brasil`);

      // Atualiza o h4 com o nome do estado selecionado
      mapaContatoEsquer.textContent = `Precisa de entrega em ${estado}?`;
    });
  });

  // Ativa automaticamente o primeiro estado da lista
  const primeiroEstado = document.querySelector(".btn-estado");
  if (primeiroEstado) {
    primeiroEstado.click();
  }
}

// Mostra Google Maps
function mostrarMapa(local) {
  const query = encodeURIComponent(local);
  mapaContainer.classList.remove("mostrar");
  setTimeout(() => {
    mapaContainer.innerHTML = `<iframe src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAskzoiA3LW0eJICkWJy3nD6B4JoNdSPIM&q=${query}&maptype=satellite" allowfullscreen style="width:100%; height:100%; border:0;"></iframe>`;
    mapaContainer.classList.add("mostrar");
  }, 100);
}

// Ativar botão
function ativarBotao(botao, seletorGrupo) {
  document.querySelector(`${seletorGrupo}.ativo`)?.classList.remove("ativo");
  botao.classList.add("ativo");
}

// Seleciona automaticamente a primeira região ao carregar
window.addEventListener("DOMContentLoaded", () => {
  const primeiraRegiao = botoesRegioes[0];
  if (primeiraRegiao) {
    primeiraRegiao.click();
  }
});