"use client";

import ProjectCard from "./ProjectCard";

type FeatuerdProjectsProps = {
  projects: any[];
};
const FeatuerdProjects = ({ projects }: FeatuerdProjectsProps) => {
  return (
    <section className="font-sans text-neutral-500 uppercase">
      <h4>Feature Projects</h4>
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </section>
  );
};

export default FeatuerdProjects;
