mapboxgl.accessToken = 'pk.eyJ1IjoibmF0a2VjIiwiYSI6ImNscjZudnpsdjJhcm8ya21jMXJuY29iYWwifQ.KonIboWryT9OOwjzC-0GTg'; 
    //access token for my mapbox style
const map = new mapboxgl.Map({
    container: 'my-map', 
        // map container ID
    style: 'mapbox://styles/natkec/clsjxnbd403qe01qq47879wiq', 
        //my style URL
    center: [-79.335115, 43.729266], 
        // starting position (Toronto) [lng, lat] 
    zoom: 10.5, 
        // starting zoom, Toronto fits onto screen 
});

// Adding data source from 2 GeoJSON files
map.on('load', () => { 
        //after the map has loaded, the below data points will load
    map.addSource('park-data', {
            //adding green space geojson file
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/natalikec/Lab2/main/green_spaces.geojson'
    });

    map.addLayer({ 
            //adding a layer with the green space polygons
        'id': 'park-polygon', 
            //unique id for green space polygons
        'type': 'fill', 
            //filling in polygons
        'source': 'park-data',
            //link to data id above
        'paint': {
            'fill-color': 'hsl(143, 36%, 37%)', 
                //green color
            'fill-opacity': 0.99 
                //almost no opacity 
        },

    })
    map.addSource('heatrelief-data', { 
            //adding heat relief geojson file
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/natalikec/Lab2/main/Air%20Conditioned%20and%20Cool%20Spaces.geojson',
    });
 
    map.addLayer({ 
            //adding a layer with the heat relief netowork
        'id': 'center-points', 
            //unique id for heat relief points
        'type': 'circle', 
            //points shown as circles
        'source': 'heatrelief-data', 
            //linking to data id above
        'paint': {
            'circle-radius': 5.5,
                //size of circles
            'circle-color': 'hsl(193, 74%, 22%)', 
                //dark blue
            'circle-stroke-color': 'hsl(60, 68%, 57%)', 
                //gold rim to points
            'circle-stroke-width': 0.5 
                // size of rim
        }
    })
    
 // Adding pop up for heat relief center points showing what type of facility it is
 map.on('click', 'center-points', (e) => {
        //event listener for clicking on center-points
    const coordinates = e.features[0].geometry.coordinates.slice();
        //gets the coordinates of the point feature clicked, the slice makes a copy of the coordinates so the original isn't changed
    const description = e.features[0].properties.locationDesc; 
        //gets the locationDesc property in the geojson, which has attribute information for facility type

    
    new mapboxgl.Popup()
        //creating the popup display
        .setLngLat(coordinates)
            //makes the popup appear at the point features coordinates
        .setHTML(description)
            //retreives the description property which has been set above
        .addTo(map);
            // adds popup tp map 
});
});
