const {
    Article,
    History
} = require('../models')

class ArticleController {

    static async getArticle(req, res, next) {
        try {
            const allArticle = await Article.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            if (allArticle) {
                res.status(200).json(allArticle)
            } else {
                next({
                    name: "NotFound",
                    message: "No article in the list"
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async postArticle(req, res, next) {
        const {
            judul,
            isi,
            imageUrl_headline,
            imageUrl_content
        } = req.body;

        try {
            const createArticle = await Article.create({
                judul,
                isi,
                imageUrl_headline,
                imageUrl_content
            });

            console.log(createArticle.dataValues);

            if (createArticle) {
                res.status(200).json(createArticle);
            } else {
                next({
                    name: "SequelizeValidationError"
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async deleteArticle(req, res, next) {
        const {
            id
        } = req.params

        try {
            const checkData = await Article.findByPk(id)

            if (checkData) {

                await Article.destroy({
                    where: {
                        id
                    }
                })

                res.status(200).json({
                    message: `Job id ${id} success deleted`
                })
            } else {
                next({
                    name: "NotFound",
                    message: `Article id ${id} not found`
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async putArticle(req, res, next) {
        const {
            id
        } = req.params

        const {
            judul,
            isi,
            imageUrl_headline,
            imageUrl_content
        } = req.body;

        try {
            const foundArticle = await Article.findByPk(id)

            if (foundArticle.dataValues) {
                const updateArticle = await Article.update({
                    judul,
                    isi,
                    imageUrl_headline,
                    imageUrl_content
                }, {
                    where: {
                        id
                    },
                    returning: true
                });

                const data = updateArticle[1][0]

                res.status(200).json(data)
            } else {
                next({
                    name: "NotFound",
                    message: `Article id ${id} not found`
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ArticleController