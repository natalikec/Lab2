mapboxgl.accessToken = 'pk.eyJ1IjoibmF0a2VjIiwiYSI6ImNscjZudnpsdjJhcm8ya21jMXJuY29iYWwifQ.KonIboWryT9OOwjzC-0GTg'; //Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-map', // map container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-79.398007, 43.660335], // starting position [lng, lat]
    zoom: 12, // starting zoom
});

// Add a data source from a GeoJSON file
map.on('load', () => {
    map.addSource('heatrelief-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/natalikec/Lab2_data/main/Air%20Conditioned%20and%20Cool%20Spaces.geojson'
    });
    map.addLayer({
        'id': 'center-points',
        'type': 'circle',
        'source': 'heatrelief-data',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    })
});
