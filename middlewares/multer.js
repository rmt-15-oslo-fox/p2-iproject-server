const multer = require('multer');

const memory = multer.memoryStorage();
const upload = multer({
    memory
});
const uploadImage = upload.single("imageUrl")

module.exports = uploadImage