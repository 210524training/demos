// Name
// Price
// Position
// Stock

export class Item {
    name = '';
    price = 0;
    position = '';
    stock = 0;

    constructor(name, price, position, stock) {
        // super();
        this.name = name;
        this.price = price;
        this.position = position;
        this.stock = stock;
    }
}