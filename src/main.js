const shop = document.getElementById("shop");

console.log(shop);

const shopItemsData = [
  {
    id: "qdfioafwe",
    name: "Casual Shirt",
    price: 45,
    desc: "Its just a casual what else you want to know?",
    img: "/images/img-1.jpg",
  },
  {
    id: "qrgsd",
    name: "Office Shirt",
    price: 105,
    desc: "Wear it to work.",
    img: "/images/img-2.jpg",
  },
  {
    id: "bhngsgs",
    name: "T Shirt",
    price: 25,
    desc: "Dont T pose in real life.",
    img: "/images/img-3.jpg",
  },
  {
    id: "sdgvsdfg",
    name: "Mens Suit",
    price: 300,
    desc: "For the people with money.",
    img: "/images/img-4.jpg",
  },
];

const generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x) => {
    let {id,name,price,desc,img} = x //array/object destructuring
    let search = basket.find((x)=> x.id === id) || [];
    return ` 
  <div id=product-id-${id} class="item">
      <img src=${img} alt="">  
      <div class="details">
        <h3>${name}</h3>
        <p>${desc}</p>
        <div class="price-quantity">
            <h3>$${price}</h3>
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${search.item === undefined? 0 : search.item}</div> 
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
        </div>
      </div>
    </div>
    `;
  }).join(""));
};


const basket = JSON.parse(localStorage.getItem(("prodData"))) || []; /* timestamp 1:43:00 */
/* const basket = []; */

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

    localStorage.setItem("prodData",JSON.stringify(basket)); /* key/storage name , name of object being stored */
    update(selectedItem.id);
    /* console.log(basket); */
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

  localStorage.setItem("prodData",JSON.stringify(basket)); /* key/storage name , name of object being stored */
  
  basket = basket.filter((x) => x.item !== 0);
  update(selectedItem.id);
  /* console.log(basket); */
};

const calculation =() =>{ //cart icon amount total items
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=>x+y,0);
  console.log();
}


function update(id){
  let search = basket.find((x)=>x.id === id);
    /* console.log(search.item); */
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

generateShop();
calculation();



/* <div class="item">
<img src="/images/img-1.jpg" alt="">  
<div class="details">
  <h3>${x.name}</h3>
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
  <div class="price-quantity">
      <h3>$${x.price}</h3>
      <div class="buttons">
          <i class="bi bi-dash-lg"></i>
              <div class="quantity">0</div>
          <i class="bi bi-plus-lg"></i>
      </div>
  </div>
</div>
</div> */

/* if(search === undefined) {
  basket.push({
      id :selectedItem.id,
      item:1,
  });
} else {
search.item -=1;
} */