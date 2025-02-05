


"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

type Car = {
  _id: string;
  name: string;
  slug: { current: string };
};

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Car[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchCars() {
      if (!searchQuery) {
        setSearchResults([]);
        return;
      }

      const data: Car[] = await client.fetch(
        groq`*[_type == "car" && name match $searchTerm + "*"]{
          _id, name, slug
        }`,
        { searchTerm: searchQuery }
      );
      
      setSearchResults(data);
      setShowDropdown(true);
    }

    fetchCars();
  }, [searchQuery]);

  const handleSelectCar = (slug: string) => {
    setSearchQuery(""); // Clear input field
    setShowDropdown(false); // Close dropdown
    router.push(`/car/${slug}`); // Navigate to selected car
  };

  return (
    <div className="w-full bg-white h-auto flex flex-col md:flex-row items-center justify-between p-4 md:p-8 border-b-2 border-b-[#e7eef6]">
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 w-full">
        <h1 className="text-[#3563e9] text-4xl font-bold">MORENT</h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <Image
            src={"/search-normal.png"}
            alt=""
            width={24}
            height={24}
            className="absolute top-1/2 left-3 transform -translate-y-1/2"
          />
          <input
            type="text"
            title="search"
            placeholder="Search for cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-[#e7eef6] w-full md:w-[492px] h-[44px] rounded-full p-2 pl-10 pr-12"
          />
          <Image
            src={"/filter.png"}
            alt=""
            width={24}
            height={24}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          />

          {/* Search Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <ul className="absolute bg-white border mt-2 w-full rounded-lg shadow-lg z-10">
              {searchResults.map((car) => (
                <li
                  key={car._id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectCar(car.slug.current)}
                >
                  {car.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex gap-3 mt-4 md:mt-0">
        <Link href={"/like"}>
          <Image src="/Like.png" alt="like" width={35} height={35} />
        </Link>
        <Link href={"/subscribe"}>
          <Image src="/Notification (5).png" alt="notifications" width={35} height={35} />
        </Link>
        <Link href={"/select"}>
          <Image src="/Settings.png" alt="settings" width={35} height={35} />
        </Link>
        <Image src="/Profil.png" alt="profile" width={35} height={35} />
      </div>
    </div>
  );
}
