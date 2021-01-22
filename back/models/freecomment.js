const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
class FreeComment extends Model {}
FreeComment.init(
  {
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
    //FreeBoardPosts
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "FreeComment", // We need to choose the model name
  }
);

// `sequelize.define` also returns the model
console.log(FreeComment === sequelize.models.FreeComment); // true
