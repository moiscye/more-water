import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import es from "dayjs/locale/es";
dayjs.locale(es);
dayjs.extend(localizedFormat);

export default (date) => {
  let dayOfWeek = dayjs(date).format("dddd");
  dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  let formattedDate = dayOfWeek + " " + dayjs(date).format("LL");
  return formattedDate;
};
