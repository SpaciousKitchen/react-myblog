module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'feedcomment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // UserId
      //FeedBoardPosts
    },
    {},
  );
};
