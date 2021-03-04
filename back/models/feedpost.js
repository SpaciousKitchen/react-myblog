module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'feedpost',
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // UserId
      //FeedBoardComment
    },
    {},
  );
};
