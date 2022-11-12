/**
	@file Contiene el controlador principal de la aplicación
	@author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
**/
import{Modelo} from './modelo.js';
import{VistaNav} from './vistanav.js';
import{VistaCRUD} from './vistacrud.js';
import{VistaFormulario} from './vistaformulario.js';
import{VistaDatos} from './vistadatos.js';

/**
	Controlador principal de la aplicación
**/
class Controlador{
	/**
		Constructor de la clase
		Carga el método iniciar al cargar la página
	**/
	constructor(){
		window.onload = this.iniciar.bind(this);
	}
	
	/**
		Inicia la aplicación
		Carga las vistas y el modelo
	**/
	iniciar(){
		this.modelo = new Modelo();
		
		this.nav = document.getElementsByTagName('nav')[0];
		this.divCRUD = document.getElementById('divCRUD');
		this.divFormulario = document.getElementById('divFormulario');
		this.divDatos = document.getElementById('divDatos');
		
		this.vistaNav = new VistaNav(this, this.nav);
		this.vistaCRUD = new VistaCRUD(this, this.divCRUD);
		this.vistaFormulario = new VistaFormulario(this, this.divFormulario);
		this.vistaDatos = new VistaDatos(this, this.divDatos);
		
		this.vistaCRUD.mostrar(true);
	}
	
	/**
		Esconde las vistas del formulario y los datos
	**/
	pulsarNavPersonajes(){
		this.vistaCRUD.mostrar(true);
		this.vistaFormulario.mostrar(false);
		this.vistaDatos.mostrar(false);
	}
	
	/**
		Muestra la vista del formulario
		Esconde o muestra los botones de aceptar y modificar en la vista del Formulario
		@param operacion {Number} Según el número enviado indica que botón se debe esconder
	**/
	pulsarBotonAgregarModificar(operacion){
		//this.vistaCRUD.mostrar(false);
		this.vistaFormulario.mostrar(true);
		this.vistaFormulario.borrarDatos();
		this.vistaDatos.mostrar(false);
		switch(operacion){
			case 0:
				this.vistaFormulario.ocultarModificar();
				break;
			case 1:
				this.vistaFormulario.ocultarAceptar();
		}
	}
	
	/**
		Muestra la vista de los datos
	**/
	pulsarBotonMostrar(){
		//this.vistaCRUD.mostrar(false);
		this.vistaFormulario.mostrar(false);
		this.vistaDatos.mostrar(true);
	}
	
	/**
		Envia los datos para que sean añadidos o modificados en la base de datos
		@param datos {Object} Colección de datos para añadir o actualizar la base de datos
		@param operacion {Number} Indica que operación se debe realizar
		@param indice {String} Envia el nombre antiguo para utilizarlo como indice
	**/
	enviarDatos(datos, operacion, indice){
		switch(operacion){
			case 0:
				this.modelo.insertar(datos);
				break;
			case 1:
				this.modelo.editar(datos, indice);
		}
	}
	
	/**
		Comienza el proceso para mostrar la vista de los Datos
		Enseña los datos seleccionados en la vista de los datos
		@param datos {Object} Colección de datos que se quieren mostrar en la vista de los datos
	**/
	mostrarDatos(datos){
		this.pulsarBotonMostrar();
		this.vistaDatos.ensenar(datos);
	}
	
	/**
		Envia los datos para que sean eliminados de la base de datos
		@param datos {Object} Colección de datos para que sean eliminados de la base de datos
	**/
	bajaDatos(datos){
		this.modelo.borrar(datos);
	}
	
	/**
		Rellena el formulario con los datos que se quieren modificar
		@param datos {Object} Colección de datos que se muestran en los campos de los formularios
	**/
	cambiarDatos(datos){
		this.pulsarBotonAgregarModificar(1);
		this.vistaFormulario.rellenar(datos);
	}
	
	/**
		Envia el dato que se quiere buscar en la base de datos
		@param nombre {String} Cadena de texto que desea buscar el usuario en la base de datos
	**/
	buscarDato(nombre){
		if(nombre==''){
			this.modelo.leer();
		}
		else{
			this.modelo.buscar(nombre);
		}
	}
	
	/**
		Devuelve el modelo de datos
		@return {Modelo} Modelo de datos de la aplicación
	**/
	getModelo(){
		return this.modelo;
	}
	
}

const app = new Controlador();