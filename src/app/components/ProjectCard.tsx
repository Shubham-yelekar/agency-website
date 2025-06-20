import React from "react";
import Link from "next/link";

const ProjectCard = ({ project }: any) => {
  return (
    <Link href={`/projects/${project.uid}`}>
      <img src={project.data.cover_image.url} />
      <div className="grid grid-cols-2 text-sm">
        <h3>
          <span className="text-neutral-100">{project.data.client.slug}</span>
        </h3>

        <h3 className="text-right text-neutral-100">
          {project.data.industries.slug}
        </h3>
        <h3>
          <span className="text-red-500">{project.data.name}</span>
        </h3>

        <h3 className="text-right text-neutral-100">
          {project.data.project_services.map((s: any) => s.service.slug)}
        </h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
