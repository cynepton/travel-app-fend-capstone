# Travel App: Udacity Frontend Developer Nanodegree Capstone Project
    This project is a travel app that, obtains a desired trip location & date from the user, and displays weather information and an image of the location using information obtained from external APIs. This is the final project for my Udacity Front-end Developer Nanodegree. The project provides an opportunity for me to us the skills I leanrt during the degree.

## Sass Resources Loader
This branch is currently a test for the sass-resources-loader, while it actually works, it ignores the `@use` used to import the partial files into the `.scss` files. Commenting out the `@use` before building, works just fine.
More research is being done till the bugs are completely fixed. 

## Project Overview
The application [takes in a destination city and a departure date from the user](src\client\views\index.html), and the [passes the city along with an API request](src\client\js\geonamesAPI.js) to [Geonames](http://www.geonames.org/export/web-services.html). 
The [data recieved](src\client\sample-json-api-res\geonameData.json) contains information about the city, but as at now this application only reads the longitude, latitude and country. 
This data is then sent through a POST request to the project [server](src\server\server.js). The server stores this information in an array and waits for the [weatherBitAPI](src\client\js\weatherBitAPI.js) function to request it.
The longitude and latitude data is then sent to [WeatherBit](https://www.weatherbit.io/account/create). Since weatherBit only offers forecasts up to 16 days, historical weather data is pulled for departure dates more than 16 days. 
For this project, I have only pulled the [minimum](src\client\sample-json-api-res\weatherBit.json) and [maximum](src\client\sample-json-api-res\weatherBitHist.json) temperature predictions, But I have added a sample request for forecasts and historical data showing the complete dataset offered by the API.
The data received is passed to the server and stored in an array. 
The city and country are then [passed with an API](src\client\js\pixabayAPI.js) to [Pixabay](https://pixabay.com/api/docs/), other information such as ensuring the image is a photo, and is in landscape and is from the travel category. Pixabay returns a URL than can be used to embed the image in the application.
This URL is finally sent to the server, and all the collected information is gotten from the server and used to [update the UI](src\client\js\createTripCard.js). 

## Working With this Project

### To Run the Project in Development Mode
1. **Clone the Repository to your local machine:** 
Run this in the terminal:
```
git clone https://github.com/cynepton/travel-app-fend-capstone.git
```
2. **Install Dependencies:**
Run the 
```
npm install
```
This will install the dependencies based on the information in the `package.json` file.

3. **Run Express Server**
```
npm run start
```

4. **Run Webpack Development Server**
```
npm run build-dev
```

### To Run the Project in Production Mode
1. **Clone the Repository to your local machine:** 
Run this in the terminal:
```
git clone https://github.com/cynepton/travel-app-fend-capstone.git
```
2. **Install Dependencies:**
Run the 
```
npm install
```
This will install the dependencies based on the information in the `package.json` file.
3. **Run Express Server**
```
npm run start
```

4. **Webpack Production Build**
Run this in the terminal:
```
npm run build-dev
```
Webpack builds a `dist` folder in the project root directory, this folder contains the project `index.html`, a minified `main.css` stylesheet for the project, and a minified `main.js` javascript file. 

### Editing the CSS Styling
The Recommended way to edit the styling would by editing the `.scss` files. They are located in the [`src/client/styles/sass`](src/client/styles/sass) directory.
Refer to the [Directory Tree](#Directory-Tree) for an overview.
For a live rebuilding of the `.scss` files into `css` files, run:
```
npm run sass
```
Changes made to the .scss styles are automatically loaded into the `.css` files in the [css](src/client/styles/css) folder.
**Note**: Webpack builds the .scss files and not the css files. The css files are only there to easily monitor style changes without having to rebuild the entire project

## Directory Tree
```
travel-app-fend-capstone
|   .babelrc
|   .gitattributes
|   .gitignore
|   LICENSE
|   output.txt
|   package-lock.json
|   package.json
|   README.md
|   webpack.dev.js
|   webpack.prod.js
|   
+---dist
|       index.html
|       main.css
|       main.js
|       main.js.map
|       service-worker.js
|       service-worker.js.map
|       workbox-1bbb3e0e.js
|       workbox-1bbb3e0e.js.map
|                     
\---src
    +---client
    |   |   index.js
    |   |   
    |   +---js
    |   |       createTripCard.js
    |   |       geonamesAPI.js
    |   |       pixabayAPI.js
    |   |       weatherBitAPI.js
    |   |       
    |   +---media
    |   |       travel-default.jpg
    |   |       
    |   +---sample-json-api-res
    |   |   |   geonameData.json
    |   |   |   pixabay.json
    |   |   |   weatherBit.json
    |   |   |   weatherBitHist.json
    |   |   |   
    |   |   \---dev-only
    |   |           bugtest.json
    |   |           bugtest.txt
    |   |           
    |   +---styles
    |   |   +---css
    |   |   |   |   main.css
    |   |   |   |   main.css.map
    |   |   |   |   trip-card.css
    |   |   |   |   trip-card.css.map
    |   |   |   |   
    |   |   |   \---partials
    |   |   \---sass
    |   |       |   main.scss
    |   |       |   trip-card.scss
    |   |       |   
    |   |       \---partials
    |   |               _variables.scss
    |   |               
    |   \---views
    |           index.html
    |           
    \---server
            server.js
```

## Dependencies
These are the versions as at the most recent commit.

Dependency|Version
----------|-------
babel     |6.23.0
body-parser|1.19.0
cors|2.8.5
dotenv|8.2.0
express|4.17.1
file-loader|6.0.0
html-loader|1.1.0
mini-css-extract-plugin|0.9.0
optimize-css-assets-webpack-plugin|5.0.3
sass|1.26.9
sass-resources-loader|2.0.3
terser-webpack-plugin|3.0.6
webpack|4.43.0
webpack-cli|3.3.12
workbox-webpack-plugin|5.1.3

**DevDependencies**
Dependency|Version
----------|-------
@babel/core|7.5.4
@babel/plugin-transform-runtime|7.9.0
@babel/preset-env|7.5.4
babel-loader|8.0.6
clean-webpack-plugin|3.0.0
css-loader|3.5.3
html-webpack-plugin|3.2.0
jest|26.0.1
node-sass|4.14.1
sass-loader|8.0.2
style-loader|1.2.1
webpack-dev-server|3.11.0