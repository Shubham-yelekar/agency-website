"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/prismicio";
import ProjectCard from "../components/ProjectCard";
import { filter } from "@prismicio/client";
export default function Page() {
  const [projects, setProjects] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    industry: "",
    service: "",
    client: "",
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch filters (industries, services, clients) on mount
  useEffect(() => {
    const fetchFilters = async () => {
      const client = createClient();

      const industriesResponse = await client.getAllByType("industry");
      const servicesResponse = await client.getAllByType("service");
      const clientsResponse = await client.getAllByType("client");

      setIndustries(industriesResponse);
      setServices(servicesResponse);
      setClients(clientsResponse);
    };

    fetchFilters();
  }, []);

  // Fetch projects based on filters and pagination
  const fetchProjects = async (reset = false) => {
    setIsLoading(true);
    const client = createClient();

    const filtersArray = [];
    if (filters.industry) {
      filtersArray.push(filter.at("my.project.industries", filters.industry));
    }
    if (filters.service) {
      filtersArray.push(
        filter.at("my.project.project_services.service", filters.service),
      );
    }
    if (filters.client) {
      filtersArray.push(filter.at("my.project.client", filters.client));
    }

    const response = await client.getByType("project", {
      pageSize: 3,
      page: reset ? 1 : page,
      filters: filtersArray, // Pass the array of filter conditions
    });
    console.log("API Response:", response);
    console.log("Filters Array:", filtersArray);
    setProjects((prevProjects) =>
      reset ? response.results : [...prevProjects, ...response.results],
    );
    setPage((prevPage) => (reset ? 2 : prevPage + 1));
    setHasMore(response.results.length > 0);
    setIsLoading(false);
  };
  // Fetch projects on filter change or initial load
  useEffect(() => {
    fetchProjects(true);
  }, [filters]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">All Projects</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        {/* Industry Filter */}
        <select
          value={filters.industry}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, industry: e.target.value }))
          }
          className="rounded border border-gray-300 px-4 py-2"
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry.id} value={industry.id}>
              {industry.data.name}
            </option>
          ))}
        </select>

        {/* Service Filter */}
        <select
          value={filters.service}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, service: e.target.value }))
          }
          className="rounded border border-gray-300 px-4 py-2"
        >
          <option value="">All Services</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.data.name}
            </option>
          ))}
        </select>

        {/* Client Filter */}
        <select
          value={filters.client}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, client: e.target.value }))
          }
          className="rounded border border-gray-300 px-4 py-2"
        >
          <option value="">All Clients</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.data.name}
            </option>
          ))}
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={() => fetchProjects()}
          disabled={isLoading}
          className="text-bold mt-4 bg-white px-4 py-2 text-black"
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
