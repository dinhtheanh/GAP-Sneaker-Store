const userRouter = require('./user')

const routes = (app)=>{
    app.get('/api/user',userRouter)
}

module.exports = routes