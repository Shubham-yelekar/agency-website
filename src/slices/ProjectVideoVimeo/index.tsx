import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectVideoVimeo`.
 */
export type ProjectVideoVimeoProps =
  SliceComponentProps<Content.ProjectVideoVimeoSlice>;

/**
 * Component for "ProjectVideoVimeo" Slices.
 */
const ProjectVideoVimeo: FC<ProjectVideoVimeoProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="aspect-video"
    >
      <iframe
        title="vimeo-player"
        src={slice.primary.vimeo_url || undefined}
        width="100%"
        height="100%"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default ProjectVideoVimeo;
