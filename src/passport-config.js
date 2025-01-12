const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DigestStrategy = require('passport-http').DigestStrategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const users = [{ id: 1, username: 'testuser', password: 'password', googleId: null }];

// Local strategy
passport.use(new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) return done(null, user);
    return done(null, false, { message: 'Invalid credentials' });
}));

// Digest strategy
passport.use(new DigestStrategy({ qop: 'auth' }, (username, done) => {
    const user = users.find(u => u.username === username);
    if (user) return done(null, user, user.password);
    return done(null, false);
}));

// Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    let user = users.find(u => u.googleId === profile.id);
    if (!user) {
        user = { id: users.length + 1, username: profile.displayName, googleId: profile.id };
        users.push(user);
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});
