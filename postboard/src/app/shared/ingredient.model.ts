export class Ingredient {
  public _id?: string;
  public name: string;
  public amount: number;

  constructor(_id: string = null, name: string, amount: number) {
    this._id = _id;
    this.name = name;
    this.amount = amount;
  }
}
