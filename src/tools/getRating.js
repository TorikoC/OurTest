function f(stars) {
  const result = {
    score: 0.0,
    voteCnt: 0,
    list: [],
  }
  if (!stars || stars.length === 0) {
    return result;
  }
  const table = [];
  const voteCnt = stars.length;
  result.voteCnt = voteCnt;
  let totalScore = 0;
  stars.forEach(obj => {
    totalScore += obj.count;
    if (!table[obj.count]) {
      table[obj.count] = 1;
    } else {
      table[obj.count] += 1;
    }
  });
  const score = (totalScore / (5 * voteCnt) * 10).toFixed(2);
  result.score = score;

  for(key in table) {
    result.list.push({
      star: key,
      count: table[key],
      percent: table[key] / voteCnt,
    });
  };
  result.list.sort((o1, o2) => o1.star - o2.star);
  return result;
}

module.exports = f;