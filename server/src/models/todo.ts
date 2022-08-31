import {AllowNull, Column, DataType, Default, ForeignKey, Model, Table} from "sequelize-typescript";
import Users from "./users";

@Table({tableName: 'todo'})
export default class Todo extends Model{
    @Default(false)
    @Column(DataType.BOOLEAN)
    isDone!: boolean;

    @AllowNull(false)
    @Column(DataType.STRING)
    body!: string;

    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    userId!: number;
}