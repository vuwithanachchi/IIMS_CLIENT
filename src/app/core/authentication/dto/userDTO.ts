export class UserDTO{
  private _userid: string;
  private _username: string;
  private _email: string;
  private _password: string;

  constructor(userid: string, username: string, email: string, password: string) {
    this._userid = userid;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  get userid(): string {
    return this._userid;
  }

  set userid(value: string) {
    this._userid = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
