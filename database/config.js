const mongoose = require('mongoose'); // Requerimos mongoose para la conexión

const dbConnection = async() => {
    try {
        // Usamos el método connect de mongoose, pasansole la conexión que viene en .env
        await mongoose.connect(process.env.BD_CNN, {
            // De igual forma pasamos estos parámetros, obtenidos en la documetanción de moongose, https://mongoosejs.com/
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        // Para saber que se conecto correctamente imprimos esto en consola
        console.log('DB connect success');
    } catch (error) {
        // Si hubo un error lo imprimimos en consola y realizamos un throw error
        console.log(error);
        throw new Error('Error a la hora de inicializar la base de datos')
    }
}

// Exportamos la conexión
module.exports = {
    dbConnection
}