import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
/**
 * Props for `ProjectImages`.
 */
export type ProjectImagesProps =
  SliceComponentProps<Content.ProjectImagesSlice>;

/**
 * Component for "ProjectImages" Slices.
 */
const ProjectImages: FC<ProjectImagesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicNextImage field={slice.primary.project_image} />
    </section>
  );
};

export default ProjectImages;
