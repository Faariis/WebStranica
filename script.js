/* GET */

const autaCardTemplate = document.querySelector("[data_auta_template]");
const autaCardContainer = document.querySelector("[data_auta_cards_container]");
const searchInput = document.querySelector("[data_search]");

let users = [] //Čuva podatke u nizu (Prilikom unosa)


searchInput.addEventListener("input", (e) => { //Sve što se unese u pretraživać bilježi se u konzoli
    const value = e.target.value.toLowerCase(); //toLowerCase prebaci u mala slova ako npr. unese se veliko slovo
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.manufacturer.toLowerCase().includes(value); //Ako bilo gdje u nazivu/proizvođaču ima slovo uneseno, vraća true
        user.element.classList.toggle("hide", !isVisible); //Ako je vidljiv neće biti skriven
    })
})

fetch("https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars")
    .then(res => {
        if (res.ok) { console.log("GET request uspješan! ")}
        else (console.log("GET request neuspješan!"));
        return res;
    })
    .then(res => res.json())
    .then(data => {
      users = data.map(user => {
        const card = autaCardTemplate.content.cloneNode(true).children[0]; //Uzima sadžaj iz template-a
        const header = card.querySelector("[data_header]");
        const body = card.querySelector("[data_body]");
        header.textContent = user.name;
        body.textContent = user.manufacturer;
        autaCardContainer.append(card);
        return { name: user.name, manufacturer: user.manufacturer, element: card }
    })
})
    

/* POST */

fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars', {
    method: "POST",
    headers: {
        "Content-type": "application/json" //Govori severu koji format podataka šaljemo
    },
    body: JSON.stringify(
        {
            "id": 7,
            "name": "Audi",
            "manufacturer": "Q7",
            "imageUrl": "8990",
            "price": 100000,
            "year": 2020
          }
    )      
})
    
 /*   
const postData = {
    "id": 7,
    "name": "Audi",
    "manufacturer": "Q7",
    "imageUrl": "8990",
    "price": 100000,
    "year": 2020
};
try {
    const response = await fetch('https://ptf-web-dizajn-2022.azurewebsites.net/api/Cars', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)        
    });
    if (!response.ok) {
        const message = "Error with Status Code: " + response.status;
        throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.log("Error: " + err);
}*/