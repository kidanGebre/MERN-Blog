const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');
const salt = bcrypt.genSaltSync(10);
const secret = "kidan22@grerbn$%!@"

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =  Math.round(Math.random() * 1000)
        cb(null, "user" + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/register', upload.single('file'),async (req, res) => {
    const { name, password, email } = req.body
    const {filename} = req.file
    try {
        const getUser = await User.findOne({ email })
        if (getUser) {
            return res.status(400).json({error:"The email is already exist!"})
        } else {
            const newUser = await User.create(
                {
                    name,
                    password: bcrypt.hashSync(password, salt),
                    email,
                    profile:filename
                })
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(500).json({error:"Internal Server error"})
    }
})

router.post('/login',async(req,res)=>{
    const { email, password } = req.body

    const getEmail = await User.findOne({ email })
    if(!getEmail) {
        return res.status(400).json({ error: "No user" })
    }
        if(!bcrypt.compareSync(password, getEmail.password)) {
            return res.status(400).json({ error: "wrong password" })
        }
    jwt.sign({
        id:getEmail._id,
        name: getEmail.name,
        email,
        profile: getEmail.profile,
        role: getEmail.role,
        createdAt: getEmail.createdAt,
        updatedAt: getEmail.updatedAt
    }, secret, {}, (error, info) => {
            if(error) {
                return res.status(202).json({error:"Authentication error"})
            }
            res.cookie("user",info).json("ok")
        })

})

//logout
router.post('/logout', async (req, res) => {
    res.cookie("user","").json('ok')
})

//get logged user
router.get("/loggedUser", (req, res) => {
    const { user } = req.cookies
    if(user) {
        jwt.verify(user, secret, {}, (error, user) => {
            if(error) {
                return res.status(400).json({ error: "Authentication error" })
            }
            res.status(200).json(user)
        })
    }
})

router.get('/', async (req, res) => {
    const getUser = await User.find({})
    if(!getUser) {
        return res.status(400).json({ error: "No user" })
    }
    res.status(200).json(getUser)
})


router.get('/:id', async (req, res) => {
    const { id } = req.params
    const getUser = await User.findOne({ _id: id })
    if(!getUser) {
        return res.status(400).json({ error: "No user" })
    }
    res.status(200).json(getUser)
})

//update

router.patch('/update/:id', upload.single('file'),async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body
    const { filename } = req.file
    console.log(id)
    try {
        const user = await User.findByIdAndUpdate(id, { name, email,profile:filename }, { new: true });
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }
})



module.exports = router