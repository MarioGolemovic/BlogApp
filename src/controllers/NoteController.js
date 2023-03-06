const NoteService = require("../service/NoteService");

class NoteController {
  static async createNote(request, response) {
    const payload = {
      ...request.body,
      userId: request.userId,
    };
    NoteService.createNote(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async updateNote(request, response) {
    const payload = request.body;
    NoteService.updateNote(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async deleteNote(request, response) {
    const payload = request.query.id;
    NoteService.deleteNote(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async getNotes(request, response) {
    const payload = request.body;
    NoteService.getNotes(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }

  static async getNote(request, response) {
    const payload = request.query.id;
    NoteService.getNote(payload)
      .then((result) => {
        return response.status(200).send(result);
      })
      .catch((error) => {
        return response.status(500).send(error);
      });
  }
}

module.exports = NoteController;
