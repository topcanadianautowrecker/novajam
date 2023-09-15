import Section from "@/components/elements/Section/Section"
import Image from "next/image"
import classNames from "classnames"
import Button from "@/components/elements/Button/Button"
import { ButtonVariant } from "@/utils/types"
import RichText from "@/components/elements/RichText/RichText"

interface FeatureProps {
  data: {
    title: string
    label?: string
    subtitle?: string
    content?: string
    media?: {
      contentType: string
      url: string
      title?: string
    }
    buttons?: Array<{
      url: string
      text: string
      type: ButtonVariant
    }>
  }
  mediaPosition?: "left" | "right"
  variant?: "standard" | "alternate"
}

// @TODO refactor to decrease complexity to 10
// eslint-disable-next-line complexity
const FeatureB: React.FC<FeatureProps> = ({ data, mediaPosition = "rightyarn", variant = "standard" }) => {
  const { title, label, subtitle, content, media, buttons } = data

  if (variant === "alternate") {
    return (
      <Section framed={false}>
        <div className="w-full grid lg:grid-cols-2">
          <div className={classNames({ "lg:col-start-2" : mediaPosition === "right"})}>
            {media?.contentType.includes("image") && (
              <Image
                className="w-full h-full object-cover"
                src={media?.url ?? ""}
                alt={media?.title ?? title}
                width={500}
                height={500}
              />
            )}
            {media?.contentType.includes("video") && (
              <video className="w-full h-96" src={media?.url} >
                <track kind="captions" label={media.title} />
              </video>
            )}
          </div>
          <div className={classNames("px-4 pt-5 pb-20 md:px-8 lg:p-20 xl:p-32 bg-primary-50", { "lg:col-start-1 lg:row-start-1": mediaPosition === "right"})}>
            {label && (
              <p className="uppercase tracking-widest mb-5">
                {label}
              </p>
            )}
            <h3 className="font-heading text-4xl lg:text-5xl leading-snug lg:leading-snug font-bold max-w-4xl mb-5 text-secondary-600">
              {title}
            </h3>
            {subtitle && (
              <p className="text-lg leading-8 lg:text-xl lg:leading-10 font-medium mb-12 max-w-4xl">
                {subtitle}
              </p>
            )}
            <div className="text-lg block mb-8">
              { content && <RichText htmlString={content} /> }
            </div>
            <div>
              {buttons && buttons.map(button => 
                <Button key={button.text} variant={button.type} url={button.url} size="lg">
                  {button.text}
                </Button>
              )}
            </div>
          </div>
          
        </div>
      </Section>
    )
  }
  return (
    <Section>
      <div className="w-full grid lg:grid-cols-2">
        <div className={classNames({ "lg:col-start-2" : mediaPosition === "right"})}>
          {media?.contentType.includes("image") && (
            <Image
              className="w-full h-full object-cover"
              src={media?.url ?? ""}
              alt={media.title ?? title}
              width={500}
              height={500}
            />
          )}
          {media?.contentType.includes("video") && (
            <video className="w-full h-96" src={media?.url}>
              <track kind="captions" label={media.title} />
            </video>
          )}
        </div>
        <div className={classNames(
          "pt-5 pb-20 md:p-8 lg:px-16 lg:py-12 flex flex-col justify-center",
          { "lg:col-start-1 lg:row-start-1": mediaPosition === "right" }
        )}>
          {label && (
            <p className="uppercase tracking-widest mb-5">
              {label}
            </p>
          )}
          <h3 className="font-heading text-3xl lg:text-4xl leading-snug lg:leading-snug font-bold max-w-4xl mb-5">
            {title}
          </h3>
          {subtitle && (
            <p className="text-lg leading-8 lg:text-xl lg:leading-10 font-medium mb-12 max-w-4xl">
              {subtitle}
            </p>
          )}
          <div className="text-slate-700 text-lg block">
            { content && <RichText htmlString={content} /> }
          </div>
          <div>
            {buttons && buttons.map(button => 
              <Button key={button.text} variant={button.type} url={button.url} size="lg">
                {button.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FeatureB