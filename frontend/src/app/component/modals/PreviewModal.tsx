import React from "react";
import TempImage from "../../assets/avatar.png";
import { useSearchParams } from "next/navigation";
import { ImCross } from "react-icons/im";
import { blobUrlToFile } from "@/app/utils/blobtoFile";
import apiClient from "@/lib/axios";
import { useUserStore } from "../zustand";
interface ModalProps { 
   setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
   driverName : string | null;
   driverId : string | null

}
const PreviewModal: React.FC<ModalProps> = ({ setShowPreview , driverName , driverId}) => {
  const searchParam = useSearchParams();
  const values = searchParam.get("preview");
  const token = useUserStore((state)=> state.token);
const uploadDriverProfile = async (): Promise<void> => {

  if (!values) {
    console.log("No preview blob url found");
    return;
  }

  try {

    const file = await blobUrlToFile(values, `${driverName}.png`);

    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient.post(
      `driver${driverId}upload-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

  } catch (error: unknown) {

    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unknown error", error);
    }

  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="relative w-100 h-72 md:h-96 md:w-120 bg-white shadow-2xl rounded-2xl flex flex-col items-center justify-between p-5">


        <button
          onClick={() => setShowPreview(false)}
          className="absolute top-4 right-4 bg-white border shadow-md rounded-full p-2 hover:scale-110 transition-all duration-200 cursor-pointer"
        >
          <ImCross fill="red" size={14} />
        </button>

    
        <img
          src={values ?? TempImage.src}
          alt="preview"
          className="w-[80%] h-40 md:h-60 object-contain mt-8"
        />

      
        <button
          className="mt-4 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md cursor-pointer"
       onClick={uploadDriverProfile}
  
       >
          Continue
        </button>

      </div>
    </div>
  );
};

export default PreviewModal;
