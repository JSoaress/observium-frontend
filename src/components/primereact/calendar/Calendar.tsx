/* eslint-disable no-restricted-imports */
import { addLocale } from "primereact/api";
import { Calendar as CalendarPR, CalendarProps } from "primereact/calendar";

export const Calendar = (props: CalendarProps) => {
    addLocale("br", {
        firstDayOfWeek: 0,
        dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
        dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
        dayNamesMin: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        monthNames: [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro",
        ],
        monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
        today: "Hoje",
        clear: "Limpar",
    });

    return (
        <CalendarPR
            dateFormat="dd/mm/yy"
            locale="br"
            showIcon
            showButtonBar
            mask="99/99/9999"
            placeholder="dd/mm/aaaa"
            {...props}
        />
    );
};
