// Created by minhwpm (minhhien134@gmail.com)
// AccordionPT = Accordion Presentation

"use client";
import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import Section from "@/components/elements/Section/Section";
import { PresentationType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";
import Button from "@/components/elements/Button/Button";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import "./styles.css";

const AccordionPT: React.FC<{ data: PresentationType }> = ({ data }) => {
  const { label, title, subtitle, content } = data;
  return (
    <Section label={label} title={title} subtitle={subtitle}>
      <div className="w-full flex flex-col gap-10">
        <RadixAccordion.Root
          type="multiple"
          className={classNames(
            "w-full lg:w-[800px] mx-auto flex flex-col items-start justify-center gap-6"
          )}
        >
          {content.length > 0 &&
            content.map((section) => (
              <RadixAccordion.Item
                key={section.title}
                value={section.title}
                className={classNames(
                  "w-full rounded-assets border",
                  "data-[state=closed]:hover:bg-primary-50"
                )}
              >
                <RadixAccordion.Trigger
                  key={section.title}
                  value={section.title}
                  asChild
                >
                  <div className="py-4 px-6 cursor-pointer">
                    <h3 className="block font-semibold text-2xl">
                      {section.title}
                    </h3>
                  </div>
                </RadixAccordion.Trigger>
                <RadixAccordion.Content className={classNames("overflow-hidden px-10 pt-5 pb-10",
                  "data-[state=closed]:animate-accordionSlideUp",
                  "data-[state=open]:animate-accordionSlideDown",
                )}>
                  <div className="prose lg:prose-lg">
                    <RichText htmlString={section.content} />
                  </div>
                  {section.ctaButton && (
                    <div className="my-6">
                      <Button
                        key={section.ctaButton?.id}
                        variant={section.ctaButton?.buttonVariant}
                        url={section.ctaButton?.url}
                      >
                        {section.ctaButton?.text}
                      </Button>
                    </div>
                  )}
                  {section.media.length > 0 && (
                    <div className="max-w-xl mx-auto">
                      <MediaCarousel data={section.media} />
                    </div>
                  )}
                </RadixAccordion.Content>
              </RadixAccordion.Item>
            ))}
        </RadixAccordion.Root>
      </div>
    </Section>
  );
};

export default AccordionPT;
