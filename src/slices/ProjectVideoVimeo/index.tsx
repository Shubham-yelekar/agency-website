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
        src={slice.primary.vimeo_url || undefined}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        style={{
          width: "100%",
          height: "100%",
        }}
        title="Tech Product Video 1"
      ></iframe>
    </section>
  );
};

export default ProjectVideoVimeo;
