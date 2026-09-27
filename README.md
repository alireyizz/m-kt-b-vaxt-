# Məktəb Vaxtı — Tədris Təqvimi və Geri Sayım

Azərbaycan məktəbliləri və valideynlər üçün hazırlanmış təmiz, müasir və tam responsive veb tətbiqi. Məktəb təqvimi, tətillər, rəsmi bayram günləri, geri sayım taymerləri və interaktiv kağız təyyarə oyunu təqdim edir.

## Əsas Funksiyalar

- **Dəqiq Geri Sayım**: 2026–2027 tədris ilinin sonuna (14 iyun 2027) canlı gün, saat, dəqiqə və saniyə sayğacı.
- **Növbəti Tətil Sayğacı**: Yaxınlaşan tətilə (payız, qış, əlavə yaz tətili) qalan vaxt və aktiv tətil bildirişi.
- **Həftəsonu Sayğacı**: Həftəsonu istirahətinə qalan günlərin hesablanması.
- **Tədris İli Progressi**: Tədris ilinin neçə faizinin tamamlandığını göstərən vizual tərəqqi paneli.
- **İnteraktiv Təqvim**:
  - Ay üzrə rahat naviqasiya və "Bu günə qayıt" düyməsi.
  - Tədris günləri, məktəb tətilləri və rəsmi bayramların aydın rənglərlə fərqləndirilməsi.
  - Seçilmiş günün təfərrüatlarını göstərən interaktiv inspektor paneli.
- **Tətillər və Bayramlar**:
  - Məktəb tətilləri bölməsi (Payız, Qış və I–IV siniflər üçün Əlavə yaz tətili).
  - Azərbaycan Respublikasının rəsmi bayram və xüsusi günləri.
  - Xronoloji vahid siyahı və qalan gün sayğacları.
- **"Məktəbdən Qaçış" Mini-Oyunu**:
  - Canvas əsaslı, məktəb temalı kağız təyyarə oyunu (Flappy mechanics).
  - Mobil, planşet və masaüstü üçün xüsusi touch və klaviatura (Space, Enter, Esc) dəstəyi.
  - Yüksək xal (rekord) yaddaşı.
- **Üçdilli Dəstək**: Azərbaycan (AZ), İngilis (EN) və Rus (RU) dilləri arasında dərhal keçid.
- **Qaranlıq / İşıqlı Tema**: Göz yormayan, kontrastlı dark və light mode dəstəyi.
- **Responsive Dizayn**: Telefon (360px–430px), planşet (768px–1024px) və masaüstü (1366px–1920px) ekranlar üçün ayrıca düşünülmüş peşəkar UI/UX.

## Fayl Strukturu

```
├── index.html         # Əsas HTML strukturu və semantik işarələmə
├── css/
│   └── style.css      # CSS dəyişənləri, responsive grid və komponent stilləri
├── js/
│   ├── app.js         # Təqvim, countdown, tərcümələr və UI idarəetməsi
│   └── game.js        # Kağız təyyarə mini-oyununun fizika və render mühərriki
└── README.md          # Layihə haqqında təlimat və sənədləşmə
```

## GitHub Pages ilə İşə Salma

1. Layihə fayllarını GitHub repozitoriyasına yükləyin (`git push`).
2. Repozitoriyanın **Settings** bölməsinə keçin.
3. Sol menyudan **Pages** parametrini seçin.
4. **Build and deployment** hissəsində Branch olaraq `main` (və ya `master`), qovluq olaraq `/ (root)` seçin.
5. **Save** düyməsinə basın. Sayt bir neçə saniyə ərzində canlı yayıma çıxacaq.

## Tədris İli və Təqvim Məlumatları

Layihədə Azərbaycan Respublikası Elm və Təhsil Nazirliyinin ümumtəhsil məktəbləri üçün müəyyən etdiyi standart tədris qrafiki əks olunub:
- **Tədris ili**: 15 sentyabr 2026 – 14 iyun 2027
- **Payız tətili**: 16–20 noyabr 2026 (5 gün)
- **Qış tətili**: 27–31 yanvar 2027 (5 gün)
- **Əlavə yaz tətili**: 1–5 may 2027 (ibtidai siniflər üçün 5 gün)
- **Rəsmi bayramlar**: Müstəqilliyin Bərpası Günü, Zəfər Günü, Dövlət Bayrağı Günü, Konstitusiya Günü, Milli Dirçəliş Günü, Həmrəylik Günü, Yeni İl, Qadınlar Günü, Faşizm üzərində Qələbə Günü, Müstəqillik Günü.

Tarixlər `js/app.js` faylı daxilindəki `yearStart`, `yearEnd`, `holidays` və `officialDays` massivlərində mərkəzləşdirilmiş şəkildə saxlanılır.
