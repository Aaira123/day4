



import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Type Definitions

interface Car {
  name: string;
  brand: string;
  type: string;
  tags: string[];
  pricePerDay: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  originalPrice: string;
  imageUrl?: {
    asset: {
      _ref: string;
      _type: "image";
    };
  };
  slug: {
    _type: "slug";
    current: string;
  };
}

interface ProductPageProps {
  params: { slug: string };
}

// Fetch Car Data
async function getProduct(slug: string): Promise<Car> {
  return client.fetch(
    groq`*[_type == "car" && slug.current == $slug][0]{
    name,
    tags,
    "imageUrl":image.asset->url,
    brand,
    type,
    pricePerDay,
    fuelCapacity,
    transmission,
    seatingCapacity,
    originalPrice,
    }`,
    { slug }
  );
}

// Product Page Component
export default async function ProductPage({ params }: ProductPageProps) {
  if (!params?.slug) {
    return <div className="text-center text-red-500">Error: No product found.</div>;
  }

  const car = await getProduct(params.slug);
  if (!car) {
    return <div className="flex justify-center text-5xl items-center text-indigo-600 font-extrabold bg-[#f6f7f9] h-96">Error: Car not found.</div>;
  }

  return (
    <div className="bg-[#f6f7f9] min-h-screen py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section */}
        <div>
          <div className="bg-blue-600 p-6 rounded-lg text-white">
            <h2 className="text-xl md:text-2xl font-bold">
              Sports car with the best design and acceleration
            </h2>
            <p className="mt-2 text-sm md:text-base">
              Safety and comfort while driving a futuristic and elegant sports car
            </p>
            {car.imageUrl && (
              <Image
                src={urlFor(car.imageUrl).url()}
                alt={car.name}
                width={400}
                height={300}
                className="rounded-lg mx-auto mt-4"
              />
            )}
          </div>
          {/* Thumbnails */}
          <div className="flex space-x-4 md:space-x-10 mt-6 justify-center md:justify-evenly">
            <div className="border p-1 rounded-lg cursor-pointer">
              {car.imageUrl && (
                <Image
                  src={urlFor(car.imageUrl).url()}
                  alt={car.name}
                  width={150}
                  height={80}
                  className="rounded-lg pt-8"
                />
              )}
            </div>
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image src="/View 2.png" alt="Interior" width={150} height={80} className="rounded-lg" />
            </div>
            <div className="border p-1 rounded-lg cursor-pointer">
              <Image src="/View 3.png" alt="Seats" width={150} height={80} className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{car.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-yellow-500">⭐</span>
            <span className="text-gray-500">440+ Reviewer</span>
          </div>
          <p className="text-gray-600 mt-4 text-sm md:text-base">
            This rental car delivers a powerful and smooth driving experience with excellent acceleration, fuel efficiency, and stability. Its advanced handling and comfort make it perfect for both city drives and long trips.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm md:text-base">
            <p><strong>Type:</strong> {car.type}</p>
            <p><strong>Capacity:</strong> {car.seatingCapacity} Person</p>
            <p><strong>Steering:</strong> {car.transmission}</p>
            <p><strong>Gasoline:</strong> {car.fuelCapacity}L</p>
          </div>

          <div className="mt-6 text-lg md:text-2xl font-bold text-gray-800">
            <span className="text-blue-600">{car.pricePerDay}</span>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg mt-4 md:mt-8 w-full md:w-auto">
            <Link href="/paymentDetail">Rent Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
