import Users from "../models/users";

module.exports = class UserDto {
    id!: number
    login!: string

    constructor(user: Users) {
        this.id = user.id;
        this.login = user.login;
    }
}