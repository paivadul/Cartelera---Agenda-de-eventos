const { User } = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "$ecRet0_"

module.exports.register = (req, res) => {
  let userData = req.body
  bcrypt.hash(userData.password, 10, (err, hash) => {
    if (err) {
      res.json({ error: err })
    } else {
      let user = new User({
        ...userData,
        password: hash
      })
      user.save()
        .then((data) => {
          res.json({ data })
        })
        .catch((error) => {
          res.json({ error })
        })
    }
  });
}

module.exports.login = async (req, res) => {
  let data = req.body;

  try {
    let user = await User.findOne({ email: data.email })

    let samePassword = await bcrypt.compareSync(data.password, user.password);
    //si la contraseña coincide con la contraseña encriptada en la base de datos
    if (samePassword) {
      const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      }

      //TOKEN Y REFRESH TOKEN: para que cree el Token y refresque en bucle
      let token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "24h"
      });
      let refreshToken = jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1000d"
      });
      
      //guardar el token en la cookie
      res.cookie('token', token, {
        httpOnly: true
      })

      //carga el token, el refreshToken y el payload al json (datos del usuario)
      res.json({
        user: payload,
        token,
        refreshToken
      })
      //si no coinciden los datos de usuario con la base de datos (datos mal cargados o usuario no registrado)
    } else {
      res.json({ error: 'Usuario y contraseña equivocados' })
    }
  } catch (error) {
    console.error(error)
    res.json({ error: error.toString() })
  }
}

module.exports.refresh = (req, res) => {
  let data = req.body;

  if (!data.refreshToken) {
    return res.json({ error: 'Refresh token no enviado' })
  }

  try {
    let payload = jwt.verify(data.refreshToken, JWT_SECRET);
    payload = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName
    }

    let token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "30s"
    });
    let refreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1000d"
    });

    res.json({
      token,
      refreshToken
    })
  } catch (error) {
    return res.json({ error: error.toString() });
  }
}