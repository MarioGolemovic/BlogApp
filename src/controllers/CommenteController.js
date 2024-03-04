const CommenteService = require("../service/CommenteService");

class CommenteController {
  static async getCommentesByPost(request, response) {
    const payload = request.query.id;
    CommenteService.getCommentesByPost(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async deleteCommente(request, response) {
    const payload = request.query.id;
    const userId = request.userId;
    const requestingUserEmail = request.email;
    CommenteService.deleteCommente(payload,userId, requestingUserEmail)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async postCommente(request, response) {
    const payload = {
      ...request.body,
      userId: request.userId,
    };
    CommenteService.postCommente(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }
}

module.exports = CommenteController;
