const name = document.querySelector('.name')
const image = document.querySelector('.image')
const submit = document.querySelector('.submit')
const container = document.querySelector('.card-result')
const signout = document.querySelector('.signout')


window.addEventListener('load' , () =>{
    if(!localStorage.getItem('workers')){
        localStorage.setItem('workers' , JSON.stringify([]))
    }else{
        const base = JSON.parse(localStorage.getItem('workers'))

        const newBasewithId = base.map((item , index) =>{
            return{...item , id:index}
        })


        localStorage.setItem('workers' , JSON.stringify([...newBasewithId]))

        const dataId = JSON.parse(localStorage.getItem('workers'))
        console.log(dataId);



        const temp = dataId.reduce((total , {name, image, id}) =>{
            return total + CardTemplate(name , image, id)
        }, '')

        container.innerHTML = temp
    }
})


submit.addEventListener('click' , e =>{
    e.preventDefault
    if(name.value !== '' && image.value !== ''){
        const base = JSON.parse(localStorage.getItem('workers'))

        localStorage.setItem('workers' , JSON.stringify(
            [
                    ...base,
                {
                    name:name.value,
                    image:image.value
                }
            ]
        ))
    }

    name.value = ''
    image.value = ''
})


function CardTemplate(name , image , id){
    return `
    <div class="card-person">
                    <div class="card-center">
                        <img src="${image}">

                        <i>${name}</i>

                        <div class="tools">
                            <i class="fa fa-user-edit" data-id="${id}" onclick="Edit(${id})"></i>
                            <i class="fa fa-trash" data-id="${id}" onclick="Delete(${id})"></i>
                            <i class="fa fa-caret-square-down" data-id="${id}" onclick="More(${id})"></i>
                        </div>
                    </div>
                </div>
    `
}


function Delete(id){
    const data = JSON.parse(localStorage.getItem('workers'))
    const deletedUser = data.filter(item => item.id !== id)
    localStorage.setItem('workers' , JSON.stringify(deletedUser))
    window.location.reload()
}


function Edit(id){
    const data = JSON.parse(localStorage.getItem('workers'))
    const filtered = data.map(item => {
        if(item.id === id){
            return {
                ...item,
                name:prompt('New name?')
            }
        }
    })

    localStorage.setItem('workers', JSON.stringify(filtered))
    window.location.reload()
}



function More(id){
    const base = JSON.parse(localStorage.getItem('workers'))
    localStorage.setItem('singleUser' , JSON.stringify([base[id]]))


    window.open('single.html' , '_self')
}


window.addEventListener('load' , () =>{
    if(localStorage.getItem('isAuth') === 'false'){
        window.open('auth.html' , '_self')
    }else{
        return
    }
})


signout.addEventListener('click' , e =>{
    e.preventDefault()

    localStorage.setItem('isAuth' , 'false')
    window.location.reload()
})