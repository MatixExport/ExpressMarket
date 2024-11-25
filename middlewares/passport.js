const passport = require("passport");
const PassportJWT = require("passport-jwt");
const PassportHttp = require("passport-http");
const config = require("../config/config");
const User = require("../models/User");

const options = {
  jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET,
};

passport.use(
  new PassportJWT.Strategy(options, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id );
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
module.exports = passport;