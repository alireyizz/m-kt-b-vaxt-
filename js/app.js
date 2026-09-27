/**
 * Məktəb Vaxtı — Tədris Təqvimi və Geri Sayım Sistemi
 * Human-crafted, responsive, zero-slop JavaScript application
 */

(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const LOCALES = { az: 'az-AZ', en: 'en-US', ru: 'ru-RU' };

  const LANGS = {
    az: {
      brand: 'Məktəb Vaxtı',
      tabHome: 'Ana',
      tabCalendar: 'Təqvim',
      tabHolidays: 'Tətillər',
      breaksTab: 'Məktəb tətilləri',
      daysOffTab: 'Bayram günləri',
      allTab: 'Hamısı',
      today: 'BU GÜN',
      school: 'Məktəbin bağlanmasına qalan vaxt',
      holiday: 'Növbəti tətil',
      weekend: 'Həftəsonuna qalan',
      progress: 'TƏDRİS İLİ',
      progressTitle: 'İl nə qədər keçib?',
      calendar: 'TƏQVİM',
      calendarTitle: 'Tədris təqvimi',
      holidayEyebrow: 'TƏTİLLƏR',
      holidayPageTitle: '2026–2027 tətil günləri',
      schoolDay: 'Tədris günü',
      holidayDay: 'Məktəb tətili',
      officialHolidayDay: 'Bayram günü',
      todayDay: 'Bu gün',
      days: 'gün',
      hours: 'saat',
      minutes: 'dəq',
      seconds: 'san',
      ongoing: '2026–2027 tədris ili davam edir.',
      finished: 'Tədris ili başa çatıb.',
      before: 'Tədris ili hələ başlamayıb.',
      left: 'qalıb',
      holidayNames: ['Payız tətili', 'Qış tətili', 'Əlavə yaz tətili'],
      months: [
        'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
        'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
      ],
      weekdays: ['B.e.', 'Ç.a.', 'Ç.', 'C.a.', 'C.', 'Ş.', 'B.'],
      nextTag: 'Növbəti',
      schoolEnd: 'son dərs günü',
      note: 'Qeyd: 1–5 may əlavə yaz tətili yalnız ibtidai siniflər üçün nəzərdə tutulur.',
      daysOffLabel: 'Bayram',
      tagBreak: 'Məktəb tətili',
      tagOfficial: 'Rəsmi bayram',
      todayJump: 'Bu gün',
      inspectorDefault: 'Təqvimdəki istənilən günə klikləyərək ətraflı məlumat əldə edin.',
      inspectorPrefix: 'Seçilmiş tarix:',
      inProgress: 'Hal-hazırda davam edir',
      passed: 'Başa çatıb',
      factsTitle: 'Tədris ili icmalı',
      factQuarter: 'Cari dövr',
      factSemester1: 'I yarımil',
      factSemester2: 'II yarımil',
      factFirstBell: 'İlk zəng',
      factLastBell: 'Son zəng',
      factTotalDays: 'Tədris günləri',
      weekendDay: 'Həftəsonu istirahəti',
      regularSchoolDay: 'Dərs günü',
      footerInfo: 'GitHub Pages · Azərbaycan məktəbliləri üçün',
      themeLight: 'Açıq rejimə keç',
      themeDark: 'Qaranlıq rejimə keç',
      themeToggle: 'Temanı dəyiş',
      prevMonthAria: 'Əvvəlki ay',
      nextMonthAria: 'Növbəti ay'
    },
    en: {
      brand: 'School Time',
      tabHome: 'Home',
      tabCalendar: 'Calendar',
      tabHolidays: 'Holidays',
      breaksTab: 'School breaks',
      daysOffTab: 'Public holidays',
      allTab: 'All',
      today: 'TODAY',
      school: 'Time until school closes',
      holiday: 'Next holiday',
      weekend: 'Until weekend',
      progress: 'SCHOOL YEAR',
      progressTitle: 'How far through the year?',
      calendar: 'CALENDAR',
      calendarTitle: 'School calendar',
      holidayEyebrow: 'HOLIDAYS',
      holidayPageTitle: '2026–2027 school holidays',
      schoolDay: 'School day',
      holidayDay: 'School break',
      officialHolidayDay: 'Public holiday',
      todayDay: 'Today',
      days: 'days',
      hours: 'hours',
      minutes: 'min',
      seconds: 'sec',
      ongoing: 'The 2026–2027 school year is in progress.',
      finished: 'The school year has ended.',
      before: 'The school year has not started yet.',
      left: 'left',
      holidayNames: ['Autumn break', 'Winter break', 'Additional spring break'],
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      nextTag: 'Next',
      schoolEnd: 'last school day',
      note: 'Note: the additional spring break applies to primary grades only.',
      daysOffLabel: 'Holiday',
      tagBreak: 'School break',
      tagOfficial: 'Public holiday',
      todayJump: 'Today',
      inspectorDefault: 'Click on any day in the calendar to view full details.',
      inspectorPrefix: 'Selected date:',
      inProgress: 'Currently in progress',
      passed: 'Completed',
      factsTitle: 'Academic Year Overview',
      factQuarter: 'Current term',
      factSemester1: 'Semester 1',
      factSemester2: 'Semester 2',
      factFirstBell: 'First bell',
      factLastBell: 'Last bell',
      factTotalDays: 'Academic period',
      weekendDay: 'Weekend day',
      regularSchoolDay: 'Regular school day',
      footerInfo: 'GitHub Pages · For Azerbaijani students',
      themeLight: 'Switch to light mode',
      themeDark: 'Switch to dark mode',
      themeToggle: 'Toggle theme',
      prevMonthAria: 'Previous month',
      nextMonthAria: 'Next month'
    },
    ru: {
      brand: 'Учебное время',
      tabHome: 'Главная',
      tabCalendar: 'Календарь',
      tabHolidays: 'Каникулы',
      breaksTab: 'Школьные каникулы',
      daysOffTab: 'Праздничные дни',
      allTab: 'Все',
      today: 'СЕГОДНЯ',
      school: 'До окончания школы',
      holiday: 'Ближайшие каникулы',
      weekend: 'До выходных',
      progress: 'УЧЕБНЫЙ ГОД',
      progressTitle: 'Сколько года уже прошло?',
      calendar: 'КАЛЕНДАРЬ',
      calendarTitle: 'Учебный календарь',
      holidayEyebrow: 'КАНИКУЛЫ',
      holidayPageTitle: 'Каникулы 2026–2027',
      schoolDay: 'Учебный день',
      holidayDay: 'Школьные каникулы',
      officialHolidayDay: 'Праздничный день',
      todayDay: 'Сегодня',
      days: 'дн.',
      hours: 'ч.',
      minutes: 'мин.',
      seconds: 'сек.',
      ongoing: '2026–2027 учебный год продолжается.',
      finished: 'Учебный год завершён.',
      before: 'Учебный год ещё не начался.',
      left: 'осталось',
      holidayNames: ['Осенние каникулы', 'Зимние каникулы', 'Дополнительные весенние каникулы'],
      months: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      nextTag: 'Ближайшие',
      schoolEnd: 'последний учебный день',
      note: 'Примечание: дополнительные весенние каникулы предназначены только для начальных классов.',
      daysOffLabel: 'Праздник',
      tagBreak: 'Каникулы',
      tagOfficial: 'Праздничный день',
      todayJump: 'Сегодня',
      inspectorDefault: 'Нажмите на любой день в календаре для подробной информации.',
      inspectorPrefix: 'Выбранная дата:',
      inProgress: 'Сейчас идёт',
      passed: 'Завершено',
      factsTitle: 'Обзор учебного года',
      factQuarter: 'Текущий период',
      factSemester1: 'I полугодие',
      factSemester2: 'II полугодие',
      factFirstBell: 'Первый звонок',
      factLastBell: 'Последний звонок',
      factTotalDays: 'Учебный период',
      weekendDay: 'Выходной день',
      regularSchoolDay: 'Обычный учебный день',
      footerInfo: 'GitHub Pages · Для азербайджанских школьников',
      themeLight: 'Переключить на светлую тему',
      themeDark: 'Переключить на тёмную тему',
      themeToggle: 'Сменить тему',
      prevMonthAria: 'Предыдущий месяц',
      nextMonthAria: 'Следующий месяц'
    }
  };

  // Official school schedule: 15 Sep 2026 to 14 Jun 2027
  const yearStart = new Date(2026, 8, 15, 0, 0, 0);
  const yearEnd = new Date(2027, 5, 14, 23, 59, 59);

  // School vacations
  const holidays = [
    { s: new Date(2026, 10, 16), e: new Date(2026, 10, 20), i: 0 },
    { s: new Date(2027, 0, 27), e: new Date(2027, 0, 31), i: 1 },
    { s: new Date(2027, 4, 1), e: new Date(2027, 4, 5), i: 2, primaryOnly: true }
  ];

  // Official public holidays of Azerbaijan
  const officialDays = [
    { d: new Date(2026, 9, 18), n: { az: 'Müstəqilliyin Bərpası Günü', en: 'Independence Restoration Day', ru: 'День восстановления независимости' } },
    { d: new Date(2026, 10, 8), n: { az: 'Zəfər Günü', en: 'Victory Day', ru: 'День Победы' } },
    { d: new Date(2026, 10, 9), n: { az: 'Dövlət Bayrağı Günü', en: 'National Flag Day', ru: 'День Государственного флага' } },
    { d: new Date(2026, 10, 12), n: { az: 'Konstitusiya Günü', en: 'Constitution Day', ru: 'День Конституции' } },
    { d: new Date(2026, 10, 17), n: { az: 'Milli Dirçəliş Günü', en: 'National Revival Day', ru: 'День национального возрождения' } },
    { d: new Date(2026, 11, 31), n: { az: 'Dünya Azərbaycanlılarının Həmrəyliyi Günü', en: 'World Azerbaijanis Solidarity Day', ru: 'День солидарности азербайджанцев мира' } },
    { d: new Date(2027, 0, 1), n: { az: 'Yeni il', en: 'New Year', ru: 'Новый год' } },
    { d: new Date(2027, 0, 2), n: { az: 'Yeni il', en: 'New Year', ru: 'Новый год' } },
    { d: new Date(2027, 2, 8), n: { az: 'Qadınlar Günü', en: "Women's Day", ru: 'Международный женский день' } },
    { d: new Date(2027, 4, 9), n: { az: 'Faşizm üzərində Qələbə Günü', en: 'Victory over Fascism Day', ru: 'День Победы над фашизмом' } },
    { d: new Date(2027, 4, 28), n: { az: 'Müstəqillik Günü', en: 'Independence Day', ru: 'День независимости' } }
  ];

  let lang = localStorage.getItem('schoolLang') || 'az';
  let view = new Date();
  let selectedCalendarDate = null;
  let holidayTab = 'breaks';

  // Cached DOM elements for high-performance updates
  const els = {
    clock: $('#clock'),
    dateTitle: $('#dateTitle'),
    statusText: $('#statusText'),
    cdDays: $('#cdDays'),
    cdHours: $('#cdHours'),
    cdMinutes: $('#cdMinutes'),
    cdSeconds: $('#cdSeconds'),
    schoolCountdown: $('#schoolCountdown'),
    schoolDate: $('#schoolDate'),
    holidayName: $('#holidayName'),
    holidayDate: $('#holidayDate'),
    holidayCountdown: $('#holidayCountdown'),
    weekendName: $('#weekendName'),
    weekendDate: $('#weekendDate'),
    weekendCountdown: $('#weekendCountdown'),
    progressPercent: $('#progressPercent'),
    progressBar: $('#progressBar'),
    progressTrack: $('#progressTrack'),
    startText: $('#startText'),
    endText: $('#endText'),
    factQuarterVal: $('#factQuarterVal'),
    factFirstBellVal: $('#factFirstBellVal'),
    factLastBellVal: $('#factLastBellVal'),
    factTotalDaysVal: $('#factTotalDaysVal'),
    footerYear: $('#footerYear'),
    footerInfo: $('#footerInfo'),
    themeBtn: $('#themeBtn'),
    prevMonth: $('#prevMonth'),
    nextMonth: $('#nextMonth'),
    monthTitle: $('#monthTitle'),
    weekdays: $('#weekdays'),
    calendar: $('#calendar'),
    dayInspector: $('#dayInspector'),
    dayInspectorTitle: $('#dayInspectorTitle'),
    dayInspectorDesc: $('#dayInspectorDesc'),
    todayJumpBtn: $('#todayJumpBtn'),
    todayLabel: $('#todayLabel'),
    schoolLabel: $('#schoolLabel'),
    holidayLabel: $('#holidayLabel'),
    weekendLabel: $('#weekendLabel'),
    progressEyebrow: $('#progressEyebrow'),
    progressTitle: $('#progressTitle'),
    calendarEyebrow: $('#calendarEyebrow'),
    calendarTitle: $('#calendarTitle'),
    holidayEyebrow: $('#holidayEyebrow'),
    holidayPageTitle: $('#holidayPageTitle'),
    schoolDayLegend: $('#schoolDayLegend'),
    holidayLegend: $('#holidayLegend'),
    officialLegend: $('#officialLegend'),
    todayLegend: $('#todayLegend'),
    holidayNote: $('#holidayNote'),
    factsTitle: $('#factsTitle'),
    factQuarterLabel: $('#factQuarterLabel'),
    factFirstBellLabel: $('#factFirstBellLabel'),
    factLastBellLabel: $('#factLastBellLabel'),
    factTotalDaysLabel: $('#factTotalDaysLabel'),
    holidayList: $('#holidayList'),
    officialList: $('#officialList'),
    allHolidayList: $('#allHolidayList')
  };

  const dateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const sameDay = (a, b) => dateOnly(a).getTime() === dateOnly(b).getTime();
  const inRange = (d, s, e) => {
    const target = dateOnly(d).getTime();
    return target >= dateOnly(s).getTime() && target <= dateOnly(e).getTime();
  };

  const fmt = (d, short = false) =>
    new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: short ? 'short' : 'long', year: 'numeric' }).format(d);

  const fmtDayMonth = (d) =>
    new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'long' }).format(d);

  const t = () => LANGS[lang] || LANGS.az;

  function holidayFor(d) {
    return holidays.find((h) => inRange(d, h.s, h.e));
  }

  function officialDayFor(d) {
    return officialDays.find((h) => sameDay(d, h.d));
  }

  function nextHoliday(now) {
    const today = dateOnly(now);
    const active = holidays.find((h) => inRange(now, h.s, h.e));
    if (active) return { holiday: active, status: 'active' };
    const upcoming = holidays.find((h) => dateOnly(h.e) >= today && !h.primaryOnly) ||
                     holidays.find((h) => dateOnly(h.e) >= today);
    return upcoming ? { holiday: upcoming, status: 'upcoming' } : null;
  }

  function getCountdownParts(target) {
    let ms = Math.max(0, target - Date.now());
    const d = Math.floor(ms / 86400000);
    ms %= 86400000;
    const h = Math.floor(ms / 3600000);
    ms %= 3600000;
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return { d, h, m, s };
  }

  function formatCountdownString(parts) {
    const x = t();
    return `${parts.d} ${x.days} · ${String(parts.h).padStart(2, '0')}:${String(parts.m).padStart(2, '0')}:${String(parts.s).padStart(2, '0')}`;
  }

  function weekendTarget(now) {
    const d = dateOnly(now);
    const day = d.getDay(); // 0 is Sun, 6 is Sat
    // For weekdays (Mon-Fri), calculate days until Saturday
    let add;
    if (day === 0) {
      add = 6; // Sunday -> next Saturday
    } else {
      add = 6 - day; // Mon(1)->5, Tue(2)->4, Wed(3)->3, Thu(4)->2, Fri(5)->1, Sat(6)->0
    }
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + add, 23, 59, 59);
  }

  function setText() {
    const x = t();
    document.documentElement.lang = lang;

    // Static i18n placeholders
    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (x[key]) el.textContent = x[key];
    });

    // Update titles and labels via cached elements
    if (els.todayLabel) els.todayLabel.textContent = x.today;
    if (els.schoolLabel) els.schoolLabel.textContent = x.school;
    if (els.holidayLabel) els.holidayLabel.textContent = x.holiday;
    if (els.weekendLabel) els.weekendLabel.textContent = x.weekend;
    if (els.progressEyebrow) els.progressEyebrow.textContent = x.progress;
    if (els.progressTitle) els.progressTitle.textContent = x.progressTitle;
    if (els.calendarEyebrow) els.calendarEyebrow.textContent = x.calendar;
    if (els.calendarTitle) els.calendarTitle.textContent = x.calendarTitle;
    if (els.holidayEyebrow) els.holidayEyebrow.textContent = x.holidayEyebrow;
    if (els.holidayPageTitle) els.holidayPageTitle.textContent = x.holidayPageTitle;
    if (els.schoolDayLegend) els.schoolDayLegend.textContent = x.schoolDay;
    if (els.holidayLegend) els.holidayLegend.textContent = x.holidayDay;
    if (els.officialLegend) els.officialLegend.textContent = x.officialHolidayDay;
    if (els.todayLegend) els.todayLegend.textContent = x.todayDay;
    if (els.holidayNote) els.holidayNote.textContent = x.note;
    if (els.todayJumpBtn) els.todayJumpBtn.textContent = x.todayJump;
    if (els.factsTitle) els.factsTitle.textContent = x.factsTitle;

    // Quick facts labels
    if (els.factQuarterLabel) els.factQuarterLabel.textContent = x.factQuarter;
    if (els.factFirstBellLabel) els.factFirstBellLabel.textContent = x.factFirstBell;
    if (els.factLastBellLabel) els.factLastBellLabel.textContent = x.factLastBell;
    if (els.factTotalDaysLabel) els.factTotalDaysLabel.textContent = x.factTotalDays;
    if (els.footerInfo) els.footerInfo.textContent = x.footerInfo;

    // Accessible button labels
    if (els.prevMonth) els.prevMonth.setAttribute('aria-label', x.prevMonthAria);
    if (els.nextMonth) els.nextMonth.setAttribute('aria-label', x.nextMonthAria);

    const isDark = document.body.classList.contains('dark');
    const themeAria = isDark ? x.themeLight : x.themeDark;
    if (els.themeBtn) {
      els.themeBtn.setAttribute('aria-label', themeAria);
      els.themeBtn.setAttribute('title', themeAria);
    }

    // Language active buttons
    $$('.langs button').forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));

    // Page title
    document.title = lang === 'az' ? 'Məktəb Vaxtı — Tədris Təqvimi və Geri Sayım'
      : lang === 'ru' ? 'Учебное время — Школьный календарь и обратный отсчёт'
      : 'School Time — Academic Calendar & Countdown';

    renderCalendar();
    renderHolidays();
    update();
    updateDayInspector();
  }

  function update() {
    const now = new Date();
    const x = t();

    // Clock
    const timeStr = new Intl.DateTimeFormat(LOCALES[lang], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(now);
    if (els.clock) els.clock.textContent = timeStr;

    // Date Title (e.g. 27 sentyabr 2026)
    if (els.dateTitle) els.dateTitle.textContent = fmt(now);

    // School Year Status
    if (els.statusText) {
      els.statusText.textContent =
        now < yearStart ? x.before : now <= yearEnd ? x.ongoing : x.finished;
    }

    // Hero Countdown (School end: 14 June 2027)
    const cd = getCountdownParts(yearEnd);
    if (els.cdDays) els.cdDays.textContent = now <= yearEnd ? cd.d : '0';
    if (els.cdHours) els.cdHours.textContent = now <= yearEnd ? String(cd.h).padStart(2, '0') : '00';
    if (els.cdMinutes) els.cdMinutes.textContent = now <= yearEnd ? String(cd.m).padStart(2, '0') : '00';
    if (els.cdSeconds) els.cdSeconds.textContent = now <= yearEnd ? String(cd.s).padStart(2, '0') : '00';

    if (els.schoolCountdown) {
      els.schoolCountdown.textContent = now <= yearEnd ? formatCountdownString(cd) : `0 ${x.days}`;
    }
    if (els.schoolDate) els.schoolDate.textContent = fmt(yearEnd);

    // Next Holiday Card
    const nh = nextHoliday(now);
    if (nh && nh.holiday) {
      const h = nh.holiday;
      if (els.holidayName) els.holidayName.textContent = x.holidayNames[h.i];
      if (els.holidayDate) els.holidayDate.textContent = `${fmtDayMonth(h.s)} – ${fmtDayMonth(h.e)}`;

      if (nh.status === 'active') {
        if (els.holidayCountdown) els.holidayCountdown.textContent = x.inProgress;
      } else {
        const hcd = getCountdownParts(new Date(h.s.getFullYear(), h.s.getMonth(), h.s.getDate()));
        if (els.holidayCountdown) {
          els.holidayCountdown.textContent = `${hcd.d} ${x.days} ${x.left}`;
        }
      }
    }

    // Weekend Card
    const wt = weekendTarget(now);
    const dayOfWeek = now.getDay();
    const isWeekendNow = dayOfWeek === 6 || dayOfWeek === 0;

    if (els.weekendName) {
      els.weekendName.textContent = isWeekendNow
        ? x.weekendDay
        : lang === 'az' ? 'Şənbə' : lang === 'en' ? 'Saturday' : 'Суббота';
    }
    if (els.weekendDate) els.weekendDate.textContent = fmtDayMonth(wt);

    if (els.weekendCountdown) {
      if (isWeekendNow) {
        els.weekendCountdown.textContent = x.inProgress;
      } else {
        const wcd = getCountdownParts(wt);
        els.weekendCountdown.textContent = `${wcd.d} ${x.days} ${x.left}`;
      }
    }

    // Progress Bar
    const total = yearEnd - yearStart;
    const done = Math.min(Math.max(now - yearStart, 0), total);
    const pct = Math.round((done / total) * 100);

    if (els.progressPercent) els.progressPercent.textContent = pct + '%';
    if (els.progressBar) els.progressBar.style.width = pct + '%';
    if (els.progressTrack) els.progressTrack.setAttribute('aria-valuenow', pct);
    if (els.startText) els.startText.textContent = fmt(yearStart);
    if (els.endText) els.endText.textContent = fmt(yearEnd);

    // Quick Facts values
    if (els.factQuarterVal) {
      const semester = now < new Date(2027, 0, 27) ? x.factSemester1 : x.factSemester2;
      els.factQuarterVal.textContent = semester;
    }
    if (els.factFirstBellVal) els.factFirstBellVal.textContent = fmt(yearStart, true);
    if (els.factLastBellVal) els.factLastBellVal.textContent = fmt(yearEnd, true);
    if (els.factTotalDaysVal) {
      const totalDays = Math.ceil(total / 86400000);
      const passedDays = Math.floor(done / 86400000);
      els.factTotalDaysVal.textContent = `${passedDays} / ${totalDays} ${x.days}`;
    }

    if (els.footerYear) els.footerYear.textContent = new Date().getFullYear();
  }

  function renderCalendar() {
    const x = t();
    const y = view.getFullYear();
    const m = view.getMonth();

    if (els.monthTitle) {
      els.monthTitle.textContent = `${x.months[m]} ${y}`;
    }

    if (els.weekdays) {
      els.weekdays.innerHTML = x.weekdays.map((v) => `<div>${v}</div>`).join('');
    }

    const first = new Date(y, m, 1);
    const offset = (first.getDay() + 6) % 7; // Monday = 0
    let html = '';

    for (let i = 0; i < 42; i++) {
      const d = new Date(y, m, i - offset + 1);
      const isMuted = d.getMonth() !== m;
      const h = holidayFor(d);
      const off = officialDayFor(d);
      const isToday = sameDay(d, new Date());
      const isSelected = selectedCalendarDate && sameDay(d, selectedCalendarDate);
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;

      let cl = 'day';
      if (isMuted) cl += ' muted';
      if (isWeekend) cl += ' weekend';
      if (h) cl += ' holiday';
      if (off) cl += ' official-day';
      if (isToday) cl += ' today';
      if (isSelected) cl += ' selected';

      const isoDate = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const markHtml = (h || off) && !isMuted ? '<span class="mark-dot" aria-hidden="true"></span>' : '';

      let dayAria = fmt(d);
      if (!isMuted) {
        if (off) dayAria += ` · ${off.n[lang]} (${x.tagOfficial})`;
        else if (h) dayAria += ` · ${x.holidayNames[h.i]} (${x.tagBreak})`;
        else if (isWeekend) dayAria += ` · ${x.weekendDay}`;
        if (isToday) dayAria += ` · ${x.todayDay}`;
      }

      html += `<button type="button" class="${cl}" data-cal-date="${isoDate}" aria-label="${dayAria}"${isToday ? ' aria-current="date"' : ''}>${d.getDate()}${markHtml}</button>`;
    }

    if (els.calendar) {
      els.calendar.innerHTML = html;
    }
  }

  // Calendar event delegation - single listener instead of per-cell
  const calendarEl = $('#calendar');
  if (calendarEl) {
    calendarEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.day');
      if (!btn || btn.classList.contains('muted')) return;
      const dateStr = btn.dataset.calDate;
      if (dateStr) {
        const [yr, mo, da] = dateStr.split('-').map(Number);
        selectedCalendarDate = new Date(yr, mo - 1, da);
        calendarEl.querySelectorAll('.day').forEach((d) => d.classList.remove('selected'));
        btn.classList.add('selected');
        updateDayInspector();
      }
    });
  }

  function updateDayInspector() {
    const x = t();
    const inspector = $('#dayInspector');
    if (!inspector) return;

    if (!selectedCalendarDate) {
      $('#dayInspectorTitle').textContent = x.calendarTitle;
      $('#dayInspectorDesc').textContent = x.inspectorDefault;
      return;
    }

    const d = selectedCalendarDate;
    const h = holidayFor(d);
    const off = officialDayFor(d);
    const isToday = sameDay(d, new Date());
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;

    let eventDesc = '';
    if (off) {
      eventDesc = `${off.n[lang]} (${x.tagOfficial})`;
    } else if (h) {
      eventDesc = `${x.holidayNames[h.i]} (${x.tagBreak})`;
    } else if (isWeekend) {
      eventDesc = x.weekendDay;
    } else {
      eventDesc = x.regularSchoolDay;
    }

    if (isToday) {
      eventDesc += ` · ${x.todayDay}`;
    }

    $('#dayInspectorTitle').textContent = `${x.inspectorPrefix} ${fmt(d)}`;
    $('#dayInspectorDesc').textContent = eventDesc;
  }

  function renderHolidays() {
    const x = t();
    const now = dateOnly(new Date());

    // 1. School Breaks Panel
    if ($('#holidayList')) {
      $('#holidayList').innerHTML = holidays.map((h) => {
        const isNext = h.e >= now && !h.primaryOnly;
        const leftDays = Math.ceil((dateOnly(h.s) - now) / 86400000);
        let statusText = '';

        if (inRange(now, h.s, h.e)) {
          statusText = x.inProgress;
        } else if (leftDays > 0) {
          statusText = `${leftDays} ${x.days} ${x.left}`;
        } else {
          statusText = x.passed;
        }

        return `
          <article class="holiday-item ${isNext ? 'next' : ''}">
            <div class="holiday-item-top">
              <span class="tag tag-break">${isNext ? x.nextTag : x.tagBreak}</span>
              ${h.primaryOnly ? `<span class="tag" style="color:var(--muted)">I–IV</span>` : ''}
            </div>
            <h3>${x.holidayNames[h.i]}</h3>
            <p>${fmtDayMonth(h.s)} – ${fmtDayMonth(h.e)}</p>
            <div class="holiday-item-bottom">
              <span class="days-left ${isNext ? 'highlight' : ''}">${statusText}</span>
              <span class="tag" style="color:var(--muted)">2026–2027</span>
            </div>
          </article>
        `;
      }).join('');
    }

    // 2. Official National Holidays Panel
    if ($('#officialList')) {
      $('#officialList').innerHTML = officialDays.map((h) => {
        const leftDays = Math.ceil((dateOnly(h.d) - now) / 86400000);
        let statusText = '';
        if (sameDay(now, h.d)) {
          statusText = x.todayDay;
        } else if (leftDays > 0) {
          statusText = `${leftDays} ${x.days} ${x.left}`;
        } else {
          statusText = x.passed;
        }

        return `
          <article class="holiday-item official">
            <div class="holiday-item-top">
              <span class="tag tag-official">${x.tagOfficial}</span>
            </div>
            <h3>${h.n[lang]}</h3>
            <p>${fmt(h.d)}</p>
            <div class="holiday-item-bottom">
              <span class="days-left">${statusText}</span>
              <span class="tag" style="color:var(--muted)">${x.daysOffLabel}</span>
            </div>
          </article>
        `;
      }).join('');
    }

    // 3. All Combined Chronologically
    if ($('#allHolidayList')) {
      const all = [
        ...holidays.map((h) => ({
          d: h.s,
          end: h.e,
          type: 'break',
          name: x.holidayNames[h.i],
          primaryOnly: h.primaryOnly
        })),
        ...officialDays.map((h) => ({
          d: h.d,
          end: null,
          type: 'official',
          name: h.n[lang]
        }))
      ].sort((a, b) => a.d.getTime() - b.d.getTime());

      $('#allHolidayList').innerHTML = all.map((item) => {
        const isBreak = item.type === 'break';
        const targetDate = dateOnly(item.d);
        const leftDays = Math.ceil((targetDate - now) / 86400000);
        let statusText = '';

        if (item.end && inRange(now, item.d, item.end)) {
          statusText = x.inProgress;
        } else if (sameDay(now, item.d)) {
          statusText = x.todayDay;
        } else if (leftDays > 0) {
          statusText = `${leftDays} ${x.days} ${x.left}`;
        } else {
          statusText = x.passed;
        }

        return `
          <article class="holiday-item ${isBreak ? '' : 'official'}">
            <div class="holiday-item-top">
              <span class="tag ${isBreak ? 'tag-break' : 'tag-official'}">${isBreak ? x.tagBreak : x.tagOfficial}</span>
              ${item.primaryOnly ? `<span class="tag" style="color:var(--muted)">I–IV</span>` : ''}
            </div>
            <h3>${item.name}</h3>
            <p>${fmtDayMonth(item.d)}${item.end ? ' – ' + fmtDayMonth(item.end) : ''}</p>
            <div class="holiday-item-bottom">
              <span class="days-left">${statusText}</span>
            </div>
          </article>
        `;
      }).join('');
    }
  }

  function activateTab(name, writeHash = true) {
    $$('.tab').forEach((b) => {
      const active = b.dataset.tab === name;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    $$('.tab-panel').forEach((p) => {
      p.classList.toggle('active', p.id === 'tab-' + name);
    });

    if (writeHash) history.replaceState(null, '', '#' + name);
    if (name === 'calendar') renderCalendar();
  }

  // Event Listeners Initialization
  $$('.tab').forEach((b) =>
    b.addEventListener('click', () => activateTab(b.dataset.tab))
  );

  $$('[data-tab-link]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(a.dataset.tabLink);
    })
  );

  $$('.langs button').forEach((b) =>
    b.addEventListener('click', () => {
      lang = b.dataset.lang;
      localStorage.setItem('schoolLang', lang);
      setText();
      // Notify game of lang change
      window.dispatchEvent(new CustomEvent('schoolLangChange', { detail: { lang } }));
    })
  );

  if ($('#prevMonth')) {
    $('#prevMonth').addEventListener('click', () => {
      view.setMonth(view.getMonth() - 1);
      renderCalendar();
    });
  }

  if ($('#nextMonth')) {
    $('#nextMonth').addEventListener('click', () => {
      view.setMonth(view.getMonth() + 1);
      renderCalendar();
    });
  }

  if ($('#todayJumpBtn')) {
    $('#todayJumpBtn').addEventListener('click', () => {
      view = new Date();
      selectedCalendarDate = new Date();
      renderCalendar();
      updateDayInspector();
    });
  }

  if (els.themeBtn) {
    els.themeBtn.addEventListener('click', () => {
      const dark = document.body.classList.toggle('dark');
      localStorage.setItem('schoolTheme', dark ? 'dark' : 'light');
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#131211' : '#f8f6f0');
      const x = t();
      const themeTitle = dark ? x.themeLight : x.themeDark;
      els.themeBtn.setAttribute('aria-label', themeTitle);
      els.themeBtn.setAttribute('title', themeTitle);
    });
  }

  // Restore Theme
  if (localStorage.getItem('schoolTheme') === 'dark') {
    document.body.classList.add('dark');
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', '#131211');
  }

  // Holiday Subtabs with accessible ARIA
  $$('[data-holiday-tab]').forEach((b) =>
    b.addEventListener('click', () => {
      holidayTab = b.dataset.holidayTab;
      $$('[data-holiday-tab]').forEach((x) => {
        const isMatch = x === b;
        x.classList.toggle('active', isMatch);
        x.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });
      $$('.holiday-panel').forEach((p) =>
        p.classList.toggle('active', p.id === 'holiday-panel-' + holidayTab)
      );
    })
  );

  // Hash Navigation Support
  const initial = location.hash.slice(1);
  setText();
  activateTab(['home', 'calendar', 'holidays'].includes(initial) ? initial : 'home', false);

  window.addEventListener('hashchange', () => {
    const name = location.hash.slice(1);
    if (['home', 'calendar', 'holidays'].includes(name)) activateTab(name, false);
  });

  // Ticking Update Loop (Every 1 second)
  setInterval(update, 1000);
})();
