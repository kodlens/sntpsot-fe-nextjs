import MainHeader from "@/components/MainHeader"
import DostV from "@/components/sections/Dostv"
import FeaturedArticles from "@/components/sections/FeaturedArticles"
import FeaturedMagazine from "@/components/sections/FeaturedMagazine"
import LatestArticles from "@/components/sections/LatestArticles"
import LocationMap from "@/components/sections/LocationMap"
import MagazineSlider from "@/components/sections/MagazineSlider"
import MainBanner from "@/components/sections/MainBanner"

const Page = () => {
  return (
    <>
      <MainBanner />

      <FeaturedArticles />

      <LatestArticles />

      <FeaturedMagazine />

      <MagazineSlider />

      <DostV />
      
      <LocationMap />
    </>
  )
}

export default Page