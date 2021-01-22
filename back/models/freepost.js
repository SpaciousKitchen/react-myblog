const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
class FreePost extends Model {}
FreePost.init(
  {
    // Model attributes are defined here
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: new Date(),
      allowNull: false,
    },
    views: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    // UserId
    //FreeBoardComment
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "FreePost", // We need to choose the model name
  }
);

// `sequelize.define` also returns the model
console.log(FreePost === sequelize.models.FreePost); // true
