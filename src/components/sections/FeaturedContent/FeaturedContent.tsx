"use client"
import classNames from "classnames";
import { ContentPieceType, FeaturedContentType, FeaturedContentLayoutType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { Container } from "@/components/elements/Container/Container";
import { useInView } from "react-hook-inview";
import "@/app/css/bg-color.css";
import "@/app/css/padding.css";

const TextPart: React.FC<{ data: ContentPieceType, layout: FeaturedContentLayoutType, darkMode: boolean }> = ({ data, layout, darkMode }) => {
  const { eyebrow, heading, description, buttons  } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "tracking-widest mb-2 font-medium",
            { "text-primary-600": !darkMode },
            { "text-neutral-100": darkMode },
            {
              "text-center":
                layout === "Vertical (Text | Image)" ||
                layout === "Vertical (Image | Text)",
            }
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div
          className={classNames(
            "text-heading leading-tighter font-heading  max-w-6xl mb-5",
            { "text-neutral-50": darkMode },
            {
              "text-center mx-auto":
                layout === "Vertical (Text | Image)" ||
                layout === "Vertical (Image | Text)",
            }
          )}
        >
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "block prose xl:prose-lg",
            { "text-neutral-100": darkMode } ,
            {
              "mx-auto":
                layout === "Vertical (Text | Image)" ||
                layout === "Vertical (Image | Text)",
            },
            { "mb-8": buttons && buttons.length > 0 }
          )}
        >
          <RichText2 data={description} />
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <ButtonGroup
          data={buttons}
          size="lg"
          alignment={
            layout === "Vertical (Text | Image)" ||
            layout === "Vertical (Image | Text)"
              ? "center"
              : undefined
          }
        />
      )}
    </>
  );
};

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({ data }) => {
  const { htmlid, layout, style, content, mediaAspectRatio, backgroundColor, backgroundImage, darkMode } = data;
  const [ref, isIntersecting] = useInView({
    threshold: [0.1, 0.5, 1],
    unobserveOnEnter: true
  });
  if (content === null) {
    return null
  }
  if (style === "extended") {
    return (
      <section
        id={htmlid}
        ref={ref}
        className={classNames(
          `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
        )}
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage.url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
              }
            : {}
        }
      >
        <div
          className={classNames(
            "relative flex flex-wrap",
            { "flex-row-reverse": layout === "Horizontal (Text | Image)" },
            { "flex-col": layout === "Vertical (Image | Text)" },
            { "flex-col-reverse": layout === "Vertical (Text | Image)" }
          )}
        >
          <div
            className={classNames(
              "relative w-full -bottom-10 opacity-0",
              { "animate-slidingUpSection animation-delay-150": isIntersecting },
              { "lg:w-6/12": layout === "Horizontal (Text | Image)" },
              { "lg:w-6/12": layout === "Horizontal (Image | Text)" }
            )}
          >
            <FlexibleContentMediaPart
              data={content}
              rounded="none"
              aspectRatio={mediaAspectRatio}
            />
          </div>
          <div
            className={classNames(
              "relative -bottom-10 opacity-0 self-center w-full pt-4 md:pt-8 lg:pt-16 pb-16 flex flex-col",
              { "animate-slidingUpSection animation-delay-500": isIntersecting },
              {
                "lg:w-1/2 px-4 md:px-10 lg:pr-16 xl:pr-24 custom-padding-left":
                  layout === "Horizontal (Text | Image)",
              },
              {
                "lg:w-1/2 px-4 md:px-10 lg:pl-16 xl:pl-24 custom-padding-right":
                  layout === "Horizontal (Image | Text)",
              }
            )}
          >
            <TextPart data={content} layout={layout} darkMode={darkMode} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={htmlid}
      ref={ref}
      className={classNames(
        "py-12 md:py-14 lg:py-16 xl:py-18 2xl:py-20",
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
      )}
    >
      <Container>
        <div
          className={classNames(
            "w-full flex flex-wrap",
            { "flex-col gap-y-6": layout === "Vertical (Image | Text)" },
            {
              "flex-col-reverse gap-y-6": layout === "Vertical (Text | Image)",
            },
            { "flex-row-reverse": layout === "Horizontal (Text | Image)" }
          )}
        >
          <div
            className={classNames(
              "relative -bottom-10 opacity-0 w-full max-w-5xl mx-auto",
              {
                "animate-slidingUpSection animation-delay-500": isIntersecting,
              },
              {
                "w-full lg:w-6/12":
                  layout === "Horizontal (Text | Image)" ||
                  layout === "Horizontal (Image | Text)",
              }
            )}
          >
            <FlexibleContentMediaPart
              data={content}
              aspectRatio={mediaAspectRatio}
            />
          </div>
          <div
            className={classNames(
              "relative -bottom-10 opacity-0 py-6 self-center flex flex-col mx-auto",
              {
                "animate-slidingUpSection animation-delay-500": isIntersecting,
              },
              {
                "lg:w-1/2 md:pr-8 lg:pr-16":
                  layout === "Horizontal (Text | Image)",
              },
              {
                "lg:w-1/2 md:pl-8 lg:pl-16":
                  layout === "Horizontal (Image | Text)",
              }
            )}
          >
            <TextPart data={content} layout={layout} darkMode={darkMode} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedContent;