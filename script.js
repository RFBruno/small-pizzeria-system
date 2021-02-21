let cart = [];
let modalKey = null;
let modalQtd = 1;
const c = (el) => {
    return document.querySelector(el)
}
const cs = (el) => {
    return document.querySelectorAll(el)
}

pizzaJson.map((pizza, index)=>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = pizza.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = toLocaleCurrency(pizza.price);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = pizza.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizza.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        pizzaWindowArea(key);
    
    })

    c('.pizza-area').append(pizzaItem);
});

function pizzaWindowArea(key){
    modalQtd = 1;
    modalKey = key;

    let pizza = pizzaJson[key]

    c('.pizzaBig img').src = pizza.img;
    
    c('.pizzaInfo h1').innerHTML = pizza.name;
    c('.pizzaInfo--desc').innerHTML = pizza.description;
    c('.pizzaInfo--size.selected').classList.remove('selected');
    cs('.pizzaInfo--size').forEach((el, index) =>{
        if(index === 2) {
            el.classList.add('selected');
        }
        el.querySelector('span').innerHTML = pizza.sizes[index];

        el.addEventListener('click', selectionSize);
    })

    c('.pizzaInfo--actualPrice').innerHTML = toLocaleCurrency(pizza.price);

    c('.pizzaInfo--qt').innerHTML = modalQtd;

    c('.pizzaWindowArea').style.opacity = 0;
    c('.pizzaWindowArea').style.display = 'flex';
    setTimeout( () =>{
        c('.pizzaWindowArea').style.opacity = 1;
    }, 200)

    cs('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach(el => el.addEventListener('click', closePizzaWindow));
    
}

function closePizzaWindow(){    
        c('.pizzaWindowArea').style.opacity = 0;

        setTimeout( () =>{
            c('.pizzaWindowArea').style.display = 'none';        
        }, 200)
}

function selectionSize(){
    c('.pizzaInfo--size.selected').classList.remove('selected');
    this.classList.add('selected');
}

c('.pizzaInfo--qtmenos').addEventListener('click', () =>{
    if(modalQtd > 1){
        modalQtd--;
        c('.pizzaInfo--qt').innerHTML = modalQtd;
    }
})

c('.pizzaInfo--qtmais').addEventListener('click', () =>{
    modalQtd++;
    c('.pizzaInfo--qt').innerHTML = modalQtd;
})

c('.pizzaInfo--addButton').addEventListener('click', () =>{
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
    
    let identifier = pizzaJson[modalKey].id + "@" + size
    
    let key = cart.findIndex( item => item.identifier === identifier);

    if(key > -1){
        cart[key].qtd += modalQtd;
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qtd: modalQtd
        })     
    }
    

    closePizzaWindow();
})

function toLocaleCurrency(value){
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}