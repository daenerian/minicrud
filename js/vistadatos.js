/**
	@file Contiene la vista que muestra los datos especificos de un personaje
	@author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
**/
import{Vista} from './vista.js';

/**
	Vista de los datos
**/
export class VistaDatos extends Vista{
	/**
		Constructor de la clase
	**/
	constructor(controlador, div){
		super(div);
		this.controlador = controlador;
		
		this.botonCerrar = this.div.getElementsByClassName('cerrar')[0];
		console.log(this.botonCerrar);
		this.botonCerrar.addEventListener('click', this.cerrar.bind(this));
		
		this.campoNombre = document.getElementsByClassName('datos')[0];
		this.campoDescripcion = document.getElementsByClassName('datos')[1];
		this.campoFecha = document.getElementsByClassName('datos')[2];
		this.campoTipo = document.getElementsByClassName('datos')[3];
		this.campoURL = document.getElementsByClassName('datos')[4];
		this.campoImagen = document.getElementsByTagName('img')[0];
		
	}
	
	/**
		Borra los datos de los campos
		Regresa a la vista del CRUD
	**/
	cerrar(){
		this.controlador.pulsarNavPersonajes();
		this.borrarDatos();
	}
	
	/**
		Borra la información que hay en cada uno de los campos
	**/
	borrarDatos(){
		let campos = document.getElementsByClassName('datos');
		for(let campo of campos){
			while(campo.firstChild){
				campo.firstChild.remove();
			}
		}
	}
	
	/**
		Rellena los campos con la información sobre el personaje
		@param datos {Object} Colección de datos que contiene la información del personaje que se muestra por pantalla
	**/
	ensenar(datos){
		this.borrarDatos();
		this.campoNombre.appendChild(document.createTextNode(datos.nombre));
		this.campoDescripcion.appendChild(document.createTextNode(datos.descripcion));
		this.campoFecha.appendChild(document.createTextNode(datos.fecha));
		this.campoTipo.appendChild(document.createTextNode(datos.tipo));
		let enlace = document.createElement('a');
		enlace.setAttribute('href', datos.url);
		enlace.setAttribute('target', '_blank');
		enlace.appendChild(document.createTextNode('Más información sobre ' + datos.nombre));
		this.campoURL.appendChild(enlace);
		this.campoImagen.setAttribute('src', datos.imagen);
	}
	
}