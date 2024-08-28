const { model, isValidObjectId } = require("mongoose")
const User = require("../models/users.schema")


class userController {
    constructor(){}

    //userlarni olib kelish
    async getAllUsers(req, res){

        // userlarni allUsersga saqlash
        const allUsers = await User.find()

        // ma'lumotlarni yuborish
        res.send({
            message: "Success",
            results: allUsers.length,
            data: allUsers, 
        })
    }
    // Yangi user yaratish
    async createUser(req, res) {

        // Ma'lumotlarni o'zgaruvchilarga saqlash
        const {full_name, phone_number, password, email, image} = req.body;

        // User yaratish
        const newUser = new User({
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
    }

    // Userlarni yangilash
    async updateUser(req, res) {
        
        // Yangi ma'lumotlarni o'zgaruvchilarga saqlash
        const {full_name, phone_number, password, email, image} = req.body;

        // User idisin aniqlash
        const { userId } = req.params

        //User id to'gri ekanligin tekshirish
        if(!isValidObjectId(userId)){
            return res.status(404).send({message: 'iltimos obejct id jonating'}) 
        }

        // Userni topish
        const foundedUser = await User.findById(userId)

        // Userni tekshirish
        if(!foundedUser){
           return res.status(404).send({message: 'User topilmadi'})
        }

        await User.updateOne({_id: userId}, {
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
    }

    async deleteUser(req, res) {
        const { userId } = req.params;

        // User id to'g'ri ekanligini tekshirish
        if (!isValidObjectId(userId)) {
            return res.status(400).send({ message: 'Iltimos, ObjectId formatida jonating' });
        }

        // Userni o'chirish
        const deletedUser = await User.findByIdAndDelete(userId);

        // Userni tekshirish
        if (!deletedUser) {
            return res.status(404).send({ message: 'User topilmadi' });
        }

        // Ma'lumotlarni yuborish
        res.send({
            message: "User muvaffaqiyatli o'chirildi",
            data: deletedUser,
        });
    }   

}





module.exports = new userController()