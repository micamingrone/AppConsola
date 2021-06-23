require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
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
            
            case '3':
                 //Listar tareas completadas
                 tareas.listadoCompletadasPendientes(true);
                 break;
            
            case '4':
                 //Listar tareas pendientes
                 tareas.listadoCompletadasPendientes(false);
                 break;

            case '5':
                //Tareas completas | pendientes
                const ids = await mostrarListadoChecklist (tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;     
            
            case '6':
                //Borrar tareas
                 const id = await listadoTareasBorrar(tareas.listadoArr);
                 if(id !=='0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea eliminada'); 
                    } 
                      
                 }
                

                 break; 



        }

        guardarDB(tareas.listadoArr);

        await pausa();

    } while (opt !== '0');

}

main();