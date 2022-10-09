import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

function fetchCountries(event) {
  if (refs.input.value.length <= 1) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (event.target.value !== '') {
    return fetch(
      `https://restcountries.com/v3.1/name/${event.target.value
        .trim()
        .toLowerCase()}?fields=name,capital,languages,population,flags`
    )
      .then(response => {
        if (!response.ok) {
          refs.countryInfo.innerHTML = '';
          refs.countryList.innerHTML = '';
          throw new Error(
            response.status,
            Notify.failure('Oops, there is no country with that name')
          );
        }
        return response.json();
      })
      .then(countrys => {
        renderList(countrys);
      })
      .catch(error => console.log(error));
  }
}

function renderList(countrys) {
  let markup = '';
  if (countrys.length == 1) {
    markup = countrys
      .map(
        ({
          flags,
          name,
          capital,
          population,
          languages,
        }) => `<p style="font-size: xx-large">
    <img
      src="${flags.svg}"
      width="70"
      alt="flag ${name.official}"
      style="display: inline-block; margin-right: 10px"
    />${name.official}
  </p><p><b>Capital: </b>${capital[0]}</p>
    <p><b>Population: </b> ${population}</p><p><b>languages: </b> ${Object.values(
          languages
        ).join(', ')}</p>`
      )
      .join('');
    refs.countryInfo.innerHTML = markup;
    refs.countryList.innerHTML = '';
    //
  } else if (countrys.length > 1 && countrys.length < 11) {
    markup = countrys
      .map(
        ({ flags, name }) => `<li style="list-style: none">
   <img src="${flags.svg}" width="30" style="display: inline-block; margin-right: 10px" alt="flag ${name.official}" />
   <span style="font-size: x-large; font-weight: 400">${name.common}</span>
   </li>`
      )
      .join('');
    refs.countryList.innerHTML = markup;
    refs.countryInfo.innerHTML = '';
  }
}
