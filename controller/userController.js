class UserController {
    static async login(req, res, next){
        next('ok')
    }
}

module.exports = UserController