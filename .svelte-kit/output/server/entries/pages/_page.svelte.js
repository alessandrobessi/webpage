import { e as escape_html } from "../../chunks/escaping.js";
import { c as pop, p as push } from "../../chunks/index2.js";
import { Chess } from "chess.js";
function _page($$payload, $$props) {
  push();
  console.log("Hello there!");
  console.log("Puzzle solution: Rh5, a4, Qh6, axb5");
  let hintMessage = "Hint: You can threaten checkmate using a rook.";
  let moveResult = "";
  new Chess("r4r1k/3qb2n/p2p1pQ1/1bpR4/2p1P3/2N2N1P/PP3PP1/3R2K1 w - - 0 1");
  $$payload.out += `<div class="container svelte-3efxcm">`;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="puzzle-message svelte-3efxcm"><p class="svelte-3efxcm">In a world increasingly reliant on AI to think for us, I believe it's
        vital to keep our minds sharp by embracing challenges. Before you access
        the content, you'll need to solve a chess puzzle—because training your
        brain to tackle hard problems is more important now than ever.</p></div> <h3 class="svelte-3efxcm">Find the best moves for White.</h3> <p class="hint svelte-3efxcm">${escape_html(hintMessage)}</p> <div class="chessboard svelte-3efxcm"></div> <p class="feedback svelte-3efxcm">${escape_html(moveResult)}</p>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
export {
  _page as default
};
