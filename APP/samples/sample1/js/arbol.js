/* Dependencias:
	- pop_up.js
*/
function arbol( datos ) {

	this.datos = datos;
	this.root;

	this.filtro_actividad = " Todos";
	this.filtro_dia = " Todos"
	this.filtro_edad_min = 1;
	this.filtro_edad_max = 100;

	this.literales_dias = ["L","M","X","J","V","S","D"];

	this.lista_unica_actividades;
	this.lista_unica_dias;

	this.init = function() {

		this.listas_unicas();

		var arbol = [];

		me = this;

		arbol = this.nodo_familias();
		arbol.push(this.nodo_actividades());
		arbol.push(this.nodo_dias());

		this.root = crea_nodo("Familias", "raiz", arbol );

		return this;

	}

	/* Devuelve un nodo Familia (con sus personas) por cada familia del JSON. */
	this.nodo_familias = function() {

		var arbol = [];
		this.datos.forEach( function(f) {
			arbol.push( 
				crea_nodo(f.familia, "familia", 
					me.personas_familia(f.familia, f.nodos) 
				) 
			);
		});
		return arbol;

	}

	/* Devuelve la lista de días que tienen ocurrencia en el JSON, sin duplicados, en forma de Tree.node*/
	this.nodo_dias = function () {

		var lista_dias = [];
		var me = this;
		this.lista_unica_dias.forEach( function(dia) {
			lista_dias.push(crea_nodo(me.literales_dias[dia-1], "dia", null));
		});

		return crea_nodo("DIAS", "subroot", lista_dias);

	}

	/* Devuelve la lista de actividades que tienen ocurrencia en el JSON, sin duplicados, en forma de Tree.node */
	this.nodo_actividades = function() {

		var lista_actividades = [];
		var me = this;

		this.lista_unica_actividades.forEach( function(act) {
			var nodo = crea_nodo(act.nombre, act.tipo, null);
			nodo["dias"] = act.dias;
			lista_actividades.push(nodo);
		});

		return crea_nodo("ACIVIDADES", "subroot", lista_actividades);

	}

	/* Devuelve la lista de personas que hay en el "nodos" de una familia forma de Tree.node */
	this.personas_familia = function (familia, personas){

		var lista_personas = [];

		personas.forEach( function(persona) {
			var nodo = crea_nodo(persona.nombre, persona.relacion, null)
			nodo["edad"] = persona.edad;
			nodo["familia"] = familia;
			nodo["actividades"] = persona.actividades;
			lista_personas.push(nodo);
		});

		return lista_personas;

	}

	function crea_nodo( name, tipo, children ) {
		var nodo = {};
		nodo["name"] = name;
		nodo["tipo"] = tipo;
		nodo["children"] = children;
		return nodo;
	}

	/* Calcula las listas de días y actividades sin duplicados y las mapea en las variables this.lista_unica[dias/actividades] */
	this.listas_unicas = function () {

		var lista_unica_actividades = [];
		var lista_unica_dias = [];

		function trata_dia(dia){
			if ( lista_unica_dias.indexOf(dia) == -1 ) lista_unica_dias.push(dia);
		}

		/* Si la actividad ya existe en la lista única, entonces prueba de agregarle al item de la lista única los días extras que traiga la nueva, si no existía, la agrega. Posteriormente, procesa cada día de la actividad en la lista única de días */
		function trata_actividad (actividad){

			function existe_actividad(actividad) {
				var actividad_existente;
				for ( l in lista_unica_actividades) {
					var act = lista_unica_actividades[l];
					if (act.tipo == actividad.tipo && act.nombre == actividad.nombre ) {
						actividad_existente = act;
						break;
					}
				}
				return actividad_existente;
			}

			var actividad_existente = existe_actividad(actividad);
			if ( actividad_existente ) {
				var dias_existentes = actividad_existente.dias;
				actividad.dias.forEach( function(nuevo_dia) {
					if ( dias_existentes.indexOf(nuevo_dia) == -1 ) dias_existentes.push(nuevo_dia);
				});
			} else { 
				lista_unica_actividades.push(actividad); 
			}
			actividad.dias.forEach(trata_dia);

		}

		// Sacamos una lista de las actividades y de los días únicos
		this.datos.forEach( function (familia) {
			familia.nodos.forEach( function ( persona ){
				persona.actividades.forEach(trata_actividad);
			});
		});

		// Ordenamos la lista de dias
		var lista_unica_dias_ordenada = [];
		this.literales_dias.forEach( function(dia, i) {
			if ( lista_unica_dias.indexOf(dia) == -1 ) lista_unica_dias_ordenada.push(i+1);
		});

		//Devolver resultados
		this.lista_unica_actividades = lista_unica_actividades;
		this.lista_unica_dias = lista_unica_dias_ordenada;

	}

	/* A partir de un nodo raíz (this.root) recorre el árbol para generar una lista plana de ramas e hijos excluyendo el filtrado. Además carga las listas de días y actividades en las propiedades del objeto.*/
	this.calcula_nodos = function () {

		var root = this.root;

		// Al acabar la ejecución estarán cargadas con las ocurrencias halladas
		var lista_nodos_actividad = [];
		var lista_nodos_dias = [];

		var me = this;

		function recurse(node) {

			if (node.children) node.children.forEach(recurse);

			if ( node.tipo == "subroot") return;

			// Almacenamos en una lista los nodos con id de las actividades para luego relacionarlas con las personas
			if ( node.tipo == "profesion" || node.tipo == "hobbie") {
				bFiltrado = me.filtro_actividad != " Todos" && node.name != me.filtro_actividad;
				if ( bFiltrado ) return;
				lista_nodos_actividad[node.name] = node;
			}

			if ( node.tipo == "dia" ) {
				bFiltrado = me.filtro_dia != " Todos" && node.name != me.filtro_dia;
				if ( bFiltrado ) return;
				lista_nodos_dias[node.name] = node;
			}

			if (!node.id) node.id = ++i;

			lista_nodos_salida.push(node);

		}

		var lista_nodos_salida = [], i = 0;
		recurse(root);

		this.lista_nodos_actividad = lista_nodos_actividad;
		this.lista_nodos_dias = lista_nodos_dias;

		return lista_nodos_salida;
	}

	/*Se devuelven los normales del grafo, más las relaciones entre personas y actividades */
	this.calcula_relaciones = function (nodes) {

		var datos = this.datos;
		var lista_nodos_actividad = this.lista_nodos_actividad;
		var lista_nodos_dias = this.lista_nodos_dias;
		var me = this;

		/* Recorre la lista de flatten nodes buscando personas. Cuando encuentra una hace pushes de sus actividades mapeando (source/target) el id único de la actividad para crear una relación (force.link) sin que el nodo la tenga de children */
		function other_links(nodes) {

			function procesa_nodo(nodo) {

				function es_persona(nodo) { return ["padre", "madre", "hijo", "hija"].indexOf(nodo.tipo) > -1; }

				function otros_links_persona(nodo){

					var actividades_persona = nodo.actividades;
					var links = [];
					actividades_persona.forEach (function(a) {
						links.push({"target": lista_nodos_actividad[a.nombre], "source": nodo});
						a.dias.forEach( function(d){
							var source = lista_nodos_dias[me.literales_dias[d-1]];
							if (source) links.push({ "target": lista_nodos_actividad[a.nombre], "source": source});
						});
					});
					return links;
				}
				if (es_persona(nodo)) return otros_links_persona(nodo);
			}

			var otros_links = []; 
			nodes.forEach( function(nodo) {
				var link = procesa_nodo(nodo);
				if (link) otros_links = otros_links.concat(link);
			});
			return otros_links;
		}

		// nodos normales del árbol
		links = d3.layout.tree().links(nodes);
		// nodos agregados para relacionar personas con actividades
		var c = links.concat(other_links(nodes));
		return c;
	}

}


