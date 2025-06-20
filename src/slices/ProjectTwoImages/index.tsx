import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
/**
 * Props for `ProjectTwoImages`.
 */
export type ProjectTwoImagesProps =
  SliceComponentProps<Content.ProjectTwoImagesSlice>;

/**
 * Component for "ProjectTwoImages" Slices.
 */
const ProjectTwoImages: FC<ProjectTwoImagesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1"
    >
      <PrismicNextImage field={slice.primary.image_1} />
      <PrismicNextImage field={slice.primary.image_2} />
    </section>
  );
};

export default ProjectTwoImages;
