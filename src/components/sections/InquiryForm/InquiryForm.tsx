"use client";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { Button } from "@/components/elements/Button/Button";
import { InquiryFormType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { InputField } from "./InputField";
import { TextAreaField } from "./TextAreaField";
import { SelectField } from "./SelectField";
import { DatePickerField } from "@/components/elements/DatePickerField/DatePickerField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import { useInView } from "react-hook-inview";
import * as Toast from "@radix-ui/react-toast";

export type FormValues = {
  [x: string]: string | Date | undefined | null;
};

type Props = {
  data: InquiryFormType;
};
export const InquiryForm: React.FC<Props> = ({ data }) => {
  const {
    title,
    heading,
    eyebrow,
    summary,
    description,
    formType,
    fields,
    dateFormat,
    submitButton,
    successMessage,
    errorMessage,
    backgroundColor,
    backgroundImage,
    htmlid,
    appearanceVariant = "horizontal",
    darkMode,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<FormValues>();

  return (
    <>
      <section
        id={htmlid ?? ""}
        className={classNames(
          `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
        )}
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage.url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
              }
            : {}
        }
      >
        <div
          ref={ref}
          className={classNames(
            "container mx-auto px-4 flex flex-col gap-x-10 gap-y-4 my-24",
            {
              "lg:flex-row": appearanceVariant === "horizontal",
            },
            "relative -bottom-10 opacity-0",
            {
              "animate-slidingUpContent animation-delay-150": isIntersecting,
            }
          )}
        >
          <div
            className={classNames("flex flex-col items-center", {
              "lg:w-5/12 lg:items-start": appearanceVariant === "horizontal",
            })}
          >
            {eyebrow && (
              <div
                className={classNames(
                  "tracking-widest font-medium text-center lg:text-start mb-2",
                  { "text-neutral-100": darkMode }
                )}
              >
                {eyebrow}
              </div>
            )}
            {heading && (
              <div
                className={classNames(
                  "text-heading text-center leading-tight font-heading tracking-wide",
                  { "text-neutral-50 drop-shadow-lg": darkMode },
                  { "lg:text-start": appearanceVariant === "horizontal" }
                )}
              >
                <RichText2 data={heading} />
              </div>
            )}
            {summary && (
              <div
                className={classNames(
                  "prose-lg lg:prose-xl max-w-xl lg:max-w-3xl text-center mt-6",
                  { "text-neutral-100": darkMode },
                  { "lg:text-start": appearanceVariant === "horizontal" }
                )}
              >
                {summary}
              </div>
            )}
            {description && (
              <div
                className={classNames("prose xl:prose-lg mt-8", {
                  "text-neutral-100 drop-shadow-lg": darkMode,
                })}
              >
                <RichText2 data={description} />
              </div>
            )}
          </div>
          <div
            className={classNames(
              "col-span-12 flex flex-col",
              { "items-center": appearanceVariant === "vertical" },
              { "lg:w-7/12 lg:items-end": appearanceVariant === "horizontal" },
              "relative -bottom-10 opacity-0",
              {
                "animate-slidingUpContent animation-delay-300": isIntersecting,
              }
            )}
          >
            <form
              className={classNames(
                "bg-white w-full max-w-2xl mx-auto lg:mx-0 grid grid-cols-2 gap-x-5 gap-y-3 px-8 pt-4 pb-12 rounded-assets",
                { "bg-opacity-90": backgroundImage },
                { "gap-x-0": fields.length === 1 },
                {
                  "shadow-radiant":
                    !darkMode && (backgroundColor || backgroundImage),
                }
              )}
              onSubmit={handleSubmit(onSubmitValid)}
            >
              {fields.length > 0 &&
                fields.map((fieldItem) => (
                  <div
                    key={fieldItem.id}
                    className={classNames("relative col-span-2 flex flex-col", {
                      "md:col-span-1": fieldItem.uiWidth === "half-size",
                    })}
                  >
                    <div className="text-xs text-red-500 h-6 pt-1 pl-4">
                      {errors[fieldItem.label]?.type === "required" && (
                        <p>required * </p>
                      )}
                      {errors[fieldItem.label]?.type === "pattern" && (
                        <p>Wrong format. Please try again. </p>
                      )}
                    </div>
                    {fieldItem.helpText && (
                      <div className="text-neutral-800 pl-2 pb-2">
                        {fieldItem.helpText}
                      </div>
                    )}
                    {fieldItem.fieldType === "select" && (
                      <SelectField data={fieldItem} control={control} />
                    )}
                    {fieldItem.fieldType === "date" && (
                      <DatePickerField
                        data={fieldItem}
                        control={control}
                        dateFormat={dateFormat}
                      />
                    )}
                    {fieldItem.fieldType === "datetime" && (
                      <>
                        <DatePickerField
                          data={fieldItem}
                          control={control}
                          showTimeSelect={true}
                          dateFormat={dateFormat}
                        />
                      </>
                    )}
                    {fieldItem.fieldType === "textarea" && (
                      <TextAreaField data={fieldItem} register={register} />
                    )}
                    {fieldItem.fieldType !== "textarea" &&
                      fieldItem.fieldType !== "select" &&
                      fieldItem.fieldType !== "date" &&
                      fieldItem.fieldType !== "datetime" && (
                        <InputField data={fieldItem} register={register} />
                      )}
                  </div>
                ))}
              <input hidden readOnly value={title} {...register("title")} />
              <input
                hidden
                readOnly
                value={formType}
                {...register("formType")}
              />

              <div className={classNames("col-span-2 flex flex-col mt-6")}>
                <Button
                  variant={submitButton?.buttonVariant ?? "black"}
                  withArrow={submitButton?.withArrow}
                  size="lg"
                  type="submit"
                >
                  {submitButton?.text ?? "Submit"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {isSubmitting && (
        <Toast.Provider swipeDirection="right" duration={100000}>
          <Toast.Root className="data-[state=open]:animate-fadeIn">
            <AiOutlineLoading3Quarters
              className="animate-spin text-primary-600"
              size={50}
            />
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col p-6 m-0 w-24 max-w-full z-50" />
        </Toast.Provider>
      )}
      {isSubmitted && isSubmitSuccessful && (
        <Toast.Provider swipeDirection="right" duration={10000}>
          <Toast.Root
            className="relative bg-primary-50 rounded-assets border border-primary-300 shadow-lg p-8 data-[state=open]:animate-fadeIn"
            onOpenChange={(open: boolean) => {
              if (!open) {
                reset();
              }
            }}
          >
            <Toast.Close className="absolute top-2 right-2">
              <IoCloseOutline className="cursor-pointer ml-auto w-10 h-10 p-2 rounded-full text-primary-600 hover:bg-primary-100 transition-all duration-300 ease-in-out" />
            </Toast.Close>
            <IoMdCheckmarkCircleOutline
              className="text-green-600 m-auto"
              size="50"
            />
            <Toast.Title className="mt-4 font-heading xl:text-lg text-center">
              {successMessage}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col m-0 p-4 md:p-6 w-96 max-w-full z-[999999999]" />
        </Toast.Provider>
      )}
      {isSubmitted && !isSubmitSuccessful && (
        <Toast.Provider swipeDirection="right" duration={10000}>
          <Toast.Root className="relative bg-primary-50 rounded-assets border border-primary-300 shadow-lg p-8 data-[state=open]:animate-fadeIn">
            <Toast.Close className="absolute top-2 right-2">
              <IoCloseOutline className="cursor-pointer ml-auto w-10 h-10 p-2 rounded-full text-primary-600 hover:bg-primary-100 transition-all duration-300 ease-in-out" />
            </Toast.Close>
            <RiErrorWarningLine className="text-red-600 m-auto" size="50" />
            <Toast.Title className="mt-4 font-heading xl:text-lg text-center">
              {errorMessage}
            </Toast.Title>
          </Toast.Root>
          <Toast.Viewport className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col m-0 p-4 md:p-6 w-96 max-w-full z-[999999999]" />
        </Toast.Provider>
      )}
    </>
  );
};

async function onSubmitValid(formValues: FormValues) {
  const { title, formType } = formValues;
  delete formValues.title;
  delete formValues.formType;

  for (const key in formValues) {
    if (formValues[key] instanceof Date) {
      formValues[key] = formValues[key]?.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    }
  }
  try {
    await fetch(`/api/inquiry-form-submission/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title,
        formType,
        submittedContent: {
          ...formValues,
        },
      }),
    });
  } catch (err) {
    console.error(err);
  }
}
