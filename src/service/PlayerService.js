const playerModel = require("../models/player");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NOTESAPI";

class PlayerService {
  static async createPlayer({ name,position,injury, age, number, yellow, red, goals, assists, userId }) {
    try {
      if (!name || !position || !injury || !age || !number || !yellow || !red || !goals || !assists) {
        return "Required fields are missing";
      }
      if (typeof name != "string" || typeof position != "string" || typeof injury != "string" || typeof age != "string" || typeof number != "string" || typeof yellow != "string" || typeof red != "string" || typeof goals != "string" || typeof assists != "string") {
        return "Required fields are not in the expected format";
      }
     

      const userPlayer = await playerModel.create({
        name,
        position,
        injury,
        age,
        number,
        yellow,
        red,
        goals,
        assists,
        userId,
      });

      return {
        name: userPlayer.name,
        position: userPlayer.position,
        injury: userPlayer.injury,
        age: userPlayer.age,
        number: userPlayer.number,
        yellow: userPlayer.yellow,
        red: userPlayer.red,
        goals: userPlayer.goals,
        assists: userPlayer.assists,
        userId: userPlayer.userId,
        id: userPlayer.id,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updatePlayer({ name,position,injury, age, number, yellow, red, goals, assists, id }) {
    try {
      if (!name || !position || !injury || !age || !number || !yellow || !red || !goals || !assists || !id) {
        return "Required fields are missing";
      }
      if (typeof name != "string" || typeof position != "string" || typeof injury != "string" ||  typeof age != "string" || typeof number != "string" || typeof yellow != "string" || typeof red != "string" || typeof goals != "string" || typeof assists != "string" || typeof id != "string") {
        return "Required fields are not in the expected format";
      }
     
      
      
      const player = await playerModel.findByIdAndUpdate(
        { _id: id },
        {
          name: name,
          position: position,
          injury: injury,
          age: age,
          number: number,
          yellow: yellow,
          red: red,
          goals: goals,
          assists: assists,
        }
      );

      if (!player) {
        return "Something went wrong,check the id";
      }

      return {
        id: player.id,
        name: player.name,
        position: player.position,
        injury: player.injury,
        age: player.age,
        number: player.number,
        yellow: player.yellow,
        red: player.red,
        goals: player.goals,
        assists: player.assists,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deletePlayer(id) {
    try {
      const player = await playerModel.findByIdAndDelete(id);

      if (!player) {
        return "Something went wrong,check the id";
      }

      return "Great job! Your player is successfully deleted";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getPlayers() {
    try {
      const players = await playerModel.find().sort({createdAt : 'desc'});
      if (!players) {
        return "Something went wrong";
      }

      return players.map((player) => {

        return {
          id: player.id,
          name: player.name,
          position: player.position,
          injury: player.injury,
          age: player.age,
          number: player.number,
          yellow: player.yellow,
          red: player.red,
          goals: player.goals,
          assists: player.assists,
          userId: player.userId,
          createdAt: player.createdAt,
          udatedAt: player.updatedAt,
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getPlayer(id) {
    try {
      const player = await playerModel.findById(id);

      if (!player) {
        return "Something went wrong,check the id";
      }
      return {
        id: player.id,
        name: player.name,
        position: player.position,
        injury: player.injury,
        age: player.age,
        number: player.number,
        yellow: player.yellow,
        red: player.red,
        goals: player.goals,
        assists: player.assists,
        userId: player.userId,
        createdAt: player.createdAt,
        udatedAt: player.updatedAt,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = PlayerService;
