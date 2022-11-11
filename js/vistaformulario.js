/**
	@file Contiene la vista del formulario
	@author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
**/
import{Vista} from './vista.js';
/**
	Vista del formulario
**/
export class VistaFormulario extends Vista{
	/**
		Constructor de la clase
	**/
	constructor(controlador, div){
		super(div);
		this.controlador = controlador;
		this.indice = null;
		
		//Titulo
		this.tituloInsertar = this.div.getElementsByTagName('h1')[0];
		this.tituloModificar = this.div.getElementsByTagName('h1')[1];
		
		// Elementos formularios
		this.nombre = document.getElementsByTagName('input')[1];
		this.descripcion = document.getElementsByTagName('textarea')[0];
		this.fecha = document.getElementsByTagName('input')[2];
		const tipos = ['Divino', 'Humano', 'Animal', 'Vegetal', 'Mineral', 'Otro']
		this.tipo = document.getElementsByTagName('select')[0];
		for(let tipo of tipos){
			let opcion = document.createElement('option');
			opcion.setAttribute('value', tipo);
			opcion.appendChild(document.createTextNode(tipo));
			this.tipo.appendChild(opcion);
		}
		this.url = document.getElementsByTagName('input')[3];
		this.imagen = document.getElementsByTagName('input')[4];
		this.base64 = null;
		this.imagen.addEventListener('change', e => {
			const archivo = this.imagen.files[0];
			const lector = new FileReader();
			lector.addEventListener('load', () => {
				this.base64 = lector.result;
			});
			lector.readAsDataURL(archivo);
		});
		
		this.botonCerrar = this.div.getElementsByClassName('cerrar')[0];
		this.botonCancelar = this.div.getElementsByTagName('button')[0];
		this.botonAceptar = this.div.getElementsByTagName('button')[1];
		this.botonModificar = this.div.getElementsByTagName('button')[2];
		
		this.botonCerrar.addEventListener('click', this.cancelar.bind(this));
		this.botonCancelar.addEventListener('click', this.cancelar.bind(this));
		this.botonAceptar.addEventListener('click', this.aceptarModificar.bind(this, 0));
		this.botonModificar.addEventListener('click', this.aceptarModificar.bind(this, 1));
	}
	
	/**
		Recoge los datos de todos los campos del formulario
		@return datos {Object} Colección de datos con los datos recogidos
	**/
	recolectarDatos(){
		let datos = {
			nombre: this.nombre.value,
			descripcion: this.descripcion.value,
			fecha: this.fecha.value,
			tipo: this.tipo.value,
			url: this.url.value,
			imagen: this.base64
		};
		
		return datos;
	}
	
	cancelar(){
		this.borrarDatos();
		this.controlador.pulsarNavPersonajes();
	}
	
	/**
		Evento que envia los datos que van a ser introducidos en la base de datos
	**/
	aceptarModificar(operacion){
		try{
			// this.base64 = null;
			this.validar();
			let fila = this.recolectarDatos();
			switch(operacion){
				case 0:
					this.controlador.enviarDatos(fila, 0, null);
					break;
				case 1:
					this.controlador.enviarDatos(fila, 1, this.indice);
			}
			this.controlador.pulsarNavPersonajes();
			this.borrarDatos();
		}
		catch(error){
			window.alert(error);
		}
	}
	
	validar(){
		let bandera = null;
		let nombre = this.nombre.value;
		bandera = nombre.match(/^[A-Z]\D{2,9}$/);
		if(!bandera){
			throw 'El nombre debe llevar la primera letra en mayúscula, no tener digitos númericos y tener entre 3-10 caracteres';
		}
		let fecha = this.fecha.value;
		bandera = fecha.match(/^((0[1-9])|(1[1-2]))\/\d{4}$/);
		if(!bandera){
			throw 'El formato de la fecha es mm/aaaa';
		}
		let tipo = this.tipo.value;
		if(tipo==0){
			throw 'No se ha seleccionado un tipo'
		}
		let url = this.url.value;
		bandera = url.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
		if(!bandera){
			throw 'El formato de la URL es incorrecto';
		}
	}
	
	borrarDatos(){
		this.nombre.value = '';
		this.descripcion.value = '';
		this.fecha.value = '';
		this.tipo.value = 0;
		this.url.value = '';
		this.imagen.value = '';
	}
	
	/**
		Rellena los campos del formulario con los datos que quieren ser editados
		@param datos {Object} Colección de datos para rellenar los campos
	**/
	rellenar(datos){
		this.indice = datos.id;
		this.nombre.value = datos.nombre;
		this.descripcion.value = datos.descripcion;
		this.fecha.value = datos.fecha;
		this.tipo.value = datos.tipo;
		this.url.value = datos.url;
		this.base64 = datos.imagen;
	}
	
	/**
		Oculta el boton de modificar
	**/
	ocultarModificar(){
		this.tituloInsertar.style.display = 'block';
		this.tituloModificar.style.display = 'none';
		this.botonAceptar.style.display = 'inline';
		this.botonModificar.style.display = 'none';
	}
	
	/**
		Oculta el boton de aceptar
	**/
	ocultarAceptar(){
		this.tituloInsertar.style.display = 'none';
		this.tituloModificar.style.display = 'block';
		this.botonAceptar.style.display = 'none';
		this.botonModificar.style.display = 'inline';
	}
}