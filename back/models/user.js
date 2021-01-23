const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      loginId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
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
        allowNull: false,
      },
      //FreePosts,
      // FeedPosts,
      // StrudyPosts,
      // FreeComments,
      // FeedComments,
      // StrudyComments
    },
    {}
  );
};
