// eslint-disable-next-line no-restricted-imports
import { BlockUI as BlockUIPR, BlockUIProps as BlockUIPropsPR } from "primereact/blockui";

export type BlockUIProps = BlockUIPropsPR & {
    loading?: boolean;
};

export const BlockUI = ({ blocked, loading, children, template }: BlockUIProps) => {
    return (
        <BlockUIPR
            blocked={blocked || loading}
            template={loading ? <i className="pi pi-spin pi-spinner" style={{ fontSize: "3rem" }} /> : template}
        >
            {children}
        </BlockUIPR>
    );
};
