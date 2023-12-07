const commentModel = require("../models/comment");
const noteModel = require("../models/note");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

class CommentService {
  static async postComment({ comment, noteID, userId }) {
    try {
      if (!comment || !noteID) {
        return "Required fields are missing";
      }
      if (typeof comment != "string" || typeof noteID != "string") {
        return "Required fields are not string";
      }
      if (comment.length < 3 || comment.length > 100) {
        return "Please write a comment not longer than 100 characters";
      }
      const note = await noteModel.findById(noteID);
      if (!note) {
        return "Note does not exist";
      }
      const userComment = await commentModel.create({
        comment,
        noteID,
        userId,
      });

      return {
        comment: userComment.comment,
        noteId: userComment.noteID,
        userId: userComment.userId,
        id: userComment.id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteComment(id, userId, requestingUserEmail) {
    try {
      const comment = await commentModel.findById(id);
  
      if (!comment) {
        return "Comment not found";
      }
  
      // Provjera je li korisnik ima ovlasti za brisanje komentara
      if (
        comment.userId.toString() === userId ||
        requestingUserEmail === 'mariogolemovic12@gmail.com'
      ) {
        const deletedComment = await commentModel.findByIdAndDelete(id);
  
        if (!deletedComment) {
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

  static async getCommentsByNote(noteID) {
    try {
      const userNote = await noteModel.findById({ _id: noteID });

      if (!userNote) {
        return "Note is not aviable";
      }

      const returnValue = {
        id: userNote._id,
        title: userNote.title,
        description: userNote.description,
        userId: userNote.userId,
        createdAt: userNote.createdAt,
        updatedAt: userNote.updatedAt,
        comments: [],
      };

      const userComments = await commentModel.find({ noteID }).populate('userId', 'username');
      userComments.forEach((userComment) => {
        returnValue.comments.push({
          userId: userComment.userId,
          id: userComment.id,
          username: userComment.userId.username,
          comment: userComment.comment,
          createdAt: userComment.createdAt,
          updatedAt: userComment.updatedAt,
        });
      });
      function compare(a, b) {
        return b.createdAt - a.createdAt;
      }
      returnValue.comments.sort(compare);

      return returnValue;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = CommentService;
