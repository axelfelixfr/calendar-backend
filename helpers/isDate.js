const moment = require('moment'); // Usamos moment para la validación de las fechas

// Obtenemos la fecha (value)
const isDate = (value) => {

    // Si value no existe entonces entra a esta condición
    if(!value){
        // Regresa false y no pasa la validación
        return false;
    }

    // Si existe entonces con moment le pasamos el value
    const fecha = moment(value);

    // Si la fecha es valida, a través del metodo isValid() de moment entonces entra a esta condición
    if(fecha.isValid()){
        // Si es valida regresa true
        return true;
    } else {
        // Si no es valida regresa false
        return false
    }
}

// Exportamos la fecha 
module.exports = { isDate }