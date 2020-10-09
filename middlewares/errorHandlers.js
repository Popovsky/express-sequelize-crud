const {BaseError, UniqueConstraintError} = require('sequelize');

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
    if (err instanceof BaseError) {
        if (err instanceof UniqueConstraintError) {
            return res.status(400).send({
                data: null,
                errors: {
                    title: err.parent.detail,
                }
            });
        }
        return res.status(400).send({
            data: null,
            errors: err.errors.map(e => ({
                title: e.message,
            })),
        });
    }
    next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
    if (res.headerSent) {
        return;
    }
    res.status(err.status ?? 500).send({
        data: null,
        errors: [{
            title: err.message ?? err,
        }],
    });
}