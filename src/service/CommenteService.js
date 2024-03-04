const commenteModel = require("../models/commente");
const postModel = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

class CommenteService {
  static async postCommente({ commente, postID, userId }) {
    try {
      if (!commente || !postID) {
        return "Required fields are missing";
      }
      if (typeof commente != "string" || typeof postID != "string") {
        return "Required fields are not string";
      }
      if (commente.length < 3 || commente.length > 100) {
        return "Please write a comment not longer than 100 characters";
      }
      const post = await postModel.findById(postID);
      if (!post) {
        return "Post does not exist";
      }
      const userCommente = await commenteModel.create({
        commente,
        postID,
        userId,
      });

      return {
        commente: userCommente.commente,
        postId: userCommente.postID,
        userId: userCommente.userId,
        id: userCommente.id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteCommente(id, userId, requestingUserEmail) {
    try {
      const commente = await commenteModel.findById(id);
  
      if (!commente) {
        return "Comment not found";
      }
  
      // Provjera je li korisnik ima ovlasti za brisanje komentara
      if (
        commente.userId.toString() === userId ||
        requestingUserEmail === 'mariogolemovic12@gmail.com'
      ) {
        const deletedCommente = await commenteModel.findByIdAndDelete(id);
  
        if (!deletedCommente) {
          return "Something went wrong, check the id";
        }
  
        return { success: true };
      } else {
        return "Unauthorized to delete this comment";
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getCommentesByPost(postID) {
    try {
      const userPost = await postModel.findById({ _id: postID });

      if (!userPost) {
        return "Post is not aviable";
      }

      const returnValue = {
        id: userPost._id,
        title: userPost.title,
        description: userPost.description,
        userId: userPost.userId,
        createdAt: userPost.createdAt,
        updatedAt: userPost.updatedAt,
        commentes: [],
      };

      const userCommentes = await commenteModel.find({ postID }).populate('userId', 'username');
      userCommentes.forEach((userCommente) => {
        returnValue.commentes.push({
          userId: userCommente.userId,
          id: userCommente.id,
          username: userCommente.userId.username,
          commente: userCommente.commente,
          createdAt: userCommente.createdAt,
          updatedAt: userCommente.updatedAt,
        });
      });
      function compare(a, b) {
        return b.createdAt - a.createdAt;
      }
      returnValue.commentes.sort(compare);

      return returnValue;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = CommenteService;
