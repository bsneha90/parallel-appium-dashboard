export function getDuration (endTime, startTime){
    let timeStart = new Date("01/01/2007 " + startTime);
    let timeEnd = new Date("01/01/2007 " + endTime);
    var diff = (timeEnd - timeStart) / 60000;
    return (diff * 60).toFixed();
}