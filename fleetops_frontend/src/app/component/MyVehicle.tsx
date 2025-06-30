// pages/my-vehicle.tsx
import Image from "next/image";

export default function MyVehicle() {
  const vehicle = {
    name: "Raj Tempo",
    image: "https://res.cloudinary.com/dffepahvl/image/upload/v1751271131/hft795e7eqnpqhycvfzg.avif",
    price: "₹1,000/day",
    description: "Heavy-duty transport vehicle ideal for intra-city deliveries. Fuel-efficient and GPS-enabled.",
    features: [
      "AC Cabin",
      "GPS Enabled",
      "20ft Cargo Space",
      "BS6 Engine",
      "Available 24x7",
    ],
    owner: "Rajesh Kumar",
    location: "Delhi NCR",
    status: "Available",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Image Section */}
       

        {/* Right Details Section */}
        <div className="lg:w-1/2 p-8 space-y-4">
          <h1 className="text-3xl font-bold">{vehicle.name}</h1>
          <p className="text-xl text-green-600 font-semibold">{vehicle.price}</p>
          <p className="text-gray-700">{vehicle.description}</p>

          <div>
            <h2 className="text-lg font-semibold mt-4 mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {vehicle.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-4">
            <p><strong>Owner:</strong> {vehicle.owner}</p>
            <p><strong>Location:</strong> {vehicle.location}</p>
            <p><strong>Status:</strong> <span className="text-blue-600 font-medium">{vehicle.status}</span></p>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit Details</button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
