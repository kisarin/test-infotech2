export class User {
  id: number;
  username: string;
  tokenId: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(id: number, username: string, tokenId: string, email: string, firstName: string,lastName: string) {
    this.id = id;
    this.username = username;
    this.tokenId = tokenId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

