// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountService = require('./accountService');
const User = require('./accountModel');

passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        try {
            const userData = { email, password };
            console.log("console log from", userData)
            const userR = await accountService.loginUser(userData);
            
            console.log(userR)
            if (userR.status === 'ERR') {
                return done(null, false, { message: userR.message });
            }
            return done(null, userR.checkUser, { message: 'Login successfully' });
        } catch (error) {
            return done(error);
        }

}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});



// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

module.exports = passport;
