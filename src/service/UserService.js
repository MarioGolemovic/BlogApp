const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";
const validator = require("validator");

class UserService {
  static async signup({ username, email, password}) {
    try {
      if (!username || !email || !password) {
        return "Required fields are missing";
      }
      if (
        typeof username != "string" ||
        typeof email != "string" ||
        typeof password != "string" 
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
     
      const existingEmail = await userModel.findOne({ email: email });
      const existingUserName = await userModel.findOne({ username: username });

      if (existingEmail) {
        throw "EMAIL ALREDY EXISTS";
      }
      if (existingUserName) {
        throw "USERNAME ALREDY EXISTS";
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.create({
        email: email,
        password: hashedPassword,
        username: username,
    
      });
      const token = jwt.sign(
        { email: result.email, id: result.id },
        SECRET_KEY,
        { expiresIn: "3h" }
      );

      return {
        username: result.username,
        email: result.email,
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
        throw "USER NOT FOUND";
      }

      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!matchPassword) {
        throw "INVALID PASSWORD";
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
  static async resetPassword({ email, newPassword }) {
    try {
      if (!email || !newPassword) {
        return "Email and new password are required";
      }

      const existingUser = await userModel.findOne({ email });

      if (!existingUser) {
        return "User with this email does not exist";
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);


      await userModel.findByIdAndUpdate(existingUser._id, {
        password: hashedPassword,
      });

      return "Password reset successfully";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
}

module.exports = UserService;
