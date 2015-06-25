/* Dependencias:
	- jQuery.js
	- json.js
	- layout.js
	- filtros.js
*/

function cargador( path, div_json, div_filtros, div_layout, div_tabla ) {

	this.div_json = div_json;
	this.div_filtros = div_filtros;
	this.div_layout = div_layout;
	this.div_tabla = div_tabla;
	this.path = path

	this.init = function() {

		var me = this;
		$("#" + this.div_json)
			.load(
				path + "parciales/json.html", 
				function() {
					new json()
						.init(path)
						.evento_cargar = function(datos) { 
							me.initLayout( path, datos );
						};
				}
			);

	}

	this.initLayout = function( path, datos ) {

		new filtros()
			.init(
				path,
				this.div_filtros, 
				new layout()
					.init(datos, this.div_layout, this.div_tabla)
		);

	}

}