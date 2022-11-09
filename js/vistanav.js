/**
	@file Contiene la vista de navegación
	@author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
**/

/**
	Vista de navegación
**/
export class VistaNav{
	/**
		Constructor de la clase
	**/
	constructor(controlador, nav){
		this.controlador = controlador;
		this.nav = nav;
		
		this.personajes = this.nav.getElementsByTagName('li')[0];
		this.personajes.addEventListener('click', this.pulsarPersonajes.bind(this));
	}
	
	/**
		Muestra la vista del CRUD
	**/
	pulsarPersonajes(){
		this.controlador.pulsarNavPersonajes();
	}
	
}