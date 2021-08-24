const base = JSON.parse(localStorage.getItem('singleUser'))
const container = document.querySelector('.centerBlock')
const title = document.querySelector('.title')


const temp = base.map(({name , image}) =>{
    container.innerHTML = `
    <div class="card">
            <div class="card-image">
                <img src="${image}" class="singleImage">
            </div>
            <div class="card-body">
                <h2 class="Name">
                    ${name}
                </h2>
            </div>
        </div>`

        title.innerHTML = name
})