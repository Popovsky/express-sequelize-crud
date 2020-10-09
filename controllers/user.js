const {User} = require('./../models');
const _ = require('lodash');

module.exports.create = async (req, res, next) => {
    const {body} = req;
    try {
        const createdUser = await User.create(body);
        const userData = createdUser.get(); // JS Object
        const preparedUser = _.omit(userData, ['password', 'createdAt', 'updatedAt']);
        res.status(201).send({
            data: preparedUser,
        });
    } catch (err) {
        next(err);
    }
};
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt'],
            },
        });
        res.send({
            data: users,
        });
    } catch (err) {
        next(err);
    }
};
module.exports.getById = async (req, res, next) => {
    const {params: {userId}} = req;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            res.send({
                data: user,
            });
        } else {
            res.status(404).send({
                data: null,
                errors: [{
                    title: `User with id ${userId} not found!`,
                }],
            });
        }
        next();
    } catch (err) {
        res.status(err.status ?? 500).send({
            data: null,
            errors: [{
                title: err.message ?? err,
            }],
        });
    }
};
module.exports.updateById = async (req, res, next) => {
    const {
        params: {userId},
        body,
    } = req;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            const updatedUser = await user.update(body);
            res.send({
                data: updatedUser,
            });
        } else {
            res.status(404).send({
                data: null,
                errors: [{
                    title: `User with id ${userId} not found!`,
                }],
            });
        }
    } catch (err) {
        res.status(err.status ?? 500).send({
            data: null,
            errors: [{
                title: err.message ?? err,
            }],
        });
    }
};
module.exports.deleteById = async (req, res, next) => {
    const {params: {userId}} = req;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            res.send({
                data: user,
            });
        } else {
            res.status(404).send({
                data: null,
                errors: [{
                    title: `User with id ${userId} not found!`,
                }],
            });
        }
    } catch (err) {
        res.status(err.status ?? 500).send({
            data: null,
            errors: [{
                title: err.message ?? err,
            }],
        });
    }
};
