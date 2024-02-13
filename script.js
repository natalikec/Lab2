mapboxgl.accessToken = 'pk.eyJ1IjoibmF0a2VjIiwiYSI6ImNscjZudnpsdjJhcm8ya21jMXJuY29iYWwifQ.KonIboWryT9OOwjzC-0GTg'; //Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-map', // map container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-79.398007, 43.660335], // starting position [lng, lat]
    zoom: 12, // starting zoom
});

map.on('load', () => { // after everything has been loaded, this will happen
    //the .on -> adds a listener = listening out for our map to be loaded. everything after the curly brackets will happen after the maps has been loaded.
    //Add a data source containing GeoJSON data
    map.addSource('uoft-data', {  // source id (the first parameter), then in the backets you have to have the type of data and the source
        type: 'geojson',
        data: {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "Sidney Smith Hall"
                    },
                    "geometry": {
                        "coordinates": [
                            -79.39865237301687,
                            43.662343395037766
                        ],
                        "type": "Point"
                    }// instead of havign all the data here, link a data source to have it be less messy/more efficient. Get URL from hithub
                }
            ]
        }
    });
    // Add a data source from a GeoJSON file
    map.addSource('buildings-data', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/natalikec/Week5_ClassEx/main/week5/wk5-data/buildings.geojson' // Your URL to your buildings.geojson file
    });
    map.addLayer({
        'id': 'buildings-point',
        'type': 'circle',
        'source': 'buildings-data',
        'paint': {
            'circle-radius': 5,
            'circle-color': '#007cbf'
        }
    });
    map.addLayer({ //to visualize a layer from the added source
        'id': 'uoft-pnt', //the layer needs a unique id 
        'type': 'circle',// this will be different depending on type of data source
        'source': 'uoft-data',// use id used in the add source above
        'paint': { // these parameters are different based on the type
            'circle-radius': 6,
            'circle-color': '#B42222'
        }//this doesn't have to be in this positon in the javascript, can be under a button click or hover. currently this is in the load. 
    });
    // Add a data source from a Mapbox tileset
    map.addSource('censustrack-data', { // Create your own source ID
        'type': 'vector',
        'url': 'mapbox://natkec.2xbn5mx6' // Update to your mapbox tileset ID
    });
    map.addLayer({
        'id': 'census-tracks', // Create your own layer ID
        'type': 'fill', // Note this is different to point data
        'source': 'censustrack-data', // Must match source ID from addSource Method
        'paint': {
            'fill-color': '#888888', // Test alternative colours and style properties
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        },
        'source-layer': 'torontoct-bzr4ng' // Tileset NAME (diff to ID), get this from mapbox tileset page
    },
        'uoft-buildings' // Drawing order - places layer below points
// Here the addlayer method takes 2 arguments (the layer as an object and a string for another layer's name). If the other layer already exists, the new layer will be drawn before that one
);
});
