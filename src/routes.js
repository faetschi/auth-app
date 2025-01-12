const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1>
              <p><a href='/login'>Login with form</a></p>
              <p><a href='/auth/digest'>Login with HTTP Digest</a></p>
              <p><a href='/auth/google'>Login with Google</a></p>`);
});

// Form-based login
router.get('/login', (req, res) => {
    const error = req.query.error === 'invalid' ? '<p style="color:red;">Invalid username or password</p>' : '';
    res.send(`<h2>Login Form</h2>
              ${error}
              <form method='post' action='/login'>
                  <input type='text' name='username' placeholder='Username' required />
                  <input type='password' name='password' placeholder='Password' required />
                  <button type='submit'>Login</button>
              </form>`);
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.redirect('/login?error=invalid'); // Redirect back to login with an error
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect('/profile'); // Redirect to profile upon successful login
        });
    })(req, res, next);
});



// HTTP Digest authentication route
router.get('/auth/digest', passport.authenticate('digest', { session: false }), (req, res) => {
    res.send(`<h1>Authenticated via HTTP Digest</h1>`);
});

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

// Profile route
router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Hello, ${req.user.username}</h1>
                  <p><a href='/logout'>Logout</a></p>`);
    } else {
        res.redirect('/');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
