// Name
// Price
// Position
// Stock

export default class Item {
  constructor(
    public name: string,
    public price: number,
    public position: string,
    public stock: number,
  ) {}

  toString() {
    return `[${this.position}] ${this.name} | $${this.price} | ${this.stock} left`;
  }
}
