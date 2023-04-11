const msToTimeString = (ms) => {
  const seconds = parseInt(Math.floor(ms / 1000));
  const minutes = parseInt(Math.floor(seconds / 60));
  const hours = parseInt(Math.floor(minutes / 60));
  const days = parseInt(Math.floor(hours / 24));

  const timeUnits = ["day", "hour", "minute", "second"];
  const time = [days, hours, minutes, seconds];

  const index = time.findIndex(time => time !== 0);
  
  const timeAmount = time[index];
  const timeUnit = timeUnits[index];
  const plural = timeAmount > 1 ? "s" : "";
  
  return `${timeAmount} ${timeUnit}${plural}`;
}

export default msToTimeString;