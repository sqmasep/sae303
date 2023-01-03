import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const dateFormat = (date: Date | string) => {
  return format(new Date(date), "PPP", { locale: fr });
};
