export class BaseEntity {
    id;
    getId() {
        return this.id;
    }
    setId(newId) {
        this.id = newId;
    }
}
