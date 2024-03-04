const postModel = require("../models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

class PostService {
  static async createPost({ title, description, userId }) {
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

      const userPost = await postModel.create({
        title,
        description,
        userId,
      });

      return {
        title: userPost.title,
        description: userPost.description,
        userId: userPost.userId,
        id: userPost.id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updatePost({ title, description, id }) {
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
      
      const post = await postModel.findByIdAndUpdate(
        { _id: id },
        {
          title: title,
          description: description,
        }
      );

      if (!post) {
        return "Something went wrong,check the id";
      }

      return {
        id: post.id,
        title: post.title,
        description: post.description,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deletePost(id) {
    try {
      const post = await postModel.findByIdAndDelete(id);

      if (!post) {
        return "Something went wrong,check the id";
      }

      return "Great job! Your post is successfully deleted";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getPosts() {
    try {
      const posts = await postModel.find().sort({createdAt : 'desc'});
      if (!posts) {
        return "Something went wrong";
      }

      return posts.map((post) => {

        return {
          id: post.id,
          title: post.title,
          description: post.description,
          userId: post.userId,
          createdAt: post.createdAt,
          udatedAt: post.updatedAt,
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getPost(id) {
    try {
      const post = await postModel.findById(id);

      if (!post) {
        return "Something went wrong,check the id";
      }
      return {
        id: post.id,
        title: post.title,
        description: post.description,
        userId: post.userId,
        createdAt: post.createdAt,
        udatedAt: post.updatedAt,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = PostService;
