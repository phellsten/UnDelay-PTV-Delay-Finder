$(document).ready(function() {

    var myStyle1 = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.1
    };

    var myStyle2 = {
        "color": "#42f445",
        "weight": 5,
        "opacity": 0.1
    };

    var myStyle3 = {
        "color": "#41f4df",
        "weight": 5,
        "opacity": 0.1
    };

    var myStyle4 = {
        "color": "#3f48f4",
        "weight": 5,
        "opacity": 0.1
    };


    function onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.LINEDESCLG) {
            layer.bindPopup(feature.properties.LINEDESCLG);
        }
    }


    function getTramData() {
        return $.getJSON("mapdata/ptv_tram_route.geojson");
    }

    function getTrainData() {
        return $.getJSON("mapdata/ptv_train_track_centreline.geojson");
    }

    function getRegionalBusData() {
        return $.getJSON("mapdata/ptv_bus_route_regional.geojson");
    }

    function getMetroBusData() {
        return $.getJSON("mapdata/ptv_bus_route_metro.geojson");
    }

    function populateFilterList(type, geodata) {
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
    });


    var streetmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2RlbXBzZXkiLCJhIjoiY2oweDk0NG85MDA4bzJ3bzJzOGZkaGdoaCJ9.EHeZhg7cyJ5MAfpwwA4Clw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2RlbXBzZXkiLCJhIjoiY2oweDk0NG85MDA4bzJ3bzJzOGZkaGdoaCJ9.EHeZhg7cyJ5MAfpwwA4Clw'
    });

    var map = L.map('map', {
        center: [-37.83, 144.97],
        zoom: 13,
        layers: [streetmap, ]
    });


    map.locate({
        setView: true,
        maxZoom: 15
    });

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationerror', onLocationError);

});
