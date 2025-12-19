const { adminLoginPage, adminLogin, adminLogout, userLoginPage, userLogin, userLogout, userRegisterPage, userRegister } = require('../controllers/auth')

const router = require('express').Router()

router
    .route('/login/admin')
    .post(adminLogin)

router
    .route('/logout/admin')
    .post(adminLogout)

//userRoutes

router
    .route('/register/user')
    .post(userRegister)

router
    .route('/login/user')
    .post(userLogin)

router
    .route('/logout/user')
    .post(userLogout)

module.exports = router