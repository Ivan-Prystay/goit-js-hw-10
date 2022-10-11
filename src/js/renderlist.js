import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './fetchcountries';

export function renderList(countrys) {
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
  } else if (countrys.length >= 11) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.',
      (refs.countryList.innerHTML = ''),
      (refs.countryInfo.innerHTML = '')
    );
  }
  if (countrys.length == 1 && countrys[0].name.common === 'Russia') {
    return (
      Notify.warning('Russia is a terrorist country'),
      ((refs.countryList.innerHTML = ''), (refs.countryInfo.innerHTML = ''))
    );
  }
}
