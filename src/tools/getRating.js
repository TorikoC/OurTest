function f(stars) {
  if (!stars) {
    return;
  }
  const table = [];
  const voteCnt = stars.length;
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
  const result = {
    score,
    voteCnt,
    list: []
  }
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