import React from "react";
import Image from "next/image";
import TempImage from "../../assets/avatar.png";
const PreviewModal = () => {
  return (
    <div className="w-100 h-72 md:h-96 md:w-120 bg-white shadow-2xl rounded-2xl cursor-pointer flex flex-col items-center justify-between p-5">
      <Image
        src={TempImage.src}
        alt="preview"
        width={100}
        height={100}
        className="w-[80%] h-40 md:h-60 object-contain"
      />
      <button className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md cursor-pointer">
        Continue
      </button>
    </div>
  );
};

export default PreviewModal;
