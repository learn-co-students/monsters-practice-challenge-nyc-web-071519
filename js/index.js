const monsterContainer = document.querySelector("#monster-container");
const createForm = document.querySelector("#create-monster-form");
const navButtons = document.querySelector("#nav-buttons");
let currentPage = 1;

function showMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`,{
    })
    .then(response => response.json())
    .then(data => {
        data.forEach( e =>{
            monsterContainer.insertAdjacentHTML('beforeend',
                `<h2>Name: ${e.name}</h2>
                <h3>Age: ${e.age}</h3>
                <p>Description: ${e.description}</p><br>`
            )
        })
    })
}
showMonsters();

createForm.addEventListener('submit', e =>{
    e.preventDefault();
    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify({
            "name": e.target.name.value,
            "age": parseInt(e.target.age.value),
            "description": e.target.description.value
        })
    })
    .then(response => response.json())
    console.log(e.target.name.value)
})

navButtons.addEventListener('click', e=>{
    if (e.target.id === 'forward'){
        currentPage ++;
        monsterContainer.innerHTML = '';
        showMonsters();
    } else if(e.target.id === 'back'){
        currentPage --;
        monsterContainer.innerHTML = '';
        showMonsters();
    }
})
