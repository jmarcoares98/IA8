///////////////////
//PASSPORT SET-UP//
///////////////////
const LOCAL_PORT = 4001;
const DEPLOY_URL = "http://localhost:" + LOCAL_PORT;
import passport from 'passport';
import passportGithub from 'passport-github'; 
const GithubStrategy = passportGithub.Strategy;
passport.use(new GithubStrategy({
    clientID: "1b903fd9129642776b3c",
    clientSecret: "1e54162ecb7230eca9d26cc6484636e561e4d838",
    callbackURL: DEPLOY_URL + "/auth/github/callback"
  },
  //The following function is called after user authenticates with github
  async (accessToken, refreshToken, profile, done) => {
    console.log("User authenticated through GitHub! In passport callback.")
    //Our convention is to build userId from username and provider
    const userId = `${profile.username}@${profile.provider}`;
    //See if document with this userId exists in database 
    let currentUser = await User.findOne({id: userId});
    if (!currentUser) { //if not, add this user to the database
        currentUser = await new User({
        id: userId,
        displayName: profile.username,
        authStrategy: profile.provider,
        profileImageUrl: profile.photos[0].value
      }).save();
    }
    return done(null,currentUser);
  }
));

import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy({passReqToCallback: true},
  //Called when user is attempting to log in with username and password. 
  //userId contains the email address entered into the form and password
  //contains the password entered into the form.
  async (req, userId, password, done) => {
    let thisUser;
    try {
      thisUser = await User.findOne({id: userId});
      if (thisUser) {
        if (thisUser.password === password) {
          return done(null, thisUser);
        } else {
          req.authError = "The password is incorrect. Please try again or reset your password.";
          return done(null, false)
        }
      } else { //userId not found in DB
        req.authError = "There is no account with email " + userId + ". Please try again.";
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
));
  
//Serialize the current user to the session
passport.serializeUser((user, done) => {
  console.log("In serializeUser.");
  console.log("Contents of user param: " + JSON.stringify(user));
  done(null,user.id);
});

//Deserialize the current user from persistent storage to
//the current session.
passport.deserializeUser(async (userId, done) => {
  console.log("In deserializeUser.");
  console.log("Contents of user param: " + userId);
  let thisUser;
  try {
    thisUser = await User.findOne({id: userId});
    if (thisUser) {
      console.log("User with id " + userId + " found in DB. User object will be available in server routes as req.user.")
      done(null,thisUser);
    } else {
      done(new error("Error: Could not find user with id " + userId + " in DB, so user could not be deserialized to session."));
    }
  } catch (err) {
    done(err);
  }
});
