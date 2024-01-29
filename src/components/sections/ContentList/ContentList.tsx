import { Section } from "@/components/elements/Section/Section";
import classNames from "classnames";
import { ContentListType } from "@/helpers/types";
import { Button } from "@/components/elements/Button/Button";
import { CarouselList } from "./CarouselList";
import { MasonryList } from "./MasonryList";
import { DeckList } from "./DeckList";
import { SpotlightList } from "./SpotlightList";
import "@/app/css/bg-color.css";

export const ContentList: React.FC<{ data: ContentListType }> = ({ data }) => {
  const {
    heading,
    eyebrow,
    summary,
    seeAllLink,
    content,
    layout,
    size,
    alignment,
    htmlid,
    backgroundColor,
    backgroundImage,
  } = data;

  return (
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-section-bg-color`)}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      framed={ layout !== "carousel" }
      backgroundImage={backgroundImage}
    >
      <div className={classNames(
        { "mt-8": layout === "carousel" && (heading || eyebrow || summary) } 
      )}>
        {seeAllLink && 
          <div className="w-full flex justify-center -mt-8 mb-4">
            <Button
            size="lg"
            variant="arrow"
            url={seeAllLink.url}>
              {seeAllLink.text}
            </Button>
          </div>
        }
        {layout === "carousel" && (
          <CarouselList list={content} size={size} alignment={alignment} />
        )}
        {layout === "masonry" && (
          <MasonryList list={content} size={size} alignment={alignment} />
        )}
        {layout === "deck" && (
          <DeckList list={content} size={size} alignment={alignment} />
        )}
        {layout === "spotlight" && (
          <SpotlightList list={content} size={size} alignment={alignment} />
        )}
      </div>
    </Section>
  )
}