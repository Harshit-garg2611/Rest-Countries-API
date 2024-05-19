const cardContainer = document.querySelector('.card-container');



fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        data.forEach(country => {
            const cardLink = document.createElement('a');
            const card = document.createElement('div');
            card.classList.add('card');
            cardLink.href=`/country.html?name=${country.name.common}`
            cardLink.appendChild(card);
            card.innerHTML = `
         <img src= ${country.flags.svg} alt="flag">
         <div class="info">
             <h3>${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital}</p>
         </div>
`
            cardContainer.appendChild(cardLink);
        });
    })

