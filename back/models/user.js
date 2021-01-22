const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
class User extends Model {}
User.init(
  "User",
  {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    logoImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: flase,
    },
    //FreePosts,
    // FeedPosts,
    // StrudyPosts,
    // FreeComments,
    // FeedComments,
    // StrudyComments
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
