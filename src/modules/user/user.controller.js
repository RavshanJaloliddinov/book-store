const { model, isValidObjectId } = require("mongoose");
const User = require("./users.schema");
const ApiFeature = require("../../utils/api-featuries.utils");
const fs = require('fs');
const path = require('path');

class userController {

    #_userModel
    constructor(){
        this.#_userModel = User
    }
    
    //Userlarni olib kelish
    getAllUsers = async (req, res, next) => {
        try {

        let query = { ...req.query };      

        // userlarni allUsersga saqlash
        const allUsers = await new ApiFeature(
            this.#_userModel.find(),
            query
        )
        .limitFields()
        .paginate()
        .sort("created_date")
        .filter()
        .getQuery()

        // ma'lumotlarni yuborish
        res.send({
            message: "Success",
            results: allUsers.length,
            data: allUsers, 
        })     
        } catch (error) {
            next(error)
        }

    }
    createUserByAdmin = async (req, res, next) => {
        try {
            const {email, role, full_name} = req.body

            const newUser = await this.#_userModel.create({
                email,
                role, 
                full_name
            })
            return res.status(201).send({
                message: "success",
                data: newUser
            });
        } catch (error) {
            next(error)
        }
    }

    createUserByUser = async (req, res, next) => {
        try {
            const { email } = req.body;    
            // User yaratish
            const newUser = await this.#_userModel.create({
                email
            });
    
            // Ma'lumotlarni yuborish
            return res.status(201).send({
                message: "success",
                data: newUser
            });
        } catch (error) {
            next(error)
        }
    };
    
    updateUser = async (req, res, next) => {
        try {
            const { full_name, phone_number, email } = req.body;
            const { userId } = req.params;
    
            // Fayl bo'lsa, uning nomini olish
            const newImage = req.file ? req.file.filename : null;
    
            // User id to'g'ri ekanligini tekshirish
            this.#_chekObjectId(userId);

    
            // Userni tekshirish
            if (!foundedUser) {
                return res.status(404).send({ message: 'User topilmadi' });
            }
    
            // Eski rasmni o'chirish (agar bo'lsa)
            if (foundedUser.image && newImage && foundedUser.image !== newImage) {

                const oldImagePath = path.join(process.cwd(), '/uploads', foundedUser.image)

                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Rasmni o\'chirishda xato:', err);
                    }
                });
            }
    
            // Userni databasedan yangilash
            const updatedUser = await this.#_userModel.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        full_name,
                        phone: phone_number,
                        email,
                        image: newImage, // Yangilangan rasm nomi
                    }
                },
                { new: false } 
            );
    
            res.send({
                message: "Success",
                data: updatedUser
            });
    
        } catch (error) {
            next(error);
        }
    };
    
    

    // Userlarni o'chirish
    deleteUser = async (req, res, next) => {
        try {
            const { userId } = req.params;
    
            // User id to'g'ri ekanligini tekshirish
            this.#_chekObjectId(userId);
    
            // Userni topish
            const deletedUser = await this.#_userModel.findByIdAndDelete(userId);
            
            // Userni tekshirish
            if (!deletedUser) {
                return res.status(404).send({ message: 'User topilmadi' });
            }
    
            // Eski rasmni o'chirish (agar bo'lsa)
            if (deletedUser.image) {
                const imagePath = path.join(process.cwd(), '/uploads', deletedUser.image);
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Rasmni o\'chirishda xato:', err);
                    }
                });
            }
    
            // Ma'lumotlarni yuborish
            res.send({
                message: "User muvaffaqiyatli o'chirildi",
                data: deletedUser,
            });
    
        } catch (error) {
            next(error);
        }
    };
    
    // Obejct id to'gri ekanligini tekshiruvchi funktsiya     
    #_chekObjectId = (id) => {
        if(!isValidObjectId(id)) {
            throw new Error(`Id: ${id} is not a valid object`)
        }
        return null;
    }
}





module.exports = new userController()