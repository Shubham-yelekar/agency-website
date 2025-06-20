import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectEmbed`.
 */
export type ProjectEmbedProps = SliceComponentProps<Content.ProjectEmbedSlice>;

/**
 * Component for "ProjectEmbed" Slices.
 */
const ProjectEmbed: FC<ProjectEmbedProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for project_embed (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>

    </section>
  );
};

export default ProjectEmbed;
