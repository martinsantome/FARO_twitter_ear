/* Dependencias:
	- D3.JS
	- jQuery.JS
	- arbol.js
	- herramientas.js
*/
function layout() {

	this.contenedor;
	this.arbol;

	this.force;
	this.svg;

	this.link;
	this.node;

	this.pop_up;

	this.evento_click_en_mapa_filtros;

	this.init = function( datos, contenedor, contenedor_popup ) {

		this.contenedor = contenedor;
		this.arbol = new arbol(datos).init();
		this.pop_up = new pop_up().init(contenedor_popup);

		this.render_force();

		return this;

	}

	this.render_force = function () {

		$("#" + this.contenedor).empty();

		var width = 800,
			height = 600

		me = this;
		this.force = d3.layout.force()
			.linkDistance(180)
			.charge(-300)
			.gravity(.09)
			.on("tick", function(d) { return me.tick(d, me) });

		this.svg = d3.select("#" + this.contenedor)
			.append("svg")
			.attr("id", "svg")
			.attr("width", "100%")
			.attr("height", height);

		this.update();

	}

	this.tick = function ( d, obj ) {

		var svg_x = $("#div_ejemplo_1").width() - 50;
		var svg_y = $("#div_ejemplo_1").height()- 400;
		obj.force.size([svg_x, svg_y]);

		obj.link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		obj.node.attr("transform", function(d) { return "translate(" + d.x + "," +  d.y + ")"});

	}

	function color(d) {
		  return d._children ? "#3182bd" // collapsed package
			  : d.children ? "#c6dbef" // expanded package
			  : "#fd8d3c"; // leaf node
	}

	this.es_persona = function( tipo ) {
		return ["padre", "madre", "hijo", "hija"].indexOf(tipo) > -1;
	}

	this.update = function () {

		this.force.stop();

		// Nodos y líneas de relación
		this.link = this.svg.selectAll(".link");
		this.node = this.svg.selectAll(".node");

		var nodos = this.arbol.calcula_nodos(),
			links = this.arbol.calcula_relaciones(nodos);

		var f = new filtros();
		var filtro_nodos = f.filtrar_nodos(this.arbol),
			links = f.purgar_filtrado_links(this.arbol, links, filtro_nodos ),
			nodos = f.purgar_nodos_aislados(nodos, links);

		this.force
			.nodes(nodos)
			.links(links);

		this.link = this.link.data(links);
		this.node = this.node.data(nodos, function(d){ return d.id; });

		this.link.enter()
			.insert("line", ".node")
			.attr("class", "link");

		var me = this;
		var nodeEnter = this.node.enter()
			.append("g")
			.filter( filtro_nodos )
			.attr("class", function(d) { return "node " + normalizar(d.tipo) + normalizar(d.name) }) //Añadimos una clase extra para el filtrado externo. Se hará simulando el click en el nodo a través de su nombre.
			.on("click", function(d) { return me.click(d, me) })
			.call(this.force.drag);
		nodeEnter.append("circle")
			.attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; });
		nodeEnter.append("svg:image")
			.attr("xlink:href", function(d) { return set_imagen(d) })
			.attr("width", 40)
			.attr("height", 40)
			.attr("x", -20)
			.attr("y", -20)
			.on("mouseover", function(d){
				if ( me.es_persona(d.tipo) ) me.pop_up.set_popup(d);
			}) 
			.on("mouseout", function(d){
				if ( me.es_persona(d.tipo) ) me.pop_up.set_popup_off(d);
			});
		nodeEnter.append("text")
			.attr("dy", ".35em")
			.text(function(d) { return me.es_persona(d.tipo) ? d.name + "(" + d.edad + ")" : d.name; })
			.attr("y", 23);
		nodeEnter.select("circle")
			.style("fill", color);

		this.link.exit().remove();
		this.node.exit().remove();

		f.aplicar_filtro_edad(this.arbol.filtro_edad_min, this.arbol.filtro_edad_max, this);

		this.force.start();

	}

	/* Toggle de un nodo al recibir el click
		@param d es el datum del nodo 
		@param obj es la clase layout.js */
	this.click = function (d, obj) {

		if (d3.event.defaultPrevented) return; // ignore drag

		var EsContraer = d.children;
		if (EsContraer) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}

		obj.update();

		this.evento_click_en_mapa_filtros(d, obj);

	}

	/* Devuelve la url de la imagen segun el tipo del nodo */
	function set_imagen(d) {
		return "samples/sample1/uimg/" + d.tipo + ".png?1.0.0";
	}

}
