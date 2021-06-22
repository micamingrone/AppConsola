require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa, 
    leerInput
}

= require('./helpers/inquirer');

const Tareas = require('./models/tareas.js');






const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Cargar tareas
        tareas.cargarTareasFromArray(tareasDB);
    }


    do {
        //Función para imprimir el menú
        opt = await inquirerMenu();

        //Ingreso del usuario de una descripción de la tarea y listar las mismas.    
        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                //Crear listado
                tareas.listadoCompleto();
                break;



        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();