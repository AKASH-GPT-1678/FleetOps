import React from 'react';
import Image from 'next/image';
const Card = ({ title, subtitle, details , imageUrl}: { title: string, subtitle: string, details: string[] , imageUrl : string}) => (
  <div className="border rounded-xl shadow-md p-4 w-full max-w-sm bg-white">
    <Image
      src={imageUrl}
      alt="placeholder"
      className="w-full h-40 object-cover rounded-md mb-3"
      width={100} height={100}
    />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{subtitle}</p>
    <ul className="mt-2 text-sm text-gray-700 list-disc pl-5">
      {details.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  </div>
);


export default Card;