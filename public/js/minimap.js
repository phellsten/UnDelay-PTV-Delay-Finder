$(document).ready(function () {

    var map = L.map('minimap', {
        center: [-37.815, 144.965],
        zoom: 13
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2RlbXBzZXkiLCJhIjoiY2oweDk0NG85MDA4bzJ3bzJzOGZkaGdoaCJ9.EHeZhg7cyJ5MAfpwwA4Clw', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2RlbXBzZXkiLCJhIjoiY2oweDk0NG85MDA4bzJ3bzJzOGZkaGdoaCJ9.EHeZhg7cyJ5MAfpwwA4Clw'
    }).addTo(map);

    function onMapClick(e) {
        window.location.href = "/map";
    }

    map.on('click', onMapClick);

});
