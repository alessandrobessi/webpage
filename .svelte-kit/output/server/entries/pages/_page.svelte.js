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
  $$payload.out += `<div class="container svelte-1jgki52"><p class="bio svelte-1jgki52">Data scientist with international experience leading complex 
    machine learning initiatives, from infrastructure to modeling. 
    Full-remote worker. Mensa member.

    Avid reader, average chess player, mediocre pianist, terrible bassist,
     awful electronic music composer, and wannabe professional sleeper.

    Former academic researcher on misinformation in online social networks: <a href="https://scholar.google.com/citations?user=4QiUu3AAAAAJ&amp;hl=en">Google Scholar</a></p> `;
  {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="puzzle-message svelte-1jgki52"><p class="svelte-1jgki52">In a world increasingly reliant on AI to think for us, I believe it's
        vital to keep our minds sharp by embracing challenges. Training your
        brain to tackle hard problems is more important now than ever.</p></div> <h3 class="svelte-1jgki52">Find the best moves for White.</h3> <p class="hint svelte-1jgki52">${escape_html(hintMessage)}</p> <div class="chessboard svelte-1jgki52"></div> <p class="feedback svelte-1jgki52">${escape_html(moveResult)}</p>`;
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
