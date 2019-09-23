export function transition(timestamp, type) {
    if(timestamp == '' || timestamp == null) {
        return '';
    }
    const tempDate = new Date(timestamp);
    const dateYear = tempDate.getFullYear();
    const dateMonth = (tempDate.getMonth() + 1 < 10) 
        ? '0' + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1;
    const dateDay = (tempDate.getDate() < 10)
        ? '0' + tempDate.getDate()
        : tempDate.getDate();
    let date = `${dateYear}-${dateMonth}-${dateDay}`;

    const dateHour = (tempDate.getHours() < 10) 
        ? '0' + tempDate.getHours()
        : tempDate.getHours();
    const dateMinute = (tempDate.getMinutes() < 10) 
        ? '0' + tempDate.getMinutes()
        : tempDate.getMinutes();
    const dateSecond = (tempDate.getSeconds() < 10) 
        ? '0' + tempDate.getSeconds()
        : tempDate.getSeconds();

    if (type === 'datetime') {
        date = `${date} ${dateHour}:${dateMinute}:${dateSecond}`;
    } else if (type === 'minute') {
        date = `${date} ${dateHour}:${dateMinute}`;
    }
    return date;
}



