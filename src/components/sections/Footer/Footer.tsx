import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"

interface FooterProps {
  data: {
    logo: {
      url: string
      altText: string
    }
    copyright?: string
    sns: Array<{
      url: string
      icon: {
        url: string
        altText: string
      }
    }>
    sections: Array<{
      title?:  string
      links: Array<{
        text: string
        url: string
      }>
    }>
  }
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const { logo, copyright, sns, sections } = data
  return (
    <footer className="grid grid-cols-12 gap-x-5 gap-y-10 pt-6 pb-20 px-4 md:px-8 lg:px-20 xl:px-32">
      <div className="col-span-12 lg:col-span-6 xl:col-span-4 flex flex-col items-center lg:items-start">
        <Link href="/">
          <Image
            className="w-40 h-14 object-contain object-top"
            src={logo.url}
            width={160}
            height={56}
            alt={logo.altText}
          />
        </Link>
        <p className="text-slate-500">
          {copyright}
        </p>
        <div className="flex gap-2 mt-5">
          {sns.map((item, idx) => (
            <div key={idx}>
              <Link href={item.url}>
                <Image
                  src={item.icon.url}
                  width={30}
                  height={30}
                  alt={item.icon.altText}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {sections.map((section, idx) => (
        <div key={idx} className={classNames(
          "col-span-6 lg:col-span-3 xl:col-span-2 flex flex-col gap-2",
          { "xl:col-start-10": sections.length === 1},
        )}>
          <p className="font-semibold mb-1">{section.title}</p>
          {section.links.map(link => (
            <p key={link.text} className="text-slate-600">
              <Link href={link.url}>
                {link.text}
              </Link>
            </p>
          ))}
        </div>
      ))}
    </footer>
  )
}

export default Footer