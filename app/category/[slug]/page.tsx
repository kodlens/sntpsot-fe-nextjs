export default async function Page( { params } : { params: { slug:string} } ) {

    const { slug } = await params
  return (
    <div>
        This is the category {slug}
    </div>
  )
}
