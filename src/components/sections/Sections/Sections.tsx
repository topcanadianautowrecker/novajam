import Testimonials from '@/components/sections/Testimonials/Testimonials'
import CTAB from "@/components/sections/CTAB/CTAB"
import HeroB from "@/components/sections/HeroB/HeroB"
import ScrollingPT from "@/components/sections/ScrollingPT/ScrollingPT"
import AccordionPT from "@/components/sections/AccordionPT/AccordionPT"
import CardList from "@/components/sections/CardList/CardList"
import FeatureB from "@/components/sections/FeatureB/FeatureB"
import { CTAType, CardListType, FeatureType, HeroType, InquiryFormType, PresentationType } from "@/utils/types"
import HeroC from '../HeroC/HeroC'
import TabPT from '../TabPT/TabPT'
import CarouselPT from '../CarouselPT/CarouselPT'
import { InquiryForm } from '../InquiryForm/InquiryForm'
import { Gallery } from '../Gallery/Gallery'

const sectionComponents = {
  hero: {
    "side by side": HeroB,
    overlay: HeroC,
  },
  cta: CTAB,
  presentation: {
    scrolling: ScrollingPT,
    accordion: AccordionPT,
    tab: TabPT,
    carousel: CarouselPT,
  },
  testimonials: Testimonials,
  feature: FeatureB,
  cardlist: CardList,
  gallery: Gallery,
  inquiryform: InquiryForm,
}

// type ComponentType = typeof HeroB | typeof HeroC | typeof HeroD | typeof CTAB | typeof ScrollingPT | typeof AccordionPT | typeof CarouselPT | typeof TabPT | typeof Testimonials | typeof FeatureB | typeof CardList

type SectionType = {
  data: HeroType | CTAType | PresentationType | CardListType | FeatureType | InquiryFormType
}
const Section: React.FC<SectionType> = ({data}) => {
  // @TODO
  // @ts-ignore 
  const Component = (typeof sectionComponents[data.contentType] === "object") ? sectionComponents[data.contentType][data.layout] : sectionComponents[data.contentType]
  if (!Component) return null
  return <Component data={data} />
}

const Sections: React.FC<{data: Array<HeroType | CTAType | PresentationType | CardListType | FeatureType>}> = ({ data }) => {
  return (
    <main className="flex flex-col pb-32">
      {data.map(section => (
        <Section key={section.id} data={section} />
      ))}
    </main>
  )
}

export default Sections