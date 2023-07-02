import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

interface NoteAttributes {
  id?: number;
  title: string;
  content: string;
  userId: number;
}

class Note extends Model<NoteAttributes> implements NoteAttributes {
  public id?: number;
  public title!: string;
  public content!: string;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly user?: User;
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "notes",
    sequelize,
  }
);

export default Note;
