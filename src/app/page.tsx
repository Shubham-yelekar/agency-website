import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { filter } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import FeatuerdProjects from "./components/FeatuerdProjects";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  const projectsResponse = await client.getAllByType("project", {
    filters: [filter.not("my.project.is_featured", false)],
    orderings: {
      field: "my.project.date",
      direction: "asc",
    },
  });

  console.log(projectsResponse);

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />

      <FeatuerdProjects projects={projectsResponse} />
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
