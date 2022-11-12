/**
	@file Contiene la vista del CRUD
	@author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
**/
import {Vista} from './vista.js';

/**
	Vista del CRUD
**/
export class VistaCRUD extends Vista{
	/**
		Constructor de la clase
	**/
	constructor(controlador, div){
		super(div);
		this.controlador = controlador;
		this.modelo = this.controlador.getModelo();
		this.modelo.registrar(this.actualizar.bind(this));
		
		this.inputNombre = document.getElementsByTagName('input')[0];
		this.botonBuscar = document.getElementsByTagName('button')[0];
		this.botonBuscar.addEventListener('click', this.buscar.bind(this));
		
		this.cartas = document.getElementById('personajes');
		
	}
	
	/**
		Evento que envia la cadena de texto introducida por el usuario al controlador
	**/
	buscar(){
		let nombre = this.inputNombre.value;
		this.controlador.buscarDato(nombre);
	}
	
	/**
		Evento que muestra el formulario para insertar datos
	**/
	pulsarAgregar(){
		this.controlador.pulsarBotonAgregarModificar(0);
	}
	
	/**
		Borra todas las filas de la tabla
	**/
	borrarCartas(){
		while(this.cartas.firstChild){
			this.cartas.firstChild.remove();
		}
	}
	
	/**
		Introduce los datos en la tabla
	**/
	actualizar(){
		this.borrarCartas();
		let botonesAgregar = [];
		for(let i=0;i<2;i++){
			let agregar = document.createElement('div');
			agregar.classList.add('carta');
			agregar.classList.add('agregar');
			let simbolo = document.createElement('span');
			simbolo.setAttribute('class', 'material-icons');
			simbolo.appendChild(document.createTextNode('add'));
			agregar.appendChild(simbolo);
			let texto = document.createElement('p');
			texto.appendChild(document.createTextNode('Agregar personaje'));
			agregar.appendChild(texto);
			agregar.addEventListener('click', this.pulsarAgregar.bind(this));
			botonesAgregar[i] = agregar;
		}
		this.cartas.appendChild(botonesAgregar[0]);
		if(this.modelo.getDatos().length == undefined){
			this.crearCarta(this.modelo.getDatos());
		}
		else{
			for(let datos of this.modelo.getDatos()){
				this.crearCarta(datos);
			}
		}
		this.cartas.appendChild(botonesAgregar[1]);
	}
	
	/**
		Cera tarjetas que muestra por pantalla en función a los datos obtenidos de la base de datos
		@param datos {Object} Colección de datos que contiene información que se muestran en las tarjetas
	**/
	crearCarta(datos){
		let carta = document.createElement('div');
		carta.setAttribute('class', 'carta');
		this.cartas.appendChild(carta);
		// Botones
		let botones = document.createElement('div');
		botones.classList.add('botones');
		let botonInfo = document.createElement('span');
		botonInfo.classList.add('material-icons');
		botonInfo.classList.add('info');
		botonInfo.appendChild(document.createTextNode('arrow_outward'));
		botonInfo.addEventListener('click', this.ensenar.bind(this, datos));
		botones.appendChild(botonInfo);
		let botonModificar = document.createElement('span');
		botonModificar.classList.add('material-icons');
		botonModificar.classList.add('modificar');
		botonModificar.appendChild(document.createTextNode('edit'));
		botonModificar.addEventListener('click', this.editar.bind(this, datos));
		botones.appendChild(botonModificar);
		let botonEliminar = document.createElement('span');
		botonEliminar.classList.add('material-icons');
		botonEliminar.classList.add('eliminar');
		botonEliminar.appendChild(document.createTextNode('delete'));
		botonEliminar.addEventListener('click', this.borrar.bind(this, datos));
		botones.appendChild(botonEliminar);
		carta.appendChild(botones);
		// Imagen
		if(datos.imagen == null){
			datos.imagen = 'imagenes/sin-imagen.jpg'
		}
		let contenedorImagen = document.createElement('div');
		let imagen = document.createElement('img');
		imagen.setAttribute('src', datos.imagen);
		imagen.setAttribute('alt', datos.nombre);
		contenedorImagen.appendChild(imagen);
		carta.appendChild(contenedorImagen);
		// Nombre
		let nombre = document.createElement('p');
		nombre.appendChild(document.createTextNode(datos.nombre));
		carta.appendChild(nombre);
	}
	
	/**
		Muestra datos más especificos de la carta seleccionada
		@param datos {Object} Colección de datos con los datos capturados en la tarjeta
	**/
	ensenar(datos){
		this.controlador.mostrarDatos(datos);
	}
	
	/**
		Evento que ordena la eliminación de una fila
		@param datos {Object} Colección de datos a ser eliminados
	**/
	borrar(datos){
		this.controlador.bajaDatos(datos);
	}
	
	/**
		Evento que ordena la actualización de una fila
		@param datos {Object} Colección de datos a ser modificados
	**/
	editar(datos){
		this.controlador.cambiarDatos(datos);
	}
	
}