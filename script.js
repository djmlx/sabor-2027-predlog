(function () {
  'use strict';

  /* ---------- Jezik: engleski je u HTML-u, srpski (ćirilica) ovde ---------- */
  var SR = {
    doc_title: 'САБОР 2027 – Сабор српске православне омладине и младих',
    bar_note: 'Предлог странице · радна верзија',

    hero_label: 'Омладина и млади · САД и Канада',
    hero_title: 'САБОР 2027',
    hero_sub: 'Сабор српске православне омладине и младих',
    fact_dates: 'Датум',
    fact_dates_v: '17–19. септембар 2027.',
    fact_ages: 'Узраст',
    fact_ages_v: '16–30 година',
    fact_location: 'Место',
    fact_location_v: 'Манастир Нова Грачаница и манастир Светог Саве<small>Чикаго, Илиноис</small>',
    btn_register: 'Регистрација на Eventbrite-у',
    btn_guide: 'Водич на енглеском (PDF)',
    hero_blessing: 'Са благословом Његовог Високопреосвештенства Митрополита новограчаничко-средњезападноамеричког г. Лонгина',

    guide_title: 'Водич за САБОР 2027 – Сабор омладине и младих',
    p1: 'Водич за САБОР припремљен је као духовни и практични приручник за Сабор српске православне омладине и младих, који ће се одржати од 17. до 19. септембра 2027. године у Чикагу, у држави Илиноис, са благословом Његовог Високопреосвештенства Митрополита новограчаничко-средњезападноамеричког г. Лонгина.',
    p2: 'САБОР је прилика да се наши млади са целог северноамеричког континента окупе у Христу, у животу Цркве и у међусобном заједништву. То је време да учврстимо своју веру, продубимо љубав према Цркви, изградимо трајна пријатељства и охрабрујемо једни друге да живимо по Јеванђељу у данашњем свету.',
    p3: 'Овај водич пружа визију, структуру и практична упутства потребна за припрему и учешће на Сабору. Намењен је свештенству, парохијама, члановима црквених одбора, омладини и младима, волонтерима, родитељима и свима који доприносе да САБОР буде могућ.',
    p4: 'Изнад свега, овај водич је израз наше заједничке жеље да служимо Цркви и да помогнемо млађим нараштајима да открију и пригрле лепоту и пуноћу православног хришћанског живота. Нека наше сабрање буде сведочанство речи Христових:',
    quote: '„Да сви једно буду.“',
    quote_ref: 'Јн 17, 21',
    p5: 'Молитвом, добром вољом и подршком свих нас, нека САБОР постане радосно сабрање наше омладине и младих – место где се вера утврђује, пријатељства склапају, дарови деле, а срца обнављају у Христу и Његовој Светој Цркви.',

    dl_title: 'Материјали за преузимање',
    dl_guide_en: 'Водич за САБОР 2027',
    dl_guide_en_v: 'Енглески',
    dl_guide_sr_v: 'Српски',
    dl_banner: 'Банер САБОР 2027',
    dl_banner_v: '8 × 2 стопе, за штампу',
    dl_poster: 'Постер „Save the Date“',
    dl_poster_v: 'За парохијске билтене и друштвене мреже',
    dl_logo: 'Лого САБОР 2027',
    dl_logo_v: 'Провидна позадина',
    dl_link: 'Преузми',

    reg_title: 'Регистрација',
    reg_text: 'Регистрација за САБОР 2027 је отворена преко Eventbrite-а.',
    reg_contact: 'Питања:'
  };

  var nodes = document.querySelectorAll('[data-i18n]');
  var EN = { doc_title: document.title };
  nodes.forEach(function (n) { EN[n.getAttribute('data-i18n')] = n.innerHTML; });

  var buttons = document.querySelectorAll('.sb-lang [data-lang]');

  function setLang(lang) {
    var dict = lang === 'sr' ? SR : EN;
    nodes.forEach(function (n) {
      var v = dict[n.getAttribute('data-i18n')];
      if (v != null) n.innerHTML = v;
    });
    document.title = dict.doc_title;
    document.documentElement.lang = lang === 'sr' ? 'sr-Cyrl' : 'en';
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });

    try { localStorage.setItem('sb-lang', lang); } catch (e) {}
    try {
      var url = new URL(window.location.href);
      if (lang === 'sr') url.searchParams.set('lang', 'sr'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  // ?lang=sr ima prednost (link za slanje), pa zapamćen izbor
  var start = 'en';
  try {
    var q = new URLSearchParams(window.location.search).get('lang');
    var saved = localStorage.getItem('sb-lang');
    start = q === 'sr' || q === 'en' ? q : (saved === 'sr' ? 'sr' : 'en');
  } catch (e) {}
  if (start === 'sr') setLang('sr');

  /* ---------- Pojavljivanje sekcija pri skrolu ---------- */
  var items = document.querySelectorAll('.sb-reveal');
  if (!('IntersectionObserver' in window) || !items.length) return;

  document.documentElement.classList.add('sb-js');

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach(function (el) { io.observe(el); });
})();
