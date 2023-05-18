const mostFrequentInteger = (array) => {
  const occurrences = {};
  array.forEach((integer) => {
    if (occurrences[integer]) {
      occurrences[integer] += 1;
    } else {
      occurrences[integer] = 1;
    }
  });
  let mostFrequent;
  let highestOccurrences = 1;
  occurrences.forEach((key, value) => {
    if (value > highestOccurrences) {
      mostFrequent = key;
      highestOccurrences = value;
    }
  });

  return mostFrequent;
}