import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { renderList } from './renderlist';
export const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

export function fetchCountries(event) {
  if (event.target.value.trim() !== '') {
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
        renderList(countrys);
      })
      .catch(error => console.log(error));
  }
}
