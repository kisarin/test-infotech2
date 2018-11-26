export class PeopleRequest {
  public id: number;
  public date: string;
  public type: number;
  public description: string;
  public userId: number;

  constructor(id: number, date: string, type: number, description: string, userId: number) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.description = description;
    this.userId = userId;
  }
}