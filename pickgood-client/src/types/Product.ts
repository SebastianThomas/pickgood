export default class Product {
  constructor(
    public id: string,
    public title: string,
    public quantity: number,
    public description: string,
    public images: string[]
  ) {}

  getDisplayProperties() {
    return {
      // Images not shown as div, so hardcoded
      quantity: this.quantity,
      title: this.title,
      description: this.description,
    }
  }
}
