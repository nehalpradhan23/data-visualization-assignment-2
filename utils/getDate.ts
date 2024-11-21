import { format, parse } from "date-fns";

export function getDate(date: string) {
  const parsedDate = parse(date, "dd/MM/yyyy", new Date());
  return format(parsedDate, "dd MMM");
}

export function convertDate(date: string) {
  const parsedDate = parse(date, "dd/MM/yyyy", new Date());
  return format(parsedDate, "MM/dd/yyyy");
}

export const parseDate = (dateString: string) =>
  parse(dateString, "dd/MM/yyyy", new Date());
