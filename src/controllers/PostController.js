const PostService = require("../service/PostService");

class PostController {
  static async createPost(request, response) {
    const payload = {
      ...request.body,
      userId: request.userId,
    };
    PostService.createPost(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async updatePost(request, response) {
    const payload = request.body;
    PostService.updatePost(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async deletePost(request, response) {
    const payload = request.query.id;
    PostService.deletePost(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async getPosts(request, response) {
    const payload = request.body;
    PostService.getPosts(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async getPost(request, response) {
    const payload = request.query.id;
    PostService.getPost(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }
}

module.exports = PostController;
 