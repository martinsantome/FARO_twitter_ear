/* Dependencias:
	- jQuery.js
	- D3.js
	- layout.js
*/

function filtros () {

	this.contenedor;
	this.layout;

	this.init = function(path, contenedor, layout) {

		this.contenedor = contenedor;
		this.layout = layout;

		$("#" + this.contenedor).empty();

		this.render_edad(path);
		this.render_familias(path);
		this.render_actividades();
		this.render_dias();

		this.layout.evento_click_en_mapa_filtros = this.evento_click_mapa;

	}

	this.render_familias = function (path) {

		var me = this;
		d3.select("#" + this.contenedor)
			.append("div")
			.attr("id", "div_filtro_familias");

		// Div principal de la sección
		var Familias = d3.select("#div_filtro_familias")
			.selectAll("div")
			.data(this.layout.arbol.datos)
			.enter();

		// Agregar sub div para cada familia
		var cadaFamilia = Familias.append("div")
			.classed("familia", true);

		// Una avatar para cada ocurrencia 
		cadaFamilia.append("img")
			.attr("src", path + "uimg/familia.png?1.0.0");

		// Un selector para cada ocurrencia
		cadaFamilia.append("span")
			.text(function(d){return d.familia})
			.append("input")
			.attr("type", "checkbox")
			.attr("id", function(d){ return "chk_filtro_familia_" + normalizar(d.familia) })
			.attr("checked", true)
			.on("click", function(d){
				me.layout.click(d3.select(".familia" + normalizar(d.familia)).datum(), me.layout)
			}); 

	}

	this.render_edad = function(path) {

		var me = this;

		d3.select("#" + this.contenedor)
			.append("div")
			.attr("id", "div_filtro_edad");

		$("#div_filtro_edad")
			.load(
				path + "parciales/fEdad.html", 
				function() {
					$( "#div_barra_edad" ).slider({
						range: true, min: 1, max: 100, values: [ 1, 100 ],
						slide: function( event, ui ) {
							$( "#filtro_edad_valor" )
							.val( ui.values[ 0 ] + " y " + ui.values[ 1 ] + " años." );
							me.layout.arbol.filtro_edad_min =  ui.values[ 0 ];
							me.layout.arbol.filtro_edad_max =  ui.values[ 1 ];
							me.aplicar_filtro_edad( ui.values[ 0 ], ui.values[ 1 ], me.layout);
						}
					});
					var edad_min = $( "#div_barra_edad" ).slider( "values", 0 );
					var edad_max = $( "#div_barra_edad" ).slider( "values", 1 );
					$( "#filtro_edad_valor" ).val( edad_min + " y " + edad_max + " años." );
				}
			);

	}

	/* Agrega un INPUT|SELECT para el filtro de Actividades */
	this.render_actividades = function(){

		var me = this;

		d3.select("#" + this.contenedor)
			.append("div")
			.attr("id", "div_filtro_actividades");

		/*  @param div								>> el contenedor donde se inserta el filtro
			@param layout 							>> debe contener:
				.arbol.lista_unica_actividades[] 	>> Options del filtro (literales)
				.arbol.filtro_actividad 			>> Para almacenar el valor actual
				.update() 							>> Para dispatch del evento
		*/
		function crear_select_actividades( div, layout ) {

			d3.select("#" + div).append("label").text(" | Actividades: ");

			var select = d3.select("#" + div)
				.append("select")
				.on("change", cmb_filtro_act_change);

			function ordenar_lista(lista) {
				var ret = [" Todos"]; for (e in lista) ret.push(lista[e].nombre);
				return ret.sort();
			}

			var options = select
				.selectAll("option")
				.data( ordenar_lista(layout.arbol.lista_unica_actividades) )
				.enter().append("option")
				.text( function(d) { return d; });

			function cmb_filtro_act_change() {

				var selectedIndex = select.property('selectedIndex'),
					data = options[0][selectedIndex].__data__;

				layout.arbol.filtro_actividad = data; // Guardar valor
				layout.update(); // Disparar evento

			}

		}

		crear_select_actividades( "div_filtro_actividades", this.layout );

	}

	/* Agrega un INPUT|SELECT para el filtro de dias */
	this.render_dias = function(){

		var me = this;

		d3.select("#" + this.contenedor)
			.append("div")
			.attr("id", "div_filtro_dias");

		/* 
			@param layout 		>> debe contener:
				.arbol.lista_unica_dias[] >> Options del filtro (índices) 1-based
				.arbol.literales_dias[]	>> Options del filtro (literales)
				.arbol.filtro_dia 		>> Para almacenar el valor actual
				.update
		*/
		function crear_select_dias( div, layout ) {

			d3.select("#" + div).append("label").text(" |  Días: ");

			var select = d3.select("#" + div)
				.append("select")
				.on("change", cmb_filtro_dia_change);

			var options = select
				.selectAll("option")
				.data( [" Todos"].concat( layout.arbol.lista_unica_dias.map(function(d) {return layout.arbol.literales_dias[d-1]}) ) )
				.enter().append("option")
				.text(function(d) { return d; });

			function cmb_filtro_dia_change() {

				var selectedIndex = select.property('selectedIndex'),
					data = options[0][selectedIndex].__data__;

				layout.arbol.filtro_dia = data; // Guardar valor
				layout.update(); // Disparar evento

			}

		}

		crear_select_dias( "div_filtro_dias", this.layout );

	}

	this.evento_click_mapa = function (valor, layout) {

		if (valor.tipo == "familia") {
			// Actualizar el checkbox
			$("#chk_filtro_familia_" + normalizar(valor.name) ).prop('checked', valor.children);
		}

	}

	/* STATIC */
	this.aplicar_filtro_edad = function (e_min, e_max, layout) {

		function comprobar_edad(d) {
			var en_rango = d.edad >= e_min && d.edad <= e_max ;
			return ( en_rango ? 0.6 : 0);
		}
		layout.node
			.filter( function(d){ return ["padre", "madre", "hijo", "hija"].indexOf(d.tipo) > -1})
			.select("image")
			.style("opacity", function(d){return comprobar_edad(d) });

	}

	/* STATIC */
	this.filtrar_nodos = function ( arbol ) {

		var filtro;

		filtro = function(d) { 

			var hay_filtro_actividad = arbol.filtro_actividad && arbol.filtro_actividad != " Todos";
			var hay_filtro_dias = (arbol.filtro_dia && arbol.filtro_dia != " Todos");

			/* Devuelve True o False, si la persona tiene ocurrencia en la actividad o el dia del filtro */
			function filtrar_las_personas_segun_la_actividad_y_el_dia ( d ) {

				function es_persona(nodo) {	return ["padre", "madre", "hijo", "hija"].indexOf(nodo.tipo) > -1; }

				function tiene_la_actividad_y_dia(persona, actividad, dia){ 

					var esta_actividad_es_ocurrencia = false;

					for (a in persona.actividades) { 
						act = persona.actividades[a];
						var el_filtro_actividad_acepta = !hay_filtro_actividad || (hay_filtro_actividad && act.nombre == actividad);
						if ( el_filtro_actividad_acepta ) {
							var indice_dia = arbol.literales_dias.indexOf(dia) + 1; 
							esta_actividad_es_ocurrencia = (hay_filtro_dias ? act.dias.indexOf(indice_dia) > -1 : true);
						}
						if ( esta_actividad_es_ocurrencia ) break;
					};
					return esta_actividad_es_ocurrencia;

				}

				var sin_filtro = arbol.filtro_actividad == " Todos" && arbol.filtro_dia == " Todos";
				b_no_hay_filtro_o_no_es_persona = sin_filtro || !es_persona(d);
				if ( b_no_hay_filtro_o_no_es_persona ) return true;

				var actividad = (arbol.filtro_actividad && arbol.filtro_actividad != " Todos") ? arbol.filtro_actividad : d.name;
				var dia = (arbol.filtro_dia && arbol.filtro_dia != " Todos") ? arbol.filtro_dia : d.name;

				return tiene_la_actividad_y_dia(d, actividad, dia);

			}

			return filtrar_las_personas_segun_la_actividad_y_el_dia (d);

		};

		return filtro;
	}

	/* Quitamos las relaciones que no deberían aparecer según los filtros */
	/* STATIC */
	this.purgar_filtrado_links = function( arbol, links, filtro_nodo ) {

		function es_nodo_estructural(link) { return link.source.tipo == "subroot" || link.target.tipo =="subroot"; }

		function es_persona(nodo) { return ["padre", "madre", "hijo", "hija"].indexOf(nodo.tipo) > -1; }

		function persona_esta_filtrada_por_actividad( nodo ) {
			return (es_persona(nodo.source) && (!filtro_nodo(nodo.source) || !filtro_nodo(nodo.target)) ) ||
					(es_persona(nodo.target) && (!filtro_nodo(nodo.source) || !filtro_nodo(nodo.target)) );
		}

		function la_persona_no_practica_la_actividad_el_dia_del_filtro( nodo ) {

			var hay_filtro_dia = arbol.filtro_dia && arbol.filtro_dia != " Todos";
			if ( !hay_filtro_dia ) return false;

			bEsPersona = es_persona(nodo.source) || es_persona(nodo.target);
			if ( !bEsPersona ) return false;

			var nodo_actividad = es_persona(nodo.source) ? nodo.target : nodo.source;
			var nodo_persona = es_persona(nodo.source) ? nodo.source : nodo.target;

			bEsActividad = ["hobbie","profesion"].indexOf(nodo_actividad.tipo) > -1
			if ( !bEsActividad ) return false;

			var trans_dias = arbol.literales_dias;
			var dia = trans_dias.indexOf(arbol.filtro_dia);
			for (a in nodo_persona.actividades) { 
				if (nodo_persona.actividades[a].nombre == nodo_actividad.name) {
					nodo_actividad = nodo_persona.actividades[a];
					break;
				}
			}

			return nodo_actividad.dias.indexOf(dia+1) == -1;

		}

		function tiene_relacion_filtrada(link) { 
			return !link.target || !link.source;
		}

		var relinks = [];
		for ( p in links){

			if ( tiene_relacion_filtrada(links[p]) ) continue;
			if ( es_nodo_estructural(links[p]) ) continue;
			if ( persona_esta_filtrada_por_actividad(links[p]) ) continue;
			if ( la_persona_no_practica_la_actividad_el_dia_del_filtro(links[p]) ) continue;

			relinks.push(links[p]);

		}

		return relinks;

	}

	/* Para cada relación, observamos sus dos elementos, si ambos existen tras el filtrado, la relación se queda, si no, se elimina */
	/* STATIC */
	this.purgar_nodos_aislados = function( nodos, links ) {

		if ( nodos.length == 1 ) return nodos; //Caso especial que nada más venga el raíz

		var renodos = [];

		links.forEach( function(link) {
			if ( renodos.indexOf(link.source) == -1  ) renodos.push(link.source);
			if ( renodos.indexOf(link.target) == -1  ) renodos.push(link.target);
		});

		return renodos;

	}

}