// Name
// Price
// Position
// Stock

export class Item {
    constructor(public name: string, public price: number, public position: string, public stock: number) {
        this.name = name;
        this.price = price;
        this.position = position;
        this.stock = stock;
    }
}