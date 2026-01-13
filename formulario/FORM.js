// CABEÇALHO 

const toggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

toggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Fale Conosco //
const menuDropdownBtn = document.getElementById('menuDropdownBtn');
const menuDropdownOptions = document.getElementById('menuDropdownOptions');

menuDropdownBtn.addEventListener('click', () => {
  if (menuDropdownOptions.style.display === 'flex') {
    menuDropdownOptions.style.display = 'none';
  } else {
    menuDropdownOptions.style.display = 'flex';
  }
});
// Fale Conosco //

// form //

 // Mostrar nome do arquivo
  const inputFile = document.getElementById('curriculo');
  const fileNameDisplay = document.getElementById('file-name');

  inputFile.addEventListener('change', function () {
    if (this.files.length > 0) {
      fileNameDisplay.textContent = `Arquivo selecionado: ${this.files[0].name}`;
    } else {
      fileNameDisplay.textContent = 'Formatos aceitos: .doc, .pdf ou .png';
    }
  });

  // Impedir envio sem arquivo
  const form = document.querySelector('form'); // ou use getElementById se você tiver um id
  form.addEventListener('submit', function (e) {
    if (inputFile.files.length === 0) {
      e.preventDefault(); // impede o envio
      alert('Por favor, selecione um arquivo antes de enviar o formulário.');
    }
  });

// form //  

// whatsapp //
const mainBtn = document.getElementById('mainBtn');
const options = document.getElementById('options');

mainBtn.addEventListener('click', () => {
  // Alterna a visibilidade entre 'flex' e 'none'
  if (options.style.display === 'flex') {
    options.style.display = 'none';
  } else {
    options.style.display = 'flex';
  }
});
// menu


