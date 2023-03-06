const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const validator = require("validator");

class UserService {
  static async signup({ username, email, password, role }) {
    try {
      if (!username || !email || !password || !role) {
        return "Required fields are missing";
      }
      if (
        typeof username != "string" ||
        typeof email != "string" ||
        typeof password != "string" ||
        typeof role != "string"
      ) {
        return "Required fields are not string";
      }
      if (username.length < 3 || username.length > 50) {
        return "Please write a usernae not longer than 50 characters and not less than 3 characters";
      }
      if (!validator.isEmail(email)) {
        return "Not a valid email format";
      }
      if (password.length < 8 || password.length > 50) {
        return "Please write a password not longer than 50 characters and not less than 8 characters!";
      }
      if (role != "admin" && role != "user") {
        return "Invalid role provided";
      }
      const existingEmail = await userModel.findOne({ email: email });
      const existingUserName = await userModel.findOne({ username: username });

      if (existingEmail) {
        throw "EMAIL_ALREDY_EXISTS";
      }
      if (existingUserName) {
        throw "USER_ALREDY_EXISTS";
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.create({
        email: email,
        password: hashedPassword,
        username: username,
        role: role,
      });
      const token = jwt.sign(
        { role: result.role, email: result.email, id: result.id },
        SECRET_KEY,
        { expiresIn: "3h" }
      );

      return {
        username: result.username,
        email: result.email,
        role: result.role,
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async signin({ email, password }) {
    try {
      if (!email || !password) {
        return "Required fields are missing";
      }
      if (typeof email != "string" || typeof password != "string") {
        return "Required fields are not string";
      }

      const existingUser = await userModel.findOne({ email: email });

      if (!existingUser) {
        throw "USER_NOT_FOUND";
      }

      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!matchPassword) {
        throw "INVALID_CREDENTIALS";
      }

      const token = jwt.sign(
        {
          role: existingUser.role,
          email: existingUser.email,
          id: existingUser.id,
        },
        SECRET_KEY,
        { expiresIn: "3h" }
      );

      return {
        email: existingUser.email,
        role: existingUser.role,
        id: existingUser.id,
        token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = UserService;
