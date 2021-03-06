const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const cloudinary = require('../services/cloudinary');

class ProfileController {
    async updateProfile(req, res) {
        const id = req.params.id;

        if(req.files['avatar']) {
            let avatarPromises = req.files['avatar'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'avatar', 'image', resolve);
            }))

            const avatar = await Promise.all(avatarPromises);
            req.body.avatar = avatar[0].url;
        }

        await User.findOneAndUpdate({_id: id}, req.body, { new: true }, (err, result) => {
            if(err) {
                console.log(err);
            }
            res.status(200).send(result);
        })
    }

    async changePassword(req, res) {
        const id = req.params.id;
        const user = await User.findOne({_id: id});
    
        const salt = await bcrypt.genSalt();
        const validPassword = await bcrypt.compare(req.body.currentpassword, user.password);

        if(!req.body.currentpassword || !req.body.password || !req.body.confirmpassword) {
            return res.status(400).send(['error', 'One field is required']);
        }

        if(req.body.password !== req.body.confirmpassword) {
            return res.status(400).send(['error', 'Confirm password is not matching']);
        }
        if(!validPassword) {
            return res.status(400).send(['error', 'Current password was wrong'])
        }

        req.body.password = await bcrypt.hash(req.body.password, salt);
        User.updateOne({_id: id}, { password: req.body.password })
            .then(() => {
                return res.status(200).send(['success', 'Password has been changed']);
            })
            .catch(error => {
                return res.status(500).json({ message: error });
            })
    }

    async getUser(req, res) {
        const id = req.params.id;

        if(!id) {
            res.status(400).send(false);
        }

        const user = await User.findById(id);
        if(user) {
            res.status(200).send(user);
        }
    }

    async getFavourite(req, res) {
        const id = req.params.id;

        if(!id) return res.status(400).send(`No user with id: ${id}`);

        const user = await User.findById(id).populate('favourites').populate('artists');
        // console.log(user)
        return res.status(200).json({ favourites: user.favourites, artists: user.artists });
    }
}

module.exports = new ProfileController();