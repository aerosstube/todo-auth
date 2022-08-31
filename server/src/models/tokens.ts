import {AllowNull, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import Users from "./users";

@Table({tableName: 'tokens'})
export default class Tokens extends Model{
    @AllowNull(false)
    @Column(DataType.STRING)
    refreshToken!: string;

    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    userId!: number;
}