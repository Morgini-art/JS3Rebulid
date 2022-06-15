/**
 * @licencja
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation i inni współtwórcy <https://openjsf.org/>
 * Wydany na licencji MIT <https://lodash.com/license>
 * Na podstawie Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Prawa autorskie Jeremy Ashkenas, DocumentCloud oraz reporterzy i redaktorzy śledczy
 */
;(funkcja() {

  /** Używany jako bezpieczne odniesienie dla „niezdefiniowanych” w środowiskach wcześniejszych niż ES5. */
  var niezdefiniowane;

  /** Używany jako semantyczny numer wersji. */
  var WERSJA = '4.17.15';

  /** Używany jako rozmiar umożliwiający optymalizację dużych tablic. */
  var LARGE_ARRAY_SIZE = 200;

  /** Stałe komunikatów o błędach. */
  var CORE_ERROR_TEXT = 'Nieobsługiwane użycie core-js. Wypróbuj https://npms.io/search?q=ponyfill. ',
      FUNC_ERROR_TEXT = 'Oczekiwana funkcja';

  /** Używany jako zastępstwo dla „niezdefiniowanych” wartości skrótu. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Używany jako maksymalny rozmiar pamięci podręcznej memoize. */
  zmienna MAX_MEMOIZE_SIZE = 500;

  /** Używany jako wewnętrzny symbol zastępczy argumentu. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** Używane do tworzenia masek bitowych do klonowania. */
  zmienna CLONE_DEEP_FLAG = 1,
      KLON_FLAT_FLAG = 2,
      KLON_SYMBOL_FLAG = 4;

  /** Używane do tworzenia masek bitowych do porównywania wartości. */
  zmienna COMPARE_PARTIAL_FLAG = 1,
      COMPARE_UNORDERED_FLAG = 2;

  /** Używany do tworzenia masek bitowych dla metadanych funkcji. */
  zmienna WRAP_BIND_FLAG = 1,
      WRAP_BIND_KEY_FLAG = 2,
      WRAP_CURRY_BOUND_FLAG = 4,
      WRAP_CURRY_FLAG = 8,
      WRAP_CURRY_RIGHT_FLAG = 16,
      WRAP_PARTIAL_FLAG = 32,
      WRAP_PARTIAL_RIGHT_FLAG = 64,
      WRAP_ARY_FLAG = 128,
      WRAP_REARG_FLAG = 256,
      WRAP_FLIP_FLAG = 512;

  /** Używane jako domyślne opcje dla `_.truncate`. */
  zmienna DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMSSION = '...';

  /** Służy do wykrywania aktywnych funkcji na podstawie liczby wywołań w ciągu milisekund. */
  zmienna HOT_COUNT = 800,
      GORĄCY_SPAN = 16;

  /** Używane do wskazania typu leniwych iteracji. */
  zmienna LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2,
      LAZY_WHILE_FLAG = 3;

  /** Używane jako referencje dla różnych stałych `Number`. */
  var NIESKOŃCZONOŚĆ = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991,
      MAX_INTEGER = 1.7976931348623157e+308,
      NAN = 0 / 0;

  /** Używane jako referencje dla maksymalnej długości i indeksu tablicy. */
  zmienna MAX_ARRAY_LENGTH = 4294967295,
      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

  /** Używane do kojarzenia metod zawijania z ich flagami bitowymi. */
  var wrapFlags = [
    ['ary', WRAP_ARY_FLAG],
    ['wiąż', WRAP_BIND_FLAG],
    ['bindKey', WRAP_BIND_KEY_FLAG],
    ['curry', WRAP_CURRY_FLAG],
    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
    ['flip', WRAP_FLIP_FLAG],
    ['częściowy', WRAP_PARTIAL_FLAG],
    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
    ['rearg', WRAP_REARG_FLAG]
  ];

  /** Odwołania do wyników `Object#toString`. */
  var argsTag = '[argumenty obiektu]',
      arrayTag = '[tablica obiektów]',
      asyncTag = '[obiekt AsyncFunction]',
      boolTag = '[obiekt logiczny]',
      dateTag = '[data obiektu]',
      domExcTag = '[obiekt DOMException]',
      errorTag = '[Błąd obiektu]',
      funcTag = '[Funkcja obiektu]',
      genTag = '[funkcja generatora obiektów]',
      mapTag = '[mapa obiektów]',
      numberTag = '[numer obiektu]',
      nullTag = '[obiekt Null]',
      objectTag = '[obiekt obiektu]',
      obietnicaTag = '[obietnica Obietnica]',
      proxyTag = '[proxy obiektu]',
      regexpTag = '[object RegExp]',
      setTag = '[Zbiór obiektów]',
      stringTag = '[ciąg obiektu]',
      symbolTag = '[Symbol obiektu]',
      undefinedTag = '[obiekt Niezdefiniowany]',
      słabyMapTag = '[obiekt WeakMap]',
      słabyZestawTag = '[obiekt WeakSet]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[obiekt Float32Array]',
      float64Tag = '[obiekt Float64Array]',
      int8Tag = '[obiekt Int8Array]',
      int16Tag = '[obiekt Int16Array]',
      int32Tag = '[obiekt Int32Array]',
      uint8Tag = '[obiekt Uint8Array]',
      uint8ClampedTag = '[obiekt Uint8ClampedArray]',
      uint16Tag = '[obiekt Uint16Array]',
      uint32Tag = '[obiekt Uint32Array]';

  /** Używany do dopasowywania pustych literałów ciągu w skompilowanym źródle szablonu. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Używany do dopasowywania jednostek HTML i znaków HTML. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
      reUnescapedHtml = /[&<>"']/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Używane do dopasowywania ograniczników szablonów. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      ponowna ocena = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Służy do dopasowywania nazw właściwości w ścieżkach właściwości. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1) \]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[ ^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Używane do dopasowania `RegExp`
   * [znaki składni](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
      reHasRegExpChar = RegExp(reRegExpChar.źródło);

  /** Służy do dopasowywania początkowych i końcowych białych znaków. */
  var reTrim = /^\s+|\s+$/g,
      reTrimStart = /^\s+/,
      reTrimEnd = /\s+$/;

  /** Używany do dopasowywania komentarzy szczegółów zawijania. */
  var reWrapComment = /\{(?:\n\/\* \[z .+\] \*\/)?\n?/,
      reWrapDetails = /\{\n\/\* \[opakowane z (.+)\] \*/,
      reSplitDetails = /,? & /;

  /** Używany do dopasowywania słów składających się ze znaków alfanumerycznych. */
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

  /** Używany do dopasowywania ukośników odwrotnych w ścieżkach właściwości. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Używane do dopasowania
   * [Ograniczniki szablonów ES](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
   */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Używany do dopasowywania flag `RegExp` z ich wymuszonych wartości łańcuchowych. */
  var reFlags = /\w*$/;

  /** Służy do wykrywania złych podpisanych wartości ciągu szesnastkowego. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Używany do wykrywania wartości ciągu binarnego. */
  var reIsBinary = /^0b[01]+$/i;

  /** Służy do wykrywania konstruktorów hosta (Safari). */
  var reIsHostCtor = /^\[obiekt .+?Konstruktor\]$/;

  /** Używany do wykrywania ósemkowych wartości łańcuchów. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Służy do wykrywania wartości całkowitych bez znaku. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /** Używany do dopasowywania łacińskich liter Unicode (z wyłączeniem operatorów matematycznych). */
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

  /** Służy do zapewnienia kolejności przechwytywania ograniczników szablonu. */
  var reNoMatch = /($^)/;

  /** Używany do dopasowywania znaków bez ucieczki w skompilowanych literałach ciągu. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Używane do tworzenia klas znaków Unicode. */
  var rsAstralRange = '\\ud800-\\udfff',
      rsComboMarksRange = '\\u0300-\\u036f',
      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
      rsComboSymbolsRange = '\\u20d0-\\u20ff',
      rsComboZakres = rsComboZnakiZakres + reComboPółznakiZakres + rsKomboSymboleZakres,
      rsDingbatRange = '\\u2700-\\u27bf',
      rsLowerRange = 'az\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = '\\u2000-\\u206f',
      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\n\\r\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\ u2004\\u2005\u2006\\u2007\\u2008\\u2009\\u200a\u202f\u205f\u3000',
      rsUpperRange = 'AZ\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange = '\\ufe0e\\ufe0f',
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsInterpunkcjaZakres + rsSpaceRange;

  /** Używane do tworzenia grup przechwytywania Unicode. */
  var rsApos = "['\u2019]",
      rsAstral = '[' + rsAstralRange + ']',
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo = '[' + rsComboRange + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz = '\\ud83c[\\udffb-\\udfff]',
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange + ']',
      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ = „d”;

  /** Używane do tworzenia wyrażeń regularnych Unicode. */
  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange + ']?',
      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsOrdLower = '\\d*(?:1st|2.|3.|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

  /** Używane do dopasowywania apostrofów. */
  var reApos = RegExp(rsApos, 'g');

  /**
   * Używane do dopasowania [łączenia znaków diakrytycznych](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) i
   * [łączenie znaków diakrytycznych z symbolami](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */
  var reComboMark = RegExp(rsCombo, 'g');

  /** Używany do dopasowywania [symboli ciągu](https://mathiasbynens.be/notes/javascript-unicode). */
  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

  /** Używany do dopasowywania słów złożonych lub złożonych. */
  var reUnicodeWord = Wyrażenie regularne([
    rsGórne + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
    rsGórne + '?' + rsMiscLower + '+' + rsOptContrLower,
    rsUpper + '+' + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rscyfry,
    rsEmoji
  ].join('|'), 'g');

  /** Służy do wykrywania ciągów z [łącznikami o zerowej szerokości lub punktami kodowymi z płaszczyzn astralnych](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');

  /** Używany do wykrywania łańcuchów, które wymagają bardziej niezawodnego wyrażenia regularnego do dopasowania słów. */
  var reHasUnicodeWord = /[az][AZ]|[AZ]{2}[az]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a -zA-Z0-9 ]/;

  /** Używany do przypisywania domyślnych właściwości obiektu „kontekstu”. */
  var kontekstProps = [
    „Tablica”, „Bufor”, „Widok danych”, „Data”, „Błąd”, „Float32Array”, „Float64Array”,
    „Funkcja”, „Int8Array”, „Int16Array”, „Int32Array”, „Mapa”, „Math”, „Object”,
    „Promise”, „RegExp”, „Set”, „String”, „Symbol”, „TypeError”, „Uint8Array”,
    „Uint8ClampedArray”, „Uint16Array”, „Uint32Array”, „WeakMap”,
    „_”, „clearTimeout”, „isFinite”, „parseInt”, „setTimeout”
  ];

  /** Służy do ułatwienia identyfikacji źródłowych adresów URL szablonów. */
  var licznik szablonów = -1;

  /** Służy do identyfikowania wartości `toStringTag` wpisanych tablic. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = prawda;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /** Służy do identyfikowania wartości `toStringTag` obsługiwanych przez `_.clone`. */
  var cloneableTags = {};
  CloneableTags[argsTag] = klonowaneTags[arrayTag] =
  CloneableTags[arrayBufferTag] = klonowaneTags[dataViewTag] =
  cloneableTags[boolTag] = klonowaneTags[dateTag] =
  CloneableTags[float32Tag] = klonowalneTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numerTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = klonowaneTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = klonowaneTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

  /** Służy do mapowania łacińskich liter Unicode na podstawowe litery łacińskie. */
  var oszlifowaneLitery = {
    // Blok dodatku Latin-1.
    '\xc0': 'A', '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a', '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C', '\xe7': 'c',
    '\xd0': 'D', '\xf0': 'd',
    '\xc8': 'E', '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e', ​​'\xe9': 'e', ​​'\xea': 'e', ​​'\xeb': 'e',
    '\xcc': 'ja', '\xcd': 'ja', '\xce': 'ja', '\xcf': 'ja',
    '\xec': 'i', '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N', '\xf1': 'n',
    '\xd2': 'O', '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': „O”,
    '\xf2': 'o', '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': „o”,
    '\xd9': 'U', '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u', '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y', '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'Ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss',
    // Łaciński blok rozszerzony-A.
    „\u0100”: „A”, „\u0102”: „A”, „\u0104”: „A”,
    „\u0101”: „a”, „\u0103”: „a”, „\u0105”: „a”,
    „\u0106”: „C”, „\u0108”: „C”, „\u010a”: „C”, „\u010c”: „C”,
    „\u0107”: „c”, „\u0109”: „c”, „\u010b”: „c”, „\u010d”: „c”,
    „\u010e”: „D”, „\u0110”: „D”, „\u010f”: „d”, „\u0111”: „d”,
    „\u0112”: „E”, „\u0114”: „E”, „\u0116”: „E”, „\u0118”: „E”, „\u011a”: „E”,
    „\u0113”: „e”, „\u0115”: „e”, „\u0117”: „e”, „\u0119”: „e”, „\u011b”: „e”,
    „\u011c”: „G”, „\u011e”: „G”, „\u0120”: „G”, „\u0122”: „G”,
    „\u011d”: „g”, „\u011f”: „g”, „\u0121”: „g”, „\u0123”: „g”,
    „\u0124”: „H”, „\u0126”: „H”, „\u0125”: „h”, „\u0127”: „h”,
    „\u0128”: „ja”, „\u012a”: „ja”, „\u012c”: „ja”, „\u012e”: „ja”, „\u0130”: „ja”,
    „\u0129”: „i”, „\u012b”: „i”, „\u012d”: „i”, „\u012f”: „i”, „\u0131”: „i”,
    „\u0134”: „J”, „\u0135”: „j”,
    „\u0136”: „K”, „\u0137”: „k”, „\u0138”: „k”,
    „\u0139”: „L”, „\u013b”: „L”, „\u013d”: „L”, „\u013f”: „L”, „\u0141”: „L”,
    „\u013a”: „l”, „\u013c”: „l”, „\u013e”: „l”, „\u0140”: „l”, „\u0142”: „l”,
    „\u0143”: „N”, „\u0145”: „N”, „\u0147”: „N”, „\u014a”: „N”,
    „\u0144”: „n”, „\u0146”: „n”, „\u0148”: „n”, „\u014b”: „n”,
    „\u014c”: „O”, „\u014e”: „O”, „\u0150”: „O”,
    „\u014d”: „o”, „\u014f”: „o”, „\u0151”: „o”,
    „\u0154”: „R”, „\u0156”: „R”, „\u0158”: „R”,
    „\u0155”: „r”, „\u0157”: „r”, „\u0159”: „r”,
    „\u015a”: „S”, „\u015c”: „S”, „\u015e”: „S”, „\u0160”: „S”,
    „\u015b”: „s”, „\u015d”: „s”, „\u015f”: „s”, „\u0161”: „s”,
    „\u0162”: „T”, „\u0164”: „T”, „\u0166”: „T”,
    „\u0163”: „t”, „\u0165”: „t”, „\u0167”: „t”,
    „\u0168”: „U”, „\u016a”: „U”, „\u016c”: „U”, „\u016e”: „U”, „\u0170”: „U”, „\u0172”: "U",
    „\u0169”: „u”, „\u016b”: „u”, „\u016d”: „u”, „\u016f”: „u”, „\u0171”: „u”, „\u0173”: "u",
    „\u0174”: „W”, „\u0175”: „w”,
    „\u0176”: „Y”, „\u0177”: „y”, „\u0178”: „Y”,
    „\u0179”: „Z”, „\u017b”: „Z”, „\u017d”: „Z”,
    „\u017a”: „z”, „\u017c”: „z”, „\u017e”: „z”,
    „\u0132”: „IJ”, „\u0133”: „ij”,
    „\u0152”: „oe”, „\u0153”: „oe”,
    '\u0149': "'n", '\u017f': 's'
  };

  /** Używany do mapowania znaków na encje HTML. */
  var htmlEscapes = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    "'": '''
  };

  /** Używany do mapowania encji HTML na znaki. */
  var htmlUnescapes = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '"',
    ''': "'"
  };

  /** Używany do ucieczki znaków do włączenia w skompilowane literały ciągu. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    „\u2028”: „u2028”,
    „\u2029”: „u2029”
  };

  /** Wbudowane odwołania do metod bez zależności od `root`. */
  var freeParseFloat = parseFloat,
      freeParseInt = parseInt;

  /** Wykryj wolną zmienną `global` z Node.js. */
  var freeGlobal = typ globalny == 'obiekt' && globalny && globalny.Object === Obiekt && globalny;

  /** Wykryj wolną zmienną `self`. */
  var freeSelf = typeof self == 'obiekt' && self && self.Object === Obiekt && self;

  /** Używany jako referencja do obiektu globalnego. */
  var root = freeGlobal || freeSelf || Funkcja('zwróć to')();

  /** Wykryj wolne zmienne `exporty`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Wykryj wolną zmienną `module`. */
  var freeModule = freeExports && typeof module == 'obiekt' && moduł && !module.nodeType && module;

  /** Wykryj popularne rozszerzenie CommonJS `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Wykryj wolną zmienną `process` z Node.js. */
  var freeProcess = moduleExports && freeGlobal.process;

  /** Służy do uzyskiwania dostępu do szybszych pomocników Node.js. */
  var nodeUtil = (funkcja() {
    próbować {
      // Użyj `util.types` dla Node.js 10+.
      var types = freeModule && freeModule.require && freeModule.require('util').types;

      jeśli (typy) {
        typy zwracane;
      }

      // Starszy `process.binding('util')` dla Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } złapać (e) {}
  }());

  /* Referencje pomocnika Node.js. */
  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
      nodeIsDate = nodeUtil && nodeUtil.isDate,
      nodeIsMap = nodeUtil && nodeUtil.isMap,
      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
      nodeIsSet = nodeUtil && nodeUtil.isSet,
      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /*------------------------------------------------ --------------------------*/

  /**
   * Szybsza alternatywa dla `Function#apply`, ta funkcja wywołuje `func`
   * z `this` wiązaniem `thisArg` i argumentami `args`.
   *
   * @prywatne
   * @param {Funkcja} func Funkcja do wywołania.
   * @param {*} thisArg `to` powiązanie `func`.
   * @param {Array} args Argumenty do wywołania funkcji `func`.
   * @returns {*} Zwraca wynik funkcji `func`.
   */
  function apply(func, thisArg, args) {
    przełącznik (args.length) {
      przypadek 0: zwróć func.call(thisArg);
      przypadek 1: return func.call(thisArg, args[0]);
      przypadek 2: return func.call(thisArg, args[0], args[1]);
      przypadek 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /**
   * Specjalistyczna wersja `baseAggregator` dla tablic.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * @param {Function} setter Funkcja ustawiania wartości `akumulatora`.
   * @param {Function} iteratee Iteracja do przekształcenia kluczy.
   * Akumulator @param {Object} Początkowy zagregowany obiekt.
   * @returns {Funkcja} Zwraca `akumulator`.
   */
  function arrayAggregator(array, setter, iteratee, accumulator) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość;

    while (++indeks < długość) {
      wartość zmiennej = tablica[indeks];
      setter(akumulator, wartość, iteracja(wartość), tablica);
    }
    akumulator zwrotny;
  }

  /**
   * Specjalistyczna wersja `_.forEach` dla tablic bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @returns {Array} Zwraca `tablic`.
   */
  function arrayEach(tablica, iteracja) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość;

    while (++indeks < długość) {
      if (iteracja(tablica[indeks], indeks, tablica) === false) {
        złamać;
      }
    }
    tablica zwrotów;
  }

  /**
   * Specjalistyczna wersja `_.forEachRight` dla tablic bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @returns {Array} Zwraca `tablic`.
   */
  function arrayEachRight(tablica, iteracja) {
    długość zmiennej = tablica == null ? 0 : tablica.długość;

    podczas gdy (długość--) {
      if (iteratee(tablica[długość], długość, tablica) === false) {
        złamać;
      }
    }
    tablica zwrotów;
  }

  /**
   * Specjalistyczna wersja `_.every` dla tablic bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * Predykat @param {Function} Funkcja wywoływana na iterację.
   * @returns {boolean} Zwraca `true` jeśli wszystkie elementy przejdą kontrolę predykatu,
   * w przeciwnym razie `fałsz`.
   */
  function arrayEvery(tablica, predykat) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość;

    while (++indeks < długość) {
      if (!predicate(tablica[indeks], indeks, tablica)) {
        zwróć fałsz;
      }
    }
    zwróć prawdę;
  }

  /**
   * Specjalistyczna wersja `_.filter` dla tablic bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * Predykat @param {Function} Funkcja wywoływana na iterację.
   * @returns {Array} Zwraca nową przefiltrowaną tablicę.
   */
  function arrayFilter(tablica, predykat) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość,
        indeks res = 0,
        wynik = [];

    while (++indeks < długość) {
      wartość zmiennej = tablica[indeks];
      if (predykat(wartość, indeks, tablica)) {
        wynik[index++] = wartość;
      }
    }
    zwróć wynik;
  }

  /**
   * Specjalistyczna wersja `_.includes` dla tablic bez obsługi
   * określenie indeksu do wyszukiwania.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do sprawdzenia.
   * @param {*} target Wartość do wyszukania.
   * @returns {boolean} Zwraca „true”, jeśli „target” zostanie znaleziony, w przeciwnym razie „false”.
   */
  function arrayIncludes(tablica, wartość) {
    długość zmiennej = tablica == null ? 0 : tablica.długość;
    return !!długość && baseIndexOf(tablica, wartość, 0) > -1;
  }

  /**
   * Ta funkcja jest podobna do funkcji „arrayIncludes”, z wyjątkiem tego, że akceptuje komparator.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do sprawdzenia.
   * @param {*} target Wartość do wyszukania.
   * Komparator @param {Function} Komparator wywoływany dla każdego elementu.
   * @returns {boolean} Zwraca „true”, jeśli „target” zostanie znaleziony, w przeciwnym razie „false”.
   */
  function arrayIncludesWith(tablica, wartość, komparator) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość;

    while (++indeks < długość) {
      if (comparator(wartość, tablica[indeks])) {
        zwróć prawdę;
      }
    }
    zwróć fałsz;
  }

  /**
   * Specjalistyczna wersja `_.map` dla tablic bez obsługi iteracji
   * skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @returns {Array} Zwraca nową zamapowaną tablicę.
   */
  function arrayMap(tablica, iteracja) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość,
        wynik = Tablica(długość);

    while (++indeks < długość) {
      wynik[indeks] = iteratee(tablica[indeks], indeks, tablica);
    }
    zwróć wynik;
  }

  /**
   * Dołącza elementy `values` do `array`.
   *
   * @prywatne
   * @param {Array} tablica Tablica do zmodyfikowania.
   * @param {Array} wartości Wartości do dołączenia.
   * @returns {Array} Zwraca `tablic`.
   */
  function arrayPush(tablica, wartości) {
    indeks zm = -1,
        długość = wartości.długość,
        przesunięcie = tablica.długość;

    while (++indeks < długość) {
      tablica[przesunięcie + indeks] = wartości[indeks];
    }
    tablica zwrotów;
  }

  /**
   * Specjalistyczna wersja `_.reduce` dla tablic bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @param {*} [akumulator] Wartość początkowa.
   * @param {boolean} [initAccum] Określ używając pierwszego elementu `array` jako
   * wartość początkowa.
   * @returns {*} Zwraca skumulowaną wartość.
   */
  function arrayReduce(tablica, iteracja, akumulator, initAccum) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość;

    if (initAccum && length) {
      akumulator = tablica[++indeks];
    }
    while (++indeks < długość) {
      akumulator = iteratee(akumulator, tablica[indeks], indeks, tablica);
    }
    akumulator zwrotny;
  }

  /**
   * Specjalistyczna wersja `_.reduceRight` dla tablic bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @param {*} [akumulator] Wartość początkowa.
   * @param {boolean} [initAccum] Określ używając ostatniego elementu `array` jako
   * wartość początkowa.
   * @returns {*} Zwraca skumulowaną wartość.
   */
  function arrayReduceRight(tablica, iteracja, akumulator, initAccum) {
    długość zmiennej = tablica == null ? 0 : tablica.długość;
    if (initAccum && length) {
      akumulator = tablica[--długość];
    }
    podczas gdy (długość--) {
      akumulator = iteracja(akumulator, tablica[długość], długość, tablica);
    }
    akumulator zwrotny;
  }

  /**
   * Specjalistyczna wersja `_.some` dla tablic bez obsługi iteratee
   * skróty.
   *
   * @prywatne
   * @param {Array} [tablica] Tablica do iteracji.
   * Predykat @param {Function} Funkcja wywoływana na iterację.
   * @returns {boolean} Zwraca `true` jeśli jakikolwiek element przejdzie kontrolę predykatu,
   * w przeciwnym razie `fałsz`.
   */
  function arraySome(tablica, predykat) {
    indeks zm = -1,
        długość = tablica == null ? 0 : tablica.długość;

    while (++indeks < długość) {
      if (predykat(tablica[indeks], indeks, tablica)) {
        zwróć prawdę;
      }
    }
    zwróć fałsz;
  }

  /**
   * Pobiera rozmiar „ciągu” ASCII.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg sprawdza.
   * @returns {liczba} Zwraca rozmiar ciągu.
   */
  var asciiSize = baseProperty('długość');

  /**
   * Konwertuje „ciąg” ASCII na tablicę.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg do konwersji.
   * @returns {Array} Zwraca przekonwertowaną tablicę.
   */
  function asciiToArray(ciąg) {
    return string.split('');
  }

  /**
   * Dzieli `ciąg` ASCII na tablicę jego słów.
   *
   * @prywatne
   * @param {ciąg} Ciąg do sprawdzenia.
   * @returns {Array} Zwraca słowa `string`.
   */
  function asciiWords(ciąg) {
    return string.match(reAsciiWord) || [];
  }

  /**
   * Podstawowa implementacja metod takich jak `_.findKey` i `_.findLastKey`,
   * bez obsługi skrótów iteracyjnych, które powtarzają `collection`
   * za pomocą `eachFunc`.
   *
   * @prywatne
   * Kolekcja @param {Array|Object} Kolekcja do sprawdzenia.
   * Predykat @param {Function} Funkcja wywoływana na iterację.
   * @param {Funkcja} eachFunc Funkcja do iteracji po `kolekcji`.
   * @returns {*} Zwraca znaleziony element lub jego klucz, w przeciwnym razie `undefined`.
   */
  function baseFindKey(collection, predicate, eachFunc) {
    var wynik;
    eachFunc(kolekcja, funkcja(wartość, klucz, kolekcja) {
      if (predykat(wartość, klucz, kolekcja)) {
        wynik = klucz;
        zwróć fałsz;
      }
    });
    zwróć wynik;
  }

  /**
   * Podstawowa implementacja `_.findIndex` i `_.findLastIndex` bez
   * obsługa skrótów iteracyjnych.
   *
   * @prywatne
   * @param {Array} tablica Tablica do sprawdzenia.
   * Predykat @param {Function} Funkcja wywoływana na iterację.
   * @param {number} fromIndex Indeks, z którego ma być wyszukiwane.
   * @param {boolean} [fromRight] Określ iterację od prawej do lewej.
   * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
   */
  function baseFindIndex(tablica, predykat, fromIndex, fromRight) {
    zmienna długość = tablica.długość,
        index = fromIndex + (fromRight ? 1 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      if (predykat(tablica[indeks], indeks, tablica)) {
        indeks zwrotu;
      }
    }
    powrót -1;
  }

  /**
   * Podstawowa implementacja `_.indexOf` bez sprawdzania granic `fromIndex`.
   *
   * @prywatne
   * @param {Array} tablica Tablica do sprawdzenia.
   * @param {*} wartość Wartość do wyszukania.
   * @param {number} fromIndex Indeks, z którego ma być wyszukiwane.
   * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
   */
  function baseIndexOf(tablica, wartość, fromIndex) {
    zwracana wartość === wartość
      ? strictIndexOf(tablica; wartość; fromIndex)
      : baseFindIndex(tablica, baseIsNaN, fromIndex);
  }

  /**
   * Ta funkcja jest podobna do `baseIndexOf` z tą różnicą, że akceptuje komparator.
   *
   * @prywatne
   * @param {Array} tablica Tablica do sprawdzenia.
   * @param {*} wartość Wartość do wyszukania.
   * @param {number} fromIndex Indeks, z którego ma być wyszukiwane.
   * Komparator @param {Function} Komparator wywoływany dla każdego elementu.
   * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
   */
  function baseIndexOfWith(tablica, wartość, fromIndex, komparator) {
    indeks var = fromIndex - 1,
        długość = tablica.długość;

    while (++indeks < długość) {
      if (komparator(tablica[indeks], wartość)) {
        indeks zwrotu;
      }
    }
    powrót -1;
  }

  /**
   * Podstawowa implementacja `_.isNaN` bez obsługi obiektów liczbowych.
   *
   * @prywatne
   * @param {*} wartość Wartość do sprawdzenia.
   * @returns {boolean} Zwraca „prawda”, jeśli „wartość” to „NaN”, w przeciwnym razie „fałsz”.
   */
  funkcja podstawaIsNaN(wartość) {
    zwracana wartość !== wartość;
  }

  /**
   * Podstawowa implementacja `_.mean` i `_.meanBy` bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} tablica Tablica do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @returns {liczba} Zwraca średnią.
   */
  function baseMean(tablica, iteracja) {
    długość zmiennej = tablica == null ? 0 : tablica.długość;
    długość powrotu ? (baseSum(tablica, iteracja) / długość) : NAN;
  }

  /**
   * Podstawowa implementacja `_.property` bez obsługi głębokich ścieżek.
   *
   * @prywatne
   * @param {string} klucz Klucz właściwości do pobrania.
   * @returns {Funkcja} Zwraca nową funkcję akcesora.
   */
  function baseProperty(klucz) {
    funkcja powrotu (obiekt) {
      zwróć obiekt == null ? niezdefiniowany : obiekt[klucz];
    };
  }

  /**
   * Podstawowa implementacja `_.propertyOf` bez obsługi głębokich ścieżek.
   *
   * @prywatne
   * @param {Object} obiekt Obiekt do zapytania.
   * @returns {Funkcja} Zwraca nową funkcję akcesora.
   */
  function basePropertyOf(object) {
    funkcja powrotu (klucz) {
      zwróć obiekt == null ? niezdefiniowany : obiekt[klucz];
    };
  }

  /**
   * Podstawowa implementacja `_.reduce` i `_.reduceRight`, bez wsparcia
   * dla skrótów iteracyjnych, które iterują po `collection` używając `eachFunc`.
   *
   * @prywatne
   * Kolekcja @param {Array|Object} Kolekcja do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @param {*} akumulator Wartość początkowa.
   * @param {boolean} initAccum Określ używając pierwszego lub ostatniego elementu
   * `kolekcja` jako wartość początkowa.
   * @param {Funkcja} eachFunc Funkcja do iteracji po `kolekcji`.
   * @returns {*} Zwraca skumulowaną wartość.
   */
  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
    eachFunc(kolekcja, funkcja(wartość, indeks, kolekcja) {
      akumulator = initAccum
        ? (initAccum = fałsz, wartość)
        : iteratee(akumulator, wartość, indeks, kolekcja);
    });
    akumulator zwrotny;
  }

  /**
   * Podstawowa implementacja `_.sortBy`, która używa `comparer` do zdefiniowania
   * porządek sortowania `tablicy` i zamienia obiekty kryteriów na odpowiadające im
   * wartości.
   *
   * @prywatne
   * @param {Array} tablica Tablica do sortowania.
   * @param {Funkcja} porównująca Funkcja definiująca porządek sortowania.
   * @returns {Array} Zwraca `tablic`.
   */
  function baseSortBy(tablica, porównująca) {
    zmienna długość = tablica.długość;

    tablica.sort(porównywarka);
    podczas gdy (długość--) {
      tablica[długość] = tablica[długość].wartość;
    }
    tablica zwrotów;
  }

  /**
   * Podstawowa implementacja `_.sum` i `_.sumBy` bez obsługi
   * iteracyjne skróty.
   *
   * @prywatne
   * @param {Array} tablica Tablica do iteracji.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @returns {liczba} Zwraca sumę.
   */
  function baseSum(tablica, iteracja) {
    var wynik,
        indeks = -1,
        długość = tablica.długość;

    while (++indeks < długość) {
      var current = iteratee(tablica[indeks]);
      if (bieżący !== niezdefiniowany) {
        wynik = wynik === niezdefiniowany ? aktualny : (wynik + aktualny);
      }
    }
    zwróć wynik;
  }

  /**
   * Podstawowa implementacja `_.times` bez obsługi skrótów iteracyjnych
   * lub sprawdzanie maksymalnej długości tablicy.
   *
   * @prywatne
   * @param {liczba} n Ile razy wywołać `iterację`.
   * @param {Function} iteratee Funkcja wywoływana na iterację.
   * @returns {Array} Zwraca tablicę wyników.
   */
  function baseTimes(n, iteratee) {
    indeks zm = -1,
        wynik = tablica (n);

    while (++indeks < n) {
      wynik[indeks] = iteracja(indeks);
    }
    zwróć wynik;
  }

  /**
   * Podstawowa implementacja `_.toPairs` i `_.toPairsIn`, która tworzy tablicę
   * par klucz-wartość dla „obiektu” odpowiadających nazwom właściwości „props”.
   *
   * @prywatne
   * @param {Object} obiekt Obiekt do zapytania.
   * @param {Array} props Nazwy właściwości, dla których pobierane są wartości.
   * @returns {Obiekt} Zwraca pary klucz-wartość.
   */
  function baseToPairs(obiekt, rekwizyty) {
    return arrayMap(props, function(key) {
      return [klucz, obiekt[klucz]];
    });
  }

  /**
   * Podstawowa implementacja `_.unary` bez obsługi przechowywania metadanych.
   *
   * @prywatne
   * @param {Funkcja} func Funkcja ograniczająca argumenty.
   * @returns {Funkcja} Zwraca nową ograniczoną funkcję.
   */
  funkcja podstawowaJednoargumentowa(funkcja) {
    funkcja zwrotu (wartość) {
      zwróć func(wartość);
    };
  }

  /**
   * Podstawowa implementacja `_.values` i `_.valuesIn`, która tworzy
   * tablica wartości właściwości `object` odpowiadających nazwom właściwości
   * z `rekwizytów`.
   *
   * @prywatne
   * @param {Object} obiekt Obiekt do zapytania.
   * @param {Array} props Nazwy właściwości, dla których pobierane są wartości.
   * @returns {Object} Zwraca tablicę wartości właściwości.
   */
  function baseValues(obiekt, rekwizyty) {
    return arrayMap(props, function(key) {
      zwróć obiekt[klucz];
    });
  }

  /**
   * Sprawdza, czy istnieje wartość `cache` dla `key`.
   *
   * @prywatne
   * Pamięć podręczna @param {Object} Pamięć podręczna do zapytania.
   * @param {string} klucz Klucz wpisu do sprawdzenia.
   * @returns {boolean} Zwraca `true` jeśli istnieje wpis dla `key`, w przeciwnym razie `false`.
   */
  funkcja cacheMa(pamięć podręczna, klucz) {
    return cache.ma(klucz);
  }

  /**
   * Używany przez `_.trim` i `_.trimStart` do pobrania indeksu pierwszego symbolu ciągu
   * którego nie ma w symbolach znaków.
   *
   * @prywatne
   * @param {Array} strSymbols Symbole ciągu do sprawdzenia.
   * @param {Array} chrSymbols Symbole znaków do znalezienia.
   * @returns {liczba} Zwraca indeks pierwszego niedopasowanego symbolu ciągu.
   */
  function charsStartIndex(strSymbols, chrSymbols) {
    indeks zm = -1,
        długość = strSymbole.długość;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[indeks], 0) > -1) {}
    indeks zwrotu;
  }

  /**
   * Używany przez `_.trim` i `_.trimEnd` do pobrania indeksu ostatniego symbolu ciągu
   * którego nie ma w symbolach znaków.
   *
   * @prywatne
   * @param {Array} strSymbols Symbole ciągu do sprawdzenia.
   * @param {Array} chrSymbols Symbole znaków do znalezienia.
   * @returns {liczba} Zwraca indeks ostatniego niedopasowanego symbolu ciągu.
   */
  function charsEndIndex(strSymbols, chrSymbols) {
    indeks var = strSymbols.length;

    while (index-- && baseIndexOf(chrSymbols, strSymbols[indeks], 0) > -1) {}
    indeks zwrotu;
  }

  /**
   * Pobiera liczbę wystąpień `placeholder` w `array`.
   *
   * @prywatne
   * @param {Array} tablica Tablica do sprawdzenia.
   * Symbol zastępczy @param {*} Symbol zastępczy do wyszukania.
   * @returns {liczba} Zwraca liczbę symboli zastępczych.
   */
  function countHolders(tablica, symbol zastępczy) {
    zmienna długość = tablica.długość,
        wynik = 0;

    podczas gdy (długość--) {
      if (tablica[długość] === symbol zastępczy) {
        ++wynik;
      }
    }
    zwróć wynik;
  }

  /**
   * Używany przez `_.deburr` do konwersji dodatku Latin-1 i Latin Extended-A
   * litery do podstawowych liter łacińskich.
   *
   * @prywatne
   * @param {string} letter Dopasowana litera do usunięcia zadziorów.
   * @returns {string} Zwraca usuniętą literę.
   */
  var deburrLetter = basePropertyOf(deburredLetters);

  /**
   * Używany przez `_.escape` do konwersji znaków na encje HTML.
   *
   * @prywatne
   * @param {string} chr Dopasowany znak do ucieczki.
   * @returns {string} Zwraca znak ucieczki.
   */
  var escapeHtmlChar = basePropertyOf(htmlEscapes);

  /**
   * Używany przez `_.template` do zmiany znaczenia znaków w celu włączenia ich do skompilowanych literałów łańcuchowych.
   *
   * @prywatne
   * @param {string} chr Dopasowany znak do ucieczki.
   * @returns {string} Zwraca znak ucieczki.
   */
  funkcja escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Pobiera wartość z `klucza` obiektu `object`.
   *
   * @prywatne
   * @param {Obiekt} [obiekt] Obiekt do zapytania.
   * @param {string} klucz Klucz właściwości do pobrania.
   * @returns {*} Zwraca wartość właściwości.
   */
  function getValue(obiekt, klucz) {
    zwróć obiekt == null ? niezdefiniowany : obiekt[klucz];
  }

  /**
   * Sprawdza, czy ciąg znaków zawiera symbole Unicode.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg do sprawdzenia.
   * @returns {boolean} Zwraca `true`, jeśli zostanie znaleziony symbol, w przeciwnym razie `false`.
   */
  funkcja ma Unicode(ciąg) {
    zwróć reHasUnicode.test(ciąg);
  }

  /**
   * Sprawdza, czy `string` zawiera słowo złożone z symboli Unicode.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg do sprawdzenia.
   * @returns {boolean} Zwraca `true`, jeśli słowo zostanie znalezione, w przeciwnym razie `false`.
   */
  funkcja hasUnicodeWord(ciąg) {
    return reHasUnicodeWord.test(ciąg);
  }

  /**
   * Konwertuje `iterator` na tablicę.
   *
   * @prywatne
   * Iterator @param {Object} Iterator do konwersji.
   * @returns {Array} Zwraca przekonwertowaną tablicę.
   */
  funkcja iteratorToArray(iterator) {
    dane var,
        wynik = [];

    while (!(dane = iterator.next()).done) {
      wynik.push(dane.wartość);
    }
    zwróć wynik;
  }

  /**
   * Konwertuje „mapę” na jej pary klucz-wartość.
   *
   * @prywatne
   * @param {Object} map Mapa do konwersji.
   * @returns {Array} Zwraca pary klucz-wartość.
   */
  funkcja mapToArray(mapa) {
    indeks zm = -1,
        wynik = Array(mapa.rozmiar);

    map.forEach(funkcja(wartość, klucz) {
      wynik[++indeks] = [klucz, wartość];
    });
    zwróć wynik;
  }

  /**
   * Tworzy funkcję jednoargumentową, która wywołuje `func` z przekształconym argumentem.
   *
   * @prywatne
   * @param {Funkcja} func Funkcja do zawijania.
   * @param {Funkcja} transform Argument transformacja.
   * @returns {Funkcja} Zwraca nową funkcję.
   */
  function overArg(func, transform) {
    funkcja powrotu(arg) {
      return func(transform(arg));
    };
  }

  /**
   * Zamienia wszystkie elementy `placeholder` w `array` na wewnętrzny placeholder
   * i zwraca tablicę ich indeksów.
   *
   * @prywatne
   * @param {Array} tablica Tablica do zmodyfikowania.
   * @param {*} symbol zastępczy Symbol zastępczy do zastąpienia.
   * @returns {Array} Zwraca nową tablicę indeksów zastępczych.
   */
  function replaceHolders(tablica, symbol zastępczy) {
    indeks zm = -1,
        długość = tablica.długość,
        indeks res = 0,
        wynik = [];

    while (++indeks < długość) {
      wartość zmiennej = tablica[indeks];
      if (wartość === symbol zastępczy || wartość === PLACEHOLDER) {
        tablica[indeks] = PLACEHOLDER;
        wynik[index++] = indeks;
      }
    }
    zwróć wynik;
  }

  /**
   * Konwertuje `set` na tablicę jego wartości.
   *
   * @prywatne
   * @param {Object} set Zestaw do konwersji.
   * @returns {Array} Zwraca wartości.
   */
  funkcja setToArray(set) {
    indeks zm = -1,
        wynik = Tablica(zestaw.rozmiar);

    set.forEach(funkcja(wartość) {
      wynik[++indeks] = wartość;
    });
    zwróć wynik;
  }

  /**
   * Konwertuje `set` na jego pary wartość-wartość.
   *
   * @prywatne
   * @param {Object} set Zestaw do konwersji.
   * @returns {Array} Zwraca pary wartość-wartość.
   */
  funkcja setToPairs(set) {
    indeks zm = -1,
        wynik = Tablica(zestaw.rozmiar);

    set.forEach(funkcja(wartość) {
      wynik[++indeks] = [wartość, wartość];
    });
    zwróć wynik;
  }

  /**
   * Specjalistyczna wersja `_.indexOf`, która wykonuje ścisłą równość
   * porównania wartości, czyli `===`.
   *
   * @prywatne
   * @param {Array} tablica Tablica do sprawdzenia.
   * @param {*} wartość Wartość do wyszukania.
   * @param {number} fromIndex Indeks, z którego ma być wyszukiwane.
   * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
   */
  function strictIndexOf(tablica, wartość, fromIndex) {
    indeks var = fromIndex - 1,
        długość = tablica.długość;

    while (++indeks < długość) {
      if (tablica[indeks] === wartość) {
        indeks zwrotu;
      }
    }
    powrót -1;
  }

  /**
   * Specjalistyczna wersja `_.lastIndexOf`, która wykonuje ścisłą równość
   * porównania wartości, czyli `===`.
   *
   * @prywatne
   * @param {Array} tablica Tablica do sprawdzenia.
   * @param {*} wartość Wartość do wyszukania.
   * @param {number} fromIndex Indeks, z którego ma być wyszukiwane.
   * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
   */
  function strictLastIndexOf(tablica, wartość, fromIndex) {
    indeks var = fromIndex + 1;
    podczas gdy (indeks--) {
      if (tablica[indeks] === wartość) {
        indeks zwrotu;
      }
    }
    indeks zwrotu;
  }

  /**
   * Pobiera liczbę symboli w „ciągu”.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg do sprawdzenia.
   * @returns {liczba} Zwraca rozmiar ciągu.
   */
  function stringSize(ciąg) {
    return hasUnicode(ciąg)
      ? unicodeRozmiar(ciąg)
      : asciiRozmiar(ciąg);
  }

  /**
   * Konwertuje `ciąg` na tablicę.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg do konwersji.
   * @returns {Array} Zwraca przekonwertowaną tablicę.
   */
  function stringToArray(ciąg) {
    return hasUnicode(ciąg)
      ? unicodeToArray(ciąg)
      : asciiToArray(ciąg);
  }

  /**
   * Używany przez `_.unescape` do konwersji encji HTML na znaki.
   *
   * @prywatne
   * @param {string} chr Dopasowany znak do cofnięcia ucieczki.
   * @returns {string} Zwraca znak bez zmiany ucieczki.
   */
  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

  /**
   * Pobiera rozmiar „ciągu” Unicode.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg sprawdza.
   * @returns {liczba} Zwraca rozmiar ciągu.
   */
  funkcja rozmiar unicode(ciąg) {
    var wynik = reUnicode.lastIndex = 0;
    while (reUnicode.test(ciąg)) {
      ++wynik;
    }
    zwróć wynik;
  }

  /**
   * Konwertuje „ciąg” Unicode na tablicę.
   *
   * @prywatne
   * @param {ciąg} ciąg Ciąg do konwersji.
   * @returns {Array} Zwraca przekonwertowaną tablicę.
   */
  function unicodeToArray(ciąg) {
    return string.match(reUnicode) || [];
  }

  /**
   * Dzieli `ciąg` Unicode na tablicę jego słów.
   *
   * @prywatne
   * @param {ciąg} Ciąg do sprawdzenia.
   * @returns {Array} Zwraca słowa `string`.
   */
  function unicodeWords(ciąg) {
    return string.match(reUnicodeWord) || [];
  }

  /*------------------------------------------------ --------------------------*/

  /**
   * Utwórz nową, nieskazitelną funkcję `lodash` za pomocą obiektu `context`.
   *
   * @statyczny
   * @członkiem _
   * @od 1.1.0
   * @kategoria Util
   * @param {Obiekt} [context=root] Obiekt kontekstu.
   * @returns {Funkcja} Zwraca nową funkcję `lodash`.
   * @przykład
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunkcja(_.foo);
   * // => prawda
   * _.isFunkcja(_.bar);
   * // => fałsz
   *
   * lodash.isFunction(lodash.foo);
   * // => fałsz
   * lodash.isFunction(lodash.bar);
   * // => prawda
   *
   * // Utwórz suped-up `defer` w Node.js.
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  var runInContext = (funkcja runInContext(context) {
    kontekst = kontekst == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

    /** Wbudowane referencje konstruktora. */
    var Array = context.Array,
        Data = kontekst.Data,
        Błąd = kontekst.Błąd,
        Funkcja = kontekst.Funkcja,
        Matematyka = kontekst.Matematyka,
        Obiekt = kontekst.Obiekt,
        Wyrażenie regularne = kontekst.Wyrażenie regularne,
        Ciąg = kontekst. Ciąg,
        TypeError = context.TypeError;

    /** Używany do wbudowanych odwołań do metod. */
    var arrayProto = Array.prototype,
        funcProto = Funkcja.prototyp,
        obiektProto = Obiekt.prototyp;

    /** Używany do wykrywania zbyt dużych podkładek core-js. */
    var coreJsData = context['__core-js_shared__'];

    /** Używany do rozwiązywania zdekompilowanego źródła funkcji. */
    var funcToString = funcProto.toString;

    /** Służy do sprawdzania obiektów pod kątem własnych właściwości. */
    var maWłasnąWłaściwość = obiektProto.posiadaWłasnąWłaściwość;

    /** Używane do generowania unikalnych identyfikatorów. */
    var licznik id = 0;

    /** Używane do wykrywania metod podszywających się pod natywne. */
    var maskSrcKey = (funkcja() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
      zwrot uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Używane do rozwiązania
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * wartości.
     */
    var nativeObjectToString = objectProto.toString;

    /** Używany do wywnioskowania konstruktora `Object`. */
    var CiągKtoraObiektu = funcToString.call(Obiekt);

    /** Używany do przywracania oryginalnego odwołania `_` w `_.noConflict`. */
    var staryDash = root._;

    /** Służy do wykrywania, czy metoda jest natywna. */
    var reIsNative = RegExp('^' +
      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(funkcja).*?(?=\\\()| dla .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Wbudowane odwołania do wartości. */
    var Buffer = modułEksporty ? context.Buffer : niezdefiniowany,
        Symbol = kontekst.Symbol,
        Uint8Array = context.Uint8Array,
        allocUnsafe = Bufor ? Buffer.allocUnsafe : niezdefiniowany,
        getPrototype = overArg(Object.getPrototypeOf, Object),
        objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        splice = arrayProto.splice,
        spreadableSymbol = Symbol ? Symbol.isConcatRozkładalny : niezdefiniowany,
        symIterator = Symbol ? Symbol.iterator : niezdefiniowany,
        symToStringTag = Symbol ? Symbol.toStringTag : niezdefiniowany;

    var defineProperty = (funkcja() {
      próbować {
        var func = getNative(Obiekt, 'defineProperty');
        func({}, '', {});
        funkcja powrotu;
      } złapać (e) {}
    }());

    /** Mockowane wbudowane. */
    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
        ctxNow = Data && Data.teraz !== root.Data.teraz && Data.teraz,
        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

    /* Wbudowane referencje metod dla tych o tej samej nazwie co inne metody `lodash`. */
    var nativeCeil = Math.ceil,
        nativeFloor = Math.floor,
        nativeGetSymbols = Object.getOwnPropertySymbols,
        nativeIsBuffer = Bufor ? Buffer.isBuffer : niezdefiniowany,
        nativeIsFinite = context.isFinite,
        nativeJoin = arrayProto.join,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max,
        natywnyMin = Matematyka.min,
        nativeNow = Data.teraz,
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random,
        nativeReverse = arrayProto.reverse;

    /* Wbudowane odwołania do metod, które zostały zweryfikowane jako natywne. */
    var DataView = getNative(context, 'DataView'),
        Mapa = getNative(kontekst, 'Mapa'),
        Promise = getNative(context, 'Promise'),
        Ustaw = getNative(kontekst, 'Ustaw'),
        WeakMap = getNative(context, 'WeakMap'),
        nativeCreate = getNative(Object, 'create');

    /** Używany do przechowywania metadanych funkcji. */
    var metaMap = WeakMap && new WeakMap;

    /** Używany do wyszukiwania niezminimalizowanych nazw funkcji. */
    var realNames = {};

    /** Służy do wykrywania map, zestawów i słabych map. */
    var dataViewCtorString = toSource(DataView),
        mapCtorString = toSource(Mapa),
        obietnicaCtorString = toSource(Promise),
        setCtorString = toSource(Set),
        słabyMapCtorString = toSource(SłabaMapa);

    /** Używany do konwersji symboli na prymitywy i łańcuchy. */
    var symbolProto = Symbol ? Symbol.prototype : niezdefiniowany,
        symbolValueOf = symbolProto ? symbolProto.valueOf : niezdefiniowany,
        symbolToString = symbolProto ? symbolProto.toString : niezdefiniowany;

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy obiekt `lodash`, który zawija `wartość`, aby włączyć metodę niejawną
     * sekwencje łańcuchowe. Metody operujące i zwracające tablice, kolekcje,
     * i funkcje można ze sobą łączyć. Metody pobierające pojedynczą wartość
     * lub może zwrócić pierwotną wartość, automatycznie zakończy sekwencję łańcucha
     * i zwróć nieopakowaną wartość. W przeciwnym razie wartość musi zostać rozwinięta
     * z `_#wartość`.
     *
     * Jawne sekwencje łańcuchowe, które muszą być rozpakowane za pomocą `_#value`, mogą być
     * włączone za pomocą `_.chain`.
     *
     * Wykonywanie metod połączonych jest leniwe, to znaczy jest odroczone do
     * `_#value` jest wywoływana niejawnie lub jawnie.
     *
     * Ocena z opóźnieniem pozwala na kilka metod obsługi skrótów.
     * Fuzja skrótów to optymalizacja do łączenia połączeń iteracyjnych; to pozwala uniknąć
     * tworzenie macierzy pośrednich i może znacznie zmniejszyć liczbę
     * iteracyjne egzekucje. Odcinki ciągu łańcuchowego kwalifikują się do skrótu
     * fuzja, jeśli sekcja jest zastosowana do tablicy, a iteracje akceptują tylko
     * jeden argument. Heurystyka określająca, czy sekcja kwalifikuje się do skrótu
     * fuzja może ulec zmianie.
     *
     * Tworzenie łańcuchów jest obsługiwane w niestandardowych kompilacjach, o ile metoda `_#value` jest
     * bezpośrednio lub pośrednio zawarte w kompilacji.
     *
     * Oprócz metod lodash wrappery mają metody `Array` i `String`.
     *
     * Opakowujące metody `Array` to:
     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice` i `unshift`
     *
     * Metody opakowujące `String` to:
     * `zamień` i `podziel`
     *
     * Metody opakowujące obsługujące fuzję skrótów to:
     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile` i `toArray`
     *
     * Metody owijarek łańcuchowych to:
     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRright`, `rearg`, `reject`,
     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
     * `plaster`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
     * `valuesIn`, `bez`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
     * `zipObject`, `zipObjectDeep` i `zipWith`
     *
     * Metody opakowujące, których **nie** nie można domyślnie tworzyć w łańcuchu, to:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
     * `defaultTo`, `dzielenie`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
     * `hasIn`, `head`, `tożsamość`, `includes`, `indexOf`, `inRange`, `invoke`,
     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
     * „isNumber”, „isObject”, „isObjectLike”, „isPlainObject”, „isRegExp”,
     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
     * `powtórz`, `wynik`, `okrągły`, `runInContext`, `sample`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
     * `górne pierwsze`, `wartość` i `słowa`
     *
     * @nazwać _
     * @konstruktor
     * @kategoria Seq
     * @param {*} wartość Wartość, która ma zostać zawinięta w instancję `lodash`.
     * @returns {Object} Zwraca nową instancję opakowania `lodash`.
     * @przykład
     *
     * kwadrat funkcji (n) {
     * powrót n * n;
     * }
     *
     * var opakowane = _([1, 2, 3]);
     *
     * // Zwraca nieopakowaną wartość.
     * opakowane.redukuj(_.dodaj);
     * // => 6
     *
     * // Zwraca opakowaną wartość.
     * var kwadraty = opakowane.map(kwadrat);
     *
     * _.isArray(kwadraty);
     * // => fałsz
     *
     * _.isArray(kwadraty.wartość());
     * // => prawda
     */
    funkcja lodash(wartość) {
      if (isObjectLike(wartość) && !isArray(wartość) && !(wartość instancji LazyWrapper)) {
        if (wartość wystąpienia LodashWrappera) {
          wartość zwrotu;
        }
        if (hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(wartość);
        }
      }
      zwróć nowy LodashWrapper(wartość);
    }

    /**
     * Podstawowa implementacja `_.create` bez obsługi przypisywania
     * właściwości tworzonego obiektu.
     *
     * @prywatne
     * @param {Object} proto Obiekt, z którego ma dziedziczyć.
     * @returns {Obiekt} Zwraca nowy obiekt.
     */
    var baseCreate = (funkcja() {
      obiekt funkcji() {}
      funkcja powrotu (proto) {
        if (!isObject(proto)) {
          zwrócić {};
        }
        jeśli (obiektUtwórz) {
          return objectCreate(proto);
        }
        obiekt.prototyp = prototyp;
        var wynik = nowy obiekt;
        obiekt.prototyp = niezdefiniowany;
        zwróć wynik;
      };
    }());

    /**
     * Funkcja, z której dziedziczą otoki sekwencji łańcucha prototypów.
     *
     * @prywatne
     */
    funkcja baseLodash() {
      // Nie wykonano żadnej operacji.
    }

    /**
     * Podstawowy konstruktor do tworzenia opakowujących obiektów `lodash`.
     *
     * @prywatne
     * @param {*} wartość Wartość do zawijania.
     * @param {boolean} [chainAll] Włącz jawne sekwencje łańcucha metod.
     */
    funkcja LodashWrapper(wartość, łańcuchWszystko) {
      this.__opakowane__ = wartość;
      to.__działania__ = [];
      this.__chain__ = !!chainAll;
      this.__indeks__ = 0;
      this.__wartości__ = niezdefiniowane;
    }

    /**
     * Domyślnie ograniczniki szablonów używane przez lodash są takie jak w
     * osadzony Ruby (ERB) oraz ciągi szablonów ES2015. Zmienić
     * następujące ustawienia szablonu, aby użyć alternatywnych ograniczników.
     *
     * @statyczny
     * @członkiem _
     * @type {Obiekt}
     */
    lodash.templateUstawienia = {

      /**
       * Używany do wykrywania wartości właściwości `data`, które mają być kodowane w formacie HTML.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      „ucieczka”: ponowna ucieczka,

      /**
       * Służy do wykrywania kodu do oceny.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      „oceniać”: ponownie oceniać,

      /**
       * Służy do wykrywania wartości właściwości `data` do wstrzyknięcia.
       *
       * @memberOf _.templateSettings
       * @type {RegExp}
       */
      „interpolować”: reInterpolate,

      /**
       * Używany do odwoływania się do obiektu danych w tekście szablonu.
       *
       * @memberOf _.templateSettings
       * @type {ciąg}
       */
      'zmienny': '',

      /**
       * Używany do importowania zmiennych do skompilowanego szablonu.
       *
       * @memberOf _.templateSettings
       * @type {Obiekt}
       */
      „import”: {

        /**
         * Odwołanie do funkcji `lodash`.
         *
         * @memberOf _.templateSettings.imports
         * @type {funkcja}
         */
        '_': lodasz
      }
    };

    // Upewnij się, że opakowania są instancjami `baseLodash`.
    lodash.prototype = bazaLodash.prototype;
    lodash.prototype.constructor = lodash;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy leniwy obiekt opakowujący, który opakowuje „wartość”, aby umożliwić leniwą ocenę.
     *
     * @prywatne
     * @konstruktor
     * @param {*} wartość Wartość do zawijania.
     */
    funkcja LazyWrapper(wartość) {
      this.__opakowane__ = wartość;
      to.__działania__ = [];
      to.__katalog__ = 1;
      this.__filtrowane__ = fałsz;
      this.__iterates__ = [];
      this.__takeCount__ = MAX_ARRAY_LENGTH;
      to.__widoki__ = [];
    }

    /**
     * Tworzy klon leniwego obiektu opakowującego.
     *
     * @prywatne
     * @nazwa klona
     * @memberOf LazyWrapper
     * @returns {Object} Zwraca sklonowany obiekt `LazyWrapper`.
     */
    funkcja lazyClone() {
      var wynik = new LazyWrapper(this.__wrapped__);
      wynik.__działania__ = kopiaTablica(to.__działania__);
      wynik.__katalog__ = ten.__katalog__;
      wynik.__filtrowane__ = to.__filtrowane__;
      wynik.__iterates__ = copyArray(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      wynik.__widoki__ = kopiaArray(to.__widoki__);
      zwróć wynik;
    }

    /**
     * Odwraca kierunek leniwej iteracji.
     *
     * @prywatne
     * @nazwa odwrócona
     * @memberOf LazyWrapper
     * @returns {Object} Zwraca nowy odwrócony obiekt `LazyWrapper`.
     */
    funkcja lazyReverse() {
      if (this.__filtrowane__) {
        var wynik = new LazyWrapper(this);
        wynik.__katalog__ = -1;
        wynik.__filtrowane__ = prawda;
      } w przeciwnym razie {
        wynik = this.clone();
        wynik.__katalog__ *= -1;
      }
      zwróć wynik;
    }

    /**
     * Wyodrębnia nieopakowaną wartość z leniwego opakowania.
     *
     * @prywatne
     * @nazwa wartość
     * @memberOf LazyWrapper
     * @returns {*} Zwraca nieopakowaną wartość.
     */
    funkcja lazyValue() {
      var array = this.__wrapped__.value(),
          dir = to.__katalog__,
          isArr = isArray(tablica),
          ma rację = katalog < 0,
          arrLength = isArr ? długość.tablicy : 0,
          widok = getView(0, arrLength, this.__views__),
          start = widok.start,
          koniec = zobacz.koniec,
          długość = koniec - początek,
          index = ma rację ? koniec : (początek - 1),
          iteracje = this.__iterates__,
          iterLength = iteratees.length,
          indeks res = 0,
          takeCount = nativeMin(długość, this.__takeCount__);

      if (!isArr || (!isRight && arrLength == długość && wziąćCount == długość)) {
        return baseWrapperValue(tablica, this.__actions__);
      }
      var wynik = [];

      zewnętrzny:
      while (length-- && resIndex < takeCount) {
        indeks += katalog;

        var iterIndex = -1,
            wartość = tablica[indeks];

        while (++iterIndex < iterLength) {
          var data = iteracje[iterIndex],
              iterate = data.iteratee,
              typ = dane.typ,
              obliczona = iteracja(wartość);

          if (typ == LAZY_MAP_FLAG) {
            wartość = obliczona;
          } else if (!computed) {
            if (typ == LAZY_FILTER_FLAG) {
              kontynuuj na zewnątrz;
            } w przeciwnym razie {
              złamać na zewnątrz;
            }
          }
        }
        wynik[index++] = wartość;
      }
      zwróć wynik;
    }

    // Upewnij się, że `LazyWrapper` jest instancją `baseLodash`.
    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy obiekt haszujący.
     *
     * @prywatne
     * @konstruktor
     * @param {tablica} [wpisy] Pary klucz-wartość do pamięci podręcznej.
     */
    funkcja Hash(wpisy) {
      indeks zm = -1,
          długość = wpisy == null ? 0 : wpisy.długość;

      to.wyczyść();
      while (++indeks < długość) {
        var wpis = wpisy[indeks];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Usuwa wszystkie wpisy klucz-wartość z hasza.
     *
     * @prywatne
     * @nazwa wyczyść
     * @memberOf Hash
     */
    funkcja hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      ten.rozmiar = 0;
    }

    /**
     * Usuwa `klucz` i jego wartość z hasza.
     *
     * @prywatne
     * @nazwa usuń
     * @memberOf Hash
     * Hash @param {Object} Hash do modyfikacji.
     * @param {string} klucz Klucz wartości do usunięcia.
     * @returns {boolean} Zwraca `true` jeśli wpis został usunięty, w przeciwnym razie `false`.
     */
    funkcja hashDelete(klucz) {
      var wynik = this.has(klucz) && usuń this.__data__[klucz];
      this.size -= wynik ? 1:0;
      zwróć wynik;
    }

    /**
     * Pobiera wartość skrótu dla `key`.
     *
     * @prywatne
     * @nazwa get
     * @memberOf Hash
     * @param {string} klucz Klucz wartości do pobrania.
     * @returns {*} Zwraca wartość wejściową.
     */
    funkcja hashGet(klucz) {
      var data = this.__data__;
      jeśli (nativeCreate) {
        var wynik = dane[klucz];
        zwróć wynik === HASH_UNDEFINED ? niezdefiniowany : wynik;
      }
      return hasOwnProperty.call(dane, klucz) ? dane[klucz] : niezdefiniowane;
    }

    /**
     * Sprawdza, czy istnieje wartość skrótu dla `key`.
     *
     * @prywatne
     * @nazwa ma
     * @memb erOf Hash
     * @param {string} klucz Klucz wpisu do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli istnieje wpis dla `key`, w przeciwnym razie `false`.
     */
    funkcja hashHas(klucz) {
      var data = this.__data__;
      return nativeCreate ? (dane[klucz] !== niezdefiniowane) : hasOwnProperty.call(dane, klucz);
    }

    /**
     * Ustawia hash `klucz` na `wartość`.
     *
     * @prywatne
     * @nazwa zestawu
     * @memberOf Hash
     * @param {string} klucz Klucz wartości do ustawienia.
     * @param {*} wartość Wartość do ustawienia.
     * @returns {Object} Zwraca instancję hash.
     */
    funkcja hashSet(klucz, wartość) {
      var data = this.__data__;
      this.size += this.has(key) ? 0:1;
      data[klucz] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : wartość;
      zwróć to;
    }

    // Dodaj metody do `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype['delete'] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy obiekt pamięci podręcznej listy.
     *
     * @prywatne
     * @konstruktor
     * @param {tablica} [wpisy] Pary klucz-wartość do pamięci podręcznej.
     */
    funkcja ListCache(wpisy) {
      indeks zm = -1,
          długość = wpisy == null ? 0 : wpisy.długość;

      to.wyczyść();
      while (++indeks < długość) {
        var wpis = wpisy[indeks];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Usuwa wszystkie wpisy klucz-wartość z pamięci podręcznej listy.
     *
     * @prywatne
     * @nazwa wyczyść
     * @memberOf ListCache
     */
    funkcja listCacheClear() {
      to.__dane__ = [];
      ten.rozmiar = 0;
    }

    /**
     * Usuwa `key` i jego wartość z pamięci podręcznej listy.
     *
     * @prywatne
     * @nazwa usuń
     * @memberOf ListCache
     * @param {string} klucz Klucz wartości do usunięcia.
     * @returns {boolean} Zwraca `true` jeśli wpis został usunięty, w przeciwnym razie `false`.
     */
    function listCacheDelete(klucz) {
      var data = this.__data__,
          indeks = assocIndexOf(dane, klucz);

      jeśli (indeks < 0) {
        zwróć fałsz;
      }
      var lastIndex = data.length - 1;
      if (indeks == ostatni indeks) {
        dane.pop();
      } w przeciwnym razie {
        splice.call(dane, indeks, 1);
      }
      --ten.rozmiar;
      zwróć prawdę;
    }

    /**
     * Pobiera wartość pamięci podręcznej listy dla `key`.
     *
     * @prywatne
     * @nazwa get
     * @memberOf ListCache
     * @param {string} klucz Klucz wartości do pobrania.
     * @returns {*} Zwraca wartość wejściową.
     */
    funkcja listCacheGet(klucz) {
      var data = this.__data__,
          indeks = assocIndexOf(dane, klucz);

      indeks zwrotu < 0 ? niezdefiniowane : dane[indeks][1];
    }

    /**
     * Sprawdza, czy istnieje wartość pamięci podręcznej listy dla `key`.
     *
     * @prywatne
     * @nazwa ma
     * @memberOf ListCache
     * @param {string} klucz Klucz wpisu do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli istnieje wpis dla `key`, w przeciwnym razie `false`.
     */
    lista funkcjiCacheHas(klucz) {
      return assocIndexOf(this.__data__, key) > -1;
    }

    /**
     * Ustawia pamięć podręczną listy `klucz` na `wartość`.
     *
     * @prywatne
     * @nazwa zestawu
     * @memberOf ListCache
     * @param {string} klucz Klucz wartości do ustawienia.
     * @param {*} wartość Wartość do ustawienia.
     * @returns {Object} Zwraca instancję pamięci podręcznej listy.
     */
    function listCacheSet(klucz, wartość) {
      var data = this.__data__,
          indeks = assocIndexOf(dane, klucz);

      jeśli (indeks < 0) {
        ++ten.rozmiar;
        data.push([klucz, wartość]);
      } w przeciwnym razie {
        dane[indeks][1] = wartość;
      }
      zwróć to;
    }

    // Dodaj metody do `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype['usuń'] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy obiekt pamięci podręcznej mapy do przechowywania par klucz-wartość.
     *
     * @prywatne
     * @konstruktor
     * @param {tablica} [wpisy] Pary klucz-wartość do pamięci podręcznej.
     */
    funkcja MapCache(wpisy) {
      indeks zm = -1,
          długość = wpisy == null ? 0 : wpisy.długość;

      to.wyczyść();
      while (++indeks < długość) {
        var wpis = wpisy[indeks];
        this.set(entry[0], entry[1]);
      }
    }

    /**
     * Usuwa z mapy wszystkie wpisy klucz-wartość.
     *
     * @prywatne
     * @nazwa wyczyść
     * @memberOf MapCache
     */
    funkcja mapCacheClear() {
      ten.rozmiar = 0;
      to.__dane__ = {
        „hasz”: nowy skrót,
        'mapa': nowa (Mapa || ListCache),
        „ciąg”: nowy hasz
      };
    }

    /**
     * Usuwa `key` i jego wartość z mapy.
     *
     * @prywatne
     * @nazwa usuń
     * @memberOf MapCache
     * @param {string} klucz Klucz wartości do usunięcia.
     * @returns {boolean} Zwraca `true` jeśli wpis został usunięty, w przeciwnym razie `false`.
     */
    funkcja mapCacheDelete(klucz) {
      var wynik = getMapData(ten, klucz)['usuń'](klucz);
      this.size -= wynik ? 1:0;
      zwróć wynik;
    }

    /**
     * Pobiera wartość mapy dla `key`.
     *
     * @prywatne
     * @nazwa get
     * @memberOf MapCache
     * @param {string} klucz Klucz wartości do pobrania.
     * @returns {*} Zwraca wartość wejściową.
     */
    funkcja mapCacheGet(klucz) {
      return getMapData(ten, klucz).get(klucz);
    }

    /**
     * Sprawdza, czy istnieje wartość mapy dla `key`.
     *
     * @prywatne
     * @nazwa ma
     * @memberOf MapCache
     * @param {string} klucz Klucz wpisu do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli istnieje wpis dla `key`, w przeciwnym razie `false`.
     */
    funkcja mapCacheHas(klucz) {
      return getMapData(ten, klucz).has(klucz);
    }

    /**
     * Ustawia mapę `klucz` na `wartość`.
     *
     * @prywatne
     * @nazwa zestawu
     * @memberOf MapCache
     * @param {string} klucz Klucz wartości do ustawienia.
     * @param {*} wartość Wartość do ustawienia.
     * @returns {Object} Zwraca instancję pamięci podręcznej mapy.
     */
    funkcja mapCacheSet(klucz, wartość) {
      var data = getMapData(ten, klucz),
          rozmiar = dane.rozmiar;

      data.set(klucz, wartość);
      this.size += data.size == rozmiar ? 0:1;
      zwróć to;
    }

    // Dodaj metody do `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype['usuń'] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;

    /*------------------------------------------------ ------------------------*/

    /**
     *
     * Tworzy obiekt pamięci podręcznej tablicy do przechowywania unikalnych wartości.
     *
     * @prywatne
     * @konstruktor
     * @param {tablica} [wartości] Wartości do buforowania.
     */
    funkcja SetCache(wartości) {
      indeks zm = -1,
          długość = wartości == null ? 0 : wartości.długość;

      this.__data__ = nowa pamięć podręczna map;
      while (++indeks < długość) {
        this.add(wartości[indeks]);
      }
    }

    /**
     * Dodaje `wartość` do pamięci podręcznej tablicy.
     *
     * @prywatne
     * @nazwa dodaj
     * @memberOf SetCache
     * @alias push
     * @param {*} wartość Wartość do buforowania.
     * @returns {Object} Zwraca instancję pamięci podręcznej.
     */
    funkcja setCacheAdd(wartość) {
      this.__data__.set(wartość, HASH_UNDEFINED);
      zwróć to;
    }

    /**
     * Sprawdza, czy w pamięci podręcznej tablicy znajduje się `wartość`.
     *
     * @prywatne
     * @nazwa ma
     * @memberOf SetCache
     * @param {*} wartość Wartość do wyszukania.
     * @returns {liczba} Zwraca „prawda”, jeśli „wartość” zostanie znaleziona, w przeciwnym razie „fałsz”.
     */
    funkcja setCacheHas(wartość) {
      zwróć to.__dane__.has(wartość);
    }

    // Dodaj metody do `SetCache`.
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy obiekt pamięci podręcznej stosu do przechowywania par klucz-wartość.
     *
     * @prywatne
     * @konstruktor
     * @param {tablica} [wpisy] Pary klucz-wartość do pamięci podręcznej.
     */
    funkcja Stos(wpisy) {
      var data = this.__data__ = new ListCache(wpisy);
      this.size = data.size;
    }

    /**
     * Usuwa wszystkie wpisy klucz-wartość ze stosu.
     *
     * @prywatne
     * @nazwa wyczyść
     * @memberOf Stack
     */
    funkcja stosWyczyść() {
      this.__data__ = nowy ListCache;
      ten.rozmiar = 0;
    }

    /**
     * Usuwa `klucz` i jego wartość ze stosu.
     *
     * @prywatne
     * @nazwa usuń
     * @memberOf Stack
     * @param {string} klucz Klucz wartości do usunięcia.
     * @returns {boolean} Zwraca `true` jeśli wpis został usunięty, w przeciwnym razie `false`.
     */
    function stackDelete(klucz) {
      var data = this.__data__,
          wynik = dane['usuń'](klucz);

      this.size = data.size;
      zwróć wynik;
    }

    /**
     * Pobiera wartość stosu dla `klucza`.
     *
     * @prywatne
     * @nazwa get
     * @memberOf Stack
     * @param {string} klucz Klucz wartości do pobrania.
     * @returns {*} Zwraca wartość wejściową.
     */
    funkcja stosPobierz(klucz) {
      zwróć to.__data__.get(klucz);
    }

    /**
     * Sprawdza, czy istnieje wartość stosu dla `key`.
     *
     * @prywatne
     * @nazwa ma
     * @memberOf Stack
     * @param {string} klucz Klucz wpisu do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli istnieje wpis dla `key`, w przeciwnym razie `false`.
     */
    funkcja ma stos(klucz) {
      zwróć to.__data__.has(klucz);
    }

    /**
     * Ustawia „klucz” stosu na „wartość”.
     *
     * @prywatne
     * @nazwa zestawu
     * @memberOf Stack
     * @param {string} klucz Klucz wartości do ustawienia.
     * @param {*} wartość Wartość do ustawienia.
     * @returns {Object} Zwraca instancję pamięci podręcznej stosu.
     */
    funkcja stackSet(klucz, wartość) {
      var data = this.__data__;
      if (instancja danych ListCache) {
        pary zmiennych = dane.__dane__;
        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([klucz, wartość]);
          this.size = ++data.size;
          zwróć to;
        }
        data = this.__data__ = new MapCache(pary);
      }
      data.set(klucz, wartość);
      this.size = data.size;
      zwróć to;
    }

    // Dodaj metody do `Stosu`.
    Stack.prototype.clear = stos Clear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = StackGet;
    Stos.prototyp.ma = stos ma;
    Stack.prototype.set = StackSet;

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy tablicę z przeliczalnymi nazwami właściwości podobnej do tablicy `wartość`.
     *
     * @prywatne
     * @param {*} wartość Wartość do zapytania.
     * @param {boolean} dziedziczone Określa zwracanie dziedziczonych nazw właściwości.
     * @returns {Array} Zwraca tablicę nazw właściwości.
     */
    function arrayLikeKeys(wartość, dziedziczona) {
      var isArr = isArray(wartość),
          isArg = !isArg && isArguments(wartość),
          isBuff = !isArr && !isArg && isBuffer(wartość),
          isType = !isArr && !isArg && !isBuff && isTypedArray(wartość),
          skipIndexes = isArr || isArg || isBuff || isType,
          wynik = skipIndexes ? baseTimes(value.length, String) : [],
          długość = wynik.długość;

      for (klucz var w wartości) {
        if ((dziedziczone || hasOwnProperty.call(wartość, klucz)) &&
            !(pomiń indeksy && (
               // Safari 9 ma policzalne `arguments.length` w trybie ścisłym.
               klucz == 'długość' ||
               // Node.js 0.10 ma policzalne właściwości nieindeksowe w buforach.
               (isBuff && (klucz == 'przesunięcie' || klucz == 'rodzic')) ||
               // PhantomJS 2 ma przeliczalne właściwości nieindeksowe w tablicach wpisanych.
               (isType && (klucz == 'bufor' || klucz == 'długość bajtu' || klucz == 'przesunięcie bajtu')) ||
               // Pomiń właściwości indeksu.
               isIndex(klucz, długość)
            ))) {
          wynik.push(klucz);
        }
      }
      zwróć wynik;
    }

    /**
     * Specjalistyczna wersja `_.sample` dla tablic.
     *
     * @prywatne
     * @param {Array} tablica Tablica do próbkowania.
     * @returns {*} Zwraca element losowy.
     */
    function arraySample(array) {
      zmienna długość = tablica.długość;
      długość powrotu ? array[baseRandom(0, length - 1)] : niezdefiniowane;
    }

    /**
     * Specjalistyczna wersja `_.sampleSize` dla tablic.
     *
     * @prywatne
     * @param {Array} tablica Tablica do próbkowania.
     * @param {liczba} n Liczba elementów do pobrania.
     * @returns {Array} Zwraca losowe elementy.
     */
    function arraySampleSize(tablica, n) {
      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
    }

    /**
     * Specjalistyczna wersja `_.shuffle` dla tablic.
     *
     * @prywatne
     * @param {Array} array Tablica do przetasowania.
     * @returns {Array} Zwraca nową potasowaną tablicę.
     */
    function arrayShuffle(tablica) {
      return shuffleSelf(copyArray(array));
    }

    /**
     * Ta funkcja jest podobna do `assignValue` z wyjątkiem tego, że nie przypisuje
     * wartości „niezdefiniowane”.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {string} klucz Klucz właściwości do przypisania.
     * @param {*} wartość Wartość do przypisania.
     */
    function assignMergeValue(obiekt, klucz, wartość) {
      if ((wartość !== niezdefiniowana && !eq(obiekt[klucz], wartość)) ||
          (wartość === niezdefiniowana && !(klucz w obiekcie))) {
        baseAssignValue(obiekt, klucz, wartość);
      }
    }

    /**
     * Przypisuje `wartość` do `klucza` `obiektu`, jeśli istniejąca wartość nie jest równoważna
     * przy użyciu [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {string} klucz Klucz właściwości do przypisania.
     * @param {*} wartość Wartość do przypisania.
     */
    function assignValue(obiekt, klucz, wartość) {
      var objValue = obiekt[klucz];
      if (!(hasOwnProperty.call(obiekt, klucz) && eq(objValue, wartość)) ||
          (wartość === niezdefiniowana && !(klucz w obiekcie))) {
        baseAssignValue(obiekt, klucz, wartość);
      }
    }

    /**
     * Pobiera indeks, w którym „klucz” znajduje się w „tablicy” par klucz-wartość.
     *
     * @prywatne
     * @param {Array} tablica Tablica do sprawdzenia.
     * Klawisz @param {*} Klucz do wyszukiwania.
     * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
     */
    function assocIndexOf(tablica, klucz) {
      zmienna długość = tablica.długość;
      podczas gdy (długość--) {
        if (eq(tablica[długość][0], klucz)) {
          długość powrotu;
        }
      }
      powrót -1;
    }

    /**
     * Agreguje elementy `kolekcji` na `akumulatorze` z przetworzonymi kluczami
     * przez `iterata` i wartości ustawione przez `setter`.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Function} setter Funkcja ustawiania wartości `akumulatora`.
     * @param {Function} iteratee Iteracja do przekształcenia kluczy.
     * Akumulator @param {Object} Początkowy zagregowany obiekt.
     * @returns {Funkcja} Zwraca `akumulator`.
     */
    function baseAggregator(kolekcja, ustawiacz, iteracja, akumulator) {
      baseEach(kolekcja, funkcja(wartość, klucz, kolekcja) {
        setter(akumulator, wartość, iteracja(wartość), kolekcja);
      });
      akumulator zwrotny;
    }

    /**
     * Podstawowa implementacja `_.assign` bez obsługi wielu źródeł
     * lub funkcje `customizer`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt docelowy.
     * @param {Object} source Obiekt źródłowy.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function baseAssign(obiekt, źródło) {
      zwróć obiekt && copyObject(źródło, klucze(źródło), obiekt);
    }

    /**
     * Podstawowa implementacja `_.assignIn` bez obsługi wielu źródeł
     * lub funkcje `customizer`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt docelowy.
     * @param {Object} source Obiekt źródłowy.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function baseAssignIn(obiekt, źródło) {
      zwróć obiekt && copyObject(źródło, klucze(źródło), obiekt);
    }

    /**
     * Podstawowa implementacja `assignValue` i `assignMergeValue` bez
     * kontrole wartości.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {string} klucz Klucz właściwości do przypisania.
     * @param {*} wartość Wartość do przypisania.
     */
    function baseAssignValue(obiekt, klucz, wartość) {
      if (klucz == '__proto__' && defineProperty) {
        defineProperty(obiekt, klucz, {
          'konfigurowalny': prawda,
          'enumerable': prawda,
          „wartość”: wartość,
          „zapisywalny”: prawda
        });
      } w przeciwnym razie {
        obiekt[klucz] = wartość;
      }
    }

    /**
     * Podstawowa implementacja `_.at` bez obsługi poszczególnych ścieżek.
     *
     * @prywatne
     * @param {Object} object Obiekt do iteracji.
     * @param {string[]} paths Ścieżki właściwości do wybrania.
     * @returns {Array} Zwraca wybrane elementy.
     */
    function baseAt(obiekt, ścieżki) {
      indeks zm = -1,
          długość = ścieżki.długość,
          wynik = Tablica(długość),
          pomiń = obiekt == null;

      while (++indeks < długość) {
        wynik[indeks] = pomiń ? undefined : get(obiekt, ścieżki[indeks]);
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.clamp`, która nie wymusza argumentów.
     *
     * @prywatne
     * @param {number} number Numer do zaciśnięcia.
     * @param {liczba} [dolna] Dolna granica.
     * @param {liczba} upper Górna granica.
     * @returns {liczba} Zwraca zaciśniętą liczbę.
     */
    function baseClamp(liczba, dolna, górna) {
      if (liczba === liczba) {
        if (górne !== niezdefiniowane) {
          liczba = liczba <= górna ? liczba : górna;
        }
        if (niższe !== niezdefiniowane) {
          liczba = liczba >= mniejsza ? liczba : dolna;
        }
      }
      numer zwrotu;
    }

    /**
     * Podstawowa implementacja `_.clone` i `_.cloneDeep`, która śledzi
     * przemierzane obiekty.
     *
     * @prywatne
     * @param {*} wartość Wartość do sklonowania.
     * @param {boolean} bitmask Flagi maski bitowej.
     * 1 - Głęboki klon
     * 2 - Spłaszcz odziedziczone właściwości
     * 4 - Symbole klonów
     * @param {Funkcja} [customizer] Funkcja dostosowywania klonowania.
     * @param {ciąg} [klucz] Klucz wartości `wartość`.
     * @param {Obiekt} [obiekt] Obiekt nadrzędny `wartości`.
     * @param {Object} [stack] Śledzi przemierzane obiekty i ich klony.
     * @returns {*} Zwraca sklonowaną wartość.
     */
    function baseClone(wartość, maska ​​bitowa, dostosowywanie, klucz, obiekt, stos) {
      var wynik,
          isDeep = maska ​​bitowa i CLONE_DEEP_FLAG,
          isFlat = maska ​​bitowa i CLONE_FLAT_FLAG,
          isFull = maska ​​bitowa & CLONE_SYMBOLS_FLAG;

      jeśli (klient) {
        wynik = obiekt ? dostosowywanie(wartość, klucz, obiekt, stos) : dostosowywanie(wartość);
      }
      if (wynik !== niezdefiniowany) {
        zwróć wynik;
      }
      if (!isObject(wartość)) {
        wartość zwrotu;
      }
      var isArr = isArray(wartość);
      jeśli (isArr) {
        wynik = initCloneArray(wartość);
        jeśli (!jestgłęboki) {
          return copyArray(wartość, wynik);
        }
      } w przeciwnym razie {
        tag var = pobierzTag(wartość),
            isFunc = tag == funcTag || tag == genTag;

        if (jestBufor(wartość)) {
          return cloneBuffer(wartość, isDeep);
        }
        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          wynik = (isFlat || isFunc) ? {} : initCloneObject(wartość);
          jeśli (!jestgłęboki) {
            powrót jest płaski
              ? copySymbolsIn(wartość, baseAssignIn(wynik, wartość))
              : copySymbols(wartość, baseAssign(wynik, wartość));
          }
        } w przeciwnym razie {
          if (! cloneableTags[znacznik]) {
            zwrócić obiekt ? wartość : {};
          }
          wynik = initCloneByTag(wartość, tag, isDeep);
        }
      }
      // Sprawdź, czy nie ma odwołań cyklicznych i zwróć odpowiedni klon.
      stos || (stos = nowy stos);
      var skumulowany = stos.get(wartość);
      jeśli (ułożone) {
        zwrot ułożony;
      }
      stack.set(wartość, wynik);

      if (jestUstaw(wartość)) {
        value.forEach(function(subValue) {
          result.add(baseClone(podwartość, maska ​​bitowa, dostosowywanie, podwartość, wartość, stos));
        });
      } else if (isMap(wartość)) {
        value.forEach(function(subValue, key) {
          result.set(klucz, baseClone(podwartość, maska ​​bitowa, dostosowywanie, klucz, wartość, stos));
        });
      }

      var keyFunc = isFull
        ? (isFlat ? getAllKeysIn : getAllKeys)
        : (isFlat ? keysIn : klucze);

      var props = isArr ? niezdefiniowane : keysFunc(wartość);
      arrayEach(props || value, function(subValue, key) {
        jeśli (rekwizyty) {
          klucz = podwartość;
          podWartość = wartość[klucz];
        }
        // Rekursywne wypełnienie klonu (podatne na limity stosu wywołań).
        assignValue(wynik, klucz, baseClone(podwartość, maska ​​bitowa, dostosowywanie, klucz, wartość, stos));
      });
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.conforms`, która nie klonuje `source`.
     *
     * @prywatne
     * @param {Object} źródło Obiekt właściwości predykatów ma być zgodny.
     * @returns {Funkcja} Zwraca nową funkcję spec.
     */
    funkcja baseConforms(źródło) {
      var props = klucze(źródło);
      funkcja powrotu (obiekt) {
        return baseConformsTo(obiekt, źródło, rekwizyty);
      };
    }

    /**
     * Podstawowa implementacja `_.conformsTo`, która akceptuje `props` do sprawdzenia.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Object} źródło Obiekt właściwości predykatów ma być zgodny.
     * @returns {boolean} Zwraca `true` jeśli `object` jest zgodny, w przeciwnym razie `false`.
     */
    function baseConformsTo(obiekt, źródło, rekwizyty) {
      var length = props.length;
      if (obiekt == null) {
        return !długość;
      }
      obiekt = obiekt(obiekt);
      podczas gdy (długość--) {
        var klucz = podpory[długość],
            predykat = źródło[klucz],
            wartość = obiekt[klucz];

        if ((wartość === niezdefiniowana && !(klucz w obiekcie)) || !predicate(wartość)) {
          zwróć fałsz;
        }
      }
      zwróć prawdę;
    }

    /**
     * Podstawowa implementacja `_.delay` i `_.defer`, która akceptuje `args`
     * dostarczyć do `func`.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja opóźniająca.
     * @param {liczba} wait Liczba milisekund opóźnienia wywołania.
     * @param {Array} args Argumenty dostarczane do funkcji `func`.
     * @returns {liczba|Obiekt} Zwraca identyfikator timera lub obiekt timeout.
     */
    function baseDelay(func, wait, args) {
      if (typ funkcji != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * Podstawowa implementacja metod takich jak `_.difference` bez wsparcia
     * do wykluczenia wielu tablic lub iteracyjnych skrótów.
     *
     * @prywatne
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Array} wartości Wartości do wykluczenia.
     * @param {Funkcja} [iteracja] Iteracja wywołana dla elementu.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     */
    function baseDifference(tablica, wartości, iteracja, komparator) {
      indeks zm = -1,
          zawiera = tablicaZawiera,
          isCommon = prawda,
          długość = tablica.długość,
          wynik = [],
          wartościDługość = wartości.długość;

      jeśli (!długość) {
        zwróć wynik;
      }
      jeśli (iterantowany) {
        wartości = arrayMap(values, baseUnary(iteratee));
      }
      jeśli (komparator) {
        zawiera = tablicaZawieraZ;
        isCommon = fałsz;
      }
      else if (values.length >= LARGE_ARRAY_SIZE) {
        zawiera = pamięć podręczna ma;
        isCommon = fałsz;
        wartości = nowy SetCache(wartości);
      }
      zewnętrzny:
      while (++indeks < długość) {
        wartość zmiennej = tablica[indeks],
            obliczona = iteracja == null ? wartość : iteracja(wartość);

        wartość = (komparator || wartość !== 0) ? wartość : 0;
        if (jest wspólne && obliczono === obliczono) {
          var wartościIndeks = wartościDługość;
          while (valuesIndex--) {
            if (values[valuesIndex] === obliczone) {
              kontynuuj na zewnątrz;
            }
          }
          wynik.push(wartość);
        }
        else if (!includes(wartości, obliczone, porównawcze)) {
          wynik.push(wartość);
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.forEach` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Function} iteratee Funkcja wywoływana na iterację.
     * @returns {Tablica|Obiekt} Zwraca `kolekcja`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * Podstawowa implementacja `_.forEachRight` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Function} iteratee Funkcja wywoływana na iterację.
     * @returns {Tablica|Obiekt} Zwraca `kolekcja`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * Podstawowa implementacja `_.every` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * Predykat @param {Function} Funkcja wywoływana na iterację.
     * @returns {boolean} Zwraca `true` jeśli wszystkie elementy przejdą kontrolę predykatu,
     * w przeciwnym razie `false`
     */
    function baseEvery(collection, predicate) {
      var wynik = prawda;
      baseEach(kolekcja, funkcja(wartość, indeks, kolekcja) {
        wynik = !!predykat(wartość, indeks, kolekcja);
        zwróć wynik;
      });
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja metod takich jak `_.max` i `_.min`, która akceptuje a
     * `comparator` do określenia wartości ekstremalnej.
     *
     * @prywatne
     * @param {Array} tablica Tablica do iteracji.
     * @param {Function} iteracja Iteracja wywołana na iterację.
     * Komparator @param {Function} Komparator używany do porównywania wartości.
     * @returns {*} Zwraca wartość ekstremum.
     */
    function baseExtremum(tablica, iteracja, komparator) {
      indeks zm = -1,
          długość = tablica.długość;

      while (++indeks < długość) {
        wartość zmiennej = tablica[indeks],
            bieżąca = iterowana(wartość);

        if (bieżący != null && (obliczony === niezdefiniowany
              ? (bieżący === bieżący && !isSymbol(bieżący))
              : komparator(bieżący, obliczony)
            )) {
          zmienna obliczona = aktualna,
              wynik = wartość;
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.fill` bez ochrony połączeń iteracyjnych.
     *
     * @prywatne
     * @param {Array} tablica Tablica do wypełnienia.
     * @param {*} wartość Wartość do wypełnienia „tablicy”.
     * @param {liczba} [start=0] Pozycja początkowa.
     * @param {liczba} [koniec=tablica.długość] Pozycja końcowa.
     * @returns {Array} Zwraca `tablic`.
     */
    function baseFill(tablica, wartość, początek, koniec) {
      zmienna długość = tablica.długość;

      start = toInteger(start);
      jeśli (początek < 0) {
        start = -start > długość ? 0 : (długość + początek);
      }
      end = (koniec === niezdefiniowany || koniec > długość) ? length : toInteger(koniec);
      jeśli (koniec < 0) {
        koniec += długość;
      }
      koniec = początek > koniec ? 0 : doDługości(koniec);
      while (początek < koniec) {
        tablica[start++] = wartość;
      }
      tablica zwrotów;
    }

    /**
     * Podstawowa implementacja `_.filter` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * Predykat @param {Function} Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową przefiltrowaną tablicę.
     */
    function baseFilter(kolekcja, predykat) {
      var wynik = [];
      baseEach(kolekcja, funkcja(wartość, indeks, kolekcja) {
        if (predykat(wartość, indeks, kolekcja)) {
          wynik.push(wartość);
        }
      });
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.flatten` z obsługą ograniczania spłaszczania.
     *
     * @prywatne
     * @param {Array} tablica Tablica do spłaszczenia.
     * @param {number} depth Maksymalna głębokość rekurencji.
     * @param {boolean} [predicate=isFlattenable] Funkcja wywoływana na iterację.
     * @param {boolean} [isStrict] Ograniczenie do wartości, które przechodzą testy „predykatu”.
     * @param {Tablica} [wynik=[]] Początkowa wartość wyniku.
     * @returns {Array} Zwraca nową spłaszczoną tablicę.
     */
    function baseFlatten(tablica, głębokość, predykat, isStrict, wynik) {
      indeks zm = -1,
          długość = tablica.długość;

      predykat || (predykat = isFlattenable);
      wynik || (wynik = []);

      while (++indeks < długość) {
        wartość zmiennej = tablica[indeks];
        if (głębokość > 0 && predykat(wartość)) {
          jeśli (głębokość > 1) {
            // Rekurencyjnie spłaszczaj tablice (podatne na wywoływanie limitów stosu).
            baseFlatten(wartość, głębokość - 1, predykat, isStrict, wynik);
          } w przeciwnym razie {
            arrayPush(wynik, wartość);
          }
        } inaczej jeśli (!isStrict) {
          wynik[wynik.długość] = wartość;
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `baseForOwn`, która iteruje po `object`
     * właściwości zwracane przez `keysFunc` i wywołują `iteratee` dla każdej właściwości.
     * Funkcje iteracyjne mogą zakończyć iterację wcześniej przez jawne zwrócenie `false`.
     *
     * @prywatne
     * @param {Object} object Obiekt do iteracji.
     * @param {Function} iteratee Funkcja wywoływana na iterację.
     * @param {Funkcja} keysFunc Funkcja pobierająca klucze obiektu `object`.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    var baseFor = utwórzBaseFor();

    /**
     * Ta funkcja jest podobna do `baseFor` z tą różnicą, że iteruje po właściwościach
     * w odwrotnej kolejności.
     *
     * @prywatne
     * @param {Object} object Obiekt do iteracji.
     * @param {Function} iteratee Funkcja wywoływana na iterację.
     * @param {Funkcja} keysFunc Funkcja pobierająca klucze obiektu `object`.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    var baseForRight = createBaseFor(prawda);

    /**
     * Podstawowa implementacja `_.forOwn` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * @param {Object} object Obiekt do iteracji.
     * @param {Function} iteratee Funkcja wywoływana na iterację.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function baseForOwn(object, iteratee) {
      zwróć obiekt && baseFor(obiekt, iteracja, klucze);
    }

    /**
     * Podstawowa implementacja `_.forOwnRight` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * @param {Object} object Obiekt do iteracji.
     * @param {Function} iteratee Funkcja wywoływana na iterację.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function baseForOwnRight(obiekt, iteracja) {
      zwróć obiekt && baseForRight(obiekt, iteracja, klucze);
    }

    /**
     * Podstawowa implementacja `_.functions`, która tworzy tablicę
     * Nazwy właściwości funkcji `object` odfiltrowane z `props`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Array} props Nazwy właściwości do filtrowania.
     * @returns {Array} Zwraca nazwy funkcji.
     */
    function baseFunctions(obiekt, rekwizyty) {
      return arrayFilter(props, function(key) {
        return isFunction(obiekt[klucz]);
      });
    }

    /**
     * Podstawowa implementacja `_.get` bez obsługi wartości domyślnych.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka właściwości do pobrania.
     * @returns {*} Zwraca rozwiązaną wartość.
     */
    function baseGet(obiekt, ścieżka) {
      ścieżka =castPath(ścieżka, obiekt);

      indeks zm = 0,
          długość = ścieżka.długość;

      while (obiekt != null && indeks < długość) {
        obiekt = obiekt[toKlucz(ścieżka[indeks++])];
      }
      return (indeks && indeks == długość) ? obiekt : niezdefiniowany;
    }

    /**
     * Podstawowa implementacja `getAllKeys` i `getAllKeysIn`, która używa
     * `keysFunc` i `symbolsFunc` do pobrania przeliczalnych nazw właściwości i
     * symbole „obiektu”.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Funkcja} keysFunc Funkcja pobierająca klucze obiektu `object`.
     * @param {Funkcja} symbolsFunc Funkcja pobierająca symbole obiektu `object`.
     * @returns {Array} Zwraca tablicę nazw właściwości i symboli.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var wynik = keysFunc(obiekt);
      return isArray(obiekt) ? wynik : arrayPush(wynik, symboleFunc(obiekt));
    }

    /**
     * Podstawowa implementacja `getTag` bez awaryjnych rozwiązań dla środowisk z błędami.
     *
     * @prywatne
     * @param {*} wartość Wartość do zapytania.
     * @returns {string} Zwraca `toStringTag`.
     */
    function baseGetTag(wartość) {
      jeśli (wartość == null) {
        zwracana wartość === niezdefiniowana ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag w Object(value))
        ? pobierzSurowyTag(wartość)
        : obiektToString(wartość);
    }

    /**
     * Podstawowa implementacja `_.gt`, która nie wymusza argumentów.
     *
     * @prywatne
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest większa niż „inne”,
     * w przeciwnym razie `fałsz`.
     */
    funkcja baseGt(wartość, inne) {
      wartość zwracana > inne;
    }

    /**
     * Podstawowa implementacja `_.has` bez obsługi głębokich ścieżek.
     *
     * @prywatne
     * @param {Obiekt} [obiekt] Obiekt do zapytania.
     * @param {Array|string} klucz Klucz do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `key` istnieje, w przeciwnym razie `false`.
     */
    podstawa funkcji(obiekt, klucz) {
      return object != null && hasOwnProperty.call(obiekt, klucz);
    }

    /**
     * Podstawowa implementacja `_.hasIn` bez obsługi głębokich ścieżek.
     *
     * @prywatne
     * @param {Obiekt} [obiekt] Obiekt do zapytania.
     * @param {Array|string} klucz Klucz do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `key` istnieje, w przeciwnym razie `false`.
     */
    function baseHasIn(obiekt, klucz) {
      return object != null && key w Object(object);
    }

    /**
     * Podstawowa implementacja `_.inRange`, która nie wymusza argumentów.
     *
     * @prywatne
     * @param {number} number Numer do sprawdzenia.
     * @param {liczba} początek Początek zakresu.
     * @param {liczba} end Koniec zakresu.
     * @returns {boolean} Zwraca „true”, jeśli „liczba” jest w zakresie, w przeciwnym razie „false”.
     */
    function baseInRange(liczba, początek, koniec) {
      zwracana liczba >= nativeMin(początek, koniec) && liczba < nativeMax(początek, koniec);
    }

    /**
     * Podstawowa implementacja metod takich jak `_.intersection`, bez wsparcia
     * dla skrótów iteracyjnych, który akceptuje tablicę tablic do sprawdzenia.
     *
     * @prywatne
     * Tablice @param {Array} Tablice do sprawdzenia.
     * @param {Funkcja} [iteracja] Iteracja wywołana dla elementu.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową tablicę wspólnych wartości.
     */
    function baseIntersection(tablice, iteracja, komparator) {
      var zawiera = komparator ? arrayIncludesWith : arrayIncludes,
          długość = tablice[0].długość,
          othLength = tablice.długość,
          othIndex = othLength,
          pamięci podręczne = Array(othLength),
          maxLength = Nieskończoność,
          wynik = [];

      while (othIndex--) {
        var tablica = tablice[othIndex];
        if (othIndex && iteratee) {
          array = arrayMap(array, baseUnary(iteratee));
        }
        maxLength = nativeMin(tablica.length, maxLength);
        caches[othIndex] = !comparator && (iteracja || (długość >= 120 && array.length >= 120))
          ? nowy SetCache(othIndex && array)
          : nieokreślony;
      }
      tablica = tablice[0];

      indeks zm = -1,
          widziano = pamięci podręczne[0];

      zewnętrzny:
      while (++indeks < długość && wynik.długość < maxLength) {
        wartość zmiennej = tablica[indeks],
            obliczona = iteracja ? iteracja(wartość) : wartość;

        wartość = (komparator || wartość !== 0) ? wartość : 0;
        jeśli (!(widziano
              ? cacheMa(widziany, obliczany)
              : zawiera(wynik, obliczony, porównawczy)
            )) {
          othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            jeśli (!(pamięć podręczna
                  ? cacheHas(pamięć podręczna, obliczona)
                  : zawiera(tablice[othIndex], obliczone, porównawcze))
                ) {
              kontynuuj na zewnątrz;
            }
          }
          jeśli (widziany) {
            widziany.push(obliczony);
          }
          wynik.push(wartość);
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.invert` i `_.invertBy`, która odwraca
     * `object` z wartościami przekształconymi przez `iteratee` i ustawionymi przez `setter`.
     *
     * @prywatne
     * @param {Object} object Obiekt do iteracji.
     * @param {Function} setter Funkcja ustawiania wartości `akumulatora`.
     * @param {Function} iteratee Iteracja do przekształcenia wartości.
     * Akumulator @param {Object} Początkowy odwrócony obiekt.
     * @returns {Funkcja} Zwraca `akumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(obiekt, funkcja(wartość, klucz, obiekt) {
        setter(akumulator, iteracja(wartość), klucz, obiekt);
      });
      akumulator zwrotny;
    }

    /**
     * Podstawowa implementacja `_.invoke` bez obsługi indywidualnej
     * argumenty metody.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka metody do wywołania.
     * @param {Array} args Argumenty do wywołania metody.
     * @returns {*} Zwraca wynik wywołanej metody.
     */
    function baseInvoke(obiekt, ścieżka, argumenty) {
      ścieżka =castPath(ścieżka, obiekt);
      obiekt = rodzic(obiekt, ścieżka);
      var func = obiekt == null ? obiekt : obiekt[toKey(ostatni(ścieżka))];
      return func == null ? undefined : apply(func, object, args);
    }

    /**
     * Podstawowa implementacja `_.isArguments`.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `value` jest obiektem `arguments`,
     */
    funkcja baseIsArguments(wartość) {
      return isObjectLike(wartość) && baseGetTag(wartość) == argsTag;
    }

    /**
     * Podstawowa implementacja `_.isArrayBuffer` bez optymalizacji Node.js.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest buforem tablicy, w przeciwnym razie „fałsz”.
     */
    function baseIsArrayBuffer(wartość) {
      return isObjectLike(wartość) && baseGetTag(wartość) == arrayBufferTag;
    }

    /**
     * Podstawowa implementacja `_.isDate` bez optymalizacji Node.js.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest obiektem daty, w przeciwnym razie „fałsz”.
     */
    funkcja bazowaIsDate(wartość) {
      return isObjectLike(wartość) && baseGetTag(wartość) == dateTag;
    }

    /**
     * Podstawowa implementacja `_.isEqual`, która obsługuje częściowe porównania
     * i śledzi przemierzane obiekty.
     *
     * @prywatne
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @param {boolean} bitmask Flagi maski bitowej.
     * 1 - Porównanie nieuporządkowane
     * 2 - Częściowe porównanie
     * @param {Funkcja} [customizer] Funkcja dostosowywania porównań.
     * @param {Object} [stos] Śledzi przemierzane obiekty `wartość` i `inne`.
     * @returns {boolean} Zwraca `true`, jeśli wartości są równoważne, w przeciwnym razie `false`.
     */
    function baseIsEqual(wartość, inne, maska ​​bitowa, dostosowywanie, stos) {
      jeśli (wartość === inny) {
        zwróć prawdę;
      }
      if (wartość == null || other == null || (!isObjectLike(wartość) && !isObjectLike(other))) {
        zwracana wartość !== wartość && inne !== inne;
      }
      return baseIsEqualDeep(wartość, inne, maska ​​bitowa, dostosowywanie, baseIsEqual, stos);
    }

    /**
     * Specjalistyczna wersja `baseIsEqual` dla tablic i obiektów, która wykonuje
     * głębokie porównania i ślady przemierzanych obiektów, umożliwiając obiekty o okrągłym
     * referencje do porównania.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do porównania.
     * @param {Object} other Inny obiekt do porównania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `baseIsEqual`, aby uzyskać więcej informacji.
     * Dostosowywanie @param {Function} Funkcja dostosowywania porównań.
     * @param {Funkcja} equalFunc Funkcja określająca ekwiwalenty wartości.
     * @param {Object} [stos] Śledzi przemierzane obiekty `object` i `inne`.
     * @returns {boolean} Zwraca `true` jeśli obiekty są równoważne, w przeciwnym razie `false`.
     */
    function baseIsEqualDeep(obiekt, inne, maska ​​bitowa, dostosowywanie, equalFunc, stos) {
      var objIsArr = isArray(obiekt),
          othIsArr = isArray(inne),
          objTag = objIsArr ? arrayTag : pobierzTag(obiekt),
          othTag = othIsArr ? arrayTag : getTag(inne);

      objTag = objTag == argsTag ? obiektTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;

      var objIsObj = objTag == obiektTag,
          othIsObj = othTag == obiektTag,
          isSameTag = objTag == othTag;

      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(inny)) {
          zwróć fałsz;
        }
        objIsArr = prawda;
        objIsObj = fałsz;
      }
      if (isSameTag && !objIsObj) {
        stos || (stos = nowy stos);
        return (objIsArr || isTypedArray(object))
          ? equalArrays(obiekt, inne, maska ​​bitowa, dostosowywanie, equalFunc, stos)
          : equalByTag(obiekt, inny, objTag, maska ​​bitowa, dostosowanie, equalFunc, stos);
      }
      if (!(maska ​​bitowa i COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? obiekt.wartość() : obiekt,
              othUnwrapped = othIsWrapped ? inna.wartość() : inna;

          stos || (stos = nowy stos);
          return equalFunc(objUnwrapped, othUnwrapped, maska ​​bitowa, dostosowywanie, stos);
        }
      }
      jeśli (!isSameTag) {
        zwróć fałsz;
      }
      stos || (stos = nowy stos);
      return equalObjects(obiekt, inny, maska ​​bitowa, konfigurator, equalFunc, stos);
    }

    /**
     * Podstawowa implementacja `_.isMap` bez optymalizacji Node.js.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest mapą, w przeciwnym razie „fałsz”.
     */
    funkcja baseIsMap(wartość) {
      return isObjectLike(wartość) && getTag(wartość) == mapTag;
    }

    /**
     * Podstawowa implementacja `_.isMatch` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Object} source Obiekt wartości właściwości do dopasowania.
     * @param {Array} matchData Nazwy właściwości, wartości i flagi porównania do dopasowania.
     * @param {Funkcja} [customizer] Funkcja dostosowywania porównań.
     * @returns {boolean} Zwraca `true`, jeśli `object` jest zgodny, w przeciwnym razie `false`.
     */
    function baseIsMatch(obiekt, źródło, matchData, dostosowywanie) {
      var index = matchData.length,
          długość = indeks,
          noCustomizer = !customizer;

      if (obiekt == null) {
        return !długość;
      }
      obiekt = obiekt(obiekt);
      podczas gdy (indeks--) {
        var data = matchData[indeks];
        if ((noCustomizer && data[2])
              ? dane[1] !== obiekt[dane[0]]
              : !(dane[0] w obiekcie)
            ) {
          zwróć fałsz;
        }
      }
      while (++indeks < długość) {
        dane = matchData[indeks];
        klucz var = dane[0],
            objValue = obiekt[klucz],
            srcValue = dane[1];

        if (noCustomizer && data [2]) {
          if (objValue === undefined && !(klucz w obiekcie)) {
            zwróć fałsz;
          }
        } w przeciwnym razie {
          var stos = nowy stos;
          jeśli (klient) {
            var wynik = Customizer(objValue, srcValue, klucz, obiekt, źródło, stos);
          }
          if (!(wynik === niezdefiniowany
                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, konfigurator, stos)
                : wynik
              )) {
            zwróć fałsz;
          }
        }
      }
      zwróć prawdę;
    }

    /**
     * Podstawowa implementacja `_.isNative` bez złych kontroli podkładek.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `value` jest funkcją natywną,
     * w przeciwnym razie `fałsz`.
     */
    funkcja podstawaIsNative(wartość) {
      if (!isObject(wartość) || isMasked(value)) {
        zwróć fałsz;
      }
      var wzorzec = isFunction(wartość) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }

    /**
     * Podstawowa implementacja `_.isRegExp` bez optymalizacji Node.js.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest wyrażeniem regularnym, w przeciwnym razie „fałsz”.
     */
    funkcja baseIsRegExp(wartość) {
      return isObjectLike(wartość) && baseGetTag(wartość) == regexpTag;
    }

    /**
     * Podstawowa implementacja `_.isSet` bez optymalizacji Node.js.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest zestawem, w przeciwnym razie „fałsz”.
     */
    funkcja baseIsSet(wartość) {
      return isObjectLike(wartość) && getTag(wartość) == setTag;
    }

    /**
     * Podstawowa implementacja `_.isTypedArray` bez optymalizacji Node.js.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest tablicą typu, w przeciwnym razie „fałsz”.
     */
    function baseIsTypedArray(wartość) {
      return isObjectLike(wartość) &&
        isLength(wartość.długość) && !!typedArrayTags[baseGetTag(wartość)];
    }

    /**
     * Podstawowa implementacja `_.iteratee`.
     *
     * @prywatne
     * @param {*} [value=_.identity] Wartość do konwersji na iterację.
     * @returns {Funkcja} Zwraca iterację.
     */
    function baseIteratee(wartość) {
      // Nie przechowuj wyniku `typeof` w zmiennej, aby uniknąć błędu JIT w Safari 9.
      // Więcej szczegółów znajdziesz na https://bugs.webkit.org/show_bug.cgi?id=156034.
      if (rodzaj wartości == 'funkcja') {
        wartość zwrotu;
      }
      jeśli (wartość == null) {
        tożsamość zwrotu;
      }
      if (rodzaj wartości == 'obiekt') {
        return isArray(wartość)
          ? baseMatchesProperty(wartość[0], wartość[1])
          : baseMatches(wartość);
      }
      zwróć właściwość (wartość);
    }

    /**
     * Podstawowa implementacja `_.keys`, która nie traktuje rzadkich tablic jako gęstych.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę nazw właściwości.
     */
    funkcyjne klawisze bazowe (obiekt) {
      if (!isPrototype(obiekt)) {
        zwróć nativeKeys(obiekt);
      }
      var wynik = [];
      for (klucz var w Object(object)) {
        if (hasOwnProperty.call(obiekt, klucz) && klucz != 'konstruktor') {
          wynik.push(klucz);
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.keysIn`, która nie traktuje rzadkich tablic jako gęstych.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę nazw właściwości.
     */
    function baseKeysIn(object) {
      if (!isObject(obiekt)) {
        return nativeKeysIn(obiekt);
      }
      var isProto = isPrototype(obiekt),
          wynik = [];

      for (klucz var w obiekcie) {
        if (!(klucz == 'konstruktor' && (isProto || !hasOwnProperty.call(obiekt, klucz)))) {
          wynik.push(klucz);
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.lt`, która nie wymusza argumentów.
     *
     * @prywatne
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest mniejsza niż „inne”,
     * w przeciwnym razie `fałsz`.
     */
    function baseLt(wartość, inne) {
      zwracana wartość < inne;
    }

    /**
     * Podstawowa implementacja `_.map` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Function} iteratee Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową zamapowaną tablicę.
     */
    function baseMap(kolekcja, iteracja) {
      indeks zm = -1,
          wynik = isArrayLike(kolekcja) ? Array(kolekcja.długość) : [];

      baseEach(kolekcja, funkcja(wartość, klucz, kolekcja) {
        wynik[++indeks] = iteracja(wartość, klucz, kolekcja);
      });
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.matches`, która nie klonuje `source`.
     *
     * @prywatne
     * @param {Object} source Obiekt wartości właściwości do dopasowania.
     * @returns {Funkcja} Zwraca nową funkcję spec.
     */
    funkcja baseMatches(źródło) {
      var matchData = getMatchData(źródło);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchStrictComparable(matchData[0][0], matchData[0][1]);
      }
      funkcja powrotu (obiekt) {
        zwracany obiekt === źródło || baseIsMatch(obiekt, źródło, matchData);
      };
    }

    /**
     * Podstawowa implementacja `_.matchesProperty`, która nie klonuje `srcValue`.
     *
     * @prywatne
     * @param {string} path Ścieżka właściwości do pobrania.
     * @param {*} srcValue Wartość do dopasowania.
     * @returns {Funkcja} Zwraca nową funkcję spec.
     */
    function baseMatchesProperty(ścieżka, srcValue) {
      if (isKey(ścieżka) && isStrictComparable(srcValue)) {
        return matchStrictComparable(toKey(path), srcValue);
      }
      funkcja powrotu (obiekt) {
        var objValue = get(obiekt, ścieżka);
        return (objValue === niezdefiniowane && objValue === srcValue)
          ? hasIn(obiekt, ścieżka)
          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }

    /**
     * Podstawowa implementacja `_.merge` bez obsługi wielu źródeł.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt docelowy.
     * @param {Object} source Obiekt źródłowy.
     * @param {liczba} srcIndex Indeks `źródła`.
     * @param {Funkcja} [customizer] Funkcja dostosowywania scalonych wartości.
     * @param {Object} [stack] Śledzi przebyte wartości źródłowe i ich scalanie
     * odpowiedniki.
     */
    function baseMerge(obiekt, źródło, srcIndex, konfigurator, stos) {
      if (obiekt === źródło) {
        zwrócić;
      }
      baseFor(źródło, funkcja(srcValue, klucz) {
        stos || (stos = nowy stos);
        if (isObject(srcValue)) {
          baseMergeDeep(obiekt, źródło, klucz, srcIndex, baseMerge, konfigurator, stos);
        }
        w przeciwnym razie {
          var nowaWartość = dostosowywanie
            ? konfigurator(safeGet(obiekt, klucz), srcValue, (klucz + ''), obiekt, źródło, stos)
            : nieokreślony;

          if (nowaWartość === niezdefiniowana) {
            nowaWartość = srcWartość;
          }
          assignMergeValue(obiekt, klucz, nowaWartość);
        }
      }, kluczeIn);
    }

    /**
     * Specjalistyczna wersja `baseMerge` dla tablic i obiektów, która wykonuje
     * głębokie scalanie i śledzenie przemierzanych obiektów, umożliwiając obiekty o okrągłym
     * odniesienia do połączenia.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt docelowy.
     * @param {Object} source Obiekt źródłowy.
     * @param {string} klucz Klucz wartości do scalenia.
     * @param {liczba} srcIndex Indeks `źródła`.
     * @param {Funkcja} mergeFunc Funkcja scalania wartości.
     * @param {Funkcja} [customizer] Funkcja dostosowywania przypisanych wartości.
     * @param {Object} [stack] Śledzi przebyte wartości źródłowe i ich scalanie
     * odpowiedniki.
     */
    function baseMergeDeep(obiekt, źródło, klucz, srcIndex, mergeFunc, konfigurator, stos) {
      var objValue = safeGet(obiekt, klucz),
          srcValue = safeGet(źródło, klucz),
          skumulowany = stos.get(srcValue);

      jeśli (ułożone) {
        assignMergeValue(obiekt, klucz, skumulowany);
        zwrócić;
      }
      var nowaWartość = dostosowywanie
        ? Customizer(objValue, srcValue, (klucz + ''), obiekt, źródło, stos)
        : nieokreślony;

      var isCommon = nowaWartość === niezdefiniowana;

      jeśli (jest powszechny) {
        var isArr = isArray(srcValue),
            isBuff = !isArr && isBuffer(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

        nowaWartość = srcWartość;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            nowaWartość = objWartość;
          }
          else if (isArrayLikeObject(objValue)) {
            nowaWartość = kopiaArray(objWartość);
          }
          inaczej, jeśli (isBuff) {
            isCommon = fałsz;
            nowaWartość = cloneBuffer(srcValue, true);
          }
          inaczej, jeśli (jest wpisany) {
            isCommon = fałsz;
            nowaWartość = cloneTypedArray(srcValue, true);
          }
          w przeciwnym razie {
            nowaWartość = [];
          }
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          nowaWartość = objWartość;
          if (isArguments(objValue)) {
            nowaWartość = toPlainObject(ObjValue);
          }
          else if (!isObject(objValue) || isFunction(objValue)) {
            nowaWartość = initCloneObject(srcValue);
          }
        }
        w przeciwnym razie {
          isCommon = fałsz;
        }
      }
      jeśli (jest powszechny) {
        // Rekursywne łączenie obiektów i tablic (możliwe do wywołania limitów stosu).
        stack.set(srcValue, newValue);
        mergeFunc(nowaWartość, srcWartość, srcIndex, konfigurator, stos);
        stos['usuń'](srcValue);
      }
      assignMergeValue(obiekt, klucz, nowaWartość);
    }

    /**
     * Podstawowa implementacja `_.nth`, która nie wymusza argumentów.
     *
     * @prywatne
     * @param {Array} tablica Tablica do zapytania.
     * @param {liczba} n Indeks elementu do zwrócenia.
     * @returns {*} Zwraca n-ty element `array`.
     */
    function baseNth(tablica, n) {
      zmienna długość = tablica.długość;
      jeśli (!długość) {
        zwrócić;
      }
      n += n < 0 ? długość : 0;
      return isIndex(n, długość) ? tablica[n] : niezdefiniowana;
    }

    /**
     * Podstawowa implementacja `_.orderBy` bez ochrony parametrów.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Function[]|Object[]|string[]} iteracje Iteracje do sortowania.
     * @param {string[]} orders Porządek sortowania `iteratów`.
     * @returns {Array} Zwraca nową posortowaną tablicę.
     */
    function baseOrderBy(kolekcja, iteracje, zamówienia) {
      indeks zmiennej = -1;
      iteracje = arrayMap(iteratees.length ? iteracje : [tożsamość], baseUnary(getIteratee()));

      var wynik = baseMap(kolekcja, funkcja(wartość, klucz, kolekcja) {
        var kryteria = arrayMap(iterates, function(iteratee) {
          zwróć iterację(wartość);
        });
        return { 'kryteria': kryteria, 'indeks': ++indeks, 'wartość': wartość };
      });

      return baseSortBy(result, function(object, other) {
        return porównajWiele(obiekt, inne, zamówienia);
      });
    }

    /**
     * Podstawowa implementacja `_.pick` bez obsługi indywidualnej
     * identyfikatory właściwości.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt źródłowy.
     * @param {string[]} paths Ścieżki właściwości do wybrania.
     * @returns {Obiekt} Zwraca nowy obiekt.
     */
    function basePick(obiekt, ścieżki) {
      return basePickBy(obiekt, ścieżki, funkcja(wartość, ścieżka) {
        return hasIn(obiekt, ścieżka);
      });
    }

    /**
     * Podstawowa implementacja `_.pickBy` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt źródłowy.
     * @param {string[]} paths Ścieżki właściwości do wybrania.
     * Predykat @param {Function} Funkcja wywoływana dla danej właściwości.
     * @returns {Obiekt} Zwraca nowy obiekt.
     */
    function basePickBy(obiekt, ścieżki, predykat) {
      indeks zm = -1,
          długość = ścieżki.długość,
          wynik = {};

      while (++indeks < długość) {
        var path = paths[indeks],
            wartość = baseGet(obiekt, ścieżka);

        if (predykat(wartość, ścieżka)) {
          baseSet(wynik,castPath(ścieżka, obiekt), wartość);
        }
      }
      zwróć wynik;
    }

    /**
     * Specjalistyczna wersja `baseProperty` obsługująca głębokie ścieżki.
     *
     * @prywatne
     * @param {Array|string} ścieżka Ścieżka właściwości do pobrania.
     * @returns {Funkcja} Zwraca nową funkcję akcesora.
     */
    function basePropertyDeep(ścieżka) {
      funkcja powrotu (obiekt) {
        return baseGet(obiekt, ścieżka);
      };
    }

    /**
     * Podstawowa implementacja `_.pullAllBy` bez obsługi iteratee
     * skróty.
     *
     * @prywatne
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {Array} wartości Wartości do usunięcia.
     * @param {Funkcja} [iteracja] Iteracja wywołana dla elementu.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca `tablic`.
     */
    function basePullAll(tablica, wartości, iteracja, komparator) {
      var indexOf = komparator ? baseIndexOfWith : baseIndexOf,
          indeks = -1,
          długość = wartości.długość,
          widziany = tablica;

      if (tablica === wartości) {
        wartości = kopiujArray(wartości);
      }
      jeśli (iterantowany) {
        widziano = arrayMap(tablica, baseUnary(iteratee));
      }
      while (++indeks < długość) {
        var fromIndex = 0,
            wartość = wartości[indeks],
            obliczona = iteracja ? iteracja(wartość) : wartość;

        while ((fromIndex = indexOf(widziany, obliczony, fromIndex, komparator)) > -1) {
          if (widziany !== tablica) {
            splice.call(zobacz, fromIndex, 1);
          }
          splice.call(tablica, fromIndex, 1);
        }
      }
      tablica zwrotów;
    }

    /**
     * Podstawowa implementacja `_.pullAt` bez wsparcia dla jednostki
     * indeksy lub przechwytywanie usuniętych elementów.
     *
     * @prywatne
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {liczba[]} indexs Indeksy elementów do usunięcia.
     * @returns {Array} Zwraca `tablic`.
     */
    function basePullAt(tablica, indeksy) {
      długość zmiennej = tablica ? indeksy.długość : 0,
          lastIndex = długość - 1;

      podczas gdy (długość--) {
        var indeks = indeksy[długość];
        if (długość == lastIndex || index !== poprzedni) {
          var poprzedni = indeks;
          if (isIndex(indeks)) {
            splice.call(tablica, indeks, 1);
          } w przeciwnym razie {
            baseUnset(tablica, indeks);
          }
        }
      }
      tablica zwrotów;
    }

    /**
     * Podstawowa implementacja `_.random` bez obsługi zwracania
     * Liczb zmiennoprzecinkowych.
     *
     * @prywatne
     * @param {number} lower Dolna granica.
     * @param {liczba} upper Górna granica.
     * @returns {liczba} Zwraca liczbę losową.
     */
    function baseLosowy(dolny, górny) {
      return niższy + nativeFloor(nativeRandom() * (górny - niższy + 1));
    }

    /**
     * Podstawowa implementacja `_.range` i `_.rangeRight`, która nie działa
     * argumenty przymusu.
     *
     * @prywatne
     * @param {liczba} początek Początek zakresu.
     * @param {liczba} end Koniec zakresu.
     * @param {liczba} krok Wartość, o którą należy zwiększyć lub zmniejszyć.
     * @param {boolean} [fromRight] Określ iterację od prawej do lewej.
     * @returns {Array} Zwraca zakres liczb.
     */
    function baseRange(początek, koniec, krok, od prawej) {
      indeks zm = -1,
          length = nativeMax(nativeCeil((koniec - początek) / (krok || 1)), 0),
          wynik = Tablica(długość);

      podczas gdy (długość--) {
        wynik[z prawej ? długość : ++indeks] = początek;
        początek += krok;
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.repeat`, która nie wymusza argumentów.
     *
     * @prywatne
     * @param {ciąg} ciąg Ciąg do powtórzenia.
     * @param {liczba} n Liczba powtórzeń ciągu.
     * @returns {ciąg} Zwraca powtarzany ciąg.
     */
    function baseRepeat(ciąg, n) {
      var wynik = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
        zwróć wynik;
      }
      // Wykorzystaj potęgowanie przez algorytm do kwadratu, aby przyspieszyć powtarzanie.
      // Więcej szczegółów znajdziesz na https://en.wikipedia.org/wiki/Exponentiation_by_squaring.
      robić {
        jeśli (n % 2) {
          wynik += ciąg;
        }
        n = natywnePiętro (n / 2);
        jeśli (n) {
          ciąg += ciąg;
        }
      } podczas (n);

      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.rest`, która nie sprawdza poprawności ani nie wymusza argumentów.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zastosowania parametru rest.
     * @param {liczba} [start=func.length-1] Pozycja początkowa parametru rest.
     * @returns {Funkcja} Zwraca nową funkcję.
     */
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }

    /**
     * Podstawowa implementacja `_.sample`.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do pobrania próbki.
     * @returns {*} Zwraca element losowy.
     */
    function baseSample(kolekcja) {
      return arraySample(wartości(kolekcja));
    }

    /**
     * Podstawowa implementacja `_.sampleSize` bez ochrony parametrów.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do pobrania próbki.
     * @param {liczba} n Liczba elementów do pobrania.
     * @returns {Array} Zwraca losowe elementy.
     */
    function baseSampleSize(kolekcja, n) {
      var tablica = wartości(kolekcja);
      return shuffleSelf(tablica, baseClamp(n, 0, tablica.długość));
    }

    /**
     * Podstawowa implementacja `_.set`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do ustawienia.
     * @param {*} wartość Wartość do ustawienia.
     * @param {Funkcja} [customizer] Funkcja dostosowywania tworzenia ścieżki.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function baseSet(obiekt, ścieżka, wartość, dostosowywanie) {
      if (!isObject(obiekt)) {
        obiekt zwrotny;
      }
      ścieżka =castPath(ścieżka, obiekt);

      indeks zm = -1,
          długość = ścieżka.długość,
          lastIndex = długość - 1,
          zagnieżdżone = obiekt;

      while (zagnieżdżone != null && ++indeks < długość) {
        var key = toKey(ścieżka[indeks]),
            nowaWartość = wartość;

        if (indeks != ostatni indeks) {
          var objValue = zagnieżdżone[klucz];
          nowaWartość = dostosowywanie ? konfigurator(objValue, klucz, zagnieżdżony) : niezdefiniowany;
          if (nowaWartość === niezdefiniowana) {
            nowaWartość = isObject(objValue)
              ? objValue
              : (isIndex(ścieżka[indeks + 1]) ? [] : {});
          }
        }
        assignValue(zagnieżdżone, klucz, nowaWartość);
        zagnieżdżone = zagnieżdżone[klucz];
      }
      obiekt zwrotny;
    }

    /**
     * Podstawowa implementacja `setData` bez obsługi zwarć w gorącej pętli.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do powiązania metadanych.
     * Dane @param {*} Metadane.
     * @returns {Funkcja} Zwraca `func`.
     */
    var baseSetData = !metaMapa ? tożsamość : funkcja(funkcja, dane) {
      metaMap.set(funkcja, dane);
      funkcja powrotu;
    };

    /**
     * Podstawowa implementacja `setToString` bez obsługi skrótów hot loop.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do modyfikacji.
     * @param {Function} string Wynik `toString`.
     * @returns {Funkcja} Zwraca `func`.
     */
    var baseSetToString = !defineProperty ? tożsamość : function(func, string) {
      return defineProperty(func, 'toString', {
        'konfigurowalny': prawda,
        'enumerable': fałszywe,
        'wartość': stała(ciąg),
        „zapisywalny”: prawda
      });
    };

    /**
     * Podstawowa implementacja `_.shuffle`.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do przetasowania.
     * @returns {Array} Zwraca nową potasowaną tablicę.
     */
    function baseShuffle(kolekcja) {
      return shuffleSelf(wartości(kolekcja));
    }

    /**
     * Podstawowa implementacja `_.slice` bez ochrony połączeń iteracyjnych.
     *
     * @prywatne
     * @param {Array} tablica Tablica do wycięcia.
     * @param {liczba} [start=0] Pozycja początkowa.
     * @param {liczba} [koniec=tablica.długość] Pozycja końcowa.
     * @returns {Array} Zwraca wycinek `tablicy`.
     */
    function baseSlice(tablica, początek, koniec) {
      indeks zm = -1,
          długość = tablica.długość;

      jeśli (początek < 0) {
        start = -start > długość ? 0 : (długość + początek);
      }
      koniec = koniec > długość ? długość : koniec;
      jeśli (koniec < 0) {
        koniec += długość;
      }
      długość = początek > koniec ? 0 : ((koniec - początek) >>> 0);
      początek >>>= 0;

      var wynik = Tablica(długość);
      while (++indeks < długość) {
        wynik[indeks] = tablica[indeks + początek];
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.some` bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * Predykat @param {Function} Funkcja wywoływana na iterację.
     * @returns {boolean} Zwraca `true` jeśli jakikolwiek element przejdzie kontrolę predykatu,
     * w przeciwnym razie `fałsz`.
     */
    function baseSome(kolekcja, predykat) {
      var wynik;

      baseEach(kolekcja, funkcja(wartość, indeks, kolekcja) {
        wynik = predykat(wartość, indeks, kolekcja);
        zwróć !wynik;
      });
      powrót !!wynik;
    }

    /**
     * Podstawowa implementacja `_.sortedIndex` i `_.sortedLastIndex`, które
     * wykonuje wyszukiwanie binarne `tablicy` w celu określenia indeksu, w którym `wartość`
     * należy wstawić do `array`, aby zachować porządek sortowania.
     *
     * @prywatne
     * @param {Array} array Posortowana tablica do sprawdzenia.
     * @param {*} wartość Wartość do oceny.
     * @param {boolean} [retHighest] Określ zwracanie najwyższego kwalifikowanego indeksu.
     * @returns {liczba} Zwraca indeks, pod którym należy wstawić `wartość`
     * do „tablicy”.
     */
    function baseSortedIndex(tablica, wartość, retHighest) {
      var niski = 0,
          wysoki = tablica == null ? niski : tablica.długość;

      if (rodzajwartości == 'liczba' && wartość === wartość && wysoka <= HALF_MAX_ARRAY_LENGTH) {
        podczas gdy (niski < wysoki) {
          var mid = (low + high) >>> 1,
              obliczone = tablica[środek];

          if (obliczone !== null && !isSymbol(obliczone) &&
              (retHighest ? (obliczone <= wartość) : (obliczone < wartość))) {
            niski = średni + 1;
          } w przeciwnym razie {
            wysoki = średni;
          }
        }
        powrót wysoki;
      }
      return baseSortedIndexBy(tablica, wartość, tożsamość, retHighest);
    }

    /**
     * Podstawowa implementacja `_.sortedIndexBy` i `_.sortedLastIndexBy`
     * która wywołuje `iterację` dla `value` i każdego elementu `array` do obliczenia
     * ich ranking sortowania. Iterat jest wywoływany z jednym argumentem; (wartość).
     *
     * @prywatne
     * @param {Array} array Posortowana tablica do sprawdzenia.
     * @param {*} wartość Wartość do oceny.
     * @param {Function} iteratee Iteracja wywołana dla elementu.
     * @param {boolean} [retHighest] Określ zwracanie najwyższego kwalifikowanego indeksu.
     * @returns {liczba} Zwraca indeks, pod którym należy wstawić `wartość`
     * do „tablicy”.
     */
    function baseSortedIndexBy(tablica, wartość, iteracja, retHighest) {
      wartość = iteracja(wartość);

      var niski = 0,
          wysoki = tablica == null ? 0 : tablica.długość,
          valIsNaN = wartość !== wartość,
          valIsNull = wartość === null,
          valIsSymbol = isSymbol(wartość),
          valIsUndefined = wartość === niezdefiniowana;

      podczas gdy (niski < wysoki) {
        var mid = nativeFloor((low + high) / 2),
            obliczona = iteracja(tablica[środek]),
            othIsDefined = obliczone !== niezdefiniowane,
            othIsNull = obliczone === null,
            othIsReflexive = obliczone === obliczone,
            othIsSymbol = isSymbol(obliczona);

        jeśli (valIsNaN) {
          var setLow = retNajwyższa || othjestRefleksyjny;
        } else if (valIsUndefined) {
          setLow = othIsReflexive && (retHighest || othIsDefined);
        } else if (valIsNull) {
          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
        } else if (valIsSymbol) {
          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
        } else if (othIsNull || othIsSymbol) {
          setLow = fałsz;
        } w przeciwnym razie {
          setLow = retHighest ? (obliczone <= wartość) : (obliczone < wartość);
        }
        jeśli (ustawLow) {
          niski = średni + 1;
        } w przeciwnym razie {
          wysoki = średni;
        }
      }
      zwróć natywne Min(wysokie, MAX_ARRAY_INDEX);
    }

    /**
     * Podstawowa implementacja `_.sortedUniq` i `_.sortedUniqBy` bez
     * obsługa skrótów iteracyjnych.
     *
     * @prywatne
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Funkcja} [iteracja] Iteracja wywołana dla elementu.
     * @returns {Array} Zwraca nową zduplikowaną wolną tablicę.
     */
    function baseSortedUniq(tablica, iteracja) {
      indeks zm = -1,
          długość = tablica.długość,
          indeks res = 0,
          wynik = [];

      while (++indeks < długość) {
        wartość zmiennej = tablica[indeks],
            obliczona = iteracja ? iteracja(wartość) : wartość;

        if (!indeks || !eq(obliczone, zobaczone)) {
          var widziana = obliczona;
          wynik[resIndex++] = wartość === 0 ? 0 : wartość;
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.toNumber`, która nie zapewnia poprawności
     * konwersje wartości ciągów binarnych, szesnastkowych lub ósemkowych.
     *
     * @prywatne
     * @param {*} wartość Wartość do przetworzenia.
     * @returns {liczba} Zwraca liczbę.
     */
    function baseToNumber(wartość) {
      if (rodzaj wartości == 'liczba') {
        wartość zwrotu;
      }
      if (isSymbol(wartość)) {
        powrót NAN;
      }
      zwróć +wartość;
    }

    /**
     * Podstawowa implementacja `_.toString`, która nie konwertuje wartości nullish
     * wartości do pustych ciągów.
     *
     * @prywatne
     * @param {*} wartość Wartość do przetworzenia.
     * @returns {ciąg} Zwraca ciąg.
     */
    function baseToString(wartość) {
      // Wyjdź wcześniej, aby uzyskać ciągi, aby uniknąć spadku wydajności w niektórych środowiskach.
      if (typ wartości == 'string') {
        wartość zwrotu;
      }
      if (jestArray(wartość)) {
        // Rekursywnie konwertuj wartości (podatne na limity stosu wywołań).
        return arrayMap(wartość, baseToString) + '';
      }
      if (isSymbol(wartość)) {
        return symbolToString ? symbolToString.call(wartość) : '';
      }
      var wynik = (wartość + '');
      return (wynik == '0' && (1 / wartość) == -NIESKOŃCZONOŚĆ) ? '-0' : wynik;
    }

    /**
     * Podstawowa implementacja `_.uniqBy` bez obsługi iteracyjnych skrótów.
     *
     * @prywatne
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Funkcja} [iteracja] Iteracja wywołana dla elementu.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową zduplikowaną wolną tablicę.
     */
    function baseUniq(tablica, iteracja, komparator) {
      indeks zm = -1,
          zawiera = tablicaZawiera,
          długość = tablica.długość,
          isCommon = prawda,
          wynik = [],
          widziany = wynik;

      jeśli (komparator) {
        isCommon = fałsz;
        zawiera = tablicaZawieraZ;
      }
      else if (długość >= LARGE_ARRAY_SIZE) {
        var set = iteracja ? null : utwórzZestaw(tablica);
        jeśli (ustaw) {
          return setToArray(set);
        }
        isCommon = fałsz;
        zawiera = pamięć podręczna ma;
        widziany = nowy SetCache;
      }
      w przeciwnym razie {
        widziany = iterowany ? [] : wynik;
      }
      zewnętrzny:
      while (++indeks < długość) {
        wartość zmiennej = tablica[indeks],
            obliczona = iteracja ? iteracja(wartość) : wartość;

        wartość = (komparator || wartość !== 0) ? wartość : 0;
        if (jest wspólne && obliczono === obliczono) {
          var widzianyIndeks = widziany.długość;
          while (seenIndex--) {
            if (seen[seenIndex] === obliczone) {
              kontynuuj na zewnątrz;
            }
          }
          jeśli (iterantowany) {
            widziany.push(obliczony);
          }
          wynik.push(wartość);
        }
        else if (!includes(widziany, obliczany, komparator)) {
          jeśli (widziano !== wynik) {
            widziany.push(obliczony);
          }
          wynik.push(wartość);
        }
      }
      zwróć wynik;
    }

    /**
     * Podstawowa implementacja `_.unset`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do usunięcia.
     * @returns {boolean} Zwraca `true` jeśli właściwość została usunięta, w przeciwnym razie `false`.
     */
    function baseUnset(obiekt, ścieżka) {
      ścieżka =castPath(ścieżka, obiekt);
      obiekt = rodzic(obiekt, ścieżka);
      zwracany obiekt == null || usuń obiekt[toKey(ostatni(ścieżka))];
    }

    /**
     * Podstawowa implementacja `_.update`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do aktualizacji.
     * @param {Function} updater Funkcja generująca zaktualizowaną wartość.
     * @param {Funkcja} [customizer] Funkcja dostosowywania tworzenia ścieżki.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function baseUpdate(obiekt, ścieżka, aktualizator, konfigurator) {
      return baseSet(obiekt, ścieżka, aktualizator(baseGet(obiekt, ścieżka)), konfigurator);
    }

    /**
     * Podstawowa implementacja metod takich jak `_.dropWhile` i `_.takeWhile`
     * bez obsługi skrótów iteracyjnych.
     *
     * @prywatne
     * @param {Array} tablica Tablica do zapytania.
     * Predykat @param {Function} Funkcja wywoływana na iterację.
     * @param {boolean} [isDrop] Określ upuszczanie elementów zamiast ich pobierania.
     * @param {boolean} [fromRight] Określ iterację od prawej do lewej.
     * @returns {Array} Zwraca wycinek `tablicy`.
     */
    function baseWhile(tablica, predykat, isDrop, fromRight) {
      zmienna długość = tablica.długość,
          indeks = od prawej ? długość : -1;

      while ((fromRight ? index-- : ++indeks < długość) &&
        predykat(tablica[indeks], indeks, tablica)) {}

      powrót to Drop
        ? baseSlice(tablica, (fromRight ? 0 : indeks), (fromRight ? indeks + 1 : długość))
        : baseSlice(tablica, (fromRight ? indeks + 1 : 0), (fromRight ? length : index));
    }

    /**
     * Podstawowa implementacja `wrapperValue`, która zwraca wynik
     * wykonanie sekwencji działań na nieopakowanej `wartości`, gdzie każda
     * kolejna akcja dostarczana jest zwrócona wartość poprzedniej.
     *
     * @prywatne
     * @param {*} wartość Wartość nieopakowana.
     * Akcje @param {Array} Akcje, które należy wykonać, aby rozwiązać nieopakowaną wartość.
     * @returns {*} Zwraca rozwiązaną wartość.
     */
    function baseWrapperValue(wartość, akcje) {
      zmienna wynik = wartość;
      if (wynik wystąpienia LazyWrapper) {
        wynik = wynik.wartość();
      }
      return arrayReduce(akcje, funkcja(wynik, akcja) {
        return action.func.apply(action.thisArg, arrayPush([wynik], akcja.args));
      }, wynik);
    }

    /**
     * Podstawowa implementacja metod takich jak `_.xor`, bez wsparcia dla
     * iteracyjne skróty, które akceptują tablicę tablic do sprawdzenia.
     *
     * @prywatne
     * Tablice @param {Array} Tablice do sprawdzenia.
     * @param {Funkcja} [iteracja] Iteracja wywołana dla elementu.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową tablicę wartości.
     */
    function baseXor(tablice, iteracja, komparator) {
      zmienna długość = tablice.długość;
      jeśli (długość < 2) {
        długość powrotu ? baseUniq(tablice[0]) : [];
      }
      indeks zm = -1,
          wynik = Tablica(długość);

      while (++indeks < długość) {
        var tablica = tablice[indeks],
            othIndex = -1;

        while (++othIndex < długość) {
          if (indeks inny != indeks) {
            wynik[indeks] = baseDifference(wynik[indeks] || tablica, tablice[othIndex], iteracja, komparator);
          }
        }
      }
      return baseUniq(baseFlatten(wynik, 1), iteracja, komparator);
    }

    /**
     * Ta podstawowa implementacja `_.zipObject`, która przypisuje wartości za pomocą `assignFunc`.
     *
     * @prywatne
     * @param {Array} props Identyfikatory właściwości.
     * @param {Array} wartości Wartości właściwości.
     * @param {Funkcja} assignFunc Funkcja przypisywania wartości.
     * @returns {Obiekt} Zwraca nowy obiekt.
     */
    function baseZipObject(rekwizyty, wartości, assignFunc) {
      indeks zm = -1,
          długość = rekwizyty.długość,
          valsLength = wartości.długość,
          wynik = {};

      while (++indeks < długość) {
        var wartość = indeks < valsLength ? wartości[indeks] : niezdefiniowane;
        assignFunc(wynik, props[indeks], wartość);
      }
      zwróć wynik;
    }

    /**
     * Rzutuje `wartość` na pustą tablicę, jeśli nie jest to tablica podobna do obiektu.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {Array|Object} Zwraca rzutowany obiekt podobny do tablicy.
     */
    function castArrayLikeObject(wartość) {
      return isArrayLikeObject(wartość) ? wartość : [];
    }

    /**
     * Rzutuje „wartość” na „tożsamość”, jeśli nie jest to funkcja.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {Funkcja} Zwraca funkcję rzutowania.
     */
    funkcja castFunction(wartość) {
      return typeof value == 'funkcja' ? wartość : tożsamość;
    }

    /**
     * Rzutuje `wartość` na tablicę ścieżek, jeśli nie jest ona jedną.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @param {Obiekt} [obiekt] Obiekt do zapytania o klucze.
     * @returns {Array} Zwraca tablicę ścieżki właściwości rzutowania.
     */
    funkcja castPath(wartość, obiekt) {
      if (jestArray(wartość)) {
        wartość zwrotu;
      }
      return isKey(wartość, obiekt) ? [wartość] : stringToPath(toString(value));
    }

    /**
     * Alias ​​`baseRest`, który może być zastąpiony przez `identity` przez moduł
     * wtyczki zastępcze.
     *
     * @prywatne
     * @type {funkcja}
     * @param {Funkcja} func Funkcja do zastosowania parametru rest.
     * @returns {Funkcja} Zwraca nową funkcję.
     */
    varCastRest = baseRest;

    /**
     * W razie potrzeby rzutuje tablicę na plasterek.
     *
     * @prywatne
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {liczba} start Pozycja początkowa.
     * @param {liczba} [koniec=tablica.długość] Pozycja końcowa.
     * @returns {Array} Zwraca rzutowany plasterek.
     */
    function castSlice(array, start, end) {
      zmienna długość = tablica.długość;
      koniec = koniec === niezdefiniowany ? długość : koniec;
      return (!start && end >= długość) ? tablica : baseSlice(tablica, początek, koniec);
    }

    /**
     * Proste opakowanie wokół globalnego [`clearTimeout`](https://mdn.io/clearTimeout).
     *
     * @prywatne
     * @param {number|Object} id Identyfikator timera lub obiekt timeout timera do wyczyszczenia.
     */
    var clearTimeout = ctxClearTimeout || funkcja(id) {
      return root.clearTimeout(id);
    };

    /**
     * Tworzy klon `bufora`.
     *
     * @prywatne
     * Bufor @param {Buffer} Bufor do sklonowania.
     * @param {boolean} [isDeep] Określ głęboki klon.
     * @returns {Buffer} Zwraca sklonowany bufor.
     */
    function cloneBuffer(buffer, isDeep) {
      jeśli (jest głęboko) {
        zwróć bufor.wycinek();
      }
      długość zmiennej = długość.bufora,
          wynik = allocUnsafe ? allocUnsafe(length) : nowy buffer.constructor(length);

      bufor.kopia(wynik);
      zwróć wynik;
    }

    /**
     * Tworzy klon `arrayBuffer`.
     *
     * @prywatne
     * @param {ArrayBuffer} arrayBuffer Bufor tablicy do sklonowania.
     * @returns {ArrayBuffer} Zwraca sklonowany bufor tablicy.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var wynik = new arrayBuffer.constructor(arrayBuffer.byteLength);
      nowy Uint8Array(result).set(nowy Uint8Array(arrayBuffer));
      zwróć wynik;
    }

    /**
     * Tworzy klon `dataView`.
     *
     * @prywatne
     * @param {Object} dataView Widok danych do sklonowania.
     * @param {boolean} [isDeep] Określ głęboki klon.
     * @returns {Object} Zwraca widok sklonowanych danych.
     */
    function cloneDataView(dataView, isDeep) {
      bufor var = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      zwróć nowe dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }

    /**
     * Tworzy klon `regexp`.
     *
     * @prywatne
     * @param {Object} regexp Wyrażenie regularne do sklonowania.
     * @returns {Object} Zwraca sklonowane wyrażenie regularne.
     */
    funkcja cloneRegExp(regexp) {
      var wynik = nowy regexp.constructor(regexp.source, reFlags.exec(regexp));
      wynik.lastIndex = regexp.lastIndex;
      zwróć wynik;
    }

    /**
     * Tworzy klon obiektu `symbol`.
     *
     * @prywatne
     * @param {Object} symbol Obiekt symbolu do sklonowania.
     * @returns {Object} Zwraca sklonowany obiekt symbolu.
     */
    funkcja cloneSymbol(symbol) {
      return symbolValueOf ? Obiekt(symbolValueOf.call(symbol)) : {};
    }

    /**
     * Tworzy klon `typedArray`.
     *
     * @prywatne
     * @param {Object} typedArray Wpisana tablica do sklonowania.
     * @param {boolean} [isDeep] Określ głęboki klon.
     * @returns {Object} Zwraca sklonowaną tablicę typu.
     */
    function cloneTypedArray(typedArray, isDeep) {
      bufor var = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    /**
     * Porównuje wartości, aby posortować je w porządku rosnącym.
     *
     * @prywatne
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {number} Zwraca wskaźnik porządku sortowania dla `wartość`.
     */
    funkcja PorównajRosnąco(wartość, inne) {
      jeśli (wartość !== inny) {
        var valIsDefined = wartość !== niezdefiniowana,
            valIsNull = wartość === null,
            wartIsRefleksyjny = wartość === wartość,
            valIsSymbol = isSymbol(wartość);

        var othIsDefined = inne !== niezdefiniowane,
            othIsNull = inny === null,
            othIsReflexive = inny === inny,
            othIsSymbol = isSymbol(inne);

        if ((!othIsNull && !othIsSymbol && !valIsSymbol && wartość > inne) ||
            (valIsSymbol && othIsZdefiniowany && othIsReflexive && !othIsNull && !othIsSymbol) ||
            (valIsNull && othjestZdefiniowane && othisReflexive) ||
            (!valIsDefined && othIsReflexive) ||
            !valIsReflexive) {
          powrót 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && wartość < inne) ||
            (othIsSymbol && valIsDefinied && valIsReflexive && !valIsNull && !valIsSymbol) ||
            (othIsNull && valIsDefined && valIsReflexive) ||
            (!othIsDefined && valIsReflexive) ||
            !othIsReflexive) {
          powrót -1;
        }
      }
      zwróć 0;
    }

    /**
     * Używany przez `_.orderBy` do porównywania wielu właściwości jednej wartości z inną
     * i stabilnie je posortuj.
     *
     * Jeśli „zamówienia” nie są określone, wszystkie wartości są sortowane w porządku rosnącym. Inaczej,
     * określ kolejność „desc” dla malejącej lub „asc” dla rosnącej kolejności sortowania
     * odpowiednich wartości.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do porównania.
     * @param {Object} other Inny obiekt do porównania.
     * @param {boolean[]|string[]} orders Kolejność sortowania według każdej właściwości.
     * @returns {number} Zwraca wskaźnik porządku sortowania dla `object`.
     */
    funkcja porównujWiele(obiekt, inne, zamówienia) {
      indeks zm = -1,
          objCriteria = obiekt.kryteria,
          inneKryteria = inne.kryteria,
          długość = objKryteria.długość,
          zamówieniaDługość = zamówienia.długość;

      while (++indeks < długość) {
        var wynik = CompareAscending(objCriteria[indeks], othCriteria[indeks]);
        jeśli (wynik) {
          if (indeks >= długość zamówienia) {
            zwróć wynik;
          }
          var kolejność = zamówienia[indeks];
          zwróć wynik * (kolejność == 'desc' ? -1 : 1);
        }
      }
      // Naprawia błąd `Array#sort` w silniku JS osadzonym w aplikacjach Adobe
      // to powoduje, że w pewnych okolicznościach zapewnia taką samą wartość dla
      // „obiekt” i „inne”. Zobacz https://github.com/jashkenas/underscore/pull/1247
      // po więcej szczegółów.
      //
      // Zapewnia to również stabilne sortowanie w V8 i innych silnikach.
      // Więcej informacji znajdziesz na https://bugs.chromium.org/p/v8/issues/detail?id=90.
      zwróć obiekt.indeks - inny.indeks;
    }

    /**
     * Tworzy tablicę będącą złożeniem częściowo zastosowanych argumentów,
     * symbole zastępcze i podane argumenty w postaci pojedynczej tablicy argumentów.
     *
     * @prywatne
     * @param {Array} args Podane argumenty.
     * Częściowe argumenty @param {Array} Argumenty, które mają być poprzedzone podanymi.
     * Posiadacze @param {Array} Indeksy zastępcze `częściowe`.
     * @params {boolean} [isCurried] Określ tworzenie dla funkcji curried.
     * @returns {Array} Zwraca nową tablicę złożonych argumentów.
     */
    function composeArgs(args, częściowe, posiadacze, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          długość uchwytów = długość uchwytów,
          leftIndex = -1,
          leftLength = częściowe.długość,
          rangeLength = nativeMax(argsLength - HoldersLength, 0),
          wynik = Array(leftLength + rangeLength),
          isUncurried = !isCurried;

      while (++leftIndex < leftLength) {
        wynik[leftIndex] = częściowe[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          wynik[posiadacze[argsIndex]] = args[argsIndex];
        }
      }
      while (zakresDługość--) {
        wynik[leftIndex++] = args[argsIndex++];
      }
      zwróć wynik;
    }

    /**
     * Ta funkcja jest podobna do `composeArgs` z wyjątkiem tego, że argumenty skład
     * jest dostosowany do `_.partialRight`.
     *
     * @prywatne
     * @param {Array} args Podane argumenty.
     * Częściowe @param {Array} Argumenty, które należy dołączyć do podanych.
     * Posiadacze @param {Array} Indeksy zastępcze `częściowe`.
     * @params {boolean} [isCurried] Określ tworzenie dla funkcji curried.
     * @returns {Array} Zwraca nową tablicę złożonych argumentów.
     */
    function composeArgsRight(args, częściowe, posiadacze, isCurried) {
      var argsIndex = -1,
          argsLength = args.length,
          indeks posiadaczy = -1,
          długość uchwytów = długość uchwytów,
          rightIndex = -1,
          rightLength = częściowe.długość,
          rangeLength = nativeMax(argsLength - HoldersLength, 0),
          wynik = tablica(długość zakresu + długość prawa),
          isUncurried = !isCurried;

      while (++argsIndex < rangeLength) {
        wynik[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        wynik[offset + rightIndex] = częściowe[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        if (isUncurried || argsIndex < argsLength) {
          wynik[przesunięcie + posiadacze[indeks posiadaczy]] = args[argsIndex++];
        }
      }
      zwróć wynik;
    }

    /**
     * Kopiuje wartości `source` do `array`.
     *
     * @prywatne
     * @param {Array} source Tablica, z której mają zostać skopiowane wartości.
     * @param {Array} [array=[]] Tablica, do której mają zostać skopiowane wartości.
     * @returns {Array} Zwraca `tablic`.
     */
    funkcja copyArray(źródło, tablica) {
      indeks zm = -1,
          długość = źródło.długość;

      tablica || (tablica = Tablica(długość));
      while (++indeks < długość) {
        tablica[indeks] = źródło[indeks];
      }
      tablica zwrotów;
    }

    /**
     * Kopiuje właściwości `source` do `object`.
     *
     * @prywatne
     * @param {Object} source Obiekt, z którego mają zostać skopiowane właściwości.
     * @param {Array} props Identyfikatory właściwości do skopiowania.
     * @param {Object} [object={}] Obiekt, do którego mają zostać skopiowane właściwości.
     * @param {Funkcja} [customizer] Funkcja dostosowywania kopiowanych wartości.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function copyObject(źródło, rekwizyty, obiekt, konfigurator) {
      var jestNowa = !obiekt;
      obiekt || (obiekt = {});

      indeks zm = -1,
          długość = rekwizyty.długość;

      while (++indeks < długość) {
        klucz var = props[indeks];

        var nowaWartość = dostosowywanie
          ? konfigurator(obiekt[klucz], źródło[klucz], klucz, obiekt, źródło)
          : nieokreślony;

        if (nowaWartość === niezdefiniowana) {
          nowaWartość = źródło[klucz];
        }
        jeśli (jestNowy) {
          baseAssignValue(obiekt, klucz, nowaWartość);
        } w przeciwnym razie {
          assignValue(obiekt, klucz, nowaWartość);
        }
      }
      obiekt zwrotny;
    }

    /**
     * Kopiuje własne symbole „źródła” do „obiektu”.
     *
     * @prywatne
     * @param {Object} source Obiekt, z którego mają zostać skopiowane symbole.
     * @param {Object} [object={}] Obiekt, do którego mają zostać skopiowane symbole.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function copySymbols(źródło, obiekt) {
      return copyObject(źródło, getSymbols(źródło), obiekt);
    }

    /**
     * Kopiuje własne i odziedziczone symbole „źródła” do „obiektu”.
     *
     * @prywatne
     * @param {Object} source Obiekt, z którego mają zostać skopiowane symbole.
     * @param {Object} [object={}] Obiekt, do którego mają zostać skopiowane symbole.
     * @returns {Obiekt} Zwraca `obiekt`.
     */
    function copySymbolsIn(źródło, obiekt) {
      return copyObject(źródło, getSymbolsIn(źródło), obiekt);
    }

    /**
     * Tworzy funkcję taką jak `_.groupBy`.
     *
     * @prywatne
     * @param {Function} setter Funkcja ustawiania wartości akumulatorów.
     * @param {Funkcja} [inicjalizator] Inicjator obiektu akumulatora.
     * @returns {Funkcja} Zwraca nową funkcję agregatora.
     */
    function createAggregator(setter, inicjator) {
      funkcja powrotu (kolekcja, iteracja) {
        var func = isArray(kolekcja) ? arrayAggregator : baseAggregator,
            akumulator = inicjator ? inicjalizator() : {};

        return func(kolekcja, setter, getIteratee(iteratee, 2), akumulator);
      };
    }

    /**
     * Tworzy funkcję taką jak `_.assign`.
     *
     * @prywatne
     * @param {Function} assigner Funkcja przypisywania wartości.
     * @returns {Funkcja} Zwraca nową funkcję przypisującą.
     */
    function createAssigner(przypisujący) {
      return baseRest(function(obiekt,źródła) {
        indeks zm = -1,
            długość = źródła.długość,
            dostosowanie = długość > 1 ? źródła[długość - 1] : niezdefiniowane,
            osłona = długość > 2 ? źródła[2] : nieokreślone;

        Customizer = (assigner.length > 3 && typ dostosowania == 'funkcja')
          ? (długość--, dostosowywanie)
          : nieokreślony;

        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          dostosowanie = długość < 3 ? undefined : konfigurator;
          długość = 1;
        }
        obiekt = obiekt(obiekt);
        while (++indeks < długość) {
          var źródło = źródła[indeks];
          jeśli (źródło) {
            przypisujący (obiekt, źródło, indeks, konfigurator);
          }
        }
        obiekt zwrotny;
      });
    }

    /**
     * Tworzy funkcję `baseEach` lub `baseEachRight`.
     *
     * @prywatne
     * @param {Funkcja} eachFunc Funkcja do iteracji po kolekcji.
     * @param {boolean} [fromRight] Określ iterację od prawej do lewej.
     * @returns {Funkcja} Zwraca nową funkcję bazową.
     */
    function createBaseEach(eachFunc, fromRight) {
      funkcja powrotu (kolekcja, iteracja) {
        if (kolekcja == null) {
          odbiór zwrotów;
        }
        if (!isArrayLike(kolekcja)) {
          zwróć eachFunc(kolekcja, iteracja);
        }
        var długość = kolekcja.długość,
            indeks = od prawej ? długość : -1,
            iterowalny = obiekt(kolekcja);

        while ((fromRight ? index-- : ++index < length)) {
          if (iterowalny(iterable[indeks], indeks, iterowalny) === false) {
            złamać;
          }
        }
        odbiór zwrotów;
      };
    }

    /**
     * Tworzy funkcję bazową dla metod takich jak `_.forIn` i `_.forOwn`.
     *
     * @prywatne
     * @param {boolean} [fromRight] Określ iterację od prawej do lewej.
     * @returns {Funkcja} Zwraca nową funkcję bazową.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        indeks zm = -1,
            iterowalny = obiekt(obiekt),
            rekwizyty = keysFunc(obiekt),
            długość = rekwizyty.długość;

        podczas gdy (długość--) {
          var klucz = props[odPrawej ? długość : ++indeks];
          if (iterowalny(iterable[klucz], klucz, iterowalny) === false) {
            złamać;
          }
        }
        obiekt zwrotny;
      };
    }

    /**
     * Tworzy funkcję, która zawija `func`, aby wywołać ją z opcjonalnym `this`
     * wiązanie argumentu `thisArg`.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zawijania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `createWrap`, aby uzyskać więcej informacji.
     * @param {*} [thisArg] `To` wiązanie `func`.
     * @returns {Funkcja} Zwraca nową opakowaną funkcję.
     */
    function createBind(func, bitmask, thisArg) {
      var isBind = maska ​​bitowa i WRAP_BIND_FLAG,
          Ctor = utwórzCtor(funkcja);

      funkcja wrapper() {
        var fn = (to && to !== root && to wystąpienie opakowania) ? Ctor: funkcja;
        return fn.apply(isBind ? thisArg : this, arguments);
      }
      opakowanie zwrotne;
    }

    /**
     * Tworzy funkcję taką jak `_.lowerFirst`.
     *
     * @prywatne
     * @param {string} methodName Nazwa używanej metody `String`.
     * @returns {Funkcja} Zwraca nową funkcję przypadku.
     */
    function createCaseFirst(methodName) {
      funkcja powrotu (ciąg) {
        ciąg = toString(ciąg);

        var strSymbols = hasUnicode(ciąg)
          ? stringToArray(ciąg)
          : nieokreślony;

        var chr = strSymbols
          ? strSymbole[0]
          : string.charAt(0);

        var końcowe = strSymbols
          ? castSlice(strSymbols, 1).join('')
          : ciąg.wycinek(1);

        return chr[NazwaMetody]() + końcowe;
      };
    }

    /**
     * Tworzy funkcję taką jak `_.camelCase`.
     *
     * @prywatne
     * @param {Function} callback Funkcja łącząca każde słowo.
     * @returns {Funkcja} Zwraca nową funkcję składania.
     */
    function createCompounder(callback) {
      funkcja powrotu (ciąg) {
        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
      };
    }

    /**
     * Tworzy funkcję, która tworzy instancję `Ctor` niezależnie od
     * niezależnie od tego, czy zostało wywołane jako część wyrażenia `new`, czy przez `call` lub `apply`.
     *
     * @prywatne
     * @param {Function} Ctor Konstruktor do zawijania.
     * @returns {Funkcja} Zwraca nową opakowaną funkcję.
     */
    funkcja utwórzKtor(Ktor) {
      funkcja powrotu () {
        // Użyj instrukcji `switch` do pracy z konstruktorami klas. Widzieć
        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // po więcej szczegółów.
        var argumenty = argumenty;
        przełącznik (args.length) {
          przypadek 0: zwróć nowego Ctora;
          przypadek 1: zwróć nowy Ctor(args[0]);
          przypadek 2: zwróć nowy Ctor(args[0], args[1]);
          przypadek 3: zwróć nowy Ctor(args[0], args[1], args[2]);
          przypadek 4: zwróć nowy Ctor(args[0], args[1], args[2], args[3]);
          przypadek 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          przypadek 6: zwróć nowy Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          przypadek 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            wynik = Ctor.apply(thisBinding, args);

        // Naśladuj zachowanie konstruktora `return`.
        // Więcej informacji znajdziesz na https://es5.github.io/#x13.2.2.
        return isObject(result) ? wynik : to powiązanie;
      };
    }

    /**
     * Tworzy funkcję, która zawija `func`, aby umożliwić curry.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zawijania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `createWrap`, aby uzyskać więcej informacji.
     * @param {liczba} arity Arity funkcji `func`.
     * @returns {Funkcja} Zwraca nową opakowaną funkcję.
     */
    function createCurry(func, bitmask, arity) {
      var Ctor = utwórzCtor(funkcja);

      funkcja wrapper() {
        zmienna długość = argumenty.długość,
            argumenty = Tablica(długość),
            indeks = długość,
            symbol zastępczy = getHolder(opakowanie);

        podczas gdy (indeks--) {
          args[indeks] = argumenty[indeks];
        }
        var holders = (długość < 3 && args[0] !== symbol zastępczy && args[length - 1] !== symbol zastępczy)
          ? []
          : replaceHolder(args, placeholder);

        długość -= posiadacze.długość;
        if (długość < arność) {
          zwróć utwórzRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, undefined,
            args, posiadacze, undefined, undefined, arity - length);
        }
        var fn = (to && to !== root && to wystąpienie opakowania) ? Ctor: funkcja;
        return zastosuj(fn, this, args);
      }
      opakowanie zwrotne;
    }

    /**
     * Tworzy funkcję `_.find` lub `_.findLast`.
     *
     * @prywatne
     * @param {Funkcja} findIndexFunc Funkcja wyszukiwania indeksu kolekcji.
     * @returns {Funkcja} Zwraca nową funkcję wyszukiwania.
     */
    funkcja createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        zmienna iterowalna = Obiekt(kolekcja);
        if (!isArrayLike(kolekcja)) {
          var iteratee = getIteratee(predykat, 3);
          kolekcja = klucze(kolekcja);
          predykat = function(klucz) { return iteratee(iterable[klucz], klucz, iterowalny); };
        }
        var index = findIndexFunc(kolekcja, predykat, fromIndex);
        zwróć indeks > -1 ? iterowalny[iterowalny ? kolekcja[indeks] : indeks] : niezdefiniowane;
      };
    }

    /**
     * Tworzy funkcję `_.flow` lub `_.flowRight`.
     *
     * @prywatne
     * @param {boolean} [fromRight] Określ iterację od prawej do lewej.
     * @returns {Funkcja} Zwraca nową funkcję przepływu.
     */
    function createFlow(fromRight) {
      return flatRest(funkcja(funkcje) {
        var length = funcs.length,
            indeks = długość,
            prereq = LodashWrapper.prototype.thru;

        jeśli (od prawej) {
          funcs.reverse();
        }
        podczas gdy (indeks--) {
          var func = funcs[indeks];
          if (typ funkcji != 'funkcja') {
            wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
          }
          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
            var wrapper = new LodashWrapper([], true);
          }
        }
        indeks = opakowanie ? indeks : długość;
        while (++indeks < długość) {
          func = funcs[indeks];

          var funcName = getFuncName(func),
              data = nazwa_funkcji == 'opakowanie' ? getData(func) : niezdefiniowane;

          if (dane && isLaziable(data[0]) &&
                dane[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
                !dane[4].długość && dane[9] == 1
              ) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } w przeciwnym razie {
            wrapper = (func.length == 1 && isLaziable(func))
              ? wrapper[nazwa_funkcji]()
              : wrapper.thru(funkcja);
          }
        }
        funkcja powrotu () {
          var argumenty = argumenty,
              wartość = args[0];

          if (opakowanie && args.length == 1 && isArray(wartość)) {
            return wrapper.plant(value).value();
          }
          indeks zm = 0,
              wynik = długość ? funcs[indeks].apply(this, args) : wartość;

          while (++indeks < długość) {
            wynik = funcs[indeks].call(to, wynik);
          }
          zwróć wynik;
        };
      });
    }

    /**
     * Tworzy funkcję, która opakowuje `func` do wywołania z opcjonalnym `this`
     * wiązanie `thisArg`, częściowe zastosowanie i currying.
     *
     * @prywatne
     * @param {Function|string} func Nazwa funkcji lub metody do zawijania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `createWrap`, aby uzyskać więcej informacji.
     * @param {*} [thisArg] `To` wiązanie `func`.
     * @param {Array} [częściowe] Argumenty, które należy dodać przed argumentami dostarczonymi do
     * nowa funkcja.
     * @param {Array} [holders] Indeksy zastępcze `częściowe`.
     * @param {Array} [partialsRight] Argumenty do dołączenia do podanych
     * do nowej funkcji.
     * @param {Array} [holdersRight] Indeksy zastępcze `partialsRight`.
     * @param {Array} [argPos] Pozycje argumentów nowej funkcji.
     * @param {liczba} [ary] Limit aryczności funkcji `func`.
     * @param {liczba} [arity] Arity funkcji `func`.
     * @returns {Funkcja} Zwraca nową opakowaną funkcję.
     */
    function createHybrid(func, bitmask, thisArg, częściowe, posiadacze, częścioweRight, posiadaczeRight, argPos, ary, arity) {
      var isAry = maska ​​bitowa i WRAP_ARY_FLAG,
          isBind = maska ​​bitowa i WRAP_BIND_FLAG,
          isBindKey = maska ​​bitowa i WRAP_BIND_KEY_FLAG,
          isCurried = maska ​​bitowa i (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = maska ​​bitowa i WRAP_FLIP_FLAG,
          Ctor = isBindKey ? niezdefiniowany : createCtor(func);

      funkcja wrapper() {
        zmienna długość = argumenty.długość,
            argumenty = Tablica(długość),
            indeks = długość;

        podczas gdy (indeks--) {
          args[indeks] = argumenty[indeks];
        }
        jeśli (jest zajęty) {
          var placeholder = getHolder(opakowanie),
              holdersCount = countHolders(argi, symbol zastępczy);
        }
        jeśli (częściowo) {
          args = composeArgs(args, częściowe, posiadacze, isCurried);
        }
        if (partiasRight) {
          args = composeArgsRight(args, PartialsRight, holdersRight, isCurried);
        }
        długość -= liczba posiadaczy;
        if (isCurried && length < arity) {
          var newHolders = replaceHolders(argi, symbol zastępczy);
          zwróć utwórzRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : to,
            fn = isBindKey ? toPowiązanie[func] : func;

        długość = argumenty.długość;
        jeśli (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip && length > 1) {
          args.reverse();
        }
        if (isAry && ary < długość) {
          args.length = ar;
        }
        if (to && to !== root && to wystąpienie opakowania) {
          fn = Ctor || utwórzCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      opakowanie zwrotne;
    }

    /**
     * Tworzy funkcję taką jak `_.invertBy`.
     *
     * @prywatne
     * @param {Function} setter Funkcja ustawiania wartości akumulatorów.
     * @param {Funkcja} toIteratee Funkcja rozwiązywania iteracji.
     * @returns {Funkcja} Zwraca nową funkcję falownika.
     */
    function createInverter(setter, toIteratee) {
      funkcja powrotu (obiekt, iteracja) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Tworzy funkcję, która wykonuje operację matematyczną na dwóch wartościach.
     *
     * @prywatne
     * @param {Function} operator Funkcja do wykonania operacji.
     * @param {liczba} [wartość domyślna] Wartość używana dla argumentów „niezdefiniowanych”.
     * @returns {Funkcja} Zwraca nową funkcję operacji matematycznej.
     */
    function createMathOperation(operator, defaultValue) {
      funkcja powrotu (wartość, inne) {
        var wynik;
        if (wartość === nieokreślone && inne === nieokreślone) {
          zwróć wartość domyślną;
        }
        if (wartość !== niezdefiniowana) {
          wynik = wartość;
        }
        if (inne !== niezdefiniowane) {
          if (wynik === niezdefiniowany) {
            zwróć inne;
          }
          if (typeof value == 'string' || typeof other == 'string') {
            wartość = baseToString(wartość);
            inny = baseToString(inny);
          } w przeciwnym razie {
            wartość = bazaDoLiczby(wartość);
            inny = numerpodstawowy(inny);
          }
          wynik = operator(wartość, inne);
        }
        zwróć wynik;
      };
    }

    /**
     * Tworzy funkcję taką jak `_.over`.
     *
     * @prywatne
     * @param {Function} arrayFunc Funkcja do iteracji po iteracjach.
     * @returns {Funkcja} Zwraca nową funkcję over.
     */
    function createOver(arrayFunc) {
      return flatRest(function(iteratees) {
        iteracje = arrayMap(iteracje, baseUnary(getIteratee()));
        return baseRest(function(args) {
          var tenArg = to;
          return arrayFunc(iteracje, function(iterate) {
            return zastosuj(iteracja, thisArg, args);
          });
        });
      });
    }

    /**
     * Tworzy dopełnienie dla „ciągu” na podstawie „długości”. Ciąg znaków `chars`
     * jest obcinane, jeśli liczba znaków przekracza `długość`.
     *
     * @prywatne
     * @param {number} length Długość wypełnienia.
     * @param {ciąg} [chars=' '] Ciąg używany jako wypełnienie.
     * @returns {string} Zwraca dopełnienie dla `string`.
     */
    function createPadding(długość, znaki) {
      znaki = znaki === niezdefiniowane ? ' ' : baseToString(znaki);

      var długość_znaku = długość_znaku;
      if (długość znaków < 2) {
        return charsLength ? baseRepeat(znaki, długość) : znaki;
      }
      var wynik = baseRepeat(znaki, nativeCeil(długość / stringSize(znaki)));
      return hasUnicode(znaki)
        ? castSlice(stringToArray(wynik), 0, length).join('')
        : wynik.wycinek(0, długość);
    }

    /**
     * Tworzy funkcję, która zawija `func`, aby wywołać ją z `this` bindingiem
     * argumentów `thisArg` i `partals` dołączanych do otrzymanych argumentów.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zawijania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `createWrap`, aby uzyskać więcej informacji.
     * @param {*} thisArg `to` powiązanie `func`.
     * Częściowe argumenty @param {Array} Argumenty, które należy dodać przed argumentami dostarczonymi do
     * nowa funkcja.
     * @returns {Funkcja} Zwraca nową opakowaną funkcję.
     */
    function createPartial(func, maska ​​bitowa, thisArg, częściowe) {
      var isBind = maska ​​bitowa i WRAP_BIND_FLAG,
          Ctor = utwórzCtor(funkcja);

      funkcja wrapper() {
        var argsIndex = -1,
            argsLength = argumenty.length,
            leftIndex = -1,
            leftLength = częściowe.długość,
            args = Array(leftLength + argsLength),
            fn = (to && to !== root && to wystąpienie opakowania) ? Ctor: funkcja;

        while (++leftIndex < leftLength) {
          args[leftIndex] = częściowe[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = argumenty[++argsIndex];
        }
        return zastosuj(fn, isBind ? thisArg : this, args);
      }
      opakowanie zwrotne;
    }

    /**
     * Tworzy funkcję `_.range` lub `_.rangeRight`.
     *
     * @prywatne
     * @param {boolean} [fromRight] Określ iterację od prawej do lewej.
     * @returns {Funkcja} Zwraca nową funkcję zakresu.
     */
    function createRange(fromRight) {
      funkcja powrotu (początek, koniec, krok) {
        if (krok && typ kroku != 'liczba' && isIterateeCall(początek, koniec, krok)) {
          koniec = krok = niezdefiniowany;
        }
        // Upewnij się, że znak `-0` jest zachowany.
        start = toFinite(start);
        if (koniec === niezdefiniowany) {
          koniec = początek;
          początek = 0;
        } w przeciwnym razie {
          koniec = toFinite(koniec);
        }
        krok = krok === niezdefiniowany ? (początek < koniec ? 1 : -1) : toFinite(krok);
        return zakres bazowy(początek, koniec, krok, od prawej);
      };
    }

    /**
     * Tworzy funkcję, która wykonuje relacyjną operację na dwóch wartościach.
     *
     * @prywatne
     * @param {Function} operator Funkcja do wykonania operacji.
     * @returns {Funkcja} Zwraca nową relacyjną funkcję operacji.
     */
    function createRelationalOperation(operator) {
      funkcja powrotu (wartość, inne) {
        if (!(typeof value == 'string' && typeof other == 'string')) {
          wartość = toLiczba(wartość);
          inny = toNumer(inny);
        }
        operator powrotu (wartość, inne);
      };
    }

    /**
     * Tworzy funkcję, która zawija `func`, aby kontynuować curry.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zawijania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `createWrap`, aby uzyskać więcej informacji.
     * @param {Funkcja} wrapFunc Funkcja tworząca opakowanie `func`.
     * @param {*} symbol zastępczy Wartość symbolu zastępczego.
     * @param {*} [thisArg] `To` wiązanie `func`.
     * @param {Array} [częściowe] Argumenty, które należy dodać przed argumentami dostarczonymi do
     * nowa funkcja.
     * @param {Array} [holders] Indeksy zastępcze `częściowe`.
     * @param {Array} [argPos] Pozycje argumentów nowej funkcji.
     * @param {liczba} [ary] Limit aryczności funkcji `func`.
     * @param {liczba} [arity] Arity funkcji `func`.
     * @returns {Funkcja} Zwraca nową opakowaną funkcję.
     */
    function createRecurry(func, maska ​​bitowa, wrapFunc, placeholder, thisArg, częściowe, posiadacze, argPos, ary, arity) {
      var isCurry = maska ​​bitowa i WRAP_CURRY_FLAG,
          newHolders = isCurry ? posiadacze : niezdefiniowane,
          newHoldersRight = isCurry ? undefined : posiadacze,
          newPartials = isCurry ? podszablony : niezdefiniowane,
          newPartialsRight = isCurry ? niezdefiniowane : podszablony;

      maska ​​bitowa |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
      maska ​​bitowa &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

      if (!(maska ​​bitowa i WRAP_CURRY_BOUND_FLAG)) {
        maska ​​bitowa &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
      }
      zmienna noweDane = [
        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
        newHoldersRight, argPos, ary, arity
      ];

      var wynik = wrapFunc.apply(undefined, newData);
      if (jestLaziable(func)) {
        setData(wynik, noweDane);
      }
      wynik.placeholder = symbol zastępczy;
      return setWrapToString(result, func, bitmask);
    }

    /**
     * Tworzy funkcję taką jak `_.round`.
     *
     * @prywatne
     * @param {string} methodName Nazwa metody `Math` do użycia podczas zaokrąglania.
     * @returns {Funkcja} Zwraca nową funkcję round.
     */
    function createRound(methodName) {
      var func = Math[nazwametody];
      funkcja powrotu (liczba, precyzja) {
        liczba = toLiczba(liczba);
        precyzja = precyzja == null ? 0 : nativeMin(toInteger(precyzja), 292);
        if (precyzja && nativeIsFinite(liczba)) {
          // Przesuń z notacją wykładniczą, aby uniknąć problemów zmiennoprzecinkowych.
          // Zobacz [MDN](https://mdn.io/round#Examples), aby uzyskać więcej informacji.
          var pair = (toString(liczba) + 'e').split('e'),
              wartość = func(para[0] + 'e' + (+para[1] + precyzja));

          pair = (toString(wartość) + 'e').split('e');
          return +(para[0] + 'e' + (+para[1] - precyzja));
        }
        funkcja powrotu (liczba);
      };
    }

    /**
     * Tworzy zestaw obiektów `wartości`.
     *
     * @prywatne
     * @param {Array} wartości Wartości do dodania do zestawu.
     * @returns {Obiekt} Zwraca nowy zestaw.
     */
    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : funkcja(wartości) {
      zwróć nowe Set(wartości);
    };

    /**
     * Tworzy funkcję `_.toPairs` lub `_.toPairsIn`.
     *
     * @prywatne
     * @param {Funkcja} keysFunc Funkcja pobierająca klucze danego obiektu.
     * @returns {Funkcja} Zwraca nową funkcję par.
     */
    function createToPairs(keysFunc) {
      funkcja powrotu (obiekt) {
        var tag = pobierzTag(obiekt);
        if (tag == mapTag) {
          return mapToArray(obiekt);
        }
        if (tag == setTag) {
          zwróć setToPairs(obiekt);
        }
        return baseToPairs(obiekt, keysFunc(obiekt));
      };
    }

    /**
     * Tworzy funkcję, która albo curries, albo wywołuje `func` z opcjonalnym
     * `this` wiązanie i częściowo zastosowane argumenty.
     *
     * @prywatne
     * @param {Function|string} func Nazwa funkcji lub metody do zawijania.
     * @param {liczba} bitmask Flagi maski bitowej.
     * 1 - `_.bind`
     * 2 - `_.bindKey`
     * 4 - `_.curry` lub `_.curryRight` funkcji powiązanej
     * 8 - `_.curry`
     * 16 - `_.curryPrawo`
     * 32 - `_.częściowy`
     * 64 - `_.partialRight`
     * 128 - `_.rearg`
     * 256 - `_.ary`
     * 512 - `_.flip`
     * @param {*} [thisArg] `To` wiązanie `func`.
     * @param {Array} [częściowe] Argumenty do częściowego zastosowania.
     * @param {Array} [holders] Indeksy zastępcze `częściowe`.
     * @param {Array} [argPos] Pozycje argumentów nowej funkcji.
     * @param {liczba} [ary] Limit aryczności funkcji `func`.
     * @param {liczba} [arity] Arity funkcji `func`.
     * @returns {Funkcja} Zwraca nową opakowaną funkcję.
     */
    function createWrap(func, bitmask, thisArg, częściowe, posiadacze, argPos, ary, arity) {
      var isBindKey = maska ​​bitowa & WRAP_BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      var length = częściowe ? części.długość : 0;
      jeśli (!długość) {
        maska ​​bitowa &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        podszablony = posiadacze = niezdefiniowane;
      }
      ary = ary === niezdefiniowane ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === niezdefiniowane ? arity : toInteger(arity);
      długość -= uchwyty ? posiadacze.długość : 0;

      jeśli (maska ​​bitowa i WRAP_PARTIAL_RIGHT_FLAG) {
        var częściowePrawo = częściowe,
            posiadaczePrawo = posiadacze;

        podszablony = posiadacze = niezdefiniowane;
      }
      var data = isBindKey ? undefined : getData(func);

      zmienna noweDane = [
        func, bitmask, thisArg, częściowe, posiadacze, częściowe po prawej, posiadacze po prawej,
        argPos, ary, arity
      ];

      jeśli (dane) {
        scalDane(noweDane, dane);
      }
      func = noweDane[0];
      maska ​​bitowa = newData[1];
      tenArg = noweDane[2];
      częściowe = newData[3];
      posiadacze = newData[4];
      arity = noweDane[9] = noweDane[9] === niezdefiniowane
        ? (isBindKey ? 0 : długość.funkcji)
        : nativeMax(newData[9] - długość, 0);

      if (!arity && bitmaska ​​& (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        maska ​​bitowa &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var wynik = createBind(func, bitmask, thisArg);
      } else if (maska ​​bitowa == WRAP_CURRY_FLAG || maska ​​bitowa == WRAP_CURRY_RIGHT_FLAG) {
        wynik = createCurry(funkcja, maska ​​bitowa, arity);
      } else if ((maska ​​bitowa == WRAP_PARTIAL_FLAG || maska ​​bitowa == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
        wynik = createPartial(funkcja, maska ​​bitowa, thisArg, częściowe);
      } w przeciwnym razie {
        wynik = createHybrid.apply(undefined, newData);
      }
      zmienna ustawiająca = dane ? baseSetData : setData;
      return setWrapToString(setter(wynik, noweDane), func, maska ​​bitowa);
    }

    /**
     * Używany przez `_.defaults` do dostosowywania użycia `_.assignIn` do przypisywania właściwości
     * obiektów źródłowych do obiektu docelowego dla wszystkich właściwości docelowych
     * które rozstrzygają się na `nieokreślone`.
     *
     * @prywatne
     * @param {*} objValue Wartość docelowa.
     * @param {*} srcValue Wartość źródłowa.
     * @param {string} klucz Klucz właściwości do przypisania.
     * @param {Object} obiekt Rodzic obiekt `objValue`.
     * @returns {*} Zwraca wartość do przypisania.
     */
    funkcja customDefaultsAssignIn(objValue, srcValue, klucz, obiekt) {
      if (objValue === niezdefiniowane ||
          (eq(objValue, objectProto[klucz]) && !hasOwnProperty.call(obiekt, klucz))) {
        return srcValue;
      }
      zwróć objValue;
    }

    /**
     * Używany przez `_.defaultsDeep` do dostosowania jego użycia `_.merge` do scalania źródeł
     * obiekty do obiektów docelowych, które są przekazywane.
     *
     * @prywatne
     * @param {*} objValue Wartość docelowa.
     * @param {*} srcValue Wartość źródłowa.
     * @param {string} klucz Klucz właściwości do scalenia.
     * @param {Object} obiekt Rodzic obiekt `objValue`.
     * @param {Object} source Obiekt nadrzędny `srcValue`.
     * @param {Object} [stack] Śledzi przebyte wartości źródłowe i ich scalanie
     * odpowiedniki.
     * @returns {*} Zwraca wartość do przypisania.
     */
    function customDefaultsMerge(objValue, srcValue, klucz, obiekt, źródło, stos) {
      if (isObject(objValue) && isObject(srcValue)) {
        // Rekursywne łączenie obiektów i tablic (możliwe do wywołania limitów stosu).
        stack.set(srcValue, objValue);
        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stos);
        stos['usuń'](srcValue);
      }
      zwróć objValue;
    }

    /**
     * Używany przez `_.omit`, aby dostosować jego użycie `_.cloneDeep` tylko do zwykłego klonowania
     * przedmioty.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @param {string} klucz Klucz właściwości do sprawdzenia.
     * @returns {*} Zwraca niesklonowaną wartość lub `undefined` aby odroczyć klonowanie `_.cloneDeep`.
     */
    funkcja customOmitClone(wartość) {
      return isPlainObject(wartość) ? niezdefiniowane : wartość;
    }

    /**
     * Specjalistyczna wersja `baseIsEqualDeep` dla tablic z obsługą
     * częściowe głębokie porównania.
     *
     * @prywatne
     * @param {Array} tablica Tablica do porównania.
     * @param {Array} other Inna tablica do porównania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `baseIsEqual`, aby uzyskać więcej informacji.
     * Dostosowywanie @param {Function} Funkcja dostosowywania porównań.
     * @param {Funkcja} equalFunc Funkcja określająca ekwiwalenty wartości.
     * Stos @param {Object} Śledzi przemierzane obiekty `tablicy` i `inne`.
     * @returns {boolean} Zwraca `true`, jeśli tablice są równoważne, w przeciwnym razie `false`.
     */
    function equalArrays(tablica, inne, maska ​​bitowa, dostosowanie, equalFunc, stos) {
      var isPartial = maska ​​bitowa i COMPARE_PARTIAL_FLAG,
          arrLength = tablica.długość,
          othLength = inna.długość;

      if (arrLength != othLength && !(isCzęściowa && othLength > ArrLength)) {
        zwróć fałsz;
      }
      // Załóżmy, że wartości cykliczne są równe.
      var ułożone = stos.get(tablica);
      if (ułożone && stos.get(inne)) {
        powrót skumulowany == inny;
      }
      indeks zm = -1,
          wynik = prawda,
          widziano = (maska ​​bitowa i COMPARE_UNORDERED_FLAG) ? nowy SetCache : niezdefiniowany;

      stack.set(tablica, inne);
      stack.set(inne, tablica);

      // Ignoruj ​​właściwości bez indeksu.
      while (++indeks < arrLength) {
        var ArrValue = tablica[indeks],
            othValue = inne[indeks];

        jeśli (klient) {
          porównywana zmienna = jest częściowa
            ? Customizer(othValue, arrValue, index, other, array, stack)
            : Customizer(arrValue, othValue, index, tablica, inne, stos);
        }
        if (w porównaniu !== niezdefiniowane) {
          jeśli (w porównaniu) {
            kontyntynuj;
          }
          wynik = fałsz;
          złamać;
        }
        // Rekursywnie porównuj tablice (podatne na limity stosu wywołań).
        jeśli (widziany) {
          if (!arraySome(other, function(othValue, othIndex) {
                if (! cacheHas(seen, othIndex) &&
                    (arrValue === othValue || equalFunc(arrValue, othValue, maska ​​bitowa, dostosowywanie, stos))) {
                  return seen.push(othIndex);
                }
              })) {
            wynik = fałsz;
            złamać;
          }
        } w przeciwnym razie (!(
              ArrValue === othValue ||
                equalFunc(arrValue, othValue, maska ​​bitowa, dostosowywanie, stos)
            )) {
          wynik = fałsz;
          złamać;
        }
      }
      stos['usuń'](tablica);
      stos['usuń'](inne);
      zwróć wynik;
    }

    /**
     * Specjalistyczna wersja `baseIsEqualDeep` do porównywania obiektów
     * ten sam `toStringTag`.
     *
     * **Uwaga:** Ta funkcja obsługuje tylko porównywanie wartości ze znacznikami
     * „Boolean”, „Data”, „Błąd”, „Numer”, „RegExp” lub „Ciąg”.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do porównania.
     * @param {Object} other Inny obiekt do porównania.
     * @param {string} tag `toStringTag` obiektów do porównania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `baseIsEqual`, aby uzyskać więcej informacji.
     * Dostosowywanie @param {Function} Funkcja dostosowywania porównań.
     * @param {Funkcja} equalFunc Funkcja określająca ekwiwalenty wartości.
     * Stos @param {Object} Śledzi przemierzane obiekty `object` i `inne`.
     * @returns {boolean} Zwraca `true` jeśli obiekty są równoważne, w przeciwnym razie `false`.
     */
    function equalByTag(object, other, tag, bitmask, Customizer, equalFunc, stack) {
      przełącznik (tag) {
        dane przypadku ViewTag:
          if ((object.byteLength != other.byteLength) ||
              (object.byteOffset != other.byteOffset)) {
            zwróć fałsz;
          }
          obiekt = obiekt.bufor;
          inny = inny.bufor;

        tablica przypadkuBufferTag:
          if ((object.byteLength != other.byteLength) ||
              !equalFunc(nowy Uint8Array(obiekt), nowy Uint8Array(inny))) {
            zwróć fałsz;
          }
          zwróć prawdę;

        sprawa boolTag:
        data sprawyTag:
        numer sprawyTag:
          // Wymuszenie wartości logicznych na „1” lub „0” i daty na milisekundy.
          // Nieprawidłowe daty są zamieniane na `NaN`.
          return eq(+obiekt, +inne);

        przypadek błędu Tag:
          return object.name == other.name && object.message == other.message;

        tag wyrażenia regularnego wielkości liter:
        sprawa ciągTag:
          // Wymuszaj wyrażenia regularne do łańcuchów i traktuj łańcuchy, prymitywy i obiekty,
          // równe. Zobacz http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
          // po więcej szczegółów.
          zwróć obiekt == (inne + '');

        mapa przypadkuTag:
          var konwertuj = mapToArray;

        zestaw etuiTag:
          var isPartial = maska ​​bitowa & COMPARE_PARTIAL_FLAG;
          konwertuj || (konwertuj = setToArray);

          if (object.size != other.size && !isPartial) {
            zwróć fałsz;
          }
          // Załóżmy, że wartości cykliczne są równe.
          var ułożone = stos.get(obiekt);
          jeśli (ułożone) {
            powrót skumulowany == inny;
          }
          maska ​​bitowa |= COMPARE_UNORDERED_FLAG;

          // Rekursywnie porównuj obiekty (podatne na limity stosu wywołań).
          stack.set(obiekt, inne);
          var wynik = equalArrays(konwertuj(obiekt), konwertuj(inne), maska ​​bitowa, dostosowywanie, equalFunc, stos);
          stos['usuń'](obiekt);
          zwróć wynik;

        symbol sprawyTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      zwróć fałsz;
    }

    /**
     * Specjalistyczna wersja `baseIsEqualDeep` dla obiektów z obsługą
     * częściowe głębokie porównania.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do porównania.
     * @param {Object} other Inny obiekt do porównania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `baseIsEqual`, aby uzyskać więcej informacji.
     * Dostosowywanie @param {Function} Funkcja dostosowywania porównań.
     * @param {Funkcja} equalFunc Funkcja określająca ekwiwalenty wartości.
     * Stos @param {Object} Śledzi przemierzane obiekty `object` i `inne`.
     * @returns {boolean} Zwraca `true` jeśli obiekty są równoważne, w przeciwnym razie `false`.
     */
    function equalObjects(obiekt, inne, maska ​​bitowa, dostosowywanie, equalFunc, stos) {
      var isPartial = maska ​​bitowa i COMPARE_PARTIAL_FLAG,
          objProps = getAllKeys(obiekt),
          objLength = objProps.length,
          othProps = pobierzWszystkieKlucze(inne),
          othLength = othProps.length;

      if (objLength != othLength && !isCzęściowy) {
        zwróć fałsz;
      }
      indeks var = długość obiektu;
      podczas gdy (indeks--) {
        klucz var = objProps[indeks];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          zwróć fałsz;
        }
      }
      // Załóżmy, że wartości cykliczne są równe.
      var ułożone = stos.get(obiekt);
      if (ułożone && stos.get(inne)) {
        powrót skumulowany == inny;
      }
      var wynik = prawda;
      stack.set(obiekt, inne);
      stack.set(inne, obiekt);

      var skipCtor = jestCzęściowy;
      while (++indeks < długość obj) {
        klucz = objProps[indeks];
        var objValue = obiekt[klucz],
            othValue = inny[klucz];

        jeśli (klient) {
          porównywana zmienna = jest częściowa
            ? Customizer(othValue, objValue, klucz, inne, obiekt, stos)
            : Customizer(objValue, othValue, klucz, obiekt, inne, stos);
        }
        // Rekursywnie porównuj obiekty (podatne na limity stosu wywołań).
        if (!(porównane === niezdefiniowane
              ? (objValue === othValue || equalFunc(objValue, othValue, maska ​​bitowa, dostosowywanie, stos))
              : w porównaniu
            )) {
          wynik = fałsz;
          złamać;
        }
        pomińCtor || (skipCtor = klucz == 'konstruktor');
      }
      if (wynik && !skipCtor) {
        var objCtor = obiekt.konstruktor,
            othCtor = inny.konstruktor;

        // Instancje obiektów innych niż `Object` z różnymi konstruktorami nie są równe.
        if (objCtor != innyCtor &&
            ('konstruktor' w obiekcie && 'konstruktor' w innym) &&
            !(typeof objCtor == 'funkcja' && objCtor instancja objCtor &&
              typeof othCtor == 'funkcja' && othCtor instancja othCtor)) {
          wynik = fałsz;
        }
      }
      stos['usuń'](obiekt);
      stos['usuń'](inne);
      zwróć wynik;
    }

    /**
     * Specjalistyczna wersja `baseRest`, która spłaszcza tablicę reszty.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zastosowania parametru rest.
     * @returns {Funkcja} Zwraca nową funkcję.
     */
    funkcja flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }

    /**
     * Tworzy tablicę własnych, przeliczalnych nazw właściwości i symboli `object`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę nazw właściwości i symboli.
     */
    function getAllKeys(obiekt) {
      return baseGetAllKeys(obiekt, klucze, getSymbols);
    }

    /**
     * Tworzy tablicę własnych i dziedziczonych, przeliczalnych nazw właściwości i
     * symbole „obiektu”.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę nazw właściwości i symboli.
     */
    function getAllKeysIn(object) {
      return baseGetAllKeys(object, keysIn, getSymbolsIn);
    }

    /**
     * Pobiera metadane dla `func`.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zapytania.
     * @returns {*} Zwraca metadane dla funkcji `func`.
     */
    var getData = !metaMapa ? noop : funkcja(funkcja) {
      zwróć metaMap.get(func);
    };

    /**
     * Pobiera nazwę `func`.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zapytania.
     * @returns {string} Zwraca nazwę funkcji.
     */
    funkcja getFuncName(func) {
      var wynik = (nazwa.funkcji + ''),
          tablica = nazwy_rzeczywiste[wynik],
          length = hasOwnProperty.call(realNames, result) ? tablica.długość : 0;

      podczas gdy (długość--) {
        var data = tablica[długość],
            innaFunkcja = data.func;
        if (otherFunc == null || otherFunc == func) {
          zwróć dane.nazwa;
        }
      }
      zwróć wynik;
    }

    /**
     * Pobiera wartość zastępczą argumentu dla `func`.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do sprawdzenia.
     * @returns {*} Zwraca wartość symbolu zastępczego.
     */
    funkcja getHolder(funkcja) {
      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : funkcja;
      zwróć obiekt.placeholder;
    }

    /**
     * Pobiera odpowiednią funkcję "iterani". Jeśli plik `_.iteratee` jest dostosowany,
     * ta funkcja zwraca metodę niestandardową, w przeciwnym razie zwraca `baseIteratee`.
     * Jeśli podano argumenty, wybrana funkcja jest wywoływana z nimi i
     * zwracany jest jego wynik.
     *
     * @prywatne
     * @param {*} [wartość] Wartość do konwersji na iterację.
     * @param {numer} [arity] Ararysność tworzonego iteratora.
     * @returns {Funkcja} Zwraca wybraną funkcję lub jej wynik.
     */
    funkcja getIteratee() {
      var wynik = lodash.iteratee || iterowany;
      wynik = wynik === iteracja ? baseIteratee : wynik;
      zwrócić argumenty.długość ? wynik(argumenty[0], argumenty[1]) : wynik;
    }

    /**
     * Pobiera dane dla `map`.
     *
     * @prywatne
     * @param {Object} map Mapa do zapytania.
     * @param {string} klucz Klucz odniesienia.
     * @returns {*} Zwraca dane mapy.
     */
    funkcja getMapData(mapa, klucz) {
      var dane = mapa.__dane__;
      return isKeyable(klucz)
        ? data[typeof klucz == 'ciąg' ? 'ciąg' : 'hasz']
        : dane.mapa;
    }

    /**
     * Pobiera nazwy właściwości, wartości i flagi porównania obiektu `object`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca dane dopasowania `object`.
     */
    function getMatchData(obiekt) {
      var wynik = klucze(obiekt),
          długość = wynik.długość;

      podczas gdy (długość--) {
        klucz var = wynik[długość],
            wartość = obiekt[klucz];

        wynik[długość] = [klucz, wartość, isStrictComparable(wartość)];
      }
      zwróć wynik;
    }

    /**
     * Pobiera natywną funkcję w `kluczu` obiektu `object`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {string} klucz Klucz metody do pobrania.
     * @returns {*} Zwraca funkcję, jeśli jest natywna, w przeciwnym razie `niezdefiniowana`.
     */
    function getNative(obiekt, klucz) {
      var wartość = getValue(obiekt, klucz);
      return baseIsNative(value) ? wartość : niezdefiniowana;
    }

    /**
     * Specjalistyczna wersja `baseGetTag`, która ignoruje wartości `Symbol.toStringTag`.
     *
     * @prywatne
     * @param {*} wartość Wartość do zapytania.
     * @returns {string} Zwraca surowy `toStringTag`.
     */
    funkcja pobierzRawTag(wartość) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = wartość[symToStringTag];

      próbować {
        wartość[symToStringTag] = niezdefiniowana;
        var niemaskowany = prawda;
      } złapać (e) {}

      var wynik = nativeObjectToString.call(value);
      jeśli (odmaskowany) {
        jeśli (jestWłasny) {
          wartość[symToStringTag] = tag;
        } w przeciwnym razie {
          usuń wartość[symToStringTag];
        }
      }
      zwróć wynik;
    }

    /**
     * Tworzy tablicę własnych, przeliczalnych symboli `object`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę symboli.
     */
    var getSymbols = !nativeGetSymbols ? stubArray : function(obiekt) {
      if (obiekt == null) {
        zwrócić [];
      }
      obiekt = obiekt(obiekt);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(obiekt, symbol);
      });
    };

    /**
     * Tworzy tablicę własnych i dziedziczonych, przeliczalnych symboli `object`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę symboli.
     */
    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(obiekt) {
      var wynik = [];
      podczas (obiekt) {
        arrayPush(wynik, pobierzSymbols(obiekt));
        obiekt = pobierzPrototyp(obiekt);
      }
      zwróć wynik;
    };

    /**
     * Pobiera `toStringTag` z `value`.
     *
     * @prywatne
     * @param {*} wartość Wartość do zapytania.
     * @returns {string} Zwraca `toStringTag`.
     */
    var pobierzTag = bazowyPobierzTag;

    // Powrót do widoków danych, map, zestawów i słabych map w IE 11 oraz obietnic w Node.js < 6.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Mapa && getTag(nowa mapa) != mapTag) ||
        (Promise && getTag(Promise.resolve()) != obietnicaTag) ||
        (Ustaw && getTag(nowy zestaw) != setTag) ||
        (WeakMap && getTag(nowa SłabaMapa) != SłabyMapTag)) {
      pobierzTag = funkcja(wartość) {
        var wynik = baseGetTag(wartość),
            Ctor = wynik == obiektTag ? value.constructor : niezdefiniowany,
            ctorString = Ctor ? toSource(Ktor) : '';

        if (string) {
          przełącznik (string) {
            case dataViewCtorString: return dataViewTag;
            case mapCtorString: return mapTag;
            case obietnicaCtorString: zwróć obietnicęTag;
            case setCtorString: zwróć setTag;
            case słabyMapCtorString: zwróć słabyMapTag;
          }
        }
        zwróć wynik;
      };
    }

    /**
     * Pobiera widok, stosując dowolne „transformacje” do pozycji „początkowej” i „końcowej”.
     *
     * @prywatne
     * @param {liczba} start Początek widoku.
     * @param {liczba} end Koniec widoku.
     * @param {Array} transformuje Transformacje do zastosowania w widoku.
     * @returns {Object} Zwraca obiekt zawierający `start` i `end`
     * pozycje widoku.
     */
    function getView(start, end, transforms) {
      indeks zm = -1,
          długość = przekształcenia.długość;

      while (++indeks < długość) {
        var data = transforms[indeks],
            rozmiar = dane.rozmiar;

        przełącznik (typ danych) {
          wielkość liter 'drop': start += rozmiar; złamać;
          wielkość liter 'dropRight': koniec -= rozmiar; złamać;
          case 'wziąć': end = nativeMin(koniec, początek + rozmiar); złamać;
          case 'takeRight': start = nativeMax(start, end - size); złamać;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Wyodrębnia szczegóły opakowania z komentarza do treści `source`.
     *
     * @prywatne
     * @param {string} source Źródło do sprawdzenia.
     * @returns {Array} Zwraca szczegóły opakowania.
     */
    function getWrapDetails(źródło) {
      var match = source.match(reWrapDetails);
      zwrot meczu ? match[1].split(reSplitDetails) : [];
    }

    /**
     * Sprawdza, czy `ścieżka` istnieje na `obiekt`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka do sprawdzenia.
     * @param {Funkcja} hasFunc Funkcja sprawdzania właściwości.
     * @returns {boolean} Zwraca `true` jeśli `path` istnieje, w przeciwnym razie `false`.
     */
    function hasPath(obiekt, ścieżka, hasFunc) {
      ścieżka =castPath(ścieżka, obiekt);

      indeks zm = -1,
          długość = ścieżka.długość,
          wynik = fałsz;

      while (++indeks < długość) {
        var klucz = toKey(ścieżka[indeks]);
        if (!(wynik = obiekt != null && hasFunc(obiekt, klucz))) {
          złamać;
        }
        obiekt = obiekt[klucz];
      }
      if (wynik || ++indeks != długość) {
        zwróć wynik;
      }
      długość = obiekt == null ? 0 : długość.obiektu;
      return !!długość && isLength(długość) && isIndex(klucz, długość) &&
        (isArray(obiekt) || isArguments(obiekt));
    }

    /**
     * Inicjuje klon tablicy.
     *
     * @prywatne
     * @param {Array} tablica Tablica do sklonowania.
     * @returns {Array} Zwraca zainicjowany klon.
     */
    function initCloneArray(tablica) {
      zmienna długość = tablica.długość,
          wynik = nowa tablica.konstruktor(długość);

      // Dodaj właściwości przypisane przez `RegExp#exec`.
      if (długość && typ tablicy[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        wynik.indeks = tablica.indeks;
        wynik.wejście = tablica.wejście;
      }
      zwróć wynik;
    }

    /**
     * Inicjuje klon obiektu.
     *
     * @prywatne
     * @param {Object} object Obiekt do sklonowania.
     * @returns {Object} Zwraca zainicjowany klon.
     */
    function initCloneObject(obiekt) {
      return (typeof object.constructor == 'funkcja' && !isPrototype(object))
        ? baseCreate(getPrototype(object))
        : {};
    }

    /**
     * Inicjuje klon obiektu na podstawie jego `toStringTag`.
     *
     * **Uwaga:** Ta funkcja obsługuje tylko klonowanie wartości z tagami
     * „Boolean”, „Data”, „Błąd”, „Mapa”, „Numer”, „RegExp”, „Ustaw” lub „Ciąg”.
     *
     * @prywatne
     * @param {Object} object Obiekt do sklonowania.
     * @param {string} tag `toStringTag` obiektu do sklonowania.
     * @param {boolean} [isDeep] Określ głęboki klon.
     * @returns {Object} Zwraca zainicjowany klon.
     */
    function initCloneByTag(obiekt, tag, isDeep) {
      var Ctor = obiekt.konstruktor;
      przełącznik (tag) {
        tablica przypadkuBufferTag:
          return cloneArrayBuffer(obiekt);

        sprawa boolTag:
        data sprawyTag:
          zwróć nowy Ctor(+obiekt);

        dane przypadku ViewTag:
          return cloneDataView(obiekt, isDeep);

        sprawa float32Tag: sprawa float64Tag:
        przypadek int8Tag: przypadek int16Tag: przypadek int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          return cloneTypedArray(obiekt, isDeep);

        mapa przypadkuTag:
          zwrócić nowego Ctora;

        numer sprawyTag:
        sprawa ciągTag:
          zwróć nowy Ctor(obiekt);

        tag wyrażenia regularnego wielkości liter:
          zwróć cloneRegExp(obiekt);

        zestaw etuiTag:
          zwrócić nowego Ctora;

        symbol sprawyTag:
          return cloneSymbol(obiekt);
      }
    }

    /**
     * Wstawia wrapper `szczegóły` w komentarzu na górze treści `source`.
     *
     * @prywatne
     * @param {string} source Źródło do modyfikacji.
     * @returns {Array} details Szczegóły do ​​wstawienia.
     * @returns {string} Zwraca zmodyfikowane źródło.
     */
    function insertWrapDetails(źródło, szczegóły) {
      var długość = szczegóły.długość;
      jeśli (!długość) {
        źródło zwrotu;
      }
      var lastIndex = długość - 1;
      details[lastIndex] = (długość > 1 ? '& ' : '') + details[lastIndex];
      szczegóły = szczegóły.join(długość > 2 ? ', ' : ' ');
      return source.replace(reWrapComment, '{\n/* [opakowane ' + szczegóły + '] */\n');
    }

    /**
     * Sprawdza, czy `wartość` jest obiektem lub tablicą `arguments`, które można spłaszczyć.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” daje się spłaszczyć, w przeciwnym razie „fałsz”.
     */
    funkcja jest spłaszczona(wartość) {
      return isArray(wartość) || isArgumenty(wartość) ||
        !!(Symbol rozprzestrzeniania && wartość && wartość[Symbol rozprzestrzeniania]);
    }

    /**
     * Sprawdza, czy `wartość` jest prawidłowym indeksem podobnym do tablicy.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @param {liczba} [długość=MAX_SAFE_INTEGER] Górne granice prawidłowego indeksu.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest prawidłowym indeksem, w przeciwnym razie „fałsz”.
     */
    funkcja isIndex(wartość; długość) {
      var typ = typwartości;
      długość = długość == null ? MAX_SAFE_INTEGER : długość;

      powrót !!długość &&
        (typ == 'liczba' ||
          (wpisz != 'symbol' && reIsUint.test(wartość))) &&
            (wartość > -1 && wartość % 1 == 0 && wartość < długość);
    }

    /**
     * Sprawdza, czy podane argumenty pochodzą z wywołania iteracyjnego.
     *
     * @prywatne
     * @param {*} wartość Potencjalny argument wartości iteracji.
     * @param {*} index Potencjalny indeks iteracji lub argument klucza.
     * @param {*} object Potencjalny argument obiektu iteracyjnego.
     * @returns {boolean} Zwraca `true` jeśli argumenty pochodzą z wywołania iteracyjnego,
     * w przeciwnym razie `fałsz`.
     */
    function isIterateeCall(wartość, indeks, obiekt) {
      if (!isObject(obiekt)) {
        zwróć fałsz;
      }
      var typ = typindeksu;
      if (wpisz == 'liczba'
            ? (isArrayLike(object) && isIndex(index, object.length))
            : (type == 'string' && index w obiekcie)
          ) {
        return eq(obiekt[indeks], wartość);
      }
      zwróć fałsz;
    }

    /**
     * Sprawdza, czy `wartość` jest nazwą właściwości, a nie ścieżką właściwości.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @param {Obiekt} [obiekt] Obiekt do zapytania o klucze.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest nazwą właściwości, w przeciwnym razie „fałsz”.
     */
    funkcja isKey(wartość, obiekt) {
      if (jestArray(wartość)) {
        zwróć fałsz;
      }
      var typ = typwartości;
      if (type == 'liczba' || type == 'symbol' || type == 'boolean' ||
          wartość == null || isSymbol(wartość)) {
        zwróć prawdę;
      }
      return reIsPlainProp.test(wartość) || !reIsDeepProp.test(wartość) ||
        (obiekt != null && wartość w Object(object));
    }

    /**
     * Sprawdza, czy `wartość` nadaje się do użycia jako unikalny klucz obiektu.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest odpowiednia, w przeciwnym razie „fałsz”.
     */
    funkcja isKeyable(wartość) {
      var typ = typwartości;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (wartość !== '__proto__')
        : (wartość === null);
    }

    /**
     * Sprawdza, czy `func` ma leniwy odpowiednik.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `func` ma leniwy odpowiednik,
     * w przeciwnym razie `fałsz`.
     */
    funkcja isLaziable(func) {
      var funcName = getFuncName(func),
          other = lodash[nazwa_funkcji];

      if (typeof other != 'function' || !(funcName w LazyWrapper.prototype)) {
        zwróć fałsz;
      }
      jeśli (func === inny) {
        zwróć prawdę;
      }
      var data = getData(inne);
      return !!data && func === data[0];
    }

    /**
     * Sprawdza, czy `func` ma zamaskowane źródło.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `func` jest zamaskowane, w przeciwnym razie `false`.
     */
    funkcja jest zamaskowana(funkcja) {
      return !!maskSrcKey && (maskSrcKey w funkcji);
    }

    /**
     * Sprawdza, czy można zamaskować `func`.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca `true`, jeśli `func` jest maskowalne, w przeciwnym razie `false`.
     */
    var isMaskable = coreJsData ? isFunction : stubFalse;

    /**
     * Sprawdza, czy `wartość` jest prawdopodobnie obiektem prototypowym.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest prototypem, w przeciwnym razie „fałsz”.
     */
    funkcja isPrototype(wartość) {
      var Ctor = wartość && wartość.konstruktor,
          proto = (typ Ctor == 'funkcja' && Ctor.prototype) || obiektProto;

      zwracana wartość === proto;
    }

    /**
     * Sprawdza, czy `wartość` nadaje się do ścisłych porównań równości, tj. `===`.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `value` jeśli odpowiednie dla strict
     * porównania równości, w przeciwnym razie `false`.
     */
    funkcja jestStrictComparable(wartość) {
      zwracana wartość === wartość && !isObject(wartość);
    }

    /**
     * Specjalistyczna wersja `matchesProperty` dla odpowiednich wartości źródłowych
     * dla ścisłych porównań równości, tj. `===`.
     *
     * @prywatne
     * @param {string} klucz Klucz właściwości do pobrania.
     * @param {*} srcValue Wartość do dopasowania.
     * @returns {Funkcja} Zwraca nową funkcję spec.
     */
    function matchingStrictComparable(key, srcValue) {
      funkcja powrotu (obiekt) {
        if (obiekt == null) {
          zwróć fałsz;
        }
        return object[klucz] === srcValue &&
          (srcValue !== undefined || (klucz w Object(object)));
      };
    }

    /**
     * Specjalistyczna wersja `_.memoize`, która czyści zapamiętaną funkcję
     * pamięć podręczna, gdy przekroczy `MAX_MEMOIZE_SIZE`.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zapamiętania wyjścia.
     * @returns {Funkcja} Zwraca nową zapamiętaną funkcję.
     */
    funkcja memoizeCapped(func) {
      var wynik = memoize(funkcja, funkcja(klucz) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          pamięć podręczna.wyczyść();
        }
        klucz powrotu;
      });

      pamięć podręczna var = pamięć podręczna wyników;
      zwróć wynik;
    }

    /**
     * Łączy metadane funkcji `source` w `data`.
     *
     * Scalanie metadanych zmniejsza liczbę opakowań używanych do wywoływania funkcji.
     * Jest to możliwe, ponieważ metody takie jak `_.bind`, `_.curry` i `_.partial`
     * może być stosowany niezależnie od zlecenia wykonania. Metody takie jak `_.ary` i
     * `_.rearg` modyfikuje argumenty funkcji, ustawiając kolejność, w jakiej są
     * wykonane ważne, uniemożliwiające łączenie metadanych. Jednak robimy
     * wyjątek dla bezpiecznego połączonego przypadku, w którym curried funkcje mają `_.ary`
     Zastosowano * i lub `_.rearg`.
     *
     * @prywatne
     * Dane @param {Array} Metadane docelowe.
     * @param {Array} source Metadane źródła.
     * @returns {Array} Zwraca `dane`.
     */
    function mergeData(dane, źródło) {
      var maska ​​bitowa = dane[1],
          srcBitmask = source[1],
          newBitmask = bitmaska ​​| srcBitmaska,
          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

      zmienna isCombo =
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (dane[7].length <= źródło[8])) ||
        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (źródło[7].długość <= źródło[8]) && (maska ​​bitowa == WRAP_CURRY_FLAG));

      // Wyjdź wcześniej, jeśli nie można połączyć metadanych.
      if (!(isCommon || isCombo)) {
        dane zwrotne;
      }
      // Użyj źródła `thisArg`, jeśli jest dostępne.
      if (srcBitmask i WRAP_BIND_FLAG) {
        dane[2] = źródło[2];
        // Ustaw podczas curry funkcji powiązanej.
        newBitmask |= bitmask i WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
      }
      // Skomponuj argumenty częściowe.
      wartość zmiennej = źródło[3];
      jeśli (wartość) {
        var częściowe = dane[3];
        dane[3] = częściowe ? composeArgs(części, wartość, źródło[4]) : wartość;
        dane[4] = częściowe ? replaceHolders(dane[3], PLACEHOLDER) : źródło[4];
      }
      // Utwórz częściowe prawe argumenty.
      wartość = źródło[5];
      jeśli (wartość) {
        częściowe = dane[5];
        dane[5] = częściowe ? composeArgsRight(części, wartość, źródło[6]) : wartość;
        dane[6] = częściowe ? replaceHolders(dane[5], PLACEHOLDER) : źródło[6];
      }
      // Użyj źródłowego `argPos`, jeśli jest dostępne.
      wartość = źródło[7];
      jeśli (wartość) {
        dane[7] = wartość;
      }
      // Użyj źródła `ary`, jeśli jest mniejsze.
      if (srcBitmask & WRAP_ARY_FLAG) {
        dane[8] = dane[8] == null ? źródło[8] : natywnyMin(dane[8],źródło[8]);
      }
      // Użyj `arity` źródła, jeśli nie podano.
      if (dane[9] == null) {
        dane[9] = źródło[9];
      }
      // Użyj źródłowego `func` i połącz maski bitowe.
      dane[0] = źródło[0];
      dane[1] = nowa maska ​​bitowa;

      dane zwrotne;
    }

    /**
     * Ta funkcja jest podobna do
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * z wyjątkiem tego, że zawiera odziedziczone właściwości przeliczalne.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę nazw właściwości.
     */
    function nativeKeysIn(object) {
      var wynik = [];
      if (obiekt != null) {
        for (klucz var w Object(object)) {
          wynik.push(klucz);
        }
      }
      zwróć wynik;
    }

    /**
     * Konwertuje `wartość` na ciąg znaków za pomocą `Object.prototype.toString`.
     *
     * @prywatne
     * @param {*} wartość Wartość do konwersji.
     * @returns {ciąg} Zwraca przekonwertowany ciąg.
     */
    funkcja obiektToString(wartość) {
      return nativeObjectToString.call(value);
    }

    /**
     * Specjalistyczna wersja `baseRest`, która przekształca tablicę rest.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do zastosowania parametru rest.
     * @param {liczba} [start=func.length-1] Pozycja początkowa parametru rest.
     * @param {Funkcja} przekształcenie Przekształcenie pozostałej tablicy.
     * @returns {Funkcja} Zwraca nową funkcję.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      funkcja powrotu () {
        var argumenty = argumenty,
            indeks = -1,
            length = nativeMax(args.length - start, 0),
            tablica = Tablica(długość);

        while (++indeks < długość) {
          tablica[indeks] = args[start + indeks];
        }
        indeks = -1;
        var otherArgs = Tablica(start + 1);
        while (++indeks < początek) {
          inneArgs[indeks] = args[indeks];
        }
        otherArgs[start] = transform(tablica);
        return zastosuj(func, this, otherArgs);
      };
    }

    /**
     * Pobiera wartość rodzica w `ścieżce` obiektu `object`.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array} path Ścieżka do pobrania wartości rodzica.
     * @returns {*} Zwraca wartość rodzica.
     */
    funkcja rodzic (obiekt, ścieżka) {
      return path.length < 2 ? obiekt : baseGet(obiekt, baseSlice(ścieżka, 0, -1));
    }

    /**
     * Zmień kolejność `array` zgodnie z określonymi indeksami, w których element w
     * pierwszy indeks jest przypisany jako pierwszy element, element at
     * drugi indeks jest przypisany jako drugi element i tak dalej.
     *
     * @prywatne
     * @param {Array} tablica Tablica do zmiany kolejności.
     * @param {Array} indexs Ułożone indeksy tablicy.
     * @returns {Array} Zwraca `tablic`.
     */
    funkcja reorder(tablica, indeksy) {
      var arrLength = tablica.długość,
          length = nativeMin(indexes.length, arrLength),
          staraTablica = kopiaTablica(tablica);

      podczas gdy (długość--) {
        var indeks = indeksy[długość];
        tablica[długość] = isIndex(index, arrLength) ? oldArray[indeks] : niezdefiniowany;
      }
      tablica zwrotów;
    }

    /**
     * Pobiera wartość z `key`, chyba że `key` to „__proto__” lub „constructor”.
     *
     * @prywatne
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {string} klucz Klucz właściwości do pobrania.
     * @returns {*} Zwraca wartość właściwości.
     */
    funkcja safeGet(obiekt, klucz) {
      if (klucz === 'konstruktor' && typobiektu[klucz] === 'funkcja') {
        zwrócić;
      }

      if (klucz == '__proto__') {
        zwrócić;
      }

      zwróć obiekt[klucz];
    }

    /**
     * Ustawia metadane dla `func`.
     *
     * **Uwaga:** Jeśli ta funkcja staje się gorąca, tj. jest często wywoływana w krótkim czasie
     * czas, w którym zadziała wyłącznik i przejdzie do tożsamości
     * funkcja pozwalająca uniknąć przerw w zbieraniu śmieci w V8. Widzieć
     * [Wydanie V8 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
     * po więcej szczegółów.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do powiązania metadanych.
     * Dane @param {*} Metadane.
     * @returns {Funkcja} Zwraca `func`.
     */
    var setData = shortOut(baseSetData);

    /**
     * Proste opakowanie wokół globalnego [`setTimeout`](https://mdn.io/setTimeout).
     *
     * @prywatne
     * @param {Funkcja} func Funkcja opóźniająca.
     * @param {liczba} wait Liczba milisekund opóźnienia wywołania.
     * @returns {liczba|Obiekt} Zwraca identyfikator timera lub obiekt timeout.
     */
    var setTimeout = ctxSetTimeout || funkcja(funkcja, czekanie) {
      return root.setTimeout(funkcja, czekaj);
    };

    /**
     * Ustawia metodę `toString` funkcji `func` na zwracanie `string`.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do modyfikacji.
     * @param {Function} string Wynik `toString`.
     * @returns {Funkcja} Zwraca `func`.
     */
    var setToString = shortOut(baseSetToString);

    /**
     * Ustawia metodę `toString` w `wrapper`, aby naśladować źródło `referencji`
     * ze szczegółami opakowania w komentarzu na górze treści źródłowej.
     *
     * @prywatne
     * @param {Function} wrapper Funkcja do zmodyfikowania.
     * @param {Funkcja} referencja Funkcja referencji.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `createWrap`, aby uzyskać więcej informacji.
     * @returns {Funkcja} Zwraca `opakowanie`.
     */
    function setWrapToString(opakowanie, odwołanie, maska ​​bitowa) {
      var source = (odniesienie + '');
      return setToString(wrapper, insertWrapDetails(źródło, updateWrapDetails(getWrapDetails(źródło), maska ​​bitowa)));
    }

    /**
     * Tworzy funkcję, która skróci i zamiast tego wywoła `tożsamość`
     * funkcji `func`, gdy wywoływana jest `HOT_COUNT` lub więcej razy w `HOT_SPAN`
     * milisekundy.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do ograniczenia.
     * @returns {Funkcja} Zwraca nową funkcję shortable.
     */
    funkcja shortOut(func) {
      liczba var = 0,
          ostatni wywołany = 0;

      funkcja powrotu () {
        var stempel = nativeNow(),
            pozostałe = HOT_SPAN - (pieczęć - lastCalled);

        lastCalled = pieczęć;
        jeśli (pozostałe > 0) {
          if (++liczba >= HOT_COUNT) {
            zwróć argumenty[0];
          }
        } w przeciwnym razie {
          liczba = 0;
        }
        return func.apply(niezdefiniowane, argumenty);
      };
    }

    /**
     * Specjalistyczna wersja `_.shuffle`, która mutuje i ustawia rozmiar `array`.
     *
     * @prywatne
     * @param {Array} array Tablica do przetasowania.
     * @param {liczba} [rozmiar=tablica.długość] Rozmiar `tablicy`.
     * @returns {Array} Zwraca `tablic`.
     */
    funkcja shuffleSelf(tablica, rozmiar) {
      indeks zm = -1,
          długość = tablica.długość,
          lastIndex = długość - 1;

      rozmiar = rozmiar === niezdefiniowany ? długość : rozmiar;
      while (++indeks < rozmiar) {
        var rand = baseLos (indeks, ostatni indeks),
            wartość = tablica[rand];

        tablica[rand] = tablica[indeks];
        tablica[indeks] = wartość;
      }
      tablica.długość = rozmiar;
      tablica zwrotów;
    }

    /**
     * Konwertuje `string` na tablicę ścieżki właściwości.
     *
     * @prywatne
     * @param {ciąg} ciąg Ciąg do konwersji.
     * @returns {Array} Zwraca tablicę ścieżki właściwości.
     */
    var stringToPath = memoizeCapped(function(string) {
      var wynik = [];
      if (string.charCodeAt(0) === 46 /* . */) {
        wynik.push('');
      }
      string.replace(rePropName, function(dopasowanie, liczba, cytat, podciąg) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (liczba || dopasowanie));
      });
      zwróć wynik;
    });

    /**
     * Konwertuje `wartość` na klucz ciągu, jeśli nie jest ciągiem lub symbolem.
     *
     * @prywatne
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {ciąg|symbol} Zwraca klucz.
     */
    funkcja toKlucz(wartość) {
      if (typeof value == 'string' || isSymbol(value)) {
        wartość zwrotu;
      }
      var wynik = (wartość + '');
      return (wynik == '0' && (1 / wartość) == -NIESKOŃCZONOŚĆ) ? '-0' : wynik;
    }

    /**
     * Konwertuje `func` na jego kod źródłowy.
     *
     * @prywatne
     * @param {Funkcja} func Funkcja do konwersji.
     * @returns {string} Zwraca kod źródłowy.
     */
    funkcja doŹródła(funkcja) {
      if (funkcja != null) {
        próbować {
          return funcToString.call(func);
        } złapać (e) {}
        próbować {
          powrót (func + '');
        } złapać (e) {}
      }
      zwrócić '';
    }

    /**
     * Aktualizuje `szczegóły` opakowania na podstawie flag `masek bitowych`.
     *
     * @prywatne
     * Szczegóły @returns {Array} Szczegóły do ​​zmodyfikowania.
     * @param {liczba} bitmask Flagi maski bitowej. Zobacz `createWrap`, aby uzyskać więcej informacji.
     * @returns {Array} Zwraca `szczegóły`.
     */
    function updateWrapDetails(szczegóły, maska ​​bitowa) {
      arrayEach(wrapFlags, function(pair) {
        wartość zmiennej = '_.' + para[0];
        if ((maska ​​bitowa i para[1]) && !arrayIncludes(szczegóły, wartość)) {
          szczegóły.push(wartość);
        }
      });
      zwróć szczegóły.sortowanie();
    }

    /**
     * Tworzy klon `wrapper`.
     *
     * @prywatne
     * @param {Object} wrapper Opakowanie do sklonowania.
     * @returns {Object} Zwraca sklonowane opakowanie.
     */
    funkcja wrapperClone(opakowanie) {
      if (opakowanie instancji LazyWrapper) {
        return wrapper.clone();
      }
      var wynik = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
      wynik.__działania__ = kopiaArray(opakowanie.__działania__);
      wynik.__indeks__ = opakowanie.__indeks__;
      wynik.__wartości__ = opakowanie.__wartości__;
      zwróć wynik;
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy tablicę elementów podzieloną na grupy o długości `rozmiar`.
     * Jeśli `tablicy` nie można podzielić równo, ostatnia porcja będzie pozostałą
     * elementy.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do przetworzenia.
     * @param {liczba} [rozmiar=1] Długość każdego kawałka
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Array} Zwraca nową tablicę porcji.
     * @przykład
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(tablica, rozmiar, osłona) {
      if ((ochrona ? isIterateeCall(tablica, rozmiar, strażnik) : rozmiar === undefined)) {
        rozmiar = 1;
      } w przeciwnym razie {
        rozmiar = nativeMax(toInteger(rozmiar), 0);
      }
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      if (!długość || rozmiar < 1) {
        zwrócić [];
      }
      indeks zm = 0,
          indeks res = 0,
          wynik = Array(nativeCeil(długość/rozmiar));

      while (indeks < długość) {
        wynik[resIndex++] = baseSlice(tablica, indeks, (indeks += rozmiar));
      }
      zwróć wynik;
    }

    /**
     * Tworzy tablicę z usuniętymi wszystkimi fałszywymi wartościami. Wartości „false”, „null”,
     * `0`, `""`, `undefined` i `NaN` są fałszywe.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do kompaktowania.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @przykład
     *
     * _.compact([0, 1, fałsz, 2, '', 3]);
     * // => [1, 2, 3]
     */
    funkcja zwarta(tablica) {
      indeks zm = -1,
          długość = tablica == null ? 0 : tablica.długość,
          indeks res = 0,
          wynik = [];

      while (++indeks < długość) {
        wartość zmiennej = tablica[indeks];
        jeśli (wartość) {
          wynik[index++] = wartość;
        }
      }
      zwróć wynik;
    }

    /**
     * Tworzy nową tablicę łączącą `array` z dowolnymi dodatkowymi tablicami
     * i/lub wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do połączenia.
     * @param {...*} [wartości] Wartości do połączenia.
     * @returns {Array} Zwraca nową połączoną tablicę.
     * @przykład
     *
     * var tablica = [1];
     * var inne = _.concat(tablica, 2, [3], [[4]]);
     *
     * console.log(inne);
     * // => [1, 2, 3, [4]]
     *
     * console.log(tablica);
     * // => [1]
     */
    funkcja concat() {
      zmienna długość = argumenty.długość;
      jeśli (!długość) {
        zwrócić [];
      }
      var args = Tablica(długość - 1),
          tablica = argumenty[0],
          indeks = długość;

      podczas gdy (indeks--) {
        argumenty[indeks - 1] = argumenty[indeks];
      }
      return arrayPush(isArray(tablica) ? copyArray(tablica) : [tablica], baseFlatten(args, 1));
    }

    /**
     * Tworzy tablicę wartości `array`, które nie są zawarte w innych podanych tablicach
     * przy użyciu [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych. Kolejność i referencje wartości wyników to
     * określona przez pierwszą tablicę.
     *
     * **Uwaga:** W przeciwieństwie do `_.pullAll`, ta metoda zwraca nową tablicę.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {...Tablica} [wartości] Wartości do wykluczenia.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @patrz _.bez, _.xor
     * @przykład
     *
     * _.różnica([2, 1], [2, 3]);
     * // => [1]
     */
    var różnica = baseRest(funkcja(tablica, wartości) {
      return isArrayLikeObject(tablica)
        ? baseDifference(tablica, baseFlatten(wartości, 1, isArrayLikeObject, prawda))
        : [];
    });

    /**
     * Ta metoda jest podobna do `_.difference` z tą różnicą, że akceptuje `iteratee`, które
     * jest wywoływane dla każdego elementu `array` i `values` w celu wygenerowania kryterium
     * według których są porównywane. Kolejność i referencje wartości wyników to
     * określona przez pierwszą tablicę. Iterat jest wywoływany z jednym argumentem:
     * (wartość).
     *
     * **Uwaga:** W przeciwieństwie do `_.pullAllBy` ta metoda zwraca nową tablicę.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {...Tablica} [wartości] Wartości do wykluczenia.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @przykład
     *
     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [1.2]
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var różnicaBy = baseRest(funkcja(tablica, wartości) {
      var iteratee = last(wartości);
      if (isArrayLikeObject(iteracja)) {
        iterowany = niezdefiniowany;
      }
      return isArrayLikeObject(tablica)
        ? baseDifference(tablica, baseFlatten(wartości, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
        : [];
    });

    /**
     * Ta metoda jest podobna do `_.difference` z wyjątkiem tego, że akceptuje `comparator`
     * który jest wywoływany w celu porównania elementów „tablicy” z „wartościami”. Kolejność i
     * odniesienia do wartości wyników są określone przez pierwszą tablicę. Komparator
     * jest wywoływana z dwoma argumentami: (arrVal, othVal).
     *
     * **Uwaga:** W przeciwieństwie do `_.pullAllWith`, ta metoda zwraca nową tablicę.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {...Tablica} [wartości] Wartości do wykluczenia.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @przykład
     *
     * var obiekty = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     *
     * _.differenceWith(obiekty, [{ 'x': 1, 'y': 2 }], _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }]
     */
    var różnicaZ = baseRest(funkcja(tablica, wartości) {
      komparator var = last(wartości);
      if (isArrayLikeObject(comparator)) {
        komparator = niezdefiniowany;
      }
      return isArrayLikeObject(tablica)
        ? baseDifference(tablica, baseFlatten(wartości, 1, isArrayLikeObject, true), niezdefiniowane, komparator)
        : [];
    });

    /**
     * Tworzy kawałek „tablicy” z elementami „n” usuniętymi od początku.
     *
     * @statyczny
     * @członkiem _
     * @od 0.50
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {liczba} [n=1] Liczba elementów do usunięcia.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    funkcja drop(tablica, n, strażnik) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        zwrócić [];
      }
      n = (strażnik || n === niezdefiniowany) ? 1: toInteger(n);
      return baseSlice(tablica, n < 0 ? 0 : n, długość);
    }

    /**
     * Tworzy kawałek „tablicy” z elementami „n” usuniętymi z końca.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {liczba} [n=1] Liczba elementów do usunięcia.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    funkcja dropRight(tablica, n, strażnik) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        zwrócić [];
      }
      n = (strażnik || n === niezdefiniowany) ? 1: toInteger(n);
      n = długość - n;
      return baseSlice(tablica, 0, n < 0 ? 0 : n);
    }

    /**
     * Tworzy kawałek „tablicy” z wyłączeniem elementów upuszczonych na końcu.
     * Elementy są usuwane, dopóki `predicate` nie zwróci wartości fałszywie. Predykat to
     * wywoływane z trzema argumentami: (wartość, indeks, tablica).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'active': true },
     * { 'użytkownik': 'fred', 'aktywny': fałsz },
     * { 'użytkownik': 'kamyki', 'aktywny': fałsz }
     * ];
     *
     * _.dropRightWhile(users, function(o) { return !o.active; });
     * // => obiekty dla ['barney']
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.dropRightWhile(users, { 'user': 'kamyki', 'active': false });
     * // => obiekty dla ['barney', 'fred']
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.dropRightWhile(użytkownicy, ['aktywny', fałsz]);
     * // => obiekty dla ['barney']
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.dropRightWhile(użytkownicy, 'aktywni');
     * // => obiekty dla ['barney', 'fred', 'pebbles']
     */
    funkcja dropRightWhile(tablica, predykat) {
      return (tablica && tablica.length)
        ? baseWhile(tablica, getIteratee(predykat, 3), prawda, prawda)
        : [];
    }

    /**
     * Tworzy wycinek „tablicy” z wyłączeniem elementów porzuconych od początku.
     * Elementy są usuwane, dopóki `predicate` nie zwróci wartości fałszywie. Predykat to
     * wywoływane z trzema argumentami: (wartość, indeks, tablica).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'active': false },
     * { 'użytkownik': 'fred', 'aktywny': fałsz },
     * { 'użytkownik': 'kamyki', 'aktywny': prawda }
     * ];
     *
     * _.dropWhile(użytkownicy, funkcja(o) { return !o.active; });
     * // => obiekty dla ['kamyki']
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.dropWhile(users, { 'user': 'barney', 'active': false });
     * // => obiekty dla ['fred', 'pebbles']
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.dropWhile(użytkownicy, ['aktywny', fałsz]);
     * // => obiekty dla ['kamyki']
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.dropWhile(użytkownicy, 'aktywni');
     * // => obiekty dla ['barney', 'fred', 'pebbles']
     */
    funkcja dropWhile(tablica, predykat) {
      return (tablica && tablica.length)
        ? baseWhile(tablica, getIteratee(predykat, 3), prawda)
        : [];
    }

    /**
     * Wypełnia elementy `array` wartością `value` od `start` do, ale nie
     * w tym `koniec`.
     *
     * **Uwaga:** ta metoda mutuje „tablicę”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.2.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do wypełnienia.
     * @param {*} wartość Wartość do wypełnienia „tablicy”.
     * @param {liczba} [start=0] Pozycja początkowa.
     * @param {liczba} [koniec=tablica.długość] Pozycja końcowa.
     * @returns {Array} Zwraca `tablic`.
     * @przykład
     *
     * var tablica = [1, 2, 3];
     *
     * _.fill(tablica, 'a');
     * console.log(tablica);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Tablica(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8, 10], '*', 1, 3);
     * // => [4, '*', '*', 10]
     */
    function fill(tablica, wartość, początek, koniec) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        zwrócić [];
      }
      if (start && typpoczątku != 'liczba' && isIterateeCall(tablica, wartość, początek)) {
        początek = 0;
        koniec = długość;
      }
      return baseFill(tablica, wartość, początek, koniec);
    }

    /**
     * Ta metoda jest podobna do `_.find` z tą różnicą, że zwraca indeks pierwszego
     * element `predicate` zwraca true zamiast samego elementu.
     *
     * @statyczny
     * @członkiem _
     * @od 1.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @param {liczba} [fromIndex=0] Indeks do wyszukiwania.
     * @returns {liczba} Zwraca indeks znalezionego elementu, w przeciwnym razie `-1`.
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'active': false },
     * { 'użytkownik': 'fred', 'aktywny': fałsz },
     * { 'użytkownik': 'kamyki', 'aktywny': prawda }
     * ];
     *
     * _.findIndex(users, function(o) { return o.user == 'barney'; });
     * // => 0
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.findIndex(użytkownicy, ['aktywny', fałsz]);
     * // => 0
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.findIndex(użytkownicy, 'aktywni');
     * // => 2
     */
    function findIndex(tablica, predykat, fromIndex) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        powrót -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      jeśli (indeks < 0) {
        index = nativeMax(długość + indeks, 0);
      }
      return baseFindIndex(tablica, getIteratee(predykat, 3), indeks);
    }

    /**
     * Ta metoda jest podobna do `_.findIndex` z tą różnicą, że iteruje po elementach
     * „zbioru” od prawej do lewej.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @param {liczba} [fromIndex=array.length-1] Indeks do wyszukiwania.
     * @returns {liczba} Zwraca indeks znalezionego elementu, w przeciwnym razie `-1`.
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'active': true },
     * { 'użytkownik': 'fred', 'aktywny': fałsz },
     * { 'użytkownik': 'kamyki', 'aktywny': fałsz }
     * ];
     *
     * _.findLastIndex(users, function(o) { return o.user == 'kamyki'; });
     * // => 2
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.findLastIndex(użytkownicy, ['aktywny', fałsz]);
     * // => 2
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.findLastIndex(użytkownicy, 'aktywni');
     * // => 0
     */
    function findLastIndex(tablica, predykat, fromIndex) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        powrót -1;
      }
      indeks var = długość - 1;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        indeks = fromIndex < 0
          ? nativeMax(długość + indeks, 0)
          : nativeMin(indeks, długość - 1);
      }
      return baseFindIndex(tablica, getIteratee(predykat, 3), indeks, prawda);
    }

    /**
     * Spłaszcza „tablicę” o jeden poziom głębokości.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do spłaszczenia.
     * @returns {Array} Zwraca nową spłaszczoną tablicę.
     * @przykład
     *
     * _.flatten([1, [2, [3, [4]], 5]]);
     * // => [1, 2, [3, [4]], 5]
     */
    funkcja flatten(array) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      długość powrotu ? baseFlatten(tablica, 1) : [];
    }

    /**
     * Rekurencyjnie spłaszcza „tablicę”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do spłaszczenia.
     * @returns {Array} Zwraca nową spłaszczoną tablicę.
     * @przykład
     *
     * _.flattenDeep([1, [2, [3, [4]], 5]]);
     * // => [1, 2, 3, 4, 5]
     */
    function flattenDeep(tablica) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      długość powrotu ? baseFlatten(tablica, NIESKOŃCZONOŚĆ) : [];
    }

    /**
     * Rekurencyjnie spłaszczaj „tablicę” do czasów „głębokości”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.4.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do spłaszczenia.
     * @param {liczba} [głębokość=1] Maksymalna głębokość rekurencji.
     * @returns {Array} Zwraca nową spłaszczoną tablicę.
     * @przykład
     *
     * var tablica = [1, [2, [3, [4]], 5]];
     *
     * _.flattenDepth(tablica, 1);
     * // => [1, 2, [3, [4]], 5]
     *
     * _.flattenDepth(tablica, 2);
     * // => [1, 2, 3, [4], 5]
     */
    function flattenDepth(tablica, głębokość) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        zwrócić [];
      }
      głębokość = głębokość === niezdefiniowana ? 1 : toInteger(głębokość);
      return baseFlatten(tablica, głębokość);
    }

    /**
     * Odwrotność `_.toPairs`; ta metoda zwraca obiekt złożony
     * z „par” par klucz-wartość.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * Pary @param {Array} Pary klucz-wartość.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * _.fromPairs([['a', 1], ['b', 2]]);
     * // => { 'a': 1, 'b': 2 }
     */
    function fromPairs(pairs) {
      indeks zm = -1,
          długość = pary == null ? 0 : pary.długość,
          wynik = {};

      while (++indeks < długość) {
        var para = pary[indeks];
        wynik[para[0]] = para[1];
      }
      zwróć wynik;
    }

    /**
     * Pobiera pierwszy element `array`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @alias pierwszy
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @returns {*} Zwraca pierwszy element `tablicy`.
     * @przykład
     *
     * _.głowa([1, 2, 3]);
     * // => 1
     *
     * _.głowa([]);
     * // => nieokreślone
     */
    nagłówek funkcji (tablica) {
      return (array && array.length) ? tablica[0] : niezdefiniowana;
    }

    /**
     * Pobiera indeks, w którym znajduje się pierwsze wystąpienie `value` w `array`
     * przy użyciu [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych. Jeśli `fromIndex` jest ujemny, jest używany jako
     * przesunięcie od końca `tablicy`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {*} wartość Wartość do wyszukania.
     * @param {liczba} [fromIndex=0] Indeks do wyszukiwania.
     * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
     * @przykład
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // Szukaj z `fromIndex`.
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     */
    function indexOf(tablica, wartość, fromIndex) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        powrót -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      jeśli (indeks < 0) {
        index = nativeMax(długość + indeks, 0);
      }
      return baseIndexOf(tablica, wartość, indeks);
    }

    /**
     * Pobiera wszystkie elementy oprócz ostatniego elementu `array`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * _.inicjal([1, 2, 3]);
     * // => [1, 2]
     */
    funkcja inicjał(tablica) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      długość powrotu ? baseSlice(tablica, 0, -1) : [];
    }

    /**
     * Tworzy tablicę unikalnych wartości, które są zawarte we wszystkich podanych tablicach
     * przy użyciu [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych. Kolejność i referencje wartości wyników to
     * określona przez pierwszą tablicę.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @returns {Array} Zwraca nową tablicę przecinających się wartości.
     * @przykład
     *
     * _.przecięcie([2, 1], [2, 3]);
     * // => [2]
     */
    var intersection = baseRest(function(arrays) {
      var mapped = arrayMap(tablice, castArrayLikeObject);
      return (mapped.length && mapped[0] === arrays[0])
        ? przecięcie bazowe (mapowane)
        : [];
    });

    /**
     * Ta metoda jest podobna do `_.intersection` z tą różnicą, że akceptuje `iteratee`
     * który jest wywoływany dla każdego elementu każdej `tablicy` w celu wygenerowania kryterium
     * według których są porównywane. Kolejność i referencje wartości wyników to
     * określona przez pierwszą tablicę. Iterat jest wywoływany z jednym argumentem:
     * (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {Array} Zwraca nową tablicę przecinających się wartości.
     * @przykład
     *
     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
     * // => [2.1]
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }]
     */
    var intersectionBy = baseRest(function(arrays) {
      var iteratee = last(tablice),
          mapped = arrayMap(tablice, castArrayLikeObject);

      if (iteracja === ostatni(mapowany)) {
        iterowany = niezdefiniowany;
      } w przeciwnym razie {
        mapowany.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapowane, getIteratee(iteratee, 2))
        : [];
    });

    /**
     * Ta metoda jest podobna do `_.intersection` z tą różnicą, że akceptuje `comparator`
     * który jest wywoływany w celu porównania elementów `tablic`. Zamówienie i referencje
     * wartości wynikowych są określone przez pierwszą tablicę. Komparatorem jest
     * wywoływane z dwoma argumentami: (arrVal, othVal).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową tablicę przecinających się wartości.
     * @przykład
     *
     * var obiekty = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.intersectionWith(obiekty, inne, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }]
     */
    var intersectionWith = baseRest(function(arrays) {
      komparator var = last(tablice),
          mapped = arrayMap(tablice, castArrayLikeObject);

      komparator = typ komparatora == 'funkcja' ? komparator : niezdefiniowany;
      jeśli (komparator) {
        mapowany.pop();
      }
      return (mapped.length && mapped[0] === arrays[0])
        ? baseIntersection(mapowany, niezdefiniowany, porównawczy)
        : [];
    });

    /**
     * Konwertuje wszystkie elementy w `array` na łańcuch oddzielony `separatorem`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do konwersji.
     * @param {ciąg} [separator=','] Separator elementów.
     * @returns {ciąg} Zwraca połączony ciąg.
     * @przykład
     *
     * _.join(['a', 'b', 'c'], '~');
     * // => 'a~b~c'
     */
    funkcja join(tablica, separator) {
      zwróć tablicę == null ? '' : nativeJoin.call(tablica, separator);
    }

    /**
     * Pobiera ostatni element `array`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @returns {*} Zwraca ostatni element tablicy `array`.
     * @przykład
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    funkcja ostatnia (tablica) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      długość powrotu ? tablica[długość - 1] : niezdefiniowana;
    }

    /**
     * Ta metoda jest podobna do `_.indexOf` z tą różnicą, że iteruje po elementach
     * `tablica` od prawej do lewej.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {*} wartość Wartość do wyszukania.
     * @param {liczba} [fromIndex=array.length-1] Indeks do wyszukiwania.
     * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
     * @przykład
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // Szukaj z `fromIndex`.
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     */
    funkcja lastIndexOf(tablica, wartość, fromIndex) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        powrót -1;
      }
      indeks var = długość;
      if (fromIndex !== undefined) {
        index = toInteger(fromIndex);
        indeks = indeks < 0 ? nativeMax(długość + indeks, 0) : nativeMin(indeks, długość - 1);
      }
      zwracana wartość === wartość
        ? strictLastIndexOf(tablica; wartość; indeks)
        : baseFindIndex(tablica, baseIsNaN, indeks, prawda);
    }

    /**
     * Pobiera element z indeksu `n` tablicy `array`. Jeśli `n` jest ujemne, nth
     * zwracany jest element z końca.
     *
     * @statyczny
     * @członkiem _
     * @od 4.11.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {liczba} [n=0] Indeks elementu do zwrócenia.
     * @returns {*} Zwraca n-ty element `array`.
     * @przykład
     *
     * var array = ['a', 'b', 'c', 'd'];
     *
     * _.nth(tablica, 1);
     * // => 'b'
     *
     * _.nth(tablica, -2);
     * // => 'c';
     */
    funkcja nth(tablica, n) {
      return (array && array.length) ? baseNth(tablica, toInteger(n)) : niezdefiniowane;
    }

    /**
     * Usuwa wszystkie podane wartości z `tablicy` używając
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych.
     *
     * **Uwaga:** W przeciwieństwie do `_.bez`, ta metoda mutuje `tablicę`. Użyj `_.remove`
     * aby usunąć elementy z tablicy według predykatu.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {...*} [wartości] Wartości do usunięcia.
     * @returns {Array} Zwraca `tablic`.
     * @przykład
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pull(tablica, 'a', 'c');
     * console.log(tablica);
     * // => ['b', 'b']
     */
    var pull = baseRest(pullAll);

    /**
     * Ta metoda jest podobna do `_.pull` z tą różnicą, że akceptuje tablicę wartości do usunięcia.
     *
     * **Uwaga:** W przeciwieństwie do `_.difference` ta metoda mutuje `array`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {Array} wartości Wartości do usunięcia.
     * @returns {Array} Zwraca `tablic`.
     * @przykład
     *
     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
     *
     * _.pullAll(tablica, ['a', 'c']);
     * console.log(tablica);
     * // => ['b', 'b']
     */
    funkcja pullAll(tablica, wartości) {
      return (tablica && tablica.długość && wartości && wartości.długość)
        ? basePullAll(tablica, wartości)
        : tablica;
    }

    /**
     * Ta metoda jest podobna do `_.pullAll` z tą różnicą, że akceptuje `iterację`, która jest
     * wywoływane dla każdego elementu `array` i `values` w celu wygenerowania kryterium
     * według których są porównywane. Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * **Uwaga:** W przeciwieństwie do `_.differenceBy` ta metoda mutuje `tablica`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {Array} wartości Wartości do usunięcia.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {Array} Zwraca `tablic`.
     * @przykład
     *
     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
     *
     * _.pullAllBy(tablica, [{ 'x': 1 }, { 'x': 3 }], 'x');
     * console.log(tablica);
     * // => [{ 'x': 2 }]
     */
    function pullAllBy(tablica, wartości, iteracja) {
      return (tablica && tablica.długość && wartości && wartości.długość)
        ? basePullAll(tablica, wartości, getIteratee(iteratee, 2))
        : tablica;
    }

    /**
     * Ta metoda jest podobna do `_.pullAll` z wyjątkiem tego, że akceptuje `comparator` który
     * jest wywoływana w celu porównania elementów „tablicy” z „wartościami”. Komparatorem jest
     * wywoływane z dwoma argumentami: (arrVal, othVal).
     *
     * **Uwaga:** W przeciwieństwie do `_.differenceWith`, ta metoda mutuje `tablica`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.6.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {Array} wartości Wartości do usunięcia.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca `tablic`.
     * @przykład
     *
     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
     *
     * _.pullAllWith(tablica, [{ 'x': 3, 'y': 4 }], _.isEqual);
     * console.log(tablica);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
     */
    function pullAllWith(tablica, wartości, komparator) {
      return (tablica && tablica.długość && wartości && wartości.długość)
        ? basePullAll(tablica, wartości, niezdefiniowane, komparator)
        : tablica;
    }

    /**
     * Usuwa z `tablicy` elementy odpowiadające `indexes` i zwraca an
     * tablica usuniętych elementów.
     *
     * **Uwaga:** W przeciwieństwie do `_.at`, ta metoda mutuje `tablicę`.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {...(liczba|liczba[])} [indeksy] Indeksy elementów do usunięcia.
     * @returns {Array} Zwraca nową tablicę usuniętych elementów.
     * @przykład
     *
     * var array = ['a', 'b', 'c', 'd'];
     * var pociągnął = _.pullAt(tablica, [1, 3]);
     *
     * console.log(tablica);
     * // => ['a', 'c']
     *
     * console.log(wyciągany);
     * // => ['b', 'd']
     */
    var pullAt = flatRest(function(array, indexs) {
      długość zmiennej = tablica == null ? 0 : tablica.długość,
          wynik = baseAt(tablica, indeksy);

      basePullAt(tablica, arrayMap(indeksy, function(indeks) {
        return isIndex(indeks, długość) ? +indeks : indeks;
      }).sort(porównaj Rosnąco));

      zwróć wynik;
    });

    /**
     * Usuwa z `tablicy` wszystkie elementy, dla których `predicate` zwraca prawdziwość
     * i zwraca tablicę usuniętych elementów. Wywoływany jest predykat
     * z trzema argumentami: (wartość, indeks, tablica).
     *
     * **Uwaga:** W przeciwieństwie do `_.filter` ta metoda mutuje `tablica`. Użyj `_.pull`
     * aby pobrać elementy z tablicy według wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową tablicę usuniętych elementów.
     * @przykład
     *
     * var tablica = [1, 2, 3, 4];
     * var parzyste = _.remove(tablica, funkcja(n) {
     * zwróć n % 2 == 0;
     * });
     *
     * console.log(tablica);
     * // => [1, 3]
     *
     * console.log(parzyste);
     * // => [2, 4]
     */
    funkcja usuń(tablica, predykat) {
      var wynik = [];
      if (!(tablica && tablica.długość)) {
        zwróć wynik;
      }
      indeks zm = -1,
          indeksy = [],
          długość = tablica.długość;

      predykat = getIteratee(predykat, 3);
      while (++indeks < długość) {
        wartość zmiennej = tablica[indeks];
        if (predykat(wartość, indeks, tablica)) {
          wynik.push(wartość);
          indeksy.push(indeks);
        }
      }
      basePullAt(tablica, indeksy);
      zwróć wynik;
    }

    /**
     * Odwraca `tablicę`, aby pierwszy element stał się ostatnim, a drugi
     * element staje się przedostatnim i tak dalej.
     *
     * **Uwaga:** Ta metoda mutuje „tablicę” i jest oparta na
     * [`Array#reverse`](https://mdn.io/Array/reverse).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zmodyfikowania.
     * @returns {Array} Zwraca `tablic`.
     * @przykład
     *
     * var tablica = [1, 2, 3];
     *
     * _.reverse(tablica);
     * // => [3, 2, 1]
     *
     * console.log(tablica);
     * // => [3, 2, 1]
     */
    funkcja reverse(tablica) {
      zwróć tablicę == null ? tablica : nativeReverse.call(tablica);
    }

    /**
     * Tworzy wycinek „tablicy” od „start” do „końca”, ale nie w tym.
     *
     * **Uwaga:** Ta metoda jest używana zamiast
     * [`Array#slice`](https://mdn.io/Array/slice), aby zapewnić gęste tablice
     * zwrócono.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do wycięcia.
     * @param {liczba} [start=0] Pozycja początkowa.
     * @param {liczba} [koniec=tablica.długość] Pozycja końcowa.
     * @returns {Array} Zwraca wycinek `tablicy`.
     */
    function slice(tablica, start, end) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        zwrócić [];
      }
      if (koniec && typ końca != 'liczba' && isIterateeCall(tablica, początek, koniec)) {
        początek = 0;
        koniec = długość;
      }
      w przeciwnym razie {
        początek = początek == null ? 0 : toInteger(początek);
        koniec = koniec === niezdefiniowany ? length : toInteger(koniec);
      }
      return baseSlice(tablica, początek, koniec);
    }

    /**
     * Używa wyszukiwania binarnego w celu określenia najniższego indeksu, przy którym `wartość`
     * należy wstawić do `array`, aby zachować porządek sortowania.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} array Posortowana tablica do sprawdzenia.
     * @param {*} wartość Wartość do oceny.
     * @returns {liczba} Zwraca indeks, pod którym należy wstawić `wartość`
     * do „tablicy”.
     * @przykład
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     */
    function sortedIndex(tablica, wartość) {
      return baseSortedIndex(tablica, wartość);
    }

    /**
     * Ta metoda jest podobna do `_.sortedIndex` z wyjątkiem tego, że akceptuje `iteratee`
     * który jest wywoływany dla `value` i każdego elementu `array` w celu obliczenia ich
     * sortuj ranking. Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} array Posortowana tablica do sprawdzenia.
     * @param {*} wartość Wartość do oceny.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {liczba} Zwraca indeks, pod którym należy wstawić `wartość`
     * do „tablicy”.
     * @przykład
     *
     * var obiekty = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return ox; });
     * // => 0
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.sortedIndexBy(obiekty, { 'x': 4 }, 'x');
     * // => 0
     */
    function sortedIndexBy(tablica, wartość, iteracja) {
      return baseSortedIndexBy(tablica, wartość, getIteratee(iteratee, 2));
    }

    /**
     * Ta metoda jest podobna do `_.indexOf` z wyjątkiem tego, że wykonuje plik binarny
     * wyszukaj posortowaną `tablicę`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {*} wartość Wartość do wyszukania.
     * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
     * @przykład
     *
     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
     * // => 1
     */
    function sortedIndexOf(tablica, wartość) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (długość) {
        var index = baseSortedIndex(tablica, wartość);
        if (indeks < długość && eq(tablica[indeks], wartość)) {
          indeks zwrotu;
        }
      }
      powrót -1;
    }

    /**
     * Ta metoda jest podobna do `_.sortedIndex` z tą różnicą, że zwraca najwyższą
     * indeks, pod którym „wartość” powinna zostać wstawiona do „tablicy”, aby
     * zachowaj porządek sortowania.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} array Posortowana tablica do sprawdzenia.
     * @param {*} wartość Wartość do oceny.
     * @returns {liczba} Zwraca indeks, pod którym należy wstawić `wartość`
     * do „tablicy”.
     * @przykład
     *
     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
     * // => 4
     */
    function sortedLastIndex(tablica, wartość) {
      return baseSortedIndex(tablica, wartość, prawda);
    }

    /**
     * Ta metoda jest podobna do `_.sortedLastIndex` z wyjątkiem tego, że akceptuje `iteratee`
     * który jest wywoływany dla `value` i każdego elementu `array` w celu obliczenia ich
     * sortuj ranking. Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} array Posortowana tablica do sprawdzenia.
     * @param {*} wartość Wartość do oceny.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {liczba} Zwraca indeks, pod którym należy wstawić `wartość`
     * do „tablicy”.
     * @przykład
     *
     * var obiekty = [{ 'x': 4 }, { 'x': 5 }];
     *
     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return ox; });
     * // => 1
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.sortedLastIndexBy(obiekty, { 'x': 4 }, 'x');
     * // => 1
     */
    function sortedLastIndexBy(tablica, wartość, iteracja) {
      return baseSortedIndexBy(tablica, wartość, getIteratee(iteracja, 2), true);
    }

    /**
     * Ta metoda jest podobna do `_.lastIndexOf` z wyjątkiem tego, że wykonuje plik binarny
     * wyszukaj posortowaną `tablicę`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {*} wartość Wartość do wyszukania.
     * @returns {liczba} Zwraca indeks dopasowanej wartości, w przeciwnym razie `-1`.
     * @przykład
     *
     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
     * // => 3
     */
    function sortedLastIndexOf(tablica, wartość) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (długość) {
        var index = baseSortedIndex(tablica, wartość, prawda) - 1;
        if (eq(tablica[indeks], wartość)) {
          indeks zwrotu;
        }
      }
      powrót -1;
    }

    /**
     * Ta metoda jest podobna do `_.uniq` z wyjątkiem tego, że została zaprojektowana i zoptymalizowana
     * dla posortowanych tablic.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @returns {Array} Zwraca nową zduplikowaną wolną tablicę.
     * @przykład
     *
     * _.sortedUniq([1, 1, 2]);
     * // => [1, 2]
     */
    funkcja sortedUniq(tablica) {
      return (tablica && tablica.length)
        ? baseSortedUniq(tablica)
        : [];
    }

    /**
     * Ta metoda jest podobna do `_.uniqBy` z wyjątkiem tego, że została zaprojektowana i zoptymalizowana
     * dla posortowanych tablic.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Funkcja} [iteracja] Iteracja wywołana dla elementu.
     * @returns {Array} Zwraca nową zduplikowaną wolną tablicę.
     * @przykład
     *
     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
     * // => [1,1, 2,3]
     */
    function sortedUniqBy(tablica, iteracja) {
      return (tablica && tablica.length)
        ? baseSortedUniq(tablica, getIteratee(iteratee, 2))
        : [];
    }

    /**
     * Pobiera wszystkie elementy oprócz pierwszego elementu `array`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * _.ogon([1, 2, 3]);
     * // => [2, 3]
     */
    funkcja tail(tablica) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      długość powrotu ? baseSlice(tablica, 1, długość) : [];
    }

    /**
     * Tworzy kawałek „tablicy” z „n” elementami pobranymi od początku.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {liczba} [n=1] Liczba elementów do pobrania.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * _.wziąć([1, 2, 3]);
     * // => [1]
     *
     * _.wziąć([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.wziąć([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    funkcja take(tablica, n, guard) {
      if (!(tablica && tablica.długość)) {
        zwrócić [];
      }
      n = (strażnik || n === niezdefiniowany) ? 1: toInteger(n);
      return baseSlice(tablica, 0, n < 0 ? 0 : n);
    }

    /**
     * Tworzy kawałek „tablicy” z „n” elementami pobranymi z końca.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {liczba} [n=1] Liczba elementów do pobrania.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * _.TakeRight([1, 2, 3]);
     * // => [3]
     *
     * _. TakeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _. TakeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _. TakeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(tablica, n, guard) {
      długość zmiennej = tablica == null ? 0 : tablica.długość;
      jeśli (!długość) {
        zwrócić [];
      }
      n = (strażnik || n === niezdefiniowany) ? 1: toInteger(n);
      n = długość - n;
      return baseSlice(tablica, n < 0 ? 0 : n, długość);
    }

    /**
     * Tworzy kawałek „tablicy” z elementami pobranymi od końca. Elementy są
     * brane dopóki `predicate` nie zwróci fałszywie. Predykat jest wywoływany z
     * trzy argumenty: (wartość, indeks, tablica).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'active': true },
     * { 'użytkownik': 'fred', 'aktywny': fałsz },
     * { 'użytkownik': 'kamyki', 'aktywny': fałsz }
     * ];
     *
     * _.takeRightWhile(users, function(o) { return !o.active; });
     * // => obiekty dla ['fred', 'pebbles']
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
     * // => obiekty dla ['kamyki']
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.takeRightWhile(użytkownicy, ['aktywne', fałszywe]);
     * // => obiekty dla ['fred', 'pebbles']
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.takeRightWhile(użytkownicy, 'aktywni');
     * // => []
     */
    function takeRightWhile(tablica, predykat) {
      return (tablica && tablica.length)
        ? baseWhile(tablica, getIteratee(predykat, 3), fałsz, prawda)
        : [];
    }

    /**
     * Tworzy kawałek „tablicy” z elementami pobranymi od początku. Elementy
     * są pobierane, dopóki `predicate` nie zwróci fałszywie. Predykat jest wywoływany z
     * trzy argumenty: (wartość, indeks, tablica).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do zapytania.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca wycinek `tablicy`.
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'active': false },
     * { 'użytkownik': 'fred', 'aktywny': fałsz },
     * { 'użytkownik': 'kamyki', 'aktywny': prawda }
     * ];
     *
     * _.takeWhile(users, function(o) { return !o.active; });
     * // => obiekty dla ['barney', 'fred']
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.takeWhile(users, { 'user': 'barney', 'active': false });
     * // => obiekty dla ['barney']
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.takeWhile(użytkownicy, ['aktywny', fałsz]);
     * // => obiekty dla ['barney', 'fred']
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.takeWhile(użytkownicy, 'aktywni');
     * // => []
     */
    function takeWhile(tablica, predykat) {
      return (tablica && tablica.length)
        ? baseWhile(tablica, getIteratee(predykat, 3))
        : [];
    }

    /**
     * Tworzy tablicę unikalnych wartości, w kolejności, ze wszystkich podanych tablic przy użyciu
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @returns {Array} Zwraca nową tablicę połączonych wartości.
     * @przykład
     *
     * _.union([2], [1, 2]);
     * // => [2, 1]
     */
    var union = baseRest(funkcja(tablice) {
      return baseUniq(baseFlatten(tablice, 1, isArrayLikeObject, true));
    });

    /**
     * Ta metoda jest podobna do `_.union` z tą różnicą, że akceptuje `iteratee`, czyli
     * wywoływane dla każdego elementu każdej `tablicy` w celu wygenerowania kryterium przez
     * jaka unikatowość jest obliczana. Wartości wynikowe są wybierane z pierwszych
     * tablica, w której występuje wartość. Iterat jest wywoływany z jednym argumentem:
     * (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {Array} Zwraca nową tablicę połączonych wartości.
     * @przykład
     *
     * _.unionBy([2.1], [1.2, 2.3], Matematyka.podłoga);
     * // => [2.1, 1.2]
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    var unionBy = baseRest(function(arrays) {
      var iteratee = last(tablice);
      if (isArrayLikeObject(iteracja)) {
        iterowany = niezdefiniowany;
      }
      return baseUniq(baseFlatten(tablice, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
    });

    /**
     * Ta metoda jest podobna do `_.union` z wyjątkiem tego, że akceptuje `comparator` który
     * jest wywoływana w celu porównania elementów `tablic`. Wartości wynikowe są wybierane z
     * pierwsza tablica, w której występuje wartość. Wywoływany jest komparator
     * z dwoma argumentami: (arrVal, othVal).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową tablicę połączonych wartości.
     * @przykład
     *
     * var obiekty = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.unionWith(obiekty, inne, _.isEqual);
     * // => [{ 'x': 1, 'y': 2}, { 'x': 2, 'y': 1}, { 'x': 1, 'y': 1}]
     */
    var unionWith = baseRest(function(arrays) {
      var komparator = last(tablice);
      komparator = typ komparatora == 'funkcja' ? komparator : niezdefiniowany;
      return baseUniq(baseFlatten(tablice, 1, isArrayLikeObject, true), undefined, komparator);
    });

    /**
     * Tworzy wolną od duplikatów wersję tablicy, używając
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych, w których tylko pierwsze wystąpienie każdego elementu
     * jest trzymany. Kolejność wartości wynikowych jest określona przez kolejność ich występowania
     * w tablicy.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @returns {Array} Zwraca nową zduplikowaną wolną tablicę.
     * @przykład
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    funkcja uniq(tablica) {
      return (array && array.length) ? baseUniq(tablica) : [];
    }

    /**
     * Ta metoda jest podobna do `_.uniq` z tą różnicą, że akceptuje `iteratee`, czyli
     * wywoływane dla każdego elementu w `array` w celu wygenerowania kryterium, według którego
     * obliczana jest unikalność. Kolejność wartości wyników jest określona przez
     * kolejność ich występowania w tablicy. Iterat jest wywoływany z jednym argumentem:
     * (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {Array} Zwraca nową zduplikowaną wolną tablicę.
     * @przykład
     *
     * _.uniqBy([2.1, 1.2, 2.3], Matematyka.podłoga);
     * // => [2.1, 1.2]
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniqBy(tablica, iteracja) {
      return (array && array.length) ? baseUniq(tablica, getIteratee(iteratee, 2)) : [];
    }

    /**
     * Ta metoda jest podobna do `_.uniq` z wyjątkiem tego, że akceptuje `comparator` który
     * jest wywoływana w celu porównania elementów `array`. Kolejność wartości wyników to
     * określony przez kolejność ich występowania w tablicy. Wywoływany jest komparator
     * z dwoma argumentami: (arrVal, othVal).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową zduplikowaną wolną tablicę.
     * @przykład
     *
     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.uniqWith(obiekty, _.isEqual);
     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
     */
    function uniqWith(tablica, komparator) {
      komparator = typ komparatora == 'funkcja' ? komparator : niezdefiniowany;
      return (array && array.length) ? baseUniq(tablica, niezdefiniowana, komparator) : [];
    }

    /**
     * Ta metoda jest podobna do `_.zip` z tą różnicą, że akceptuje tablicę zgrupowanych
     * elementy i tworzy tablicę przegrupowującą elementy do ich pre-zip
     * konfiguracja.
     *
     * @statyczny
     * @członkiem _
     * @od 1.2.0
     * @kategoria tablica
     * @param {Array} array Tablica zgrupowanych elementów do przetworzenia.
     * @returns {Array} Zwraca nową tablicę przegrupowanych elementów.
     * @przykład
     *
     * var zip = _.zip(['a', 'b'], [1, 2], [prawda, fałsz]);
     * // => [['a', 1, prawda], ['b', 2, fałsz]]
     *
     * _.unzip(skompresowany);
     * // => [['a', 'b'], [1, 2], [prawda, fałsz]]
     */
    funkcja unzip(tablica) {
      if (!(tablica && tablica.długość)) {
        zwrócić [];
      }
      zmienna długość = 0;
      array = arrayFilter(tablica, funkcja(grupa) {
        if (jestArrayLikeObject(grupa)) {
          length = nativeMax(group.length, length);
          zwróć prawdę;
        }
      });
      return baseTimes(length, function(index) {
        return arrayMap(tablica, baseProperty(indeks));
      });
    }

    /**
     * Ta metoda jest podobna do `_.unzip` z tym wyjątkiem, że akceptuje `iterację` do określenia
     * jak należy łączyć przegrupowane wartości. Iterate jest wywoływany z
     * elementy każdej grupy: (...grupa).
     *
     * @statyczny
     * @członkiem _
     * @od 3.8.0
     * @kategoria tablica
     * @param {Array} array Tablica zgrupowanych elementów do przetworzenia.
     * @param {Funkcja} [iteratee=_.identity] Funkcja łączenia
     * wartości przegrupowane.
     * @returns {Array} Zwraca nową tablicę przegrupowanych elementów.
     * @przykład
     *
     * var spakowany = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zip, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(tablica, iteracja) {
      if (!(tablica && tablica.długość)) {
        zwrócić [];
      }
      var wynik = unzip(tablica);
      if (iteracja == null) {
        zwróć wynik;
      }
      return arrayMap(wynik, funkcja(grupa) {
        return Apply(iteratee, undefined, group);
      });
    }

    /**
     * Tworzy tablicę wykluczającą wszystkie podane wartości za pomocą
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * dla porównań równościowych.
     *
     * **Uwaga:** W przeciwieństwie do `_.pull`, ta metoda zwraca nową tablicę.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {Array} tablica Tablica do sprawdzenia.
     * @param {...*} [wartości] Wartości do wykluczenia.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @patrz _.różnica, _.xor
     * @przykład
     *
     * _.bez([2, 1, 2, 3], 1, 2);
     * // => [3]
     */
    var bez = baseRest(funkcja(tablica, wartości) {
      return isArrayLikeObject(tablica)
        ? baseDifference(tablica, wartości)
        : [];
    });

    /**
     * Tworzy tablicę unikalnych wartości, która jest
     * [różnica symetryczna](https://en.wikipedia.org/wiki/Symmetric_difference)
     * z podanych tablic. Kolejność wartości wyników jest określona przez kolejność
     * występują w tablicach.
     *
     * @statyczny
     * @członkiem _
     * @od 2.4.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @patrz _.różnica, _.bez
     * @przykład
     *
     * _.xor([2, 1], [2, 3]);
     * // => [1, 3]
     */
    var xor = baseRest(funkcja(tablice) {
      return baseXor(arrayFilter(tablice, isArrayLikeObject));
    });

    /**
     * Ta metoda jest podobna do `_.xor` z wyjątkiem tego, że akceptuje `iteratee`, co jest
     * wywoływane dla każdego elementu każdej `tablicy` w celu wygenerowania kryterium przez
     * według którego są porównywane. Ustala się kolejność wartości wyników
     * według kolejności występowania w tablicach. Iterate jest wywoływany z jednym
     * argument: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @przykład
     *
     * _.xorBy([2.1, 1.2], [2.3, 3.4], Matematyka.podłoga);
     * // => [1,2, 3,4]
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 2 }]
     */
    var xorBy = baseRest(funkcja(tablice) {
      var iteratee = last(tablice);
      if (isArrayLikeObject(iteracja)) {
        iterowany = niezdefiniowany;
      }
      return baseXor(arrayFilter(tablice, isArrayLikeObject), getIteratee(iteratee, 2));
    });

    /**
     * Ta metoda jest podobna do `_.xor` z wyjątkiem tego, że akceptuje `komparator`, którym jest
     * wywoływane w celu porównania elementów `tablic`. Kolejność wartości wyników to
     * określona przez kolejność ich występowania w tablicach. Wywoływany jest komparator
     * z dwoma argumentami: (arrVal, othVal).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do sprawdzenia.
     * @param {Funkcja} [komparator] Komparator wywoływany dla elementu.
     * @returns {Array} Zwraca nową tablicę przefiltrowanych wartości.
     * @przykład
     *
     * var obiekty = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
     *
     * _.xorWith(obiekty, inne, _.isEqual);
     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
     */
    var xorWith = baseRest(function(arrays) {
      var komparator = last(tablice);
      komparator = typ komparatora == 'funkcja' ? komparator : niezdefiniowany;
      return baseXor(arrayFilter(tablice, isArrayLikeObject), niezdefiniowane, komparator);
    });

    /**
     * Tworzy tablicę zgrupowanych elementów, z których pierwszy zawiera
     * pierwsze elementy z podanych tablic, z których drugi zawiera
     * drugie elementy podanych tablic i tak dalej.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do przetworzenia.
     * @returns {Array} Zwraca nową tablicę zgrupowanych elementów.
     * @przykład
     *
     * _.zip(['a', 'b'], [1, 2], [prawda, fałsz]);
     * // => [['a', 1, prawda], ['b', 2, fałsz]]
     */
    var zip = baseRest(unzip);

    /**
     * Ta metoda jest podobna do `_.fromPairs` z tą różnicą, że akceptuje dwie tablice,
     * jeden z identyfikatorów właściwości i jedna z odpowiadających im wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 0.4.0
     * @kategoria tablica
     * @param {Array} [props=[]] Identyfikatory właściwości.
     * @param {Array} [values=[]] Wartości właściwości.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * _.zipObject(['a', 'b'], [1, 2]);
     * // => { 'a': 1, 'b': 2 }
     */
    function zipObject(rekwizyty, wartości) {
      return baseZipObject(właściwości || [], wartości || [], assignValue);
    }

    /**
     * Ta metoda jest podobna do `_.zipObject` z tą różnicą, że obsługuje ścieżki właściwości.
     *
     * @statyczny
     * @członkiem _
     * @od 4.1.0
     * @kategoria tablica
     * @param {Array} [props=[]] Identyfikatory właściwości.
     * @param {Array} [values=[]] Wartości właściwości.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * _.zipObjectDeep(['ab[0].c', 'ab[1].d'], [1, 2]);
     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
     */
    function zipObjectDeep(rekwizyty, wartości) {
      return baseZipObject(właściwości || [], wartości || [], baseSet);
    }

    /**
     * Ta metoda jest podobna do `_.zip` z tą różnicą, że akceptuje `iterację` do określenia
     * jak należy łączyć zgrupowane wartości. Iterate jest wywoływany z
     * elementy każdej grupy: (...grupa).
     *
     * @statyczny
     * @członkiem _
     * @od 3.8.0
     * @kategoria tablica
     * @param {...Array} [tablice] Tablice do przetworzenia.
     * @param {Funkcja} [iteratee=_.identity] Funkcja łączenia
     * wartości zgrupowane.
     * @returns {Array} Zwraca nową tablicę zgrupowanych elementów.
     * @przykład
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
     * zwróć a + b + c;
     * });
     * // => [111, 222]
     */
    var zipWith = baseRest(function(arrays) {
      zmienna długość = tablice.długość,
          iteracja = długość > 1 ? tablice[długość - 1] : niezdefiniowane;

      iteracja = typ iteracji == 'funkcja' ? (tablice.pop(), iteracja) : niezdefiniowane;
      return unzipWith(tablice, iteracja);
    });

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy opakowującą instancję `lodash`, która opakowuje `wartość` za pomocą jawnej metody
     * włączone sekwencje łańcuchowe. Wynik takich sekwencji należy rozpakować
     * z `_#wartość`.
     *
     * @statyczny
     * @członkiem _
     * @od 1.3.0
     * @kategoria Seq
     * @param {*} wartość Wartość do zawijania.
     * @returns {Object} Zwraca nową instancję opakowania `lodash`.
     * @przykład
     *
     * var użytkowników = [
     * { 'użytkownik': 'barney', 'wiek': 36 },
     * { 'użytkownik': 'fred', 'wiek': 40 },
     * { 'użytkownik': 'kamyki', 'wiek': 1 }
     * ];
     *
     * var najmłodszy = _
     * .chain (użytkownicy)
     * .sortuj według('wiek')
     * .map(funkcja(o) {
     * return o.user + ' to ' + o.age;
     * })
     * .głowa()
     * .wartość();
     * // => 'kamyki to 1'
     */
    łańcuch funkcji (wartość) {
      var wynik = lodash(wartość);
      wynik.__łańcuch__ = prawda;
      zwróć wynik;
    }

    /**
     * Ta metoda wywołuje „interceptor” i zwraca „wartość”. Przechwytywacz
     * jest wywoływana z jednym argumentem; (wartość). Celem tej metody jest:
     * „dotknij” sekwencji łańcucha metod w celu modyfikacji wyników pośrednich.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Seq
     * @param {*} wartość Wartość przekazywana do funkcji „interceptor”.
     * @param {Function} interceptor Funkcja do wywołania.
     * @returns {*} Zwraca `wartość`.
     * @przykład
     *
     * _([1, 2, 3])
     * .tap(funkcja(tablica) {
     * // Mutacja tablicy wejściowej.
     * tablica.pop();
     * })
     * .odwrócić()
     * .wartość();
     * // => [2, 1]
     */
    funkcja tap(wartość, interceptor) {
      przechwytywacz(wartość);
      wartość zwrotu;
    }

    /**
     * Ta metoda jest podobna do `_.tap` z tą różnicą, że zwraca wynik `interceptor`.
     * Celem tej metody jest „przejście przez” wartości zastępujące wartości pośrednie
     * daje w wyniku sekwencję łańcucha metod.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Seq
     * @param {*} wartość Wartość przekazywana do funkcji „interceptor”.
     * @param {Function} interceptor Funkcja do wywołania.
     * @returns {*} Zwraca wynik `interceptor`.
     * @przykład
     *
     * _('abc')
     * .łańcuch()
     * .przycinać()
     * .thru(funkcja(wartość) {
     * zwraca [wartość];
     * })
     * .wartość();
     * // => ['abc']
     */
    funkcja przez (wartość, interceptor) {
      zwróć interceptor(wartość);
    }

    /**
     * Ta metoda jest opakowującą wersją `_.at`.
     *
     * @imię w
     * @członkiem _
     * @od 1.0.0
     * @kategoria Seq
     * @param {...(string|string[])} [ścieżki] Ścieżki właściwości do wybrania.
     * @returns {Object} Zwraca nową instancję opakowania `lodash`.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _(obiekt).at(['a[0].bc', 'a[1]']).value();
     * // => [3, 4]
     */
    var wrapperAt = flatRest(function(paths) {
      var length = paths.length,
          początek = długość ? ścieżki[0] : 0,
          wartość = this.__wrapped__,
          interceptor = function(obiekt) { return baseAt(obiekt, ścieżki); };

      if (długość > 1 || this.__actions__.length ||
          !(wartość wystąpienia LazyWrapper) || !isIndex(start)) {
        zwróć this.thru(interceptor);
      }
      wartość = wartość.plasterek(start, +start + (długość ? 1 : 0));
      wartość.__działania__.push({
        „func”: przez,
        'args': [przechwytujący],
        'thisArg': niezdefiniowane
      });
      return new LodashWrapper(wartość, this.__chain__).thru(function(array) {
        if (długość && !tablica.długość) {
          array.push(niezdefiniowane);
        }
        tablica zwrotów;
      });
    });

    /**
     * Tworzy opakowującą instancję `lodash` z włączonymi jawnymi sekwencjami łańcucha metod.
     *
     * @nazwa łańcucha
     * @członkiem _
     * @od 0.1.0
     * @kategoria Seq
     * @returns {Object} Zwraca nową instancję opakowania `lodash`.
     * @przykład
     *
     * var użytkowników = [
     * { 'użytkownik': 'barney', 'wiek': 36 },
     * { 'użytkownik': 'fred', 'wiek': 40 }
     * ];
     *
     * // Sekwencja bez jawnego tworzenia łańcuchów.
     * _(użytkownicy).head();
     * // => { 'użytkownik': 'barney', 'wiek': 36 }
     *
     * // Sekwencja z jawnym tworzeniem łańcuchów.
     * _(użytkownicy)
     * .łańcuch()
     * .głowa()
     * .pick('użytkownik')
     * .wartość();
     * // => { 'użytkownik': 'barney' }
     */
    funkcja wrapperchain() {
      łańcuch zwrotów(to);
    }

    /**
     * Wykonuje sekwencję łańcuchową i zwraca opakowany wynik.
     *
     * @name zatwierdź
     * @członkiem _
     * @od 3.2.0
     * @kategoria Seq
     * @returns {Object} Zwraca nową instancję opakowania `lodash`.
     * @przykład
     *
     * var tablica = [1, 2];
     * var opakowane = _(tablica).push(3);
     *
     * console.log(tablica);
     * // => [1, 2]
     *
     * opakowane = opakowane.commit();
     * console.log(tablica);
     * // => [1, 2, 3]
     *
     * opakowane.last();
     * // => 3
     *
     * console.log(tablica);
     * // => [1, 2, 3]
     */
    funkcja wrapperCommit() {
      zwróć nowy LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Pobiera następną wartość na opakowanym obiekcie po
     * [protokół iteratora](https://mdn.io/iteration_protocols#iterator).
     *
     * @Nazwa następna
     * @członkiem _
     * @od 4.0.0
     * @kategoria Seq
     * @returns {Object} Zwraca następną wartość iteratora.
     * @przykład
     *
     * var opakowane = _([1, 2]);
     *
     * opakowanie.następne();
     * // => { 'zrobione': fałsz, 'wartość': 1 }
     *
     * opakowanie.następne();
     * // => { 'zrobione': fałsz, 'wartość': 2 }
     *
     * opakowanie.następne();
     * // => { 'zrobione': prawda, 'wartość': niezdefiniowane }
     */
    funkcja wrapperDalej() {
      if (this.__values__ === undefined) {
        this.__values__ = toArray(this.value());
      }
      var done = this.__index__ >= this.__values__.length,
          wartość = gotowe ? niezdefiniowane : ten.__wartości__[ten.__indeks__++];

      return { 'zrobione': gotowe, 'wartość': wartość };
    }

    /**
     * Umożliwia iterację opakowania.
     *
     * @name Symbol.iterator
     * @członkiem _
     * @od 4.0.0
     * @kategoria Seq
     * @returns {Object} Zwraca obiekt opakowujący.
     * @przykład
     *
     * var opakowane = _([1, 2]);
     *
     * opakowane[Symbol.iterator]() === opakowane;
     * // => prawda
     *
     * Array.from(opakowane);
     * // => [1, 2]
     */
    funkcja wrapperToIterator() {
      zwróć to;
    }

    /**
     * Tworzy klon sekwencji łańcucha sadzącej `wartość` jako opakowaną wartość.
     *
     * @nazwa zakładu
     * @członkiem _
     * @od 3.2.0
     * @kategoria Seq
     * @param {*} wartość Wartość do posadzenia.
     * @returns {Object} Zwraca nową instancję opakowania `lodash`.
     * @przykład
     *
     * kwadrat funkcji (n) {
     * powrót n * n;
     * }
     *
     * var opakowane = _([1, 2]).map(kwadrat);
     * var inne = opakowane.roślina([3, 4]);
     *
     * inna.wartość();
     * // => [9, 16]
     *
     * opakowane.wartość();
     * // => [1, 4]
     */
    funkcja wrapperPlant(wartość) {
      var wynik,
          rodzic = to;

      while (nadrzędna instancja baseLodash) {
        var klon = wrapperClone(rodzic);
        klon.__indeks__ = 0;
        klon.__wartości__ = niezdefiniowane;
        jeśli (wynik) {
          poprzedni.__opakowany__ = klon;
        } w przeciwnym razie {
          wynik = klon;
        }
        var poprzedni = klon;
        rodzic = rodzic.__opakowany__;
      }
      poprzedni.__opakowany__ = wartość;
      zwróć wynik;
    }

    /**
     * Ta metoda jest opakowującą wersją `_.reverse`.
     *
     * **Uwaga:** Ta metoda mutuje opakowaną tablicę.
     *
     * @nazwa odwrócona
     * @członkiem _
     * @od 0.1.0
     * @kategoria Seq
     * @returns {Object} Zwraca nową instancję opakowania `lodash`.
     * @przykład
     *
     * var tablica = [1, 2, 3];
     *
     * _(tablica).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(tablica);
     * // => [3, 2, 1]
     */
    funkcja wrapperReverse() {
      var wartość = this.__wrapped__;
      if (wartość wystąpienia LazyWrapper) {
        zmienna opakowana = wartość;
        if (this.__actions__.length) {
          opakowane = new LazyWrapper(this);
        }
        opakowane = opakowane.reverse();
        opakowane.__działania__.push({
          „func”: przez,
          'args': [rewers],
          'thisArg': niezdefiniowane
        });
        zwróć nowe LodashWrapper(opakowane, this.__chain__);
      }
      zwróć this.thru(reverse);
    }

    /**
     * Wykonuje sekwencję łańcucha, aby rozwiązać nieopakowaną wartość.
     *
     * @nazwa wartość
     * @członkiem _
     * @od 0.1.0
     * @alias toJSON, valueOf
     * @kategoria Seq
     * @returns {*} Zwraca rozwiązaną nieopakowaną wartość.
     * @przykład
     *
     * _([1, 2, 3]).wartość();
     * // => [1, 2, 3]
     */
    funkcja wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Tworzy obiekt złożony z kluczy wygenerowanych na podstawie wyników biegu
     * każdy element od „kolekcji” do „iteracji”. Odpowiadająca wartość
     * każdy klucz to ile razy klucz został zwrócony przez `iteratee`. ten
     * iteracja jest wywoływana z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 0.50
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Iterat do przekształcania kluczy.
     * @returns {Object} Zwraca złożony obiekt zagregowany.
     * @przykład
     *
     * _.countBy([6.1, 4.2, 6.3], Math.floor);
     * // => { '4': 1, '6': 2 }
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.countBy(['jeden', 'dwa', 'trzy'], 'długość');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(funkcja(wynik, wartość, klucz) {
      if (hasOwnProperty.call(wynik, klucz)) {
        ++wynik[klucz];
      } w przeciwnym razie {
        baseAssignValue(wynik, klucz, 1);
      }
    });

    /**
     * Sprawdza, czy `predicate` zwraca prawdę dla **wszystkich** elementów `collection`.
     * Iteracja jest zatrzymywana, gdy `predicate` zwraca fałsz. Predykat to
     * wywoływane z trzema argumentami: (wartość, indeks|klucz, kolekcja).
     *
     * **Uwaga:** Ta metoda zwraca `true` for
     * [puste kolekcje](https://en.wikipedia.org/wiki/Empty_set) ponieważ
     * [wszystko jest prawdą](https://en.wikipedia.org/wiki/Vacuous_truth) z
     * elementy pustych kolekcji.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {boolean} Zwraca `true` jeśli wszystkie elementy przejdą kontrolę predykatu,
     * w przeciwnym razie `fałsz`.
     * @przykład
     *
     * _.every([prawda, 1, null, 'tak'], Boolean);
     * // => fałsz
     *
     * var użytkowników = [
     * { 'user': 'barney', 'wiek': 36, 'active': false },
     * { 'użytkownik': 'fred', 'wiek': 40, 'aktywny': fałsz }
     * ];
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => fałsz
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.every(użytkownicy, ['aktywny', fałsz]);
     * // => prawda
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.every(użytkownicy, 'aktywni');
     * // => fałsz
     */
    funkcja every(kolekcja, orzeczenie, strażnik) {
      var func = isArray(kolekcja) ? arrayEvery : baseEvery;
      if (strażnik && isIterateeCall(kolekcja, predykat, strażnik)) {
        predykat = niezdefiniowany;
      }
      return func(kolekcja, getIteratee(predykat, 3));
    }

    /**
     * Iteruje po elementach `collection`, zwracając tablicę wszystkich elementów
     * `predicate` zwraca prawdę dla. Orzeczenie jest wywoływane z trzema
     * argumenty: (wartość, indeks|klucz, kolekcja).
     *
     * **Uwaga:** W przeciwieństwie do `_.remove`, ta metoda zwraca nową tablicę.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową przefiltrowaną tablicę.
     * @patrz _.reject
     * @przykład
     *
     * var użytkowników = [
     * { 'użytkownik': 'barney', 'wiek': 36, 'aktywny': prawda },
     * { 'użytkownik': 'fred', 'wiek': 40, 'aktywny': fałsz }
     * ];
     *
     * _.filter(users, function(o) { return !o.active; });
     * // => obiekty dla ['fred']
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.filter(users, { 'wiek': 36, 'aktywny': prawda });
     * // => obiekty dla ['barney']
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.filter(użytkownicy, ['aktywny', fałsz]);
     * // => obiekty dla ['fred']
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.filter(użytkownicy, 'aktywni');
     * // => obiekty dla ['barney']
     */
    funkcja filtr(zbiór, predykat) {
      var func = isArray(kolekcja) ? arrayFilter : baseFilter;
      return func(kolekcja, getIteratee(predykat, 3));
    }

    /**
     * Iteruje po elementach `collection`, zwracając pierwszy element
     * `predicate` zwraca prawdę dla. Orzeczenie jest wywoływane z trzema
     * argumenty: (wartość, indeks|klucz, kolekcja).
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do sprawdzenia.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @param {liczba} [fromIndex=0] Indeks do wyszukiwania.
     * @returns {*} Zwraca dopasowany element, w przeciwnym razie `undefined`.
     * @przykład
     *
     * var użytkowników = [
     * { 'użytkownik': 'barney', 'wiek': 36, 'aktywny': prawda },
     * { 'użytkownik': 'fred', 'wiek': 40, 'aktywny': fałsz },
     * { 'użytkownik': 'kamyki', 'wiek': 1, 'aktywny': prawda }
     * ];
     *
     * _.find(users, function(o) { return o.wiek < 40; });
     * // => obiekt dla 'barney'
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.find(users, { 'wiek': 1, 'aktywny': prawda });
     * // => obiekt dla „kamyków”
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.find(użytkownicy, ['aktywny', fałsz]);
     * // => obiekt dla 'fred'
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.find(użytkownicy, 'aktywni');
     * // => obiekt dla 'barney'
     */
    var find = createFind(findIndex);

    /**
     * Ta metoda jest podobna do `_.find` z tą różnicą, że iteruje po elementach
     * `kolekcja` od prawej do lewej.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do sprawdzenia.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @param {liczba} [fromIndex=collection.length-1] Indeks do wyszukiwania.
     * @returns {*} Zwraca dopasowany element, w przeciwnym razie `undefined`.
     * @przykład
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     * zwróć n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(findLastIndex);

    /**
     * Tworzy spłaszczoną tablicę wartości, uruchamiając każdy element w `collection`
     * przez itru iteratee i spłaszczanie mapowanych wyników. Wywoływany jest iterate
     * z trzema argumentami: (wartość, indeks|klucz, kolekcja).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową spłaszczoną tablicę.
     * @przykład
     *
     * duplikat funkcji (n) {
     * powrót [n, n];
     * }
     *
     * _.flatMap([1, 2], duplikat);
     * // => [1, 1, 2, 2]
     */
    function flatMap(kolekcja, iteracja) {
      return baseFlatten(map(kolekcja, iteracja), 1);
    }

    /**
     * Ta metoda jest podobna do `_.flatMap` z tą różnicą, że rekurencyjnie spłaszcza
     * zmapowane wyniki.
     *
     * @statyczny
     * @członkiem _
     * @od 4.7.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową spłaszczoną tablicę.
     * @przykład
     *
     * duplikat funkcji (n) {
     * zwróć [[[n, n]]];
     * }
     *
     * _.flatMapDeep([1, 2], duplikat);
     * // => [1, 1, 2, 2]
     */
    function flatMapDeep(kolekcja, iteracja) {
      return baseFlatten(map(kolekcja, iteracja), INFINITY);
    }

    /**
     * Ta metoda jest podobna do `_.flatMap` z tą różnicą, że rekurencyjnie spłaszcza
     * mapowane wyniki do czasów „głębokości”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.7.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @param {liczba} [głębokość=1] Maksymalna głębokość rekurencji.
     * @returns {Array} Zwraca nową spłaszczoną tablicę.
     * @przykład
     *
     * duplikat funkcji (n) {
     * zwróć [[[n, n]]];
     * }
     *
     * _.flatMapDepth([1, 2], duplikat, 2);
     * // => [[1, 1], [2, 2]]
     */
    function flatMapDepth(kolekcja, iteracja, głębokość) {
      głębokość = głębokość === niezdefiniowana ? 1 : toInteger(głębokość);
      return baseFlatten(map(kolekcja, iteracja), głębokość);
    }

    /**
     * Iteruje po elementach `collection` i wywołuje `iteratee` dla każdego elementu.
     * Iterat jest wywoływany z trzema argumentami: (wartość, indeks|klucz, kolekcja).
     * Funkcje iteracyjne mogą zakończyć iterację wcześniej przez jawne zwrócenie `false`.
     *
     * **Uwaga:** Podobnie jak w przypadku innych metod „Kolekcje”, obiekty o „długości”
     * właściwości są iterowane jak tablice. Aby uniknąć tego zachowania, użyj `_.forIn`
     * lub `_.forOwn` dla iteracji obiektów.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @alias każdy
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Tablica|Obiekt} Zwraca `kolekcja`.
     * @zobacz _.forEachRight
     * @przykład
     *
     * _.forEach([1, 2], funkcja(wartość) {
     * konsola.log(wartość);
     * });
     * // => Dzienniki `1`, a następnie `2`.
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(wartość, klucz) {
     * console.log(klucz);
     * });
     * // => Loguje „a”, a następnie „b” (kolejność iteracji nie jest gwarantowana).
     */
    function forEach(kolekcja, iteracja) {
      var func = isArray(kolekcja) ? arrayEach : baseEach;
      return func(kolekcja, getIteratee(iteratee, 3));
    }

    /**
     * Ta metoda jest podobna do `_.forEach` z tą różnicą, że iteruje po elementach
     * `kolekcja` od prawej do lewej.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @alias eachRight
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Tablica|Obiekt} Zwraca `kolekcja`.
     * @patrz _.forEach
     * @przykład
     *
     * _.forEachRight([1, 2], funkcja(wartość) {
     * konsola.log(wartość);
     * });
     * // => Dzienniki `2` następnie `1`.
     */
    function forEachRight(kolekcja, iteracja) {
      var func = isArray(kolekcja) ? arrayEachRight : baseEachRight;
      return func(kolekcja, getIteratee(iteratee, 3));
    }

    /**
     * Tworzy obiekt złożony z kluczy wygenerowanych na podstawie wyników biegu
     * każdy element od „kolekcji” do „iteracji”. Kolejność zgrupowanych wartości
     * zależy od kolejności ich występowania w zbiorze. Odpowiednie
     * wartość każdego klucza to tablica elementów odpowiedzialnych za generowanie
     * klucz. Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Iterat do przekształcania kluczy.
     * @returns {Object} Zwraca złożony obiekt zagregowany.
     * @przykład
     *
     * _.groupBy([6.1, 4.2, 6.3], Matematyka.podłoga);
     * // => { '4': [4.2], '6': [6.1, 6.3] }
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.groupBy(['jeden', 'dwa', 'trzy'], 'długość');
     * // => { '3': ['jeden', 'dwa'], '5': ['trzy'] }
     */
    var groupBy = createAggregator(funkcja(wynik, wartość, klucz) {
      if (hasOwnProperty.call(wynik, klucz)) {
        wynik[klucz].push(wartość);
      } w przeciwnym razie {
        baseAssignValue(wynik, klucz, [wartość]);
      }
    });

    /**
     * Sprawdza, czy „wartość” znajduje się w „kolekcji”. Jeśli `collection` jest ciągiem, to jest
     * sprawdzono podłańcuch `wartość`, w przeciwnym razie
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * służy do porównań równości. Jeśli `fromIndex` jest ujemny, jest używany jako
     * przesunięcie od końca `collection`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object|string} Kolekcja do sprawdzenia.
     * @param {*} wartość Wartość do wyszukania.
     * @param {liczba} [fromIndex=0] Indeks do wyszukiwania.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.reduce`.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” zostanie znaleziona, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.zawiera([1, 2, 3], 1);
     * // => prawda
     *
     * _.zawiera([1, 2, 3], 1, 2);
     * // => fałsz
     *
     * _.includes({ 'a': 1, 'b': 2 }, 1);
     * // => prawda
     *
     * _.includes('abcd', 'bc');
     * // => prawda
     */
    funkcja zawiera(kolekcja, wartość, fromIndex, guard) {
      kolekcja = isArrayLike(kolekcja) ? kolekcja : wartości(kolekcja);
      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

      var długość = kolekcja.długość;
      if (fromIndex < 0) {
        fromIndex = nativeMax(długość + fromIndex, 0);
      }
      return isString(kolekcja)
        ? (fromIndex <= długość && collection.indexOf(value, fromIndex) > -1)
        : (!!length && baseIndexOf(kolekcja, wartość, fromIndex) > -1);
    }

    /**
     * Wywołuje metodę w `path` każdego elementu w `collection`, zwracając
     * tablica wyników każdej wywołanej metody. Wszelkie dodatkowe argumenty
     * są podane dla każdej wywołanej metody. Jeśli `path` jest funkcją, jest wywoływana
     * dla i `this` do każdego elementu `collection`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Array|Function|string} path Ścieżka metody do wywołania lub
     * funkcja wywoływana na iterację.
     * @param {...*} [argumenty] Argumenty do wywołania każdej metody.
     * @returns {Array} Zwraca tablicę wyników.
     * @przykład
     *
     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sortuj');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invokeMap([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invokeMap = baseRest(function(collection, path, args) {
      indeks zm = -1,
          isFunc = typ ścieżki == 'funkcja',
          wynik = isArrayLike(kolekcja) ? Array(kolekcja.długość) : [];

      baseEach(kolekcja, funkcja(wartość) {
        wynik[++indeks] = isFunc ? Apply(ścieżka, wartość, argumenty) : baseInvoke(wartość, ścieżka, argumenty);
      });
      zwróć wynik;
    });

    /**
     * Tworzy obiekt złożony z kluczy wygenerowanych na podstawie wyników biegu
     * każdy element od „kolekcji” do „iteracji”. Odpowiadająca wartość
     * każdy klucz jest ostatnim elementem odpowiedzialnym za wygenerowanie klucza. ten
     * iteracja jest wywoływana z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Iterat do przekształcania kluczy.
     * @returns {Object} Zwraca złożony obiekt zagregowany.
     * @przykład
     *
     * var tablica = [
     * { 'dir': 'left', 'code': 97 },
     * { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.keyBy(tablica, funkcja(o) {
     * return String.fromCharCode(o.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.keyBy(tablica, 'katalog');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     */
    var keyBy = createAggregator(funkcja(wynik, wartość, klucz) {
      baseAssignValue(wynik, klucz, wartość);
    });

    /**
     * Tworzy tablicę wartości, uruchamiając każdy element w kolekcji `collection` thru
     * „iterates”. Iterat jest wywoływany z trzema argumentami:
     * (wartość, indeks|klucz, kolekcja).
     *
     * Wiele metod lodash jest chronionych, aby działały jako iteracje dla metod takich jak
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject` i `_.some`.
     *
     * Metody strzeżone to:
     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
     * `szablon`, `trim`, `trimEnd`, `trimStart` i `words`
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową zamapowaną tablicę.
     * @przykład
     *
     * kwadrat funkcji (n) {
     * powrót n * n;
     * }
     *
     * _.map([4, 8], kwadrat);
     * // => [16, 64]
     *
     * _.map({ 'a': 4, 'b': 8 }, kwadrat);
     * // => [16, 64] (kolejność iteracji nie jest gwarantowana)
     *
     * var użytkowników = [
     * { 'użytkownik': 'barney' },
     * { 'użytkownik': 'fred' }
     * ];
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.map(użytkownicy, 'użytkownik');
     * // => ['Barney', 'Fred']
     */
    mapa funkcji(kolekcja, iteracja) {
      var func = isArray(kolekcja) ? arrayMap : baseMap;
      return func(kolekcja, getIteratee(iteratee, 3));
    }

    /**
     * Ta metoda jest podobna do `_.sortBy` z wyjątkiem tego, że pozwala na określenie sortowania
     * rozkazy iteratów do sortowania. Jeśli `zamówienia` nie są określone, wszystkie wartości
     * są posortowane w porządku rosnącym. W przeciwnym razie podaj kolejność „opis” dla
     * malejąca lub „asc” dla rosnącej kolejności sortowania odpowiednich wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Tablica[]|Funkcja[]|Obiekt[]|ciąg[]} [iterates=[_.identity]]
     * Iteracje do sortowania.
     * @param {string[]} [orders] Porządek sortowania `iteraci`.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.reduce`.
     * @returns {Array} Zwraca nową posortowaną tablicę.
     * @przykład
     *
     * var użytkowników = [
     * { 'użytkownik': 'fred', 'wiek': 48 },
     * { 'użytkownik': 'barney', 'wiek': 34},
     * { 'użytkownik': 'fred', 'wiek': 40 },
     * { 'użytkownik': 'barney', 'wiek': 36 }
     * ];
     *
     * // Sortuj według `użytkownika` w porządku rosnącym i według `wieku` w porządku malejącym.
     * _.orderBy(użytkownicy, ['użytkownik', 'wiek'], ['asc', 'opis']);
     * // => obiekty dla [['barney', 36], ['barney', 34], ['red', 48], ['barney', 40]]
     */
    funkcja orderBy(kolekcja, iteracje, rozkazy, strażnik) {
      if (kolekcja == null) {
        zwrócić [];
      }
      if (!isArray(iteracje)) {
        iteracje = iteracje == null ? [] : [iteraci];
      }
      rozkaz = strażnik ? niezdefiniowane : zamówienia;
      if (!isArray(orders)) {
        zamówienia = zamówienia == null ? [] : [Zamówienia];
      }
      return baseOrderBy(kolekcja, iteracje, zamówienia);
    }

    /**
     * Tworzy tablicę elementów podzieloną na dwie grupy, z których pierwsza
     * zawiera elementy `predicate` zwraca true dla drugiego z nich
     * zawiera elementy, dla których `predicate` zwraca fałsz. Predykat to
     * wywoływane z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca tablicę zgrupowanych elementów.
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'wiek': 36, 'active': false },
     * { 'użytkownik': 'fred', 'wiek': 40, 'aktywny': prawda },
     * { 'użytkownik': 'kamyki', 'wiek': 1, 'aktywny': fałsz }
     * ];
     *
     * _.partition(użytkownicy, funkcja(o) { return o.active; });
     * // => obiekty dla [['fred'], ['barney', 'pebbles']]
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.partition(users, { 'wiek': 1, 'aktywny': fałsz });
     * // => obiekty dla [['kamyki'], ['barney', 'fred']]
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.partition(użytkownicy, ['aktywny', fałsz]);
     * // => obiekty dla [['barney', 'kamyki'], ['fred']]
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.partition(użytkownicy, 'aktywny');
     * // => obiekty dla [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(reult, value, key) {
      wynik[klucz ? 0 : 1].push(wartość);
    }, function() { return [[], []]; });

    /**
     * Zmniejsza `kolekcję` do wartości, która jest skumulowanym wynikiem działania
     * każdy element w kolekcji `collection` do `iteratee`, gdzie każdy kolejny
     * wywołanie jest dostarczana zwróconą wartością poprzedniego. Jeśli `akumulator`
     * nie jest podane, pierwszy element `collection` jest używany jako inicjał
     * wartość. Iterat jest wywoływany z czterema argumentami:
     * (akumulator, wartość, indeks|klucz, kolekcja).
     *
     * Wiele metod lodash jest chronionych, aby działały jako iteracje dla metod takich jak
     * `_.reduce`, `_.reduceRight` i `_.transform`.
     *
     * Metody strzeżone to:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
     * i `sortuj według`
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @param {*} [akumulator] Wartość początkowa.
     * @returns {*} Zwraca skumulowaną wartość.
     * @zobacz _.reduceRight
     * @przykład
     *
     * _.reduce([1, 2], function(suma, n) {
     * suma zwrotu + n;
     *}, 0);
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(wynik, wartość, klucz) {
     * (wynik[wartość] || (wynik[wartość] = [])).push(klucz);
     * zwróć wynik;
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] } (kolejność iteracji nie jest gwarantowana)
     */
    funkcja zmniejsz(zbiór, iteracja, akumulator) {
      var func = isArray(kolekcja) ? arrayReduce : baseReduce,
          initAccum = argumenty.length < 3;

      return func(collection, getIteratee(iteratee, 4), akumulator, initAccum, baseEach);
    }

    /**
     * Ta metoda jest podobna do `_.reduce` z tą różnicą, że iteruje po elementach
     * `kolekcja` od prawej do lewej.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @param {*} [akumulator] Wartość początkowa.
     * @returns {*} Zwraca skumulowaną wartość.
     * @zobacz _.redukuj
     * @przykład
     *
     * var tablica = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(tablica, funkcja(spłaszczone, inne) {
     * return flattened.concat(inne);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    funkcja ReduceRight(kolekcja, iteracja, akumulator) {
      var func = isArray(kolekcja) ? arrayReduceRight : baseReduce,
          initAccum = argumenty.length < 3;

      return func(collection, getIteratee(iteratee, 4), akumulator, initAccum, baseEachRight);
    }

    /**
     * Przeciwieństwo `_.filter`; ta metoda zwraca elementy `collection`
     * dla którego „predykat” **nie** zwraca prawdę.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca nową przefiltrowaną tablicę.
     * @zobacz _.filtr
     * @przykład
     *
     * var użytkowników = [
     * { 'user': 'barney', 'wiek': 36, 'active': false },
     * { 'użytkownik': 'fred', 'wiek': 40, 'aktywny': prawda }
     * ];
     *
     * _.reject(użytkownicy, funkcja(o) { return !o.active; });
     * // => obiekty dla ['fred']
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.reject(users, { 'wiek': 40, 'aktywny': prawda });
     * // => obiekty dla ['barney']
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.reject(użytkownicy, ['aktywny', fałsz]);
     * // => obiekty dla ['fred']
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.reject(użytkownicy, 'aktywni');
     * // => obiekty dla ['barney']
     */
    funkcja odrzuć(zbieranie, orzeczenie) {
      var func = isArray(kolekcja) ? arrayFilter : baseFilter;
      return func(collection, negate(getIteratee(predicate, 3)));
    }

    /**
     * Pobiera losowy element z kolekcji `collection`.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do pobrania próbki.
     * @returns {*} Zwraca element losowy.
     * @przykład
     *
     * _.próbka([1, 2, 3, 4]);
     * // => 2
     */
    przykład funkcji(kolekcja) {
      var func = isArray(kolekcja) ? arraySample : baseSample;
      return func(kolekcja);
    }

    /**
     * Pobiera `n` losowych elementów przy unikalnych kluczach od `collection` do
     * rozmiar „kolekcji”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do pobrania próbki.
     * @param {liczba} [n=1] Liczba elementów do pobrania.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Array} Zwraca losowe elementy.
     * @przykład
     *
     * _.RozmiarPrzykladu([1, 2, 3], 2);
     * // => [3, 1]
     *
     * _.sampleSize([1, 2, 3], 4);
     * // => [2, 3, 1]
     */
    function sampleSize(collection, n, guard) {
      if ((strażnik ? isIterateeCall(kolekcja, n, strażnik) : n === niezdefiniowany)) {
        n = 1;
      } w przeciwnym razie {
        n = toInteger(n);
      }
      var func = isArray(kolekcja) ? arraySampleSize : baseSampleSize;
      return func(kolekcja, n);
    }

    /**
     * Tworzy tablicę przetasowanych wartości, używając wersji
     * [Przetasowanie Fisher-Yates](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do przetasowania.
     * @returns {Array} Zwraca nową potasowaną tablicę.
     * @przykład
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    funkcja shuffle(kolekcja) {
      var func = isArray(kolekcja) ? arrayShuffle : baseShuffle;
      return func(kolekcja);
    }

    /**
     * Pobiera rozmiar `collection` przez zwrócenie jej długości dla typu tablicowego
     * wartości lub liczba własnych, wyliczalnych właściwości z kluczami dla obiektów.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object|string} Kolekcja do sprawdzenia.
     * @returns {liczba} Zwraca rozmiar kolekcji.
     * @przykład
     *
     * _.rozmiar([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.rozmiar('kamyki');
     * // => 7
     */
    rozmiar funkcji (kolekcja) {
      if (kolekcja == null) {
        zwróć 0;
      }
      if (isArrayLike(kolekcja)) {
        return isString(kolekcja) ? stringSize(kolekcja) : collection.length;
      }
      var tag = getTag(kolekcja);
      if (tag == mapTag || tag == setTag) {
        zwróć kolekcja.rozmiar;
      }
      return baseKeys(kolekcja).length;
    }

    /**
     * Sprawdza, czy `predicate` zwraca prawdę dla **dowolnego** elementu `collection`.
     * Iteracja jest zatrzymywana, gdy „predykat” zwróci prawdę. Predykat to
     * wywoływane z trzema argumentami: (wartość, indeks|klucz, kolekcja).
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {boolean} Zwraca `true` jeśli jakikolwiek element przejdzie kontrolę predykatu,
     * w przeciwnym razie `fałsz`.
     * @przykład
     *
     * _.some([null, 0, 'tak', false], Boolean);
     * // => prawda
     *
     * var użytkowników = [
     * { 'user': 'barney', 'active': true },
     * { 'użytkownik': 'fred', 'aktywny': fałsz }
     * ];
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => fałsz
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.niektóre(użytkownicy, ['aktywny', fałsz]);
     * // => prawda
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.niektóre(użytkownicy, 'aktywni');
     * // => prawda
     */
    funkcja niektóre(zbiór, orzeczenie, strażnik) {
      var func = isArray(kolekcja) ? arraySome : baseSome;
      if (strażnik && isIterateeCall(kolekcja, predykat, strażnik)) {
        predykat = niezdefiniowany;
      }
      return func(kolekcja, getIteratee(predykat, 3));
    }

    /**
     * Tworzy tablicę elementów posortowanych w porządku rosnącym według wyników
     * uruchamianie każdego elementu w kolekcji przez każdą iterację. Ta metoda
     * wykonuje sortowanie stabilne, to znaczy zachowuje pierwotną kolejność sortowania
     * równe elementy. Iteraty są wywoływane z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Kolekcja
     * Kolekcja @param {Array|Object} Kolekcja do iteracji.
     * @param {...(Funkcja|Funkcja[])} [iterates=[_.identity]]
     * Iteracje do sortowania.
     * @returns {Array} Zwraca nową posortowaną tablicę.
     * @przykład
     *
     * var użytkowników = [
     * { 'użytkownik': 'fred', 'wiek': 48 },
     * { 'użytkownik': 'barney', 'wiek': 36 },
     * { 'użytkownik': 'fred', 'wiek': 40 },
     * { 'użytkownik': 'barney', 'wiek': 34 }
     * ];
     *
     * _.sortBy(użytkownicy, [funkcja(o) { return o.user; }]);
     * // => obiekty dla [['barney', 36], ['barney', 34], ['red', 48], ['barney', 40]]
     *
     * _.sortBy(użytkownicy, ['użytkownik', 'wiek']);
     * // => obiekty dla [['barney', 34], ['barney', 36], ['red', 40], ['barney', 48]]
     */
    var sortBy = baseRest(function(collection, iteratees) {
      if (kolekcja == null) {
        zwrócić [];
      }
      var length = iteracje.length;
      if (długość > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
        iteracje = [];
      } else if (długość > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
        iteracje = [iterates[0]];
      }
      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
    });

    /*------------------------------------------------ ------------------------*/

    /**
     * Pobiera znacznik czasu liczby milisekund, które upłynęły od
     * Epoka Uniksa (1 stycznia 1970 00:00:00 UTC).
     *
     * @statyczny
     * @członkiem _
     * @od 2.4.0
     * @data kategorii
     * @returns {liczba} Zwraca znacznik czasu.
     * @przykład
     *
     * _.defer(funkcja(stempel) {
     * console.log(_.now() - stempel);
     * }, _.teraz());
     * // => Rejestruje liczbę milisekund potrzebnych do odroczonego wywołania.
     */
    var teraz = ctxNow || funkcja () {
      return root.Data.now();
    };

    /*------------------------------------------------ ------------------------*/

    /**
     * Przeciwieństwo `_.before`; ta metoda tworzy funkcję, która wywołuje
     * `func` raz nazywa się `n` lub więcej razy.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {liczba} n Liczba wywołań przed wywołaniem `func`.
     * @param {Funkcja} func Funkcja do ograniczenia.
     * @returns {Funkcja} Zwraca nową ograniczoną funkcję.
     * @przykład
     *
     * var saves = ['profil', 'ustawienia'];
     *
     * var done = _.after(saves.length, function() {
     * console.log('zapisywanie gotowe!');
     * });
     *
     * _.forEach(saves, function(type) {
     * asyncSave({ 'typ': typ, 'kompletny': gotowe });
     * });
     * // => Logi 'zakończono zapisywanie!' po zakończeniu dwóch asynchronicznych zapisów.
     */
    funkcja po(n, funkcja) {
      if (typ funkcji != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      funkcja powrotu () {
        jeśli (--n < 1) {
          return func.apply(to, argumenty);
        }
      };
    }

    /**
     * Tworzy funkcję, która wywołuje `func`, z maksymalnie `n` argumentami,
     * ignorowanie dodatkowych argumentów.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja ograniczająca argumenty.
     * @param {liczba} [n=func.length] Limit arności.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Funkcja} Zwraca nową ograniczoną funkcję.
     * @przykład
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    funkcja ary(func, n, strażnik) {
      n = strażnik ? nieokreślone : n;
      n = (funkcja && n == null) ? długość funkcji : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Tworzy funkcję, która wywołuje `func`, z `this` wiązaniem i argumentami
     * utworzonej funkcji, podczas gdy jest wywoływana mniej niż `n` razy. Późniejszy
     * wywołania utworzonej funkcji zwracają wynik ostatniego wywołania `func`.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Funkcja
     * @param {liczba} n Liczba wywołań, przy których funkcja `func` nie jest już wywoływana.
     * @param {Funkcja} func Funkcja do ograniczenia.
     * @returns {Funkcja} Zwraca nową ograniczoną funkcję.
     * @przykład
     *
     * jQuery(element).on('klik', _.before(5, addContactToList));
     * // => Umożliwia dodanie do 4 kontaktów do listy.
     */
    funkcja przed(n, funkcja) {
      var wynik;
      if (typ funkcji != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      funkcja powrotu () {
        jeśli (--n > 0) {
          wynik = func.apply(to, argumenty);
        }
        jeśli (n <= 1) {
          func = niezdefiniowane;
        }
        zwróć wynik;
      };
    }

    /**
     * Tworzy funkcję, która wywołuje `func` z `this` wiązaniem `thisArg`
     * i `częściowe` przed otrzymanymi argumentami.
     *
     * Wartość `_.bind.placeholder`, która w kompilacjach monolitycznych jest domyślnie ustawiona na `_`,
     * może być używany jako symbol zastępczy dla częściowo zastosowanych argumentów.
     *
     * **Uwaga:** W przeciwieństwie do natywnego `Function#bind`, ta metoda nie ustawia „długości”
     * własność funkcji powiązanych.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do powiązania.
     * @param {*} thisArg `to` powiązanie `func`.
     * @param {...*} [częściowe] Argumenty do częściowego zastosowania.
     * @returns {Funkcja} Zwraca nową funkcję związaną.
     * @przykład
     *
     * funkcja pozdrawiam(powitanie, interpunkcja) {
     * return powitanie + ' ' + this.user + interpunkcja;
     * }
     *
     * var object = { 'użytkownik': 'fred' };
     *
     * var bound = _.bind(pozdrawiam, obiekt, 'cześć');
     * zobowiązany('!');
     * // => 'Cześć Fred!'
     *
     * // Powiązane z symbolami zastępczymi.
     * var bound = _.bind(pozdrawiam, obiekt, _, '!');
     * bound('cześć');
     * // => 'Cześć Fred!'
     */
    var bind = baseRest(function(func, thisArg, parts) {
      var maska ​​bitowa = WRAP_BIND_FLAG;
      if (części.długość) {
        var holders = replaceHolders(części, getHolder(bind));
        maska ​​bitowa |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(func, bitmask, thisArg, częściowe, posiadacze);
    });

    /**
     * Tworzy funkcję, która wywołuje metodę w `object[key]` z `częściami`
     * przed otrzymanymi argumentami.
     *
     * Ta metoda różni się od `_.bind` tym, że pozwala powiązanym funkcjom na odwoływanie się
     * metody, które mogą zostać przedefiniowane lub jeszcze nie istnieją. Widzieć
     * [Artykuł Petera Michaux](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * po więcej szczegółów.
     *
     * Wartość `_.bindKey.placeholder`, która w monolicie jest domyślnie ustawiona na `_`
     * kompilacje, mogą być używane jako symbol zastępczy dla częściowo zastosowanych argumentów.
     *
     * @statyczny
     * @członkiem _
     * @od 0.10.0
     * @kategoria Funkcja
     * @param {Object} obiekt Obiekt, na którym ma zostać wywołana metoda.
     * @param {string} klucz Klucz metody.
     * @param {...*} [częściowe] Argumenty do częściowego zastosowania.
     * @returns {Funkcja} Zwraca nową funkcję związaną.
     * @przykład
     *
     * var obiekt = {
     * 'użytkownik': 'red',
     * 'pozdrawiam': function(powitanie, interpunkcja) {
     * return powitanie + ' ' + this.user + interpunkcja;
     * }
     * };
     *
     * var bound = _.bindKey(obiekt, 'pozdrawiam', 'cześć');
     * zobowiązany('!');
     * // => 'Cześć Fred!'
     *
     * obiekt.greet = function(powitanie, interpunkcja) {
     * return powitanie + 'ya' + this.user + interpunkcja;
     * };
     *
     * zobowiązany('!');
     * // => 'hiya Fred!'
     *
     * // Powiązane z symbolami zastępczymi.
     * var bound = _.bindKey(obiekt, 'pozdrawiam', _, '!');
     * bound('cześć');
     * // => 'hiya Fred!'
     */
    var bindKey = baseRest(function(obiekt, klucz, części) {
      var maska ​​bitowa = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
      if (części.długość) {
        var holders = replaceHolders(części, getHolder(bindKey));
        maska ​​bitowa |= WRAP_PARTIAL_FLAG;
      }
      return createWrap(klucz, maska ​​bitowa, obiekt, części, posiadacze);
    });

    /**
     * Tworzy funkcję, która przyjmuje argumenty funkcji `func` i albo wywołuje
     * `func` zwraca wynik, jeśli ma co najmniej `arity` liczbę argumentów
     * podano lub zwraca funkcję, która akceptuje pozostałe `func`
     * argumenty i tak dalej. Aryność `func` można określić, jeśli `func.length`
     * nie jest wystarczający.
     *
     * Wartość `_.curry.placeholder`, która w kompilacjach monolitycznych jest domyślnie ustawiona na `_`,
     * może być używany jako symbol zastępczy dla podanych argumentów.
     *
     * **Uwaga:** Ta metoda nie ustawia właściwości „długość” funkcji curried.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja curry.
     * @param {liczba} [arity=func.length] Arity of `func`.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Funkcja} Zwraca nową funkcję curried.
     * @przykład
     *
     * var abc = funkcja(a, b, c) {
     * powrót [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curry(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curry (1, 2)(3);
     * // => [1, 2, 3]
     *
     * curry (1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried z symbolami zastępczymi.
     * curry(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    funkcja curry(func, arity, guard) {
      arity = strażnik ? nieokreślone: ​​arność;
      var wynik = createWrap(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      wynik.placeholder = curry.placeholder;
      zwróć wynik;
    }

    /**
     * Ta metoda jest podobna do `_.curry` z wyjątkiem tego, że argumenty są stosowane do `func`
     * w sposób `_.partialRight` zamiast `_.partial`.
     *
     * Wartość `_.curryRight.placeholder`, która w monolicie jest domyślnie ustawiona na `_`
     * kompilacje, mogą być używane jako symbol zastępczy dla podanych argumentów.
     *
     * **Uwaga:** Ta metoda nie ustawia właściwości „długość” funkcji curried.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja curry.
     * @param {liczba} [arity=func.length] Arity of `func`.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Funkcja} Zwraca nową funkcję curried.
     * @przykład
     *
     * var abc = funkcja(a, b, c) {
     * powrót [a, b, c];
     * };
     *
     * var curried = _.curryPrawo(abc);
     *
     * curry(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curry(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curry (1, 2, 3);
     * // => [1, 2, 3]
     *
     * // Curried z symbolami zastępczymi.
     * curry(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    function curryRight(func, arity, guard) {
      arity = strażnik ? nieokreślone: ​​arność;
      var wynik = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
      wynik.placeholder = curryRight.placeholder;
      zwróć wynik;
    }

    /**
     * Tworzy odbitą funkcję, która opóźnia wywołanie `func` do czasu `wait`
     * Minęły milisekundy od ostatniego odrzucenia funkcji
     * powołany. Odrzucona funkcja jest dostarczana z metodą `cancel` do anulowania
     * opóźnione wywołania `func` i metoda `flush` do ich natychmiastowego wywołania.
     * Podaj `opcje`, aby wskazać, czy `func` ma być wywoływane na
     * krawędź wiodąca i/lub końcowa limitu czasu oczekiwania. Wywoływana jest funkcja `func`
     * z ostatnimi argumentami dostarczonymi do odbitej funkcji. Późniejszy
     * wywołania funkcji odbitej zwracają wynik ostatniej funkcji `func`
     * inwokacja.
     *
     * **Uwaga:** jeśli opcje „wiodąca” i „końcowa” są „prawdą”, „func” jest
     * wywoływane na końcowej krawędzi limitu czasu tylko wtedy, gdy funkcja debounced
     * jest wywoływana więcej niż raz podczas limitu czasu oczekiwania.
     *
     * Jeśli `wait` to `0`, a `leading` to `false`, wywołanie `func` jest odroczone
     * do następnego tiku, podobnie jak w przypadku „setTimeout” z limitem czasu równym „0”.
     *
     * Zobacz [artykuł Davida Corbacho](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * szczegółowe informacje na temat różnic między `_.debounce` a `_.throttle`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja debounce.
     * @param {liczba} [czekaj=0] Liczba milisekund opóźnienia.
     * @param {Obiekt} [opcje={}] Obiekt opcji.
     * @param {boolean} [options.leading=false]
     * Określ wywoływanie na wiodącej krawędzi limitu czasu.
     * @param {numer} [opcje.maxWait]
     * Maksymalny czas, jaki może opóźnić funkcja `func` przed jej wywołaniem.
     * @param {boolean} [options.trailing=true]
     * Określ wywoływanie na końcowej krawędzi limitu czasu.
     * @returns {Funkcja} Zwraca nową odbitą funkcję.
     * @przykład
     *
     * // Unikaj kosztownych obliczeń, gdy rozmiar okna się zmienia.
     * jQuery(okno).on('zmień rozmiar', _.debounce(calculateLayout, 150));
     *
     * // Wywołaj `sendMail` po kliknięciu, odrzucając kolejne połączenia.
     * jQuery(element).on('klik', _.debounce(sendMail, 300, {
     * „wiodący”: prawda,
     * 'końcowe': fałszywe
     * }));
     *
     * // Upewnij się, że `batchLog` jest wywoływany raz po 1 sekundzie odbitych wywołań.
     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
     * var source = new EventSource('/stream');
     * jQuery(źródło).on('wiadomość', odrzucona);
     *
     * // Anuluj końcowe odbite wywołanie.
     * jQuery(okno).on('popstate', debounced.cancel);
     */
    funkcja debounce(func, czekaj, opcje) {
      var lastArgs,
          ostatniTo,
          max czekaj,
          wynik,
          identyfikator timera,
          czas ostatniego połączenia,
          lastInvokeTime = 0,
          wiodące = fałszywe,
          maxing = fałsz,
          końcowe = prawda;

      if (typ funkcji != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      czekaj = numer(czekaj) || 0;
      if (isObject(opcje)) {
        wiodący = !!opcje.wiodący;
        maxing = 'maxWait' w opcjach;
        maxWait = maks. ? nativeMax(toNumber(options.maxWait) || 0, czekaj) : maxWait;
        trailing = 'trailing' w opcjach ? !!options.trailing : końcowe;
      }

      function invokeFunc(czas) {
        var args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = niezdefiniowane;
        lastInvokeTime = czas;
        wynik = func.apply(thisArg, args);
        zwróć wynik;
      }

      funkcja krawędź wiodąca (czas) {
        // Zresetuj dowolny timer `maxWait`.
        lastInvokeTime = czas;
        // Uruchom licznik czasu dla krawędzi spływu.
        timerId = setTimeout(timerExpired, czekaj);
        // Wywołaj krawędź wiodącą.
        powrót wiodący ? invokeFunc(czas) : wynik;
      }

      funkcja pozostała Czekaj (czas) {
        var czasSinceLastCall = czas - lastCallTime,
            timeSinceLastInvoke = czas - lastInvokeTime,
            timeWaiting = czekaj - timeSinceLastCall;

        zwrot maksymalizacji
          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
          : czas Oczekiwanie;
      }

      funkcja powinna Invoke(czas) {
        var czasSinceLastCall = czas - lastCallTime,
            timeSinceLastInvoke = czas - lastInvokeTime;

        // Albo to pierwsza rozmowa, aktywność ustała i jesteśmy na
        // krawędź opadająca, czas systemowy się cofnął i leczymy
        // to jako krawędź końcowa, albo przekroczyliśmy limit `maxWait`.
        return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
          (czas od ostatniego połączenia < 0) || (maxing && timeSinceLastInvoke >= maxWait));
      }

      funkcja licznika wygasła() {
        var czas = teraz();
        if (powinienInvoke(czas)) {
          zwróć końcową krawędź (czas);
        }
        // Zrestartuj stoper.
        timerId = setTimeout(timerWygasł, pozostałyWait(czas));
      }

      funkcja końcowa krawędź (czas) {
        timerId = niezdefiniowany;

        // Wywołaj tylko, jeśli mamy `lastArgs`, co oznacza, że ​​`func` było
        // odbił się przynajmniej raz.
        if (końcowe && lastArgs) {
          zwróć invokeFunc(czas);
        }
        lastArgs = lastThis = niezdefiniowane;
        zwróć wynik;
      }

      funkcja anuluj () {
        if (timerId !== niezdefiniowany) {
          clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = niezdefiniowane;
      }

      funkcja flush() {
        return timerId === niezdefiniowany ? wynik : trailingEdge(now());
      }

      funkcja odbita () {
        var czas = now(),
            isInvoking = powinnoInvoke(czas);

        lastArgs = argumenty;
        lastThis = to;
        lastCallTime = czas;

        jeśli (wywołuje) {
          if (timerId === niezdefiniowany) {
            zwróć krawędź wiodącą(czas ostatniego połączenia);
          }
          jeśli (maksymalnie) {
            // Obsługa wywołań w ciasnej pętli.
            clearTimeout(timerId);
            timerId = setTimeout(timerExpired, czekaj);
            zwróć invokeFunc(czas ostatniego połączenia);
          }
        }
        if (timerId === niezdefiniowany) {
          timerId = setTimeout(timerExpired, czekaj);
        }
        zwróć wynik;
      }
      debounced.cancel = anuluj;
      odbity.flush = kolor;
      powrót odbity;
    }

    /**
     * Odracza wywoływanie funkcji `func` do czasu wyczyszczenia bieżącego stosu wywołań. Każdy
     * dodatkowe argumenty są dostarczane do funkcji `func` podczas jej wywoływania.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja odroczenia.
     * @param {...*} [argumenty] Argumenty do wywołania funkcji `func`.
     * @returns {liczba} Zwraca identyfikator timera.
     * @przykład
     *
     * _.defer(funkcja(tekst) {
     * console.log(tekst);
     * }, 'odroczony');
     * // => Logi 'odroczone' po jednej milisekundzie.
     */
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Wywołuje `func` po `wait` milisekundach. Wszelkie dodatkowe argumenty to
     * dostarczane do `func`, gdy jest wywoływane.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja opóźniająca.
     * @param {liczba} wait Liczba milisekund opóźnienia wywołania.
     * @param {...*} [argumenty] Argumenty do wywołania funkcji `func`.
     * @returns {liczba} Zwraca identyfikator timera.
     * @przykład
     *
     * _.delay(funkcja(tekst) {
     * console.log(tekst);
     * }, 1000, 'później');
     * // => Logi „później” po jednej sekundzie.
     */
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) ||0, args);
    });

    /**
     * Tworzy funkcję, która wywołuje `func` z odwróconymi argumentami.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do odwrócenia argumentów.
     * @returns {Funkcja} Zwraca nową odwróconą funkcję.
     * @przykład
     *
     * var odwrócone = _.flip(funkcja() {
     * return _.toArray(argumenty);
     * });
     *
     * odwrócone('a', 'b', 'c', 'd');
     * // => ['d', 'c', 'b', 'a']
     */
    funkcja flip(funkcja) {
      return createWrap(func, WRAP_FLIP_FLAG);
    }

    /**
     * Tworzy funkcję, która zapamiętuje wynik `func`. Jeśli `resolver` to
     * pod warunkiem, określa klucz pamięci podręcznej do przechowywania wyniku na podstawie
     * argumenty dostarczone do zapamiętanej funkcji. Domyślnie pierwszy argument
     * dostarczona do zapamiętanej funkcji jest używana jako klucz pamięci podręcznej mapy. „Funkcja”
     * jest wywoływana z `this` wiązaniem zapamiętanej funkcji.
     *
     * **Uwaga:** Pamięć podręczna jest widoczna jako właściwość `cache` na zapamiętanym
     * funkcja. Jego tworzenie można dostosować, zastępując `_.memoize.Cache`
     * konstruktor z takim, którego instancje implementują
     * [`Mapa`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
     * interfejs metod `clear`, `delete`, `get`, `has` i `set`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do zapamiętania wyjścia.
     * @param {Funkcja} [rozpoznawanie] Funkcja rozwiązywania klucza pamięci podręcznej.
     * @returns {Funkcja} Zwraca nową zapamiętaną funkcję.
     * @przykład
     *
     * var obiekt = { 'a': 1, 'b': 2 };
     * var inne = { 'c': 3, 'd': 4 };
     *
     * wartości var = _.memoize(_.wartości);
     * wartości(obiekt);
     * // => [1, 2]
     *
     * wartości (inne);
     * // => [3, 4]
     *
     * obiekt.a = 2;
     * wartości(obiekt);
     * // => [1, 2]
     *
     * // Zmodyfikuj pamięć podręczną wyników.
     * wartości.cache.set(obiekt, ['a', 'b']);
     * wartości(obiekt);
     * // => ['a', 'b']
     *
     * // Zastąp `_.memoize.Cache`.
     * _.memoize.Cache = Słaba mapa;
     */
    function memoize(func, resolver) {
      if (typeof func != 'funkcja' || (resolver != null && typeof resolver != 'funkcja')) {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      var zapamiętane = funkcja() {
        var argumenty = argumenty,
            klucz = przelicznik ? resolver.apply(this, args) : args[0],
            pamięć podręczna = memoized.cache;

        if (cache.ma(klucz)) {
          zwróć cache.get(klucz);
        }
        var wynik = func.apply(this, args);
        memoized.cache = cache.set(klucz, wynik) || Pamięć podręczna;
        zwróć wynik;
      };
      memoized.cache = new (memoize.Cache || MapCache);
      powrót zapamiętany;
    }

    // Ekspozycja `MapCache`.
    memoize.Cache = Pamięć podręczna mapy;

    /**
     * Tworzy funkcję, która neguje wynik predykatu `func`. ten
     * predykat `func` jest wywoływany z wiązaniem `this` i argumentami
     * utworzona funkcja.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Funkcja
     * Predykat @param {Funkcja} Predykat do zanegowania.
     * @returns {Funkcja} Zwraca nową zanegowaną funkcję.
     * @przykład
     *
     * funkcja jest parzysta(n) {
     * zwróć n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(parzyste));
     * // => [1, 3, 5]
     */
    funkcja negacji(predykat) {
      if (typ predykatu != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      funkcja powrotu () {
        var argumenty = argumenty;
        przełącznik (args.length) {
          przypadek 0: zwróć !predicate.call(this);
          przypadek 1: return !predicate.call(this, args[0]);
          przypadek 2: return !predicate.call(this, args[0], args[1]);
          przypadek 3: return !predicate.call(this, args[0], args[1], args[2]);
        }
        return !predicate.apply(this, args);
      };
    }

    /**
     * Tworzy funkcję, która jest ograniczona do jednorazowego wywołania `func`. Powtarzaj połączenia
     * do funkcji zwraca wartość pierwszego wywołania. `funkcja` to
     * wywoływane z wiązaniem `this` i argumentami utworzonej funkcji.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do ograniczenia.
     * @returns {Funkcja} Zwraca nową ograniczoną funkcję.
     * @przykład
     *
     * var Initialize = _.once(createApplication);
     * zainicjuj();
     * zainicjuj();
     * // => `createApplication` jest wywoływane raz
     */
    funkcja raz (funkcja) {
      powrót przed(2, funkcja);
    }

    /**
     * Tworzy funkcję, która wywołuje `func` z przekształconymi argumentami.
     *
     * @statyczny
     * @od 4.0.0
     * @członkiem _
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do zawijania.
     * @param {...(Funkcja|Funkcja[])} [transforms=[_.identity]]
     * Argument ulega transformacji.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * funkcja podwojona (n) {
     * powrót n * 2;
     * }
     *
     * kwadrat funkcji (n) {
     * powrót n * n;
     * }
     *
     * var func = _.overArgs(function(x,y) {
     * powrót [x, y];
     * }, [kwadrat, podwojony]);
     *
     * funkcja(9, 3);
     * // => [81, 6]
     *
     * func(10, 5);
     * // => [100, 10]
     */
    var overArgs = castRest(function(func, transforms) {
      transforms = (transforms.length == 1 && isArray(transforms[0]))
        ? arrayMap(transforms[0], baseUnary(getIteratee()))
        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

      var funcsLength = transforms.length;
      return baseRest(function(args) {
        indeks zm = -1,
            length = nativeMin(args.length, funcsLength);

        while (++indeks < długość) {
          args[indeks] = transforms[indeks].call(this, args[indeks]);
        }
        return zastosuj(func, this, args);
      });
    });

    /**
     * Tworzy funkcję, która wywołuje `func` z `częściami` poprzedzonymi
     * argumenty, które otrzymuje. Ta metoda jest podobna do `_.bind` z tym wyjątkiem, że **nie**
     * zmień wiązanie `to`.
     *
     * Wartość `_.partial.placeholder`, która w monolicie jest domyślnie ustawiona na `_`
     * kompilacje, mogą być używane jako symbol zastępczy dla częściowo zastosowanych argumentów.
     *
     * **Uwaga:** Ta metoda nie ustawia właściwości "length" częściowego
     * stosowane funkcje.
     *
     * @statyczny
     * @członkiem _
     * @od 0.2.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do częściowego zastosowania argumentów.
     * @param {...*} [częściowe] Argumenty do częściowego zastosowania.
     * @returns {Funkcja} Zwraca nową, częściowo zastosowaną funkcję.
     * @przykład
     *
     * funkcja pozdrawiam(pozdrowienia, imię) {
     * powrót powitanie + ' ' + imię;
     * }
     *
     * var sayHelloTo = _.partial(pozdrawiam, 'cześć');
     * powiedzHelloTo('Fred');
     * // => 'witaj Fred'
     *
     * // Częściowo zastosowane z symbolami zastępczymi.
     * var powitajFred = _.partial(pozdrawiam, _, 'fred');
     * pozdrówFred('cześć');
     * // => 'cześć Fred'
     */
    var częściowa = baseRest(funkcja(funkcja, częściowe) {
      var holders = replaceHolders(częściowe, getHolder(częściowe));
      return createWrap(func, WRAP_PARTIAL_FLAG, niezdefiniowane, częściowe, posiadacze);
    });

    /**
     * Ta metoda jest podobna do `_.partial` z wyjątkiem częściowo zastosowanych argumentów
     * są dołączane do otrzymanych argumentów.
     *
     * Wartość `_.partialRight.placeholder`, która w monolicie jest domyślnie ustawiona na `_`
     * kompilacje, mogą być używane jako symbol zastępczy dla częściowo zastosowanych argumentów.
     *
     * **Uwaga:** Ta metoda nie ustawia właściwości "length" częściowego
     * stosowane funkcje.
     *
     * @statyczny
     * @członkiem _
     * @od 1.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do częściowego zastosowania argumentów.
     * @param {...*} [częściowe] Argumenty do częściowego zastosowania.
     * @returns {Funkcja} Zwraca nową, częściowo zastosowaną funkcję.
     * @przykład
     *
     * funkcja pozdrawiam(pozdrowienia, imię) {
     * powrót powitanie + ' ' + imię;
     * }
     *
     * var powitajFred = _.partialRight(pozdrawiam, 'fred');
     * pozdrówFred('cześć');
     * // => 'cześć Fred'
     *
     * // Częściowo zastosowane z symbolami zastępczymi.
     * var sayHelloTo = _.partialRight(pozdrawiam, 'cześć', _);
     * powiedzHelloTo('Fred');
     * // => 'witaj Fred'
     */
    var PartRight = baseRest(function(func, Partials) {
      var holders = replaceHolders(częściowe, getHolder(partialRight));
      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, niezdefiniowane, częściowe, posiadacze);
    });

    /**
     * Tworzy funkcję, która wywołuje `func` z argumentami ułożonymi według
     * do określonych `indeksów`, gdzie wartość argumentu przy pierwszym indeksie to
     * podany jako pierwszy argument, wartość argumentu przy drugim indeksie to
     * podane jako drugi argument i tak dalej.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do przestawiania argumentów.
     * @param {...(liczba|liczba[])} indeksy Indeksy uporządkowanych argumentów.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * var przesunięty = _.rearg(funkcja(a, b, c) {
     * powrót [a, b, c];
     * }, [2, 0, 1]);
     *
     * przesunięty('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     */
    var rearg = flatRest(funkcja(funkcja, indeksy) {
      return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
    });

    /**
     * Tworzy funkcję, która wywołuje `func` z `this` wiązaniem
     * utworzona funkcja i argumenty od `start` i dalej dostarczane jako
     * tablica.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [parametr odpoczynku](https://mdn.io/rest_parameters).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do zastosowania parametru rest.
     * @param {liczba} [start=func.length-1] Pozycja początkowa parametru rest.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * var say = _.rest(function(co, names) {
     * zwraca co + ' ' + _.initial(names).join(', ') +
     * (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * powiedz('cześć', 'fred', 'barney', 'kamyki');
     * // => 'witaj Fred, Barney i kamyki'
     */
    funkcja reszta(func, start) {
      if (typ funkcji != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      start = start === niezdefiniowany ? start : toInteger(start);
      return baseRest(funkcja, start);
    }

    /**
     * Tworzy funkcję, która wywołuje `func` z `this` wiązaniem
     * tworzenie funkcji i tablicy argumentów podobnie jak
     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
     *
     * **Uwaga:** Ta metoda opiera się na
     * [operator spreadu](https://mdn.io/spread_operator).
     *
     * @statyczny
     * @członkiem _
     * @od 3.2.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja do rozłożenia argumentów.
     * @param {liczba} [start=0] Pozycja początkowa spreadu.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * var say = _.spread(function(kto,co) {
     * zwraca kto + ' mówi ' + co;
     * });
     *
     * powiedz(['Fred', 'Cześć']);
     * // => 'Fred mówi cześć'
     *
     * var numery = Promise.all([
     * Obietnica.rozwiązanie(40),
     * Obietnica.rozwiązanie(36)
     * ]);
     *
     * number.then(_.spread(function(x,y) {
     * zwrot x + y;
     * }));
     * // => Obietnica 76
     */
    funkcja spread(func, start) {
      if (typ funkcji != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      początek = początek == null ? 0 : nativeMax(toInteger(start), 0);
      return baseRest(function(args) {
        var tablica = args[start],
            otherArgs = castSlice(args, 0, start);

        jeśli (tablica) {
          arrayPush(inneArgi, tablica);
        }
        return zastosuj(func, this, otherArgs);
      });
    }

    /**
     * Tworzy funkcję dławienia, która wywołuje funkcję `func` co najwyżej raz na
     * każde „czekanie” milisekundy. Funkcja dławienia jest dostarczana z `anuluj`
     * metoda anulowania opóźnionych wywołań `func` i metoda `flush` do
     * natychmiast je wywołaj. Podaj `opcje`, aby wskazać, czy `func`
     * należy wywoływać na przedniej i/lub końcowej krawędzi `wait`
     * koniec czasu. Funkcja `func` jest wywoływana z ostatnimi argumentami dostarczonymi do
     * funkcja dławienia. Kolejne wywołania funkcji dławionej zwracają
     * wynik ostatniego wywołania funkcji `func`.
     *
     * **Uwaga:** jeśli opcje „wiodąca” i „końcowa” są „prawdą”, „func” jest
     * wywoływane na krawędzi opadania limitu czasu tylko wtedy, gdy funkcja throttled
     * jest wywoływana więcej niż raz podczas limitu czasu oczekiwania.
     *
     * Jeśli `wait` to `0`, a `leading` to `false`, wywołanie `func` jest odroczone
     * do następnego tiku, podobnie jak w przypadku „setTimeout” z limitem czasu równym „0”.
     *
     * Zobacz [artykuł Davida Corbacho](https://css-tricks.com/debouncing-throttling-explained-examples/)
     * szczegółowe informacje na temat różnic między `_.throttle` a `_.debounce`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja dławienia.
     * @param {liczba} [czekaj=0] Liczba milisekund do ograniczenia wywołań.
     * @param {Obiekt} [opcje={}] Obiekt opcji.
     * @param {wartość logiczna} [options.leading=true]
     * Określ wywoływanie na wiodącej krawędzi limitu czasu.
     * @param {boolean} [options.trailing=true]
     * Określ wywoływanie na końcowej krawędzi limitu czasu.
     * @returns {Funkcja} Zwraca nową funkcję dławienia.
     * @przykład
     *
     * // Unikaj nadmiernej aktualizacji pozycji podczas przewijania.
     * jQuery(okno).on('scroll', _.throttle(updatePosition, 100));
     *
     * // Wywołaj `renewToken` po wywołaniu zdarzenia kliknięcia, ale nie częściej niż raz na 5 minut.
     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
     * jQuery(element).on('klik', dławiony);
     *
     * // Anuluj końcowe dławione wywołanie.
     * jQuery(window).on('popstate', throttled.cancel);
     */
    funkcja przepustnicy (funkcja, czekanie, opcje) {
      zmienna wiodąca = prawda,
          końcowe = prawda;

      if (typ funkcji != 'funkcja') {
        wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
      }
      if (isObject(opcje)) {
        lead = 'leading' w opcjach ? !!opcje.leading : wiodące;
        trailing = 'trailing' w opcjach ? !!options.trailing : końcowe;
      }
      return debounce (funkcja, czekaj, {
        „prowadzenie”: prowadzenie,
        'maxWait': czekaj,
        „końcowe”: końcowe
      });
    }

    /**
     * Tworzy funkcję, która akceptuje maksymalnie jeden argument, ignorując dowolny
     * dodatkowe argumenty.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Funkcja
     * @param {Funkcja} func Funkcja ograniczająca argumenty.
     * @returns {Funkcja} Zwraca nową ograniczoną funkcję.
     * @przykład
     *
     * _.map(['6', '8', '10'], _.unary(parseInt));
     * // => [6, 8, 10]
     */
    funkcja jednoargumentowa(funkcja) {
      return ary(func, 1);
    }

    /**
     * Tworzy funkcję, która jako pierwsza dostarcza `wartość` do `opakowania`
     * argument. Wszelkie dodatkowe argumenty dostarczone do funkcji są dołączane
     * do dostarczonych do `opakowania`. Opakowanie jest wywoływane z `this`
     * powiązanie utworzonej funkcji.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Funkcja
     * @param {*} wartość Wartość do zawijania.
     * @param {Funkcja} [wrapper=tożsamość] Funkcja opakowująca.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * var p = _.wrap(_.escape, function(func, text) {
     * return '<p>' + func(text) + '</p>';
     * });
     *
     * p('Fred, Barney i Kamyczki');
     * // => '<p>Fred, Barney, & kamyki</p>”
     */
    funkcja wrap(wartość, opakowanie) {
      return częściowy(castFunction(opakowanie), wartość);
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Rzuca `wartość` jako tablicę, jeśli nie jest jedną z nich.
     *
     * @statyczny
     * @członkiem _
     * @od 4.4.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {Array} Zwraca tablicę rzutowania.
     * @przykład
     *
     * _.castArray(1);
     * // => [1]
     *
     * _.castArray({ 'a': 1 });
     * // => [{ 'a': 1 }]
     *
     * _.castArray('abc');
     * // => ['abc']
     *
     * _.castArray(null);
     * // => [null]
     *
     * _.castArray(niezdefiniowane);
     * // => [nieokreślony]
     *
     * _.castArray();
     * // => []
     *
     * var tablica = [1, 2, 3];
     * console.log(_.castArray(array) === tablica);
     * // => prawda
     */
    funkcja castArray() {
      if (!arguments.length) {
        zwrócić [];
      }
      wartość zmiennej = argumenty[0];
      return isArray(wartość) ? wartość : [wartość];
    }

    /**
     * Tworzy płytki klon „wartości”.
     *
     * **Uwaga:** Ta metoda jest luźno oparta na
     * [strukturalny algorytm klonowania](https://mdn.io/Structured_clone_algorithm)
     * i obsługuje klonowanie tablic, buforów tablic, wartości logicznych, obiektów daty, map,
     * liczby, obiekty `Object`, wyrażenia regularne, zestawy, łańcuchy, symbole i wpisane
     * tablice. Własne, przeliczalne właściwości obiektów „argumentów” są klonowane
     * jako zwykłe obiekty. Pusty obiekt jest zwracany dla wartości niemożliwych do sklonowania, takich jak
     * jako obiekty błędów, funkcje, węzły DOM i WeakMaps.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sklonowania.
     * @returns {*} Zwraca sklonowaną wartość.
     * @zobacz _.cloneDeep
     * @przykład
     *
     * var obiekty = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var płytkie = _.clone(obiekty);
     * console.log(shallow[0] === objects[0]);
     * // => prawda
     */
    klon funkcji (wartość) {
      zwróć baseClone(wartość, CLONE_SYMBOLS_FLAG);
    }

    /**
     * Ta metoda jest podobna do `_.clone` z wyjątkiem tego, że akceptuje `customizer` który
     * jest wywoływana w celu wytworzenia sklonowanej wartości. Jeśli `customizer` zwraca `undefined`,
     * zamiast tego klonowanie jest obsługiwane przez metodę. `customizer` jest wywoływany za pomocą
     * do czterech argumentów; (wartość [, indeks|klucz, obiekt, stos]).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sklonowania.
     * @param {Funkcja} [customizer] Funkcja dostosowywania klonowania.
     * @returns {*} Zwraca sklonowaną wartość.
     * @zobacz _.cloneDeepWith
     * @przykład
     *
     * funkcja dostosowania (wartość) {
     * if (_.isElement(wartość)) {
     * zwraca wartość.cloneNode(false);
     * }
     * }
     *
     * var el = _.cloneWith(document.body, Customizer);
     *
     * console.log(el === document.body);
     * // => fałsz
     * console.log(el.nodeName);
     * // => 'CIAŁO'
     * console.log(el.childNodes.length);
     * // => 0
     */
    function cloneWith(wartość, dostosowanie) {
      Customizer = typ dostosowania == 'funkcja' ? konfigurator : niezdefiniowany;
      return baseClone (wartość, CLONE_SYMBOLS_FLAG, konfigurator);
    }

    /**
     * Ta metoda jest podobna do `_.clone` z tą różnicą, że rekurencyjnie klonuje `wartość`.
     *
     * @statyczny
     * @członkiem _
     * @od 1.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do rekursywnego klonowania.
     * @returns {*} Zwraca głęboko sklonowaną wartość.
     * @zobacz _.clone
     * @przykład
     *
     * var obiekty = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(obiekty);
     * console.log(deep[0] === objects[0]);
     * // => fałsz
     */
    funkcja cloneDeep(wartość) {
      zwróć baseClone (wartość, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
    }

    /**
     * Ta metoda jest podobna do `_.cloneWith` z tą różnicą, że rekurencyjnie klonuje `wartość`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do rekursywnego klonowania.
     * @param {Funkcja} [customizer] Funkcja dostosowywania klonowania.
     * @returns {*} Zwraca głęboko sklonowaną wartość.
     * @zobacz _.cloneWith
     * @przykład
     *
     * funkcja dostosowania (wartość) {
     * if (_.isElement(wartość)) {
     * zwraca wartość.cloneNode(prawda);
     * }
     * }
     *
     * var el = _.cloneDeepWith(document.body, Customizer);
     *
     * console.log(el === document.body);
     * // => fałsz
     * console.log(el.nodeName);
     * // => 'CIAŁO'
     * console.log(el.childNodes.length);
     * // => 20
     */
    function cloneDeepWith(wartość, dostosowanie) {
      Customizer = typ dostosowania == 'funkcja' ? konfigurator : niezdefiniowany;
      return baseClone (wartość, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, konfigurator);
    }

    /**
     * Sprawdza, czy `object` jest zgodny z `source` przez wywołanie predykatu
     * właściwości `source` z odpowiednimi wartościami właściwości `object`.
     *
     * **Uwaga:** Ta metoda jest równoważna z `_.conforms`, gdy `źródłem` jest
     * częściowo zastosowane.
     *
     * @statyczny
     * @członkiem _
     * @od 4.14.0
     * @kategoria Lang
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Object} źródło Obiekt właściwości predykatów ma być zgodny.
     * @returns {boolean} Zwraca `true` jeśli `object` jest zgodny, w przeciwnym razie `false`.
     * @przykład
     *
     * var obiekt = { 'a': 1, 'b': 2 };
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
     * // => prawda
     *
     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
     * // => fałsz
     */
    funkcja zgodna z (obiekt, źródło) {
      źródło zwrotu == null || baseConformsTo(obiekt, źródło, klucze(źródło));
    }

    /**
     * Wykonuje
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * porównanie dwóch wartości w celu ustalenia, czy są one równoważne.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca `true`, jeśli wartości są równoważne, w przeciwnym razie `false`.
     * @przykład
     *
     * var obiekt = { 'a': 1 };
     * var inne = { 'a': 1 };
     *
     * _.eq(obiekt, obiekt);
     * // => prawda
     *
     * _.eq(obiekt, inne);
     * // => fałsz
     *
     * _.eq('a', 'a');
     * // => prawda
     *
     * _.eq('a', Obiekt('a'));
     * // => fałsz
     *
     * _.eq(NaN, NaN);
     * // => prawda
     */
    równanie funkcji (wartość, inne) {
      zwracana wartość === inne || (wartość !== wartość && inne !== inne);
    }

    /**
     * Sprawdza, czy „wartość” jest większa niż „inne”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.9.0
     * @kategoria Lang
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest większa niż „inne”,
     * w przeciwnym razie `fałsz`.
     * @patrz _.lt
     * @przykład
     *
     * _.gt(3, 1);
     * // => prawda
     *
     * _.gt(3, 3);
     * // => fałsz
     *
     * _.gt(1, 3);
     * // => fałsz
     */
    var gt = utwórzRelationalOperation(baseGt);

    /**
     * Sprawdza, czy „wartość” jest większa lub równa „inne”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.9.0
     * @kategoria Lang
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest większa lub równa
     * `inne`, w przeciwnym razie `false`.
     * @zobacz _.lte
     * @przykład
     *
     * _.gte(3, 1);
     * // => prawda
     *
     * _.gte(3, 3);
     * // => prawda
     *
     * _.gte(1, 3);
     * // => fałsz
     */
    var gte = createRelationalOperation(function(value, other) {
      zwracana wartość >= inne;
    });

    /**
     * Sprawdza, czy `wartość` jest prawdopodobnie obiektem `arguments`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `value` jest obiektem `arguments`,
     * w przeciwnym razie `fałsz`.
     * @przykład
     *
     * _.isArguments(funkcja() { zwraca argumenty; }());
     * // => prawda
     *
     * _.isArguments([1, 2, 3]);
     * // => fałsz
     */
    var isArguments = baseIsArguments(function() { return argumenty; }()) ? baseIsArguments : funkcja(wartość) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(wartość, 'callee');
    };

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `Array`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest tablicą, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isArray([1, 2, 3]);
     * // => prawda
     *
     * _.isArray(document.body.children);
     * // => fałsz
     *
     * _.isArray('abc');
     * // => fałsz
     *
     * _.isArray(_.noop);
     * // => fałsz
     */
    var isArray = Array.isArray;

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `ArrayBuffer`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.3.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest buforem tablicy, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isArrayBuffer(nowy ArrayBuffer(2));
     * // => prawda
     *
     * _.isArrayBuffer(nowa tablica(2));
     * // => fałsz
     */
    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

    /**
     * Sprawdza, czy `wartość` jest podobna do tablicy. Wartość jest uważana za tablicę, jeśli jest
     * nie jest funkcją i ma `wartość.długość`, która jest liczbą całkowitą większą niż lub
     * równa „0” i mniejsza lub równa „Number.MAX_SAFE_INTEGER”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest podobna do tablicy, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isArrayLike([1, 2, 3]);
     * // => prawda
     *
     * _.isArrayLike(document.body.children);
     * // => prawda
     *
     * _.isArrayLike('abc');
     * // => prawda
     *
     * _.isArrayLike(_.noop);
     * // => fałsz
     */
    funkcja isArrayLike(wartość) {
      zwracana wartość != null && isLength(wartość.długość) && !isFunction(wartość);
    }

    /**
     * Ta metoda jest podobna do `_.isArrayLike` z tym wyjątkiem, że sprawdza również, czy `wartość`
     * jest przedmiotem.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `value` jest obiektem podobnym do tablicy,
     * w przeciwnym razie `fałsz`.
     * @przykład
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => prawda
     *
     * _.isArrayLikeObject(document.body.children);
     * // => prawda
     *
     * _.isArrayLikeObject('abc');
     * // => fałsz
     *
     * _.isArrayLikeObject(_.noop);
     * // => fałsz
     */
    function isArrayLikeObject(wartość) {
      return isObjectLike(wartość) && isArrayLike(wartość);
    }

    /**
     * Sprawdza, czy „wartość” jest sklasyfikowana jako element podstawowy lub obiekt.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest wartością logiczną, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isBoolean(fałsz);
     * // => prawda
     *
     * _.isBoolean(null);
     * // => fałsz
     */
    funkcja isBoolean(wartość) {
      zwracana wartość === prawda || wartość === fałsz ||
        (isObjectLike(wartość) && baseGetTag(wartość) == boolTag);
    }

    /**
     * Sprawdza, czy `wartość` jest buforem.
     *
     * @statyczny
     * @członkiem _
     * @od 4.3.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest buforem, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isBuffer(nowy Bufor(2));
     * // => prawda
     *
     * _.isBuffer(nowy Uint8Array(2));
     * // => fałsz
     */
    var isBuffer = natywnyIsBuffer || stubFałsz;

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `Date`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest obiektem daty, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isDate(nowa data);
     * // => prawda
     *
     * _.isDate('Pon 23 kwietnia 2012');
     * // => fałsz
     */
    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

    /**
     * Sprawdza, czy `wartość` jest prawdopodobnie elementem DOM.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest elementem DOM, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isElement(dokument.body);
     * // => prawda
     *
     * _.isElement('<ciało>');
     * // => fałsz
     */
    funkcja isElement(wartość) {
      return isObjectLike(wartość) && value.nodeType === 1 && !isPlainObject(wartość);
    }

    /**
     * Sprawdza, czy `wartość` jest pustym obiektem, kolekcją, mapą lub zestawem.
     *
     * Obiekty są uważane za puste, jeśli nie mają własnego klucza policzalnego
     * nieruchomości.
     *
     * Wartości podobne do tablic, takie jak obiekty „argumenty”, tablice, bufory, ciągi znaków lub
     * Kolekcje podobne do jQuery są uważane za puste, jeśli mają „długość” wynoszącą „0”.
     * Podobnie mapy i zbiory są uważane za puste, jeśli mają „rozmiar” równy „0”.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest pusta, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isPusty(null);
     * // => prawda
     *
     * _.isPusty(prawda);
     * // => prawda
     *
     * _.jest pusty(1);
     * // => prawda
     *
     * _.isPusty([1, 2, 3]);
     * // => fałsz
     *
     * _.isEmpty({ 'a': 1 });
     * // => fałsz
     */
    funkcja jest pusta(wartość) {
      jeśli (wartość == null) {
        zwróć prawdę;
      }
      if (isArrayLike(wartość) &&
          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
            isBuffer(wartość) || isTypedArray(wartość) || isArgumenty(wartość))) {
        return !wartość.długość;
      }
      var tag = pobierzTag(wartość);
      if (tag == mapTag || tag == setTag) {
        return !wartość.rozmiar;
      }
      if (isPrototype(wartość)) {
        return !baseKeys(wartość).length;
      }
      for (klucz var w wartości) {
        if (hasOwnProperty.call(wartość, klucz)) {
          zwróć fałsz;
        }
      }
      zwróć prawdę;
    }

    /**
     * Wykonuje głębokie porównanie między dwiema wartościami w celu ustalenia, czy są
     * ekwiwalent.
     *
     * **Uwaga:** Ta metoda obsługuje porównywanie tablic, buforów tablic, wartości logicznych,
     * obiekty daty, obiekty błędu, mapy, liczby, obiekty `Object`, wyrażenia regularne,
     * zestawy, ciągi znaków, symbole i tablice typu. Obiekty `Object` są porównywane
     * przez własne, nie dziedziczone, przeliczalne właściwości. Funkcje i DOM
     * węzły są porównywane przez ścisłą równość, tj. `===`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca `true`, jeśli wartości są równoważne, w przeciwnym razie `false`.
     * @przykład
     *
     * var obiekt = { 'a': 1 };
     * var inne = { 'a': 1 };
     *
     * _.isEqual(obiekt, inne);
     * // => prawda
     *
     * obiekt === inny;
     * // => fałsz
     */
    funkcja jest równa (wartość, inne) {
      return baseIsEqual(wartość, inne);
    }

    /**
     * Ta metoda jest podobna do `_.isEqual` z tą różnicą, że akceptuje `customizer`, który
     * jest wywoływana w celu porównania wartości. Jeśli `customizer` zwraca `undefined`, porównania
     * są obsługiwane przez metodę. `customizer` jest wywoływany z maksymalnie
     * sześć argumentów: (objValue, othValue [, indeks|klucz, obiekt, inne, stos]).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @param {Funkcja} [customizer] Funkcja dostosowywania porównań.
     * @returns {boolean} Zwraca `true`, jeśli wartości są równoważne, w przeciwnym razie `false`.
     * @przykład
     *
     * funkcja isGreeting(wartość) {
     * return /^h(?:i|ello)$/.test(wartość);
     * }
     *
     * funkcja dostosowania (objValue, othValue) {
     * if (isGreeting(objValue) && isGreeting(othValue)) {
     * zwróć prawdę;
     * }
     * }
     *
     * var array = ['cześć', 'do widzenia'];
     * var inny = ['cześć', 'do widzenia'];
     *
     * _.isEqualWith(tablica, inne, konfigurator);
     * // => prawda
     */
    function isEqualWith(value, other, Customizer) {
      Customizer = typ dostosowania == 'funkcja' ? konfigurator : niezdefiniowany;
      var wynik = dostosowywanie ? dostosowania(wartość, inne) : niezdefiniowane;
      zwróć wynik === niezdefiniowany ? baseIsEqual(wartość, inne, niezdefiniowane, dostosowywanie) : !!wynik;
    }

    /**
     * Sprawdza, czy `value` to `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * Obiekt `SyntaxError`, `TypeError` lub `URIError`.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest obiektem błędu, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isError(nowy błąd);
     * // => prawda
     *
     * _.isError(Błąd);
     * // => fałsz
     */
    funkcja isError(wartość) {
      if (!isObjectLike(wartość)) {
        zwróć fałsz;
      }
      tag var = baseGetTag(wartość);
      tag powrotu == tag błędu || tag == domExcTag ||
        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
    }

    /**
     * Sprawdza, czy `wartość` jest skończoną liczbą pierwotną.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest liczbą skończoną, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isFinite(3);
     * // => prawda
     *
     * _.isFinite(Liczba.MIN_WARTOŚĆ);
     * // => prawda
     *
     * _.isFinite(Nieskończoność);
     * // => fałsz
     *
     * _.isFinite('3');
     * // => fałsz
     */
    funkcja isFinite(wartość) {
      return typeof value == 'liczba' && nativeIsFinite(value);
    }

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `Funkcja`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest funkcją, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isFunkcja(_);
     * // => prawda
     *
     * _.isFunkcja(/abc/);
     * // => fałsz
     */
    funkcja jestFunkcją(wartość) {
      if (!isObject(wartość)) {
        zwróć fałsz;
      }
      // Użycie `Object#toString` pozwala uniknąć problemów z operatorem `typeof`
      // w Safari 9, która zwraca 'object' dla tablic wpisanych i innych konstruktorów.
      tag var = baseGetTag(wartość);
      tag zwrotny == funcTag || tag == genTag || tag == tag asynchroniczny || tag == tag proxy;
    }

    /**
     * Sprawdza, czy `wartość` jest liczbą całkowitą.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest liczbą całkowitą, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isInteger(3);
     * // => prawda
     *
     * _.isInteger(Liczba.MIN_WARTOŚĆ);
     * // => fałsz
     *
     * _.isInteger(Nieskończoność);
     * // => fałsz
     *
     * _.isInteger('3');
     * // => fałsz
     */
    funkcja isInteger(wartość) {
      zwróć typwartości == 'liczba' && wartość == toInteger(wartość);
    }

    /**
     * Sprawdza, czy `wartość` jest prawidłową długością podobną do tablicy.
     *
     * **Uwaga:** Ta metoda jest luźno oparta na
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest prawidłową długością, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isDługość(3);
     * // => prawda
     *
     * _.isDługość(Liczba.MIN_WARTOŚĆ);
     * // => fałsz
     *
     * _.isDługość(Nieskończoność);
     * // => fałsz
     *
     * _.jestDługość('3');
     * // => fałsz
     */
    funkcja isLength(wartość) {
      zwróć typwartości == 'liczba' &&
        wartość > -1 && wartość % 1 == 0 && wartość <= MAX_SAFE_INTEGER;
    }

    /**
     * Sprawdza, czy `wartość` jest
     * [rodzaj języka](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * „Obiektu”. (np. tablice, funkcje, obiekty, wyrażenia regularne, `new Number(0)` i `new String('')`)
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest obiektem, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isObject({});
     * // => prawda
     *
     * _.isObject([1, 2, 3]);
     * // => prawda
     *
     * _.isObject(_.noop);
     * // => prawda
     *
     * _.isObject(null);
     * // => fałsz
     */
    funkcja isObject(wartość) {
      var typ = typwartości;
      zwraca wartość != null && (typ == 'obiekt' || typ == 'funkcja');
    }

    /**
     * Sprawdza, czy `wartość` jest podobna do obiektu. Wartość jest podobna do obiektu, jeśli nie jest „null”
     * i ma `typeof` wynik "object".
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest podobna do obiektu, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isObjectLike({});
     * // => prawda
     *
     * _.isObjectLike([1, 2, 3]);
     * // => prawda
     *
     * _.isObjectLike(_.noop);
     * // => fałsz
     *
     * _.isObjectLike(null);
     * // => fałsz
     */
    funkcja isObjectLike(wartość) {
      zwracana wartość != null && typ wartości == 'obiekt';
    }

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `Map`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.3.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest mapą, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isMap(nowa mapa);
     * // => prawda
     *
     * _.isMap(nowa Słaba Mapa);
     * // => fałsz
     */
    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

    /**
     * Wykonuje częściowe głębokie porównanie między `object` i `source` to
     * określić, czy `object` zawiera równoważne wartości właściwości.
     *
     * **Uwaga:** Ta metoda jest równoważna z `_.matches`, gdy `źródłem` jest
     * częściowo zastosowane.
     *
     * Częściowe porównania dopasują pustą tablicę i pusty obiekt `źródło`
     * wartości odpowiednio w stosunku do dowolnej wartości tablicy lub obiektu. Zobacz `_.isEqual`
     * lista obsługiwanych porównań wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Lang
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Object} source Obiekt wartości właściwości do dopasowania.
     * @returns {boolean} Zwraca `true`, jeśli `object` jest zgodny, w przeciwnym razie `false`.
     * @przykład
     *
     * var obiekt = { 'a': 1, 'b': 2 };
     *
     * _.isMatch(obiekt, { 'b': 2 });
     * // => prawda
     *
     * _.isMatch(obiekt, { 'b': 1 });
     * // => fałsz
     */
    function isMatch(obiekt, źródło) {
      zwracany obiekt === źródło || baseIsMatch(obiekt, źródło, getMatchData(źródło));
    }

    /**
     * Ta metoda jest podobna do `_.isMatch` z wyjątkiem tego, że akceptuje `customizer`, który
     * jest wywoływana w celu porównania wartości. Jeśli `customizer` zwraca `undefined`, porównania
     * są obsługiwane przez metodę. `customizer` jest wywoływany z pięcioma
     * argumenty: (objValue, srcValue, index|klucz, obiekt, źródło).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Object} source Obiekt wartości właściwości do dopasowania.
     * @param {Funkcja} [customizer] Funkcja dostosowywania porównań.
     * @returns {boolean} Zwraca `true`, jeśli `object` jest zgodny, w przeciwnym razie `false`.
     * @przykład
     *
     * funkcja isGreeting(wartość) {
     * return /^h(?:i|ello)$/.test(wartość);
     * }
     *
     * funkcja dostosowania (objValue, srcValue) {
     * if (isGreeting(objValue) && isGreeting(srcValue)) {
     * zwróć prawdę;
     * }
     * }
     *
     * var object = { 'pozdrowienie': 'cześć' };
     * var source = { 'pozdrowienie': 'cześć' };
     *
     * _.isMatchWith(obiekt, źródło, konfigurator);
     * // => prawda
     */
    function isMatchWith(object, source, Customizer) {
      Customizer = typ dostosowania == 'funkcja' ? konfigurator : niezdefiniowany;
      return baseIsMatch(obiekt, źródło, getMatchData(źródło), konfigurator);
    }

    /**
     * Sprawdza, czy `wartość` to `NaN`.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [`Number.isNaN`](https://mdn.io/Number/isNaN) i nie jest tym samym co
     * globalny [`isNaN`](https://mdn.io/isNaN), który zwraca `true` dla
     * „nieokreślony” i inne wartości nieliczbowe.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” to „NaN”, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isNaN(NaN);
     * // => prawda
     *
     * _.isNaN(nowy numer(NaN));
     * // => prawda
     *
     * isNaN(nieokreślony);
     * // => prawda
     *
     * _.isNaN(niezdefiniowany);
     * // => fałsz
     */
    funkcja isNaN(wartość) {
      // Prymityw `NaN` jest jedyną wartością, która nie jest sobie równa.
      // Najpierw wykonaj sprawdzenie `toStringTag`, aby uniknąć błędów z niektórymi
      // Obiekty ActiveX w IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Sprawdza, czy `wartość` jest nieskazitelną funkcją natywną.
     *
     * **Uwaga:** ta metoda nie może niezawodnie wykryć funkcji natywnych w obecności
     * pakietu core-js, ponieważ core-js omija ten rodzaj wykrywania.
     * Pomimo wielu próśb, opiekun core-js dał jasno do zrozumienia: any
     * próba naprawienia wykrywania będzie utrudniona. W rezultacie zostajemy
     * z małym wyborem, ale rzucić błąd. Niestety ma to również wpływ na
     * pakiety, np. [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
     * które opierają się na core-js.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `value` jest funkcją natywną,
     * w przeciwnym razie `fałsz`.
     * @przykład
     *
     * _.isNative(Array.prototype.push);
     * // => prawda
     *
     * _.jestNative(_);
     * // => fałsz
     */
    funkcja jest natywna(wartość) {
      if (jestMaskable(wartość)) {
        wyrzuć nowy błąd (CORE_ERROR_TEXT);
      }
      return baseIsNative(wartość);
    }

    /**
     * Sprawdza, czy `wartość` jest `null`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest „null”, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isNull(null);
     * // => prawda
     *
     * _.isNull(nieważne 0);
     * // => fałsz
     */
    funkcja isNull(wartość) {
      zwracana wartość === null;
    }

    /**
     * Sprawdza, czy „wartość” jest „null” lub „niezdefiniowana”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest zerowa, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isNil(null);
     * // => prawda
     *
     * _.isNil(nieważne 0);
     * // => prawda
     *
     * _.isNil(NaN);
     * // => fałsz
     */
    funkcja jestNil(wartość) {
      zwracana wartość == null;
    }

    /**
     * Sprawdza, czy „wartość” jest sklasyfikowana jako element podstawowy lub obiekt „Liczba”.
     *
     * **Uwaga:** aby wykluczyć „Nieskończoność”, „-Nieskończoność” i „NaN”, które są
     * sklasyfikowane jako liczby, użyj metody `_.isFinite`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest liczbą, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.jestNumer(3);
     * // => prawda
     *
     * _.isNumber(Number.MIN_VALUE);
     * // => prawda
     *
     * _.isLiczba(Nieskończoność);
     * // => prawda
     *
     * _.isNumer('3');
     * // => fałsz
     */
    funkcja jestLiczba(wartość) {
      zwraca typwartości == 'liczba' ||
        (isObjectLike(wartość) && baseGetTag(wartość) == numberTag);
    }

    /**
     * Sprawdza, czy `wartość` jest zwykłym obiektem, to znaczy obiektem utworzonym przez
     * Konstruktor `Object` lub taki z `[[Prototype]]` równym `null`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.8.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest zwykłym obiektem, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * }
     *
     * _.isPlainObject(nowy Foo);
     * // => fałsz
     *
     * _.isPlainObject([1, 2, 3]);
     * // => fałsz
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => prawda
     *
     * _.isPlainObject(Object.create(null));
     * // => prawda
     */
    funkcja isPlainObject(wartość) {
      if (!isObjectLike(wartość) || baseGetTag(wartość) != objectTag) {
        zwróć fałsz;
      }
      var proto = pobierzPrototyp(wartość);
      jeśli (proto === null) {
        zwróć prawdę;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'funkcja' && Ctor instancja Ctor &&
        funcToString.call(Ctor) == obiektCtorString;
    }

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `RegExp`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.1.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest wyrażeniem regularnym, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isRegExp(/abc/);
     * // => prawda
     *
     * _.isRegExp('/abc/');
     * // => fałsz
     */
    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

    /**
     * Sprawdza, czy `wartość` jest bezpieczną liczbą całkowitą. Liczba całkowita jest bezpieczna, jeśli jest to IEEE-754
     * liczba o podwójnej precyzji, która nie jest wynikiem zaokrąglonej niebezpiecznej liczby całkowitej.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest bezpieczną liczbą całkowitą, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isSafeInteger(3);
     * // => prawda
     *
     * _.isSafeInteger(Liczba.MIN_WARTOŚĆ);
     * // => fałsz
     *
     * _.isSafeInteger(Nieskończoność);
     * // => fałsz
     *
     * _.isSafeInteger('3');
     * // => fałsz
     */
    funkcja isSafeInteger(wartość) {
      zwróć isInteger(wartość) && wartość >= -MAX_SAFE_INTEGER && wartość <= MAX_SAFE_INTEGER;
    }

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `Set`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.3.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest zestawem, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isSet(nowy zestaw);
     * // => prawda
     *
     * _.isSet(nowy słaby zestaw);
     * // => fałsz
     */
    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

    /**
     * Sprawdza, czy „wartość” jest sklasyfikowana jako element podstawowy lub obiekt „Ciąg”.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest ciągiem, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isString('abc');
     * // => prawda
     *
     * _.isString(1);
     * // => fałsz
     */
    funkcja isString(wartość) {
      zwróć typwartości == 'string' ||
        (!isArray(wartość) && isObjectLike(wartość) && baseGetTag(wartość) == stringTag);
    }

    /**
     * Sprawdza, czy „wartość” jest sklasyfikowana jako element podstawowy lub obiekt „Symbol”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest symbolem, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isSymbol(Symbol.iterator);
     * // => prawda
     *
     * _.isSymbol('abc');
     * // => fałsz
     */
    funkcja isSymbol(wartość) {
      zwraca typwartości == 'symbol' ||
        (isObjectLike(wartość) && baseGetTag(wartość) == symbolTag);
    }

    /**
     * Sprawdza, czy „wartość” jest klasyfikowana jako tablica wpisana.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest tablicą typu, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isTypedArray(nowy Uint8Array);
     * // => prawda
     *
     * _.isTypedArray([]);
     * // => fałsz
     */
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

    /**
     * Sprawdza, czy `wartość` jest `niezdefiniowana`.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest „niezdefiniowana”, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isUndefined(void 0);
     * // => prawda
     *
     * _.is Undefined(null);
     * // => fal se
     */
    funkcja jest niezdefiniowana(wartość) {
      zwracana wartość === niezdefiniowana;
    }

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `WeakMap`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.3.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest słabą mapą, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isWeakMap(nowa SłabaMapa);
     * // => prawda
     *
     * _.isWeakMap(nowa mapa);
     * // => fałsz
     */
    funkcja isWeakMap(wartość) {
      return isObjectLike(wartość) && getTag(wartość) == słabyMapTag;
    }

    /**
     * Sprawdza, czy `wartość` jest sklasyfikowana jako obiekt `WeakSet`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.3.0
     * @kategoria Lang
     * @param {*} wartość Wartość do sprawdzenia.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest słabym zestawem, w przeciwnym razie „fałsz”.
     * @przykład
     *
     * _.isWeakSet(nowy słaby zestaw);
     * // => prawda
     *
     * _.isWeakSet(nowy zestaw);
     * // => fałsz
     */
    funkcja isWeakSet(wartość) {
      return isObjectLike(wartość) && baseGetTag(wartość) == słabyUstawTag;
    }

    /**
     * Sprawdza, czy „wartość” jest mniejsza niż „inne”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.9.0
     * @kategoria Lang
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest mniejsza niż „inne”,
     * w przeciwnym razie `fałsz`.
     * @zobacz _.gt
     * @przykład
     *
     * _.lt(1, 3);
     * // => prawda
     *
     * _.lt(3, 3);
     * // => fałsz
     *
     * _.lt(3, 1);
     * // => fałsz
     */
    var lt = utwórzOperacjęRelacyjną(bazaLt);

    /**
     * Sprawdza, czy „wartość” jest mniejsza lub równa „inne”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.9.0
     * @kategoria Lang
     * @param {*} wartość Wartość do porównania.
     * @param {*} other Inna wartość do porównania.
     * @returns {boolean} Zwraca „prawda”, jeśli „wartość” jest mniejsza lub równa
     * `inne`, w przeciwnym razie `false`.
     * @patrz _.gte
     * @przykład
     *
     * _.lte(1, 3);
     * // => prawda
     *
     * _.lte(3, 3);
     * // => prawda
     *
     * _.lte(3, 1);
     * // => fałsz
     */
    var lte = createRelationalOperation(function(value, other) {
      zwracana wartość <= inne;
    });

    /**
     * Konwertuje `wartość` na tablicę.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Lang
     * @param {*} wartość Wartość do konwersji.
     * @returns {Array} Zwraca przekonwertowaną tablicę.
     * @przykład
     *
     * _.toArray({ 'a': 1, 'b': 2 });
     * // => [1, 2]
     *
     * _.toArray('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toArray(1);
     * // => []
     *
     * _.toArray(null);
     * // => []
     */
    funkcja toArray(wartość) {
      jeśli (!wartość) {
        zwrócić [];
      }
      if (jestArrayLike(wartość)) {
        return isString(wartość) ? stringToArray(wartość) : copyArray(wartość);
      }
      if (symIterator && value[symIterator]) {
        return iteratorToArray(value[symIterator]());
      }
      tag var = pobierzTag(wartość),
          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : wartości);

      zwróć func(wartość);
    }

    /**
     * Konwertuje `wartość` na skończoną liczbę.
     *
     * @statyczny
     * @członkiem _
     * @od 4.12.0
     * @kategoria Lang
     * @param {*} wartość Wartość do konwersji.
     * @returns {liczba} Zwraca przekonwertowaną liczbę.
     * @przykład
     *
     * _.toFinite(3.2);
     * // => 3,2
     *
     * _.toFinite(Liczba.MIN_WARTOŚĆ);
     * // => 5e-324
     *
     * _.toFinite(Nieskończoność);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3,2
     */
    funkcja na skończoną(wartość) {
      jeśli (!wartość) {
        zwracana wartość === 0 ? wartość : 0;
      }
      wartość = toLiczba(wartość);
      if (wartość === NIESKOŃCZONOŚĆ || wartość === -NIESKOŃCZONOŚĆ) {
        var znak = (wartość < 0 ? -1 : 1);
        znak powrotu * MAX_INTEGER;
      }
      zwracana wartość === wartość ? wartość : 0;
    }

    /**
     * Konwertuje `wartość` na liczbę całkowitą.
     *
     * **Uwaga:** Ta metoda jest luźno oparta na
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do konwersji.
     * @returns {liczba} Zwraca przekonwertowaną liczbę całkowitą.
     * @przykład
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Liczba.MIN_WARTOŚĆ);
     * // => 0
     *
     * _.toInteger(Nieskończoność);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    funkcja toInteger(wartość) {
      var wynik = toFinite(wartość),
          reszta = wynik % 1;

      zwróć wynik === wynik ? (reszta ? wynik - reszta : wynik) : 0;
    }

    /**
     * Konwertuje `wartość` na liczbę całkowitą odpowiednią do użycia jako długość an
     * obiekt podobny do tablicy.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do konwersji.
     * @returns {liczba} Zwraca przekonwertowaną liczbę całkowitą.
     * @przykład
     *
     * _.doDługości(3.2);
     * // => 3
     *
     * _.doDługości(Liczba.MIN_WARTOŚĆ);
     * // => 0
     *
     * _.doDługości(Nieskończoność);
     * // => 4294967295
     *
     * _.doDługości('3.2');
     * // => 3
     */
    funkcja na długość(wartość) {
      wartość zwrotu ? baseClamp(toInteger(wartość), 0, MAX_ARRAY_LENGTH) : 0;
    }

    /**
     * Konwertuje „wartość” na liczbę.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do przetworzenia.
     * @returns {liczba} Zwraca liczbę.
     * @przykład
     *
     * _.toNumer(3.2);
     * // => 3,2
     *
     * _.toLiczba(Liczba.MIN_WARTOŚĆ);
     * // => 5e-324
     *
     * _.toLiczba(Nieskończoność);
     * // => Nieskończoność
     *
     * _.toNumber('3.2');
     * // => 3,2
     */
    funkcja na Numer(wartość) {
      if (rodzaj wartości == 'liczba') {
        wartość zwrotu;
      }
      if (isSymbol(wartość)) {
        powrót NAN;
      }
      if (isObject(wartość)) {
        var other = typeof value.valueOf == 'funkcja' ? wartość.wartośćOf() : wartość;
        wartość = isObject(inne) ? (inne + '') : inne;
      }
      if (typ wartości != 'string') {
        zwracana wartość === 0 ? wartość : +wartość;
      }
      wartość = wartość.zamień(przytnij ponownie, '');
      var isBinary = reIsBinary.test(wartość);
      return (isBinary || reIsOctal.test(wartość))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(wartość) ? NAN : +wartość);
    }

    /**
     * Konwertuje `wartość` na zwykły obiekt spłaszczający odziedziczony ciąg przeliczalny
     * kluczowane właściwości `value` do własnych właściwości zwykłego obiektu.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do konwersji.
     * @returns {Object} Zwraca przekonwertowany zwykły obiekt.
     * @przykład
     *
     * funkcja Foo() {
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.assign({ 'a': 1 }, nowe Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(wartość) {
      return copyObject(wartość, kluczeIn(wartość));
    }

    /**
     * Konwertuje `wartość` na bezpieczną liczbę całkowitą. Można porównać bezpieczną liczbę całkowitą i
     * poprawnie przedstawione.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do konwersji.
     * @returns {liczba} Zwraca przekonwertowaną liczbę całkowitą.
     * @przykład
     *
     * _.toSafeInteger(3.2);
     * // => 3
     *
     * _.toSafeInteger(Liczba.MIN_WARTOŚĆ);
     * // => 0
     *
     * _.toSafeInteger(Nieskończoność);
     * // => 9007199254740991
     *
     * _.toSafeInteger('3.2');
     * // => 3
     */
    funkcja toSafeInteger(wartość) {
      wartość zwrotu
        ? baseClamp(toInteger(wartość), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
        : (wartość === 0 ? wartość : 0);
    }

    /**
     * Konwertuje `wartość` na ciąg. Dla `null` . zwracany jest pusty ciąg
     * i `niezdefiniowane` wartości. Znak `-0` jest zachowany.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Lang
     * @param {*} wartość Wartość do konwersji.
     * @returns {ciąg} Zwraca przekonwertowany ciąg.
     * @przykład
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    funkcja toString(wartość) {
      zwracana wartość == null ? '' : baseToString(wartość);
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Przypisuje własne, wyliczalne, łańcuchowe właściwości obiektów źródłowych do
     * obiekt docelowy. Obiekty źródłowe są stosowane od lewej do prawej.
     * Kolejne źródła zastępują przypisania właściwości z poprzednich źródeł.
     *
     * **Uwaga:** Ta metoda mutuje `object` i jest luźno oparta na
     * [`Object.assign`](https://mdn.io/Object/assign).
     *
     * @statyczny
     * @członkiem _
     * @od 0.10.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Obiekt} [źródła] Obiekty źródłowe.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.assignIn
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * }
     *
     * funkcja Bar() {
     * to.c = 3;
     * }
     *
     * Foo.prototyp.b = 2;
     * Bar.prototyp.d = 4;
     *
     * _.assign({ 'a': 0 }, nowy Foo, nowy Bar);
     * // => { 'a': 1, 'c': 3 }
     */
    var assign = createAssigner(function(object, source) {
      if (isPrototype(source) || isArrayLike(source)) {
        copyObject(źródło, klucze(źródło), obiekt);
        zwrócić;
      }
      for (klucz var w źródle) {
        if (hasOwnProperty.call(źródło, klucz)) {
          assignValue(obiekt, klucz, źródło[klucz]);
        }
      }
    });

    /**
     * Ta metoda jest podobna do `_.assign` z tą różnicą, że iteruje po własnej i
     * odziedziczone właściwości źródła.
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @rozszerzenie aliasu
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Obiekt} [źródła] Obiekty źródłowe.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.przypisz
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * }
     *
     * funkcja Bar() {
     * to.c = 3;
     * }
     *
     * Foo.prototyp.b = 2;
     * Bar.prototyp.d = 4;
     *
     * _.assignIn({ 'a': 0 }, nowy Foo, nowy Bar);
     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
     */
    var assignIn = createAssigner(function(object, source) {
      copyObject(źródło, kluczeIn(źródło), obiekt);
    });

    /**
     * Ta metoda jest podobna do `_.assignIn` z wyjątkiem tego, że akceptuje `customizer`
     * który jest wywoływany w celu wytworzenia przypisanych wartości. Jeśli `customizer` zwraca
     * `undefined`, przypisanie jest obsługiwane przez metodę. „Klient”
     * jest wywoływana z pięcioma argumentami: (objValue, srcValue, klucz, obiekt, źródło).
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @alias extendWith
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Object} źródła Obiekty źródłowe.
     * @param {Funkcja} [customizer] Funkcja dostosowywania przypisanych wartości.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.assignWith
     * @przykład
     *
     * funkcja dostosowania (objValue, srcValue) {
     * return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignInWith, konfigurator);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignInWith = createAssigner(function(object, source, srcIndex, Customizer) {
      copyObject(źródło, kluczeIn(źródło), obiekt, konfigurator);
    });

    /**
     * Ta metoda jest podobna do `_.assign` z tą różnicą, że akceptuje `customizer`
     * który jest wywoływany w celu wytworzenia przypisanych wartości. Jeśli `customizer` zwraca
     * `undefined`, przypisanie jest obsługiwane przez metodę. „Klient”
     * jest wywoływana z pięcioma argumentami: (objValue, srcValue, klucz, obiekt, źródło).
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Object} źródła Obiekty źródłowe.
     * @param {Funkcja} [customizer] Funkcja dostosowywania przypisanych wartości.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.assignInWith
     * @przykład
     *
     * funkcja dostosowania (objValue, srcValue) {
     * return _.isUndefined(objValue) ? srcValue : objValue;
     * }
     *
     * var defaults = _.partialRight(_.assignWith, konfigurator);
     *
     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var assignWith = createAssigner(function(object, source, srcIndex, Customizer) {
      copyObject(źródło, klucze(źródło), obiekt, konfigurator);
    });

    /**
     * Tworzy tablicę wartości odpowiadającą `ścieżkom` obiektu `object`.
     *
     * @statyczny
     * @członkiem _
     * @od 1.0.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {...(string|string[])} [ścieżki] Ścieżki właściwości do wybrania.
     * @returns {Array} Zwraca wybrane wartości.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
     *
     * _.at(obiekt, ['a[0].bc', 'a[1]']);
     * // => [3, 4]
     */
    var at = flatRest(baseAt);

    /**
     * Tworzy obiekt, który dziedziczy po obiekcie `prototype`. Jeśli
     * podany jest obiekt `properties`, jego własne, przeliczalne właściwości z kluczami łańcuchowymi
     * są przypisane do tworzonego obiektu.
     *
     * @statyczny
     * @członkiem _
     * @od 2.3.0
     * @kategoria Obiekt
     * Prototyp @param {Object} Obiekt, z którego ma dziedziczyć.
     * @param {Obiekt} [właściwości] Właściwości do przypisania do obiektu.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * funkcja Kształt() {
     * to.x = 0;
     * to.y = 0;
     * }
     *
     * funkcja Okrąg() {
     * Kształt.call(to);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     * 'konstruktor': koło
     * });
     *
     * var okrąg = nowy okrąg;
     * instancja okręgu Koła;
     * // => prawda
     *
     * Okrągła instancja Kształtu;
     * // => prawda
     */
    funkcja utwórz(prototyp, właściwości) {
      var wynik = baseCreate(prototyp);
      zwracać właściwości == null ? wynik : baseAssign(wynik, właściwości);
    }

    /**
     * Przypisuje własne i odziedziczone, wyliczalne, łańcuchowe właściwości kodu źródłowego
     * obiekty do obiektu docelowego dla wszystkich właściwości docelowych, które
     * rozstrzygnij na `nieokreślony`. Obiekty źródłowe są stosowane od lewej do prawej.
     * Po ustawieniu właściwości dodatkowe wartości tej samej właściwości są ignorowane.
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Obiekt} [źródła] Obiekty źródłowe.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.defaultsDeep
     * @przykład
     *
     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
     * // => { 'a': 1, 'b': 2 }
     */
    var defaults = baseRest(funkcja(obiekt, źródła) {
      obiekt = obiekt(obiekt);

      indeks zmiennej = -1;
      zmienna długość = źródła.długość;
      var guard = długość > 2 ? źródła[2] : nieokreślone;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        długość = 1;
      }

      while (++indeks < długość) {
        var źródło = źródła[indeks];
        var props = keysIn(źródło);
        var propsIndex = -1;
        var długość podpory = długość podpory;

        while (++propsIndex < propsLength) {
          var klucz = props[propsIndex];
          var wartość = obiekt[klucz];

          if (wartość === niezdefiniowana ||
              (eq(wartość, obiektProto[klucz]) && !hasOwnProperty.call(obiekt, klucz))) {
            obiekt[klucz] = źródło[klucz];
          }
        }
      }

      obiekt zwrotny;
    });

    /**
     * Ta metoda jest podobna do `_.defaults` z wyjątkiem tego, że rekursywnie przypisuje
     * domyślne właściwości.
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.10.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Obiekt} [źródła] Obiekty źródłowe.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @patrz _.defaults
     * @przykład
     *
     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
     * // => { 'a': { 'b': 2, 'c': 3 } }
     */
    var defaultsDeep = baseRest(function(args) {
      args.push(undefined, customDefaultsMerge);
      return zastosuj(mergeWith, undefined, args);
    });

    /**
     * Ta metoda jest podobna do `_.find` z tą różnicą, że zwraca klucz pierwszego
     * element `predicate` zwraca true zamiast samego elementu.
     *
     * @statyczny
     * @członkiem _
     * @od 1.1.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {string|undefined} Zwraca klucz dopasowanego elementu,
     * jeszcze `nieokreślony`.
     * @przykład
     *
     * var użytkowników = {
     * 'barney': { 'wiek': 36, 'aktywny': prawda },
     * 'fred': { 'wiek': 40, 'aktywny': fałsz },
     * 'kamyki': { 'wiek': 1, 'aktywny': prawda }
     * };
     *
     * _.findKey(users, function(o) { return o.age < 40; });
     * // => 'barney' (kolejność iteracji nie jest gwarantowana)
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.findKey(users, { 'wiek': 1, 'aktywny': prawda });
     * // => 'kamyki'
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.findKey(użytkownicy, ['aktywny', fałsz]);
     * // => 'Fred'
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.findKey(użytkownicy, 'aktywni');
     * // => 'barney'
     */
    function findKey(obiekt, predykat) {
      return baseFindKey(obiekt, getIteratee(predykat, 3), baseForOwn);
    }

    /**
     * Ta metoda jest podobna do `_.findKey` z tą różnicą, że iteruje po elementach
     * zbiór w odwrotnej kolejności.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na iterację.
     * @returns {string|undefined} Zwraca klucz dopasowanego elementu,
     * jeszcze `nieokreślony`.
     * @przykład
     *
     * var użytkowników = {
     * 'barney': { 'wiek': 36, 'aktywny': prawda },
     * 'fred': { 'wiek': 40, 'aktywny': fałsz },
     * 'kamyki': { 'wiek': 1, 'aktywny': prawda }
     * };
     *
     * _.findLastKey(users, function(o) { return o.age < 40; });
     * // => zwraca 'pebbles' zakładając, że `_.findKey` zwraca 'barney'
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.findLastKey(users, { 'wiek': 36, 'aktywny': prawda });
     * // => 'barney'
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.findLastKey(użytkownicy, ['aktywny', fałsz]);
     * // => 'Fred'
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.findLastKey(użytkownicy, 'aktywni');
     * // => 'kamyki'
     */
    function findLastKey(obiekt, predykat) {
      return baseFindKey(obiekt, getIteratee(predykat, 3), baseForOwnRight);
    }

    /**
     * Iteruje nad własnymi i odziedziczonymi wyliczalnymi ciągami kluczowanymi właściwościami an
     * obiekt i wywołuje `iterację` dla każdej właściwości. Wywoływany jest iterate
     * z trzema argumentami: (wartość, klucz, obiekt). Funkcje iterowane mogą wyjść
     * wczesna iteracja przez jawne zwrócenie `false`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.3.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.forInRight
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.forIn(new Foo, function(wartość, klucz) {
     * console.log(klucz);
     * });
     * // => Loguje 'a', 'b', a następnie 'c' (kolejność iteracji nie jest gwarantowana).
     */
    function forIn(object, iteratee) {
      zwracany obiekt == null
        ? obiekt
        : baseFor(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Ta metoda jest podobna do `_.forIn` z tą różnicą, że iteruje po właściwościach
     * „obiekt” w odwrotnej kolejności.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.forIn
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.forInRight(new Foo, function(wartość, klucz) {
     * console.log(klucz);
     * });
     * // => Loguje 'c', 'b', potem 'a' zakładając '_.forIn` loguje 'a', 'b', potem 'c'.
     */
    function forInRight(object, iteratee) {
      zwracany obiekt == null
        ? obiekt
        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
    }

    /**
     * Iteruje nad własnymi, policzalnymi ciągami kluczowanymi właściwościami obiektu i
     * wywołuje `iteratee` dla każdej właściwości. Iterate jest wywoływany z trzema
     * argumenty: (wartość, klucz, obiekt). Funkcje iterowane mogą wyjść z iteracji
     * wcześnie przez wyraźne zwrócenie `false`.
     *
     * @statyczny
     * @członkiem _
     * @od 0.3.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.forOwnRight
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.forOwn(new Foo, function(wartość, klucz) {
     * console.log(klucz);
     * });
     * // => Loguje „a”, a następnie „b” (kolejność iteracji nie jest gwarantowana).
     */
    function forOwn(object, iteratee) {
      zwróć obiekt && baseForOwn(object, getIteratee(iteratee, 3));
    }

    /**
     * Ta metoda jest podobna do `_.forOwn` z tą różnicą, że iteruje po właściwościach
     * „obiekt” w odwrotnej kolejności.
     *
     * @statyczny
     * @członkiem _
     * @od 2.0.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @zobacz _.dlaWłasnych
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.forOwnRight(new Foo, function(wartość, klucz) {
     * console.log(klucz);
     * });
     * // => Loguje 'b' następnie 'a' zakładając, że `_.forOwn` loguje 'a' następnie 'b'.
     */
    function forOwnRight(object, iteratee) {
      zwróć obiekt && baseForOwnRight(object, getIteratee(iteratee, 3));
    }

    /**
     * Tworzy tablicę nazw właściwości funkcji na podstawie własnych właściwości wyliczalnych
     * „obiektu”.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @returns {Array} Zwraca nazwy funkcji.
     * @zobacz _.functionsIn
     * @przykład
     *
     * funkcja Foo() {
     * this.a = _.constant('a');
     * to.b = _.stała('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functions(nowy Foo);
     * // => ['a', 'b']
     */
    funkcje funkcji(obiekt) {
      zwróć obiekt == null ? [] : baseFunctions(obiekt, klucze(obiekt));
    }

    /**
     * Tworzy tablicę nazw właściwości funkcji z własnych i dziedziczonych
     * wyliczalne właściwości `obiektu`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do sprawdzenia.
     * @returns {Array} Zwraca nazwy funkcji.
     * @patrz _.functions
     * @przykład
     *
     * funkcja Foo() {
     * this.a = _.constant('a');
     * to.b = _.stała('b');
     * }
     *
     * Foo.prototype.c = _.constant('c');
     *
     * _.functionsIn(nowy Foo);
     * // => ['a', 'b', 'c']
     */
    function funkcjeIn(obiekt) {
      zwróć obiekt == null ? [] : baseFunctions(obiekt, kluczeIn(obiekt));
    }

    /**
     * Pobiera wartość w `ścieżce` obiektu `object`. Jeśli rozwiązana wartość to
     * `undefined`, w jej miejsce zwracana jest `defaultValue`.
     *
     * @statyczny
     * @członkiem _
     * @od 3.7.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka właściwości do pobrania.
     * @param {*} [wartość domyślna] Wartość zwracana dla rozstrzygniętych wartości „niezdefiniowanych”.
     * @returns {*} Zwraca rozwiązaną wartość.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(obiekt, 'a[0].bc');
     * // => 3
     *
     * _.get(obiekt, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(obiekt, 'abc', 'domyślny');
     * // => 'domyślnie'
     */
    function get(object, path, defaultValue) {
      var wynik = obiekt == null ? undefined : baseGet(obiekt, ścieżka);
      zwróć wynik === niezdefiniowany ? DefaultValue : wynik;
    }

    /**
     * Sprawdza, czy `path` jest bezpośrednią własnością `object`.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `path` istnieje, w przeciwnym razie `false`.
     * @przykład
     *
     * var object = { 'a': { 'b': 2 } };
     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.ma(obiekt, 'a');
     * // => prawda
     *
     * _.ma(obiekt, 'ab');
     * // => prawda
     *
     * _.ma(obiekt, ['a', 'b']);
     * // => prawda
     *
     * _.ma(inne, 'a');
     * // => fałsz
     */
    funkcja ma(obiekt, ścieżka) {
      return object != null && hasPath(obiekt, ścieżka, baseHas);
    }

    /**
     * Sprawdza, czy `path` jest bezpośrednią lub dziedziczoną właściwością `object`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka do sprawdzenia.
     * @returns {boolean} Zwraca `true` jeśli `path` istnieje, w przeciwnym razie `false`.
     * @przykład
     *
     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
     *
     * _.hasIn(obiekt, 'a');
     * // => prawda
     *
     * _.hasIn(obiekt, 'ab');
     * // => prawda
     *
     * _.hasIn(obiekt, ['a', 'b']);
     * // => prawda
     *
     * _.hasIn(obiekt, 'b');
     * // => fałsz
     */
    function hasIn(obiekt, ścieżka) {
      return object != null && hasPath(obiekt, ścieżka, baseHasIn);
    }

    /**
     * Tworzy obiekt złożony z odwróconych kluczy i wartości `object`.
     * Jeśli `object` zawiera zduplikowane wartości, kolejne wartości nadpisują
     * przypisania własności poprzednich wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 0.7.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do odwrócenia.
     * @returns {Object} Zwraca nowy odwrócony obiekt.
     * @przykład
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(obiekt);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(funkcja(wynik, wartość, klucz) {
      jeśli (wartość != null &&
          typeof value.toString != 'funkcja') {
        wartość = nativeObjectToString.call(value);
      }

      wynik[wartość] = klucz;
    }, stała(tożsamość));

    /**
     * Ta metoda jest podobna do `_.invert` z wyjątkiem tego, że generowany jest odwrócony obiekt
     * z wyników uruchomienia każdego elementu `object` do `iteratee`. ten
     * odpowiadająca odwrócona wartość każdego odwróconego klucza to tablica kluczy
     * odpowiedzialny za generowanie wartości odwróconej. Wywoływany jest iterate
     * z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.1.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do odwrócenia.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {Object} Zwraca nowy odwrócony obiekt.
     * @przykład
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invertBy(obiekt);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     *
     * _.invertBy(obiekt, funkcja(wartość) {
     * zwróć 'grupa' + wartość;
     * });
     * // => { 'grupa1': ['a', 'c'], 'grupa2': ['b'] }
     */
    var invertBy = createInverter(function(reult, value, key) {
      jeśli (wartość != null &&
          typeof value.toString != 'funkcja') {
        wartość = nativeObjectToString.call(value);
      }

      if (hasOwnProperty.call(wynik, wartość)) {
        wynik[wartość].push(klucz);
      } w przeciwnym razie {
        wynik[wartość] = [klucz];
      }
    }, getIteratee);

    /**
     * Wywołuje metodę w `ścieżce` obiektu `object`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka metody do wywołania.
     * @param {...*} [argumenty] Argumenty do wywołania metody.
     * @returns {*} Zwraca wynik wywołanej metody.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
     *
     * _.invoke(obiekt, 'a[0].bcslice', 1, 3);
     * // => [2, 3]
     */
    var invoke = baseRest(baseInvoke);

    /**
     * Tworzy tablicę własnych, przeliczalnych nazw właściwości `object`.
     *
     * **Uwaga:** Wartości niebędące obiektami są wymuszane na obiektach. Zobacz
     * [specyfikacja ES](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * po więcej szczegółów.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę nazw właściwości.
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.keys(nowy Foo);
     * // => ['a', 'b'] (kolejność iteracji nie jest gwarantowana)
     *
     * _.keys('cześć');
     * // => ['0', '1']
     */
    klawisze funkcyjne (obiekt) {
      return isArrayLike(obiekt) ? arrayLikeKeys(obiekt) : baseKeys(obiekt);
    }

    /**
     * Tworzy tablicę własnych i dziedziczonych, przeliczalnych nazw właściwości `object`.
     *
     * **Uwaga:** Wartości niebędące obiektami są wymuszane na obiektach.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę nazw właściwości.
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.keysIn(nowy Foo);
     * // => ['a', 'b', 'c'] (kolejność iteracji nie jest gwarantowana)
     */
    klawisze funkcyjneIn(obiekt) {
      return isArrayLike(obiekt) ? arrayLikeKeys(obiekt, prawda) : baseKeysIn(obiekt);
    }

    /**
     * Przeciwieństwo `_.mapValues`; ta metoda tworzy obiekt z
     * te same wartości co `object` i klucze wygenerowane przez uruchomienie każdego własnego enumerable
     * ciąg kluczowy właściwość `object` do `iteratee`. Wywoływany jest iterate
     * z trzema argumentami: (wartość, klucz, obiekt).
     *
     * @statyczny
     * @członkiem _
     * @od 3.8.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Object} Zwraca nowy mapowany obiekt.
     * @zobacz _.mapValues
     * @przykład
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(wartość, klucz) {
     * klawisz powrotu + wartość;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    function mapKeys(object, iteratee) {
      zmienna wynik = {};
      iteracja = getIteratee(iteracja, 3);

      baseForOwn(obiekt, funkcja(wartość, klucz, obiekt) {
        baseAssignValue(wynik, iteracja(wartość, klucz, obiekt), wartość);
      });
      zwróć wynik;
    }

    /**
     * Tworzy obiekt z tymi samymi kluczami co `object` i wygenerowanymi wartościami
     * uruchamiając każdą własną właściwość `object` thru . z kluczem łańcuchowym
     * „iterates”. Iterat jest wywoływany z trzema argumentami:
     * (wartość, klucz, obiekt).
     *
     * @statyczny
     * @członkiem _
     * @od 2.4.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Object} Zwraca nowy mapowany obiekt.
     * @zobacz _.mapKeys
     * @przykład
     *
     * var użytkowników = {
     * 'fred': { 'użytkownik': 'fred', 'wiek': 40 },
     * 'pebbles': { 'user': 'pebbles', 'wiek': 1 }
     * };
     *
     * _.mapValues(users, function(o) { return o.age; });
     * // => { 'fred': 40, 'pebbles': 1 } (kolejność iteracji nie jest gwarantowana)
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.mapValues(użytkownicy, 'wiek');
     * // => { 'fred': 40, 'pebbles': 1 } (kolejność iteracji nie jest gwarantowana)
     */
    function mapValues(object, iteratee) {
      zmienna wynik = {};
      iteracja = getIteratee(iteracja, 3);

      baseForOwn(obiekt, funkcja(wartość, klucz, obiekt) {
        baseAssignValue(wynik, klucz, iteracja(wartość, klucz, obiekt));
      });
      zwróć wynik;
    }

    /**
     * Ta metoda jest podobna do `_.assign` z tą różnicą, że rekursywnie łączy własne i
     * odziedziczone właściwości obiektów źródłowych z kluczem wyliczanym ciągiem do
     * obiekt docelowy. Właściwości źródła, które rozstrzygają się na `undefined` to
     * pomijane, jeśli istnieje wartość docelowa. Właściwości tablicy i zwykłego obiektu
     * są scalane rekursywnie. Inne obiekty i typy wartości są zastępowane przez
     * zadanie. Obiekty źródłowe są stosowane od lewej do prawej. Późniejszy
     * źródła zastępują przypisania właściwości poprzednich źródeł.
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 0.50
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Obiekt} [źródła] Obiekty źródłowe.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * var obiekt = {
     * 'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var inne = {
     * 'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(obiekt, inne);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = createAssigner(function(object, source, srcIndex) {
      baseMerge(obiekt, źródło, srcIndex);
    });

    /**
     * Ta metoda jest podobna do `_.merge` z wyjątkiem tego, że akceptuje `customizer`, który
     * jest wywoływany w celu wytworzenia połączonych wartości miejsca docelowego i źródła
     * nieruchomości. Jeśli `customizer` zwraca `undefined`, scalanie jest obsługiwane przez
     * zamiast tego metoda. `customizer` jest wywoływany z sześcioma argumentami:
     * (objValue, srcValue, klucz, obiekt, źródło, stos).
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt docelowy.
     * @param {...Object} źródła Obiekty źródłowe.
     * @param {Funkcja} konfigurator Funkcja dostosowywania przypisanych wartości.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * funkcja dostosowania (objValue, srcValue) {
     * if (_.isArray(objValue)) {
     * return objValue.concat(srcValue);
     * }
     * }
     *
     * var obiekt = { 'a': [1], 'b': [2] };
     * var inne = { 'a': [3], 'b': [4] };
     *
     * _.mergeWith(obiekt, inny, konfigurator);
     * // => { 'a': [1, 3], 'b': [2, 4] }
     */
    var mergeWith = createAssigner(function(object, source, srcIndex, Customizer) {
      baseMerge(obiekt, źródło, srcIndex, konfigurator);
    });

    /**
     * Przeciwieństwo `_.pick`; ta metoda tworzy obiekt złożony z
     * własne i odziedziczone wyliczalne ścieżki właściwości `object`, które nie są pomijane.
     *
     * **Uwaga:** Ta metoda jest znacznie wolniejsza niż `_.pick`.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt źródłowy.
     * @param {...(string|string[])} [ścieżki] Ścieżki właściwości do pominięcia.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omit(obiekt, ['a', 'c']);
     * // => { 'b': '2' }
     */
    var pomiń = flatRest(funkcja(obiekt, ścieżki) {
      zmienna wynik = {};
      if (obiekt == null) {
        zwróć wynik;
      }
      var isDeep = fałsz;
      paths = arrayMap(ścieżki, funkcja(ścieżka) {
        ścieżka =castPath(ścieżka, obiekt);
        isDeep || (isDeep = ścieżka.długość > 1);
        ścieżka powrotna;
      });
      copyObject(obiekt, getAllKeysIn(obiekt), wynik);
      jeśli (jest głęboko) {
        wynik = baseClone (wynik, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
      }
      var length = paths.length;
      podczas gdy (długość--) {
        baseUnset(wynik, ścieżki[długość]);
      }
      zwróć wynik;
    });

    /**
     * Przeciwieństwo `_.pickBy`; ta metoda tworzy obiekt złożony z
     * własne i odziedziczone, wyliczalne, łańcuchowe właściwości `object` that
     * `predicate` nie zwraca prawdy dla. Predykat jest wywoływany z dwoma
     * argumenty: (wartość, klucz).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt źródłowy.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na właściwość.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.omitBy(obiekt, _.isNumber);
     * // => { 'b': '2' }
     */
    function pomińBy(obiekt, predykat) {
      return pickBy(object, negate(getIteratee(predicate)));
    }

    /**
     * Tworzy obiekt złożony z wybranych właściwości `object`.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt źródłowy.
     * @param {...(string|string[])} [ścieżki] Ścieżki właściwości do wybrania.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pick(obiekt, ['a', 'c']);
     * // => { 'a': 1, 'c': 3 }
     */
    var pick = flatRest(function(object, paths) {
      zwróć obiekt == null ? {} : basePick(obiekt, ścieżki);
    });

    /**
     * Tworzy obiekt złożony z właściwości `object` `predicate` return
     * prawda za. Predykat jest wywoływany z dwoma argumentami: (wartość, klucz).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt źródłowy.
     * @param {Funkcja} [predicate=_.identity] Funkcja wywoływana na właściwość.
     * @returns {Obiekt} Zwraca nowy obiekt.
     * @przykład
     *
     * var object = { 'a': 1, 'b': '2', 'c': 3 };
     *
     * _.pickBy(obiekt, _.isNumber);
     * // => { 'a': 1, 'c': 3 }
     */
    function pickBy(obiekt, predykat) {
      if (obiekt == null) {
        zwrócić {};
      }
      var props = arrayMap(getAllKeysIn(object), function(prop) {
        zwróć [wsparcie];
      });
      predykat = getIteratee(predykat);
      return basePickBy(obiekt, rekwizyty, funkcja(wartość, ścieżka) {
        return predicate(wartość, ścieżka[0]);
      });
    }

    /**
     * Ta metoda jest podobna do `_.get` z tą różnicą, że jeśli rozwiązaną wartością jest a
     * funkcja jest wywoływana z `this` wiązaniem jej obiektu nadrzędnego i
     * zwracany jest jego wynik.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {Array|string} ścieżka Ścieżka właściwości do rozwiązania.
     * @param {*} [wartość domyślna] Wartość zwracana dla rozstrzygniętych wartości „niezdefiniowanych”.
     * @returns {*} Zwraca rozwiązaną wartość.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(obiekt, 'a[0].b.c1');
     * // => 3
     *
     * _.result(obiekt, 'a[0].b.c2');
     * // => 4
     *
     * _.result(obiekt, 'a[0].b.c3', 'domyślny');
     * // => 'domyślnie'
     *
     * _.result(obiekt, 'a[0].b.c3', _.constant('domyślny'));
     * // => 'domyślnie'
     */
    wynik funkcji(obiekt, ścieżka, wartość domyślna) {
      ścieżka =castPath(ścieżka, obiekt);

      indeks zm = -1,
          długość = ścieżka.długość;

      // Upewnij się, że pętla jest wprowadzana, gdy ścieżka jest pusta.
      jeśli (!długość) {
        długość = 1;
        obiekt = niezdefiniowany;
      }
      while (++indeks < długość) {
        var wartość = obiekt == null ? undefined : obiekt[toKey(ścieżka[indeks])];
        if (wartość === niezdefiniowana) {
          indeks = długość;
          wartość = wartość domyślna;
        }
        obiekt = isFunction(wartość) ? wartość.call(obiekt) : wartość;
      }
      obiekt zwrotny;
    }

    /**
     * Ustawia wartość w „ścieżce” obiektu „object”. Jeśli część `ścieżki` nie istnieje,
     * jest tworzony. Tablice są tworzone dla brakujących właściwości indeksu, podczas gdy obiekty
     * są tworzone dla wszystkich innych brakujących właściwości. Użyj `_.setWith`, aby dostosować
     * tworzenie `ścieżki`.
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.7.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do ustawienia.
     * @param {*} wartość Wartość do ustawienia.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(obiekt, 'a[0].bc', 4);
     * console.log(obiekt.a[0].bc);
     * // => 4
     *
     * _.set(obiekt, ['x', '0', 'y', 'z'], 5);
     * console.log(obiekt.x[0].yz);
     * // => 5
     */
    zestaw funkcji (obiekt, ścieżka, wartość) {
      zwróć obiekt == null ? obiekt : baseSet(obiekt, ścieżka, wartość);
    }

    /**
     * Ta metoda jest podobna do `_.set` z wyjątkiem tego, że akceptuje `customizer`, którym jest
     * wywoływane w celu wytworzenia obiektów `path`. Jeśli `customizer` zwraca `undefined`
     * Zamiast tego tworzenie ścieżki jest obsługiwane przez metodę. Wywoływany jest `customizer`
     * z trzema argumentami: (nsValue, klucz, nsObject).
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do ustawienia.
     * @param {*} wartość Wartość do ustawienia.
     * @param {Funkcja} [customizer] Funkcja dostosowywania przypisanych wartości.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * var obiekt = {};
     *
     * _.setWith(obiekt, '[0][1]', 'a', obiekt);
     * // => { '0': { '1': 'a' } }
     */
    function setWith(obiekt, ścieżka, wartość, dostosowanie) {
      Customizer = typ dostosowania == 'funkcja' ? konfigurator : niezdefiniowany;
      zwróć obiekt == null ? obiekt : baseSet(obiekt, ścieżka, wartość, dostosowywanie);
    }

    /**
     * Tworzy tablicę własnych, przeliczalnych par klucz-wartość ciągu znaków dla `object`
     * który może być wykorzystany przez `_.fromPairs`. Jeśli `object` jest mapą lub zestawem, jego
     * wpisy są zwracane.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @wpisy aliasów
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca pary klucz-wartość.
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.toPairs(nowe Foo);
     * // => [['a', 1], ['b', 2]] (kolejność iteracji nie jest gwarantowana)
     */
    var toPairs = utwórzToPairs(klucze);

    /**
     * Tworzy tablicę własnych i dziedziczonych, wyliczalnych par klucz-wartość ciągu znaków
     * dla `object`, który może być wykorzystany przez `_.fromPairs`. Jeśli `obiekt` jest mapą
     * lub zestaw, zwracane są jego wpisy.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @alias wpisyIn
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca pary klucz-wartość.
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.toPairsIn(nowe Foo);
     * // => [['a', 1], ['b', 2], ['c', 3]] (kolejność iteracji nie jest gwarantowana)
     */
    var toPairsIn = utwórzToPairs(keysIn);

    /**
     * Alternatywa dla `_.reduce`; ta metoda przekształca `obiekt` w nowy
     * obiekt `accumulator`, który jest wynikiem uruchomienia każdego z osobna
     * policzalne właściwości kluczowane łańcuchem poprzez `iteratee`, przy każdym wywołaniu
     * potencjalna mutacja obiektu `akumulatora`. Jeśli `akumulator` nie jest
     * pod warunkiem, że zostanie użyty nowy obiekt z tym samym `[[Prototype]]`. ten
     * iteracja jest wywoływana z czterema argumentami: (akumulator, wartość, klucz, obiekt).
     * Funkcje iteracyjne mogą zakończyć iterację wcześniej przez jawne zwrócenie `false`.
     *
     * @statyczny
     * @członkiem _
     * @od 1.3.0
     * @kategoria Obiekt
     * @param {Object} object Obiekt do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @param {*} [akumulator] Niestandardowa wartość akumulatora.
     * @returns {*} Zwraca skumulowaną wartość.
     * @przykład
     *
     * _.transform([2, 3, 4], function(wynik, n) {
     * wynik.push(n *= n);
     * zwróć n % 2 == 0;
     * }, []);
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(wynik, wartość, klucz) {
     * (wynik[wartość] || (wynik[wartość] = [])).push(klucz);
     * }, {});
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    funkcja przekształcenia(obiekt, iteracja, akumulator) {
      var isArr = isArray(obiekt),
          isArrLike = isArr || isBuffer(obiekt) || isTypedArray(obiekt);

      iteracja = getIteratee(iteracja, 4);
      if (akumulator == null) {
        var Ctor = obiekt && object.constructor;
        jeśli (jestArrLike) {
          akumulator = isArr ? nowy dyrektor : [];
        }
        else if (isObject(obiekt)) {
          akumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        }
        w przeciwnym razie {
          akumulator = {};
        }
      }
      (isArrLike ? arrayEach : baseForOwn)(obiekt, funkcja(wartość, indeks, obiekt) {
        return iteratee(akumulator, wartość, indeks, obiekt);
      });
      akumulator zwrotny;
    }

    /**
     * Usuwa właściwość w `ścieżce` obiektu `object`.
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do usunięcia.
     * @returns {boolean} Zwraca `true` jeśli właściwość została usunięta, w przeciwnym razie `false`.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
     * _.unset(obiekt, 'a[0].bc');
     * // => prawda
     *
     * console.log(obiekt);
     * // => { 'a': [{ 'b': {} }] };
     *
     * _.unset(obiekt, ['a', '0', 'b', 'c']);
     * // => prawda
     *
     * console.log(obiekt);
     * // => { 'a': [{ 'b': {} }] };
     */
    funkcja unset(obiekt, ścieżka) {
      zwróć obiekt == null ? true : baseUnset(obiekt, ścieżka);
    }

    /**
     * Ta metoda jest podobna do `_.set` z tą różnicą, że akceptuje `aktualizator` do tworzenia
     * wartość do ustawienia. Użyj `_.updateWith`, aby dostosować tworzenie ścieżki. „Aktualizator”
     * jest wywoływane z jednym argumentem: (wartość).
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.6.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do ustawienia.
     * @param {Function} updater Funkcja generująca zaktualizowaną wartość.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.update(object, 'a[0].bc', function(n) { return n * n; });
     * console.log(obiekt.a[0].bc);
     * // => 9
     *
     * _.update(object, 'x[0].yz', function(n) { return n ? n + 1 : 0; });
     * console.log(obiekt.x[0].yz);
     * // => 0
     */
    aktualizacja funkcji(obiekt, ścieżka, aktualizator) {
      zwróć obiekt == null ? obiekt : baseUpdate(obiekt, ścieżka, castFunction(aktualizator));
    }

    /**
     * Ta metoda jest podobna do `_.update` z wyjątkiem tego, że akceptuje `customizer`, którym jest
     * wywoływane w celu wytworzenia obiektów `path`. Jeśli `customizer` zwraca `undefined`
     * Zamiast tego tworzenie ścieżki jest obsługiwane przez metodę. Wywoływany jest `customizer`
     * z trzema argumentami: (nsValue, klucz, nsObject).
     *
     * **Uwaga:** Ta metoda mutuje „obiekt”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.6.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do modyfikacji.
     * @param {Array|string} ścieżka Ścieżka właściwości do ustawienia.
     * @param {Function} updater Funkcja generująca zaktualizowaną wartość.
     * @param {Funkcja} [customizer] Funkcja dostosowywania przypisanych wartości.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * var obiekt = {};
     *
     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
     * // => { '0': { '1': 'a' } }
     */
    function updateWith(obiekt, ścieżka, aktualizator, konfigurator) {
      Customizer = typ dostosowania == 'funkcja' ? konfigurator : niezdefiniowany;
      zwróć obiekt == null ? obiekt : baseUpdate (obiekt, ścieżka, castFunction (aktualizator), konfigurator);
    }

    /**
     * Tworzy tablicę własnych, wyliczalnych wartości własności z kluczem ciągu znaków `object`.
     *
     * **Uwaga:** Wartości niebędące obiektami są wymuszane na obiektach.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę wartości właściwości.
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.wartości(nowy Foo);
     * // => [1, 2] (kolejność iteracji nie jest gwarantowana)
     *
     * _.wartości('cześć');
     * // => ['h', 'i']
     */
    wartości funkcji (obiekt) {
      zwróć obiekt == null ? [] : baseValues(obiekt, klucze(obiekt));
    }

    /**
     * Tworzy tablicę własnych i dziedziczonych, wyliczalnych właściwości z kluczami łańcuchowymi
     * wartości „obiektu”.
     *
     * **Uwaga:** Wartości niebędące obiektami są wymuszane na obiektach.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Obiekt
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Array} Zwraca tablicę wartości właściwości.
     * @przykład
     *
     * funkcja Foo() {
     * to.a = 1;
     * to.b = 2;
     * }
     *
     * Foo.prototyp.c = 3;
     *
     * _.valuesIn(nowy Foo);
     * // => [1, 2, 3] (kolejność iteracji nie jest gwarantowana)
     */
    wartości funkcjiW(obiekt) {
      zwróć obiekt == null ? [] : baseValues(obiekt, klucze(obiekt));
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Zaciska „liczbę” w ramach „dolnej” i „górnej” granicy.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @numer kategorii
     * @param {number} number Numer do zaciśnięcia.
     * @param {liczba} [dolna] Dolna granica.
     * @param {liczba} upper Górna granica.
     * @returns {liczba} Zwraca zaciśniętą liczbę.
     * @przykład
     *
     * _.zacisk(-10, -5, 5);
     * // => -5
     *
     * _.zacisk(10, -5, 5);
     * // => 5
     */
    zacisk funkcji(liczba, dolna, górna) {
      if (górne === nieokreślone) {
        górny = dolny;
        niższy = nieokreślony;
      }
      if (górne !== niezdefiniowane) {
        górny = toNumber(górny);
        górny = górny === górny ? górna : 0;
      }
      if (niższe !== niezdefiniowane) {
        niższy = toNumber(niższy);
        niższy = niższy === niższy ? niższy : 0;
      }
      return baseClamp(toNumber(number), lower, upper);
    }

    /**
     * Sprawdza, czy `n` jest między `start` a up do, ale nie zawiera `end`. Jeśli
     * `end` nie jest określony, jest ustawiony na `start` z `start`, a następnie na `0`.
     * Jeśli `start` jest większe niż `end`, parametry są zamieniane na wsparcie
     * zakresy ujemne.
     *
     * @statyczny
     * @członkiem _
     * @od 3.3.0
     * @numer kategorii
     * @param {number} number Numer do sprawdzenia.
     * @param {liczba} [start=0] Początek zakresu.
     * @param {liczba} end Koniec zakresu.
     * @returns {boolean} Zwraca „true”, jeśli „liczba” jest w zakresie, w przeciwnym razie „false”.
     * @patrz _.range, _.rangeRight
     * @przykład
     *
     * _.inRange(3, 2, 4);
     * // => prawda
     *
     * _.inRange(4, 8);
     * // => prawda
     *
     * _.inRange(4, 2);
     * // => fałsz
     *
     * _.inRange(2, 2);
     * // => fałsz
     *
     * _.inRange(1.2, 2);
     * // => prawda
     *
     * _.inRange(5.2, 4);
     * // => fałsz
     *
     * _.inRange(-3, -2, -6);
     * // => prawda
     */
    function inRange(liczba, początek, koniec) {
      start = toFinite(start);
      if (koniec === niezdefiniowany) {
        koniec = początek;
        początek = 0;
      } w przeciwnym razie {
        koniec = toFinite(koniec);
      }
      liczba = toLiczba(liczba);
      return baseInRange(liczba, początek, koniec);
    }

    /**
     * Tworzy liczbę losową między dolną i górną granicą włącznie.
     * Jeśli podano tylko jeden argument, liczbę między `0` a podaną liczbą
     * jest zwracany. Jeśli „floating” jest „prawdą” lub „dolne” lub „górne” są
     * floats, zamiast liczby całkowitej zwracana jest liczba zmiennoprzecinkowa.
     *
     * **Uwaga:** JavaScript jest zgodny ze standardem IEEE-754 do rozwiązywania
     * wartości zmiennoprzecinkowe, które mogą dawać nieoczekiwane wyniki.
     *
     * @statyczny
     * @członkiem _
     * @od 0.7.0
     * @numer kategorii
     * @param {liczba} [lower=0] Dolna granica.
     * @param {liczba} [górna=1] Górna granica.
     * @param {boolean} [zmiennoprzecinkowy] Określa zwracanie liczby zmiennoprzecinkowej.
     * @returns {liczba} Zwraca liczbę losową.
     * @przykład
     *
     * _.losowy(0, 5);
     * // => liczba całkowita od 0 do 5
     *
     * _.losowy(5);
     * // => również liczba całkowita od 0 do 5
     *
     * _.losowy(5, prawda);
     * // => liczba zmiennoprzecinkowa od 0 do 5
     *
     * _.losowy(1.2, 5.2);
     * // => liczba zmiennoprzecinkowa od 1,2 do 5,2
     */
    funkcja losowa (dolna, górna, zmiennoprzecinkowa) {
      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating) {
        górny = zmiennoprzecinkowy = niezdefiniowany;
      }
      if (zmienne === niezdefiniowane) {
        if (typ górny == 'boolean') {
          pływający = górny;
          górny = nieokreślony;
        }
        else if (typeof lower == 'boolean') {
          pływający = niższy;
          niższy = nieokreślony;
        }
      }
      if (dolna === niezdefiniowana && górna === niezdefiniowana) {
        niższy = 0;
        górna = 1;
      }
      w przeciwnym razie {
        niższy = toFinite(niższy);
        if (górne === nieokreślone) {
          górny = dolny;
          niższy = 0;
        } w przeciwnym razie {
          górny = toFinite(górny);
        }
      }
      jeśli (dolny > górny) {
        var temp = niższa;
        dolny = górny;
        górna = temp;
      }
      jeśli (zmienne || dolne % 1 || górne % 1) {
        var rand = natywnaLosowa();
        return nativeMin(lower + (rand * (górne - dolne + freeParseFloat('1e-' + ((rand + '').length - 1)))), górne);
      }
      return baseLosowo(dolny, górny);
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Konwertuje `string` na [przypadek wielbłąda](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {string} Zwraca łańcuch wielkości liter wielbłąda.
     * @przykład
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar--');
     * // => 'fooBar'
     *
     * _.camelCase('__FOO_BAR__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(reult, word, index) {
      słowo = słowo.toLowerCase();
      zwróć wynik + (indeks ? wielkie litery(słowo) : słowo);
    });

    /**
     * Konwertuje pierwszy znak „ciągu” na wielkie litery, a pozostałe
     * małymi literami.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do pisania wielkimi literami.
     * @returns {ciąg} Zwraca ciąg pisany wielką literą.
     * @przykład
     *
     * _.capitalize('FRED');
     * // => 'Fred'
     */
    funkcja wielkie litery (ciąg) {
      return upperFirst(toString(string).toLowerCase());
    }

    /**
     * Gratuje „ciąg” poprzez konwersję
     * [Dodatek Latin-1](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * i [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
     * litery do podstawowych liter łacińskich i usuwanie
     * [łączenie znaków diakrytycznych](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do usunięcia zadziorów.
     * @returns {string} Zwraca usunięty zadzior.
     * @przykład
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    funkcja gratowania(ciąg) {
      ciąg = toString(ciąg);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Sprawdza, czy `string` kończy się podanym ciągiem docelowym.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do sprawdzenia.
     * @param {ciąg} [cel] Ciąg do wyszukania.
     * @param {liczba} [pozycja=ciąg.długość] Pozycja do przeszukania.
     * @returns {boolean} Zwraca `true` jeśli `string` kończy się `target`,
     * w przeciwnym razie `fałsz`.
     * @przykład
     *
     * _.endsWith('abc', 'c');
     * // => prawda
     *
     * _.endsWith('abc', 'b');
     * // => fałsz
     *
     * _.endsWith('abc', 'b', 2);
     * // => prawda
     */
    funkcja kończy sięZ(ciąg, cel, pozycja) {
      ciąg = toString(ciąg);
      cel = baseToString(cel);

      var length = string.length;
      pozycja = pozycja === niezdefiniowana
        ? długość
        : baseClamp(toInteger(pozycja), 0, długość);

      var koniec = pozycja;
      pozycja -= cel.długość;
      pozycja powrotu >= 0 && string.slice(pozycja, koniec) == cel;
    }

    /**
     * Konwertuje znaki "&", "<", ">", '"' i "'" w `string` na ich
     * odpowiednie encje HTML.
     *
     * **Uwaga:** żadne inne znaki nie są pomijane. Aby uciec od dodatkowych
     * postacie korzystają z biblioteki innej firmy, takiej jak [_he_](https://mths.be/he).
     *
     * Chociaż znak „>” jest zmieniany na symetrię, znaki takie jak
     * ">" i "/" nie wymagają zmiany znaczenia w HTML i nie mają specjalnego znaczenia
     * chyba że są one częścią tagu lub wartości atrybutu bez cudzysłowów. Widzieć
     * [Artykuł Mathiasa Bynensa](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (pod „częściowo związanym ciekawostką”) po więcej szczegółów.
     *
     * Podczas pracy z HTML zawsze powinieneś
     * [cytuj wartości atrybutów](http://wonko.com/post/html-escaping) w celu zmniejszenia
     * Wektory XSS.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg znaków do zmiany.
     * @returns {ciąg} Zwraca ciąg znaków ze znakami zmiany znaczenia.
     * @przykład
     *
     * _.escape('Fred, Barney i Kamyczki');
     * // => 'Fred, Barney, & kamyki
     */
    funkcja escape(ciąg) {
      ciąg = toString(ciąg);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : strunowy;
    }

    /**
     * Zmienia znaczenie znaków specjalnych `RegExp` „^”, „$”, „\", „.”, „*”, „+”,
     * "?", "(", ")", "[", "]", "{", "}" i "|" w „ciągu”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg znaków do zmiany.
     * @returns {ciąg} Zwraca ciąg znaków ze znakami zmiany znaczenia.
     * @przykład
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https://lodash\.com/\)'
     */
    function escapeRegExp(ciąg) {
      ciąg = toString(ciąg);
      return (string && reHasRegExpChar.test(string))
        ? string.replace(reRegExpChar, '\\$&')
        : strunowy;
    }

    /**
     * Konwertuje `ciąg` na
     * [przypadek kebaba](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {string} Zwraca łańcuch wielkości liter kebaba.
     * @przykład
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__FOO_BAR__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(reult, word, index) {
      zwróć wynik + (indeks ? '-' : '') + word.toLowerCase();
    });

    /**
     * Konwertuje „ciąg”, jako słowa oddzielone spacjami, na małe litery.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {ciąg} Zwraca ciąg pisany małymi literami.
     * @przykład
     *
     * _.lowerCase('--Foo-Bar--');
     * // => 'tabelka'
     *
     * _.lowerCase('fooBar');
     * // => 'tabelka'
     *
     * _.lowerCase('__FOO_BAR__');
     * // => 'tabelka'
     */
    var lowerCase = createCompounder(function(reult, word, index) {
      zwróć wynik + (indeks ? ' ' : '') + word.toLowerCase();
    });

    /**
     * Konwertuje pierwszy znak „ciągu” na małe litery.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {ciąg} Zwraca przekonwertowany ciąg.
     * @przykład
     *
     * _.lowerFirst('Fred');
     * // => 'Fred'
     *
     * _.lowerFirst('FRED');
     * // => 'fRED'
     */
    var lowerFirst = createCaseFirst('toLowerCase');

    /**
     * Podkładki „string” po lewej i prawej stronie, jeśli są krótsze niż „długość”.
     * Znaki dopełniające są obcinane, jeśli nie można ich równomiernie podzielić przez „długość”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do wypełnienia.
     * @param {liczba} [długość=0] Długość wypełnienia.
     * @param {ciąg} [chars=' '] Ciąg używany jako wypełnienie.
     * @returns {ciąg} Zwraca uzupełniony ciąg.
     * @przykład
     *
     * _.pad('abc', 8);
     * // => ' abc '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    funkcja pad(ciąg, długość, znaki) {
      ciąg = toString(ciąg);
      długość = toInteger(długość);

      var strLength = długość ? stringSize(ciąg) : 0;
      if (!długość || strLength >= długość) {
        ciąg zwrotny;
      }
      var mid = (długość - strLength) / 2;
      zwrócić (
        createPadding(nativeFloor(mid), chars) +
        ciąg +
        createPadding(nativeCeil(mid), znaki)
      );
    }

    /**
     * Podkładki `string` po prawej stronie, jeśli są one krótsze niż `długość`. Wyściółka
     * znaki są obcinane, jeśli przekraczają `długość`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do wypełnienia.
     * @param {liczba} [długość=0] Długość wypełnienia.
     * @param {ciąg} [chars=' '] Ciąg używany jako wypełnienie.
     * @returns {ciąg} Zwraca uzupełniony ciąg.
     * @przykład
     *
     * _.padEnd('abc', 6);
     * // => 'abc'
     *
     * _.padEnd('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padEnd('abc', 3);
     * // => 'abc'
     */
    function padEnd(ciąg, długość, znaki) {
      ciąg = toString(ciąg);
      długość = toInteger(długość);

      var strLength = długość ? stringSize(ciąg) : 0;
      powrót (długość && strLength < długość)
        ? (string + createPadding(length - strLength, chars))
        : strunowy;
    }

    /**
     * Podkładki `string` po lewej stronie, jeśli są krótsze niż `długość`. Wyściółka
     * znaki są obcinane, jeśli przekraczają `długość`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do wypełnienia.
     * @param {liczba} [długość=0] Długość wypełnienia.
     * @param {ciąg} [chars=' '] Ciąg używany jako wypełnienie.
     * @returns {ciąg} Zwraca uzupełniony ciąg.
     * @przykład
     *
     * _.padStart('abc', 6);
     * // => 'abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(ciąg, długość, znaki) {
      ciąg = toString(ciąg);
      długość = toInteger(długość);

      var strLength = długość ? stringSize(ciąg) : 0;
      return (długość && strLength < długość)
        ? (createPadding(length - strLength, chars) + string)
        : strunowy;
    }

    /**
     * Konwertuje `łańcuch` na liczbę całkowitą o określonej podstawie. Jeśli `podstawa` to
     * „undefined” lub „0”, stosowana jest „podstawa” równa „10”, chyba że „wartość” to
     * szesnastkowy, w którym to przypadku stosuje się „podstawę” wynoszącą „16”.
     *
     * **Uwaga:** Ta metoda jest zgodna z
     * [Implementacja ES5](https://es5.github.io/#x15.1.2.2) z `parseInt`.
     *
     * @statyczny
     * @członkiem _
     * @od 1.1.0
     * @kategoria Ciąg
     * @param {ciąg} ciąg Ciąg do konwersji.
     * @param {liczba} [radix=10] Podstawa, według której ma być interpretowana „wartość”.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {liczba} Zwraca przekonwertowaną liczbę całkowitą.
     * @przykład
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      if (strażnik || radix == null) {
        podstawa = 0;
      } inaczej if (podstawa) {
        podstawa = + podstawa;
      }
      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
    }

    /**
     * Powtarza podany ciąg `n` razy.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do powtórzenia.
     * @param {liczba} [n=1] Liczba powtórzeń ciągu.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {ciąg} Zwraca powtarzany ciąg.
     * @przykład
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n, guard) {
      if ((strażnik ? isIterateeCall(string, n, guard) : n === undefined)) {
        n = 1;
      } w przeciwnym razie {
        n = toInteger(n);
      }
      return baseRepeat(toString(string), n);
    }

    /**
     * Zastępuje dopasowania „pattern” w „string” na „replacement”.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [`String#replace`](https://mdn.io/String/replace).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do modyfikacji.
     * @param {RegExp|string} wzorzec Wzorzec do zastąpienia.
     * Zastąpienie @param {Function|string} Zastąpienie dopasowania.
     * @returns {ciąg} Zwraca zmodyfikowany ciąg.
     * @przykład
     *
     * _.replace('Cześć Fred', 'Fred', 'Barney');
     * // => 'Cześć Barney'
     */
    funkcja zamień() {
      var argumenty = argumenty,
          string = toString(args[0]);

      return args.length < 3 ? string : string.replace(args[1], args[2]);
    }

    /**
     * Konwertuje `ciąg` na
     * [sprawa węża](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {string} Zwraca łańcuch wielkości węża.
     * @przykład
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--FOO-BAR--');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(reult, word, index) {
      zwróć wynik + (indeks ? '_' : '') + word.toLowerCase();
    });

    /**
     * Dzieli „ciąg” przez „separator”.
     *
     * **Uwaga:** Ta metoda opiera się na
     * [`String#split`](https://mdn.io/String/split).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do podziału.
     * @param {RegExp|string} separator Wzorzec separatora do podziału.
     * @param {liczba} [limit] Długość do obcięcia wyników.
     * @returns {Array} Zwraca segmenty łańcucha.
     * @przykład
     *
     * _.split('abc', '-', 2);
     * // => ['a', 'b']
     */
    funkcja split(string, separator, limit) {
      if (limit && typ limitu != 'liczba' && isIterateeCall(ciąg, separator, limit)) {
        separator = limit = niezdefiniowany;
      }
      limit = limit === niezdefiniowany ? MAX_ARRAY_LENGTH : limit >>> 0;
      jeśli (!limit) {
        zwrócić [];
      }
      ciąg = toString(ciąg);
      if (ciąg && (
            typ separatora == 'ciąg' ||
            (separator != null && !isRegExp(separator))
          )) {
        separator = baseToString(separator);
        if (!separator && hasUnicode(ciąg)) {
          return castSlice(stringToArray(string), 0, limit);
        }
      }
      return string.split(separator, limit);
    }

    /**
     * Konwertuje `ciąg` na
     * [rozpocznij przypadek](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @statyczny
     * @członkiem _
     * @od 3.1.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {string} Zwraca początkowy łańcuch wielkości liter.
     * @przykład
     *
     * _.startCase('--foo-bar--');
     * // => 'Fo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Fo Bar'
     *
     * _.startCase('__FOO_BAR__');
     * // => 'FOO BAR'
     */
    var startCase = createCompounder(function(reult, word, index) {
      zwróć wynik + (indeks ? ' ' : '') + upperFirst(word);
    });

    /**
     * Sprawdza, czy `string` zaczyna się od podanego ciągu docelowego.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do sprawdzenia.
     * @param {ciąg} [cel] Ciąg do wyszukania.
     * @param {liczba} [pozycja=0] Pozycja wyszukiwania.
     * @returns {boolean} Zwraca `true` jeśli `string` zaczyna się od `target`,
     * w przeciwnym razie `fałsz`.
     * @przykład
     *
     * _.startsWith('abc', 'a');
     * // => prawda
     *
     * _.startsWith('abc', 'b');
     * // => fałsz
     *
     * _.startsWith('abc', 'b', 1);
     * // => prawda
     */
    function startedWith(string, target, position) {
      ciąg = toString(ciąg);
      pozycja = pozycja == null
        ? 0
        : baseClamp(toInteger(pozycja), 0, string.length);

      cel = baseToString(cel);
      return string.slice(pozycja, pozycja + target.length) == cel;
    }

    /**
     * Tworzy skompilowaną funkcję szablonu, która może interpolować właściwości danych
     * w ogranicznikach "interpolacja", interpolowane właściwości danych HTML-escape in
     * "unikaj" ograniczników i uruchamiaj JavaScript w ogranicznikach "oceniaj". Dane
     * właściwości mogą być dostępne jako wolne zmienne w szablonie. Jeśli ustawienie
     * podany jest obiekt, ma on pierwszeństwo przed wartościami `_.templateSettings`.
     *
     * **Uwaga:** W wersji rozwojowej wykorzystuje `_.template`
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * dla łatwiejszego debugowania.
     *
     * Aby uzyskać więcej informacji na temat wstępnego kompilowania szablonów, zobacz
     * [dokumentacja niestandardowych kompilacji Lodash](https://lodash.com/custom-builds).
     *
     * Aby uzyskać więcej informacji na temat piaskownic rozszerzeń Chrome, zobacz
     * [Dokumentacja rozszerzeń Chrome](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg szablonu.
     * @param {Obiekt} [opcje={}] Obiekt opcji.
     * @param {RegExp} [options.escape=_.templateSettings.escape]
     * Ogranicznik HTML "escape".
     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
     * Ogranicznik „oceniaj”.
     * @param {Obiekt} [options.imports=_.templateSettings.imports]
     * Obiekt do zaimportowania do szablonu jako wolne zmienne.
     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
     * Ogranicznik „interpolacji”.
     * @param {ciąg} [options.sourceURL='lodash.templateSources[n]']
     * SourceURL skompilowanego szablonu.
     * @param {ciąg} [options.variable='obj']
     * Nazwa zmiennej obiektu danych.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Funkcja} Zwraca skompilowaną funkcję szablonu.
     * @przykład
     *
     * // Użyj ogranicznika „interpolacja”, aby utworzyć skompilowany szablon.
     * var skompilowane = _.template('Witaj <%= użytkownik %>!');
     * skompilowany({ 'użytkownik': 'fred' });
     * // => 'witaj Fred!'
     *
     * // Użyj ogranicznika HTML "escape" do zmiany wartości właściwości danych.
     * var skompilowana = _.template('<b><%- wartość %></b>');
     * skompilowane({ 'wartość': '<skrypt>' });
     * // => '<b><script></b>'
     *
     * // Użyj ogranicznika "ocena", aby uruchomić JavaScript i wygenerować HTML.
     * var skompilowane = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * skompilowane({ 'users': ['fred', 'barney'] });
     * // => '<li>Fred</li><li>Barney</li>'
     *
     * // Użyj wewnętrznej funkcji `print` w ogranicznikach "oceniaj".
     * var skompilowane = _.template('<% print("cześć " + użytkownik); %>!');
     * skompilowany({ 'użytkownik': 'barney' });
     * // => 'witaj Barneyu!'
     *
     * // Użyj ogranicznika literału szablonu ES jako ogranicznika „interpolacji”.
     * // Wyłącz obsługę przez zastąpienie ogranicznika „interpolacja”.
     * var skompilowany = _.template('hello ${ user }!');
     * skompilowany({ 'użytkownik': 'kamyki' });
     * // => 'witaj kamyczki!'
     *
     * // Użyj odwrotnych ukośników, aby traktować ograniczniki jako zwykły tekst.
     * var skompilowane = _.template('<%= "\\<%- wartość %\\>" %>');
     * skompilowane({ 'wartość': 'ignorowane' });
     * // => '<%- wartość %>'
     *
     * // Użyj opcji `imports`, aby zaimportować `jQuery` jako `jq`.
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var skompilowane = _.template(text, { 'imports': { 'jq': jQuery } });
     * skompilowane({ 'users': ['fred', 'barney'] });
     * // => '<li>Fred</li><li>Barney</li>'
     *
     * // Użyj opcji `sourceURL`, aby określić niestandardowy sourceURL dla szablonu.
     * var compiled = _.template('hello <%= użytkownik %>!', { 'sourceURL': '/basic/greeting.jst' });
     * skompilowany(dane);
     * // => Znajdź źródło „greeting.jst” na karcie Źródła lub panelu Zasoby inspektora sieci.
     *
     * // Użyj opcji `variable`, aby upewnić się, że instrukcja with nie jest używana w skompilowanym szablonie.
     * var skompilowane = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * skompilowany.źródło;
     * // => funkcja(dane) {
     * // zmienna __t, __p = '';
     * // __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * // powrót __p;
     * // }
     *
     * // Użyj niestandardowych ograniczników szablonów.
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var skompilowany = _.template('hello {{ user }}!');
     * skompilowany({ 'użytkownik': 'wąsy' });
     * // => 'witaj wąsy!'
     *
     * // Użyj właściwości `source`, aby wstawić skompilowane szablony w celu uzyskania sensownego
     * // numery wierszy w komunikatach o błędach i śladach stosu.
     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
     * var JST = {\
     * "main": ' + _.template(mainText).source + '\
     * };\
     * ');
     */
    szablon funkcji(ciąg, opcje, strażnik) {
      // Na podstawie implementacji `tmpl` Johna Resiga
      // (http://ejohn.org/blog/javascript-micro-templating/)
      // i doT.js Laury Doktorovej (https://github.com/olado/doT).
      ustawienia var = lodash.templateSettings;

      if (ochrona && isIterateeCall(ciąg, opcje, strażnik)) {
        opcje = niezdefiniowane;
      }
      ciąg = toString(ciąg);
      options = assignInWith({}, opcje, ustawienia, customDefaultsAssignIn);

      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
          importsKeys = klucze(importy),
          importsValues ​​= baseValues(imports, importsKeys);

      var isEscape,
          jest ocenianie,
          indeks = 0,
          interpolacja = opcje.interpolacja || reNoMatch,
          źródło = "__p += '";

      // Skompiluj wyrażenie regularne, aby pasowało do każdego ogranicznika.
      var reDelimiters = Wyrażenie regularne (
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Użyj sourceURL, aby ułatwić debugowanie.
      // sourceURL jest wstrzykiwany do ewaluowanego źródła, więc bądź ostrożny
      // z wyszukiwaniem (w przypadku np. zanieczyszczenia prototypu) i usuwaniem nowych wierszy, jeśli są.
      // Nowy wiersz i tak nie byłby prawidłowym adresem URL źródłowym i umożliwiłby wstrzykiwanie kodu.
      var sourceURL = '//# sourceURL=' +
        (hasOwnProperty.call(opcje, 'sourceURL')
          ? (opcje.sourceURL + '').replace(/[\r\n]/g, ' ')
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluationValue, offset) {
        wartość interpolacji || (interpolateValue = esTemplateValue);

        // Znaki ucieczki, których nie można zawrzeć w literałach ciągu.
        źródło += string.slice(indeks, przesunięcie).replace(reUnescapedString, escapeStringChar);

        // Zastąp ograniczniki fragmentami.
        if (EscapeValue) {
          isEscaping = prawda;
          źródło += "' +\n__e(" + escapeValue + ") +\n'";
        }
        jeśli (ocena wartość) {
          isEvaluating = prawda;
          źródło += "';\n" + ocenaWartość + ";\n__p += '";
        }
        if (interpolateValue) {
          źródło += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        indeks = przesunięcie + dopasowanie.długość;

        // Silnik JS osadzony w produktach Adobe wymaga `match` zwróconego w
        // polecenie wytworzenia prawidłowej wartości `offset`.
        mecz zwrotny;
      });

      źródło += "';\n";

      // Jeśli `zmienna` nie jest określona, ​​zawiń instrukcję with wokół wygenerowanego
      // kod dodawania obiektu danych na początek łańcucha zasięgu.
      // Podobnie jak w przypadku sourceURL, dbamy o to, aby nie sprawdzać prototypu opcji,
      // ponieważ ta konfiguracja jest wektorem wstrzyknięcia kodu.
      var zmienna = hasOwnProperty.call(opcje, 'zmienna') && options.variable;
      jeśli (!zmienna) {
        źródło = 'z (obj) {\n' + źródło + '\n}\n';
      }
      // Oczyść kod, usuwając puste ciągi.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Kod ramki jako treść funkcji.
      źródło = 'funkcja(' + (zmienna || 'obj') + ') {\n' +
        (zmienny
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        „zmienna __t, __p = ''” +
        (jest ucieczką
           ? ', __e = _.escape'
           : ''
        ) +
        (oceniam
          ? ', __j = Tablica.prototype.join;\n' +
            "funkcja print() { __p += __j.call(argumenty, '') }\n"
          : ';\n'
        ) +
        źródło +
        'zwróć __p\n}';

      var wynik = próba(funkcja() {
        return Function(importsKeys, sourceURL + 'return ' + źródło)
          .apply(undefined, importsValues);
      });

      // Podaj źródło skompilowanej funkcji za pomocą metody `toString` lub
      // właściwość `source` jako udogodnienie przy wstawianiu skompilowanych szablonów.
      wynik.źródło = źródło;
      if (isError(wynik)) {
        rzut wynik;
      }
      zwróć wynik;
    }

    /**
     * Konwertuje `string` jako całość na małe litery, tak jak
     * [Ciąg#toLowerCase](https://mdn.io/toLowerCase).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {ciąg} Zwraca ciąg pisany małymi literami.
     * @przykład
     *
     * _.toLower('--Foo-Bar--');
     * // => '--foo-bar--'
     *
     * _.toLower('fooBar');
     * // => 'foobar'
     *
     * _.toLower('__FOO_BAR__');
     * // => '__foo_bar__'
     */
    funkcja do niższej(wartości) {
      return toString(wartość).toLowerCase();
    }

    /**
     * Konwertuje „ciąg znaków” jako całość na wielkie litery, tak jak
     * [Ciąg#toUpperCase](https://mdn.io/toUpperCase).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {ciąg} Zwraca ciąg pisany wielkimi literami.
     * @przykład
     *
     * _.toUpper('--foo-bar--');
     * // => '--FOO-BAR--'
     *
     * _.toUpper('fooBar');
     * // => 'FOOBAR'
     *
     * _.toUpper('__foo_bar__');
     * // => '__FOO_BAR__'
     */
    funkcja toGórna(wartość) {
      powrót doString(wartość).toUpperCase();
    }

    /**
     * Usuwa początkowe i końcowe spacje lub określone znaki z „ciągu”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do przycięcia.
     * @param {ciąg} [znaki=biała spacja] Znaki do przycięcia.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {ciąg} Zwraca przycięty ciąg.
     * @przykład
     *
     * _.trim(' abc ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['foo', 'bar'], _.trim);
     * // => ['foo', 'bar']
     */
    funkcja trim(string, chars, guard) {
      ciąg = toString(ciąg);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrim, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        ciąg zwrotny;
      }
      var strSymbols = stringToArray(ciąg),
          chrSymbols = stringToArray(znaki),
          start = charsStartIndex(strSymbols, chrSymbols),
          end = charsEndIndex(strSymbols, chrSymbols) + 1;

      return castSlice(strSymbols, start, end).join('');
    }

    /**
     * Usuwa końcowe spacje lub określone znaki z „ciągu”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do przycięcia.
     * @param {ciąg} [znaki=biała spacja] Znaki do przycięcia.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {ciąg} Zwraca przycięty ciąg.
     * @przykład
     *
     * _.trimEnd('abc');
     * // => 'abc'
     *
     * _.trimEnd('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimEnd(string, chars, guard) {
      ciąg = toString(ciąg);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimEnd, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        ciąg zwrotny;
      }
      var strSymbols = stringToArray(ciąg),
          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

      return castSlice(strSymbols, 0, end).join('');
    }

    /**
     * Usuwa wiodące białe znaki lub określone znaki z „ciągu”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do przycięcia.
     * @param {ciąg} [znaki=biała spacja] Znaki do przycięcia.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {ciąg} Zwraca przycięty ciąg.
     * @przykład
     *
     * _.trimStart('abc');
     * // => 'abc'
     *
     * _.trimStart('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    funkcja trimStart(ciąg, znaki, strażnik) {
      ciąg = toString(ciąg);
      if (string && (guard || chars === undefined)) {
        return string.replace(reTrimStart, '');
      }
      if (!string || !(chars = baseToString(chars))) {
        ciąg zwrotny;
      }
      var strSymbols = stringToArray(ciąg),
          start = charsStartIndex(strSymbols, stringToArray(chars));

      return castSlice(strSymbols, start).join('');
    }

    /**
     * Obcina `ciąg`, jeśli jest dłuższy niż podana maksymalna długość ciągu.
     * Ostatnie znaki skróconego ciągu są zastępowane pominięciem
     * ciąg, który domyślnie to "...".
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do skrócenia.
     * @param {Obiekt} [opcje={}] Obiekt opcji.
     * @param {liczba} [opcje.length=30] Maksymalna długość ciągu.
     * @param {ciąg} [options.omission='...'] Ciąg wskazujący tekst jest pominięty.
     * @param {RegExp|string} [opcje.separator] Wzorzec separatora do obcięcia.
     * @returns {ciąg} Zwraca obcięty ciąg.
     * @przykład
     *
     * _.truncate('hi-diddly-ho tam, sąsiedni');
     * // => 'hi-diddly-ho tam, sąsiedzku...'
     *
     * _.truncate('hi-diddly-ho tam, sąsiedzi', {
     * 'długość': 24,
     * 'separator': ' '
     * });
     * // => 'hi-diddly-ho tam,...'
     *
     * _.truncate('hi-diddly-ho tam, sąsiedzi', {
     * 'długość': 24,
     * 'separator': /,? +/
     * });
     * // => 'hi-diddly-ho tam...'
     *
     * _.truncate('hi-diddly-ho tam, sąsiedzi', {
     * 'pominięcie': ' [...]'
     * });
     * // => 'hi-diddly-ho tam, neig [...]'
     */
    function truncate(ciąg, opcje) {
      długość zmiennej = DEFAULT_TRUNC_LENGTH,
          pominięcie = DEFAULT_TRUNC_OMISSION;

      if (isObject(opcje)) {
        var separator = 'separator' w opcjach ? opcje.separator : separator;
        długość = 'długość' w opcjach ? toInteger(opcje.długość) : długość;
        pominięcie = 'pominięcie' w opcjach ? baseToString(opcje.pominięcie) : pominięcie;
      }
      ciąg = toString(ciąg);

      var strLength = string.length;
      if (ma Unicode(ciąg)) {
        var strSymbols = stringToArray(ciąg);
        strLength = strSymbols.length;
      }
      if (długość >= strLength) {
        ciąg zwrotny;
      }
      var end = length - stringSize(pominięcie);
      jeśli (koniec < 1) {
        pominięcie zwrotu;
      }
      var wynik = strSymbols
        ? castSlice(strSymbols, 0, end).join('')
        : string.slice(0, koniec);

      if (separator === niezdefiniowany) {
        zwróć wynik + pominięcie;
      }
      if (strSymbole) {
        koniec += (wynik.długość - koniec);
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var mecz,
              podciąg = wynik;

          jeśli (!separator.global) {
            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
          }
          separator.ostatniIndeks = 0;
          while ((match = separator.exec(substring))) {
            var newEnd = match.index;
          }
          wynik = wynik.wycinek(0, nowyKoniec === niezdefiniowany ? koniec : nowyKoniec);
        }
      } else if (string.indexOf(baseToString(separator), end) != end) {
        var index = wynik.lastIndexOf(separator);
        jeśli (indeks > -1) {
          wynik = wynik.wycinek(0, indeks);
        }
      }
      zwróć wynik + pominięcie;
    }

    /**
     * Odwrotność `_.escape`; ta metoda konwertuje encje HTML
     * `&`, `<`, `>`, ``` i `'` w `string` do
     * odpowiadające im znaki.
     *
     * **Uwaga:** Żadne inne encje HTML nie mają ucieczki. Aby uwolnić się od dodatkowych
     * Jednostki HTML korzystają z biblioteki innej firmy, takiej jak [_he_](https://mths.be/he).
     *
     * @statyczny
     * @członkiem _
     * @od 0.6.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do usunięcia.
     * @returns {ciąg} Zwraca ciąg znaków bez znaku ucieczki.
     * @przykład
     *
     * _.unescape('fred, barney, & kamyki');
     * // => 'Fred, Barney i Kamyczki'
     */
    funkcja unescape(ciąg) {
      ciąg = toString(ciąg);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : strunowy;
    }

    /**
     * Konwertuje „ciąg”, jako słowa oddzielone spacjami, na wielkie litery.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {ciąg} Zwraca ciąg pisany wielkimi literami.
     * @przykład
     *
     * _.upperCase('--foo-bar');
     * // => 'FOO BAR'
     *
     * _.upperCase('fooBar');
     * // => 'FOO BAR'
     *
     * _.upperCase('__foo_bar__');
     * // => 'FOO BAR'
     */
    var upperCase = createCompounder(function(reult, word, index) {
      zwróć wynik + (indeks ? ' ' : '') + word.toUpperCase();
    });

    /**
     * Konwertuje pierwszy znak „ciągu” na wielkie litery.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do konwersji.
     * @returns {ciąg} Zwraca przekonwertowany ciąg.
     * @przykład
     *
     * _.upperFirst('red');
     * // => 'Fred'
     *
     * _.upperFirst('FRED');
     * // => 'FRED'
     */
    var upperFirst = createCaseFirst('toUpperCase');

    /**
     * Dzieli `string` na tablicę jego słów.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Ciąg
     * @param {ciąg} [ciąg=''] Ciąg do sprawdzenia.
     * @param {RegExp|string} [wzór] Wzorzec do dopasowania słów.
     * @param- {Object} [strażnik] Włącza użycie jako iterate dla metod takich jak `_.map`.
     * @returns {Array} Zwraca słowa `string`.
     * @przykład
     *
     * _.words('fred, barney i kamyki');
     * // => ['fred', 'barney', 'kamyki']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'kamyki']
     */
    słowa funkcyjne (ciąg, wzorzec, strażnik) {
      ciąg = toString(ciąg);
      wzór = strażnik ? niezdefiniowany : wzór;

      if (wzór === niezdefiniowany) {
        return hasUnicodeWord(string) ? unicodeWords(ciąg) : asciiWords(ciąg);
      }
      return string.match(pattern) || [];
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Próbuje wywołać `func`, zwracając wynik lub przechwycony błąd
     * obiekt. Wszelkie dodatkowe argumenty są dostarczane do funkcji `func` w momencie jej wywołania.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Util
     * @param {Funkcja} func Funkcja do wykonania.
     * @param {...*} [argumenty] Argumenty do wywołania funkcji `func`.
     * @returns {*} Zwraca wynik `func` lub obiekt błędu.
     * @przykład
     *
     * // Unikaj zgłaszania błędów dla nieprawidłowych selektorów.
     * var elementy = _.attempt(function(selector) {
     * zwróć document.querySelectorAll(selektor);
     * }, '>_>');
     *
     * if (_.isError(elementy)) {
     * elementy = [];
     * }
     */
    var próba = baseRest(function(func, args) {
      próbować {
        return zastosuj(func, undefined, args);
      } złapać (e) {
        return isError(e) ? e : nowy błąd(e);
      }
    });

    /**
     * Wiąże metody obiektu z samym obiektem, nadpisując istniejące
     * metoda.
     *
     * **Uwaga:** Ta metoda nie ustawia właściwości „length” powiązanych funkcji.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Util
     * @param {Object} obiekt Obiekt do powiązania i przypisania do niego powiązanych metod.
     * @param {...(string|string[])} methodNames Nazwy metod obiektów do powiązania.
     * @returns {Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * var widok = {
     * 'etykieta': 'dokumenty',
     * 'klik': funkcja() {
     * console.log('kliknięty' + this.label);
     * }
     * };
     *
     * _.bindAll(widok, ['klik']);
     * jQuery(element).on('klik', widok.klik);
     * // => Rejestruje „kliknięte dokumenty” po kliknięciu.
     */
    var bindAll = flatRest(function(object, methodNames) {
      arrayEach(methodNames, function(key) {
        klucz = doKlucz(klucz);
        baseAssignValue(obiekt, klucz, bind(obiekt[klucz], obiekt));
      });
      obiekt zwrotny;
    });

    /**
     * Tworzy funkcję, która iteruje po `parach` i wywołuje odpowiednią
     * funkcja pierwszego predykatu do zwrócenia prawdziwości. Funkcja predykatu
     * pary są wywoływane z `this` wiązaniem i argumentami utworzonego
     * funkcja.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * Pary @param {Array} Pary predykat-funkcja.
     * @returns {Funkcja} Zwraca nową funkcję złożoną.
     * @przykład
     *
     * var func = _.cond([
     * [_.matches({ 'a': 1 }), _.constant('pasuje A')],
     * [_.conforms({ 'b': _.isNumber }), _.constant('pasuje do B')],
     * [_.stubTrue, _.constant('brak dopasowania')]
     * ]);
     *
     * func({ 'a': 1, 'b': 2 });
     * // => 'pasuje do A'
     *
     * func({ 'a': 0, 'b': 1 });
     * // => 'pasuje do B'
     *
     * func({ 'a': '1', 'b': '2' });
     * // => 'brak dopasowania'
     */
    funkcja cond(pary) {
      var length = pairs == null ? 0 : pary.długość,
          toIteratee = getIteratee();

      pary = !długość ? [] : arrayMap(pary, funkcja(para) {
        if (typ pary[1] != 'funkcja') {
          wyrzuć nowy TypeError(FUNC_ERROR_TEXT);
        }
        return [doIteracji(para[0]), para[1]];
      });

      return baseRest(function(args) {
        indeks zmiennej = -1;
        while (++indeks < długość) {
          var para = pary[indeks];
          if (apply(pair[0], this, args)) {
            return zastosuj(para[1], this, args);
          }
        }
      });
    }

    /**
     * Tworzy funkcję, która wywołuje właściwości predykatu `source` with
     * odpowiednie wartości właściwości danego obiektu, zwracając `true` if
     * wszystkie predykaty zwracają prawdę, w przeciwnym razie `false`.
     *
     * **Uwaga:** Utworzona funkcja jest odpowiednikiem `_.conformsTo` with
     * Częściowo zastosowane `źródło`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * @param {Object} źródło Obiekt właściwości predykatów ma być zgodny.
     * @returns {Funkcja} Zwraca nową funkcję spec.
     * @przykład
     *
     * var obiekty = [
     * { 'a': 2, 'b': 1 },
     * { 'a': 1, 'b': 2 }
     * ];
     *
     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
     * // => [{ 'a': 1, 'b': 2 }]
     */
    funkcja jest zgodna(źródło) {
      return baseConforms(baseClone(źródło, CLONE_DEEP_FLAG));
    }

    /**
     * Tworzy funkcję, która zwraca `wartość`.
     *
     * @statyczny
     * @członkiem _
     * @od 2.4.0
     * @kategoria Util
     * @param {*} wartość Wartość do zwrócenia z nowej funkcji.
     * @returns {Funkcja} Zwraca nową stałą funkcję.
     * @przykład
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(obiekty);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => prawda
     */
    funkcja stała(wartość) {
      funkcja powrotu () {
        wartość zwrotu;
      };
    }

    /**
     * Sprawdza `wartość`, aby określić, czy wartość domyślna powinna zostać zwrócona w
     * jego miejsce. Wartość „defaultValue” jest zwracana, jeśli „value” to „NaN”, „null”,
     * lub „nieokreślony”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.14.0
     * @kategoria Util
     * @param {*} wartość Wartość do sprawdzenia.
     * @param {*} defaultValue Wartość domyślna.
     * @returns {*} Zwraca rozwiązaną wartość.
     * @przykład
     *
     * _.defaultTo(1, 10);
     * // => 1
     *
     * _.defaultTo(niezdefiniowane, 10);
     * // => 10
     */
    function defaultTo(value, defaultValue) {
      return (wartość == null || wartość !== wartość) ? wartość domyślna : wartość;
    }

    /**
     * Tworzy funkcję, która zwraca wynik wywołania podanych funkcji
     * z `tym` wiązaniem utworzonej funkcji, gdzie każdy kolejny
     * wywołanie jest dostarczana zwróconą wartością poprzedniego.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Util
     * @param {...(Function|Function[])} [funcs] Funkcje do wywołania.
     * @returns {Funkcja} Zwraca nową funkcję złożoną.
     * @zobacz _.flowRight
     * @przykład
     *
     * kwadrat funkcji (n) {
     * powrót n * n;
     * }
     *
     * var addSquare = _.flow([_.add, square]);
     * dodajKwadrat (1, 2);
     * // => 9
     */
    var przepływ = createFlow();

    /**
     * Ta metoda jest podobna do `_.flow` z tą różnicą, że tworzy funkcję, która
     * wywołuje podane funkcje od prawej do lewej.
     *
     * @statyczny
     * @od 3.0.0
     * @członkiem _
     * @kategoria Util
     * @param {...(Function|Function[])} [funcs] Funkcje do wywołania.
     * @returns {Funkcja} Zwraca nową funkcję złożoną.
     * @zobacz _.flow
     * @przykład
     *
     * kwadrat funkcji (n) {
     * powrót n * n;
     * }
     *
     * var addSquare = _.flowRight([kwadrat, _.add]);
     * dodajKwadrat (1, 2);
     * // => 9
     */
    var flowRight = createFlow(prawda);

    /**
     * Ta metoda zwraca pierwszy otrzymany argument.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Util
     * @param {*} wartość Dowolna wartość.
     * @returns {*} Zwraca `wartość`.
     * @przykład
     *
     * var obiekt = { 'a': 1 };
     *
     * console.log(_.identity(object) === obiekt);
     * // => prawda
     */
    tożsamość funkcji (wartość) {
      wartość zwrotu;
    }

    /**
     * Tworzy funkcję, która wywołuje `func` z argumentami utworzonego
     * funkcja. Jeśli `func` jest nazwą właściwości, utworzona funkcja zwraca
     * wartość właściwości dla danego elementu. Jeśli `func` jest tablicą lub obiektem,
     * utworzona funkcja zwraca `true` dla elementów zawierających odpowiednik
     * właściwości źródła, w przeciwnym razie zwraca `false`.
     *
     * @statyczny
     * @od 4.0.0
     * @członkiem _
     * @kategoria Util
     * @param {*} [func=_.identity] Wartość do konwersji na wywołanie zwrotne.
     * @returns {Funkcja} Zwraca callback.
     * @przykład
     *
     * var użytkowników = [
     * { 'użytkownik': 'barney', 'wiek': 36, 'aktywny': prawda },
     * { 'użytkownik': 'fred', 'wiek': 40, 'aktywny': fałsz }
     * ];
     *
     * // Skrócona wersja iteracji `_.matches`.
     * _.filter(users, _.iteratee({ 'użytkownik': 'barney', 'aktywny': prawda }));
     * // => [{ 'użytkownik': 'barney', 'wiek': 36, 'aktywny': prawda }]
     *
     * // Skrócona wersja iteracji `_.matchesProperty`.
     * _.filter(użytkownicy, _.iteratee(['użytkownik', 'fred']));
     * // => [{ 'użytkownik': 'fred', 'wiek': 40 }]
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.map(użytkownicy, _.iteratee('użytkownik'));
     * // => ['Barney', 'Fred']
     *
     * // Tworzenie własnych skrótów iteracyjnych.
     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
     * return !_.isRegExp(func) ? iteratee(func) : function(string) {
     * zwróć func.test(ciąg);
     * };
     * });
     *
     * _.filter(['abc', 'def'], /ef/);
     * // => ['def']
     */
    iteracja funkcji (funkcja) {
      return baseIteratee(typeof func == 'funkcja'? func : baseClone(func, CLONE_DEEP_FLAG));
    }

    /**
     * Tworzy funkcję, która wykonuje częściowe głębokie porównanie między danym
     * obiekt i `źródło`, zwracające `true` jeśli dany obiekt ma odpowiednik
     * wartości właściwości, w przeciwnym razie `false`.
     *
     * **Uwaga:** Utworzona funkcja jest odpowiednikiem `_.isMatch` z `source`
     * częściowo zastosowane.
     *
     * Częściowe porównania dopasują pustą tablicę i pusty obiekt `źródło`
     * wartości odpowiednio w stosunku do dowolnej wartości tablicy lub obiektu. Zobacz `_.isEqual`
     * lista obsługiwanych porównań wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Util
     * @param {Object} source Obiekt wartości właściwości do dopasowania.
     * @returns {Funkcja} Zwraca nową funkcję spec.
     * @przykład
     *
     * var obiekty = [
     * { 'a': 1, 'b': 2, 'c': 3 },
     * { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.filter(obiekty, _.matches({ 'a': 4, 'c': 6 }));
     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
     */
    funkcja pasuje(źródło) {
      zwróć baseMatches(baseClone(źródło, CLONE_DEEP_FLAG));
    }

    /**
     * Tworzy funkcję, która wykonuje częściowe głębokie porównanie między
     * wartość w `ścieżce` danego obiektu do `srcValue`, zwracając `true` jeśli
     * wartość obiektu jest równoważna, w przeciwnym razie `false`.
     *
     * **Uwaga:** Częściowe porównania dopasują pustą tablicę i pusty obiekt
     * Wartości `srcValue` odpowiednio względem dowolnej wartości tablicy lub obiektu. Widzieć
     * `_.isEqual` dla listy obsługiwanych porównań wartości.
     *
     * @statyczny
     * @członkiem _
     * @od 3.2.0
     * @kategoria Util
     * @param {Array|string} ścieżka Ścieżka właściwości do pobrania.
     * @param {*} srcValue Wartość do dopasowania.
     * @returns {Funkcja} Zwraca nową funkcję spec.
     * @przykład
     *
     * var obiekty = [
     * { 'a': 1, 'b': 2, 'c': 3 },
     * { 'a': 4, 'b': 5, 'c': 6 }
     * ];
     *
     * _.find(obiekty, _.matchesProperty('a', 4));
     * // => { 'a': 4, 'b': 5, 'c': 6 }
     */
    function matchingProperty(path, srcValue) {
      return baseMatchesProperty(ścieżka, baseClone(srcValue, CLONE_DEEP_FLAG));
    }

    /**
     * Tworzy funkcję, która wywołuje metodę na `ścieżce` danego obiektu.
     * Wszelkie dodatkowe argumenty są dostarczane do wywoływanej metody.
     *
     * @statyczny
     * @członkiem _
     * @od 3.7.0
     * @kategoria Util
     * @param {Array|string} ścieżka Ścieżka metody do wywołania.
     * @param {...*} [argumenty] Argumenty do wywołania metody.
     * @returns {Funkcja} Zwraca nową funkcję wywołującą.
     * @przykład
     *
     * var obiekty = [
     * { 'a': { 'b': _.constant(2) } },
     * { 'a': { 'b': _.constant(1) } }
     * ];
     *
     * _.map(obiekty, _.method('ab'));
     * // => [2, 1]
     *
     * _.map(obiekty, _.metoda(['a', 'b']));
     * // => [2, 1]
     */
    var method = baseRest(function(path, args) {
      funkcja powrotu (obiekt) {
        return baseInvoke(obiekt, ścieżka, argumenty);
      };
    });

    /**
     * Przeciwieństwo `_.method`; ta metoda tworzy funkcję, która wywołuje
     * metoda na podanej ścieżce `object`. Wszelkie dodatkowe argumenty to
     * podane do wywołanej metody.
     *
     * @statyczny
     * @członkiem _
     * @od 3.7.0
     * @kategoria Util
     * @param {Object} obiekt Obiekt do zapytania.
     * @param {...*} [argumenty] Argumenty do wywołania metody.
     * @returns {Funkcja} Zwraca nową funkcję wywołującą.
     * @przykład
     *
     * var array = _.times(3, _.constant),
     * obiekt = { 'a': tablica, 'b': tablica, 'c': tablica };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = baseRest(function(object, args) {
      funkcja powrotu (ścieżka) {
        return baseInvoke(obiekt, ścieżka, argumenty);
      };
    });

    /**
     * Dodaje wszystkie własne, przeliczalne właściwości funkcji z kluczem łańcuchowym źródła
     * obiekt do obiektu docelowego. Jeśli `object` jest funkcją, to metody
     * są również dodawane do jego prototypu.
     *
     * **Uwaga:** Użyj `_.runInContext`, aby utworzyć nieskazitelną funkcję `lodash`, aby
     * unikaj konfliktów spowodowanych modyfikacją oryginału.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Util
     * @param {Funkcja|Obiekt} [object=lodash] Obiekt docelowy.
     * @param {Object} source Obiekt funkcji do dodania.
     * @param {Obiekt} [opcje={}] Obiekt opcji.
     * @param {boolean} [options.chain=true] Określ, czy domieszki można łączyć w łańcuchy.
     * @returns {Funkcja|Obiekt} Zwraca `obiekt`.
     * @przykład
     *
     * samogłoski funkcyjne (ciąg) {
     * return _.filter(string, function(v) {
     * zwróć /[aeiou]/i.test(v);
     * });
     * }
     *
     * _.mixin({ 'samogłoski': samogłoski });
     * _.vowels('red');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'samogłoski': samogłoski }, { 'łańcuch': fałsz });
     * _('Fred').samogłoski();
     * // => ['e']
     */
    funkcja mixin(obiekt, źródło, opcje) {
      var props = klucze(źródło),
          MethodNames = baseFunctions(źródło, rekwizyty);

      if (opcje == null &&
          !(isObject(source) && (methodNames.length || !props.length))) {
        opcje = źródło;
        źródło = obiekt;
        obiekt = to;
        MethodNames = baseFunctions(źródło, klucze(źródło));
      }
      var chain = !(isObject(opcje) && 'łańcuch' w opcjach) || !!opcje.łańcuch,
          isFunc = isFunction(obiekt);

      arrayEach(nazwametody, function(nazwametody) {
        var func = źródło[nazwametody];
        obiekt[nazwametody] = func;
        jeśli (isFunc) {
          object.prototype[nazwaMetody] = function() {
            var chainAll = this.__chain__;
            if (łańcuch || łańcuchWszystko) {
              var wynik = obiekt(this.__wrapped__),
                  akcje = wynik.__działania__ = kopia tablica(to.__działania__);

              actions.push({ 'func': func, 'args': argumenty, 'thisArg': obiekt });
              wynik.__łańcuch__ = łańcuchWszystko;
              zwróć wynik;
            }
            return func.apply(object, arrayPush([ta.wartość()], argumenty));
          };
        }
      });

      obiekt zwrotny;
    }

    /**
     * Przywraca poprzednią wartość zmiennej `_` i zwraca odwołanie do
     * funkcja „lodash”.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Util
     * @returns {Funkcja} Zwraca funkcję `lodash`.
     * @przykład
     *
     * var lodash = _.noConflict();
     */
    funkcja brak konfliktu () {
      jeśli (root._ === to) {
        root._ = staryDash;
      }
      zwróć to;
    }

    /**
     * Ta metoda zwraca `undefined`.
     *
     * @statyczny
     * @członkiem _
     * @od 2.3.0
     * @kategoria Util
     * @przykład
     *
     * _.razy(2, _.noop);
     * // => [nieokreślony, nieokreślony]
     */
    funkcja noop() {
      // Nie wykonano żadnej operacji.
    }

    /**
     * Tworzy funkcję, która pobiera argument o indeksie `n`. Jeśli `n` jest ujemne,
     * zwracany jest n-ty argument od końca.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * @param {liczba} [n=0] Indeks argumentu do zwrócenia.
     * @returns {Funkcja} Zwraca nową funkcję przekazującą.
     * @przykład
     *
     * var func = _.nthArg(1);
     * func('a', 'b', 'c', 'd');
     * // => 'b'
     *
     * var func = _.nthArg(-2);
     * func('a', 'b', 'c', 'd');
     * // => 'c'
     */
    funkcja nthArg(n) {
      n = toInteger(n);
      return baseRest(function(args) {
        return baseNth(args, n);
      });
    }

    /**
     * Tworzy funkcję, która wywołuje `iteracje` z otrzymanymi argumentami
     * i zwraca ich wyniki.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * @param {...(Funkcja|Funkcja[])} [iterates=[_.identity]]
     * Iteracje do wywołania.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * var func = _.over([Math.max, Math.min]);
     *
     * func(1, 2, 3, 4);
     * // => [4, 1]
     */
    var over = createOver(arrayMap);

    /**
     * Tworzy funkcję, która sprawdza, czy **wszystkie** z `predykatów` zwracają
     * prawdziwe, gdy jest przywoływane z otrzymanymi argumentami.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * @param {...(Funkcja|Funkcja[])} [predykaty=[_.identity]]
     * Predykaty do sprawdzenia.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * var func = _.overEvery([Boolean, isFinite]);
     *
     * funkcja('1');
     * // => prawda
     *
     * func(null);
     * // => fałsz
     *
     * func(NaN);
     * // => fałsz
     */
    var overEvery = utwórzOver(tablicaKażdy);

    /**
     * Tworzy funkcję, która sprawdza, czy **jakiś** zwrot `predykatów`
     * prawdziwe, gdy jest przywoływane z otrzymanymi argumentami.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * @param {...(Funkcja|Funkcja[])} [predykaty=[_.identity]]
     * Predykaty do sprawdzenia.
     * @returns {Funkcja} Zwraca nową funkcję.
     * @przykład
     *
     * var func = _.overSome([Boolean, isFinite]);
     *
     * funkcja('1');
     * // => prawda
     *
     * func(null);
     * // => prawda
     *
     * func(NaN);
     * // => fałsz
     */
    var overSome = utwórzOver(arraySome);

    /**
     * Tworzy funkcję, która zwraca wartość w `ścieżce` danego obiektu.
     *
     * @statyczny
     * @członkiem _
     * @od 2.4.0
     * @kategoria Util
     * @param {Array|string} ścieżka Ścieżka właściwości do pobrania.
     * @returns {Funkcja} Zwraca nową funkcję akcesora.
     * @przykład
     *
     * var obiekty = [
     * { 'a': { 'b': 2 } },
     * { 'a': { 'b': 1 } }
     * ];
     *
     * _.map(obiekty, _.property('ab'));
     * // => [2, 1]
     *
     * _.map(_.sortBy(obiekty, _.property(['a', 'b'])), 'ab');
     * // => [1, 2]
     */
    właściwość funkcji (ścieżka) {
      return isKey(ścieżka) ? baseProperty(toKey(ścieżka)) : basePropertyDeep(ścieżka);
    }

    /**
     * Przeciwieństwo `_.property`; ta metoda tworzy funkcję, która zwraca
     * wartość w podanej ścieżce `object`.
     *
     * @statyczny
     * @członkiem _
     * @od 3.0.0
     * @kategoria Util
     * @param {Object} obiekt Obiekt do zapytania.
     * @returns {Funkcja} Zwraca nową funkcję akcesora.
     * @przykład
     *
     * tablica var = [0, 1, 2],
     * obiekt = { 'a': tablica, 'b': tablica, 'c': tablica };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      funkcja powrotu (ścieżka) {
        zwróć obiekt == null ? undefined : baseGet(obiekt, ścieżka);
      };
    }

    /**
     * Tworzy tablicę liczb (dodatnich i/lub ujemnych) od
     * `start` do, ale nie wliczając `end`. Krok `-1` jest używany, jeśli ujemna
     * `start` jest określony bez `end` lub `step`. Jeśli `end` nie jest określony,
     * jest ustawiony na `start` z `start`, a następnie ustawiony na `0`.
     *
     * **Uwaga:** JavaScript jest zgodny ze standardem IEEE-754 do rozwiązywania
     * wartości zmiennoprzecinkowe, które mogą dawać nieoczekiwane wyniki.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Util
     * @param {liczba} [start=0] Początek zakresu.
     * @param {liczba} end Koniec zakresu.
     * @param {liczba} [krok=1] Wartość, o którą należy zwiększyć lub zmniejszyć.
     * @returns {Array} Zwraca zakres liczb.
     * @patrz _.inRange, _.rangeRight
     * @przykład
     *
     * _.zakres(4);
     * // => [0, 1, 2, 3]
     *
     * _.zakres(-4);
     * // => [0, -1, -2, -3]
     *
     * _.zakres (1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.zakres (0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.zakres (0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.zakres (1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.zakres(0);
     * // => []
     */
    var zakres = utwórzZakres();

    /**
     * Ta metoda jest podobna do `_.range` z tym wyjątkiem, że wypełnia wartości w
     * Kolejność malejąca.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * @param {liczba} [start=0] Początek zakresu.
     * @param {liczba} end Koniec zakresu.
     * @param {liczba} [krok=1] Wartość, o którą należy zwiększyć lub zmniejszyć.
     * @returns {Array} Zwraca zakres liczb.
     * @patrz _.inRange, _.range
     * @przykład
     *
     * _.rangeRight(4);
     * // => [3, 2, 1, 0]
     *
     * _.rangeRight(-4);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1,5);
     * // => [4, 3, 2, 1]
     *
     * _.rangeRight(0, 20, 5);
     * // => [15, 10, 5, 0]
     *
     * _.rangeRight(0, -4, -1);
     * // => [-3, -2, -1, 0]
     *
     * _.rangeRight(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.rangeRight(0);
     * // => []
     */
    var zakresPrawo = tworzenieZakres(prawda);

    /**
     * Ta metoda zwraca nową pustą tablicę.
     *
     * @statyczny
     * @członkiem _
     * @od 4.13.0
     * @kategoria Util
     * @returns {Array} Zwraca nową pustą tablicę.
     * @przykład
     *
     * tablice var = _.times(2, _.stubArray);
     *
     * console.log(tablice);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => fałsz
     */
    funkcja stubArray() {
      zwrócić [];
    }

    /**
     * Ta metoda zwraca `false`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.13.0
     * @kategoria Util
     * @returns {boolean} Zwraca `false`.
     * @przykład
     *
     * _.razy(2, _.stubFalse);
     * // => [fałsz, fałsz]
     */
    funkcja stubFalse() {
      zwróć fałsz;
    }

    /**
     * Ta metoda zwraca nowy pusty obiekt.
     *
     * @statyczny
     * @członkiem _
     * @od 4.13.0
     * @kategoria Util
     * @returns {Obiekt} Zwraca nowy pusty obiekt.
     * @przykład
     *
     * var obiekty = _.times(2, _.stubObject);
     *
     * console.log(obiekty);
     * // => [{}, {}]
     *
     * console.log(objects[0] === objects[1]);
     * // => fałsz
     */
    funkcja stubObject() {
      zwrócić {};
    }

    /**
     * Ta metoda zwraca pusty ciąg.
     *
     * @statyczny
     * @członkiem _
     * @od 4.13.0
     * @kategoria Util
     * @returns {ciąg} Zwraca pusty ciąg.
     * @przykład
     *
     * _.times(2, _.stubString);
     * // => ['', '']
     */
    funkcja stubString() {
      zwrócić '';
    }

    /**
     * Ta metoda zwraca `true`.
     *
     * @statyczny
     * @członkiem _
     * @od 4.13.0
     * @kategoria Util
     * @returns {boolean} Zwraca „prawda”.
     * @przykład
     *
     * _.razy(2, _.stubTrue);
     * // => [prawda, prawda]
     */
    funkcja stubTrue() {
      zwróć prawdę;
    }

    /**
     * Wywołuje iterację `n` razy, zwracając tablicę wyników
     * każde wezwanie. Iterat jest wywoływany z jednym argumentem; (indeks).
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Util
     * @param {liczba} n Ile razy wywołać `iterację`.
     * @param {Funkcja} [iteratee=_.identity] Funkcja wywoływana na iterację.
     * @returns {Array} Zwraca tablicę wyników.
     * @przykład
     *
     * _.times(3, ciąg);
     * // => ['0', '1', '2']
     *
     * _.razy(4, _.constant(0));
     * // => [0, 0, 0, 0]
     */
    funkcja razy(n, iteracja) {
      n = toInteger(n);
      if (n < 1 || n > MAX_SAFE_INTEGER) {
        zwrócić [];
      }
      indeks zmiennej = MAX_ARRAY_LENGTH,
          długość = natywnyMin(n, MAX_ARRAY_LENGTH);

      iteracja = getIteratee(iteracja);
      n -= MAX_ARRAY_LENGTH;

      var wynik = baseTimes(długość, iteracja);
      while (++indeks < n) {
        iterowany(indeks);
      }
      zwróć wynik;
    }

    /**
     * Konwertuje `wartość` na tablicę ścieżek właściwości.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Util
     * @param {*} wartość Wartość do konwersji.
     * @returns {Array} Zwraca nową tablicę ścieżki właściwości.
     * @przykład
     *
     * _.toPath('abc');
     * // => ['a', 'b', 'c']
     *
     * _.toPath('a[0].bc');
     * // => ['a', '0', 'b', 'c']
     */
    funkcja toŚcieżka(wartość) {
      if (jestArray(wartość)) {
        return arrayMap(wartość, toKey);
      }
      return isSymbol(wartość) ? [wartość] : copyArray(stringToPath(toString(value)));
    }

    /**
     * Generuje unikalny identyfikator. Jeśli podano „prefiks”, dołączany jest do niego identyfikator.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Util
     * @param {string} [prefix=''] Wartość przedrostka identyfikatora.
     * @returns {string} Zwraca unikalny identyfikator.
     * @przykład
     *
     * _.uniqueId('kontakt_');
     * // => 'kontakt_104'
     *
     * _.unikalny identyfikator();
     * // => '105'
     */
    function uniqueId (prefiks) {
      id zmiennej = ++licznik id;
      return toString(prefix) + id;
    }

    /*------------------------------------------------ ------------------------*/

    /**
     * Dodaje dwie liczby.
     *
     * @statyczny
     * @członkiem _
     * @od 3.4.0
     * @kategoria Matematyka
     * @param {liczba} augend Pierwsza liczba w dodatku.
     * @param {number} addend Druga liczba w dodatku.
     * @returns {liczba} Zwraca sumę.
     * @przykład
     *
     * _.dodaj(6, 4);
     * // => 10
     */
    var add = createMathOperation(function(augend, addend) {
      powrót augend + dodatek;
    }, 0);

    /**
     * Oblicza „liczbę” zaokrągloną w górę do „precyzji”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.10.0
     * @kategoria Matematyka
     * @param {number} number Liczba do zaokrąglenia w górę.
     * @param {liczba} [precyzja=0] Dokładność do zaokrąglenia w górę.
     * @returns {liczba} Zwraca zaokrągloną liczbę.
     * @przykład
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6,01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = utwórzRound('ceil');

    /**
     * Podziel dwie liczby.
     *
     * @statyczny
     * @członkiem _
     * @od 4.7.0
     * @kategoria Matematyka
     * @param {liczba} dywidenda Pierwsza liczba w dzieleniu.
     * @param {liczba} dzielnik Druga liczba w dzieleniu.
     * @returns {liczba} Zwraca iloraz.
     * @przykład
     *
     * _.podziel(6, 4);
     * // => 1,5
     */
    var divide = createMathOperation(function(dividend,divisor) {
      zwrot dywidendy / dzielnik;
    }, 1);

    /**
     * Oblicza „liczbę” zaokrągloną w dół do „precyzji”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.10.0
     * @kategoria Matematyka
     * @param {number} number Liczba do zaokrąglenia w dół.
     * @param {liczba} [precyzja=0] Dokładność zaokrąglania w dół.
     * @returns {liczba} Zwraca liczbę zaokrągloną w dół.
     * @przykład
     *
     * _.podłoga(4.006);
     * // => 4
     *
     * _.podłoga (0,046, 2);
     * // => 0,04
     *
     * _.podłoga(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Oblicza maksymalną wartość „tablicy”. Jeśli „tablica” jest pusta lub fałszywa,
     * Zwracany jest `nieokreślony`.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @returns {*} Zwraca maksymalną wartość.
     * @przykład
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => nieokreślone
     */
    funkcja max(tablica) {
      return (tablica && tablica.length)
        ? baseExtremum(tablica, tożsamość, baseGt)
        : nieokreślony;
    }

    /**
     * Ta metoda jest podobna do `_.max` z tą różnicą, że akceptuje `iterację`, która jest
     * wywoływane dla każdego elementu w `array` w celu wygenerowania kryterium, według którego
     * wartość jest uszeregowana. Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {*} Zwraca maksymalną wartość.
     * @przykład
     *
     * var obiekty = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.maxBy(obiekty, funkcja(o) { powrót; });
     * // => { 'n': 2 }
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.maxBy(obiekty, 'n');
     * // => { 'n': 2 }
     */
    funkcja maxBy(tablica, iteracja) {
      return (tablica && tablica.length)
        ? baseExtremum(tablica, getIteratee(iteracja, 2), baseGt)
        : nieokreślony;
    }

    /**
     * Oblicza średnią wartości w „tablicy”.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @returns {liczba} Zwraca średnią.
     * @przykład
     *
     * _. średnia([4, 2, 8, 6]);
     * // => 5
     */
    funkcja średnia(tablica) {
      return średnia podstawowa(tablica, tożsamość);
    }

    /**
     * Ta metoda jest podobna do `_.mean` z wyjątkiem tego, że akceptuje `iteratee`, co jest
     * wywoływane dla każdego elementu w „array” w celu wygenerowania wartości do uśrednienia.
     * Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.7.0
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {liczba} Zwraca średnią.
     * @przykład
     *
     * var obiekty = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.meanBy(obiekty, funkcja(o) { return on; });
     * // => 5
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.meanBy(obiekty, 'n');
     * // => 5
     */
    function meanBy(tablica, iteracja) {
      return średnia podstawowa(tablica, getIteratee(iteratee, 2));
    }

    /**
     * Oblicza minimalną wartość „tablicy”. Jeśli „tablica” jest pusta lub fałszywa,
     * Zwracany jest `nieokreślony`.
     *
     * @statyczny
     * @od 0.1.0
     * @członkiem _
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @returns {*} Zwraca minimalną wartość.
     * @przykład
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => nieokreślone
     */
    funkcja min(tablica) {
      return (tablica && tablica.length)
        ? baseExtremum(tablica, tożsamość, baseLt)
        : nieokreślony;
    }

    /**
     * Ta metoda jest podobna do `_.min` z wyjątkiem tego, że akceptuje `iterację`, która jest
     * wywoływane dla każdego elementu w `array` w celu wygenerowania kryterium, według którego
     * wartość jest uszeregowana. Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {*} Zwraca minimalną wartość.
     * @przykład
     *
     * var obiekty = [{ 'n': 1 }, { 'n': 2 }];
     *
     * _.minBy(objects, function(o) { return on; });
     * // => { 'n': 1 }
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.minBy(obiekty, 'n');
     * // => { 'n': 1 }
     */
    function minBy(tablica, iteracja) {
      return (tablica && tablica.length)
        ? baseExtremum(tablica, getIteratee(iteratee, 2), baseLt)
        : nieokreślony;
    }

    /**
     * Pomnóż dwie liczby.
     *
     * @statyczny
     * @członkiem _
     * @od 4.7.0
     * @kategoria Matematyka
     * mnożnik @param {liczba} Pierwsza liczba w mnożeniu.
     * @param {liczba} mnożnik Druga liczba w mnożeniu.
     * @returns {liczba} Zwraca produkt.
     * @przykład
     *
     * _.mnożenie(6, 4);
     * // => 24
     */
    var multiply = createMathOperation(function(multiplier, multiplicand) {
      mnożnik zwrotu * mnożnik;
    }, 1);

    /**
     * Oblicza „liczbę” zaokrągloną do „precyzji”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.10.0
     * @kategoria Matematyka
     * @param {number} number Liczba do zaokrąglenia.
     * @param {liczba} [precyzja=0] Dokładność do zaokrąglenia.
     * @returns {liczba} Zwraca zaokrągloną liczbę.
     * @przykład
     *
     * _.okrągły(4.006);
     * // => 4
     *
     * _.okrągły(4.006, 2);
     * // => 4,01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Odejmij dwie liczby.
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Matematyka
     * @param {liczba} minuend Pierwsza liczba przy odejmowaniu.
     * @param {number} subtrahend Druga liczba w odejmowaniu.
     * @returns {liczba} Zwraca różnicę.
     * @przykład
     *
     * _.subtract(6, 4);
     * // => 2
     */
    var subtract = createMathOperation(function(minuend, subtrahend) {
      return minuend - odejmowanie;
    }, 0);

    /**
     * Oblicza sumę wartości w „tablicy”.
     *
     * @statyczny
     * @członkiem _
     * @od 3.4.0
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @returns {liczba} Zwraca sumę.
     * @przykład
     *
     * _.sum([4, 2, 8, 6]);
     * // => 20
     */
    funkcja suma(tablica) {
      return (tablica && tablica.length)
        ? suma podstawowa(tablica, tożsamość)
        : 0;
    }

    /**
     * Ta metoda jest podobna do `_.sum` z tą różnicą, że akceptuje `iteratee`, czyli
     * wywoływane dla każdego elementu w `array` w celu wygenerowania wartości do zsumowania.
     * Iterat jest wywoływany z jednym argumentem: (wartość).
     *
     * @statyczny
     * @członkiem _
     * @od 4.0.0
     * @kategoria Matematyka
     * @param {Array} tablica Tablica do iteracji.
     * @param {Funkcja} [iteratee=_.identity] Iteracja wywołana na element.
     * @returns {liczba} Zwraca sumę.
     * @przykład
     *
     * var obiekty = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
     *
     * _.sumBy(objects, function(o) { return on; });
     * // => 20
     *
     * // Skrócona wersja iteracji `_.property`.
     * _.sumBy(obiekty, 'n');
     * // => 20
     */
    function sumBy(tablica, iteracja) {
      return (tablica && tablica.length)
        ? baseSum(tablica, getIteratee(iteratee, 2))
        : 0;
    }

    /*------------------------------------------------ ------------------------*/

    // Dodaj metody, które zwracają opakowane wartości w sekwencjach łańcuchowych.
    lodash.after = po;
    lodash.ary = ar;
    lodash.assign = przypisz;
    lodash.assignIn = przypiszIn;
    lodash.assignInWith = przypiszInZ;
    lodash.assignZ = przypiszZ;
    lodash.at = w;
    lodash.before = przed;
    lodash.bind = wiązanie;
    lodash.powiążWszystko = powiążWszystko;
    lodash.bindKey = bindKey;
    lodash.castArray = castArray;
    lodash.chain = łańcuch;
    lodash.kawałek = kawałek;
    lodash.compact = kompaktowy;
    lodash.concat = concat;
    lodash.cond = przew;
    lodash.conforms = odpowiada;
    lodash.constant = stała;
    lodash.liczbaj = licz.by;
    lodash.create = utwórz;
    lodash.curry = curry;
    lodash.curryPrawo = curryPrawo;
    lodash.debounce = debounce;
    lodash.defaults = wartości domyślne;
    lodash.defaultsDeep = defaultsDeep;
    lodash.odro = odroczyć;
    lodash.delay = opóźnienie;
    lodash.różnica = różnica;
    lodash.różnica według = różnica według;
    lodash.differenceWith = różnicaZ;
    lodash.drop = upuść;
    lodash.dropPrawo = dropPrawo;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = wypełnienie;
    lodash.filter = filtr;
    lodash.flatMap = flatMap;
    lodash.flatMapDeep = flatMapDeep;
    lodash.flatMapDepth = flatMapDepth;
    lodash.flatten = spłaszcz;
    lodash.flattenDeep = flattenDeep;
    lodash.flattenDepth = flattenDepth;
    lodash.flip = odwróć;
    lodash.flow = przepływ;
    lodash.flowRight = flowRight;
    lodash.fromPairs = fromPairs;
    lodash.functions = funkcje;
    lodash.functionsIn = funkcjeIn;
    lodash.groupBy = groupBy;
    lodash.initial = początkowy;
    lodash.intersection = skrzyżowanie;
    lodash.intersectionBy = przecięcieBy;
    lodash.intersectionWith = intersectionWith;
    lodash.invert = odwróć;
    lodash.invertBy = invertBy;
    lodash.invokeMap = invokeMap;
    lodash.iteratee = iteracja;
    lodash.keyBy = keyBy;
    lodash.keys = klucze;
    lodash.keysIn = kluczeIn;
    lodash.map = mapa;
    lodash.mapKeys = mapKeys;
    lodash.mapValues ​​= mapValues;
    lodash.matches = mecze;
    lodash.matchesProperty = matchProperty;
    lodash.memoize = zapamiętaj;
    lodash.merge = scalaj;
    lodash.mergeWith = połączZ;
    lodash.metoda = metoda;
    lodash.methodOf = metodaOf;
    lodash.mixin = mixin;
    lodash.negate = negacja;
    lodash.nthArg = nthArg;
    lodash.pomiń = pomiń;
    lodash.pomińPrzez = pomińPrzez;
    lodash.once = raz;
    lodash.orderBy = orderBy;
    lodash.over = koniec;
    lodash.overArgs = overArgs;
    lodash.overEvery = overEvery;
    lodash.overSome = overSome;
    lodash.częściowy = częściowy;
    lodash.Prawo częściowe = Prawo częściowe;
    lodash.partition = partycja;
    lodash.pick = wybierz;
    lodash.pickBy = wybierzBy ;
    lodash.property = własność;
    lodash.propertyOf = właściwośćOf;
    lodash.pull = ciągnij;
    lodash.pullAll = ciągnijWszystko;
    lodash.pullAllBy = ciągnijAllBy;
    lodash.pullAllWith = ciągnijWszystkoZ;
    lodash.pullAt = pullAt;
    lodash.zakres = zasięg;
    lodash.zakresPrawo = zakresPrawo;
    lodash.rearg = tylneg;
    lodash.reject = odrzuć;
    lodash.remove = usuń;
    lodash.odpoczynek = odpoczynek;
    lodash.reverse = rewers;
    lodash.sampleSize = rozmiar próbki;
    lodash.set = zestaw;
    lodash.setWith = zestawWith;
    lodash.shuffle = tasuj;
    lodash.plasterek = plasterek;
    lodash.sortuj według = sortuj według;
    lodash.sortedUniq = sortedUniq;
    lodash.sortedUniqBy = sortedUniqBy;
    lodash.split = podziel;
    lodash.spread = rozprzestrzenianie;
    lodash.tail = ogon;
    lodash.wziąć = wziąć;
    lodash.TakeRight = TakeRight;
    lodash.TakeRightWhile = TakeRightWhile;
    lodash.weźPodczas = weźPodczas;
    lodash.tap = dotknij;
    lodash.throttle = przepustnica;
    lodash.thru = przez;
    lodash.toArray = toArray;
    lodash.toPairs = toPairs;
    lodash.toPairsIn = toPairsIn;
    lodash.doŚcieżka = doŚcieżka;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transformacja;
    lodash.unary = jednoargumentowy;
    lodash.union = unia;
    lodash.unionBy = unionBy;
    lodash.unionWith = związekZ;
    lodash.uniq = uniq;
    lodash.uniqBy = uniqBy;
    lodash.uniqZ = uniqZ;
    lodash.unset = nieuzbrojony;
    lodash.unzip = rozpakuj;
    lodash.unzipWith = unzipWith;
    lodash.update = aktualizacja;
    lodash.updateWith = aktualizacjaZ;
    lodash.values ​​= wartości;
    lodash.valuesIn = wartościIn;
    lodash.bez = bez;
    lodash.words = słowa;
    lodash.wrap = zawijanie;
    lodash.xor = xor;
    lodash.xorBy = xorBy;
    lodash.xorWith = xorWith;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipObjectDeep = zipObjectDeep;
    lodash.zipZ = zipZ;

    // Dodaj aliasy.
    lodash.entries = toPary;
    lodash.entriesIn = toPairsIn;
    lodash.extend = przypiszIn;
    lodash.extendWith = assignInWith;

    // Dodaj metody do `lodash.prototype`.
    mixin(lodasz, lodasz);

    /*------------------------------------------------ ------------------------*/

    // Dodaj metody, które zwracają nieopakowane wartości w sekwencjach łańcuchowych.
    lodash.add = dodaj;
    lodash.attempt = próba;
    lodash.camelCase = camelCase;
    lodash.capitalize = wielkie litery;
    lodash.ceil = ceil;
    lodash.clamp = zacisk;
    lodash.clone = klon;
    lodash.cloneDeep = cloneDeep;
    lodash.cloneDeepWith = cloneDeepWith;
    lodash.cloneZ = klonZ;
    lodash.conformsTo = odpowiada To;
    lodash.deburr = gratowanie;
    lodash.defaultTo = defaultTo;
    lodash.dzielenie = dzielenie;
    lodash.endsWith = kończy się;
    lodash.eq = eq;
    lodash.escape = ucieczka;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = każdy;
    lodash.znajdź = znajdź;
    lodash.findIndex = znajdźIndeks;
    lodash.znajdźKlucz = znajdźKlucz;
    lodash.findLast = znajdźOstatni;
    lodash.findLastIndex = znajdźOstatniIndeks;
    lodash.findLastKey = znajdźOstatniKlucz;
    lodash.podłoga = podłoga;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.dlaWłasnego = dlaWłasnego;
    lodash.forPrawa = dlaPrawa;
    lodash.get = pobierz;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = ma;
    lodash.hasIn = hasIn;
    lodash.head = głowa;
    lodash.identity = tożsamość;
    lodash.includes = zawiera;
    lodash.indexOf = indeksOf;
    lodash.inRange = inRange;
    lodash.invoke = wywołaj;
    lodash.isArguments = isArguments;
    lodash.isArray = jestArray;
    lodash.isArrayBuffer = jestArrayBuffer;
    lodash.isArrayLike = jestArrayLike;
    lodash.isArrayLikeObject = jestArrayLikeObject;
    lodash.isBoolean = jestBoolean;
    lodash.isBufor = jestBuforem;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isPusty = jestPusty;
    lodash.jestRówne = jestRówne;
    lodash.jestRówneZ = jestRówneZ;
    lodash.isError = isError;
    lodash.isFinite = jestFinite;
    lodash.isFunction = isFunction;
    lodash.isInteger = jestInteger;
    lodash.isLength = isLength;
    lodash.isMap = isMap;
    lodash.isMatch = isMatch;
    lodash.isDopasujZ = jestDopasujZ;
    lodash.isNaN = isNaN;
    lodash.isNative = jestNative;
    lodash.isNil = isNil;
    lodash.isNull = isNull;
    lodash.jestLiczba = jestLiczba;
    lodash.isObject = isObject;
    lodash.isObjectLike = isObjectLike;
    lodash.isPlainObject = jestPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isSafeInteger = isSafeInteger;
    lodash.isSet = isSet;
    lodash.isString = isString;
    lodash.isSymbol = isSymbol;
    lodash.isTypedArray = isTypedArray;
    lodash.isNiezdefiniowane = jestNiezdefiniowane;
    lodash.isWeakMap = isWeakMap;
    lodash.isWeakSet = isWeakSet;
    lodash.join = dołącz;
    lodash.kebabSprawa = kebabSprawa;
    lodash.last = ostatni;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lowerCase = małe litery;
    lodash.lowerFirst = niższyFirst;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.maxBy = maxBy;
    lodash.średnia = średnia;
    lodash.meanBy = średniaBy;
    lodash.min = min;
    lodash.minBy = minBy;
    lodash.stubArray = stubArray;
    lodash.stubFalse = stubFalse;
    lodash.stubObject = stubObject;
    lodash.stubString = stubString;
    lodash.stubTrue = stubTrue;
    lodash.multiply = mnożyć;
    lodash.nth = n-ty;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.teraz = teraz;
    lodash.pad = podkładka;
    lodash.padEnd = padEnd;
    lodash.padStart = padStart;
    lodash.parseInt = parseInt;
    lodash.losowy = losowy;
    lodash.reduce = zmniejsz;
    lodash.reduceRight = redukcjaRight;
    lodash.powtórz = powtórz;
    lodash.replace = zamień;
    lodash.wynik = wynik;
    lodash.round = okrągły;
    lodash.uruchomWKontekście = uruchomWKontekście;
    lodash.próbka = próbka;
    lodash.rozmiar = rozmiar;
    lodash.snakeCase = SnakeCase;
    lodash.niektóre = niektóre;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedIndexBy = sortedIndexBy;
    lodash.sortedIndexOf = sortedIndexOf;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.sortedLastIndexBy = sortedLastIndexBy;
    lodash.sortedLastIndexOf = sortedLastIndexOf;
    lodash.startCase = startCase;
    lodash.startsWith = startWith;
    lodash.subtract = odejmij;
    lodash.suma = suma;
    lodash.sumBy = sumBy;
    lodash.template = szablon;
    lodash.times = razy;
    lodash.toFinite = toFinite;
    lodash.toInteger = toInteger;
    lodash.toLength = toLength;
    lodash.toLower = toLower;
    lodash.toLiczba = toLiczba;
    lodash.toSafeInteger = toSafeInteger;
    lodash.toString = toString;
    lodash.toUpper = toUpper;
    lodash.trim = trim;
    lodash.trimEnd = trimEnd;
    lodash.trimStart = trimStart;
    lodash.truncate = truncate;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.upperCase = upperCase;
    lodash.upperFirst = upperFirst;

    // Add aliases.
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.first = head;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), { 'chain': false });

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type {string}
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        n = n === undefined ? 1 : nativeMax(toInteger(n), 0);

        var result = (this.__filtered__ && !index)
          ? new LazyWrapper(this)
          : this.clone();

        if (result.__filtered__) {
          result.__takeCount__ = nativeMin(n, result.__takeCount__);
        } else {
          result.__views__.push({
            'size': nativeMin(n, MAX_ARRAY_LENGTH),
            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
          });
        }
        zwróć wynik;
      };

      LazyWrapper.prototype[nazwa metody + 'Prawo'] = function(n) {
        zwróć this.reverse()[nazwametody](n).reverse();
      };
    });

    // Dodaj metody `LazyWrapper`, które akceptują wartość `iteratee`.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      typ var = indeks + 1,
          isFilter = type == LAZY_FILTER_FLAG || wpisz == LAZY_WHILE_FLAG;

      LazyWrapper.prototype[nazwametody] = function(iteratee) {
        var wynik = this.clone();
        wynik.__iterates__.push({
          'iteratee': getIteratee(iteratee, 3),
          'typ': typ
        });
        wynik.__filtrowane__ = wynik.__filtrowane__ || isFilter;
        zwróć wynik;
      };
    });

    // Dodaj metody `LazyWrapper` dla `_.head` i `_.last`.
    arrayEach(['head', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
    arrayEach(['initial', 'tail'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.find = function(predicate) {
      return this.filter(predicate).head();
    };

    LazyWrapper.prototype.findLast = function(predicate) {
      return this.reverse().find(predicate);
    };

    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
      if (typeof path == 'function') {
        return new LazyWrapper(this);
      }
      return this.map(function(value) {
        return baseInvoke(value, path, args);
      });
    });

    LazyWrapper.prototype.reject = function(predicate) {
      return this.filter(negate(getIteratee(predicate)));
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = toInteger(start);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = toInteger(end);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(MAX_ARRAY_LENGTH);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
          isTaker = /^(?:head|last)$/.test(methodName),
          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
          retUnwrapped = isTaker || /^find/.test(methodName);

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var value = this.__wrapped__,
            args = isTaker ? [1] : arguments,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        var interceptor = function(value) {
          var result = lodashFunc.apply(lodash, arrayPush([value], args));
          return (isTaker && chainAll) ? result[0] : result;
        };

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var chainAll = this.__chain__,
            isHybrid = !!this.__actions__.length,
            isUnwrapped = retUnwrapped && !chainAll,
            onlyLazy = isLazy && !isHybrid;

        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
          return new LodashWrapper(result, chainAll);
        }
        if (isUnwrapped && onlyLazy) {
          return func.apply(this, args);
        }
        result = this.thru(interceptor);
        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
      };
    });

    // Add `Array` methods to `lodash.prototype`.
    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = arrayProto[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });

    // Map minified method names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name + '';
        if (!hasOwnProperty.call(realNames, key)) {
          realNames[key] = [];
        }
        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybrid(undefined, WRAP_BIND_KEY_FLAG).name] = [{
      'name': 'wrapper',
      'func': undefined
    }];

    // Add methods to `LazyWrapper`.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chain sequence methods to the `lodash` wrapper.
    lodash.prototype.at = wrapperAt;
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.next = wrapperNext;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add lazy aliases.
    lodash.prototype.first = lodash.prototype.head;

    if (symIterator) {
      lodash.prototype[symIterator] = wrapperToIterator;
    }
    return lodash;
  });

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers, like r.js, check for condition patterns like:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose Lodash on the global object to prevent errors when Lodash is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    // Use `_.noConflict` to remove Lodash from the global object.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds it.
  else if (freeModule) {
    // Export for Node.js.
    (freeModule.exports = _)._ = _;
    // Export for CommonJS support.
    freeExports._ = _;
  }
  else {
    // Export to the global object.
    root._ = _;
  }
}.call(this));