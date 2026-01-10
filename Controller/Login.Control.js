const SignUp = require('../Model/Users.Model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


const handleLoginBtn = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        const user = await SignUp.findOne({ email: userEmail })

        if (!user) {
            return res.status(400).json({ Message: "User Not Found!!!" });
        }
        else {
            console.log('userLogin', user);

            bcrypt.compare(userPassword, user.password, async function (err, result) {
                if (!result) {
                    // console.log(result);
                    return res.status(200).json({ Message: "Password Incorrect!!" });
                }
                else {
                    const token = jwt.sign(
                        {
                            email: userEmail,
                            password: user.password
                        },
                        process.env.JWT_TOKEN,
                        { expiresIn: "3h" })


                    res.cookie(`Token_${user._id}`, token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax"
                    });
                    res.status(200).json({ user, token })
                }

            });
        }
    } catch (error) {
        return res.json({ Message: "Server Error" })

    }
}



module.exports = { handleLoginBtn }