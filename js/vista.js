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
		console.log('entro');
		if(ver){
			// this.div.style.display = 'block';
			this.div.style.visibility = 'visible';
			this.div.style.opacity = '1';
		}
		else{
			// this.div.style.display = 'none';
			this.div.style.visibility = 'hidden';
			this.div.style.opacity = '0';
		}
	}
	
}