module.exports = (price) => {
    let integer = '0';
    let decimal = '00';
    if (Math.ceil(price) === Math.floor(price)) {
        integer = price + '';
    } else {
        integer = Math.floor(price) + '';
        decimal = (price * 1000 - Math.floor(price) * 1000) / 10;
        if (decimal < 10) {
            decimal = '0' + decimal;
        } else {
            decimal += '';
        }
    }

    return {
        price,
        integer,
        decimal
    }
};