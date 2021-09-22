const { Router } = require("express");
const CartController = require("../controllers/cartController");
const authenticationUser = require("../middleware/authenticationUser");
const cartRouter = Router();

cartRouter.use(authenticationUser);
cartRouter.get("/", CartController.getCartByUserLoggedIn);
cartRouter.delete("/:id", CartController.deleteCartById);
cartRouter.post("/", CartController.createNewItem);
cartRouter.delete("/", CartController.clearCart);

module.exports = cartRouter;
