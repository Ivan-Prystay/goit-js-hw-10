import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderList } from './renderlist';
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function fetchCountries(event) {
  if (refs.input.value.length <= 1) {
    return (
      Notify.info('Too many matches found. Please enter a more specific name.'),
      ((refs.countryInfo.innerHTML = ''), (refs.countryList.innerHTML = ''))
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
          throw new Error(
            response.status,
            Notify.failure('Oops, there is no country with that name'),
            ((refs.countryInfo.innerHTML = ''),
            (refs.countryList.innerHTML = ''))
          );
        }
        return response.json();
      })
      .then(countrys => {
        if (countrys.length == 1 && countrys[0].name.common === 'Russia') {
          return (
            Notify.warning('Russia is a terrorist country'),
            (refs.countryList.innerHTML = '')
          );
        }
        renderList(countrys);
      })
      .catch(error => console.log(error));
  }
}

export { refs, fetchCountries };
