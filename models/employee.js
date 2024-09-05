module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      linkedinUrl: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true
        }
      }
    });
  
    return Employee;
  };
  