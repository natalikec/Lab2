mapboxgl.accessToken = 'pk.eyJ1IjoibmF0a2VjIiwiYSI6ImNscjZudnpsdjJhcm8ya21jMXJuY29iYWwifQ.KonIboWryT9OOwjzC-0GTg'; //Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-map', // map container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-79.398007, 43.660335], // starting position [lng, lat]
    zoom: 12, // starting zoom
});

// Add a data source from a GeoJSON file
map.on('load', () => {
    //after the map has loaded, the below data points will load
    map.addSource('heatrelief-data', { //adding heat relief geojson file
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/natalikec/Lab2/main/Air%20Conditioned%20and%20Cool%20Spaces.geojson'
    });
    map.addLayer({
        'id': 'center-points', //unique id for heat relief points
        'type': 'circle',
        'source': 'heatrelief-data', //linking to data above
        'paint': {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    })
    map.addSource('park-data', {
        type: 'geojson',
        data: 'https://https://githu/Users/natalikeckes/Desktop/GGR472/Lab2/green_spaces.geojsonb.com/natalikec/Lab2/blob/7258a18130c63967bca9ac374193dbca65e82c04/green_spaces.geojsonnatalikec.github.io/Lab2/main/green_spaces.geojson'
    });
    map.addLayer({
        'id': 'park-polygon',
        'type': 'fill',
        'source': 'park-data',
        'paint': {
            'fill-color': '#007cbf',
            'fill-opacity': 0.7
        }
    })
});
