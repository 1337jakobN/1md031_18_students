function MenuItem(name, cal, gluten, lactose, vegan) {
    this.productName = name;
    this.calories = cal;
    this.gluten = gluten;
    this.lactose = lactose;
    this.vegan = vegan;
    this.burgerInformation = function () {
        return this.productName + ' ' + this.calories + ' ' + this.gluten +
        ' ' + this.lactose + ' ' + this.vegan;
    };
}

var menu_item1 = new MenuItem('Yikes', '450 kCal', 'Gluten free', 'Contains lactose', 'Non vegan')
var menu_item2 = new MenuItem('Yeet', '550 kCal', 'Contains gluten', 'Contains lactose', 'Non vegan')
var menu_item3 = new MenuItem('Yikes', '500 kCal', 'Gluten free', 'Lactose free', 'Vegan')

console.log( menu_item1.burgerInformation() );
console.log( menu_item2.burgerInformation() );
console.log( menu_item3.burgerInformation() );
