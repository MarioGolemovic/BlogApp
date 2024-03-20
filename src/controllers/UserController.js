const UserService = require("../service/UserService");

class UserController {
  static async signup(request, response) {
    const payload = request.body;
    UserService.signup(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async signin(request, response) {
    const payload = request.body;
    UserService.signin(payload)
      .then((result) => {
        response.status(200).send(result);
      })
      .catch((error) => {
        response.send(error);
      });
  }
  static async resetPassword(request, response) {
    const payload = request.body;
    UserService.resetPassword(payload)
      .then((result) => {
        response.status(200).send(result);
      })
      .catch((error) => {
        response.status(500).send(error);
      });
  }
}
module.exports = UserController;
