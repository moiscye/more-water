import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import es from "dayjs/locale/es";
dayjs.locale(es);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
export const formatDate = (date) => {
  let dayOfWeek = dayjs(date).format("dddd");
  dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  let formattedDate = dayOfWeek + " " + dayjs(date).format("LL");
  return formattedDate;
};

export const dateFrom = (date) => {
  return dayjs(date).fromNow();
};

export const isValidDate = (deliveryDate) => {
  const today = dayjs(new Date());
  const delivery = dayjs(new Date(deliveryDate));
  return delivery.isAfter(today) || delivery.isSame(today, "day")
    ? true
    : false;
};
