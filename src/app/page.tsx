



import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allproducts } from "@/sanity/lib/queries";

type Car = {
  name: string;
  brand: string;
  type: string;
  pricePerDay: string;
  imageUrl: string;
  slug: { _type: "slug"; current: string };
};

export default async function Home() {

  

  const cars: Car[] = await sanityFetch({ query: allproducts });

  // Get only the first 4 cars for the popular section
  const popularCars = cars.slice(0, 4);

  // Get the last 8 cars for the recommended section
  const recommendedCars = cars.slice(-8);

  return (
    <div>
      <div className="bg-[#f6f7f9] min-h-screen p-4 sm:p-6 lg:p-20 flex flex-col gap-10 font-[family-name:var(--font-geist-sans)]">
        
        {/* Banner Section */}
        <section className="first w-full flex flex-wrap sm:flex-nowrap gap-4 sm:gap-8 justify-center">
        <div className="relative bg-blue-500 p-8 rounded-2xl text-white max-w-3xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="text-center md:text-left flex-1">
        <h1 className="text-3xl font-bold">The Best Platform for Car Rental</h1>
        <p className="mt-2 text-sm">
          Ease of doing a car rental safely and reliably. Of course at a low price.
        </p>
        <button className="mt-4 bg-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
          Rental Car
        </button>
      </div>
      <div className="flex-1 flex justify-center">
        <Image
          src="/car.png" // Ensure you place the same car image in the public folder as car.png
          alt="Sports Car"
          width={400}
          height={200}
          className="object-contain"
        />
      </div>
    </div>
         
          <div className="relative bg-blue-500 p-8 rounded-2xl text-white max-w-3xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
      <div className="text-center md:text-left flex-1">
        <h1 className="text-3xl font-bold">
          Easy way to rent a car at a low price
        </h1>
        <p className="mt-2 text-sm">
          Providing cheap car rental services and safe and comfortable facilities.
        </p>
        <button className="mt-4 bg-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
          Rental Car
        </button>
      </div>
      <div className="flex-1 flex justify-center">
        <Image
          src="/car (1).png" // Ensure you place the new car image in the public folder as new-car.png
          alt="Sports Car"
          width={400}
          height={200}
          className="object-contain"
        />
      </div>
    </div>
        </section>

        {/* Pick Up and Drop Off Section */}
        <section className="w-[470px] flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 sm:gap-8">
          <Image src={"/Pick - Up.png"} alt="" width={582} height={132} className="max-w-full" />
          <Image src={"/Switch.png"} alt="" width={60} height={60} className="max-w-full" />
          <Image src={"/Drop - Off.png"} alt="" width={582} height={132} className="max-w-full" />
        </section>

        {/* Popular Cars Section  */}
         <section className="popular w-full flex flex-col gap-4">
          <div className="first w-full flex items-center justify-between">
            <h1 className="text-gray-500 text-lg sm:text-xl">Popular Cars</h1>
            <Link href={"/categories"}>
              <h1 className="text-[#3563e9] font-bold hover:underline decoration-[#3563e9]">
                View All
              </h1>
            </Link>
          </div>
          <div className="sec grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {popularCars.map((car) => (
              <div key={car.slug.current} className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between border border-gray-300 rounded-md bg-white shadow-lg mb-5">
                <div className="p-4">
                  <h1 className="font-semibold text-xl">{car.name}</h1>
                  <h3 className="text-sm">{car.type}</h3>
                  <Image src={car.imageUrl} alt={car.name} width={220} height={68} className="rounded-md mt-4" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <p>
                    {car.pricePerDay}<span className="text-gray-500"></span>
                  </p>
                  <Link href={`/car/${car.slug.current}`}>
                    <button className="bg-[#3563e9] p-2 text-white rounded-md">Rent Now</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section> 

        {/* Recommended Cars Section - Last 8 Cars */}
          <section className="recommended w-full flex flex-col gap-4">
          <h1 className="text-gray-500 text-lg sm:text-xl">Recommended Cars</h1>
          <div className="sec grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedCars.map((car) => (
              <div key={car.slug.current} className="w-full max-w-[304px] mx-auto h-auto flex flex-col justify-between border border-gray-300 rounded-md bg-white shadow-lg mb-5">
                <div className="p-4">
                  <h1 className="font-semibold text-xl">{car.name}</h1>
                  <h3 className="text-sm">{car.type}</h3>
                  <Image src={car.imageUrl} alt={car.name} width={220} height={68} className="rounded-md mt-4" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <p>
                    {car.pricePerDay}<span className="text-gray-500"></span>
                  </p>
                  <Link href={`/car/${car.slug.current}`}>
                    <button className="bg-[#3563e9] p-2 text-white rounded-md">Rent Now</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section> 


        

        {/* Show More Cars Button */}
        <section className="button w-full text-center">
         
            <button className="bg-[#3563e9] px-4 py-2 text-white rounded-md mt-5">
               Cars on Rent
            </button>
          
        </section>
      </div>
    </div>
  );
}


