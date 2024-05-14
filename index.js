// import moment from "moment";
const moment = require('moment');

function NullFormatUtils(subject){
    if(Number.isInteger(subject)){
        return subject;
    }
    if(!subject){
        return "-";
    } 
    return subject;
}

function DateFormatUtils(date, format){
    if(date && !format){
        return moment(date).format("YYYY-MM-DD");
    } else if(date && format){
        return moment(date).format(format);
    }
    return "-";
}

function NumberFormatUtils(num, decPlace){
    let temp = parseFloat(num);
    if (!isNaN(temp)){
      return temp.toFixed(decPlace ?? 2)
    }
    return "-";
}

function LargeAmountFormatUtils(num){
    if(num){
        let a = num;

        // check if exponential notation
        if(num.toString().includes('e') || num.toString().includes('E')){
            a = Number(num).toLocaleString('fullwide', {useGrouping:false});
            //console.log(a);
        } else {
            a = num.toString();
        }

        // transfer from mysql amount format
        if(!num.toString().includes('.') && a.length > 10){
            const b = Math.pow(10,18);
            const crypto_count = a / b;
            //console.log(crypto_count);
    
            return crypto_count;
        }

        a = parseFloat(a);
        a = a.toString();

        return a;
    }
    return 0;
}

function IsIntOrFloat(n){
    return n % 1 === 0;
}

module.exports = {
    NullFormatUtils,
    DateFormatUtils, 
    NumberFormatUtils, 
    LargeAmountFormatUtils, 
    IsIntOrFloat 
};