import { enUS, ko, ja } from "date-fns/locale";

let locale = 'en';
const supportedLocales = { en: enUS, ko, ja };

export const setLocale = ({ locale: newLocale, fallbackLocale }) => {
	const newLocaleName = newLocale.split('-').shift();
	if(supportedLocales[newLocaleName]) {
		locale = newLocaleName;
		return;
	}

	const fallbackLocaleName = fallbackLocale.split('-').shift();
	if(supportedLocales[fallbackLocaleName]) {
		locale = fallbackLocaleName;
	}
};

export default () => ({ locale: supportedLocales[locale] });
export const getLocale = () => supportedLocales[locale];
