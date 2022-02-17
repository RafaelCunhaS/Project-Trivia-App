export const setRanking = (dataObj) => {
  let dataRanking = JSON.parse(localStorage.getItem('ranking'));
  console.log(dataRanking);
  if (dataRanking === null) {
    dataRanking = [];
  }
  dataRanking.push(dataObj);
  dataRanking.sort((a, b) => b.score - a.score);
  localStorage.setItem('ranking', JSON.stringify(dataRanking));
};

export const getRanking = () => JSON.parse(localStorage.getItem('ranking'));
