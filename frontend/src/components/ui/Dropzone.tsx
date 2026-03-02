import { Upload } from "lucide-react";
import React from "react";
import Image from "./Image";

function Dropzone({
  photo,
  handleInputChange,
}: {
  photo: File | null | undefined;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className=" md:w-[300px] md:h-[300px] w-[150px] h-[150px] shadow-md overflow-hidden flex items-center justify-center border relative border-neutral-800 rounded-2xl border-dashed">
      <label htmlFor="fileInput" className=" absolute w-full h-full">
        {photo && (
          <Image
            src={URL.createObjectURL(photo)}
            alt="photo"
            className="w-full h-full z-20 object-center absolute object-cover rounded-2xl"
          />
        )}
        <input
          onChange={handleInputChange}
          type="file"
          id="fileInput"
          hidden
          aria-hidden
        />
      </label>

      <Upload
        size={56}
        className="absolute text-opacity pointer-events-none z-10 "
      />
    </div>
  );
}

export default Dropzone;
