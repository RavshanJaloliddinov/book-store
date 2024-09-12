const { model, isValidObjectId } = require("mongoose")
const User = require("./users.schema")
const ApiFeature = require("../../utils/api-featuries.utils")
const { createUserSchema } = require("./dtos/user-create.dto")

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

    // Yangi user yaratish
    createUser = async (req, res, next) => {
        try {
        const { full_name, phone, email, image, role } = req.body;

        // User yaratish
        const newUser = await this.#_userModel.create({
            full_name,
            phone,
            email,
            image,
            role,
        });

        // Ma'lumotlarni yuborish
        return res.status(201).send({
            message: "success",
            data: newUser
        });

        } catch (error) {
            next(error)
        }

    }

    // Userlarni yangilash
    updateUser = async (req, res, next) => {
        try {
            // Yangi ma'lumotlarni o'zgaruvchilarga saqlash
            const {full_name, phone_number, email, image} = req.body;

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
            next(error)
        }
    }

    // Userlarni o'chirish
    deleteUser = async (req, res, next) => {
        try {
            const { userId } = req.params;

            // User id to'g'ri ekanligini tekshirish
            this.#_chekObjectId(userId)
    
            // Userlarni databasedan o'chirish
            const deletedUser = await this.#_userModel.findByIdAndDelete(userId).limitFields();
    
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
            next(error)
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