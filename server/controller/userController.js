const CryptoJS = require("crypto-js");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

//Register
async function register(req, res) {
    try {
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
            role: req.body.role,
        })
        const user = await newUser.save();
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json(error);

    }
};

//Login
async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(401).json("wrong email address");
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
            res.status(401).json("incorrect password");

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: "1d" },
        )

        const { password, ...info } = user._doc
        res.status(200).json({ info, accessToken });
    } catch (error) {
        res.status(500).json(error);
    }

};

//Get All User
async function getusers(req, res) {
    if (req.user.role) {
        try {
            const user = await User.find();
            res.status(201).json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You are not allowed to see all users!")
    }
};

//Get User by ID
async function getUser(req, res) {
    if (req.params.id === req.user.id) {
        try {
            const user = await User.findById(req.params.id)
            res.status(201).json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("User does not exist")
    }
};


//Update User
async function updateUser(req, res) {
    if (req.user.id === req.params.id || req.user.role) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }
        try {
            const userUpdate = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true });
            res.status(201).json(userUpdate);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        res.status(401).json("You can not update another account")
    }
};



//Delete User
async function deleteUser(req, res) {
    if (req.user.id === req.params.id || req.user.role) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(202).json("User deleted")
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("you are not delete another user account")
    }
}

module.exports = {
    register,
    login,
    getUser,
    updateUser,
    deleteUser,
    getusers,
}

