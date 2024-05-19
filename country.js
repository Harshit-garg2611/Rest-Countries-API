let countryName = new URLSearchParams(location.search).get('name');
let countryFlag = document.querySelector('.flag img');
let countryH1 = document.querySelector('.details h1');
let borderCountries = document.querySelector('.border-countries');
let backButton = document.querySelector('.button button');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=> res.json())
.then(([country])=>{
    // console.log(country)


    backButton.addEventListener('click', ()=>{
        history.back();
    })
    let native;
    let currency;
    let tld;
    let languages;
    if(country.name.nativeName){
        native = (Object.values(Object.values(country.name)[2]))[0].common
    }
    if(typeof country.currencies==="object"){
        currency = (Object.values(country.currencies)[0].name)
    }
    
    if(typeof country.tld==="object"){
        tld = (country.tld[0]);
    } 
    if(typeof country.languages === "object"){
        languages = (Object.values(country.languages));
    }
    countryFlag.src = country.flags.svg;
    countryH1.innerText=countryName;
    let info1 = document.querySelector('.first');
    let info2 = document.querySelector('.second');
    
    info1.innerHTML = `  
    <p><b>Native Name: </b>${native}</p>
    <p><b>Population: </b>${country.population}</p>
    <p><b>Region: </b>${country.region}</p>
    <p><b>Capital: </b>${country.capital}</p> `
    info2.innerHTML = `
    <p><b>Top Level Domain: </b>${tld}</p>
    <p><b>Currencies: </b>${currency}</p>
    <p><b>Languages: </b>${languages}</p>`



    if(typeof country.borders==="object"){
        country.borders.forEach((border)=>{
            // console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`)
            .then((res)=> res.json())
            .then(([data])=>{
                // console.log(data.name.common)
                let borderLink = document.createElement('a');
                borderLink.innerText = `${data.name.common}`
                borderLink.href = `country.html?name=${data.name.common}`
                borderCountries.appendChild(borderLink);
            })
        })
    }
})