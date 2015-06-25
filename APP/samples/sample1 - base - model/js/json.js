/* Dependencias:
	- jQuery.js
	- D3.js
*/
function json() {

	/* Formato esperado del archivo JSON externo que representa familias con sus personas y las actividades que desempeñan durante la semana
		[
			{"familia": "STRING", 
			 "nodos": [ 
				{"nombre": "STRING", 
				 "relacion": "KEY un valor entre (padre|madre|hijo|hija)", 
				 "edad": ENTERO, 
				 "actividades":
					[
						{"tipo" : "KEY:profesion", 
						 "nombre": "KEY un valor entre (trabajar|estudiar)", 
						 "dias": [ARRAY de uno a siete valores que son días de la semana, donde n >= 1 y n <=7]},

						{"tipo" : "KEY:hobbie", 
						 "nombre": "STRING", 
						 "dias": [ARRAY de uno a siete valores que son días de la semana, donde n >= 1 y n <=7]},

						{OTROS NODOS DE TIPO HOBBIE}
					]
			}, 
			{...}
		]
	*/

	this.evento_cargar;
	this.datos;

	this.init = function(path) {

		var me = this;

		$( "#bot_cargar_json" ).click( 

			function() {
				$( "#bot_cargar_json" ).text( " Cargando..." );
				var url = path + $( "#text_json_url" ).val();

				d3.json(url, function(error, datos) {
					// Controlamos error
					if (error) {
						alert("No se han podido cargar los datos. Ha habido un error al cargar el archivo JSON.");
						return false;
					}
					$( "#bot_cargar_json" ).text("cargar otro!");
					$( "#text_json_cargado" ).text( "Archivo cargado: " + url );

					me.datos = datos;
					me.evento_cargar(datos);
				});

			} 
		);

		return me;
	}

}

