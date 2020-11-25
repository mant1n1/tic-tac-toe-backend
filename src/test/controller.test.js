const request = require("supertest")("http://localhost:7777");
const expect = require("chai").expect;

const PLAYER = "GamerOne";
const BOARD = "";
const TIMESTAMP = 1606309200;

describe("POST /postMoves", function () {
  it("status 201", async function () {
    const response = await request
      .post("/postMoves")
      .send({ player: PLAYER, board: BOARD, timestamp: TIMESTAMP });

    expect(response.status).to.eql(201);
  });

  it("status 400", async function () {
    const response = await request
      .post("/postMoves")
      .send({ player: true, board: 7, timestamp: "timestamp" });

    expect(response.status).to.eql(400);
  });
});

describe("GET /getMoves", function () {
  it("status 200", async function () {
    const response = await request
    .get(`/getMoves?player=${PLAYER}&timestamp=${TIMESTAMP}`);

    expect(response.status).to.eql(200);

    const res = response.body;
    expect(res.player).to.eql(PLAYER);
    expect(res.board).to.eql(BOARD);
    expect(res.timestamp).to.eql(TIMESTAMP);
  });

  it("status 500", async function () {
    const response = await request
    .get("/getMoves?player=GamerTwo&timestamp=77777777");
    
    expect(response.status).to.eql(500);
  });
});
