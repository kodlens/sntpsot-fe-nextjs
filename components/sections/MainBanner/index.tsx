import Image from "next/image";


const MainBanner = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/api/load-banner`,{
     next: { revalidate:60 },
     headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_API_TOKEN}`
     }
  })

  const data = await res.json()
  
  if(!res.ok){
    throw new Error('Failed to load banner');
  }

  return (
    <>
      <div className="">
        <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URI}/storage/banner_images/${data?.img}`} 
          width={1200}
          height={400}
          sizes="100vw"              // ✅ tells Next.js it should take full viewport width
          style={{ width: "100%", height: "auto" }} // ✅ C
          alt={'Banner'} />
      </div>
    </>
  )
}

export default MainBanner;