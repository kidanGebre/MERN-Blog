const router = require('express').Router()
const {Comment,Reply} = require('../model/Post')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Math.round(Math.random() * 1000)
        cb(null, "post" + uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage })


//create comment
router.post('/', async (req, res) => {
    const { author, post, comment } = req.body
    try {
        const newcomment = await Comment.create({ author, post, comment })
        if(!newcomment) {
            return res.status(400).json({error:"The comment system doesn't work now."})
        }
        res.status(200).json(newcomment)

    } catch (error) {
        res.status(500).json({error:"Internal server error!"})
    }
})
//get comment of one post

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const getcomment = await Comment.find({ post: id }).populate('author').sort({ createdAt: -1 })
        if(getcomment) {
            res.status(200).json(getcomment)
        } else {
            return res.status(404).json({error:"No comment"})
        }
    } catch (error) {
        res.status(500).json({error:"Internal server error"})
    }
})


//create reply for comment
router.post('/replycomment', async (req, res) => {
    const { author, reply, comment } = req.body    
    try {
        const newreply = await Reply.create({ author, reply, comment })
        if(!newreply) {
            return res.status(400).json({ error: "The reply system doesn't work now." })
        }
        res.status(200).json(newreply)
    } catch(error) {
        res.status(500).json({ error: "Internal server error!" })
    }
})

router.get('/reply/:id', async (req, res) => {
    const { id } = req.params
        const getreply = await Reply.find({ comment: id }).populate('author').sort({ createdAt: -1 })
        if(getreply) {
            res.status(200).json(getreply)
        } else {
            return res.status(404).json({ error: "No reply" })
        }
   
})
//******************************************TO_DELETE************************************************/

//comment delete
router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id,{new:true});
        res.status(200).json(comment);
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//reply delete
router.post("/reply/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const reply = await Reply.findByIdAndDelete(id, { new: true });
        res.status(200).json(reply);
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//************************************UPDATE_COMMENT AND UPDATE_REPLY **************************************/

// comment
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { newComment } = req.body;

    try {
        const updatedComment = await Comment.findOneAndUpdate({ post: id }, { comment:newComment }, { new: true });
        res.status(200).json(updatedComment);

    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

});


//reply
router.put("/reply/update/:id", async (req, res) => {
    const { id } = req.params;
    const { newReply } = req.body;
    try {
        const updatedReply = await Reply.findOneAndUpdate({ comment:id}, { reply:newReply }, { new: true });
        res.status(200).json(updatedReply);
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

});


//************************************LIKE_COMMENT AND LIKE_REPLY **************************************/

//like comment
router.put('/like/:id', async (req, res) => {
    const { userId } = req.body
    const { id } = req.params

    const getpost = await Comment.findById(id)

    if(getpost) {
        const liked = getpost.like.includes(userId)
        if(liked) {
            const post = await Comment.findOneAndUpdate(
                {
                    _id: id
                },
                { $pull: { like: userId } },
                { new: true }
            )
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ error: "This comment is not found" })
            }
        } else {
            const post = await Comment.findOneAndUpdate(
                { _id: id },
                { $push: { like: userId } },
                { new: true }
            )
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ error: "This comment is not found" })
            }
        }

    } else {
        res.status(404).json({ error: "The comment does not exist" })
    }
})


module.exports = router