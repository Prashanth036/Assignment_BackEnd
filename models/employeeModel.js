'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const { isEmail, isLength, trim, escape } = require('validator');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    // Method to validate password
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  Employee.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name cannot be empty"
        },
        isAlpha: {
          msg: "First name can only contain letters"
        },
        len: {
          args: [2, 50],
          msg: "First name should be between 2 and 50 characters"
        }
      },
      set(value) {
        this.setDataValue('firstName', escape(trim(value)));
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name cannot be empty"
        },
        isAlpha: {
          msg: "Last name can only contain letters"
        },
        len: {
          args: [2, 50],
          msg: "Last name should be between 2 and 50 characters"
        }
      },
      set(value) {
        this.setDataValue('lastName', escape(trim(value)));
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email address already in use"
      },
      validate: {
        isEmail: {
          msg: "Must be a valid email address"
        }
      },
      set(value) {
        this.setDataValue('email', escape(trim(value)));
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty"
        },
        isLength: {
          args: [8, 100],
          msg: "Password should be between 8 and 100 characters"
        }
      },
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username already in use"
      },
      validate: {
        notEmpty: {
          msg: "Username cannot be empty"
        },
        len: {
          args: [2, 50],
          msg: "Username should be between 2 and 50 characters"
        }
      },
      set(value) {
        this.setDataValue('userName', escape(trim(value)));
      }
    }
  }, {
    sequelize,
    modelName: 'Employee',
    hooks: {
      beforeCreate: (employee) => {
        employee.firstName = trim(escape(employee.firstName));
        employee.lastName = trim(escape(employee.lastName));
        employee.email = trim(escape(employee.email));
        employee.userName = trim(escape(employee.userName));
      },
      beforeUpdate: (employee) => {
        employee.firstName = trim(escape(employee.firstName));
        employee.lastName = trim(escape(employee.lastName));
        employee.email = trim(escape(employee.email));
        employee.userName = trim(escape(employee.userName));
      }
    }
  });

  return Employee;
};
