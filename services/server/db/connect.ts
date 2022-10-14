const mongoose = require('mongoose')
const configConstants = require('../constants/config')

async function ConnectDB() {
    try {
        console.log(configConstants.MONGO_URI)
        await mongoose.connect(configConstants.MONGO_URI + '/hidden', {
            autoIndex: false
        })
        console.log('DB connected!')
    } catch (e) {
        console.log('Error with db connection:', e)
        //retry connection
    }
}

export {}

export default ConnectDB