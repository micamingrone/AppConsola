const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    //Transformando un objeto a arreglo, tomando las keys (id) de cada tarea

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;

    }

    constructor() {
        this._listado = {};
    }


    borrarTarea (id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });


    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        
        console.log();
        this.listadoArr.forEach((tarea, indice) => {
            const idx = `${indice+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                                ? 'Completado'.green
                                : 'Pendiente'.red;
            
            console.log(`${idx} ${desc} ::  ${estado}`);                    
        });

         
    }

    listadoCompletadasPendientes(completadas = true){
            console.log();
            let contador =0;

            this.listadoArr.forEach(tarea => {
                
                const {desc, completadoEn} = tarea;
                const estado = (completadoEn)
                                    ? 'Completado'.green
                                    : 'Pendiente'.red;

                if(completadas) {
                    //Mostrar tareas completadas

                        if(completadoEn){
                            contador += 1;
                            console.log(`${(contador + '.').green} ${desc} ::  ${completadoEn}`); 
                        }
                }else {
                    //Mostrar pendientes

                        if(!completadoEn){
                            contador += 1;
                            console.log(`${(contador + '.').red} ${desc} ::  ${estado}`); 


                        }
                     
                }                    
                
                
           
        });
    }    

}




module.exports = Tareas;