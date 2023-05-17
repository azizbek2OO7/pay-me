export class BaseEntity {
  private id: number;

  getId() {
    return this.id;
  }

  setId(newId: number) {
    this.id = newId;
  }
}
