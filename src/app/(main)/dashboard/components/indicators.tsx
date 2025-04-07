"use client";
import { CardInfo } from "@/components/card-info";
import { Observium } from "@/types";

type IndicatorsProps = {
    dailyLogs: Observium.TotalDailyLogs | null;
};

export const Indicators = ({ dailyLogs }: IndicatorsProps) => {
    return (
        <>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content title="Total de logs" value={dailyLogs?.logs || 0} />
                    <CardInfo.Icon icon="pi pi-file" color="green" />
                </CardInfo.Header>
            </CardInfo.Root>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content
                        title="Erros / Críticos"
                        value={dailyLogs ? dailyLogs.error + dailyLogs.critical : 0}
                    />
                    <CardInfo.Icon icon="pi pi-times" color="red" />
                </CardInfo.Header>
            </CardInfo.Root>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content title="Warnings" value={dailyLogs?.warn || 0} />
                    <CardInfo.Icon icon="pi pi-exclamation-triangle" color="yellow" />
                </CardInfo.Header>
            </CardInfo.Root>
            <CardInfo.Root lg={6} xl={3}>
                <CardInfo.Header>
                    <CardInfo.Content title="Infos" value={dailyLogs?.info || 0} />
                    <CardInfo.Icon icon="pi pi-exclamation-circle" color="blue" />
                </CardInfo.Header>
            </CardInfo.Root>
        </>
    );
};
