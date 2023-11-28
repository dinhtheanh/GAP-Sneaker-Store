// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const accountService = require('./accountService'); 

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const userData = { email, password };
        const user = await accountService.loginUser(userData);

        if (user.status === 'ERR') {
            return done(null, false, { message: user.message });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
