"use client";
import { useState } from "react";

import { DropdownProjects } from "@/components/dropdown-projects";
import { EmptyPage } from "@/components/empty-page";

import { EventList } from "./components";

const EventsPage = () => {
    const [selectedProject, setSelectedProject] = useState("");

    return (
        <EmptyPage>
            <DropdownProjects value={selectedProject} onChange={(e) => setSelectedProject(e.value)} className="mb-3" />
            <EventList projectId={selectedProject} />
        </EmptyPage>
    );
};

export default EventsPage;
