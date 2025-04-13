"use client";
import { useEffect, useState } from "react";

import { DropdownProjects } from "@/components/dropdown-projects";
import { useHttp } from "@/hooks";
import { HttpResponseHandler } from "@/hooks/useHttp";
import { Observium } from "@/types";

import { Indicators, EventsChart, LastEvents } from "./dashboard";

const Dashboard = () => {
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [dailyLogs, setDailyLogs] = useState<Observium.TotalDailyLogs | null>(null);
    const [hourlyLogs, setHourlyLogs] = useState<Observium.TotalDailyLogs[]>([]);
    const { httpGet } = useHttp();

    useEffect(() => {
        if (!selectedProjectId) return;
        const controller = new AbortController();
        const getDailyLogs = async () => {
            const handlers: HttpResponseHandler<Observium.TotalDailyLogs> = {
                200: ({ data }) => {
                    const result = data!;
                    setDailyLogs(result);
                },
            };
            const url = `/projects/${selectedProjectId}/logs/metrics/daily`;
            await httpGet({ url, signal: controller.signal }, handlers);
        };
        const getHourlyLogs = async () => {
            const handlers: HttpResponseHandler<Observium.TotalDailyLogs[]> = {
                200: ({ data }) => {
                    const result = data!;
                    setHourlyLogs(result);
                },
            };
            const url = `/projects/${selectedProjectId}/logs/metrics/hourly`;
            await httpGet({ url, signal: controller.signal }, handlers);
        };
        getDailyLogs();
        getHourlyLogs();
        const dailyInterval = setInterval(getDailyLogs, 30 * 1000);
        const hourlyInterval = setInterval(getHourlyLogs, 60 * 1000);
        return () => {
            clearInterval(dailyInterval);
            clearInterval(hourlyInterval);
            controller.abort();
        };
    }, [httpGet, selectedProjectId]);

    return (
        <>
            <DropdownProjects value={selectedProjectId} onChange={(e) => setSelectedProjectId(e.value)} className="mb-3" />
            <div className="grid">
                <Indicators dailyLogs={dailyLogs} />
                <div className="col-12 md:col-12 xl:col-8">
                    <EventsChart hourlyLogs={hourlyLogs} />
                </div>
                <div className="col-12 md:col-12 xl:col-4">
                    <LastEvents projectId={selectedProjectId} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
