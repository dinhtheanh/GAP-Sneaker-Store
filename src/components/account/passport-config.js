// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountService = require('./accountService');
const User = require('./accountModel');

passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        try {
            const userData = { email, password };
            const userR = await accountService.loginUser(userData);
            console.log(userR.checkUser);

            if (userR.status === 'ERR') {
                console.log("Failed to login");
                return done(null, false);
            }
            console.log("Success");
            return done(null, userR.checkUser);
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
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

module.exports = passport;
