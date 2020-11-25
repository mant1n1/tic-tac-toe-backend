import { Model } from "sequelize";

class Moves extends Model {}

interface MovesParams {
  player: string;
  board: string;
  timestamp: number;
}

interface GetMovesParams {
  player: string;
  timestamp: number;
}

interface ResponseMovesParams {
  id: number;
  player: string;
  board: string;
  timestamp: number;
  date: string;
}

export { Moves, MovesParams, ResponseMovesParams, GetMovesParams };
