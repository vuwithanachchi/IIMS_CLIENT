export class CartDTO{
  private _cartid: string;
  private _userid: string;
  private _imageURL:string;
  private _componetID: string;
  private _componetName:string;
  private _quantity : string;

  constructor(cartid: string, userid: string, imageURL: string, componetID: string, componetName: string, quantity: string) {
    this._cartid = cartid;
    this._userid = userid;
    this._imageURL = imageURL;
    this._componetID = componetID;
    this._componetName = componetName;
    this._quantity = quantity;
  }

  get cartid(): string {
    return this._cartid;
  }

  set cartid(value: string) {
    this._cartid = value;
  }

  get userid(): string {
    return this._userid;
  }

  set userid(value: string) {
    this._userid = value;
  }

  get imageURL(): string {
    return this._imageURL;
  }

  set imageURL(value: string) {
    this._imageURL = value;
  }

  get componetID(): string {
    return this._componetID;
  }

  set componetID(value: string) {
    this._componetID = value;
  }

  get componetName(): string {
    return this._componetName;
  }

  set componetName(value: string) {
    this._componetName = value;
  }

  get quantity(): string {
    return this._quantity;
  }

  set quantity(value: string) {
    this._quantity = value;
  }
}
