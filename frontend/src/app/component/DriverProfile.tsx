import React from "react";
import Image from "next/image";
import Avatar from "../assets/avatar.png";
import { DriverResponse } from "../companyui/drivers";
import axios from "axios";
import { useUserStore } from "./zustand";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios";
import { fi } from "zod/v4/locales";

interface DriverProps {
  driver: DriverResponse;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DriverProfile: React.FC<DriverProps> = ({
  driver,
  setShowPreview,
}) => {
  const [aadhaarFile, setAadharFile] = React.useState<File | null>(null);
  const [panFile, setPanFile] = React.useState<File | null>(null);
  const [profileImage, setProfileImage] = React.useState<File | null>(null);
  const [showInput, setShowInput] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);

  const token = useUserStore((state) => state.token);
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [activeVerification, setActiveVerification] = React.useState<
    "aadhar" | "pan"
  >("aadhar");
  const [aadharNumber, setAadharNumber] = React.useState(
    driver.aadharNumber ?? "",
  );
  const [panNumber, setPanNumber] = React.useState(driver.panNumber ?? "");
  const [loadingVerification, setLoadingVerification] = React.useState(false);

  const router = useRouter();
  const isAadharVerified = Boolean(driver.aadharNumber);
  const isPanVerified = Boolean(driver.panNumber);

const verifyPan = async () => {
  setLoadingVerification(true);

  try {
    const formData = new FormData();

    if (panFile) {
      formData.append("file", panFile);
    }

    formData.append("panNumber", panNumber);

    await apiClient.post(
      `/api/drivers/${driver.id}/verify-pan`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } finally {
    setLoadingVerification(false);
  }
};
const verifyAadhar = async () => {
  setLoadingVerification(true);

  try {
    const formData = new FormData();

    if (aadhaarFile) {
      formData.append("file", aadhaarFile);
    }

    formData.append("aadharNumber", aadharNumber);

    await apiClient.post(
      `/api/drivers/${driver.id}/verify-aadhar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } finally {
    setLoadingVerification(false);
  }
};
  React.useEffect(() => {
    if (showInput && imageRef.current) {
      imageRef.current.click();
    }
  }, [showInput]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileImage(file);
      setShowPreview(true);

      const previewUrl = URL.createObjectURL(file);

      // setPreviewUrl(previewUrl);
      router.push(`?preview=${previewUrl}`);
    }
  };

  return (
    <div className="p-4 w-full bprder-2 flex flex-col gap-4 ">
      <h1 className="font-bold text-2xl text-gray-400">
        {driver.name ?? "Unknown Driver"}
      </h1>

      <div className="flex flex-row justify-between w-full mt-4 items-center">
        <div className="flex flex-col">
          <strong className="font-bold text-3xl">
            {driver.name ? driver.name : "Unknown Driver"}
          </strong>
          <p className="font-semibold text-purple-500">{driver.phoneNumber}</p>
          <div className="mt-2">
            <p className="">{driver.type}</p>
            <p className="">Bombay Mumbra</p>
          </div>
        </div>
        <div className=" h-full">
          <Image
            src={(driver.profileImg ?? Avatar.src).trimEnd()}
            alt="profile"
            width={200}
            height={200}
            className="rounded-full w-[50%] h-[50%] border-2 ml-auto cursor-pointer"
            onClick={() => setShowInput(!showInput)}
          />
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={handleImageChange}
          />
          {showSubmit && <Button>Submit</Button>}
        </div>
      </div>

      <div id="documents">
        <p className="text-gray-500 text-2xl font-semibold">Documents</p>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border bg-white">
        <div className="grid grid-cols-2 border-b">
          <button
            type="button"
            onClick={() => setActiveVerification("aadhar")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeVerification === "aadhar"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Aadhar
          </button>

          <button
            type="button"
            onClick={() => setActiveVerification("pan")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeVerification === "pan"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            PAN
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex w-[200%] transition-transform duration-300 ease-in-out"
            style={{
              transform:
                activeVerification === "aadhar"
                  ? "translateX(0%)"
                  : "translateX(-50%)",
            }}
          >
            <div className="w-1/2 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  Aadhar verification
                </p>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    isAadharVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isAadharVerified ? "Verified" : "Not verified"}
                </span>
              </div>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file != null) {
                      setAadharFile(file);
                    }
                  }}
                />

                <span className="text-sm font-medium text-gray-800">
                  Upload Aadhar image
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG, or JPEG
                </span>
              </label>

              <input
                type="number"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                placeholder="Enter Aadhar number"
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={verifyAadhar}
                disabled={loadingVerification || !aadharNumber}
                className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Verify Aadhar
              </button>
            </div>

            <div className="w-1/2 p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  PAN verification
                </p>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    isPanVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isPanVerified ? "Verified" : "Not verified"}
                </span>
              </div>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center transition hover:border-blue-400 hover:bg-blue-50">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                   if (file != null) {
                      setPanFile(file);
                    }
                  }}
                />

                <span className="text-sm font-medium text-gray-800">
                  Upload Aadhar image
                </span>
                <span className="mt-1 text-xs text-gray-500">
                  PNG, JPG, or JPEG
                </span>
              </label>

              <input
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="Enter PAN number"
                className="w-full rounded-md border px-3 py-2 text-sm uppercase outline-none focus:border-blue-500"
              />

              <button
                type="button"
                onClick={verifyPan}
                disabled={loadingVerification || !panNumber}
                className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Verify PAN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
