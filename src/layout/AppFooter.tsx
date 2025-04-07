import * as dateFns from "date-fns";

import { POWERED_BY } from "@/assets/constants/constants";

import json from "../../package.json";

const AppFooter = () => {
    const formattedVersionDate = dateFns.format(dateFns.parseISO(json.date), "dd/MM/yyyy");

    return (
        <div className="layout-footer">
            <div className="flex justify-content-between flex-wrap">
                <div>
                    Desenvolvido por
                    <a href={POWERED_BY.webSite} target="_blank" className="font-medium ml-2" rel="noreferrer">
                        {POWERED_BY.name}
                    </a>
                </div>
                <div>
                    <span>{`Versão ${json.version} de ${formattedVersionDate}`}</span>
                </div>
            </div>
        </div>
    );
};

export default AppFooter;
