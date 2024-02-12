const router = require('express').Router()
const {Post} = require('../model/Post')

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

router.post("/create", upload.single('file'), async (req, res) => {
    const { title, summary, content ,author,catagory} = req.body
    const { filename } = req.file
    
    const createPost = await Post.create({ title, summary, content, cover:filename ,author,catagory})
    res.status(200).json(createPost)
})

//get all
router.get('/', async (req, res) => {
    const getPosts = await Post.find({}).populate('author',['name'])
    if (!getPosts) {
        return res.status(404).json({error:"Not found"})
    }
    res.status(200).json(getPosts)
})


//get only 4
router.get('/four', async (req, res) => {

    const getPosts = await Post.find({}).populate('author', [ 'name' ]).sort({ createdAt: -1 }).limit(4)
    if(!getPosts) {
        return res.status(404).json({ error: "Not found" })
    }
    res.status(200).json(getPosts)
})

//one with many view from culture
router.get('/oneviewculture', async (req, res) => {

    const getPosts = await Post.find({catagory:"Culture"}).populate('author', [ 'name' ]).sort({ view: -1 }).limit(1)
    if(!getPosts) {
        return res.status(404).json({ error: "Not found" })
    }
    res.status(200).json(getPosts)
})

//one with many view from news
router.get('/oneviewnews', async (req, res) => {

    const getPosts = await Post.find({ catagory: "News" }).populate('author', [ 'name' ]).sort({ view: -1 }).limit(1)
    if(!getPosts) {
        return res.status(404).json({ error: "Not found" })
    }
    res.status(200).json(getPosts)
})

//one with many view from history
router.get('/oneviewhistory', async (req, res) => {

    const getPosts = await Post.find({ catagory: "History" }).populate('author', [ 'name' ]).sort({ view: -1 }).limit(1)
    if(!getPosts) {
        return res.status(404).json({ error: "Not found" })
    }
    res.status(200).json(getPosts)
})

//one with many view from fact
router.get('/oneviewfact', async (req, res) => {

    const getPosts = await Post.find({ catagory: "Fact" }).populate('author', [ 'name' ]).sort({ view: -1 }).limit(1)
    if(!getPosts) {
        return res.status(404).json({ error: "Not found" })
    }
    res.status(200).json(getPosts)
})
//one with many view from science
router.get('/oneviewscience', async (req, res) => {

    const getPosts = await Post.find({ catagory: "Science" }).populate('author', [ 'name' ]).sort({ view: -1 }).limit(1)
    if(!getPosts) {
        return res.status(404).json({ error: "Not found" })
    }
    res.status(200).json(getPosts)
})


//five with many view from all
router.get('/fiveview', async (req, res) => {
    try {
        const getPosts = await Post.find({}).populate('author', [ 'name' ]).sort({ view: -1 }).limit(5)
        if(!getPosts) {
            return res.status(404).json({ error: "Not found" })
        }
        res.status(200).json(getPosts)
    
    } catch(error) {
        res.status(500).json({ error: "error.message" })
    }
    
})

// get from histroy catagory and with mabt view


//get one by Id
router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const getOne = await Post.findById(id).populate("author")
        if(getOne) {           
            getOne.view++;
            await getOne.save();
            res.status(200).json(getOne)
        } else {
            res.status(404).json({ error: "The post does not exist" })
        }


    } catch(error) {
        res.status(500).json({ error: "Internal Server error" })
    }
})

router.put('/like/:id', async (req, res) => {
    const { userId } = req.body
    const {id} = req.params
        
    const getpost = await Post.findById(id)

    if(getpost) {
        const liked = getpost.like.includes(userId)
        if(liked) {
            const post = await Post.findOneAndUpdate(
                {
                    _id: id
                },
                { $pull: { like: userId } },
                { new: true }
            )
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ error: "This post is not found" })
            }
        } else {
            const post = await Post.findOneAndUpdate(
                { _id: id },
                { $push: { like: userId } },
                { new: true }
            )
            if(post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ error: "uThis post is not found" })
            }
        }

    } else {
        res.status(404).json({error:"The post does not exist"})
    } 
})

router.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // Find the post by ID and delete it
        await Post.findByIdAndDelete(id);
        res.status(200).json( "Post deleted successfully");
    } catch(error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /post/update/:id
router.post("/update/:id", upload.single('file'), async (req, res) => {
    const { id } = req.params;
    const { title, summary, content, catagory } = req.body;
    
    if(req.file) {
        const { filename } = req.file
        try {
            // Find the post by ID and update it with the new data
            const updatedPost = await Post.findByIdAndUpdate(id, { title, content, summary, cover: filename, catagory }, { new: true });
            res.status(200).json(updatedPost);
        } catch(error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        try {
            // Find the post by ID and update it with the new data
            const updatedPost = await Post.findByIdAndUpdate(id, { title, content, summary, catagory }, { new: true });
            res.status(200).json(updatedPost);
        } catch(error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
});




module.exports = router