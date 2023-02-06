let basket = JSON.parse(localStorage.getItem(("prodData"))) || []; /* timestamp 1:43:00 */
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

console.log(shopItemsData);

const calculation =() =>{ //cart icon amount total items
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=>x+y,0);
    console.log();
  }

  calculation();

  let generateCartItems = () => {
    if (basket.length !== 0){ /* if no data on localStorage return empty array */
        return (shoppingCart.innerHTML=basket.map((x)=>{
          console.log(x);
          let {id, item} = x;
          let search = shopItemsData.find((y) => y.id === id) || []; 
          let {img, name, price} = search; //deconstructed search , no longer need search.eg
          return `
          <div class="cart-item">
            <img width="100" src="${img}" alt="" />
            <div class="details">

              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${name}</p>
                  <p class="cart-item-price">$${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>

              <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                      <div id=${id} class="quantity">${item}</div> 
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
              <h3>$${item * search.price}</h3>
            </div>
          </div>
          `;
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2> Cart is Empty</h2>
        <a href="index.html">
        <button class="homeBtn">Back to Home</button>
        </a>
        `;
        
    }
  };

  generateCartItems();

  const increment =(id) =>{
    let selectedItem = id;
    let search = basket.find((item)=> item.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id :selectedItem.id,
            item:1,
        });
    } else {
      search.item +=1;
    }

    generateCartItems();
    update(selectedItem.id);
    
    localStorage.setItem("prodData",JSON.stringify(basket)); /* key/storage name , name of object being stored */
};

const decrement =(id) =>{
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);

  if(search === undefined) return;
  else if(search.item === 0) {
     return;
  } else {
    search.item -=1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0); //removes item from basket when qty reduced to 0

  generateCartItems();
  localStorage.setItem("prodData",JSON.stringify(basket)); /* key/storage name , name of object being stored */
};

function update(id){
  let search = basket.find((x)=>x.id === id);
    /* console.log(search.item); */
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) =>{
  let selectedItem = id;
  console.log(selectedItem.id);
  basket = basket.filter((x)=>x.id !== selectedItem.id); //removes item from basket when x btn clicked
  localStorage.setItem("prodData",JSON.stringify(basket)); /* key/storage name , name of object being stored */
  generateCartItems(); /* updates page with localStorage without refresh browser */
  calculation();
  totalAmount();
}

let clearCart = () => {
  basket = []; /* clear basket by setting to empty array */
  generateCartItems();
  calculation();
  localStorage.setItem("prodData",JSON.stringify(basket)); /* key/storage name , name of object being stored */
}

let totalAmount = () =>{
  if (basket.length !== 0){
    let amount= basket.map((x)=>{
      let {item , id} = x; /* destructure */
      let search = shopItemsData.find((y) => y.id === id) || []; 
      return item * search.price;
    }).reduce((x,y)=>x+y,0) /* ,0 means starts at 0 in array */
    /* console.log(amount); */
    label.innerHTML = `
      <h2>Total Bill : $${amount}</h2>
      <button class='checkout'>Checkout</button>
      <button onclick="clearCart()" class='removeAll'>Clear Cart</button>
    `
  } else return;
};

totalAmount();