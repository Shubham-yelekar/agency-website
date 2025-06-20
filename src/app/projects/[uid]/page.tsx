import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { components } from "@/slices";

type ProjectPageProps = {
  params: { uid: string };
};

export default async function ProjectPage(context: {
  params: { uid: string };
}) {
  const { params } = context; // Await params if necessary
  const { uid } = params;
  const client = createClient();

  const project = await client.getByUID("project", uid).catch(() => null);

  if (!project) {
    notFound();
  }

  return (
    <div className="font-mono text-neutral-400">
      <h1 className="text-neutral-50"> {project.data.name}</h1>
      <p className="text-neutral-50 uppercase">{project.data.client.uid}</p>
      <h1>
        <PrismicRichText field={project.data.description} />
      </h1>
      <p className="text-neutral-50 uppercase">{project.data.industries.uid}</p>
      <p className="text-neutral-50 uppercase">
        {project.data.project_services
          .map((s: any) => s.service.slug)
          .join(", ")}
      </p>
      <div>
        <SliceZone slices={project.data.slices} components={components} />
      </div>
    </div>
  );
}
