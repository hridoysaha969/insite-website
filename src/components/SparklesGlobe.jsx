import React from "react";
import Earth from "./globe";
import { Sparkles } from "./Sparkles";
function SparkklesGlobe() {
  return (
    <>
      <div className="h-auto overflow-hidden bg-dotted text-white">
        <article className="grid text-center relative z-10 pt-10">
          <Earth />
        </article>

        <div className="relative -mt-32 h-80 w-auto overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#3273ff,transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-[#163474] after:bg-[#08132b]">
          <Sparkles
            density={1200}
            className="absolute inset-x-0 bottom-0 h-full w-full "
          />
        </div>
      </div>
    </>
  );
}
export default SparkklesGlobe;
