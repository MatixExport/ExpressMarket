const passport = require("passport");
const PassportJWT = require("passport-jwt");
const PassportHttp = require("passport-http");
const config = require("../config/config");
const User = require("../models/User");
const {hashPassword,compareHash} = require("../util/authHelper")

const options = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET,
};

passport.use(
  new PassportJWT.Strategy(options, async (payload, done) => {
    try {
      const user = await User.findOne({ id: payload.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  new PassportHttp.BasicStrategy( async (userId, password, done) => {
    try {
      const user = await User.findOne({ id: userId });
      if (!user) {
        return done(null, false);
      }
      const isPasswordCorrect = await compareHash(password, user.password)
      if (!isPasswordCorrect) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;