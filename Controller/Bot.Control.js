const {generateContent} = require('../Model/Bot.Model')

const handleGetReview = async (req, res) => {
    const  message  = req.body.message
    
    if (!message) {
        res.status(400).send('Prompt is Required')
    } else {
        console.log("message Comes", Date());
        try {
        const response = await generateContent(message)
        console.log(response);
        res.send(response)
        } catch (error) {
            res.send(error.message)
        }
    }

}

module.exports = {handleGetReview}