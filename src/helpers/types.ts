export type MediaType = {
  id: string;
  url: string;
  title: string;
  width: number;
  height: number;
  contentType: string;
};
export type SNSType = {
  linkedInUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
};

export type AlignmentType = 'start' | 'center' | 'end';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'black'
  | 'white'
  | 'ghost'
  | 'outline'
  | 'outline-black'
  | 'outline-white';

export type ButtonType = {
  id?: string;
  buttonLabel: string;
  url: string | null;
  openNewTab: boolean;
  icon?: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  withArrow: boolean;
  buttonVariant: ButtonVariant;
};

export type LinkType = {
  id: string;
  text: string;
  image: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  url: string;
  openNewTab: boolean;
  contentType: 'link';
};

export interface LinkGroupType {
  id: string;
  title: string;
  links: Array<LinkType>;
  contentType: 'linkgroup';
}

export interface SubmenuType {
  id: string;
  title: string;
  menu: Array<LinkType | LinkGroupType>;
  featuredContent: Array<PageType>;
  layout: 'dropdown' | 'mega';
  contentType: 'submenu';
}

export type NavigationLayout = 'standard' | 'minimal' | 'overlay';
export interface NavigationType {
  url: string;
  logo: MediaType;
  logoRedirect: string | null;
  menu: Array<LinkType | SubmenuType>;
  showModeSelector: boolean;
  buttons: Array<ButtonType>;
  hotButtons: Array<ButtonType>;
  layout: 'standard' | 'minimal' | 'overlay';
  darkMode: boolean;
}

export interface FooterType {
  url: string;
  logo: MediaType | null;
  logoRedirect: string | null;
  description: string | null;
  copyright: string | null;
  sns: SNSType | null;
  menu: Array<LinkGroupType>;
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  darkMode: boolean;
}

export type SEOType = {
  metaTitle: string;
  metaDescription: string;
  sharedImage: {
    url: string;
    title: string;
    width: number;
    height: number;
  };
};

export type PageContentType =
  | HeroType
  | AlertType
  | ContentListType
  | FeaturedContentType;

export type PageType = {
  id: string;
  title: string;
  url: string;
  content: Array<PageContentType>;
  fontMain: string;
  fontHeading: string;
  headingFontSize: 'standard' | 'standout' | 'impactful';
  colorPrimary: string | null;
  colorSecondary: string | null;
  borderRadius: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: Array<string> | null;
  metaImage: MediaType | null;
  contentType: 'page';
};

export type ExpertType = {
  id: string;
  fullName: string;
  portrait: MediaType | null;
  role: string | null;
  specialization: Array<string> | null;
  organization: string | null;
  summary: string | null;
  sns: SNSType | null;
  alignment: AlignmentType;
  layout: 'horizontal' | 'vertical';
  contentType: 'expert';
};

export type MediaAspectRatioType =
  | 'auto'
  | 'square'
  | '16/9'
  | '4/3'
  | '3/4'
  | '3/2';

export type FeaturedContentType = {
  id: string;
  title: string;
  htmlid: string;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  media: Array<MediaType>;
  mediaAspectRatio: MediaAspectRatioType;
  switchMediaPosition: 'left' | 'right';
  blocks: Array<BlockType>;
  buttons: Array<ButtonType>;
  alignment: AlignmentType;
  layout: 'flex row' | 'full top';
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  showBottomSeparator: boolean;
  contentType: 'featuredcontent';
};

export type HeroLayoutVariant = 'overlay' | 'vertical' | 'horizontal';

export type HeroType = {
  id: string;
  htmlid: string | null;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  buttons: Array<ButtonType>;
  media: MediaType | null;
  layout: 'horizontal' | 'vertical';
  alignment: AlignmentType;
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  showBottomSeparator: boolean;
  contentType: 'hero';
};

export type AlertType = {
  id: string;
  icon: MediaType | null;
  message: string | null;
  backgroundColor: string | null;
  darkMode: boolean;
  contentType: 'alert';
};

export type StatisticsType = {
  id: string;
  number: string;
  text: string;
  alignment: AlignmentType;
  layout: 'horizontal' | 'vertical';
  contentType: 'statistics';
};

export type TestimonialType = {
  id: string;
  content: string | null;
  portrait: MediaType | null;
  name: string | null;
  role: string | null;
  rating: 0 | 1 | 2 | 3 | 4 | 5 | null;
  alignment: AlignmentType;
  layout: 'horizontal' | 'vertical';
  size: 'base' | 'lg' | 'xl';
  contentType: 'testimonial';
};

export type FlexibleContentType = {
  id: string;
  eyebrow: string | null;
  displayTitle: string | null;
  tags: Array<string> | null;
  summary: string | null;
  buttons: Array<ButtonType>;
  redirectUrl: string | null;
  media: Array<MediaType>;
  mediaAspectRatio: MediaAspectRatioType;
  alignment: AlignmentType;
  layout: 'horizontal' | 'vertical';
  contentType: 'flexiblecontent';
};

export type PricingPlanType = {
  id: string;
  title: string;
  pricing: string;
  pricingSuffix: string;
  badge: string;
  description: string | null;
  ctaButton: ButtonType;
  alignment: AlignmentType;
  contentType: 'pricingplan';
};

export type QAType = {
  id: string;
  question: string;
  answer: string;
  isExpanded: boolean;
  contentType: 'qa';
};

export type BlockType =
  | ExpertType
  | StatisticsType
  | FlexibleContentType
  | PricingPlanType
  | TestimonialType
  | FormType
  | QAType;

export type ItemsPerViewType = '1' | '2' | '3' | '4' | '5';

export type ContentListType = {
  id: string;
  eyebrow: string | null;
  displayTitle: string | null;
  summary: string | null;
  buttons: Array<ButtonType>;
  alignment: AlignmentType;
  blocks: Array<BlockType>;
  itemsPerView: ItemsPerViewType;
  displayMode: 'carousel' | 'masonry' | 'deck';
  layout: 'flex row' | 'full top';
  backgroundColor: string | null;
  backgroundImage: MediaType | null;
  enableParallaxEffect: boolean;
  darkMode: boolean;
  marginTop: '-lg' | '-md' | '-sm' | 'none' | 'sm' | 'md' | 'lg' | null;
  marginBottom: '-lg' | '-md' | '-sm' | 'none' | 'sm' | 'md' | 'lg' | null;
  showBottomSeparator: boolean;
  htmlid: string | null;
  contentType: 'contentlist';
};

export type FormFieldType = {
  id: string;
  label: string;
  fieldType:
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'date'
    | 'datetime'
    | 'textarea'
    | 'select';
  options: Array<string>;
  required: boolean;
  placeholder: string;
  helpText: string;
  uiWidth: 'half-size' | 'full-size';
};

export type FormType = {
  id: string;
  title: string;
  fields: Array<FormFieldType>;
  submitButton: ButtonType | null;
  formType: string;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
  successMessage: string | null;
  errorMessage: string | null;
  contentType: 'form';
};
