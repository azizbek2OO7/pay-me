import { User } from "../entities/user";

export class UserRepository {
  private list: User[] = [];
  private counterID = 0;

  add(...newUsers: User[]) {
    for (let newUser of newUsers) {
      if (this.isExist(newUser.phoneNumber)) {
        throw new Error(`This user(${newUser.phoneNumber}) already exist`);
      }

      newUser.setId(++this.counterID);
      this.list.push(newUser);
    }
  }

  isExist(phoneNumber: string) {
    for (let user of this.list) {
      if (user.phoneNumber === phoneNumber) return true;
    }

    return false;
  }

  getById(userID: number) {
    for (let user of this.list) {
      if (user.getId() === userID) return user;
    }

    throw new Error(`❌ This user(${userID}) not found`);
  }

  getUserByPhoneNumber(phoneNumber: string) {
    const user = this.getList().find((user) => user.phoneNumber === phoneNumber); // check if get Error!
    if (user) return user;

    throw new Error("User not found");
  }

  getList() {
    return this.list;
  }
}
