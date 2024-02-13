import {
  Locale,
  differenceInDays,
  format,
  formatDistanceToNowStrict,
} from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';
import * as Localization from 'expo-localization';

const getLocale = (locale: string | null) => {
  if (!locale) return enUS; // Default to enUS if no locale is found

  const localeMap: Record<string, Locale> = {
    en: enUS,
    pt: ptBR,
  };

  return localeMap[locale] || enUS; // Default to enUS if no match is found
};

const dateFnsLocale = getLocale(Localization.getLocales()[0].languageCode);

/**
 *If the date is less than 24 hours ago, it will return the relative hours - e.g. 2 hours ago, 30 minutes ago
 *If the date is less than 7 days ago, it will return the day of the week and the time - e.g. Mon, 2:30 PM
 *If the date is more than 7 days ago, it will return the date and time - e.g. 02/14/2022, 2:30 PM
 */
export const formatRelativeDate = (date: Date): string => {
  if (differenceInDays(new Date(), date) <= 0) {
    return formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: dateFnsLocale,
    });
  }

  if (differenceInDays(new Date(), date) < 7) {
    return format(date, 'ccc, p', {
      locale: dateFnsLocale,
    });
  }

  return format(date, 'PPp', {
    locale: dateFnsLocale,
  });
};
