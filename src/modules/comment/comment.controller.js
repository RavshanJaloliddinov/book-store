const { model, isValidObjectId } = require("mongoose")
const Comment = require("./comment.schema")
const ApiFeature = require("../../utils/api-featuries.utils")

class CommentController {

    #_commentModel
    constructor(){
        this.#_commentModel = Comment
    }

    //Commentlarni olib kelish
    getAllComments = async (req, res) => {
        try {

        let query = { ...req.query };
        
        const allComments = await new ApiFeature(
            this.#_commentModel.find(),
            query
        )
        // .limitFields()
        .paginate()
        .sort("created_date")
        .filter()
        .getQuery()



        // Ma'lumotlarni yuborish
        res.send({
            message: "Success",
            page: req.query?.page || 1,
            limit: req.query?.limit || 10,
            results: allComments.length,
            data: allComments
        })     
        } catch (error) {
            next(error)
        }

    }
    // Yangi user yaratish
    createComment = async (req, res) => {
        try {
            // Ma'lumotlarni o'zgaruvchilarga saqlash
            const {book_id, user_id, comment, role} = req.body;

            // User yaratish
            const newUser =  this.#_commentModel.create({
                book_id,
                user_id,
                comment,
                role,
                created_date: Date.now()
            })


            // Ma'lumotlarni yuborish
            res.status(201).send({
                message: "success",
                data: newUser
            })
        } catch (error) {
            next(error)
        }

    }

    // Userlarni yangilash
    updateComment = async (req, res) => {
        try {
            // Yangi ma'lumotlarni o'zgaruvchilarga saqlash
            const {book_id, user_id, comment, created_date} = req.body;

            // User idisin aniqlash
            const { commentId } = req.params

            //User id to'gri ekanligin tekshirish
            this.#_chekObjectId(commentId)

            // Userni topish
            const foundedUser = await this.#_commentModel.findById(commentId)

            // Userni tekshirish
            if(!foundedUser){
               return res.status(404).send({message: 'User topilmadi'})
            }
            // Userni databasedan yangilash
            await User.findByIdAndUpdate(
                commentId,
            {
                $set: {
                    book_id,
                    user_id,
                    role,
                    comment,
                    created_date,
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
    deleteComment = async (req, res) => {
        try {
            const { commentId } = req.params;

            // User id to'g'ri ekanligini tekshirish
            this.#_chekObjectId(commentId)
    
            // Userlarni databasedan o'chirish
            const deletedUser = await this.#_commentModel.findByIdAndDelete(commentId).limitFields();
    
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





module.exports = new CommentController()