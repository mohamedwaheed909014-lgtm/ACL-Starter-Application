const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const redisClient = require("../config/redisConfig");
const bcrypt = require("bcryptjs");

exports.signup = asyncHandler(async (req, res) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  console.log("User is created: ", newUser);

  const accessToken = jwt.sign(
    {
      UserInfo: {
        newUser,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({ message: "Successful Sign Up" });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //   const email = req.body.email;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email: email });

  console.log(foundUser);

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        foundUser,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.status(200).json({ message: "Successful Login" });
});

exports.logout = asyncHandler(async (req, res) => {
  let accessToken;

  // if (req.cookies && req.cookies.accessToken)
  if (req.cookies?.accessToken) {
    accessToken = req.cookies.accessToken;
  }

  if (!accessToken) {
    return res.status(204);
  }

  try {
    const expirationDate = accessToken.exp;
    await redisClient.set(accessToken, "blacklisted", {
      EXAT: expirationDate,
    });
  } catch (error) {
    console.log("Error blacklisting token in Redis: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  return res.status(200).json({ message: "Successful Log out" });
});

exports.verify = asyncHandler(async (req, res, next) => {
  let token;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  if (token) {
    try {
      const isBlackListed = await redisClient.exists(token);
      if (isBlackListed) {
        return res
          .status(403)
          .json({ message: "Forbidden: token has been invalidated" });
      }
    } catch (error) {
      console.log("Error checking token in Redis: ", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) res.status(401).json({ message: "Not authorized, invalid token" });
    console.log("Decoded Token: ", decoded);
    next();
  });
});
