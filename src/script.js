const formClor = document.querySelector('.formClor');
const gerClor = document.querySelector('.gerClor');
const resultClor = document.querySelector('.resultClor');
const resulref = document.querySelector('.resulref');
const resulBan = document.querySelector('.resulBan');
const resulBarrPen = document.querySelector('.resulBarrPen');
const resulBarrVisc = document.querySelector('.resulBarrVisc');
const resulObs = document.querySelector('.resulObs');

const formAnt = document.querySelector('.formAnt');
const gerAnt = document.querySelector('.gerAnt');
const resultAnt = document.querySelector('.resultAnt');
const resulLazox = document.querySelector('.resulLazox');
const resulSalm = document.querySelector('.resulSalm');
const resulLazAcid = document.querySelector('.resulLazAcid');

// cloro
// se o localStorage não existir, gera 1
if (localStorage.getItem('dataBaseClor') === null) {
  localStorage.setItem('dataBaseClor', JSON.stringify({
    refeitorio: 0,
    banheiro: 0,
    barrPena: 0,
    barrVisc: 0,
    obs: ""
  }));
};

// obtem os dados do LS e converte para obj
let dataBaseClorString = localStorage.getItem('dataBaseClor');
let dataBaseClorLS = JSON.parse(dataBaseClorString);

// atualiza o LS
const updateLocalStorage = () => {
  localStorage.setItem('dataBaseClor', JSON.stringify(dataBaseClorLS));
};


// evento de submit do cloro
formClor.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const valid = confirm('Deseja Salvar?');

  if (valid === true) {
    const formData = new FormData(formClor);
  
    dataBaseClorLS.refeitorio = Number(formData.get('ref'));
    dataBaseClorLS.banheiro = Number(formData.get('ban'));
    dataBaseClorLS.barrPena = Number(formData.get('barrPena'));
    dataBaseClorLS.barrVisc = Number(formData.get('barrVis'));
    dataBaseClorLS.obs = formData.get('obs');
    
    resultClor.style.display = "flex";

    updateLocalStorage();
    updateDom();
  }
  
});


// evento que envia a mensagem
gerClor.addEventListener('click', (ev) => {
  let mensage = `*Cloração da água*%0ARefeitório: ${dataBaseClorLS.refeitorio}%0ABanheiro: ${dataBaseClorLS.banheiro}%0ABarreira Pena: ${dataBaseClorLS.barrPena}%0ABarreira Víscera: ${dataBaseClorLS.barrVisc}%0A%0A-${dataBaseClorLS.obs}${updateDom()}`;

  window.open(`https://wa.me/5585987692718?text=${mensage}`)
});



// antioxidante
if (localStorage.getItem('dataBaseAnt') === null) {
  localStorage.setItem('dataBaseAnt', JSON.stringify({
    lazMC: 0,
    salm: 0,
    lazAcid: 0
  }));
};

let dataBaseAntString = localStorage.getItem('dataBaseAnt');
let dataBaseAntLS = JSON.parse(dataBaseAntString);

const updateLocalStorageAnt = () => {
  localStorage.setItem('dataBaseAnt', JSON.stringify(dataBaseAntLS));
};

formAnt.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const valid = confirm('Deseja salvar?');

  if (valid === true) {
    const formData = new FormData(formAnt);
  
    dataBaseAntLS.lazMC = Number(formData.get('lazMC'));
    dataBaseAntLS.salm = Number(formData.get('salm'));
    dataBaseAntLS.lazAcid = Number(formData.get('lazAcid'));

    resultAnt.style.display = "flex";
  
    updateLocalStorageAnt();
    updateDom();
  };

});

gerAnt.addEventListener('click', (ev) => {
  let mensage = `*Nível dos antioxidantes/anti-salmonella*%0ALazox MC: ${dataBaseAntLS.lazMC}%0ASalmolaz: ${dataBaseAntLS.salm}%0ALaz Acid: ${dataBaseAntLS.lazAcid}%0A`;

  window.open(`https://wa.me/5585987692718?text=${mensage}`)
})


// atualiza as infos no dom e gera menssagem de não conformidade
const updateDom = () => {
  resulref.textContent = `Refeitório: ${dataBaseClorLS.refeitorio}`;
  resulBan.textContent = `Banheiro: ${dataBaseClorLS.banheiro}`;
  resulBarrPen.textContent = `Barreira Pena: ${dataBaseClorLS.barrPena}`;
  resulBarrVisc.textContent = `Barreira Víscera: ${dataBaseClorLS.barrVisc}`;
  resulObs.textContent = `Obs.: ${dataBaseClorLS.obs}`;

  resulLazox.textContent = `Lazox MC: ${dataBaseAntLS.lazMC} lt`;
  resulSalm.textContent = `Salmolaz: ${dataBaseAntLS.salm} lt`;
  resulLazAcid.textContent = `Laz Acid: ${dataBaseAntLS.lazAcid} lt`;

  let nonconformityClor = "";

  if ((dataBaseClorLS.refeitorio < 0.20) || (dataBaseClorLS.refeitorio > 2)) {
    resulref.style.color = "red";
    nonconformityClor += "%0A-Refeitório fora do padrão";
  } else {
    resulref.style.color = "green";
  };

  if ((dataBaseClorLS.banheiro < 0.20) || (dataBaseClorLS.banheiro > 2)) {
    resulBan.style.color = "red";
    nonconformityClor += "%0A-Banheiro fora do padrão";
  } else {
    resulBan.style.color = "green";
  };

  if ((dataBaseClorLS.barrPena < 0.20) || (dataBaseClorLS.barrPena > 2)) {
    resulBarrPen.style.color = "red";
    nonconformityClor += "%0A-Barreira Pena fora do padrão";
  } else {
    resulBarrPen.style.color = "green";
  };

  if ((dataBaseClorLS.barrVisc < 0.20) || (dataBaseClorLS.barrVisc > 2)) {
    resulBarrVisc.style.color = "red";
    nonconformityClor += "%0A-Barreira Víscera fora do padrão";
  } else {
    resulBarrVisc.style.color = "green";
  };

  return nonconformityClor;

}
updateDom();