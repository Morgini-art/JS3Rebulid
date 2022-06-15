function loadMenuLanguage (menu, languageMenu) {
    return languageMenu;
}

function langConvert(text ,lang) {
    if (lang === 'PL' || lang === 'pl') {
        if (text === 'distance') {
            return 'dystansowa';
        } else if (text === 'melee') {
            return 'wręcz';
        } else if (text === 'empty') {
            return 'pusty';
        } 
    }
}

//Languages
const polishLanguageMenuUi = [
    'Życie:',
    'Twoja broń:',
    'Typ Broni:',
    'Przeładowywanie...'
];
let englishLanguageMenuUi = [
    'Hp:',
    'Your weapon:',
    'Type:',
    'Reloading...'
];
//Languages

export {loadMenuLanguage, polishLanguageMenuUi, englishLanguageMenuUi, langConvert};