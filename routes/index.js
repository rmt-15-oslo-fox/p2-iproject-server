const router = require('express').Router();
const {User} = require('../models')
const { verify } = require('../helpers/jwt');
const cache = require('../middlewares/cache')
const errorHandler = require('../middlewares/errorHandler');
const UserController = require('../controllers/userController')
const NewsController = require('../controllers/homePageController')
const TableController = require('../controllers/tableController')
const ClubController = require('../controllers/clubController')

router.post('/login', UserController.login);
router.post('/user/register', UserController.register);
router.get('/news', NewsController.getNews)
router.get('/tables', cache(10000), TableController.getAll)
router.get('/clubs', ClubController.getAll)

const authentication = async (req, res, next) => {
    // ambil si token
    // ada di header dengan nama acces_token                
    const token = req.headers.acces_token

    // convert token jadi payload
    try {
        const payload = verify(token);
        const foundUser = await User.findOne({
            where: {
                id: payload.id,
                email: payload.email
            }
        });

        if(!foundUser) {h
            throw new Error("User not found")
        }
        req.user = {
            id: foundUser.id,
            email: foundUser.email,
            addres: foundUser.addres,
            role: foundUser.role
        }
        next()
    } catch (err) {
        if(err.message === "User not found") {
            res.status(401).json( { msg: "Invalid JWT Token" } )
        }
        res.status(401).json( { msg: "Somethong wicked happened" } )
    }
    // validasi
};

router.use(authentication);
router.use(errorHandler);
module.exports = router;