import React, { useState, useEffect } from "react";

import { Chart } from "@/components/primereact/chart";
import { Title } from "@/components/title";
import { Observium } from "@/types";

type EventsChartProps = {
    hourlyLogs: Observium.TotalDailyLogs[];
};

export const EventsChart = ({ hourlyLogs }: EventsChartProps) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const hours = new Date().getHours();
        const labels = Array(hours + 1)
            .fill(null)
            .map<string>((_, i) => `${`${i}`.padStart(2, "0")}:00`);
        const logsDataset = Array(hours + 1).fill(0);
        const failDataset = Array(hours + 1).fill(0);
        const warnDataset = Array(hours + 1).fill(0);
        hourlyLogs.forEach((hourlyLog) => {
            const { date, logs, warning, error, critical, alert, emergency } = hourlyLog;
            const hourLog = new Date(date).getHours();
            logsDataset[hourLog] = logs;
            warnDataset[hourLog] = warning;
            failDataset[hourLog] = error + critical + alert + emergency;
        });
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
        const data = {
            labels,
            datasets: [
                {
                    label: "Total de logs",
                    data: logsDataset,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--primary-color"),
                },
                {
                    label: "Warnings",
                    data: warnDataset,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--yellow-500"),
                },
                {
                    label: "Falhas (error | critical | alert | emergency)",
                    data: failDataset,
                    fill: false,
                    borderColor: documentStyle.getPropertyValue("--red-500"),
                },
            ],
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };
        setChartData(data);
        setChartOptions(options);
    }, [hourlyLogs]);

    return (
        <div className="card">
            <Title text="Gráfico de eventos" />
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
};
