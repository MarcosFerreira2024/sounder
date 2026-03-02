import React from "react";

function Stats({ qtd, text }: { qtd: number; text: string }) {
  return (
    <div className="flex flex-col text-main w-full justify-center items-center">
      <h2 className="text-main text-xl md:text-2xl">{qtd}</h2>
      <p className="text-opacity md:text-base text-sm ">{text}</p>
    </div>
  );
}

export default Stats;
