module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'freecomment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // UserId
      //FreeBoardPosts
    },
    {},
  );
};
