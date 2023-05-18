const getProbabilityDistribution = (func, limit) => {
  const sum = arr => arr.reduce((total, current) => total + current, 0);
  const cum = arr => {
    let cumulativeTotal = 0;
    return arr.map((value) => {
      cumulativeTotal += value;
      return cumulativeTotal;
    });
  };

  const values = [];
  for (let i = 0; i < limit; i++) {
    values.push(func(i));
  }

  const valuesSum = sum(values);
  const normalizedValues = values.map(value => value / valuesSum);
  const valuesCum = cum(normalizedValues);

  valuesCum.unshift(0);
  valuesCum.pop();

  return valuesCum;
}

const randomFromProbabilityDistribution = (probabilityDistribution) => {
  const rand = Math.random();
  for (let i = 0; i <= probabilityDistribution.length; i++) {
    if (rand < probabilityDistribution[i]) {
      return i;
    }
  }
  return probabilityDistribution.length;
}

export { getProbabilityDistribution, randomFromProbabilityDistribution };