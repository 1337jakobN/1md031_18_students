
function MenuItem(name, img, cal, gluten, lactose, vegan) {
    this.productName = name;
    this.img = img;
    this.calories = cal;
    this.gluten = gluten;
    this.lactose = lactose;
    this.vegan = vegan;

    this.burgerInformation = function () {
        return this.productName + ' '+ this.img + ' ' + this.calories + ' ' + this.gluten +
        ' ' + this.lactose + ' ' + this.vegan;
    };
}

var menu_item1 = new MenuItem('Uno', "https://i.4pcdn.org/pol/1515102711229.jpg", '450 kCal', false, true, 'Non vegan');
var menu_item2 = new MenuItem('Dos', "https://simply-delicious-food.com/wp-content/uploads/2015/09/Crispy-chicken-burgers-3.jpg", '550 kCal', true, true, 'Non vegan');
var menu_item3 = new MenuItem('Tres', "https://cdn4.littlethings.com/app/uploads/2017/03/who-needs-a-bun-850x850.jpg", '500 kCal', true, false, 'Vegan');
var menu_item4 = new MenuItem('Cuatro', "https://www.findusfoodservices.se/cache/recipe_images/7c357a37-09ea-484b-80c4-c9b62639311c.jpg", '600 kCal', false, false, 'Vegan');
var menu_item5 = new MenuItem('Cinco', "https://www.findusfoodservices.se/cache/recipe_images/41f4904b-49af-45e4-93c3-d6abcac6bb29.jpg", '500 kCal', true, false, 'Non vegan');


function getCustomerInformation() {
  var fullname = document.getElementById('fullname').value;
  var email = document.getElementById('email').value;
  // var streetname = document.getElementById('streetname').value;
  // var housenumber = document.getElementById('housenumber').value;
  var paymentmethod = document.getElementById('paymentmethod').value;
  var gender = document.getElementsByName('gb');
  for (var i=0; i < gender.length ; i++) {
    if (gender[i].checked) {
      // this.customerArray.push({text: "gender: ", data: radio[i].value});
      // this.infoArray.push(radio[i].value);
      gender = gender[i].value;
      break;
    }
  }

  var customerArray = [fullname, email, paymentmethod, gender];
  return customerArray;
}

function getBurgerInformation() {
  var burgerArray = document.getElementsByName("checkbox");
  var selectedBurgers = [];
  for (i=0; i < burgerArray.length; i++) {
    if (burgerArray[i].checked) {
      selectedBurgers.push(burgerArray[i].value);
    }
  }
  return selectedBurgers;
}

var lastOrder = 0;



var vm = new Vue({
  el:'#vuecontainer',
  data: {
    menu: [menu_item1, menu_item2, menu_item3, menu_item4, menu_item5],
    customerArray: [],
    checkedBurger: [],
    click: false,
    //lastOrder: 0,
    orders: {},
  //  newOrder: {},
    //totalOrder: []
  },
  // created: function () {
  //    socket.on('initialize', function (data) {
  //      this.orders = data.orders;
  //    }.bind(this));
  //
  //    socket.on('currentQueue', function (data) {
  //      this.orders = data.orders;
  //    }.bind(this));
  //
  //  },
  methods: {
    buttonClicked: function() {
      this.click = true;
      this.customerArray = getCustomerInformation();
      this.checkedBurger = getBurgerInformation();
      this.addOrder();
      // this.customerArray.push({text: "Full name: ", data: fullname});
      // this.customerArray.push({text: "Email: ", data: email});
      // this.customerArray.push({text: "Selected payment method: ", data: paymentmethod});
    },
    getNext: function () {
       lastOrder = lastOrder + 1;
       return lastOrder;
       // Object.keys(this.orders).reduce( function (last, next) {
       //   return Math.max(last, next);
       // }, 0);
       // return lastOrder + 1;
     },
     addOrder: function (event) {
       console.log("hej");
       socket.emit("addOrder",
       {orderId: this.getNext(),
        details: this.orders.details,
        // details: { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
        //            y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top},
        orderItems: this.checkedBurger,
        orderInformation: this.customerArray,
    });

     },
     displayOrder: function(event) {
       console.log(event);
       console.log("tjennanaaaaa");
       socket.emit("displayOrder",
       this.orders =
        {details: {
          x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
          y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top},
          }
        );
      }
     }
   })
