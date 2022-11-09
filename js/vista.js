/**
	@file Contiene los metodos comunes de las vistas de la aplicación
	@author Juan Daniel Carvajal <juandanielcarvajalmontes.guadalupe@alumnado.fundacionloyola.net>
**/

/**
	Vista general de la aplicación
**/
export class Vista{
	/**
		Constructor de la clase
	**/
	constructor(div){
		this.div = div;
	}
	
	/**
		Oculta o muestra una vista
		@param ver {Boolean} Booleano que indica si una vista se esconde o se muestra
	**/
	mostrar(ver){
		console.log('entra');
		if(ver){
			this.div.style.display = 'block';
		}
		else{
			this.div.style.display = 'none';
		}
	}
	
}