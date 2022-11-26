export function fetchRequest(value) {
    return fetch(`https://restcountries.com/v3.1/name/${value}?fields=flag,cca2,name,capital,population,languages`)
        .then(responce => {
            return responce.json();
        }
    )    
}


