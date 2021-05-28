# USGS-EarthquakeData
Global earthquake data from the United States Geological Survey is visualized here with the aim to be more accessible and meaningful to the public and government organizations. The USGS is responsive for providing scientific data on natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. The information gathered is displayed using Leaflet and D3. With an increased awareness, the hope is to secure funding specifically for these worldwide issues.

## Data Sources-
USGS: United States Geological Survey (GeoJSON Summary Format- Past 30 Days)
This dataset updates once per minute.
https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
<br>
<br>
Tectonic Plate Information (GeoJSON Format of Boundaries)
https://github.com/fraxen/tectonicplates

## Description-
This interactive Leaflet map uses Mapbox API and various view layers to show earthquakes across the globe for the past 30 days. In addition, the tectonic plate boudaries are added in with a static json file. Users can choose between three view layers and select which data to view.

## Tools-
Leaflet
Mapbox
OpenStreetMap
D3

## The visualization has multiple views:
Outdoor Map View
![Alt text](static/images/Outdoor_View.png?raw=True "Outdoor Map View")
Grayscale Map View
![Alt text](static/images/Grayscale_View.png?raw=True "Grayscale Map View")
Satellite Map View
![Alt text](static/images/Satellite_View.png?raw=True "Satellite Map View")

## The data shown on each view, can also be changed:
Without Data
![Alt text](static/images/satellite_solo.png?raw=True "Satellite View Only")
Tectonic Plates Only
![Alt text](static/images/outdoor_plates.png?raw=True "Outdoor View Plates")
Earthquakes Only
![Alt text](static/images/grayscale_earthquakes.png?raw=True "Grayscale View Earthquakes")

## The markers can viewed at any zoom level:
Zoom at Los Angeles
![Alt text](static/images/zoom_la_markerdetails.png?raw=True "Satellite View Only")
Zoom at California
![Alt text](static/images/zoom_cali_markerdetails.png?raw=True "Satellite View Only")
Zoom at World
![Alt text](static/images/zoom_world_markerdetails.png?raw=True "Satellite View Only")

