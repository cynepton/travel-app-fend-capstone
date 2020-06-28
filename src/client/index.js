// Imported JavaScript functions
import {geoNamesAPI} from './js/geoNamesAPI';
import { weatherBitAPI } from "./js/weatherBitAPI";
import { pixabayAPI } from "./js/pixabayAPI";

// Imported SASS styles
import './styles/sass/main.scss';
import './styles/sass/trip-card.scss';

window.addEventListener('DOMContentLoaded', geoNamesAPI);

export {
    geoNamesAPI,
    weatherBitAPI,
    pixabayAPI
}