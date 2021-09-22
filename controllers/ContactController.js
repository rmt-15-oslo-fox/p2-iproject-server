const {
    Contact
} = require('../models')

class ContactController {

    static async getContact(req, res, next) {
        try {
            const allContact = await Contact.findAll()
            if (allContact) {
                res.status(200).json(allContact)
            } else {
                next({
                    name: "NotFound",
                    message: "Contact not found"
                })
            }
        } catch (error) {
            next(error)
        }
    }
    static async postContact(req, res, next) {
        const {
            name,
            email,
            perusahaan,
            topik,
            pesan
        } = req.body

        try {
            const contact = await Contact.create({
                name,
                email,
                perusahaan,
                topik,
                pesan
            })

            res.status(200).json(contact);
        } catch (error) {
            next(error)
        }
    }
    static async deleteContact(req, res, next) {
        const {
            id
        } = req.params;

        try {
            const checkData = await Contact.findByPk(id)

            if (checkData) {
                await Contact.destroy({
                    where: {
                        id
                    },
                    returning: true
                })

                res.status(200).json({
                    message: `Contact id ${id} has been deleted`
                })
            } else {
                next({
                    name: "NotFound",
                    message: `Contact not found`
                })
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ContactController