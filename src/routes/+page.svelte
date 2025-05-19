<script>
  import { onMount } from "svelte";
  import { Chess } from "chess.js";

  console.log("Hello there!");
  console.log("Puzzle solution: Rh5, a4, Qh6, axb5");

  let puzzleSolved = false;
  let hintMessage = "Hint: You can threaten checkmate using a rook.";
  let moveResult = "";
  let boardEl;
  let board;

  let game = new Chess(
    "r4r1k/3qb2n/p2p1pQ1/1bpR4/2p1P3/2N2N1P/PP3PP1/3R2K1 w - - 0 1"
  );

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function loadStyle(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.integrity =
        "sha384-47VeTDpmy4yT21gKPXQcLQYQZwlmz27gEH5NTrOmTk3G/SGvMyltclOW/Q8uE+sL";
      link.crossOrigin = "anonymous";
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  onMount(async () => {
    await loadStyle(
      "https://unpkg.com/@chrisoakman/chessboard2@0.5.0/dist/chessboard2.min.css"
    );
    await loadScript(
      "https://unpkg.com/@chrisoakman/chessboard2@0.5.0/dist/chessboard2.min.js"
    );

    board = window.Chessboard2(boardEl, {
      position: game.fen(),
      draggable: true,
      onDragStart: (source, piece, position, orientation) => {
        // Prevent dragging of black pieces
        if (source.piece.startsWith("b")) return false;
      },
      moveSpeed: 5,
      snapbackSpeed: 5,
      snapSpeed: 5,
      onDrop: async (source, target) => {
        const res = await fetch("/api/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source, target, position: game.fen() }),
        });

        const { success, message, currentPosition, hint } = await res.json();

        if (success) {
          puzzleSolved = message === "Puzzle solved!";
        }

        if (puzzleSolved == true) {
          const wasmMod = await import(
            "@bessimaestro/wasm-game-of-life/wasm_game_of_life_bg.wasm"
          );

          const wasm = await import(
            "@bessimaestro/wasm-game-of-life/wasm_game_of_life_bg.js"
          );

          wasm.__wbg_set_wasm(wasmMod);

          const CELL_SIZE = 10; // px

          const GRID_COLOR = "#2c2c2c";
          const DEAD_COLOR = "#fefae0";
          const ALIVE_COLOR = "#f892c5";

          // Construct the universe, and get its width and height.
          const universe = wasm.Universe.new();
          const width = universe.width();
          const height = universe.height();

          // Give the canvas room for all of our cells and a 1px border
          // around each of them.
          const canvas = document.getElementById("game-of-life-canvas");
          canvas.height = (CELL_SIZE + 1) * height + 1;
          canvas.width = (CELL_SIZE + 1) * width + 1;

          const ctx = canvas.getContext("2d");

          const renderLoop = () => {
            universe.tick();

            drawGrid();
            drawCells();

            requestAnimationFrame(renderLoop);
          };

          const drawGrid = () => {
            ctx.beginPath();
            ctx.strokeStyle = GRID_COLOR;

            // Vertical lines.
            for (let i = 0; i <= width; i++) {
              ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
              ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
            }

            // Horizontal lines.
            for (let j = 0; j <= height; j++) {
              ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
              ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
            }

            ctx.stroke();
          };

          const getIndex = (row, column) => {
            return row * width + column;
          };

          const drawCells = () => {
            const cellsPtr = universe.cells();
            const cells = new Uint8Array(
              wasmMod.memory.buffer,
              cellsPtr,
              width * height
            );

            ctx.beginPath();

            for (let row = 0; row < height; row++) {
              for (let col = 0; col < width; col++) {
                const idx = getIndex(row, col);

                ctx.fillStyle =
                  cells[idx] === wasm.Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

                ctx.fillRect(
                  col * (CELL_SIZE + 1) + 1,
                  row * (CELL_SIZE + 1) + 1,
                  CELL_SIZE,
                  CELL_SIZE
                );
              }
            }

            ctx.stroke();
          };

          drawGrid();
          drawCells();
          requestAnimationFrame(renderLoop);
        }

        moveResult = message;
        board.setPosition(currentPosition, true);
        game = new Chess(currentPosition);
        hintMessage = hint;
      },
    });

    setTimeout(() => {
      const rankLabels = document.querySelectorAll(
        ".notation-ranks-d3f97 .rank-3d54c"
      );
      rankLabels.forEach((el, i) => {
        el.textContent = 8 - i; // correct order: 8 to 1
      });
    }, 100); // delay to ensure DOM has rendered
  });
</script>

<div class="container">
  {#if !puzzleSolved}
    <div class="puzzle-message">
      <p>
        In a world increasingly reliant on AI to think for us, I believe it's
        vital to keep our minds sharp by embracing challenges. Before you access
        the content, you'll need to solve a chess puzzle—because training your
        brain to tackle hard problems is more important now than ever.
      </p>
    </div>
    <h3>Find the best moves for White.</h3>
    <p class="hint">{hintMessage}</p>
    <div bind:this={boardEl} class="chessboard"></div>
    <p class="feedback">{moveResult}</p>
  {/if}

  {#if puzzleSolved}
    <div class="hidden-content">
      🎉 Congratulations! You've solved the puzzle.
    </div>
    <canvas class="game-of-life" id="game-of-life-canvas"></canvas>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 100vh;
  }

  h3 {
    color: #2c2c2c;
    margin-bottom: 0;
  }

  p {
    color: #2c2c2c;
  }

  .hint {
    color: #2c2c2c;
  }

  .chessboard {
    width: 400px;
  }

  .hidden-content {
    padding: 1rem;
    border: 2px dashed #f892c5;
    background-color: #fefae0;
    color: #2c2c2c;
  }

  .feedback {
    margin-top: 1.5rem;
    color: #2c2c2c;
  }

  :global(.white-3b784) {
    background-color: #fefae0 !important; /* rice white */
    color: #000 !important;
  }

  :global(.black-b7cb6) {
    background-color: #f892c5 !important; /* bubblegum pink */
    color: #fff !important;
  }
  :global(.notation-files-c3c0a),
  :global(.notation-ranks-d3f97) {
    display: flex !important;
  }

  :global(.notation-files-c3c0a) {
    font-weight: bold;
    font-family: monospace;
    font-size: 0.9rem;
    color: black;
  }

  :global(.notation-ranks-d3f97) {
    font-weight: bold;
    font-family: monospace;
    font-size: 0.9rem;
    color: black;
  }

  .puzzle-message p {
    font-size: 0.8rem;
  }

  .puzzle-message {
    max-width: 400px;
    background-color: #fefae0;
    border: 2px solid #f892c5;
    padding: 1em;
    color: #2c2c2c;
  }

  .game-of-life {
    margin: 10px;
  }
</style>
