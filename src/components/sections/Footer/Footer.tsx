import { MarkdownRenderer } from '@/components/elements/MarkdownRenderer/MarkdownRenderer';
import { SNS } from '@/components/elements/SNS/SNS';
import { FooterType } from '@/helpers/types';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data: FooterType;
}

export const Footer: React.FC<Props> = ({ data }) => {
  const {
    logo,
    logoRedirect,
    description,
    copyright,
    sns,
    menu,
    backgroundColor,
    backgroundImage,
    darkMode,
  } = data;
  return (
    <footer
      className={classNames('py-20', {
        [`${backgroundColor}-${darkMode ? 'dark-' : ''}section-bg-color`]:
          backgroundColor,
        'bg-center bg-no-repeat bg-cover bg-blend-multiply': backgroundImage,
        'dark:bg-opacity-10': !darkMode && backgroundColor,
        'dark:bg-slate-900/90': !darkMode && backgroundImage,
        dark: darkMode,
        // "lg:bg-fixed": backgroundImage && parallaxBackground @TODO
      })}
      style={{
        backgroundImage: `url(${backgroundImage?.url})`,
      }}
    >
      <div className="container mx-auto px-4 flex flex-wrap gap-x-5 gap-y-10">
        <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col items-center lg:items-start">
          {logo?.url && (
            <Link href={logoRedirect ?? '/'}>
              <Image
                className="w-40 h-14 object-contain object-top dark:invert dark:filter dark:brightness-0"
                src={logo.url}
                width={160}
                height={56}
                alt={logo.title}
              />
            </Link>
          )}
          {description && (
            <div className="prose text-slate-500 dark:text-slate-100/70 dark:prose-invert">
              <MarkdownRenderer>{description}</MarkdownRenderer>
            </div>
          )}
          {sns && (
            <div className="flex gap-2 mt-8">
              <SNS darkMode={darkMode} data={sns} />
            </div>
          )}
          {copyright && (
            <p
              className={classNames(
                'mt-8 text-slate-500 dark:text-slate-100/70',
              )}
            >
              {copyright}
            </p>
          )}
        </div>
        <div className="grow flex flex-wrap gap-8 justify-center lg:justify-end">
          {menu.map((section, idx) => (
            <div
              key={idx}
              className={classNames(
                'basis-40 flex flex-col gap-2 dark:text-slate-100',
                { 'xl:col-start-10': menu.length === 1 },
              )}
            >
              <div
                className={classNames('font-semibold mb-1 dark:text-slate-100')}
              >
                {section.title}
              </div>
              {section.links.map((link) => (
                <Link
                  key={link.text}
                  href={link.url}
                  className={classNames(
                    'self-start select-none text-slate-500 dark:text-slate-100/70 underline-hover-effect before:bg-primary-600',
                  )}
                  target={link.openNewTab ? '_blank' : '_self'}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
