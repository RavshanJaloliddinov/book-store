const { model, isValidObjectId } = require("mongoose")
const User = require("../models/users.schema")


class userController {

    #_userModel
    constructor(){
        this.#_userModel = User
    }

    //Userlarni olib kelish
    getAllUsers = async (req, res) => {
        try {

        // userlarni allUsersga saqlash
        const allUsers = await this.#_userModel.find()

        // ma'lumotlarni yuborish
        res.send({
            message: "Success",
            results: allUsers.length,
            data: allUsers, 
        })     
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }

    }
    // Yangi user yaratish
    createUser = async (req, res) => {
        try {
            // Ma'lumotlarni o'zgaruvchilarga saqlash
            const {full_name, phone_number, password, email, image} = req.body;

            // User yaratish
            const newUser =  this.#_userModel.create({
                full_name,
                phone: phone_number,
                password,
                email,
                image,
                created_date: Date.now()
            })

            // Userni saqlash
            await newUser.save()

            // Ma'lumotlarni yuborish
            res.status(201).send({
                message: "success",
                data: newUser
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }

    }

    // Userlarni yangilash
    updateUser = async (req, res) => {
        try {
            // Yangi ma'lumotlarni o'zgaruvchilarga saqlash
            const {full_name, phone_number, password, email, image} = req.body;

            // User idisin aniqlash
            const { userId } = req.params

            //User id to'gri ekanligin tekshirish
            this.#_chekObjectId(userId)

            // Userni topish
            const foundedUser = await this.#_userModel.findById(userId)

            // Userni tekshirish
            if(!foundedUser){
               return res.status(404).send({message: 'User topilmadi'})
            }
            // Userni databasedan yangilash
            await User.findByIdAndUpdate(
                userId,
            {
                $set: {
                    full_name,
                    phone: phone_number,
                    password,
                    email,
                    image,
                    created_date: Date.now()
                }
            })

            res.send({
                message: "Succes",
                data: foundedUser
            })        
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }

    // Userlarni o'chirish
    deleteUser = async (req, res) => {
        try {
            const { userId } = req.params;

            // User id to'g'ri ekanligini tekshirish
            this.#_chekObjectId(userId)
    
            // Userlarni databasedan o'chirish
            const deletedUser = await this.#_userModel.findByIdAndDelete(userId);
    
            // Userni tekshirish
            if (!deletedUser) {
                return res.status(404).send({ message: 'User topilmadi' });
            }
    
            // Ma'lumotlarni yuborish
            res.send({
                message: "User muvaffaqiyatli o'chirildi",
                data: deletedUser,
            });

        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    } 
    
    // Obejct id to'gri ekanligini tekshiruvchi funktsiya     
    #_chekObjectId = (id) => {
        if(!isValidObjectId(id)) {
            throw new Error(`Id: ${id} is not a valid object`)
        }
        return null;
    }
}





module.exports = new userController()