import {Column, DataType, HasMany, HasOne, Model, Table, Unique} from "sequelize-typescript";
import Tokens from "./tokens";
import Todo from "./todo";

@Table({tableName: 'users'})
export default class Users extends Model{
    @Unique(true)
    @Column(DataType.STRING)
    login!: string;

    @Column(DataType.STRING)
    password!: string;

    @HasOne(() => Tokens)
    token!: Tokens;

    @HasMany(() => Todo)
    todos!: Todo[];
}