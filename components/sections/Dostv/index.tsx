import Link from 'next/link';
import Image from 'next/image';
import SliderDostv from '@/components/SliderDostv';

const DostV = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/dostv/load-dostv`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
    },
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to load DOSTv content.');
  }

  const featuredImageUrl = data?.dostv?.featured_image
    ? `${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/dostv/${data.dostv.featured_image}`
    : '/images/placeholder-magazine.png'; // local fallback in /public

  return (
    <section
      className="relative flex flex-col lg:flex-row items-center justify-center my-20 rounded-2xl overflow-hidden shadow-xl"
      style={{
        backgroundImage: `url(/images/dost-v-background.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Left Section: Featured Image */}
      <div className="relative hidden lg:flex lg:w-2/3 justify-center items-center z-10">
        <div
          className="absolute inset-0 bg-cover bg-center blur-md opacity-40"
          style={{ backgroundImage: `url(${featuredImageUrl})` }}
        />

        <div className="relative p-10 max-w-[80%] rounded-xl shadow-lg overflow-hidden">
          <Image
            src={featuredImageUrl}
            alt={data?.dostv?.title ?? 'DOSTv cover'}
            width={720}            // adjust as needed
            height={480}           // adjust as needed
            priority
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
            // onError isn't reliably supported on server — fallback handled above by choosing local src when missing
          />
        </div>
      </div>

      {/* Right Section: Info + Videos */}
      <div className="relative z-10 lg:w-1/3 text-center px-6 py-10 lg:py-0">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:text-left">
          DOST<span className="text-blue-400">v</span>
        </h2>

        <p className="text-white text-sm md:text-base leading-relaxed text-justify mb-6">
          {data?.dostv?.description}
        </p>

        {/* Video Slider */}
        <div className="mx-auto max-w-[320px] mb-8">
          <SliderDostv data={data} />
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row justify-center gap-4">
          <Link
            prefetch={false}
            target="_blank"
            href={data?.dostv?.website || '#'}
            className="text-white font-semibold bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg shadow-md"
          >
            Learn More
          </Link>
          <Link
            prefetch={false}
            target="_blank"
            href={data?.dostv?.link || '#'}
            className="text-white font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition px-6 py-3 rounded-lg shadow-md"
          >
            Visit YouTube
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DostV;
