/* Dependencias:
	- herramientas.js
*/

function pop_up () {

	this.contenedor;	// Div donde se alojan las tablas pop_up

	this.init = function ( div_contenedor ) {
		this.contenedor = div_contenedor;
		return this;
	}

	/* Para establecer en el mouseover() de un nodo. Renderizará la tabla asociada */
	this.set_popup = function ( nodo ) {

		var tabla = this.render_tabla(nodo);
		d3.select("#" + tabla)
			.classed("oculto", false)
			.style("left", this.getX(tabla, d3.event.pageX) + "px")
			.style("top", this.getY(tabla, d3.event.pageY) + "px");

	}

	/* Para establecer en el mouseout() de un nodo. Ocultará la tabla asociada */
	this.set_popup_off = function( nodo )  {

		d3.select("#" + this.nombre_tabla(nodo))
			.classed("oculto", true);

	}

	/* Crea la tabla correspondiente al nodo y la renderiza en this.contendedor */
	this.render_tabla = function ( nodo ) {

		/* Para una actividad, devuelve la lista de columnas de la tabla; 
			La primera columna: nombre
			De la segunda a la séptima: booleano que indica si ese día la actividad se practica
		*/
		function montar_registro(registro) {
			var z = []; z["nombre"] = registro.nombre;
			for (x = 1; x < 8; x++) z[x] = registro.dias.indexOf(x) > -1;
			return z;
		}

		// Devuelve una lista de actividades "tratadas" para el render
		function crear_lista(registros){
			var l = []; 
			registros.forEach( function( registro) {
				l.push(montar_registro(registro));
			}); 
			return l;
		}

		// Dados los índices una celda (fila, columna) devuelve el valor a mostrar en pantalla
		function texto_celda(actividades, fila, columna) {
			return columna == 0 ? actividades[fila].nombre : actividades_lineas[fila][columna];
		}

		var nombre_tabla = this.nombre_tabla(nodo);

		// Si la tabla ya ha sido renderizada, no la volvemos a calcular
		if ( $("#" + nombre_tabla).length > 0 ) return nombre_tabla;

		// Títulos de las cabeceras de la tabla
		var cabeceras = ['Actividad', 'L', 'M', 'X', 'J', 'V', 'S', 'D'];

		// Tratamiento de la lista de actividades del nodo
		var actividades_lineas = crear_lista(nodo.actividades);

		// Renderizado
		var tabla = d3.select("#" + this.contenedor)
			.append('table')
			.style("opacity", .9)
			.style("position", "absolute")
			.attr("id", nombre_tabla)
			.classed("pop_up", true)

		// Cabeceras
		tabla.append('thead').append('tr')
			.selectAll('th')
			.data(cabeceras).enter()
			.append('th')
			.text(function(d){return d});

		// Cuerpo de la tabla
		tabla.append('tbody')
			.selectAll('tr')
			.data(nodo.actividades).enter()
			.append('tr')
				.attr("name", function(d,i){ return i})
				.selectAll('td')
				.data(cabeceras)
				.enter()
			.append('td')
			.html(function(d,i) {
				var valor = texto_celda(nodo.actividades, this.parentNode.getAttribute('name'), i); 
				return i == 0 ?  valor : ( !valor ? "-" : "" );
			})
			.classed( "marcado", function(d,i){
				var valor = texto_celda(nodo.actividades, this.parentNode.getAttribute('name'), i);
				return ( i > 0 ? valor : false );
			});

		return nombre_tabla;

	}

	/* Calcula el id tabla que le corresponde al nodo */
	this.nombre_tabla = function (nodo) {
		return normalizar(nodo.familia + nodo.tipo + nodo.name);
	}

	/* Devuelve la coordenada X de la tabla según el ratón y según el ancho de la pantalla evitando que la tabla quede fuera */
	this.getX = function ( tooltip,  mouseX ) {
		var margen = 35;
		//Posicion ideal
		var posicion_centrada = margen + mouseX - ( $(tooltip).width() / 2);
		//Comprobar exceso margen izquierdo
		var fuera_de_pantalla = posicion_centrada < 0;
		var offset_left = fuera_de_pantalla ? margen : posicion_centrada;
		//Comprobar exceso margen derecho
		fuera_de_pantalla = (posicion_centrada + $(tooltip).width()) > $(window).width();
		var offsetX = fuera_de_pantalla ? $(window).width() - $(tooltip).width() : offset_left;
		//Devolver valor
		return offsetX;
	}

	/* Devuelve la coordenada Y de la tabla según el ratón y según el ancho de la pantalla evitando que la tabla quede fuera */
	this.getY = function getY( tooltip, mouseY ) {
		var margen = 50;
		//Comprobar margen inferior
		var fuera_de_pantalla = ( mouseY + $(tooltip).height() + margen ) > $(window).height();
		//Devolver valor
		return fuera_de_pantalla ? mouseY - $(tooltip).height() - margen : mouseY + margen;
	}
}