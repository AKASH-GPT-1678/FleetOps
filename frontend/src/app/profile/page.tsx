"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useUserStore } from '../component/zustand';
import CheckoutButton from '../component/CheckoutButton';
interface ProfileResponseDTO {
  id: string;

  email: string;
  username: string;
  roles: string;
  premium: boolean;
}

const Settings = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isFileSelected, setIsFileSelected] = React.useState(false);
  const [chnageName, setChangeName] = React.useState(false);
  const [thingtoChange, setThingtoChange] = React.useState("");
  const [chatStatus, setChatstatus] = React.useState(true);
  const [profile, setProfile] = React.useState<ProfileResponseDTO | null>(null);
  const router = useRouter();
  const inputDiv = React.useRef<HTMLInputElement>(null);
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_BACKEND_URL;//NEXT_PUBLIC_ENDPOINT_BACKEND_URL
  const token = useUserStore((state) => state.token);
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);

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
      alert("Please select an image file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.put(`${endpoint}/activity/addProfileImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      alert("Profile image uploaded successfully.");
      // Optionally refresh the profile info here
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
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

  const handleChatToggle = async (chatStatus: boolean) => {


    try {
      const endpoint = chatStatus ? "/chat/disable" : "/chat/enable";

      const res = await axios.get(`${endpoint}/activity${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data);
    } catch (err) {
      console.error("Error toggling chat status", err);
      alert("Something went wrong while toggling chat status");
    }
  };
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




  const toggleChatStatus = async (chatStatus: boolean) => {
    const isConfirmed = confirm("Are you sure you want to toggle chat status?");
    if (!isConfirmed) return;

    const payload = {
      email: profile?.email,
      username: profile?.username,
      password: profile?.id,
      app: "meat-web"

    };
    console.log(payload);
    const endpoint = chatStatus ? "api/delete" : "api/register";


    try {

      const response = await axios.post(`http://localhost:3001/${endpoint}`, payload, {

      });
      console.log(response.data);
      if (response.data.success == true) {
        await handleChatToggle(chatStatus);
        window.location.reload();

      }


    } catch (err) {
      console.error("Error toggling chat status", err);
      alert("Something went wrong while toggling chat status");
    }
  };
  React.useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      setProfile(profileData);
    };
    fetchProfile();
  }, [token]);



  return (
    <div className="w-full flex flex-row relative">
      <div className="w-[20%]"></div>
      <div className="mt-2 shadow-2xl flex flex-col w-[1200px] h-screen m-4 p-4">
        <div>
          <h1 className="text-3xl font-bold font-sans mb-6">Your Profile</h1>
        </div>

        {/* Profile Picture and Actions */}
        <div className="flex flex-row justify-between ">

          <div className="space-x-2 ml-auto">
            <Button className="cursor-pointer" >
              Remove
            </Button>
            {isFileSelected ? (
              <Button className="cursor-pointer" onClick={handleUpload}>
                Upload
              </Button>
            ) : (
              <Button className="cursor-pointer" onClick={handleProfileChange}>
                Change
              </Button>
            )}
            <input type="file" className="hidden" ref={inputDiv} onChange={handleFile} />
          </div>
        </div>

        {/* Name Section */}
        <div className="flex flex-row justify-between p-4 mb-4">
          <div>
            <p className="font-bold">Name</p>
            <p>{profile?.username}</p>
            {chnageName && thingtoChange === "name" && (
              <div className="flex flex-row mt-3 gap-1">
                <Input type="text" placeholder="Enter New Name" className="w-[250px] h-[40px]" />
                <Button className="h-[40px] bg-black text-white cursor-pointer">Add</Button>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Button className="border cursor-pointer font-bold mr-6" onClick={() => handleEditClick("name")}>
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
        <div className="flex flex-row justify-between p-3 items-center">
          <div className="border p-4 rounded-xl shadow-sm bg-white w-full max-w-md">
            <p className="text-sm text-gray-500 font-medium mb-1">Premium Status</p>
            <p className={`text-lg font-semibold ${profile?.premium ? "text-yellow-600" : "text-gray-600"}`}>
              {"Free User"}
            </p>
          </div>
          <div>{!profile?.premium && <CheckoutButton amount={20} />}</div>
        </div>

        <div className="flex flex-row justify-between p-4 mb-4">
          <div>
            <p className="text-sm">Once you disable chat your previous chats will be lost</p>
            <p className="font-bold">Chat Status</p>
            <div
              onClick={() => toggleChatStatus(chatStatus)}
              className={`${chatStatus ? "bg-emerald-400" : "bg-gray-200"} h-[40px] w-[80px] rounded-2xl cursor-pointer mt-2`}
            >
              <div
                className={`rounded-full h-[40px] bg-emerald-400 w-[40px] border-4 ${chatStatus ? "ml-auto border-amber-50" : "border-gray-400"}`}
              ></div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>

  );

};

export default Settings;
