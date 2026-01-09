const mongoose = require('mongoose');

async function Connect(url) {
   return mongoose.connect(url)
}
module.exports = {
    Connect,
}