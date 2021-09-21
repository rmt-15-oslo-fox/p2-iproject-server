const FormData = require("form-data");
const { imgurApi } = require("../apis/axios");
const uploadUserAvatar = async (req, res, next) => {
  try {
    const formData = new FormData();
    const { name } = req.user_login;
    const filename = req.file.originalname;

    const image = req.file.buffer;
    formData.append("image", image.toString("base64"));

    const imageTitle = `${name} + ${filename}`;
    formData.append("title", imageTitle);

    const response = await imgurApi({
      method: "post",
      url: "/",
      headers: {
        ...formData.getHeaders(),
      },
      data: formData,
    });
    console.log(response, "<<<<<<<<<,");

    req.body.avatar_url = response.data.data.link;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = uploadUserAvatar;
