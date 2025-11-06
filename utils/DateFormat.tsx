import { format } from "date-fns";
import { enCA, frCA } from "date-fns/locale";
import { utcToZonedTime } from "date-fns-tz";

const locales = {
  "en-CA": enCA,
  "fr-CA": frCA,
};

type LocaleKey = keyof typeof locales;

interface FormattedDateProps {
  dateStr?: string | Date;
  locale?: LocaleKey;
}

export const FormattedDate = ({ dateStr, locale = "en-CA" }: FormattedDateProps) => {
  if (!dateStr) return null;

  const selectedLocale = locales[locale] || enCA;
  const date = new Date(dateStr);
  const formatted = format(date, "MMM yyyy", { locale: selectedLocale }); // 👈 month + full year

  return <>{formatted}</>;
};

interface FormattedTimeProps {
  dateStr?: string | Date;
  locale?: LocaleKey;
  timezone?: string;
}

export const FormattedTime = ({ dateStr, locale = "en-CA", timezone = "-05:00" }: FormattedTimeProps) => {
  if (!dateStr) return null;

  const selectedLocale = locales[locale] || enCA;
  const zonedDate = utcToZonedTime(dateStr, timezone);
  const formattedTime = format(zonedDate, "hh:mm a", {
    locale: selectedLocale,
  });

  return <>{formattedTime}</>;
};
