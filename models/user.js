'use strict';
const {Model} = require('sequelize');
const {isAfter} = require('date-fns');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    User.init({
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
            }
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notNull: true,
            }
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
                checkDate(v) {
                    if(isAfter(new Date(v), new Date())) {
                        throw new Error(`Value "${v}" can't be valid birthday`);
                    }
                },
            }
        },
        isMale: {
            field: 'is_male',
            type: DataTypes.BOOLEAN,
        },
        password: {
            field: 'password_hash',
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
    });
    return User;
};