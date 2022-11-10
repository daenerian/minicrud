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
		
		this.agregar = document.getElementsByClassName('agregar');
		for(let boton of this.agregar){
			boton.addEventListener('click', this.pulsarAgregar.bind(this));
		}
		
		this.tabla = document.getElementsByTagName('tbody')[0];
		
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
	borrarTabla(){
		while(this.tabla.firstElementChild){
			this.tabla.firstElementChild.remove();
		}
	}
	
	/**
		Introduce los datos en la tabla
	**/
	actualizar(){
		this.borrarTabla();
		if(this.modelo.getDatos().length == undefined){
			this.crearFila(this.modelo.getDatos());
		}
		else{
			for(let datos of this.modelo.getDatos()){
				this.crearFila(datos);
			}
		}
	}
	
	crearFila(datos){
		let tr = document.createElement('tr');
		this.tabla.appendChild(tr);
		// Nombre
		let nombre = document.createElement('td');
		nombre.appendChild(document.createTextNode(datos.nombre));
		tr.appendChild(nombre);
		// Descripción
		let descripcion = document.createElement('td');
		descripcion.appendChild(document.createTextNode(datos.descripcion));
		tr.appendChild(descripcion);
		// Fecha de aparición
		let fecha = document.createElement('td');
		fecha.appendChild(document.createTextNode(datos.fecha));
		tr.appendChild(fecha);
		// Tipo
		let tipo = document.createElement('td');
		tipo.appendChild(document.createTextNode(datos.tipo));
		tr.appendChild(tipo);
		// URL
		let url = document.createElement('td');
		let enlace = document.createElement('a');
		enlace.setAttribute('href', datos.url);
		enlace.setAttribute('target', '_blank');
		enlace.appendChild(document.createTextNode('Más información sobre ' + datos.nombre));
		url.appendChild(enlace);
		tr.appendChild(url);
		// Botones
		let botones = document.createElement('td');
		let botonInfo = document.createElement('span');
		botonInfo.setAttribute('class', 'material-icons');
		botonInfo.appendChild(document.createTextNode('arrow_outward'));
		botonInfo.addEventListener('click', this.ensenar.bind(this, datos));
		botones.appendChild(botonInfo);
		let botonModificar = document.createElement('span');
		botonModificar.setAttribute('class', 'material-icons');
		botonModificar.appendChild(document.createTextNode('edit'));
		botonModificar.addEventListener('click', this.editar.bind(this, datos));
		botones.appendChild(botonModificar);
		let botonEliminar = document.createElement('span');
		botonEliminar.setAttribute('class', 'material-icons');
		botonEliminar.appendChild(document.createTextNode('delete'));
		botonEliminar.addEventListener('click', this.borrar.bind(this, datos));
		botones.appendChild(botonEliminar);
		tr.appendChild(botones);
	}
	
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