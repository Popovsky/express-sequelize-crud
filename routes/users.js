const {Router} = require('express');
const UserController = require('./../controllers/user');

const usersRouter = Router();

usersRouter.post('/', UserController.create);
usersRouter.get('/', UserController.getUsers);
usersRouter.route('/:userId')
    .get(UserController.getById)
    .patch(UserController.updateById)
    .delete(UserController.deleteById);

module.exports = usersRouter;
