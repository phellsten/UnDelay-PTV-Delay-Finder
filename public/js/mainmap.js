$(document).ready(function() {

    var busStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.1
    };

    var trainStyle = {
        "color": "#42f445",
        "weight": 5,
        "opacity": 0.1
    };

    var tramStyle = {
        "color": "#41f4df",
        "weight": 5,
        "opacity": 0.1
    };


    function onEachRoute(feature, layer) {
        if (feature.properties && feature.properties.LINEDESCLG) {
            layer.bindPopup(feature.properties.LINEDESCLG);
        }
    }
	
	function onEachDelay(feature, layer) {
        if (feature.properties && feature.properties.LINEDESCLG) {
            layer.bindPopup(feature.properties.LINEDESCLG);
        }
    }

    function getGeoJSONLayer(aid, rid, callback) {
		console.log('geojson get');
		$.ajax({
			url: "/map/gtfs/geojson/"+aid.toString()+"/"+rid.toString(),
			type: "GET",
			dataType: "json",
			contentType: "application/json",
			cache: false,
			timeout: 5000,
			success: function(data) {
				console.log('data '+data);
				callback(aid,rid,JSON.stringify(data));
			},
		    failure: function(err) {
			   console.log(err);
		    }
		   
		});
        // return $.getJSON("map/geojson/"+aid+"/"+rid);
    }
	
	function getDelays() {
		return $.getJSON("map/delays");
	}
	
	function getRouteNames(callback) {
		$.ajax({
			url: "/map/route_names/0",
			type: "GET",
			dataType: "json",
			contentType: "application/json",
			cache: false,
			timeout: 5000,
			success: function(data) {
			  callback(0,data);
		   }
		});
		$.ajax({
			url: "/map/route_names/1",
			type: "GET",
			dataType: "json",
			contentType: "application/json",
			cache: false,
			timeout: 5000,
			success: function(data) {
			  callback(1,data);
		   }
		});
		$.ajax({
			url: "/map/route_names/2",
			type: "GET",
			dataType: "json",
			contentType: "application/json",
			cache: false,
			timeout: 5000,
			success: function(data) {
			  callback(2,data);
		   }
		});
	}
	
	function populateRouteList(aid,rarr) {
		console.log(aid+' '+rarr);
		// for (key in rdict) { console.log(key); }
		if (!rarr) { return; }
		
		switch(aid){
			// Metro Buses
			case 0:
			for (var i=0; i<rarr.length; i++) {
				$("#metrobuslist").append('<li class="list-group-item"><input type="checkbox" class="rbox" id=cbox0'+i+'>'+rarr[i]+"</li>");
				$("#cbox0"+i).change(function() {
					// if checked
					if ($(this).is(':checked')) {
						addRouteLayer($(this));
					} // if unchecked 
					else {
						removeRouteLayer($(this));
					}
				});
			}
			break;
			// Metro Trains
			case 1:
			for (var i=0; i<rarr.length; i++) {
				$("#metrotrainlist").append('<li class="list-group-item"><input type="checkbox" class="rbox" id=cbox1'+i+'>'+rarr[i]+"</li>");
				$("#cbox1"+i).change(function() {
					// if checked
					if ($(this).is(':checked')) {
						addRouteLayer($(this));
					} // if unchecked 
					else {
						removeRouteLayer($(this));
					}
				});
			}
			break;
			// Metro Trams
			case 2:
			for (var i=0; i<rarr.length; i++) {
				$("#metrotramlist").append('<li class="list-group-item"><input type="checkbox" class="rbox" id=cbox2'+i+'>'+rarr[i]+"</li>");
				$("#cbox2"+i).change(function() {
					// if checked
					if ($(this).is(':checked')) {
						addRouteLayer($(this));
					} // if unchecked 
					else {
						removeRouteLayer($(this));
					}
				});
			}
			break;
		}
	}
	
	var mappedRoutes = {};
	
	function addRouteLayer(cbox) {
		cid = cbox.attr('id');
		console.log(cid);
		agency = parseInt(cid.substring(4,5));
		route = parseInt(cid.substring(5));
		newLayer = getGeoJSONLayer(agency,route,addMapLayer);
		// delayList = getDelays(route);
		// delayPopups = [];
		
		// lid = agency.toString + route.toString;
		// mappedRoutes[lid] = [newLayer, delayPopups];
	}
	
	function addMapLayer(aid,rid,mapdata) {
		layerstyle = null;
		if (aid == 0) { layerstyle = busStyle; }
		else if (aid == 1) { layerstyle = trainStyle; }
		else if (aid == 2) { layerstyle = tramStyle; }
		newlayer = L.geoJSON(mapdata, {
			style: layerstyle,
			onEachFeature: onEachRoute
		});
		lid = aid.toString + rid.toString;
		mappedRoutes[lid] = newlayer;
		newlayer.addTo(map);
	}
	
	function removeRouteLayer(cbox) {
		lid = agency.toString + route.toString;
		if (lid in mappedRoutes) {
			delete mappedRoutes[lid];
		}
	}
	
	// $.when(getRouteNames()).done(function(d1) {
		// console.log('d1 '+d1[1]);
		// populateRouteList(d1[1]);
	// });
	
	getRouteNames(populateRouteList);
	
/*     function populateFilterList(type, geodata) {
        switch (type) {
            case "tram":
                var routenames = [];
                for (var i = 0; i < geodata.features.length; i++) {
                    routenames.push(geodata.features[i].properties["LINEDESCLG"]);
                };
                var uniqueroutenames = [];
                $.each(routenames, function(i, el) {
                    if ($.inArray(el, uniqueroutenames) === -1) {
                        uniqueroutenames.push(el);
                        $("#tramlist").append('<li class="list-group-item">' + el + "</li>");
                    };
                });
                break;
            case "train":
                // for (var i = 0; i < geodata.features.length; i++) {
                //     $("#trainlist").append('<li class="list-group-item">' + geodata.features[i].properties["LINEDESCLG"] + "</li>");
                // };
                break;
            case "regionalbus":
                var routenames = [];
                for (var i = 0; i < geodata.features.length; i++) {
                    routenames.push(geodata.features[i].properties["LINEDESCLG"]);
                };
                var uniqueroutenames = [];
                $.each(routenames, function(i, el) {
                    if ($.inArray(el, uniqueroutenames) === -1) {
                        uniqueroutenames.push(el);
                        $("#regionalbuslist").append('<li class="list-group-item">' + el + "</li>");
                    };
                });
                break;
            case "metrobus":
                var routenames = [];
                for (var i = 0; i < geodata.features.length; i++) {
                    routenames.push(geodata.features[i].properties["LINEDESCLG"]);
                };
                var uniqueroutenames = [];
                $.each(routenames, function(i, el) {
                    if ($.inArray(el, uniqueroutenames) === -1) {
                        uniqueroutenames.push(el);
                        $("#metrobuslist").append('<li class="list-group-item">' + el + "</li>");
                    };
                });
                break;
        }
    }

    $.when(getTramData(), getTrainData(), getRegionalBusData(), getMetroBusData()).done(function(d1, d2, d3, d4) {
        var mapLayers = {};

        function getGeoJSONLayer(data, layerstyle) {
            return L.geoJSON(data, {
                style: layerstyle,
                onEachFeature: onEachFeature
            });
        }

        mapLayers["Trams"] = getGeoJSONLayer(d1[0], myStyle1);
        populateFilterList("tram", d1[0]);
        mapLayers["Trains"] = getGeoJSONLayer(d2[0], myStyle2);
        // populateFilterList("train", d2[0]);
        mapLayers["Regional buses"] = getGeoJSONLayer(d3[0], myStyle3);
        populateFilterList("regionalbus", d3[0]);
        mapLayers["Metro buses"] = getGeoJSONLayer(d4[0], myStyle4);
        populateFilterList("metrobus", d4[0]);

        for (var key in mapLayers) {
            mapLayers[key].addTo(map);
        }

        L.control.layers({}, mapLayers).addTo(map);
    }); */
	
	


    var streetmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2RlbXBzZXkiLCJhIjoiY2oweDk0NG85MDA4bzJ3bzJzOGZkaGdoaCJ9.EHeZhg7cyJ5MAfpwwA4Clw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2RlbXBzZXkiLCJhIjoiY2oweDk0NG85MDA4bzJ3bzJzOGZkaGdoaCJ9.EHeZhg7cyJ5MAfpwwA4Clw'
    });

    var map = L.map('map', {
        center: [-37.83, 144.97],
        zoom: 13,
        layers: [streetmap, ],
		fullscreenControl: {
			pseudoFullscreen: true
		}
    });


    map.locate({
        setView: true,
        maxZoom: 15
    });

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
    }

    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationerror', onLocationError);

});
