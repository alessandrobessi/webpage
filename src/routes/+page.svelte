<script>
  import { onMount } from "svelte";
  import { Chess } from "chess.js";

  let puzzleSolved = false;
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
        if (piece.startsWith("b")) return false;
      },
      moveSpeed: "slow",
      snapbackSpeed: 500,
      snapSpeed: 100,
      onDrop: async (source, target) => {
        const res = await fetch("/api/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source, target, position: game.fen() }),
        });

        const { success, message, currentPosition } = await res.json();

        if (success) {
          puzzleSolved = message === "Puzzle solved!";
        }

        moveResult = message;
        board.setPosition(currentPosition, true);
        game = new Chess(currentPosition);
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
    <p>Hint: You can win one of the Black bishops.</p>
    <div bind:this={boardEl} class="chessboard"></div>
    <p class="feedback">{moveResult}</p>
  {/if}

  {#if puzzleSolved}
    <div class="hidden-content">
      🎉 Congratulations! You've solved the puzzle.
    </div>
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
</style>
