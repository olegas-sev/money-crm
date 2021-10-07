import store from "../store"
import ru from '../locales/ru.json'
import se from '../locales/se.json'
import en from '../locales/en.json'


const locales = {
    'en-US': en,
    'se-SE': se,
    'ru-RU': ru,
}

export default  function localizeFilter(key) {
    const locale = store.getters.info.locale || 'en-US'
    return locales[locale][key] || `[Localize error]: key ${key} not found`
}