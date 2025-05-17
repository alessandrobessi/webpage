import { j as json } from "../../../../chunks/index.js";
import { Chess } from "chess.js";
const initialPosition = "r4r1k/3qb2n/p2p1pQ1/1bpR4/2p1P3/2N2N1P/PP3PP1/3R2K1 w - - 0 1";
const POST = async ({ request }) => {
  const userMove = await request.json();
  if (userMove.position == "r4r1k/3qb2n/p2p1pQ1/1bpR4/2p1P3/2N2N1P/PP3PP1/3R2K1 w - - 0 1" && userMove.source.source == "d5" && userMove.source.target == "h5" && userMove.source.piece == "wR") {
    const game = new Chess(userMove.position);
    game.move("Rh5");
    game.move("Bd8");
    return json({
      success: true,
      message: "✅",
      currentPosition: game.fen(),
      hint: "Hint: Now you can threaten Black's bishop!"
    });
  } else if (userMove.position == "r2b1r1k/3q3n/p2p1pQ1/1bp4R/2p1P3/2N2N1P/PP3PP1/3R2K1 w - - 2 2" && userMove.source.source == "a2" && userMove.source.target == "a4" && userMove.source.piece == "wP") {
    const game = new Chess(userMove.position);
    console.log(game.moves());
    game.move("a4");
    game.move("Rg8");
    return json({
      success: true,
      message: "✅ ✅",
      currentPosition: game.fen(),
      hint: "Hint: Your Queen is under attack!"
    });
  } else if (userMove.position == "r2b2rk/3q3n/p2p1pQ1/1bp4R/P1p1P3/2N2N1P/1P3PP1/3R2K1 w - - 1 3" && userMove.source.source == "g6" && userMove.source.target == "h6" && userMove.source.piece == "wQ") {
    const game = new Chess(userMove.position);
    game.move("Qh6");
    game.move("Ra7");
    return json({
      success: true,
      message: "✅ ✅ ✅",
      currentPosition: game.fen(),
      hint: "Hint: Black can say goodbye to his bishop."
    });
  } else if (userMove.position == "3b2rk/r2q3n/p2p1p1Q/1bp4R/P1p1P3/2N2N1P/1P3PP1/3R2K1 w - - 3 4" && userMove.source.source == "a4" && userMove.source.target == "b5" && userMove.source.piece == "wP") {
    const game = new Chess(userMove.position);
    console.log(game.moves());
    game.move("axb5");
    return json({
      success: true,
      message: "Puzzle solved!",
      currentPosition: game.fen(),
      hint: ""
    });
  } else {
    return json({
      success: false,
      message: "Incorrect move. Try again.",
      currentPosition: initialPosition,
      hint: "Hint: You can threaten checkmate using a rook."
    });
  }
};
export {
  POST
};
