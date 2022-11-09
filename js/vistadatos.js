import{Vista} from './vista.js';

export class VistaDatos extends Vista{
	constructor(controlador, div){
		super(div);
		this.controlador = controlador;
		
		this.campoNombre = document.getElementsByClassName('datos')[0];
		this.campoDescripcion = document.getElementsByClassName('datos')[1];
		this.campoFecha = document.getElementsByClassName('datos')[2];
		this.campoTipo = document.getElementsByClassName('datos')[3];
		this.campoURL = document.getElementsByClassName('datos')[4];
		
	}
	
	borrarDatos(){
		let campos = document.getElementsByClassName('datos');
		for(let campo of campos){
			while(campo.firstChild){
				campo.firstChild.remove();
			}
		}
	}
	
	ensenar(datos){
		this.borrarDatos();
		this.campoNombre.appendChild(document.createTextNode(datos.nombre));
		this.campoDescripcion.appendChild(document.createTextNode(datos.descripcion));
		this.campoFecha.appendChild(document.createTextNode(datos.fecha));
		this.campoTipo.appendChild(document.createTextNode(datos.tipo));
		let enlace = document.createElement('a');
		enlace.setAttribute('href', datos.url);
		enlace.appendChild(document.createTextNode('Más información sobre ' + datos.nombre));
		this.campoURL.appendChild(enlace);
	}
	
}