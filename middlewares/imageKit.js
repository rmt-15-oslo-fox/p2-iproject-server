const axios = require("axios")
const FormData = require('form-data');

imageKit = async (req, res, next) => {
  // console.log(req.file); // !Data penting
  if (!req.file) {
    next()
  } else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") {
    next({
      name: "InvalidImageFormat"
    })
  } else if (req.file.size >= 261120) {
    next({
      name: "InvalidImageSize"
    })
  } else {
    try {
      const newForm = new FormData()
      const encodedFile = req.file.buffer.toString("base64")
      // console.log(encodedFile);
      newForm.append("file", encodedFile)
      newForm.append("fileName", req.file.originalname)
      // console.log(newForm); 
      const imageKitPrivateKey = Buffer.from(process.env.imageKitPrivate + ":").toString("base64") //!Private Key from imageKit
      // console.log(imageKitPrivateKey);
      const result = await axios({
        method: "POST",
        url: "https://upload.imagekit.io/api/v1/files/upload",
        data: newForm,
        headers: {
          ...newForm.getHeaders(),
          Authorization: `Basic ${imageKitPrivateKey}`
        }
      })
      // console.log(result) // !Yang diambil cuma key data
      if (!result) {
        throw ({
          name: "NOTFOUND_AXIOS",
          message: "Error not found"
        })
      } else {
        req.body.imageUrl = result.data.url
        next()
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = imageKit
