export function fetchRequest(value) {
    return fetch(`https://restcountries.com/v3.1/name/${value}`)
        .then(responce => {
            return responce.json();
        })
        
}


