const { User, Demo } = require('../models')

class DemoController {
  // show current user demo portofolio
  static async showDemoPortofolio(req, res, next) {
    const userId = req.user.id
    try {
      const result = await Demo.findAll({where: {userId}})
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
  // add stock to current user demo (buy)
  static async buyStock(req, res, next) {
    const { id, balance } = req.user.balance
    const { stockName, boughtPrice, currentPrice, quantity, region } = req.body
    
    let totalCost = boughtPrice * quantity
    if(balance < totalCost) {
      res.status(403).json({message: 'Insufficient balance amount'})
    } else {
      const foundDemo = await Demo.findOne({
        where: {
          userId: id,
          stockName: stockName
        }
      })
      if(!foundDemo) {
        try {
          const addedDemo = await Demo.create({
            userId: id,
            stockName,
            boughtPrice,
            currentPrice,
            quantity,
            region
          })
          let newBalance = {
            balance: (boughtPrice * quantity) - balance
          }
          const updateUserBalance  = await User.update(newBalance, {where:{id}})
          res.status(201).json(addedDemo)
        } catch (error) {
          res.status(500).json({message: 'Internal server error'})
        }
      } else {
        try {
          let newQuantity = {
            quantity: foundStock.quantity + quantity
          }
          let newBalance = {
            balance: (boughtPrice * quantity) - balance
          }
          const updatedPortofolio = await Demo.update(newQuantity, {
            where: {
              userId: foundDemo.id,
              stockName: stockName
            }
          })
          const updateUserBalance  = await User.update(newBalance, {where:{id}})
          res.status(200).json(updatedPortofolio)
        } catch (error) {
          res.status(500).json({message: 'Internal server error'})
        }
      }
    }
  }
  // update current user demo portofolio (sell partially)
  static async sellStock(req, res, next) {
    const { id, balance } = req.user.balance
    const { quantity, stockName } = req.body // qty to sell
    const demoId = req.params.id

    try {
      const foundDemo = Demo.findByPk(demoId)
      if(!foundDemo) {
        res.status(404).json({message: 'Not Found'})
      }
      if(foundDemo.quantity >= quantity) {
        let newQuantity = {
          quantity: foundStock.quantity - quantity
        }
        let newBalance = {
          balance: (currentPrice * quantity) + balance
        }
        if(newQuantity.quantity === 0) {
          const deletedPortofolio = await Demo.destroy({where: {
            id: foundDemo.id
          }})
          const updateUserBalance  = await User.update(newBalance, {where:{id}})
          res.status(200).json({message: `Successfully sold entire ${stockName} stock`})
        } else {
          const updatedPortofolio = await Demo.update(newQuantity, {
            where: {
              userId: foundDemo.id,
              stockName: stockName
            }
          })
          const updateUserBalance  = await User.update(newBalance, {where:{id}})
          res.status(200).json(updatedPortofolio)
        }
      } else {
        res.status(403).json({message: 'Insufficient stock quantity'})
      }
    } catch (error) {
      res.status(500).json({message: 'Internal server error'})
    }
  }
}

module.exports = DemoController