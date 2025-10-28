import NotFound from "@/components/NotFound"

export default async function Page({ 
  params 
} : {
  params: Promise<{slug:string}>
}
) {
  const { slug } = await params

  if (!/^[a-z0-9-]+$/i.test(slug)) {
    return <NotFound />
  }

  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  });

  const posts = await res.json();

  
  return (
    <>
      <div>This is for slug page, dynamic route</div>
      <div>{slug}</div>

    </>
  )
}
