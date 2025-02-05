 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';


async function getProduct(slug:any) {
  return client.fetch(
    groq`*[_type == "car" && slug.current == $slug][0]{
      name,
      tags,
      "imageUrl": image.asset->url,
      brand,
      type,
      pricePerDay,
      fuelCapacity,
      transmission,
      seatingCapacity,
      originalPrice,
      rating
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const car = await getProduct(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div>
          <div className="bg-blue-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-blue-700">Sports car with the best design and acceleration</h2>
            <p className="text-gray-600 mt-2">Safety and comfort while driving a futuristic and elegant sports car</p>
            {car.imageUrl && (
              <Image 
                src={car.imageUrl} 
                alt={car.name} 
                width={500} 
                height={300} 
                className="rounded-lg mx-auto mt-4" 
              />
            )}
          </div>
          {/* Thumbnail Images */}
          <div className="flex space-x-4 mt-4">
            <div className="border p-1 rounded-lg cursor-pointer">
              {car.imageUrl && (
                <Image src={car.imageUrl} alt={car.name} width={80} height={60} className="rounded-lg" />
              )}
            </div>
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image src="/interior.jpg" alt="Interior" width={80} height={60} className="rounded-lg" />
            </div>
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image src="/seats.jpg" alt="Seats" width={80} height={60} className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">{car.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-yellow-500">⭐ {car.rating}</span>
            <span className="text-gray-500">440+ Reviewer</span>
          </div>
          <p className="text-gray-600 mt-4">NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the "race track".</p>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <p><strong>Type:</strong> {car.type}</p>
            <p><strong>Capacity:</strong> {car.seatingCapacity} Person</p>
            <p><strong>Steering:</strong> {car.transmission}</p>
            <p><strong>Gasoline:</strong> {car.fuelCapacity}L</p>
          </div>
          
          <div className="mt-6 text-2xl font-bold text-gray-800">
            <span className="text-blue-600">${car.pricePerDay}</span> / day <span className="text-gray-400 line-through">${car.originalPrice}</span>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-4 w-full">
            <Link href="/paymentDetail">Rent Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
