const CommentService = require("../service/CommentService");

class CommentController {
  static async getCommentsByNote(request, response) {
    const payload = request.query.id;
    CommentService.getCommentsByNote(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async deleteComment(request, response) {
    const payload = request.query.id;
    CommentService.deleteComment(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async postComment(request, response) {
    const payload = {
      ...request.body,
      userId: request.userId,
    };
    CommentService.postComment(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }
}

module.exports = CommentController;
