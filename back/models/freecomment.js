module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'freecomment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      // UserId
      //FreeBoardPosts
    },
    {},
  );
};
