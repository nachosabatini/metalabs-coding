import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Note from "./Note";

export enum UserRole {
  Admin = "admin",
  User = "user",
}

interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  email: string;
  role: UserRole;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id?: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public role!: UserRole;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly notes?: Note[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(UserRole.Admin, UserRole.User),
      allowNull: false,
      defaultValue: UserRole.User,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

User.hasMany(Note, { as: "notes", foreignKey: "userId" });

export default User;
