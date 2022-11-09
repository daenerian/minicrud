/**
	@file Contiene el modelo de datos de la aplicación
	@author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
**/

/**
	Modelo de datos de la aplicación
**/
export class Modelo{
	/**
		Constructor de la clase
		Carga el modelo de datos
	**/
	constructor(){
		this.indexedDB = window.indexedDB.open("registroPersonajes", 1);
		this.db = null;
		this.lista = [];
		this.callbacks = [];
		this.datosEncontrados = null;
		
		this.indexedDB.onsuccess = (evento) => {
			this.db = evento.target.result;
			this.leer();
		}

		this.indexedDB.onupgradeneeded = (evento) => {
			this.db = evento.target.result;
			this.personaje = this.db.createObjectStore('personajes', {autoIncrement: true});
			this.indiceNombre = this.personaje.createIndex('nombre', 'nombre');
		}

		this.indexedDB.onerror = (error) =>{
			console.log('Falló ', error);
		}
		
	}
	
	/**
		Registra los callbacks hechos
	**/
	registrar(callback){
        this.callbacks.push(callback);
	}
	
	/**
		Avisa a las vistas de los cambios en el modelo
	**/
	avisar(){
	    for(let callback of this.callbacks){
			callback();
		}
	}
	
	leer(){
		const objectStore = this.db.transaction('personajes', 'readonly').objectStore('personajes');
		const peticion = objectStore.getAll()
		
		peticion.onerror = (evento) => {
			console.log('No se han cargado los datos');
		}

		peticion.onsuccess = (evento) => {
			this.lista = peticion.result;
			this.avisar();
		}
	}
	
	/**
		Inserta los datos enviados en la base de datos
		@param datos {Object} Colección de datos que se introducen en la base de datos
	**/
	insertar(datos){
		const objectStore = this.db.transaction('personajes', 'readwrite').objectStore('personajes');
		const peticion = objectStore.add(datos);
		
		peticion.onerror = (evento) => {
			console.log('No se ha podido agregar los datos');
		}

		peticion.onsuccess = (evento) => {
			console.log('Dato agregado');
			this.lista.push(datos);
			// location.reload();
			this.leer();
		}
	}
	
	/**
		Busca los datos que coinciden con la cadena de texto introducida por el usuario
		@param nombre {String} Cadena de texto introducida por el usuario
	**/
	buscar(nombre){
		const objectStore = this.db.transaction('personajes', 'readonly').objectStore('personajes');
		const indice = objectStore.index('nombre');
		
		const peticion = indice.get(nombre);
		
		peticion.onsuccess = (evento) => {
			this.lista = evento.target.result;
			try{
				this.avisar();
			}
			catch(error){
				window.alert('No se ha encontrado ningún personaje con el nombre "' +  nombre + '"');
			}
		}
		
	}
	
	/**
		Elimina los datos enviados de la base de datos
		@param datos {Object} Colección de datos que se quieren eliminar de la base de datos
	**/
	borrar(datos){
		const objectStore = this.db.transaction('personajes', 'readwrite').objectStore('personajes');
		const indice = objectStore.index('nombre');
		
		const peticion = indice.getKey(datos.nombre);
		
		peticion.onsuccess = (evento) => {
			let id = evento.target.result;
			objectStore.delete(id);
			// location.reload();
			this.leer();
		}
	}
	
	/**
		Actualiza los datos enviados en la base de datos
		@param datos {Object} Colección de datos que se actualizar en la base de datos
		@param nombre {String} Nombre original que se utiliza como indice
	**/
	editar(datos, nombre){
		const objectStore = this.db.transaction('personajes', 'readwrite').objectStore('personajes');
		const indice = objectStore.index('nombre');
		
		const peticion = indice.getKey(nombre);
		
		peticion.onsuccess = (evento) => {
			let id = evento.target.result;
			objectStore.put(datos, id);
			//location.reload();
			this.leer();
		}
	}
	
	/**
		Devuelve la lista de objetos obtenida de la base de datos
		@return this.lista {Array} Array con las filas de la base de datos
	**/
	getDatos(){
		return this.lista;
	}
	
	/**
		Devuelve los datos encontrados tras la busqueda
		@return this.datosEncontrados {Array} Array con los datos que coinciden con la busqueda que hizo el usuario
	**/
	getDatosEncontrados(){
		return this.datosEncontrados;
	}
	
}