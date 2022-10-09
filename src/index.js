import './css/styles.css';
import { fetchCountries, refs } from './js/fetchcountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));
