const PlayerService = require("../service/PlayerService");

class PlayerController {
  static async createPlayer(request, response) {
    const payload = {
      ...request.body,
      userId: request.userId,
    };
    PlayerService.createPlayer(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async updatePlayer(request, response) {
    const payload = request.body;
    PlayerService.updatePlayer(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async deletePlayer(request, response) {
    const payload = request.query.id;
    PlayerService.deletePlayer(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async getPlayers(request, response) {
    const payload = request.body;
    PlayerService.getPlayers(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async getPlayer(request, response) {
    const payload = request.query.id;
    PlayerService.getPlayer(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }
}

module.exports = PlayerController;
