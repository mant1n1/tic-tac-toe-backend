import { Moves, MovesParams, ResponseMovesParams, GetMovesParams } from "./schema";
import { 
  Controller, 
  Route, 
  Get, 
  Tags, 
  Query, 
  Post, 
  Body, 
  SuccessResponse, 
  Example } from "tsoa";
import { sequelize } from "./main";
import { DataTypes } from "sequelize";
import * as chalk from "chalk";

@Tags("Endpoints")
@Route("/getMoves")
export class GetMovesController extends Controller {
  @Example<GetMovesParams>({
    player: "X",
    timestamp: 1606309200
  })
  @Get()
  @SuccessResponse("200")
  public async getMoves(
    @Query() player: string,
    @Query() timestamp: number
  ): Promise<ResponseMovesParams> {

    let movesId = null;
    let movesPlayer = "";
    let movesBoard = "";
    let movesTimestamp = null;
    let movesDate = "";

    await Moves.findOne({ where: { player: player, timestamp: timestamp } })
    .then(moves => {
      try {
        let res = moves.get({ plain: true });

        movesId = res['id'];
        movesPlayer = res['player'];
        movesBoard = res['board'];
        movesTimestamp = res['timestamp'];
        movesDate = res['createdAt'];

      } catch (err) {
        console.error(chalk.red(err));
        this.setStatus(500);
      }
    }, err => {
      console.error(chalk.red(err));
      this.setStatus(500);
    });
    return {
      id: parseInt(movesId),
      player: movesPlayer,
      board: movesBoard,
      timestamp: parseInt(movesTimestamp),
      date: movesDate
    };
  }
}

@Tags("Endpoints")
@Route("/postMoves")
export class PostMovesController extends Controller {
  @Post()
  @SuccessResponse("201", "Created")
  public async postMoves(
    @Body() requestBody: MovesParams
  ): Promise<void> {
    this.setStatus(201);

    Moves.init({ 
      player: DataTypes.STRING, 
      board: DataTypes.STRING,
      timestamp: DataTypes.INTEGER
    }, { sequelize, modelName: 'moves' });

    await sequelize.sync();
    await Moves.create({
      player: requestBody.player,
      board: requestBody.board,
      timestamp: requestBody.timestamp
    });
  }
}
