const formClor = document.querySelector('.formClor');
const gerClor = document.querySelector('.gerClor');
const resultClor = document.querySelector('.resultClor');
const dateResul = [...document.querySelectorAll('.dateResul')];
const resulref = document.querySelector('.resulref');
const resulBan = document.querySelector('.resulBan');
const resulBarrPen = document.querySelector('.resulBarrPen');
const resulBarrVisc = document.querySelector('.resulBarrVisc');
const resulObs = document.querySelector('.resulObs');
const inputClor = [...document.querySelectorAll('.inputClor')];

const formAnt = document.querySelector('.formAnt');
const gerAnt = document.querySelector('.gerAnt');
const resultAnt = document.querySelector('.resultAnt');
const resulLazox = document.querySelector('.resulLazox');
const resulSalm = document.querySelector('.resulSalm');
const resulLazAcid = document.querySelector('.resulLazAcid');

// mascara dos inputs do cloro
inputClor.forEach(item => {
  item.addEventListener('keypress', () => {
    let inputLength = item.value.length

    if (inputLength === 1) {
      item.value += "."
    }
  
  })
})

// se o localStorage não existir, gera um localStorage
if (localStorage.getItem('dataBase') === null) {
  localStorage.setItem('dataBase', JSON.stringify({
    data: "",
    refeitorio: 0,
    banheiro: 0,
    barrPena: 0,
    barrVisc: 0,
    obsCloro: [],
    lazMC: 0,
    salm: 0,
    lazAcid: 0
  }));
};

// obtem os dados do localStorage e converte para obj
let dataBaseString = localStorage.getItem('dataBase');
let dataBase = JSON.parse(dataBaseString);

// atualiza o localStorage
const updateLocalStorage = () => {
  localStorage.setItem('dataBase', JSON.stringify(dataBase));
};

// gera a data do resultado
function dateGenerator() {
  const date = new Date();

  const day = date.getDay().toString().length == 1 ? `0${date.getDay()}` : date.getDay();
  const month = (date.getMonth() + 1).toString().length == 1 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const yaer = date.getFullYear();

  return `${day}/${month}/${yaer}`;
};

// cloro
// evento de submit do cloro
formClor.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const valid = confirm('Deseja Salvar?');

  if (valid === true) {
    const formData = new FormData(formClor);
  
    dataBase.data = dateGenerator();
    dataBase.refeitorio = Number(formData.get('ref')).toFixed(2);
    dataBase.banheiro = Number(formData.get('ban')).toFixed(2);
    dataBase.barrPena = Number(formData.get('barrPena')).toFixed(2);
    dataBase.barrVisc = Number(formData.get('barrVis')).toFixed(2);
    if (document.querySelector('#off').checked) {
      dataBase.obsCloro = [];
      dataBase.obsCloro.push("Água Bruta Desligada");
    } else {
      dataBase.obsCloro = [];
      dataBase.obsCloro.push("Água Bruta Ligada");
    };

    if (formData.get('obs').length > 0) {
      dataBase.obsCloro.push(formData.get('obs'));
    };
    
    updateLocalStorage();
    updateDom();
  }
  
});

// evento que envia a mensagem do resultado do cloro
gerClor.addEventListener('click', (ev) => {
  let mensage = `*Cloração da água*%0ARefeitório: ${dataBase.refeitorio}%0ABanheiro: ${dataBase.banheiro}%0ABarreira Pena: ${dataBase.barrPena}%0ABarreira Víscera: ${dataBase.barrVisc}%0A%0A-${dataBase.obsCloro}${updateDom()}`;

  window.open(`https://wa.me/5585987692718?text=${mensage}`);
});

// antioxidante
formAnt.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const valid = confirm('Deseja salvar?');

  if (valid === true) {
    const formData = new FormData(formAnt);
  
    dataBase.lazMC = Number(formData.get('lazMC'));
    dataBase.salm = Number(formData.get('salm'));
    dataBase.lazAcid = Number(formData.get('lazAcid'));

    resultAnt.style.display = "flex";
  
    updateLocalStorage();
    updateDom();
  };

});

// evento que envia a mensagem do resultado dos antioxidantes
gerAnt.addEventListener('click', (ev) => {
  let mensage = `*Nível dos antioxidantes/anti-salmonella*%0ALazox MC: ${dataBase.lazMC} L%0ASalmolaz: ${dataBase.salm} L%0ALaz Acid: ${dataBase.lazAcid} L`;

  window.open(`https://wa.me/5585987692718?text=${mensage}`);
})

// atualiza as infos no dom e gera menssagem de não conformidade do cloro
const updateDom = () => {
  for (const el of dateResul) {
    el.textContent = dataBase.data
  }
  resulref.textContent = `Refeitório: ${dataBase.refeitorio}`;
  resulBan.textContent = `Banheiro: ${dataBase.banheiro}`;
  resulBarrPen.textContent = `Barreira Pena: ${dataBase.barrPena}`;
  resulBarrVisc.textContent = `Barreira Víscera: ${dataBase.barrVisc}`;
  resulObs.textContent = `Obs.: ${dataBase.obsCloro}`;

  resulLazox.textContent = `Lazox MC: ${dataBase.lazMC} L`;
  resulSalm.textContent = `Salmolaz: ${dataBase.salm} L`;
  resulLazAcid.textContent = `Laz Acid: ${dataBase.lazAcid} L`;

  // nao conformidade do cloro
  let nonconformityClor = "";

  if ((dataBase.refeitorio < 0.20) || (dataBase.refeitorio > 2)) {
    resulref.style.color = "red";

    if (dataBase.refeitorio < 0.20) {
      nonconformityClor += "%0A-Refeitório abaixo do padrão";
    } else if (dataBase.refeitorio > 2) {
      nonconformityClor += "%0A-Refeitório acima do padrão";
    };
    
  } else {
    resulref.style.color = "green";
  };

  if ((dataBase.banheiro < 0.20) || (dataBase.banheiro > 2)) {
    resulBan.style.color = "red";

    if (dataBase.banheiro < 0.20) {
      nonconformityClor += "%0A-Banheiro abaixo do padrão";
    } else if (dataBase.banheiro > 2) {
      nonconformityClor += "%0A-Banheiro acima do padrão";
    };

  } else {
    resulBan.style.color = "green";
  };

  if ((dataBase.barrPena < 0.20) || (dataBase.barrPena > 2)) {
    resulBarrPen.style.color = "red";

    if (dataBase.barrPena < 0.20) {
      nonconformityClor += "%0A-Barreira Pena abaixo do padrão";
    } else if (dataBase.barrPena > 2) {
      nonconformityClor += "%0A-Barreira Pena acima do padrão";
    };

  } else {
    resulBarrPen.style.color = "green";
  };

  if ((dataBase.barrVisc < 0.20) || (dataBase.barrVisc > 2)) {
    resulBarrVisc.style.color = "red";

    if (dataBase.barrVisc < 0.20) {
      nonconformityClor += "%0A-Barreira Víscera abaixo do padrão";
    } else if (dataBase.barrVisc > 2) {
      nonconformityClor += "%0A-Barreira Víscera acima do padrão";
    };

  } else {
    resulBarrVisc.style.color = "green";
  };

  return nonconformityClor;

}
updateDom();