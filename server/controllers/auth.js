const queries = require("./queries");
const { hashPassword } = require("../services/bcrypt");
const jwt = require("jwt-simple");

const userToken = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.signUp = (req, res) => {
  const { name, email, password, confirmPassword, postcode } = req.body;
  
  if (!name || !email || !password || !confirmPassword || !postcode) {
    return res
      .status(422)
      .send({ error: "You must provide a name, email, location and password" });
  }

  else if (password !== confirmPassword) {
    return res
    .status(422)
    .send({ error: "Your passwords don't match!"})
  }

  else {
     queries
    .getUser(email)
    .then(user => {
      return new Promise((resolve, reject) => {
        if (user) {
          res.status(422).send({ error: "Email is in use. Please log in." });
          reject("Email is in use. Please log in");
        } else resolve(hashPassword(password));
      });
    })
    .then(hash => {
      return queries.addUser(name, email, hash);
    })
    .then(user => {
      res.json({ token: userToken(user) });
    })
    .catch(console.log);
  }

};

exports.signIn = (req, res) => {
  res.json({ token: userToken(req.user) });
};

exports.getUser = (req, res) => {
  res.send(req.user);
};


