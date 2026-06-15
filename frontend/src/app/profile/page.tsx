"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useUserStore } from '../component/zustand';
import CheckoutButton from '../component/CheckoutButton';
import Image from 'next/image';

interface ProfileResponseDTO {
  id: string;

  email: string;
  username: string;
  roles: string;
  premium: boolean;
  profileImg : string
}

const Settings = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  const [chnageName, setChangeName] = React.useState(false);
  const [thingtoChange, setThingtoChange] = React.useState("");
  const [profile, setProfile] = React.useState<ProfileResponseDTO | null>(null);
  const router = useRouter();
  const inputDiv = React.useRef<HTMLInputElement>(null);
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;//NEXT_PUBLIC_ENDPOINT_BACKEND_URL
  const token = useUserStore((state) => state.token);
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const defaultUrl = 'https://res.cloudinary.com/dffepahvl/image/upload/v1754295798/pwoveg1fjurga2kudwk4.png';

  const handleProfileChange = () => {
    inputDiv.current?.click();

  };

  // const handleRemove = async () => {
  //   const defaultUrl = "https://res.cloudinary.com/dffepahvl/image/upload/v1754295798/pwoveg1fjurga2kudwk4.png";

  //   if (profile?.profilePictureUrl === defaultUrl) {
  //     alert("You can't remove the default profile picture");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`${endpoint}/activity/profile/remove`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log(response.data);

  //     alert("Profile image has been reset to default.");
  //     // Optional: refresh the profile data here if needed
  //   } catch (error) {
  //     console.error("Error removing profile image:", error);
  //     alert("Something went wrong while removing the profile image.");
  //   }
  // };
const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select an image first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await axios.post(
      `${endpoint}/profile/profile-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Upload Success:", response.data);



    setIsFileSelected(false);

  } catch (error) {
    console.error("Upload failed:", error);

    alert(
      error.response?.data?.message ||
      "Failed to upload profile picture."
    );
  }
};
  const handleEditClick = (field: string) => {
    setThingtoChange(field);
    setChangeName(true);
  };


  const handleFile = () => {
    if (inputDiv.current?.value) {
      setSelectedFile(inputDiv.current.files![0]);
      setIsFileSelected(true);
    }
  }


  async function getProfile() {
    try {
      const response = await axios.get(`${endpoint}/profile/getProfile`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }


  React.useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };
    fetchProfile();
  }, [token]);



  return (
    <div className="w-full flex flex-row justify-center relative">
      {/* <div className="w-[20%]"></div> */}
      
      <div className="mt-2 border flex flex-col w-[1200px] h-screen m-4 p-4">
        <div>
          <h1 className="text-3xl font-bold font-sans mb-6">Your Profile</h1>
        </div>

        {/* Profile Picture and Actions */}
<div className="flex items-center justify-between border-b pb-6">
  {/* Left Side */}
  <div className="flex items-center gap-4">
    <Image
      src={profile?.profileImg?? defaultUrl}
      alt="Profile"
      width={100}
      height={100}
      className="rounded-full object-cover border"
    />

  
  </div>

  {/* Right Side */}
<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto ml-10">
  <Button
    variant="outline"
    className="w-full sm:w-32 cursor-pointer"
  >
    Remove
  </Button>

  {isFileSelected ? (
    <Button
      className="w-full sm:w-32 cursor-pointer"
      onClick={handleUpload}
    >
      Upload
    </Button>
  ) : (
    <Button
      className="w-full sm:w-32 cursor-pointer"
      onClick={handleProfileChange}
    >
      Change Photo
    </Button>
  )}

  <input
    type="file"
    className="hidden"
    ref={inputDiv}
    onChange={handleFile}
    accept="image/*"
  />
</div>
</div>

        {/* Name Section */}
     <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 mb-4 border-b">
  <div className="flex-1">
    <p className="font-semibold text-gray-500 text-sm">Name</p>

    <p className="font-medium text-lg mt-1">
      {profile?.username}
    </p>

    {chnageName && thingtoChange === "name" && (
      <div className="flex flex-col sm:flex-row gap-2 mt-4 max-w-md">
        <Input
          type="text"
          placeholder="Enter new name"
          className="flex-1"
        />

        <Button className="w-full sm:w-24 cursor-pointer">
          Save
        </Button>
      </div>
    )}
  </div>

  <div className="mt-4 md:mt-0">
    <Button
      variant="outline"
      className="cursor-pointer w-full md:w-auto"
      onClick={() => handleEditClick("name")}
    >
      Edit
    </Button>
  </div>
</div>
        <hr />

        {/* Email Section */}
        <div className="flex flex-row justify-between p-4 mb-4">
          <div>
            <p className="font-bold">Email</p>
            <p>{profile?.email}</p>
          </div>
        </div>
        <hr />

        {/* Phone Section */}
        <div className="flex flex-row justify-between h-[200px]">
          <div className="flex flex-col justify-between p-4 mb-4 mt-3">
            <p className="font-bold">Phone Number</p>
            <p>{"+91 98765 43210"}</p>
          </div>
        </div>
        <hr />

    
        <div className="flex flex-row justify-between p-3 items-center">
          <div className="border p-4 rounded-xl bg-white w-full max-w-md">
            <p className="text-sm text-gray-500 font-medium mb-1">Type of Account</p>
            <p className={`text-lg font-semibold ${true ? "text-purple-600" : "text-green-600"}`}>
              {"Seller"}
            </p>
          </div>
          <div>
            {!true && (
              <Button onClick={() => router.push("/seller")} className="py-3 cursor-pointer min-h-[40px]">
                Become a Seller
              </Button>
            )}
          </div>
        </div>

        {/* Premium Section */}
        <div className="flex flex-col space-y-6 md:flex-row justify-between p-3 items-center">
          <div className="border p-4 rounded-xl shadow-sm bg-white w-full max-w-md">
            <p className="text-sm text-gray-500 font-medium mb-1">Premium Status</p>
            <p className={`text-lg font-semibold ${profile?.premium ? "text-yellow-600" : "text-gray-600"}`}>
              {"Free User"}
            </p>
          </div>
          <div className='w-full md:w-fit'>{!profile?.premium && <CheckoutButton amount={20} />}</div>
        </div>


        <hr />
      </div>
    </div>

  );

};

export default Settings;
