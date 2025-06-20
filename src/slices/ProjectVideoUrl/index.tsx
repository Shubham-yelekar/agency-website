import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ProjectVideoUrl`.
 */
export type ProjectVideoUrlProps =
  SliceComponentProps<Content.ProjectVideoUrlSlice>;

/**
 * Component for "ProjectVideoUrl" Slices.
 */
const ProjectVideoUrl: FC<ProjectVideoUrlProps> = ({ slice }) => {
  console.log(slice.primary.video_url);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <video
        data-v-de352f4a=""
        data-v-4fefa748=""
        className="media item inview"
        src={slice.primary.video_url || undefined}
        loop
        autoPlay
        playsInline
        crossOrigin="anonymous"
        data-inview="data-inview"
        data-inview-clip="data-inview-clip"
      ></video>
    </section>
  );
};

export default ProjectVideoUrl;
