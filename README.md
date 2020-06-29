# Travel App: Udacity Frontend Developer Nanodegree Capstone Project
    This project is a travel app that, obtains a desired trip location & date from the user, and displays weather information and an image of the location using information obtained from external APIs. This is the final project for my Udacity Front-end Developer Nanodegree

## Directory Tree

```
C:.
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