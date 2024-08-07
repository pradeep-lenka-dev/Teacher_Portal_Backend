const mongoose = require ('mongoose')

const conectDB = () => {
    const url = 'mongodb+srv://pradeeplenka6:hOu2u345lcR3Psys@cluster0.3zmogrl.mongodb.net/teacher_portal_dev?retryWrites=true&w=majority'
    console.log("🚀 ~ conectDB ~ url:", url)
    
    mongoose.connect(url)
}

module.exports =conectDB