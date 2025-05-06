"use client";
import { CardInfo } from "@/components/card-info";
import { Observium } from "@/types";

type IndicatorsProps = {
    dailyLogs: Observium.TotalDailyLogs | null;
};

export const Indicators = ({ dailyLogs }: IndicatorsProps) => {
    const { logs = 0, info = 0, warning = 0, error = 0, critical = 0, alert = 0, emergency = 0 } = dailyLogs || {};
    return (
        <>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content title="Total de logs" value={logs} />
                    <CardInfo.Icon icon="pi pi-file" color="green" />
                </CardInfo.Header>
            </CardInfo.Root>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content title="Falhas" value={error + critical + alert + emergency} />
                    <CardInfo.Icon icon="pi pi-times" color="red" />
                </CardInfo.Header>
            </CardInfo.Root>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content title="Warnings" value={warning} />
                    <CardInfo.Icon icon="pi pi-exclamation-triangle" color="yellow" />
                </CardInfo.Header>
            </CardInfo.Root>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content title="Infos" value={info} />
                    <CardInfo.Icon icon="pi pi-exclamation-circle" color="blue" />
                </CardInfo.Header>
            </CardInfo.Root>
        </>
    );
};
