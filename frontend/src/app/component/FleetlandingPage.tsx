'use client';
import React from "react";
import axios from "axios";
export default function FleetLandingPage() {
  const [Email, setEmail] = React.useState("");

  
function subscribeToNewsletter(Email : string) {
  if (!Email) {
    alert("Email is required");
    return;
  }

  axios.post('http://localhost:8080/origin/newsLetter', { email: Email })
    .then(response => {
      console.log("Success:", response.data);
      alert("Subscribed successfully!");
    })
    .catch(error => {
      console.error("Error:", error);
      if (error.response) {
        alert(`Subscription failed: ${error.response.data}`);
      } else {
        alert("Subscription failed. Please try again.");
      }
    });
}
  return (
<div>

  <div
    style={{
      backgroundImage:
        "url('https://res.cloudinary.com/dffepahvl/image/upload/v1754121310/cvwrznzx1hnkrfqot8z1.webp')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    className="w-full h-screen"
  >
    <div className="w-full h-full flex flex-col items-center justify-center text-white bg-black/40 px-4 text-center">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold leading-tight mb-4">
          Control Your Fleet
          <br />
          Like Never Before
        </h1>
        <p className="text-lg md:text-2xl max-w-[600px] mx-auto">
          Real-time tracking, advanced analytics, and seamless management – all
          in one powerful platform.
        </p>
      </div>
    </div>
  </div>


  <div className="bg-white w-full py-16 px-4 md:px-10 xl:px-32">
    <div className="max-w-screen-xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">
        Useful for business.
      </h2>
      <p className="text-gray-600 mb-12">
        Our technologies enhance business efficiency and driver safety.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Time saving</p>
          <h3 className="text-3xl font-bold mb-2">20%</h3>
          <p className="text-gray-600">less mundanity</p>
          <p className="text-sm text-gray-500 mt-2">
            Process automation frees you to focus on other tasks.
          </p>
        </div>

      
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Safety</p>
          <h3 className="text-3xl font-bold mb-2">50%</h3>
          <p className="text-gray-600">fewer accidents.</p>
          <p className="text-sm text-gray-500 mt-2">
            Analyzing driving behavior improves road safety.
          </p>
        </div>

      
        <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-md transition">
          <p className="text-sm text-gray-500 mb-2">Improving efficiency</p>
          <h3 className="text-3xl font-bold mb-2">30%</h3>
          <p className="text-gray-600">reduction in fuel costs.</p>
          <p className="text-sm text-gray-500 mt-2">
            Route optimization saves up to a third on fuel.
          </p>
        </div>
      </div>
    </div>
  </div>


  <footer className="bg-black text-white pt-12 pb-6 px-6 md:px-20">
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

      <div>
        <h2 className="text-2xl font-bold mb-4">CODERA</h2>
        <p className="text-gray-400 text-sm">
          A complete platform for fleet tracking, analytics, and vehicle
          optimization. Control your fleet like never before.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Solutions</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>
            <a href="#">Fleet Tracking</a>
          </li>
          <li>
            <a href="#">Driver Analytics</a>
          </li>
          <li>
            <a href="#">EV Monitoring</a>
          </li>
          <li>
            <a href="#">Fuel Optimization</a>
          </li>
        </ul>
      </div>

 
      <div>
        <h3 className="text-lg font-semibold mb-4">Company</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>


      <div>
        <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
        <p className="text-sm text-gray-400 mb-2">
          Get the latest news & updates
        </p>
        <form className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="px-3 py-2 rounded bg-gray-800 text-white text-sm placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold px-3 py-2 rounded hover:bg-gray-200 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Codera Inc. All rights reserved.
    </div>
  </footer>
</div>

  );
}
