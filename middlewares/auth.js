const { verify } = require('../helpers/jwt')
const { User, Demo } = require('../models')

const authentication = async (req, res, next) => {
  const token = req.headers.access_token
  try {
    const userData = verify(token)
    const id = userData.id
    const foundUser = await User.findByPk(id)
    if(!foundUser) {
      res.status(401).json({message: 'Authentication failed'})
    } else {
      req.user = {
        id: foundUser.id,
        email: foundUser.email,
        balance: foundUser.balance
      }
      next()
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'})
  }
}

const authorization = async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const foundDemo = await Demo.findByPk(id)
    if(!foundDemo) {
      res.status(403).json({message: 'You are not authorized'})
    } else {
      if(foundDemo.userId === req.user.id) {
        next()
      } else {
        res.status(403).json({message: 'You are not authorized'})
      }
    }
  } catch (error) {
    res.status(500).json({message: 'Internal server error'})
  }
}

module.exports = { authentication, authorization }