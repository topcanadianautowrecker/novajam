"use client";

import classNames from "classnames";
import React, { useState } from "react";
import Section from "@/components/elements/Section/Section";
import { PresentationType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";

interface ArrowGroupProps {
  visibleIdx: number;
  setVisibleIdx: (idx: number) => void;
  length: number;
}

const ArrowGroup = ({ visibleIdx, setVisibleIdx, length }: ArrowGroupProps) => {
  return (
    <>
      <AiOutlineArrowLeft
        className="cursor-pointer"
        size={40}
        onClick={() => {
          if (visibleIdx > 0) setVisibleIdx(visibleIdx - 1);
          else setVisibleIdx(length - 1);
        }}
      />
      <AiOutlineArrowRight
        className="cursor-pointer"
        size={40}
        onClick={() => {
          if (visibleIdx < length - 1) setVisibleIdx(visibleIdx + 1);
          else setVisibleIdx(0);
        }}
      />
    </>
  );
};

const MiniCarousel: React.FC<{ data: PresentationType }> = ({ data }) => {
  const { label, title, subtitle, content } = data;
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <Section className="bg-neutral-100">
      <div className="lg:flex lg:gap-5 px-4 lg:py-10">
        <div className="lg:w-1/2 lg:pr-10">
          {label && (
            <p className="uppercase tracking-widest text-secondary-500 font-semibold mb-2">
              {label}
            </p>
          )}
          <h2 className="text-3xl lg:text-4xl lg:leading-[50px] font-heading font-bold mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="prose md:prose-lg lg:prose-xl mb-10 max-w-xl lg:max-w-3xl">
              {subtitle}
            </p>
          )}
          <div className="hidden lg:flex gap-10">
            <ArrowGroup
              visibleIdx={visibleIdx}
              setVisibleIdx={setVisibleIdx}
              length={content.length}
            />
          </div>
        </div>
        <div className="lg:w-1/2 grid">
          {content.map((section, idx) => (
            <div
              key={section.id}
              className={classNames(
                "col-start-1 row-start-1 flex flex-col shadow-xl bg-white rounded-assets transition-all ease-in-out duration-500 relative",
                { "opacity-100 right-0": visibleIdx == idx },
                { "opacity-0 -right-24": visibleIdx != idx }
              )}
            >
              { section.media.length > 0 &&  
                // @TODO <MediaCarousel /> breaks layout here
                <MediaItem data={section.media[0]} aspectRatio="3/2" />
              }
              <div className="grow flex flex-col gap-5 justify-center p-8 lg:px-12">
                <h3 className="text-2xl font-semibold">{section.title}</h3>
                <div className="prose lg:prose-lg">
                  <RichText htmlString={section.content} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex lg:hidden gap-12 mt-8 justify-center">
          <ArrowGroup
            visibleIdx={visibleIdx}
            setVisibleIdx={setVisibleIdx}
            length={content.length}
          />
        </div>
      </div>
    </Section>
  );
};

export default MiniCarousel;
