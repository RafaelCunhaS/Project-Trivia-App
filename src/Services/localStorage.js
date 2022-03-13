if (!JSON.parse(localStorage.getItem('config'))) {
  localStorage.setItem('config', JSON.stringify({
    category: 'Todas',
    dificulty: 'Todas',
    type: 'Todos',
  }));
}

export const updateConfig = (obj) => {
  localStorage.setItem('config', JSON.stringify(obj));
};

export const setRanking = (dataObj) => {
  let dataRanking = JSON.parse(localStorage.getItem('ranking'));
  if (dataRanking === null) {
    dataRanking = [];
  }
  dataRanking.push(dataObj);
  dataRanking.sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(dataRanking));
};

export const getConfig = () => JSON.parse(localStorage.getItem('config'));

export const getRanking = () => JSON.parse(localStorage.getItem('ranking'));
