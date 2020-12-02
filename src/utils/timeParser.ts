export default function timeParser(time: number) {
  const hours = (time / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);

  const hourObj = new Date();
  hourObj.setHours(rhours, rminutes);
  const stringHourObj = hourObj.toLocaleTimeString(); // hh:mm:ss
  
  if (stringHourObj.slice(0,2)==='00') {
    return `${stringHourObj.slice(3,5)}m`;
  }
  return `${stringHourObj.slice(0,1)==='0' ? stringHourObj.slice(1,2) : stringHourObj.slice(0,2) }h ${stringHourObj.slice(3,5)}m`;
}