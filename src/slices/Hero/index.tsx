import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative font-mono h-[80vh] overflow-hidden flex items-center justify-center"
    >
      <h1 className="text-neutral-500 uppercase max-w-[600px] text-center">{slice.primary.heading}</h1>
    </section>
  );
};

export default Hero;
