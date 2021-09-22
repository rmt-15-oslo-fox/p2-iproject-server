const {
    Article,
    History
} = require('../models')

class ArticleController {

    static async getArticle(req, res, next) {
        try {
            const allArticle = await Article.findAll()
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

        const {
            userId
        } = req.user.id
        try {
            await History.create({
                userId: id,
                title: checkData.judul,
                description: `Article id ${id} with title ${checkData.judul} has been created`,
                updatedBy: userId
            })

            const createArticle = await Article.create({
                judul,
                isi,
                imageUrl_headline,
                imageUrl_content
            });

            res.status(200).json(createArticle);

        } catch (error) {
            next(error)
        }
    }
    static async deleteArticle(req, res, next) {
        const {
            id
        } = req.params
        const {
            userId
        } = req.user.id

        try {
            const checkData = await Article.findByPk(id)

            if (checkData) {
                await History.create({
                    userId: id,
                    title: checkData.judul,
                    description: `Article id ${id} with title ${checkData.judul} permanently deleted`,
                    updatedBy: userId
                })

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

        const userId = req.user.id

        try {
            const foundArticle = await Article.findByPk(id)

            if (foundArticle) {
                const updateArticle = await Article.update(judul, isi, imageUrl_headline, imageUrl_content, {
                    where: {
                        id
                    },
                    returning: true
                });

                const data = updateArticle[1][0]

                await History.create({
                    userId: id,
                    title: checkData.judul,
                    description: `Article id ${id} with title ${checkData.judul} updated`,
                    updatedBy: userId
                })

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