const noteModel = require("../models/note");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

class NoteService {
  static async createNote({ title, description, userId }) {
    try {
      if (!title || !description) {
        return "Required fields are missing";
      }
      if (typeof title != "string" || typeof description != "string") {
        return "Required fields are not string";
      }
      if (title.length < 5 || title.length > 50) {
        return "Please write a title not longer than 50 characters";
      }
      if (description.length < 20 || description.length > 255) {
        return "Please write a description not longer than 255 characters";
      }

      const userNote = await noteModel.create({
        title,
        description,
        userId,
      });

      return {
        title: userNote.title,
        description: userNote.description,
        userId: userNote.userId,
        id: userNote.id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateNote({ title, description, id }) {
    try {
      if (!title || !description || !id) {
        return "Required fields are missing";
      }
      if (
        typeof title != "string" ||
        typeof description != "string" ||
        typeof id != "string"
      ) {
        return "Required fields are not string";
      }
      if (title.length < 5 || title.length > 50) {
        return "Please write a title not longer than 50 characters";
      }
      if (description.length < 20 || description.length > 255) {
        return "Please write a description not longer than 255 characters";
      }

      const note = await noteModel.findByIdAndUpdate(
        { id: id },
        {
          title: title,
          description: description,
        }
      );

      if (!note) {
        return "Something went wrong,check the id";
      }

      return {
        id: note.id,
        title: note.title,
        description: note.description,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      const note = await noteModel.findByIdAndDelete(id);

      if (!note) {
        return "Something went wrong,check the id";
      }

      return "Great job! Your note is successfully deleted";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getNotes() {
    try {
      const notes = await noteModel.find().sort({createdAt : 'desc'});
      if (!notes) {
        return "Something went wrong";
      }

      return notes.map((note) => {

        return {
          id: note.id,
          title: note.title,
          description: note.description,
          userId: note.userId,
          createdAt: note.createdAt,
          udatedAt: note.updatedAt,
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getNote(id) {
    try {
      const note = await noteModel.findById(id);

      if (!note) {
        return "Something went wrong,check the id";
      }
      return {
        id: note.id,
        title: note.title,
        description: note.description,
        userId: note.userId,
        createdAt: note.createdAt,
        udatedAt: note.updatedAt,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = NoteService;
