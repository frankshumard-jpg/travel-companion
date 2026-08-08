const departureDate = new Date('2026-08-15T09:00:00');
const flightStatusSamples = [
  { status: 'On time', gate: 'A12', flight: 'BA182', departure: '09:30' },
  { status: 'Boarding', gate: 'B4', flight: 'EY455', departure: '10:15' },
  { status: 'Delayed', gate: 'C7', flight: 'BA207', departure: '11:05' }
];

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) {
    return;
  }

  const now = new Date();
  const diff = departureDate - now;
  if (diff <= 0) {
    countdownEl.textContent = 'Departure day has arrived!';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  countdownEl.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

function updateWeather() {
  const weather = {
    london: 'Cloudy 18°C',
    edinburgh: 'Light rain 14°C',
    dover: 'Sunny 19°C',
    cruise: 'Calm seas 22°C',
    shopping: 'Light showers 16°C'
  };

  const summary = document.getElementById('weather-summary');
  if (summary) {
    summary.textContent = 'Placeholder weather status for trip planning and offline review.';
  }

  Object.keys(weather).forEach((location) => {
    const el = document.getElementById(`weather-${location}`);
    if (el) {
      el.textContent = weather[location];
    }
  });
}

function updateFlightStatus() {
  const target = document.getElementById('flight-status');
  if (!target) {
    return;
  }

  const item = flightStatusSamples[0];
  target.innerHTML = `<strong>${item.status}</strong><span>${item.flight} • Gate ${item.gate} • Departs ${item.departure}</span>`;
}

function updateOnlineStatus() {
  const statusEl = document.getElementById('connection-status');
  if (statusEl) {
    statusEl.textContent = navigator.onLine ? 'Online' : 'Offline';
  }

  if (navigator.onLine) {
    document.documentElement.classList.remove('offline');
    document.documentElement.classList.add('online');
  } else {
    document.documentElement.classList.remove('online');
    document.documentElement.classList.add('offline');
  }
}

function isExternalHttpLink(anchor) {
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#')) {
    return false;
  }

  try {
    const url = new URL(href, window.location.href);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return false;
    }

    const isCurrentHttp = window.location.protocol === 'http:' || window.location.protocol === 'https:';
    if (!isCurrentHttp) {
      return true;
    }

    return url.origin !== window.location.origin;
  } catch (error) {
    return false;
  }
}

function enforceExternalLinksInNewTab() {
  const links = document.querySelectorAll('a[href]');
  links.forEach((link) => {
    if (!isExternalHttpLink(link)) {
      return;
    }

    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

const destinationPages = new Set([
  'london.html',
  'edinburgh.html',
  'inverness.html',
  'portree.html',
  'belfast.html',
  'glasgow.html',
  'liverpool.html',
  'dublin.html',
  'cork.html',
  'haugesund.html',
  'nordfjordeid.html',
  'alesund.html',
  'odda.html',
  'rotterdam.html'
]);

const INFORMATION_COMING_SOON = 'Information coming soon.';

const transportationData = {
  london: {
    defaults: {
      hotelName: 'The May Fair Hotel',
      hotelLatitude: null,
      hotelLongitude: null,
      hotelAddress: 'Stratton Street, London W1J 8LT',
      shipShuttleDropoff: null,
      shuttleLatitude: null,
      shuttleLongitude: null
    },
    attractions: {
      'buckingham palace': {
        attractionName: 'Buckingham Palace',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: 'Buckingham Palace Road Stop',
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Buckingham Palace London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Buckingham Palace London'
      },
      'westminster / big ben': {
        attractionName: 'Westminster / Big Ben',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Big Ben Westminster London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Big Ben Westminster London'
      },
      'westminster abbey': {
        attractionName: 'Westminster Abbey',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Westminster Abbey London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Westminster Abbey London'
      },
      'churchill war rooms': {
        attractionName: 'Churchill War Rooms',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Churchill War Rooms London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Churchill War Rooms London'
      },
      'trafalgar square': {
        attractionName: 'Trafalgar Square',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Trafalgar Square London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Trafalgar Square London'
      },
      'tower of london': {
        attractionName: 'Tower of London',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Tower of London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Tower of London'
      },
      'windsor castle': {
        attractionName: 'Windsor Castle',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Windsor Castle',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Windsor Castle'
      },
      'sky garden': {
        attractionName: 'Sky Garden',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Sky Garden London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Sky Garden London'
      },
      'borough market': {
        attractionName: 'Borough Market',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Borough Market London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Borough Market London'
      },
      'tower bridge': {
        attractionName: 'Tower Bridge',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'Tower Bridge London',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'Tower Bridge London'
      },
      "st. paul's cathedral": {
        attractionName: "St. Paul's Cathedral",
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: "St Paul's Cathedral London",
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: "St Paul's Cathedral London"
      },
      'london eye / westminster area': {
        attractionName: 'London Eye / Westminster area',
        latitude: null,
        longitude: null,
        hotelName: 'The May Fair Hotel',
        hotelLatitude: null,
        hotelLongitude: null,
        shipShuttleDropoff: null,
        shuttleLatitude: null,
        shuttleLongitude: null,
        verifiedBigBusStop: null,
        busStopLatitude: null,
        busStopLongitude: null,
        taxiDestinationName: 'London Eye',
        taxiLatitude: null,
        taxiLongitude: null,
        googleMapsPlaceId: null,
        walkingDestination: 'London Eye'
      }
    }
  }
};

const layoutSections = [
  { key: 'overview', title: "Overview & Today's Plan" },
  { key: 'gettingAround', title: 'Getting Around' },
  { key: 'seeDo', title: 'Things to See & Do' },
  { key: 'shopDining', title: 'Shopping & Dining' },
  { key: 'practical', title: 'Practical Information' },
  { key: 'adventure', title: "Beyond the Gangway Adventure" }
];

function normalizeHeading(text) {
  return text
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/&/g, 'and')
    .replace(/\s+/g, ' ')
    .trim();
}

function createBlock(title, nodes) {
  const filteredNodes = nodes.filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.trim().length > 0;
    }

    return true;
  });

  if (!filteredNodes.length) {
    return null;
  }

  return {
    title,
    nodes: filteredNodes.map((node) => node.cloneNode(true))
  };
}

function extractBlocksFromArticle(article) {
  const children = Array.from(article.children);
  const primaryHeading = children.find((child) => /^H[1-6]$/.test(child.tagName));
  const secondaryHeadings = children.filter((child) => child.tagName === 'H4');

  if (!primaryHeading) {
    return [];
  }

  if (!secondaryHeadings.length) {
    const block = createBlock(
      primaryHeading.textContent.trim(),
      children.filter((child) => child !== primaryHeading)
    );

    return block ? [block] : [];
  }

  const blocks = [];
  let currentTitle = primaryHeading.textContent.trim();
  let currentNodes = [];
  let hasStartedSubsection = false;

  children.forEach((child) => {
    if (child === primaryHeading) {
      return;
    }

    if (child.tagName === 'H4') {
      const block = createBlock(currentTitle, currentNodes);
      if (block) {
        blocks.push(block);
      }

      currentTitle = child.textContent.trim();
      currentNodes = [];
      hasStartedSubsection = true;
      return;
    }

    if (!hasStartedSubsection || currentTitle) {
      currentNodes.push(child);
    }
  });

  const trailingBlock = createBlock(currentTitle, currentNodes);
  if (trailingBlock) {
    blocks.push(trailingBlock);
  }

  return blocks;
}

function extractDestinationBlocks(main) {
  const intro = main.querySelector('.page-intro');
  const gallery = main.querySelector('.photo-gallery-collapsible');
  const pageActions = main.querySelector('.page-actions');

  return Array.from(main.children)
    .filter((child) => child !== intro && child !== gallery && child !== pageActions)
    .flatMap((section) => Array.from(section.querySelectorAll(':scope > article')).flatMap(extractBlocksFromArticle));
}

function classifyDestinationBlock(title) {
  const text = normalizeHeading(title);

  if (
    text.includes('personal highlights') ||
    text.includes('personal notes') ||
    text.includes('travel notes') ||
    text.includes('travel note') ||
    text.includes('journal') ||
    text.includes("frank's notes") ||
    text.includes("lynn's notes") ||
    text.includes('planned tour') ||
    text.includes('insider tip') ||
    text.includes('adventure') ||
    text.includes('family history') ||
    text.includes('walking back through family history') ||
    text.includes('book ideas') ||
    text.includes('facebook story ideas') ||
    text.includes('people we met') ||
    text.includes('funny moments') ||
    text.includes('favorite photograph') ||
    text.includes('photo numbers') ||
    text.includes('highland memories') ||
    text.includes('favorite whisky') ||
    text.includes('nessie sightings') ||
    text.includes('meeting gerry') ||
    text.includes('family discoveries')
  ) {
    return 'adventure';
  }

  if (
    text.includes('port overview') ||
    text.includes("today's plan") ||
    text.includes('arrival information') ||
    text.includes('cruise arrival information') ||
    text.includes('day one') ||
    text.includes('hotel and transportation') ||
    text.includes('meeting preston') ||
    text.includes('belfast ideas') ||
    text.includes('frank and lynn ideas')
  ) {
    return 'overview';
  }

  if (
    text.includes('getting around') ||
    text.includes('transportation') ||
    text.includes('big bus') ||
    text.includes('rail') ||
    text.includes('taxi') ||
    text.includes('maps') ||
    text.includes('navigation') ||
    text.includes('tattoo logistics')
  ) {
    return 'gettingAround';
  }

  if (
    text.includes('highlights') ||
    text.includes('top sights') ||
    text.includes('things to see') ||
    text.includes('loch ness') ||
    text.includes('isle of skye') ||
    text.includes('hardangerfjord') ||
    text.includes('nordfjord region') ||
    text.includes('viking history') ||
    text.includes('sagastad') ||
    text.includes('scenic drives') ||
    text.includes('optional excursions') ||
    text.includes('nearby excursions') ||
    text.includes('possible excursions') ||
    text.includes('military tattoo') ||
    text.includes('dirleton castle') ||
    text.includes('walking back through family history') ||
    text.includes('attractions details') ||
    text.includes("don't miss this") ||
    text.includes('walking tour') ||
    text.includes('cobh connection') ||
    text.includes('cobh heritage centre') ||
    text.includes('blarney castle') ||
    text.includes('st. fin barre') ||
    text.includes('waterfront and harbour area') ||
    text.includes('haraldshaugen') ||
    text.includes('langfoss waterfall') ||
    text.includes('åkrafjord') ||
    text.includes('låtefossen') ||
    text.includes('trolltunga')
  ) {
    return 'seeDo';
  }

  if (
    text.includes('food') ||
    text.includes('drink') ||
    text.includes('shopping') ||
    text.includes('pub') ||
    text.includes('restaurant') ||
    text.includes('tea rooms') ||
    text.includes('independent shops') ||
    text.includes('english market')
  ) {
    return 'shopDining';
  }

  if (
    text.includes('money') ||
    text.includes('tipping') ||
    text.includes('practical') ||
    text.includes('photography') ||
    text.includes('travel tips') ||
    text.includes('weather') ||
    text.includes('emergency') ||
    text.includes('pharmacy') ||
    text.includes('packing') ||
    text.includes('restrooms') ||
    text.includes('etiquette') ||
    text.includes('money saving') ||
    text.includes('live-weather')
  ) {
    return 'practical';
  }

  return 'seeDo';
}

function mergeBlocksByTitle(blocks) {
  const merged = [];

  blocks.forEach((block) => {
    const existing = merged.find((item) => normalizeHeading(item.title) === normalizeHeading(block.title));
    if (existing) {
      existing.nodes.push(...block.nodes.map((node) => node.cloneNode(true)));
      return;
    }

    merged.push({
      title: block.title,
      nodes: block.nodes.map((node) => node.cloneNode(true))
    });
  });

  return merged;
}

function buildDestinationSection(title, blocks) {
  if (!blocks.length) {
    return null;
  }

  const section = document.createElement('section');
  section.className = 'overview-grid';

  const article = document.createElement('article');
  article.className = 'overview-card';
  article.style.gridColumn = '1 / -1';

  const sectionHeading = document.createElement('h3');
  sectionHeading.textContent = title;
  article.appendChild(sectionHeading);

  mergeBlocksByTitle(blocks).forEach((block, index) => {
    if (!block.nodes.length) {
      return;
    }

    const subsectionHeading = document.createElement('h4');
    subsectionHeading.textContent = block.title;
    subsectionHeading.style.margin = index === 0 ? '1rem 0 0' : '1.5rem 0 0';
    article.appendChild(subsectionHeading);
    block.nodes.forEach((node) => article.appendChild(node));
  });

  section.appendChild(article);
  return section;
}

function reorganizeDestinationPage() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (!destinationPages.has(pageName)) {
    return;
  }

  if (pageName === 'london.html') {
    return;
  }

  const main = document.querySelector('main');
  if (!main || main.dataset.reorganized === 'true') {
    return;
  }

  const intro = main.querySelector('.page-intro');
  const gallery = main.querySelector('.photo-gallery-collapsible');
  const pageActions = main.querySelector('.page-actions');
  const blocks = extractDestinationBlocks(main);

  if (!intro || !blocks.length) {
    return;
  }

  const groupedBlocks = {
    overview: [],
    gettingAround: [],
    seeDo: [],
    shopDining: [],
    practical: [],
    adventure: []
  };

  blocks.forEach((block) => {
    groupedBlocks[classifyDestinationBlock(block.title)].push(block);
  });

  Array.from(main.children).forEach((child) => {
    if (child !== intro && child !== gallery && child !== pageActions) {
      child.remove();
    }
  });

  const rebuiltSections = layoutSections
    .map((section) => {
      if (section.key === 'adventure' && gallery && !groupedBlocks[section.key].length) {
        return buildDestinationSection(section.title, [{ title: section.title, nodes: [] }]);
      }

      return buildDestinationSection(section.title, groupedBlocks[section.key]);
    })
    .filter(Boolean);

  if (gallery) {
    rebuiltSections.forEach((section) => main.insertBefore(section, gallery));
  } else if (pageActions) {
    rebuiltSections.forEach((section) => main.insertBefore(section, pageActions));
  } else {
    rebuiltSections.forEach((section) => main.appendChild(section));
  }

  main.dataset.reorganized = 'true';
}

function runStartupStep(name, fn) {
  try {
    fn();
  } catch (error) {
    console.warn(`Startup step failed: ${name}`, error);
  }
}

window.addEventListener('load', () => {
  runStartupStep('updateCountdown', updateCountdown);
  runStartupStep('updateWeather', updateWeather);
  runStartupStep('updateFlightStatus', updateFlightStatus);
  runStartupStep('updateOnlineStatus', updateOnlineStatus);
  runStartupStep('reorganizeDestinationPage', reorganizeDestinationPage);
  runStartupStep('removeLegacyLondonAttractionSections', removeLegacyLondonAttractionSections);
  runStartupStep('initializeLondonAttractionTemplate', initializeLondonAttractionTemplate);
  runStartupStep('trimLondonPageToMasterAttractions', trimLondonPageToMasterAttractions);
  runStartupStep('initializeLondonPlacesAccordionItems', initializeLondonPlacesAccordionItems);
  runStartupStep('initializeLondonBeforeYouGoBriefing', initializeLondonBeforeYouGoBriefing);
  runStartupStep('initializeLondonPersonalFeatures', initializeLondonPersonalFeatures);
  runStartupStep('initializeGenericPageNotes', initializeGenericPageNotes);
  runStartupStep('initializeLondonUtilityPages', initializeLondonUtilityPages);
  runStartupStep('initializeDestinationTravelSections', initializeDestinationTravelSections);
  runStartupStep('initializeLondonAccordionIndicators', initializeLondonAccordionIndicators);
  runStartupStep('initializeLondonAccordionButtons', initializeLondonAccordionButtons);
  runStartupStep('initializeLondonBigBusWalkButtons', initializeLondonBigBusWalkButtons);
  runStartupStep('initializeLondonPhotoGalleryButtons', initializeLondonPhotoGalleryButtons);
  runStartupStep('initializeGalleryToggle', initializeGalleryToggle);
  runStartupStep('initializePhotoGallery', initializePhotoGallery);
  runStartupStep('enforceExternalLinksInNewTab', enforceExternalLinksInNewTab);
  setInterval(updateCountdown, 1000);
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.warn('Service Worker registration failed:', error);
      });
  }
});

const PHOTO_SCHEMA_VERSION = 2;

function getPhotoStorageKey() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  return `travelCompanion.gallery.${pageName}`;
}

function loadPhotoState() {
  try {
    const raw = localStorage.getItem(getPhotoStorageKey());
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.photos)) {
      return [];
    }

    return parsed.photos.filter((photo) => photo && photo.id && photo.imageDataUrl);
  } catch (error) {
    console.warn('Unable to load photo state:', error);
    return [];
  }
}

function savePhotoState(photos) {
  const payload = {
    schemaVersion: PHOTO_SCHEMA_VERSION,
    syncReady: true,
    savedAt: new Date().toISOString(),
    photos
  };

  try {
    localStorage.setItem(getPhotoStorageKey(), JSON.stringify(payload));
  } catch (error) {
    console.warn('Unable to save photo state:', error);
  }
}

function createPhotoId() {
  return `photo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function slugifySectionName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function collectPhotoSections() {
  const main = document.querySelector('main');
  if (!main) {
    return [];
  }

  const labels = [];
  const sections = main.querySelectorAll('.overview-card h3, .overview-card h4');

  sections.forEach((heading) => {
    if (heading.closest('.photo-gallery-collapsible')) {
      return;
    }

    const text = heading.textContent.trim();
    if (!text) {
      return;
    }

    const normalized = normalizeHeading(text);
    if (!labels.some((label) => normalizeHeading(label) === normalized)) {
      labels.push(text);
    }
  });

  return labels;
}

function ensureInlinePhotoStrips(sectionLabels) {
  const main = document.querySelector('main');
  if (!main) {
    return;
  }

  const headingNodes = main.querySelectorAll('.overview-card h4');
  headingNodes.forEach((heading) => {
    if (heading.closest('.photo-gallery-collapsible')) {
      return;
    }

    const sectionName = heading.textContent.trim();
    if (!sectionLabels.includes(sectionName)) {
      return;
    }

    const sectionId = slugifySectionName(sectionName);
    heading.dataset.photoSection = sectionId;

    const next = heading.nextElementSibling;
    if (next && next.classList.contains('inline-photo-strip')) {
      return;
    }

    const strip = document.createElement('div');
    strip.className = 'inline-photo-strip';
    strip.dataset.photoSection = sectionId;
    heading.insertAdjacentElement('afterend', strip);
  });
}

function isLikelyImageFile(file) {
  const mimeType = (file?.type || '').toLowerCase();
  if (mimeType.startsWith('image/')) {
    return true;
  }

  const fileName = (file?.name || '').toLowerCase();
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg|heic|heif|avif|tif|tiff)$/i.test(fileName);
}

function getImageMimeTypeFromName(fileName) {
  const name = (fileName || '').toLowerCase();

  if (name.endsWith('.jpg') || name.endsWith('.jpeg')) {
    return 'image/jpeg';
  }

  if (name.endsWith('.png')) {
    return 'image/png';
  }

  if (name.endsWith('.gif')) {
    return 'image/gif';
  }

  if (name.endsWith('.webp')) {
    return 'image/webp';
  }

  if (name.endsWith('.bmp')) {
    return 'image/bmp';
  }

  if (name.endsWith('.svg')) {
    return 'image/svg+xml';
  }

  if (name.endsWith('.heic')) {
    return 'image/heic';
  }

  if (name.endsWith('.heif')) {
    return 'image/heif';
  }

  if (name.endsWith('.avif')) {
    return 'image/avif';
  }

  if (name.endsWith('.tif') || name.endsWith('.tiff')) {
    return 'image/tiff';
  }

  return '';
}

function normalizeImageDataUrl(rawResult, file) {
  if (typeof rawResult !== 'string' || !rawResult.startsWith('data:')) {
    return '';
  }

  if (rawResult.startsWith('data:image/')) {
    return rawResult;
  }

  const commaIndex = rawResult.indexOf(',');
  if (commaIndex === -1) {
    return '';
  }

  const mimeFromFile = (file?.type || '').toLowerCase();
  const mimeFromName = getImageMimeTypeFromName(file?.name || '');
  const imageMimeType = mimeFromFile.startsWith('image/') ? mimeFromFile : mimeFromName;

  if (!imageMimeType) {
    return '';
  }

  const payload = rawResult.slice(commaIndex + 1);
  if (!payload) {
    return '';
  }

  const metadata = rawResult.slice(5, commaIndex).toLowerCase();
  const hasBase64Flag = metadata.includes(';base64');

  return hasBase64Flag
    ? `data:${imageMimeType};base64,${payload}`
    : `data:${imageMimeType},${payload}`;
}

function canRenderImageDataUrl(dataUrl) {
  return new Promise((resolve) => {
    if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
      resolve(false);
      return;
    }

    const testImage = new Image();
    testImage.onload = () => resolve(testImage.naturalWidth > 0 && testImage.naturalHeight > 0);
    testImage.onerror = () => resolve(false);
    testImage.src = dataUrl;
  });
}

async function chooseRenderableImageDataUrl(rawResult, file) {
  const normalizedDataUrl = normalizeImageDataUrl(rawResult, file);
  const candidates = [];

  if (typeof rawResult === 'string' && rawResult.startsWith('data:')) {
    candidates.push(rawResult);
  }

  if (normalizedDataUrl && normalizedDataUrl !== rawResult) {
    candidates.push(normalizedDataUrl);
  }

  for (const candidate of candidates) {
    // Verify the browser can decode the candidate before saving it.
    const renderable = await canRenderImageDataUrl(candidate);
    if (renderable) {
      return candidate;
    }
  }

  return '';
}

function readFilesAsDataUrls(fileList) {
  const files = Array.from(fileList || []).filter((file) => isLikelyImageFile(file));
  return Promise.all(files.map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const renderableDataUrl = await chooseRenderableImageDataUrl(reader.result, file);
      if (!renderableDataUrl) {
        resolve(null);
        return;
      }

      resolve({
        name: file.name,
        mimeType: (file.type || getImageMimeTypeFromName(file.name || '') || '').toLowerCase(),
        imageDataUrl: renderableDataUrl
      });
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  })));
}

function buildPhotoChooser(addPhotoButton) {
  const chooser = document.createElement('div');
  chooser.className = 'photo-action-sheet';
  chooser.hidden = true;
  chooser.innerHTML = `
    <div class="photo-action-backdrop" data-dismiss="true"></div>
    <div class="photo-action-panel" role="dialog" aria-modal="true" aria-label="Add Photo">
      <h4>Add Photo</h4>
      <button type="button" class="button" data-source="camera">📷 Take Photo</button>
      <button type="button" class="button" data-source="library">🖼 Choose from Photo Library</button>
      <button type="button" class="button" data-source="file">📁 Choose File</button>
      <button type="button" class="button secondary" data-dismiss="true">Cancel</button>
    </div>
  `;

  const cameraInput = document.createElement('input');
  cameraInput.type = 'file';
  cameraInput.accept = 'image/*';
  cameraInput.capture = 'environment';
  cameraInput.multiple = true;
  cameraInput.hidden = true;

  const libraryInput = document.createElement('input');
  libraryInput.type = 'file';
  libraryInput.accept = 'image/*';
  libraryInput.multiple = true;
  libraryInput.hidden = true;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.hidden = true;

  document.body.appendChild(chooser);
  document.body.appendChild(cameraInput);
  document.body.appendChild(libraryInput);
  document.body.appendChild(fileInput);

  function closeChooser() {
    chooser.hidden = true;
  }

  function openChooser() {
    chooser.hidden = false;
  }

  chooser.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.dataset.dismiss === 'true') {
      closeChooser();
      return;
    }

    if (target.dataset.source === 'camera') {
      closeChooser();
      cameraInput.click();
      return;
    }

    if (target.dataset.source === 'library') {
      closeChooser();
      libraryInput.click();
      return;
    }

    if (target.dataset.source === 'file') {
      closeChooser();
      fileInput.click();
    }
  });

  addPhotoButton.addEventListener('click', openChooser);

  return {
    cameraInput,
    libraryInput,
    fileInput
  };
}

function createInlineThumbnail(photo, openLightbox) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'inline-thumb-btn';
  button.title = photo.caption || 'Open photo';

  const image = document.createElement('img');
  image.src = photo.imageDataUrl;
  image.alt = photo.caption || 'Trip photo';
  button.appendChild(image);

  button.addEventListener('click', () => openLightbox(photo));
  return button;
}

function initializePhotoGallery() {
  const addPhotoButton = document.getElementById('add-photo-btn');
  const galleryGrid = document.getElementById('photo-gallery-grid');
  const galleryHost = addPhotoButton?.closest('.photo-gallery-collapsible');
  const galleryContent = galleryHost?.querySelector('.gallery-content');

  if (!addPhotoButton || !galleryGrid) {
    return;
  }

  addPhotoButton.textContent = '📷 Add Photo';

  function mountGalleryIntoSection(section) {
    if (!galleryContent || !section) {
      return;
    }

    const body = section.querySelector('.london-section-body');
    if (!body) {
      return;
    }

    if (galleryContent.parentElement !== body) {
      body.appendChild(galleryContent);
    }

    galleryContent.hidden = false;
    galleryContent.setAttribute('aria-hidden', 'false');
    galleryContent.style.maxHeight = 'none';
    galleryContent.style.overflow = 'visible';
  }

  function wireSectionGalleryMounts() {
    const sections = document.querySelectorAll('.london-section-gallery');
    if (!sections.length) {
      return;
    }

    sections.forEach((section) => {
      section.addEventListener('toggle', () => {
        if (section.open) {
          mountGalleryIntoSection(section);
        }
      });
    });

    const initiallyOpen = Array.from(sections).find((section) => section.open);
    if (initiallyOpen) {
      mountGalleryIntoSection(initiallyOpen);
    }
  }


  const sectionLabels = collectPhotoSections();
  ensureInlinePhotoStrips(sectionLabels);
  const sectionOptions = sectionLabels.map((name) => ({
    id: slugifySectionName(name),
    name
  }));

  let photos = loadPhotoState();

  function syncExpandedGalleryHeight() {
    if (!galleryContent || galleryContent.hidden || galleryContent.getAttribute('aria-hidden') === 'true') {
      return;
    }

    galleryContent.style.maxHeight = 'none';
    galleryContent.style.overflow = 'visible';
  }

  const lightbox = document.createElement('div');
  lightbox.className = 'photo-lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <button type="button" class="lightbox-close button secondary">Close</button>
    <img alt="Full size travel photo">
    <p class="lightbox-caption"></p>
  `;
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeLightboxButton = lightbox.querySelector('.lightbox-close');

  function closeLightbox() {
    lightbox.hidden = true;
  }

  function openLightbox(photo) {
    if (!lightboxImage || !lightboxCaption) {
      return;
    }

    lightboxImage.src = photo.imageDataUrl;
    lightboxImage.alt = photo.caption || 'Full size travel photo';
    lightboxCaption.textContent = photo.caption || photo.notes || '';
    lightbox.hidden = false;
  }

  if (closeLightboxButton) {
    closeLightboxButton.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  function renderInlineThumbnails() {
    const strips = document.querySelectorAll('.inline-photo-strip');
    strips.forEach((strip) => {
      strip.innerHTML = '';
      const sectionId = strip.dataset.photoSection;
      const relevantPhotos = photos.filter((photo) => photo.sectionId === sectionId);

      relevantPhotos.forEach((photo) => {
        strip.appendChild(createInlineThumbnail(photo, openLightbox));
      });

      strip.hidden = relevantPhotos.length === 0;
    });
  }

  function renderCard(photo) {
    const card = document.createElement('article');
    card.className = 'photo-card';

    const imageButton = document.createElement('button');
    imageButton.type = 'button';
    imageButton.className = 'photo-thumb-btn';

    const image = document.createElement('img');
    image.src = photo.imageDataUrl;
    image.alt = photo.caption || 'Travel photo thumbnail';
    imageButton.appendChild(image);
    imageButton.addEventListener('click', () => openLightbox(photo));
    card.appendChild(imageButton);

    const sectionLabel = document.createElement('label');
    sectionLabel.textContent = 'Section';
    sectionLabel.className = 'photo-input-label';
    card.appendChild(sectionLabel);

    const sectionSelect = document.createElement('select');
    sectionSelect.className = 'photo-section-select';
    sectionOptions.forEach((option) => {
      const node = document.createElement('option');
      node.value = option.id;
      node.textContent = option.name;
      sectionSelect.appendChild(node);
    });
    sectionSelect.value = photo.sectionId;
    sectionSelect.addEventListener('change', () => {
      photo.sectionId = sectionSelect.value;
      savePhotoState(photos);
      renderInlineThumbnails();
    });
    card.appendChild(sectionSelect);

    const captionLabel = document.createElement('label');
    captionLabel.textContent = 'Caption';
    captionLabel.className = 'photo-input-label';
    card.appendChild(captionLabel);

    const captionInput = document.createElement('input');
    captionInput.type = 'text';
    captionInput.className = 'photo-caption-input';
    captionInput.value = photo.caption || '';
    captionInput.placeholder = 'Optional caption';
    captionInput.addEventListener('input', () => {
      photo.caption = captionInput.value;
      image.alt = photo.caption || 'Travel photo thumbnail';
      savePhotoState(photos);
      renderInlineThumbnails();
    });
    card.appendChild(captionInput);

    const notesLabel = document.createElement('label');
    notesLabel.textContent = 'Notes';
    notesLabel.className = 'photo-input-label';
    card.appendChild(notesLabel);

    const notesTextarea = document.createElement('textarea');
    notesTextarea.className = 'photo-notes-input';
    notesTextarea.rows = 4;
    notesTextarea.placeholder = 'Optional memory or story';
    notesTextarea.value = photo.notes || '';
    notesTextarea.addEventListener('input', () => {
      photo.notes = notesTextarea.value;
      savePhotoState(photos);
    });
    card.appendChild(notesTextarea);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'button secondary delete-photo-btn';
    deleteButton.textContent = 'Delete Photo';
    deleteButton.addEventListener('click', () => {
      photos = photos.filter((entry) => entry.id !== photo.id);
      savePhotoState(photos);
      renderGallery();
    });

    const actions = document.createElement('div');
    actions.className = 'photo-card-actions';
    actions.appendChild(deleteButton);
    card.appendChild(actions);

    return card;
  }

  function renderGallery() {
    galleryGrid.innerHTML = '';
    photos.forEach((photo) => {
      galleryGrid.appendChild(renderCard(photo));
    });

    const renderedImages = galleryGrid.querySelectorAll('img');
    renderedImages.forEach((img) => {
      if (img.complete) {
        return;
      }

      img.addEventListener('load', syncExpandedGalleryHeight, { once: true });
      img.addEventListener('error', syncExpandedGalleryHeight, { once: true });
    });

    renderInlineThumbnails();
    syncExpandedGalleryHeight();
  }

  const chooser = buildPhotoChooser(addPhotoButton);

  async function handleSelectedFiles(fileList, source) {
    const loaded = await readFilesAsDataUrls(fileList);
    const defaultSectionId = sectionOptions[0]?.id || 'general';

    const additions = loaded
      .filter(Boolean)
      .map((item) => ({
        id: createPhotoId(),
        createdAt: new Date().toISOString(),
        source,
        sectionId: defaultSectionId,
        caption: '',
        notes: '',
        imageDataUrl: item.imageDataUrl,
        fileName: item.name,
        mimeType: item.mimeType
      }));

    if (!additions.length) {
      return;
    }

    photos = photos.concat(additions);
    savePhotoState(photos);
    renderGallery();
  }

  chooser.cameraInput.addEventListener('change', async () => {
    await handleSelectedFiles(chooser.cameraInput.files, 'camera');
    chooser.cameraInput.value = '';
  });

  chooser.libraryInput.addEventListener('change', async () => {
    await handleSelectedFiles(chooser.libraryInput.files, 'library');
    chooser.libraryInput.value = '';
  });

  chooser.fileInput.addEventListener('change', async () => {
    await handleSelectedFiles(chooser.fileInput.files, 'file');
    chooser.fileInput.value = '';
  });

  wireSectionGalleryMounts();
  renderGallery();
}

function updateGalleryContentHeight(content, expanded) {
  if (!content) {
    return;
  }

  if (expanded) {
    content.hidden = false;
    content.setAttribute('aria-hidden', 'false');
    content.style.maxHeight = 'none';
    content.style.overflow = 'visible';
  } else {
    content.style.maxHeight = '0px';
    content.style.overflow = 'hidden';
    content.setAttribute('aria-hidden', 'true');
    content.hidden = true;
  }
}

function initializeGalleryToggle() {
  const toggleButtons = document.querySelectorAll('.gallery-toggle');
  toggleButtons.forEach((button) => {
    const content = button.closest('.photo-gallery-collapsible')?.querySelector('.gallery-content');
    if (!content) {
      return;
    }

    button.textContent = "Beyond the Gangway Travel Photo Gallery";
    button.setAttribute('aria-expanded', 'false');
    content.style.transition = 'max-height 0.28s ease';
    updateGalleryContentHeight(content, false);

    // Use a single assigned handler so repeated initialization cannot stack listeners.
    button.onclick = () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isExpanded));

      updateGalleryContentHeight(content, !isExpanded);
    };
  });
}

function buildWalkingDirectionsUrl(origin, destination) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking`;
}

function buildMapsSearchUrl(query, placeId) {
  if (!query && !placeId) {
    return '';
  }

  const safeQuery = query || 'London';
  if (placeId) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(safeQuery)}&query_place_id=${encodeURIComponent(placeId)}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(safeQuery)}`;
}

function buildTransitDirectionsUrl(origin, destination, transitMode) {
  const params = new URLSearchParams({
    api: '1',
    destination,
    travelmode: 'transit'
  });

  if (origin) {
    params.set('origin', origin);
  }

  if (transitMode) {
    params.set('transit_mode', transitMode);
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

const londonAttractionTemplates = [
  {
    key: 'tower of london',
    title: 'Tower of London',
    googleMapsQuery: 'Tower of London',
    summary: [
      'History: Medieval fortress, royal palace, prison, mint, and execution site with nearly 1,000 years of history.',
      'Crown Jewels: Start here early so you can see the Jewel House before the biggest crowds arrive.',
      'White Tower: The oldest part of the fortress and the best place to understand the castle\'s origins.',
      'Yeoman Warders (Beefeaters): Join a free tour for the best stories, legends, and practical orientation.',
      'Ravens: The tower\'s famous ravens are part of the legend and a classic photo moment.',
      'Traitors\' Gate: Look toward the historic water entrance used for prisoners and royal arrivals.'
    ],
    visitTime: 'Suggested visit time: 3–4 hours.',
    admission: 'Adult tickets are typically about £34–£36 online; book timed entry in advance when possible.',
    hours: 'Usually 9:00 AM–5:30 PM in summer and 10:00 AM–4:30 PM in winter; last admission varies seasonally.',
    mainNear: [
      { name: 'Tower Bridge', time: '5-minute walk', query: 'Tower Bridge London', walkQuery: 'Tower of London to Tower Bridge London' },
      { name: 'Sky Garden', time: '10-minute walk', query: 'Sky Garden London', walkQuery: 'Tower of London to Sky Garden London' },
      { name: 'Borough Market', time: '12-minute walk', query: 'Borough Market London', walkQuery: 'Tower of London to Borough Market London' },
      { name: 'HMS Belfast', time: '15-minute walk', query: 'HMS Belfast London', walkQuery: 'Tower of London to HMS Belfast London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line eastbound to Westminster, then change to the District or Circle line for Tower Hill.',
        'Exit Tower Hill station via the Tower Hill / Byward Street exit and walk about 5–7 minutes to the fortress entrance.',
        'Estimated travel time: 35–45 minutes including walking and the change.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 15 near Piccadilly Circus or Trafalgar Square.',
        'Exit at Tower Hill / Tower of London.',
        'Walk 5–8 minutes to the main entrance.',
        'Estimated travel time: 35–50 minutes depending on traffic.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £12–£22.',
      time: 'Typical travel time: 20–35 minutes.'
    }
  },
  {
    key: 'tower bridge',
    title: 'Tower Bridge',
    googleMapsQuery: 'Tower Bridge London',
    summary: [
      'What to look for: Victorian bascules, high-level walkways, and Thames views.',
      'History: Opened in 1894 to preserve river traffic and road access.',
      'Best photo location: Butler\'s Wharf and St. Katharine Docks viewpoints.'
    ],
    visitTime: 'Suggested visit time: 60 minutes.',
    admission: 'If you enter the exhibition, book ahead; exterior viewing is free.',
    hours: 'Tower Bridge Exhibition hours vary by season; allow a daylight visit for the best views.',
    mainNear: [
      { name: 'Tower of London', time: '5-minute walk', query: 'Tower of London', walkQuery: 'Tower Bridge London to Tower of London' },
      { name: 'St Katharine Docks', time: '8-minute walk', query: 'St Katharine Docks London', walkQuery: 'Tower Bridge London to St Katharine Docks London' },
      { name: 'HMS Belfast', time: '12-minute walk', query: 'HMS Belfast London', walkQuery: 'Tower Bridge London to HMS Belfast London' },
      { name: 'Sky Garden', time: '15-minute walk', query: 'Sky Garden London', walkQuery: 'Tower Bridge London to Sky Garden London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line eastbound to London Bridge.',
        'Exit toward Tooley Street / Tower Bridge and walk about 10 minutes to the bridge.',
        'Estimated travel time: 25–35 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 15 from Piccadilly Circus or Trafalgar Square.',
        'Exit at Tower Hill or Tower Gateway and walk to Tower Bridge.',
        'Estimated travel time: 35–50 minutes depending on traffic.',
        'Current fare: £1.75 with the Hopper fare.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £12–£20.',
      time: 'Typical travel time: 20–30 minutes.'
    }
  },
  {
    key: 'westminster / big ben',
    title: 'Westminster / Big Ben',
    googleMapsQuery: 'Big Ben Westminster London',
    summary: [
      'What to look for: Elizabeth Tower, Parliament facade, and Westminster Bridge skyline.',
      'History: Center of UK parliamentary tradition with major constitutional milestones.',
      'WWII connection: Parliament and nearby Whitehall remained symbolic through the Blitz.',
      'Best photo location: Westminster Bridge and the riverside embankment.'
    ],
    visitTime: 'Suggested visit time: 60–90 minutes.',
    admission: 'Exterior viewing is free; Parliament tours are separately ticketed.',
    hours: 'Outdoor areas are always accessible; interior tours vary by parliamentary calendar.',
    mainNear: [
      { name: 'Westminster Abbey', time: '5-minute walk', query: 'Westminster Abbey London', walkQuery: 'Big Ben Westminster London to Westminster Abbey London' },
      { name: 'Churchill War Rooms', time: '9-minute walk', query: 'Churchill War Rooms London', walkQuery: 'Big Ben Westminster London to Churchill War Rooms London' },
      { name: 'Horse Guards Parade', time: '12-minute walk', query: 'Horse Guards Parade London', walkQuery: 'Big Ben Westminster London to Horse Guards Parade London' },
      { name: 'London Eye', time: '14-minute walk', query: 'London Eye', walkQuery: 'Big Ben Westminster London to London Eye' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line one stop to Westminster.',
        'Use the Westminster Bridge / Parliament exit for direct views of Big Ben.',
        'Estimated travel time: 12–18 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 11 or 24 from the Piccadilly / Trafalgar area.',
        'Exit at Westminster / Parliament Square.',
        'Walk 2–5 minutes to the riverfront viewpoints.',
        'Estimated travel time: 15–30 minutes.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £9–£15.',
      time: 'Typical travel time: 10–20 minutes.'
    }
  },
  {
    key: 'buckingham palace',
    title: 'Buckingham Palace',
    googleMapsQuery: 'Buckingham Palace London',
    summary: [
      'What to look for: The palace facade, forecourt, and Victoria Memorial axis.',
      'Royal connections: Official London residence for major ceremonies and state events.',
      'History: Central to coronations, jubilees, and national balcony moments.',
      'Best photo location: Victoria Memorial steps facing the palace gates.'
    ],
    featuredExperiences: [
      {
        title: 'Changing of the Guard',
        meetingLocation: 'Duke of York Column',
        mapsQuery: 'Duke of York Column London',
        details: [
          'Timing: Ceremonial schedule varies by season and weather; confirm the day before.',
          'Best strategy: Arrive early, then walk to Buckingham Palace forecourt for the main handover views.',
          'Viewing advice: Keep to rail edges around St James\'s Park approaches for wider sightlines.'
        ],
        nearby: [
          { name: 'St James\'s Park', time: '6-minute walk', query: 'St James\'s Park London' },
          { name: 'Horse Guards Parade', time: '9-minute walk', query: 'Horse Guards Parade London' },
          { name: 'Westminster Abbey', time: '16-minute walk', query: 'Westminster Abbey London' },
          { name: 'Big Ben', time: '18-minute walk', query: 'Big Ben Westminster London' },
          { name: 'Churchill War Rooms', time: '15-minute walk', query: 'Churchill War Rooms London' }
        ]
      },
      {
        title: 'Horse Guards Parade',
        meetingLocation: 'Horse Guards Parade Ground',
        mapsQuery: 'Horse Guards Parade London',
        details: [
          'History: Ceremonial parade ground of the Household Division beside Whitehall and St James\'s Park.',
          'Why it is worth seeing: Iconic mounted guards, strong royal-military pageantry, and classic London architecture.',
          'Best photo locations: Horse Guards Arch, Whitehall frontage, and the park edge by St James\'s Park Lake.',
          'Guard changing information: Horse Guards changing and mounted guard routines run on published schedules and can shift for events.'
        ]
      }
    ],
    visitTime: 'Suggested visit time: 90 minutes.',
    admission: 'Exterior access is free; State Rooms require timed tickets during open season.',
    hours: 'Forecourt and surrounding streets are open all day; State Rooms operate seasonally with timed entry.',
    mainNear: [
      { name: 'St James\'s Park', time: '6-minute walk', query: 'St James\'s Park London', walkQuery: 'Buckingham Palace London to St James\'s Park London' },
      { name: 'Horse Guards Parade', time: '9-minute walk', query: 'Horse Guards Parade London', walkQuery: 'Buckingham Palace London to Horse Guards Parade London' },
      { name: 'Westminster Abbey', time: '16-minute walk', query: 'Westminster Abbey London', walkQuery: 'Buckingham Palace London to Westminster Abbey London' },
      { name: 'Big Ben', time: '18-minute walk', query: 'Big Ben Westminster London', walkQuery: 'Buckingham Palace London to Big Ben Westminster London' },
      { name: 'Churchill War Rooms', time: '15-minute walk', query: 'Churchill War Rooms London', walkQuery: 'Buckingham Palace London to Churchill War Rooms London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Use the Green Park / Piccadilly exit and walk south-west via Constitution Hill.',
        'Continue to the Victoria Memorial and palace gates.',
        'Estimated travel time: 10–18 minutes including walking.'
      ],
      fare: 'Current contactless/Oyster fare: not required if walking directly from Mayfair.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 11 or 211 from the Piccadilly / Green Park area.',
        'Exit near Buckingham Palace Road or Victoria Memorial.',
        'Walk 4–8 minutes to the forecourt.',
        'Estimated travel time: 15–25 minutes depending on traffic.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £8–£14.',
      time: 'Typical travel time: 8–15 minutes.'
    }
  },
  {
    key: 'sky garden',
    title: 'Sky Garden',
    googleMapsQuery: 'Sky Garden London',
    summary: [
      'Why visit: A dramatic skyline experience without paying for a wheel or tower ticket.',
      '360° panoramic views: Wide views across the Thames, Tower Bridge, and the City.',
      'Indoor gardens: The planted interior makes the space feel special on a cloudy day.',
      'Restaurants: Reserve a meal or drink if you want the visit to feel more leisurely.',
      'Free admission with reservation: Book a slot ahead of time because walk-ins are limited.'
    ],
    visitTime: 'Suggested visit time: 60–90 minutes.',
    admission: 'Free with reservation. Reserve your timed slot before you travel.',
    hours: 'Opening hours vary by day and reservation window; check the chosen slot when booking.',
    mainNear: [
      { name: 'Tower of London', time: '10-minute walk', query: 'Tower of London', walkQuery: 'Sky Garden London to Tower of London' },
      { name: 'Tower Bridge', time: '12-minute walk', query: 'Tower Bridge London', walkQuery: 'Sky Garden London to Tower Bridge London' },
      { name: 'Borough Market', time: '15-minute walk', query: 'Borough Market London', walkQuery: 'Sky Garden London to Borough Market London' },
      { name: 'Monument', time: '5-minute walk', query: 'Monument London', walkQuery: 'Sky Garden London to Monument London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line eastbound to Westminster and change to the District or Circle line for Monument.',
        'Walk 5 minutes from Monument station to Sky Garden.',
        'Estimated travel time: 20–30 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 11 or 15 toward the City / Tower Hill area.',
        'Exit near Monument, Tower Hill, or Fenchurch Street depending on live traffic.',
        'Walk a few minutes to Sky Garden.',
        'Estimated travel time: 25–40 minutes.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £10–£18.',
      time: 'Typical travel time: 15–25 minutes.'
    }
  },
  {
    key: 'borough market',
    title: 'Borough Market',
    googleMapsQuery: 'Borough Market London',
    summary: [
      'History: One of London\'s best-known food markets with centuries of trading history.',
      'Best food vendors: Look for cheese toasties, pies, oysters, pastries, and seasonal street food.',
      'British specialties: A great place for classic British lunch dishes and snacks.',
      'Great lunch location: Pair it with Tower Bridge, Tower of London, or Sky Garden.'
    ],
    visitTime: 'Suggested visit time: 1–2 hours.',
    admission: 'Entry is free; budget separately for food and drinks.',
    hours: 'Market hours vary by day and stall; lunchtime is the easiest time to visit.',
    mainNear: [
      { name: 'Tower Bridge', time: '12-minute walk', query: 'Tower Bridge London', walkQuery: 'Borough Market London to Tower Bridge London' },
      { name: 'Tower of London', time: '15-minute walk', query: 'Tower of London', walkQuery: 'Borough Market London to Tower of London' },
      { name: 'Sky Garden', time: '15-minute walk', query: 'Sky Garden London', walkQuery: 'Borough Market London to Sky Garden London' },
      { name: 'Southwark Cathedral', time: '5-minute walk', query: 'Southwark Cathedral London', walkQuery: 'Borough Market London to Southwark Cathedral London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line eastbound directly to London Bridge.',
        'Exit toward Borough High Street and follow the signs to Borough Market.',
        'Estimated travel time: 15–25 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 148 from Piccadilly Circus or Trafalgar Square.',
        'Exit at London Bridge / Borough High Street.',
        'Walk 5–8 minutes to the market.',
        'Estimated travel time: 25–40 minutes.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £12–£18.',
      time: 'Typical travel time: 20–30 minutes.'
    }
  },
  {
    key: 'trafalgar square',
    title: 'Trafalgar Square',
    googleMapsQuery: 'Trafalgar Square London',
    summary: [
      'What to look for: Nelson\'s Column, lion statues, and the fountains in the central plaza.',
      'History: Landmark civic square with major national celebrations and demonstrations.',
      'Why it is worth seeing: A central orientation point connecting Westminster, Covent Garden, and the Strand.',
      'Best photo location: The north terrace toward the National Gallery and down Whitehall.'
    ],
    visitTime: 'Suggested visit time: 45–60 minutes.',
    admission: 'Public square access is free.',
    hours: 'Open access all day and evening.',
    mainNear: [
      { name: 'National Gallery', time: '2-minute walk', query: 'National Gallery London', walkQuery: 'Trafalgar Square London to National Gallery London' },
      { name: 'Leicester Square', time: '6-minute walk', query: 'Leicester Square London', walkQuery: 'Trafalgar Square London to Leicester Square London' },
      { name: 'Covent Garden', time: '10-minute walk', query: 'Covent Garden London', walkQuery: 'Trafalgar Square London to Covent Garden London' },
      { name: 'Westminster Abbey', time: '14-minute walk', query: 'Westminster Abbey London', walkQuery: 'Trafalgar Square London to Westminster Abbey London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Piccadilly line one stop to Piccadilly Circus, then walk to Trafalgar Square.',
        'Alternatively walk directly from Mayfair through St James\'s.',
        'Estimated travel time: 12–20 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak if taking the Tube.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 9, 14, or 19 toward Piccadilly Circus / Charing Cross.',
        'Exit at Trafalgar Square or nearby Charing Cross Road stops.',
        'Walk 2–5 minutes into the square.',
        'Estimated travel time: 15–30 minutes depending on traffic.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £8–£14.',
      time: 'Typical travel time: 10–20 minutes.'
    }
  },
  {
    key: 'westminster abbey',
    title: 'Westminster Abbey',
    googleMapsQuery: 'Westminster Abbey London',
    summary: [
      'What to look for: Coronation Chair, Poets\' Corner, and Gothic nave architecture.',
      'Royal connections: Coronation church of English and British monarchs since 1066.',
      'History: Site of royal weddings, burials, and major state services.',
      'Best photo location: Broad Sanctuary for the full west front.'
    ],
    visitTime: 'Suggested visit time: 90 minutes.',
    admission: 'Adult tickets are typically about £30–£32 online; book ahead when possible.',
    hours: 'Usually 9:30 AM–3:30 PM for visitor entry on most open days; check the day before you travel.',
    mainNear: [
      { name: 'Big Ben and Westminster Bridge', time: '5-minute walk', query: 'Big Ben Westminster London', walkQuery: 'Westminster Abbey London to Big Ben Westminster London' },
      { name: 'Churchill War Rooms', time: '10-minute walk', query: 'Churchill War Rooms London', walkQuery: 'Westminster Abbey London to Churchill War Rooms London' },
      { name: 'St James\'s Park', time: '8-minute walk', query: 'St James\'s Park London', walkQuery: 'Westminster Abbey London to St James\'s Park London' },
      { name: 'Parliament Square', time: '3-minute walk', query: 'Parliament Square London', walkQuery: 'Westminster Abbey London to Parliament Square London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line one stop to Westminster.',
        'Exit via the Westminster station exit for Parliament Square / Abbey and walk about 5 minutes.',
        'Estimated travel time: 15–20 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 148 or 24 from the Green Park / Piccadilly area.',
        'Exit at Westminster Abbey / Parliament Square.',
        'Walk 2–5 minutes to the west front.',
        'Estimated travel time: 15–30 minutes.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £10–£15.',
      time: 'Typical travel time: 10–20 minutes.'
    }
  },
  {
    key: 'churchill war rooms',
    title: 'Churchill War Rooms',
    googleMapsQuery: 'Churchill War Rooms London',
    summary: [
      'What to look for: Cabinet Room, map room, and Churchill museum galleries.',
      'WWII significance: Underground command center where wartime decisions were made.',
      'History: Preserved bunker complex beneath Whitehall.',
      'Best photo location: Clive Steps and Whitehall views.'
    ],
    visitTime: 'Suggested visit time: 90 minutes.',
    admission: 'Adult tickets are typically about £30–£32 online; pre-book timed entry if possible.',
    hours: 'Usually 9:30 AM–6:00 PM, with last admission before closing; check the day you book.',
    mainNear: [
      { name: 'Big Ben and Parliament Square', time: '5-minute walk', query: 'Big Ben Westminster London', walkQuery: 'Churchill War Rooms London to Big Ben Westminster London' },
      { name: 'Westminster Abbey', time: '10-minute walk', query: 'Westminster Abbey London', walkQuery: 'Churchill War Rooms London to Westminster Abbey London' },
      { name: 'Horse Guards Parade', time: '5-minute walk', query: 'Horse Guards Parade London', walkQuery: 'Churchill War Rooms London to Horse Guards Parade London' },
      { name: 'St James\'s Park', time: '8-minute walk', query: 'St James\'s Park London', walkQuery: 'Churchill War Rooms London to St James\'s Park London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line one stop to Westminster and walk toward Whitehall.',
        'Use the Whitehall / Parliament Square exit and walk about 8 minutes to the War Rooms.',
        'Estimated travel time: 15–20 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 11 or 148 near Piccadilly or Trafalgar Square.',
        'Exit at Whitehall / Parliament Square.',
        'Walk 5–8 minutes to the entrance.',
        'Estimated travel time: 15–30 minutes.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £10–£15.',
      time: 'Typical travel time: 10–20 minutes.'
    }
  },
  {
    key: 'st. paul\'s cathedral',
    title: "St. Paul's Cathedral",
    googleMapsQuery: "St Paul's Cathedral London",
    summary: [
      'What to look for: Great dome, Whispering Gallery, and west front.',
      'WWII Blitz: St. Paul\'s survived the Blitz and became a symbol of endurance.',
      'Churchill connection: Wartime morale symbol during bombing campaigns.',
      'Best photo location: Millennium Bridge toward the dome.'
    ],
    visitTime: 'Suggested visit time: 90 minutes.',
    admission: 'Adult tickets are typically about £26–£28 online; book ahead when possible.',
    hours: 'Usually 8:30 AM–4:30 PM for sightseeing visits, with last entry before closing.',
    mainNear: [
      { name: 'Millennium Bridge', time: '5-minute walk', query: 'Millennium Bridge London', walkQuery: 'St Paul\'s Cathedral London to Millennium Bridge London' },
      { name: 'One New Change', time: '3-minute walk', query: 'One New Change London', walkQuery: 'St Paul\'s Cathedral London to One New Change London' },
      { name: 'Paternoster Square', time: '4-minute walk', query: 'Paternoster Square London', walkQuery: 'St Paul\'s Cathedral London to Paternoster Square London' },
      { name: 'Tate Modern', time: '15-minute walk', query: 'Tate Modern London', walkQuery: 'St Paul\'s Cathedral London to Tate Modern London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line one stop to Westminster, then change to the District or Circle line for Mansion House / Blackfriars.',
        'Walk 8–10 minutes to St. Paul\'s Cathedral.',
        'Estimated travel time: 20–30 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 11 from Westminster / Whitehall or route 15 from Trafalgar Square.',
        'Exit at St. Paul\'s Cathedral / St. Paul\'s Churchyard.',
        'Walk a few minutes to the cathedral steps.',
        'Estimated travel time: 20–35 minutes.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £10–£18.',
      time: 'Typical travel time: 15–25 minutes.'
    }
  },
  {
    key: 'kensington palace',
    title: 'Kensington Palace',
    googleMapsQuery: 'Kensington Palace London',
    summary: [
      'History: Royal residence with roots in the 17th century and long links to modern royal life.',
      'What to look for: State Apartments, formal gardens, and palace-front photo angles.',
      'Royal connections: Home associated with Queen Victoria and several current royal households.',
      'Best photo location: Sunken Garden and the broad palace forecourt approach.'
    ],
    visitTime: 'Suggested visit time: 90 minutes.',
    admission: 'Adult tickets are typically about £24–£26 online; timed entries are recommended.',
    hours: 'Usually open daytime with seasonal variation; check the specific date before visiting.',
    mainNear: [
      { name: 'Kensington Gardens', time: '3-minute walk', query: 'Kensington Gardens London', walkQuery: 'Kensington Palace London to Kensington Gardens London' },
      { name: 'Royal Albert Hall', time: '15-minute walk', query: 'Royal Albert Hall', walkQuery: 'Kensington Palace London to Royal Albert Hall' },
      { name: 'Hyde Park', time: '10-minute walk', query: 'Hyde Park London', walkQuery: 'Kensington Palace London to Hyde Park London' },
      { name: 'Notting Hill Gate', time: '15-minute walk', query: 'Notting Hill Gate London', walkQuery: 'Kensington Palace London to Notting Hill Gate London' }
    ],
    tube: {
      title: 'Option 1 – Tube (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Piccadilly line westbound to South Kensington or switch for High Street Kensington.',
        'Walk through Kensington Gardens to the palace entrance.',
        'Estimated travel time: 25–35 minutes.'
      ],
      fare: 'Current contactless/Oyster fare: about £2.80 off-peak to £3.35 peak.'
    },
    bus: {
      title: 'Option 2 – London Bus',
      steps: [
        'Board route 9 or 52 westbound from Piccadilly / Hyde Park Corner.',
        'Exit near Kensington High Street for the gardens approach.',
        'Walk 8–12 minutes to the palace.',
        'Estimated travel time: 30–45 minutes depending on traffic.'
      ],
      fare: 'Current fare: £1.75 with the Hopper fare.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £12–£20.',
      time: 'Typical travel time: 20–30 minutes.'
    }
  },
  {
    key: 'windsor castle',
    title: 'Windsor Castle',
    googleMapsQuery: 'Windsor Castle',
    summary: [
      'History: One of the oldest and largest occupied castles in the world.',
      'State Apartments: See the ceremonial rooms and royal interiors.',
      'Queen Mary\'s Dolls\' House: A tiny masterpiece worth slowing down for.',
      'St. George\'s Chapel: A highlight for royal history and architecture.',
      'Changing of the Guard: Time your visit around the ceremonial schedule if possible.'
    ],
    visitTime: 'Suggested visit time: 4–6 hours.',
    admission: 'Adult tickets are usually about £31–£33 online; book ahead for a timed entry.',
    hours: 'Typically Thursday to Monday, around 10:00 AM–5:15 PM in summer and 10:00 AM–4:15 PM in winter; commonly closed on Tuesdays and Wednesdays.',
    mainNear: [
      { name: 'St George\'s Chapel', time: '5-minute walk', query: 'St George\'s Chapel Windsor', walkQuery: 'Windsor Castle to St George\'s Chapel Windsor' },
      { name: 'Windsor Great Park', time: '15-minute walk', query: 'Windsor Great Park', walkQuery: 'Windsor Castle to Windsor Great Park' },
      { name: 'The Long Walk', time: '10-minute walk', query: 'The Long Walk Windsor', walkQuery: 'Windsor Castle to The Long Walk Windsor' },
      { name: 'Windsor & Eton Bridge', time: '12-minute walk', query: 'Windsor and Eton Bridge', walkQuery: 'Windsor Castle to Windsor and Eton Bridge' }
    ],
    tube: {
      title: 'Option 1 – Tube / Train (Recommended)',
      steps: [
        'Walk from The May Fair Hotel to Green Park station.',
        'Take the Jubilee line to Waterloo, then board the South Western Railway train to Windsor & Eton Riverside.',
        'Walk uphill from the station to the castle entrance.',
        'Estimated travel time: 75–90 minutes.'
      ],
      fare: 'Current contactless/Oyster fare for the Tube leg plus rail tickets: typically about £14–£20 one way for the train portion depending on ticket type.'
    },
    bus: {
      title: 'Option 2 – Coach / Bus',
      steps: [
        'Take a coach from Victoria Coach Station toward Windsor Theatre Royal / central Windsor.',
        'Walk or take the local shuttle if your ticket includes it.',
        'Estimated travel time: about 60–90 minutes depending on traffic and service.',
        'Current fare: usually around £10–£18 one way depending on operator and advance purchase.'
      ],
      fare: 'Current fare: usually around £10–£18 one way depending on operator and advance purchase.'
    },
    taxi: {
      title: 'Option 3 – Taxi / Uber',
      fare: 'Typical fare: £75–£110.',
      time: 'Typical travel time: 60–90 minutes depending on traffic.'
    }
  }
];

const LONDON_PERSONAL_STORAGE_KEYS = {
  todayPlan: 'travelCompanion.london.todayPlan.v1',
  favorites: 'travelCompanion.london.favorites.v1',
  notes: 'travelCompanion.london.notes.v1',
  visitStatus: 'travelCompanion.london.visitStatus.v1'
};

const londonPersonalMetadata = {
  'tower of london': {
    bestTime: '☀ Morning',
    walkingDifficulty: '🚶🚶 Moderate',
    typicalVisit: '⏱ Half Day',
    crowds: '😳 Busy',
    crowdTip: 'Arrive at opening time for shorter Crown Jewels queues.',
    restrooms: 'Inside attraction',
    rainAlternative: { name: 'Tower Bridge Exhibition', query: 'Tower Bridge Exhibition London' },
    food: { pub: 'The Liberty Bounds London', coffee: 'Costa Tower Hill London', lunch: 'Pret Tower Hill London', restaurant: 'Coppa Club Tower Bridge London' },
    coords: { lat: 51.5081, lng: -0.0759 }
  },
  'tower bridge': {
    bestTime: '🌇 Sunset',
    walkingDifficulty: '🚶 Easy',
    typicalVisit: '⏱ 45 minutes',
    crowds: '😐 Moderate',
    crowdTip: 'Go before dinner hours for easier photo positions.',
    restrooms: 'Nearby',
    rainAlternative: { name: 'HMS Belfast', query: 'HMS Belfast London' },
    food: { pub: 'The Anchor Tap London', coffee: 'WatchHouse Tower Bridge London', lunch: 'Leon More London', restaurant: 'Le Pont de la Tour London' },
    coords: { lat: 51.5055, lng: -0.0754 }
  },
  'westminster / big ben': {
    bestTime: '☀ Morning',
    walkingDifficulty: '🚶 Easy',
    typicalVisit: '⏱ 45 minutes',
    crowds: '😳 Busy',
    crowdTip: 'Aim for early morning before coach groups arrive.',
    restrooms: 'Nearby',
    rainAlternative: { name: 'Churchill War Rooms', query: 'Churchill War Rooms London' },
    food: { pub: 'St Stephens Tavern London', coffee: 'Nero Westminster London', lunch: 'The Laughing Halibut London', restaurant: 'Brasserie Joël London' },
    coords: { lat: 51.5007, lng: -0.1246 }
  },
  'westminster abbey': {
    bestTime: '☀ Morning',
    walkingDifficulty: '🚶 Easy',
    typicalVisit: '⏱ 1–2 hours',
    crowds: '😐 Moderate',
    crowdTip: 'Choose the first visitor session when available.',
    restrooms: 'Inside attraction',
    rainAlternative: { name: 'Churchill War Rooms', query: 'Churchill War Rooms London' },
    food: { pub: 'The Sanctuary House Hotel London', coffee: 'Pret Victoria Street London', lunch: 'Cellarium Cafe Westminster Abbey', restaurant: 'The Cinnamon Club London' },
    coords: { lat: 51.4994, lng: -0.1273 }
  },
  'buckingham palace': {
    bestTime: '☀ Morning',
    walkingDifficulty: '🚶🚶 Moderate',
    typicalVisit: '⏱ 1–2 hours',
    crowds: '😳 Busy',
    crowdTip: 'Arrive 30–45 minutes early for guard-changing days.',
    restrooms: 'Nearby',
    rainAlternative: { name: 'The Royal Mews', query: 'The Royal Mews London' },
    food: { pub: 'The Grenadier London', coffee: 'Pret Green Park London', lunch: 'The Laughing Halibut London', restaurant: 'Wild Honey St James London' },
    coords: { lat: 51.5014, lng: -0.1419 }
  },
  'churchill war rooms': {
    bestTime: '🌤 Afternoon',
    walkingDifficulty: '🚶 Easy',
    typicalVisit: '⏱ 1–2 hours',
    crowds: '😐 Moderate',
    crowdTip: 'Late afternoon often has shorter timed-entry waits.',
    restrooms: 'Inside attraction',
    rainAlternative: { name: 'Westminster Abbey', query: 'Westminster Abbey London' },
    food: { pub: 'The Red Lion Whitehall London', coffee: 'Starbucks Whitehall London', lunch: 'Pret Whitehall London', restaurant: 'Quilon London' },
    coords: { lat: 51.5022, lng: -0.1291 }
  },
  "st. paul's cathedral": {
    bestTime: '☀ Morning',
    walkingDifficulty: '🚶🚶 Moderate',
    typicalVisit: '⏱ 1–2 hours',
    crowds: '😐 Moderate',
    crowdTip: 'Visit shortly after opening for quieter galleries.',
    restrooms: 'Inside attraction',
    rainAlternative: { name: 'Museum of London', query: 'Museum of London' },
    food: { pub: 'The Blackfriar London', coffee: 'Starbucks Ludgate Hill London', lunch: 'Pret St Pauls London', restaurant: 'Madison London Rooftop' },
    coords: { lat: 51.5138, lng: -0.0984 }
  },
  'sky garden': {
    bestTime: '🌇 Sunset',
    walkingDifficulty: '🚶 Easy',
    typicalVisit: '⏱ 45 minutes',
    crowds: '😐 Moderate',
    crowdTip: 'Book a pre-sunset slot for daylight and evening skyline views.',
    restrooms: 'Inside attraction',
    rainAlternative: { name: 'Leadenhall Market', query: 'Leadenhall Market London' },
    food: { pub: 'The Ship Tavern London', coffee: 'Pret Fenchurch Street London', lunch: 'EAT Fenchurch Street London', restaurant: 'Darwin Brasserie London' },
    coords: { lat: 51.5107, lng: -0.0836 }
  },
  'borough market': {
    bestTime: '🌤 Afternoon',
    walkingDifficulty: '🚶🚶 Moderate',
    typicalVisit: '⏱ 1–2 hours',
    crowds: '😳 Busy',
    crowdTip: 'Visit at opening or after 2 PM for less queueing.',
    restrooms: 'Nearby',
    rainAlternative: { name: 'Southwark Cathedral', query: 'Southwark Cathedral London' },
    food: { pub: 'The George Inn London', coffee: 'Monmouth Coffee Borough Market', lunch: 'Fish! Kitchen Borough London', restaurant: 'Padella London' },
    coords: { lat: 51.5055, lng: -0.0909 }
  },
  'trafalgar square': {
    bestTime: '🌙 Evening',
    walkingDifficulty: '🚶 Easy',
    typicalVisit: '⏱ 45 minutes',
    crowds: '😳 Busy',
    crowdTip: 'Evenings after commuter peak are best for open space and photos.',
    restrooms: 'Nearby',
    rainAlternative: { name: 'National Gallery', query: 'National Gallery London' },
    food: { pub: 'The Admiralty London', coffee: 'Pret Strand London', lunch: 'Wasabi Charing Cross London', restaurant: 'The Portrait Restaurant London' },
    coords: { lat: 51.508, lng: -0.1281 }
  },
  'kensington palace': {
    bestTime: '🌤 Afternoon',
    walkingDifficulty: '🚶 Easy',
    typicalVisit: '⏱ 1–2 hours',
    crowds: '🙂 Usually Quiet',
    crowdTip: 'Weekday afternoons tend to be calmest.',
    restrooms: 'Inside attraction',
    rainAlternative: { name: 'Victoria and Albert Museum', query: 'V and A Museum London' },
    food: { pub: 'The Churchill Arms London', coffee: 'Black Sheep Kensington London', lunch: 'Pret Kensington High Street London', restaurant: 'Dishoom Kensington London' },
    coords: { lat: 51.505, lng: -0.1877 }
  },
  'windsor castle': {
    bestTime: '☀ Morning',
    walkingDifficulty: '🚶🚶🚶 Extensive Walking',
    typicalVisit: '⏱ Full Day',
    crowds: '😳 Busy',
    crowdTip: 'Take the earliest train and aim for opening-time entry.',
    restrooms: 'Inside attraction',
    rainAlternative: { name: 'Windsor Guildhall', query: 'Windsor Guildhall' },
    food: { pub: 'The Two Brewers Windsor', coffee: 'Costa Windsor Thames Street', lunch: 'Pret Windsor Yards', restaurant: 'The Ivy Royal Windsor' },
    coords: { lat: 51.4839, lng: -0.6044 }
  }
};

const londonFrankSaysTips = {
  'tower of london': 'Get there right at opening and go straight to the Crown Jewels first; that single move saves you the longest line of the day.',
  'tower bridge': 'Walk across once, then do your photos from Butler\'s Wharf side on the return, because the bridge framing is cleaner from there.',
  'westminster / big ben': 'If you want the classic clock shot, stand on Westminster Bridge before 9 AM; after that, tour groups flood the rail.',
  'buckingham palace': 'On guard-change mornings, commit to one viewing spot early instead of chasing the parade route, or you\'ll miss the best moment.',
  'sky garden': 'Book a slot about 45 minutes before sunset so you get both daylight views and city lights without a second visit.',
  'borough market': 'Circle once before buying food, then pick your top two stalls; first-time visitors usually fill up too early and miss the best bites.',
  'trafalgar square': 'Do your square photos, then step up toward the National Gallery terrace for the stronger London skyline angle.',
  'westminster abbey': 'If your energy is best in the morning, do the Abbey first and save outside Westminster photos for later when crowds spread out.',
  'churchill war rooms': 'Take the map room slowly at the start; it gives context that makes the rest of the museum twice as interesting.',
  "st. paul's cathedral": 'Climb while your legs are fresh, then reward yourself with coffee nearby instead of tackling the stairs at the end.',
  'kensington palace': 'Pair this with a relaxed Kensington Gardens walk, and keep your lunch nearby so you are not burning time on transport hops.',
  'windsor castle': 'Catch the earliest train you can manage and wear your most comfortable shoes; this stop is fantastic, but it is a full-day pace.'
};

function getLondonTemplateMap() {
  const map = {};
  londonAttractionTemplates.forEach((template) => {
    map[template.key] = template;
  });
  return map;
}

function loadLondonJsonState(storageKey, fallbackValue) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return fallbackValue;
    }

    const parsed = JSON.parse(raw);
    return parsed ?? fallbackValue;
  } catch (error) {
    return fallbackValue;
  }
}

function saveLondonJsonState(storageKey, value) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    console.warn('Could not save London personal state', error);
  }
}

function getLondonFavorites() {
  const favorites = loadLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.favorites, []);
  return new Set(Array.isArray(favorites) ? favorites : []);
}

function setLondonFavorites(favoritesSet) {
  saveLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.favorites, Array.from(favoritesSet));
}

function getLondonVisitStatuses() {
  return loadLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.visitStatus, {});
}

function setLondonVisitStatuses(statusMap) {
  saveLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.visitStatus, statusMap);
}

function getLondonNotes() {
  return loadLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.notes, {});
}

function setLondonNotes(notesMap) {
  saveLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.notes, notesMap);
}

function getLondonTodayPlan() {
  const templateMap = getLondonTemplateMap();
  const plan = loadLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.todayPlan, []);
  if (!Array.isArray(plan)) {
    return [];
  }

  return plan
    .filter((item) => item && templateMap[item.key])
    .map((item) => ({ key: item.key, note: item.note || '' }));
}

function setLondonTodayPlan(planItems) {
  saveLondonJsonState(LONDON_PERSONAL_STORAGE_KEYS.todayPlan, planItems);
}

function estimateTravelMinutesFromStop(previousKey, currentKey) {
  const previousMeta = londonPersonalMetadata[previousKey];
  const currentMeta = londonPersonalMetadata[currentKey];

  if (!previousMeta?.coords || !currentMeta?.coords) {
    return 20;
  }

  const toRad = (value) => value * (Math.PI / 180);
  const lat1 = previousMeta.coords.lat;
  const lon1 = previousMeta.coords.lng;
  const lat2 = currentMeta.coords.lat;
  const lon2 = currentMeta.coords.lng;
  const radiusKm = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = radiusKm * c;

  const estimated = Math.round((distanceKm / 18) * 60 + 8);
  return Math.min(90, Math.max(8, estimated));
}

function formatEstimatedTravel(previousKey, currentKey) {
  if (!previousKey) {
    return 'First stop: use live navigation time';
  }

  const minutes = estimateTravelMinutesFromStop(previousKey, currentKey);
  return `From previous stop: about ${minutes} min`;
}

function buildLondonAttractionButton(label, href, extraClass = '', dataAttribute = '') {
  const className = ['button', extraClass].filter(Boolean).join(' ');
  const attributes = dataAttribute ? ` ${dataAttribute}` : '';
  const isInternalLink = href.startsWith('#');
  const externalAttributes = isInternalLink ? '' : ' target="_blank" rel="noopener noreferrer"';
  return `<a class="${className}" href="${href}"${externalAttributes}${attributes}>${label}</a>`;
}

function buildLondonToggleButton(label, targetId) {
  return `<button type="button" class="button secondary" data-london-toggle-target="${targetId}">${label}</button>`;
}

function normalizeLondonTransitStep(step, title) {
  const pageName = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (pageName !== 'london.html') {
    return step;
  }

  if (step === 'Walk from The May Fair Hotel to Green Park station.') {
    if ((title || '').toLowerCase().includes('tube')) {
      return 'Use "Navigate From Here" for the best live route from your current location to the most practical Tube or rail connection for this attraction.';
    }

    return 'Use "Navigate From Here" for the best live route from your current location to the most practical bus connection for this attraction.';
  }

  if (step === 'Alternatively walk directly from Mayfair through St James\'s.') {
    return 'If you are already nearby, walking can also be a practical option.';
  }

  if (/^Estimated travel time:/i.test(step)) {
    return 'Use "Navigate From Here" for live travel time based on your current location and current conditions.';
  }

  return step;
}

function normalizeLondonTransitFare(fare) {
  const pageName = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (pageName !== 'london.html') {
    return fare;
  }

  if (fare === 'Current contactless/Oyster fare: not required if walking directly from Mayfair.') {
    return 'Current contactless/Oyster fare: not required if you are already within comfortable walking distance.';
  }

  return fare;
}

function normalizeLondonTaxiTime(time) {
  const pageName = (window.location.pathname.split('/').pop() || '').toLowerCase();
  if (pageName !== 'london.html') {
    return time;
  }

  return 'Travel time depends on your starting point and live traffic; use "Navigate From Here" for a live estimate.';
}

function splitLondonBullet(text) {
  const separatorIndex = text.indexOf(':');
  if (separatorIndex === -1) {
    return { label: text, value: '' };
  }

  return {
    label: text.slice(0, separatorIndex).trim(),
    value: text.slice(separatorIndex + 1).trim()
  };
}

function buildLondonSectionSummary(title, isOpen = false) {
  return `<summary class="london-section-summary">${title}</summary>`;
}

function normalizeLondonSummaryTitle(rawTitle) {
  return (rawTitle || '')
    .replace(/^[\s▶▼▸▲]+/, '')
    .trim();
}

function renderLondonAccordionSummary(summary, isOpen) {
  if (!summary) {
    return;
  }

  const storedTitle = summary.dataset.summaryTitle || normalizeLondonSummaryTitle(summary.textContent);
  summary.dataset.summaryTitle = storedTitle;
  summary.textContent = '';

  const titleSpan = document.createElement('span');
  titleSpan.className = 'london-summary-title';
  titleSpan.textContent = storedTitle;

  const iconSpan = document.createElement('span');
  iconSpan.className = 'london-summary-icon';
  iconSpan.setAttribute('aria-hidden', 'true');
  iconSpan.textContent = isOpen ? '▼' : '▶';

  summary.appendChild(titleSpan);
  summary.appendChild(iconSpan);
}

function bindLondonAccordionIndicator(details) {
  if (!details || details.dataset.accordionIndicatorBound === 'true') {
    return;
  }

  const summary = details.querySelector(':scope > summary.london-section-summary, :scope > summary.london-subsection-summary');
  if (!summary) {
    return;
  }

  renderLondonAccordionSummary(summary, details.open);
  details.addEventListener('toggle', () => {
    renderLondonAccordionSummary(summary, details.open);
  });
  details.dataset.accordionIndicatorBound = 'true';
}

function initializeLondonAccordionIndicators() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (!['london.html', 'edinburgh.html', 'inverness.html', 'portree.html', 'liverpool.html', 'dublin.html', 'dover.html', 'rotterdam.html', 'amsterdam.html', 'haugesund.html', 'odda.html', 'nordfjordeid.html', 'alesund.html'].includes(pageName)) {
    return;
  }

  document.querySelectorAll('details.london-section, details.london-subsection').forEach((details) => {
    bindLondonAccordionIndicator(details);
  });
}

function initializeGenericPageNotes() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName === 'london.html') {
    return;
  }

  const fields = Array.from(document.querySelectorAll('textarea[data-my-notes-key]'));
  if (!fields.length) {
    return;
  }

  fields.forEach((textarea) => {
    const key = textarea.dataset.myNotesKey;
    const storageKey = `travelCompanion.notes.${pageName}.${key}`;
    textarea.value = localStorage.getItem(storageKey) || '';
    textarea.addEventListener('input', () => {
      localStorage.setItem(storageKey, textarea.value);
    });
  });
}

function buildLondonDetailList(items) {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function buildLondonTransitOption(title, steps, fare, routeHref) {
  const normalizedSteps = steps.map((step) => normalizeLondonTransitStep(step, title));
  const normalizedFare = normalizeLondonTransitFare(fare);
  return `
    <details class="london-subsection">
      <summary class="london-subsection-summary">${title}</summary>
      <div class="london-section-body">
        ${buildLondonDetailList(normalizedSteps)}
        <p><strong>${normalizedFare}</strong></p>
        <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem;">
          ${buildLondonAttractionButton('Open Transit Route in Google Maps', routeHref)}
        </div>
      </div>
    </details>`;
}

function buildLondonNearbyItem(originQuery, nearby) {
  const destinationQuery = nearby.query || nearby.name;
  const mapsHref = buildMapsSearchUrl(destinationQuery);
  const walkHref = buildWalkingDirectionsUrl(originQuery, destinationQuery);
  return `<li><strong>${nearby.name}</strong> <span>${nearby.time}</span><div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.35rem;">${buildLondonAttractionButton('📍 Google Maps', mapsHref)}${buildLondonAttractionButton('🚶 Walk There', walkHref, 'secondary')}</div></li>`;
}

function getTravelerStartingLocationOrigin() {
  try {
    const rawProfile = localStorage.getItem('travelCompanion.travelerProfile.v1');
    if (rawProfile) {
      const profile = JSON.parse(rawProfile);
      const startingLocation = profile?.startingLocation || {};
      const origin = [
        startingLocation.name,
        startingLocation.streetAddress,
        startingLocation.city,
        startingLocation.country
      ].filter((value) => typeof value === 'string' && value.trim()).join(', ');

      if (origin) {
        return origin;
      }
    }
  } catch (error) {
    console.warn('Unable to load traveler profile origin:', error);
  }

  try {
    const rawLondonOrigin = localStorage.getItem('london.startingLocation.v1');
    if (!rawLondonOrigin) {
      return '';
    }

    const londonOrigin = JSON.parse(rawLondonOrigin);
    return [londonOrigin?.locationName, londonOrigin?.streetAddress]
      .filter((value) => typeof value === 'string' && value.trim())
      .join(', ');
  } catch (error) {
    console.warn('Unable to load London starting location origin:', error);
    return '';
  }
}

function buildLondonAttractionCard(template) {
  const attractionQuery = template.googleMapsQuery || template.title;
  const attractionMaps = buildMapsSearchUrl(attractionQuery);
  const travelerOrigin = getTravelerStartingLocationOrigin();
  const walkThere = buildWalkingDirectionsUrl(travelerOrigin, attractionQuery);
  const gpsNavigate = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(attractionQuery)}&travelmode=walking&dir_action=navigate`;
  const tubeRoute = buildTransitDirectionsUrl(travelerOrigin, attractionQuery, 'subway');
  const busRoute = buildTransitDirectionsUrl(travelerOrigin, attractionQuery, 'bus');
  const templateKey = template.key;
  const personalMeta = londonPersonalMetadata[templateKey] || {};
  const foodLinks = personalMeta.food || {
    pub: `${template.title} best pub`,
    coffee: `${template.title} coffee`,
    lunch: `${template.title} quick lunch`,
    restaurant: `${template.title} best restaurant`
  };
  const rainAlternative = personalMeta.rainAlternative || { name: 'British Museum', query: 'British Museum London' };
  const overviewId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-overview`;
  const planId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-plan`;
  const transitId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-transit`;
  const nearbyId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-nearby`;
  const tipsId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-tips`;
  const frankSaysId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-frank-says`;
  const galleryId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-gallery`;
  const notesId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-my-notes`;
  const scheduledVisitId = `${template.key.replace(/[^a-z0-9]+/g, '-')}-scheduled-visit`;
  const frankSaysText = londonFrankSaysTips[templateKey] || 'Give yourself margin between stops and keep one flexible slot for whatever ends up being your favorite place.';
  const summaryLines = template.summary.map((item) => {
    const { label, value } = splitLondonBullet(item);
    return `<li><strong>${label}:</strong> ${value}</li>`;
  }).join('');
  const featuredExperiences = (template.featuredExperiences || []).map((experience) => {
    const locationQuery = experience.mapsQuery || experience.title;
    const experienceMaps = buildMapsSearchUrl(locationQuery);
    const experienceWalk = buildWalkingDirectionsUrl(travelerOrigin, locationQuery);
    const experienceTransit = buildTransitDirectionsUrl(travelerOrigin, locationQuery, 'transit');
    const nearbyItems = (experience.nearby || [])
      .map((nearby) => buildLondonNearbyItem(locationQuery, nearby))
      .join('');

    return `
      <div class="london-featured-experience" style="margin-top:0.9rem;">
        <h4 style="margin:0 0 0.45rem;">${experience.title}</h4>
        <p><strong>Meeting location:</strong> ${experience.meetingLocation}</p>
        ${buildLondonDetailList(experience.details || [])}
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.55rem;">
          ${buildLondonAttractionButton('📍 Google Maps', experienceMaps)}
          ${buildLondonAttractionButton('🚶 Walking Directions', experienceWalk, 'secondary')}
          ${buildLondonAttractionButton('🚌 Transit Options', experienceTransit, 'secondary')}
        </div>
        ${nearbyItems ? `<p style="margin-top:0.75rem;"><strong>Nearby attractions:</strong></p><ul>${nearbyItems}</ul>` : ''}
      </div>`;
  }).join('');

  let scheduledVisitPanel = '';

  if (templateKey === 'buckingham palace') {
    scheduledVisitPanel = `
      <details id="${scheduledVisitId}" class="london-section london-section-plan">
        ${buildLondonSectionSummary('📅 Your Scheduled Visit')}
        <div class="london-section-body">
          <ul>
            <li><strong>Date:</strong> Tuesday, August 18</li>
            <li><strong>Arrival Time:</strong> 9:15 AM</li>
            <li><strong>Reserved Entry:</strong> 9:30 AM (exact)</li>
            <li><strong>Expected Finish:</strong> 12:15 PM</li>
          </ul>
          <div style="margin-top:0.75rem;border:1px solid rgba(255,255,255,0.16);border-radius:12px;padding:0.75rem;background:rgba(0,0,0,0.2);">
            <p><strong>Frank's Reminder</strong></p>
            <p>Security screening takes time, so don't cut your arrival close. Once inside, slow down, look up, and enjoy the State Rooms. Many visitors spend so much time looking ahead that they miss the incredible ceilings and architecture.</p>
          </div>
        </div>
      </details>`;
  }

  if (templateKey === 'tower of london') {
    scheduledVisitPanel = `
      <details id="${scheduledVisitId}" class="london-section london-section-plan">
        ${buildLondonSectionSummary('📅 Your Scheduled Visit')}
        <div class="london-section-body">
          <ul>
            <li><strong>Date:</strong> Thursday, August 20</li>
            <li><strong>Planned Arrival:</strong> 10:00 AM</li>
          </ul>
          <p><strong>Today's Plan</strong></p>
          <ol>
            <li>💎 Crown Jewels</li>
            <li>🎙️ Yeoman Warder (Beefeater) Talk</li>
            <li>🏰 White Tower</li>
            <li>👑 Medieval Palace</li>
            <li>🗡️ Bloody Tower</li>
            <li>🚶 Walk the battlements and grounds</li>
            <li>☕ Coffee or lunch before leaving</li>
          </ol>
          <div style="margin-top:0.75rem;border:1px solid rgba(255,255,255,0.16);border-radius:12px;padding:0.75rem;background:rgba(0,0,0,0.2);">
            <p><strong>Frank's Reminder</strong></p>
            <p>Head straight to the Crown Jewels first. Most visitors stop elsewhere and join a much longer line later. After seeing the Crown Jewels, join the next available Yeoman Warder (Beefeater) Talk. It is included with admission and provides an outstanding introduction to the Tower's history before you explore the rest of the fortress.</p>
          </div>
        </div>
      </details>`;
  }

  return `
    <article class="destination-card">
      <h3>${template.title}</h3>
      <div class="london-action-bar">
        ${buildLondonAttractionButton('📍 View on Google Maps', attractionMaps)}
        ${buildLondonAttractionButton('🚶 Walking Directions', walkThere, 'secondary')}
        ${buildLondonAttractionButton('📌 Start GPS Navigation', gpsNavigate, 'secondary')}
        ${buildLondonToggleButton('🚌 Transit Options', transitId)}
        ${buildLondonToggleButton('⭐ Nearby Attractions', nearbyId)}
      </div>
      <div class="london-personal-actions" style="display:flex;flex-wrap:wrap;gap:0.6rem;">
        <button type="button" class="button secondary" data-add-to-today-plan="${templateKey}">➕ Add to Today's Plan</button>
        <button type="button" class="button secondary" data-favorite-attraction="${templateKey}">🤍 Favorite</button>
        <button type="button" class="button secondary" data-visit-status="${templateKey}">□ Planned</button>
        <a class="button secondary" href="todays-plan.html">📅 Today's Plan</a>
        <a class="button secondary" href="my-favorites.html">❤️ My Favorites</a>
      </div>

      ${scheduledVisitPanel}

      <details id="${overviewId}" class="london-section london-section-overview" open>
        ${buildLondonSectionSummary('Overview', true)}
        <div class="london-section-body">
          <p><strong>${template.visitTime}</strong></p>
          <ul>
            ${summaryLines}
          </ul>
          ${featuredExperiences}
        </div>
      </details>

      <details id="${planId}" class="london-section london-section-plan">
        ${buildLondonSectionSummary('Plan Your Visit')}
        <div class="london-section-body">
          <ul>
            <li><strong>Admission:</strong> ${template.admission}</li>
            <li><strong>Opening hours:</strong> ${template.hours}</li>
            <li><strong>Best Time to Visit:</strong> ${personalMeta.bestTime || '🌤 Afternoon'}</li>
            <li><strong>Walking Difficulty:</strong> ${personalMeta.walkingDifficulty || '🚶🚶 Moderate'}</li>
            <li><strong>Typical Visit Time:</strong> ${personalMeta.typicalVisit || '⏱ 1–2 hours'}</li>
            <li><strong>Crowds:</strong> ${personalMeta.crowds || '😐 Moderate'} — ${personalMeta.crowdTip || 'Arrive early for easier movement.'}</li>
            <li><strong>🚻 Restrooms:</strong> ${personalMeta.restrooms || 'Nearby'}</li>
            <li><strong>☔ Rain Alternative:</strong> <a href="${buildMapsSearchUrl(rainAlternative.query)}" target="_blank" rel="noopener noreferrer">${rainAlternative.name}</a></li>
          </ul>
          <p><strong>Nearby Food</strong></p>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
            ${buildLondonAttractionButton('🍺 Recommended Pub', buildMapsSearchUrl(foodLinks.pub), 'secondary')}
            ${buildLondonAttractionButton('☕ Coffee', buildMapsSearchUrl(foodLinks.coffee), 'secondary')}
            ${buildLondonAttractionButton('🥪 Quick Lunch', buildMapsSearchUrl(foodLinks.lunch), 'secondary')}
            ${buildLondonAttractionButton('🍽 Nice Restaurant', buildMapsSearchUrl(foodLinks.restaurant), 'secondary')}
          </div>
        </div>
      </details>

      <details id="${transitId}" class="london-section london-section-transit">
        ${buildLondonSectionSummary('Getting There')}
        <div class="london-section-body">
          ${buildLondonTransitOption(template.tube.title, template.tube.steps, template.tube.fare, tubeRoute)}
          ${buildLondonTransitOption(template.bus.title, template.bus.steps, template.bus.fare, busRoute)}
          <details class="london-subsection">
            <summary class="london-subsection-summary">🚍 Big Bus Hop-On Hop-Off</summary>
            <div class="london-section-body">
              <ul>
                <li><strong>Nearest Big Bus area:</strong> ${template.bus.title}</li>
                <li><strong>Best use:</strong> Ride between major landmarks and avoid repeated Tube changes.</li>
                <li><strong>Tip:</strong> Sit upper deck for skyline views, but keep a rain layer ready.</li>
              </ul>
              <div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-top:0.75rem;">
                ${buildLondonAttractionButton('📍 Find Nearest Big Bus Stop', buildMapsSearchUrl(`${template.title} Big Bus stop London`), 'secondary')}
              </div>
            </div>
          </details>
          <details class="london-subsection">
            <summary class="london-subsection-summary">${template.taxi.title}</summary>
            <div class="london-section-body">
              <p><strong>${template.taxi.fare}</strong></p>
              <p><strong>${normalizeLondonTaxiTime(template.taxi.time)}</strong></p>
            </div>
          </details>
        </div>
      </details>

      <details id="${nearbyId}" class="london-section london-section-nearby">
        ${buildLondonSectionSummary('⭐ Nearby Attractions')}
        <div class="london-section-body">
          <ul>
            ${template.mainNear.map((nearby) => buildLondonNearbyItem(attractionQuery, nearby)).join('')}
          </ul>
        </div>
      </details>

      <details id="${tipsId}" class="london-section london-section-tips">
        ${buildLondonSectionSummary('Frank\'s Tips')}
        <div class="london-section-body">
          <p>Use the London gallery below to save photos from this stop and the nearby walk.</p>
          <details id="${notesId}" class="london-subsection">
            <summary class="london-subsection-summary">📝 My Notes</summary>
            <div class="london-section-body">
              <textarea data-my-notes-key="${templateKey}" rows="4" style="width:100%;border-radius:12px;padding:0.75rem;background:rgba(0,0,0,0.2);color:var(--text);border:1px solid rgba(255,255,255,0.16);" placeholder="Add personal notes for this attraction..."></textarea>
            </div>
          </details>
        </div>
      </details>

      <details id="${frankSaysId}" class="london-section london-section-frank-says">
        ${buildLondonSectionSummary('💬 Beyond the Gangway Perspective...')}
        <div class="london-section-body">
          <p>${frankSaysText}</p>
        </div>
      </details>

      <details id="${galleryId}" class="london-section london-section-gallery">
        ${buildLondonSectionSummary('📷 Photo Gallery')}
        <div class="london-section-body">
          <p>Open the full London photo gallery below to review and add trip photos.</p>
        </div>
      </details>
    </article>`;
}

function initializeLondonAttractionTemplate() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'london.html') {
    return;
  }

  const main = document.querySelector('main');
  const gallery = main?.querySelector('.photo-gallery-collapsible');
  const intro = main?.querySelector('.page-intro');
  if (!main || !gallery || main.querySelector('[data-london-attractions="true"]')) {
    return;
  }

  const section = document.createElement('section');
  section.className = 'london-places-list';
  section.dataset.londonAttractions = 'true';
  section.innerHTML = londonAttractionTemplates.map((template) => buildLondonAttractionCard(template)).join('');

  const placesContainer = document.getElementById('london-places-panel-content');
  if (placesContainer) {
    placesContainer.appendChild(section);
    return;
  }

  if (intro && intro.parentElement === main) {
    main.insertBefore(section, intro.nextSibling);
  } else {
    main.insertBefore(section, gallery);
  }
}

function trimLondonPageToMasterAttractions() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'london.html') {
    return;
  }

  const main = document.querySelector('main');
  if (main?.dataset.londonPhase1Ui === 'true') {
    return;
  }

  const intro = main?.querySelector('.page-intro');
  const attractionGrid = main?.querySelector('section.card-grid[data-london-attractions="true"]');
  const gallery = main?.querySelector('.photo-gallery-collapsible');

  if (!main || !intro || !attractionGrid) {
    return;
  }

  Array.from(main.children).forEach((node) => {
    if (node === intro || node === attractionGrid || node === gallery) {
      return;
    }

    node.remove();
  });
}

function initializeLondonPlacesAccordionItems() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'london.html') {
    return;
  }

  const attractionGrid = document.querySelector('[data-london-attractions="true"]');
  if (!attractionGrid || attractionGrid.dataset.accordionified === 'true') {
    return;
  }

  const cards = Array.from(attractionGrid.querySelectorAll(':scope > article.destination-card'));
  cards.forEach((card, index) => {
    const heading = card.querySelector('h3');
    const title = heading ? heading.textContent.trim() : `Attraction ${index + 1}`;
    const attractionKey = card.querySelector('button[data-add-to-today-plan]')?.dataset.addToTodayPlan || '';
    card.dataset.attractionTitle = title;
    if (attractionKey) {
      card.dataset.attractionKey = attractionKey;
    }

    if (heading) {
      heading.remove();
    }

    const details = document.createElement('details');
    details.className = 'london-section london-attraction-accordion';

    const summary = document.createElement('summary');
    summary.className = 'london-section-summary';
    summary.textContent = title;

    const body = document.createElement('div');
    body.className = 'london-section-body';
    body.appendChild(card);

    details.appendChild(summary);
    details.appendChild(body);
    bindLondonAccordionIndicator(details);

    attractionGrid.appendChild(details);
  });

  attractionGrid.dataset.accordionified = 'true';
}

function initializeLondonBeforeYouGoBriefing() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (!['london.html', 'edinburgh.html', 'inverness.html', 'portree.html', 'liverpool.html', 'dublin.html', 'dover.html', 'rotterdam.html', 'amsterdam.html', 'haugesund.html', 'odda.html', 'nordfjordeid.html', 'alesund.html'].includes(pageName)) {
    return;
  }

  const panel = document.getElementById('london-practical-panel');
  if (!panel) {
    return;
  }

  const londonBeforeYouGoTemplates = getLondonTemplateMap();
  const edinburghBeforeYouGoTemplates = {
    'edinburgh castle': {
      title: 'Edinburgh Castle',
      googleMapsQuery: 'Edinburgh Castle',
      summary: [
        'Crown Room and Scottish regalia are major indoor highlights.',
        'Ramparts provide some of the best skyline viewpoints in the city.',
        'The downhill walk into the Royal Mile is the easiest next step.'
      ],
      tube: {
        steps: [
          'Walk from Leith cruise terminal toward nearby tram/bus connections.',
          'Use tram or transfer toward Princes Street, then continue uphill on foot.',
          'Estimated travel time: 30-40 minutes.'
        ]
      },
      bus: {
        steps: [
          'Board a central Edinburgh route toward Princes Street or the Mound.',
          'Walk uphill to the castle esplanade approach.',
          'Estimated travel time: 30-40 minutes.'
        ]
      },
      taxi: { time: 'Typical travel time: 20-30 minutes.' }
    },
    'royal mile edinburgh': {
      title: 'Royal Mile',
      googleMapsQuery: 'Royal Mile Edinburgh',
      summary: [
        'St Giles and nearby closes are easy quick-stop highlights.',
        'Street atmosphere is strongest in the central stretch around the cathedral.',
        'Cafes and souvenir stops are best taken in short breaks.'
      ],
      tube: { steps: ['Use tram or bus toward central Edinburgh, then walk to the Royal Mile.', 'Estimated travel time: 28-38 minutes.'] },
      bus: { steps: ['Take a central route toward North Bridge or Princes Street.', 'Estimated travel time: 25-35 minutes.'] },
      taxi: { time: 'Typical travel time: 18-28 minutes.' }
    },
    'st giles cathedral edinburgh': {
      title: 'St Giles\' Cathedral',
      googleMapsQuery: 'St Giles Cathedral Edinburgh',
      summary: [
        'The crown steeple and Thistle Chapel make this one of central Edinburgh\'s most rewarding short visits.',
        'The interior works well as a quick indoor stop in changing weather.',
        'It pairs easily with surrounding closes and the museum quarter.'
      ],
      tube: { steps: ['Travel toward central Edinburgh and finish on foot near High Street.', 'Estimated travel time: 28-38 minutes.'] },
      bus: { steps: ['Use a city-centre route to North Bridge or the High Street edge.', 'Estimated travel time: 25-35 minutes.'] },
      taxi: { time: 'Typical travel time: 18-28 minutes.' }
    },
    'calton hill edinburgh': {
      title: 'Calton Hill',
      googleMapsQuery: 'Calton Hill Edinburgh',
      summary: [
        'One of the best short skyline-view stops in the city.',
        'The uphill stretch is brief but exposed to wind and weather.',
        'A good add-on near Princes Street and Waverley side routes.'
      ],
      tube: { steps: ['Travel toward Princes Street or St Andrew Square, then walk uphill.', 'Estimated travel time: 25-35 minutes.'] },
      bus: { steps: ['Use a city-centre route and finish with a short uphill approach.', 'Estimated travel time: 22-32 minutes.'] },
      taxi: { time: 'Typical travel time: 18-25 minutes.' }
    },
    'royal yacht britannia edinburgh': {
      title: 'Royal Yacht Britannia',
      googleMapsQuery: 'Royal Yacht Britannia',
      summary: [
        'Easy maritime-history option close to Leith.',
        'Pairs well with waterfront coffee or lunch.',
        'Lower-effort alternative to a second steep Old Town block.'
      ],
      tube: { steps: ['Tram or bus links into Leith and Ocean Terminal are straightforward.', 'Estimated travel time: 15-25 minutes.'] },
      bus: { steps: ['Local bus routing to Ocean Terminal is usually direct.', 'Estimated travel time: 12-22 minutes.'] },
      taxi: { time: 'Typical travel time: 10-15 minutes.' }
    }
  };

  const invernessBeforeYouGoTemplates = {
    'inverness castle viewpoint': {
      title: 'Inverness Castle Viewpoint',
      googleMapsQuery: 'Inverness Castle',
      summary: [
        'A quick skyline anchor above the River Ness.',
        'Good first-stop orientation point once you reach central Inverness.',
        'Easy to pair with the river walk and cathedral area.'
      ],
      tube: { steps: ['No local Tube service. Use rail or road transfer toward Inverness city centre.', 'Estimated travel time: 55-70 minutes.'] },
      bus: { steps: ['Use shuttle, regional bus, or city-centre transfer from the port area.', 'Estimated travel time: 55-75 minutes.'] },
      taxi: { time: 'Typical travel time: 50-60 minutes.' }
    },
    'river ness walk': {
      title: 'River Ness Walk',
      googleMapsQuery: 'River Ness Inverness',
      summary: [
        'Gentle riverside walking and easy photo opportunities define this stop.',
        'Good choice for a lower-effort central Inverness block.',
        'Pairs well with coffee, the cathedral, and nearby shopping.'
      ],
      tube: { steps: ['No local Tube service. Travel into Inverness city centre, then continue on foot to the river.', 'Estimated travel time: 55-70 minutes.'] },
      bus: { steps: ['Use shuttle or regional bus toward Inverness centre, then walk to the river paths.', 'Estimated travel time: 55-75 minutes.'] },
      taxi: { time: 'Typical travel time: 50-60 minutes.' }
    },
    'victorian market inverness': {
      title: 'Victorian Market',
      googleMapsQuery: 'Victorian Market Inverness',
      summary: [
        'Useful indoor stop for gifts, snacks, and a weather-safe break.',
        'Easy to combine with the station side of central Inverness.',
        'Good place for quick souvenir shopping without a long detour.'
      ],
      tube: { steps: ['No local Tube service. Travel into Inverness city centre and continue on foot to the market.', 'Estimated travel time: 55-70 minutes.'] },
      bus: { steps: ['Use shuttle or regional bus toward central Inverness, then walk a few minutes to the market.', 'Estimated travel time: 55-75 minutes.'] },
      taxi: { time: 'Typical travel time: 50-60 minutes.' }
    },
    'culloden battlefield': {
      title: 'Culloden Battlefield',
      googleMapsQuery: 'Culloden Battlefield',
      summary: [
        'One of the Highlands\' most important historic sites with a more reflective atmosphere.',
        'Best visited with direct transport rather than multiple changes.',
        'Weather and ground conditions can shape the visit more than in-city stops.'
      ],
      tube: { steps: ['No Tube service. Direct road transfer from the ship or from central Inverness is the simplest approach.', 'Estimated travel time: 65-85 minutes.'] },
      bus: { steps: ['Bus routing is possible but slower and less flexible than a direct transfer.', 'Estimated travel time: 75-95 minutes.'] },
      taxi: { time: 'Typical travel time: 60-75 minutes.' }
    },
    'loch ness and urquhart castle': {
      title: 'Loch Ness & Urquhart Castle',
      googleMapsQuery: 'Urquhart Castle',
      summary: [
        'Classic Highland scenery, loch views, and castle ruins make this the signature scenic stop.',
        'Best done with simple direct transport and generous return buffer.',
        'Weather, traffic, and photo stops can lengthen the outing.'
      ],
      tube: { steps: ['No Tube service. Road transfer is the practical option from the ship or Inverness.', 'Estimated travel time: 80-100 minutes.'] },
      bus: { steps: ['Bus options exist but are slower and need schedule checks before departure.', 'Estimated travel time: 90-120 minutes.'] },
      taxi: { time: 'Typical travel time: 75-95 minutes.' }
    }
  };

  const portreeBeforeYouGoTemplates = {
    'portree harbour': {
      title: 'Portree Harbour',
      googleMapsQuery: 'Portree Harbour',
      summary: [
        'The harbor is the easiest first look at Skye and works well right off the tender.',
        'Colorful waterfront views make this a natural orientation and photo stop.',
        'It pairs easily with coffee, shopping, and a short village walk.'
      ],
      tube: { steps: ['No Tube service. Tender ashore first, then continue on foot through Portree.', 'Estimated travel time: 15-25 minutes including tendering.'] },
      bus: { steps: ['No local city bus needed for the harbor itself; tender and walking are the normal approach.', 'Estimated travel time: 15-25 minutes including tendering.'] },
      taxi: { time: 'Typical travel time: 15-25 minutes including tendering.' }
    },
    'the viewpoint portree': {
      title: 'The Viewpoint',
      googleMapsQuery: 'Portree Viewpoint',
      summary: [
        'One of the quickest panoramic overlooks for Portree harbour and the surrounding hills.',
        'A short, high-value photo stop if you want one stronger village panorama.',
        'Weather and footing can shape how comfortable the uphill section feels.'
      ],
      tube: { steps: ['No Tube service. Tender ashore, then use walking or local road transfer toward the viewpoint.', 'Estimated travel time: 20-30 minutes including tendering.'] },
      bus: { steps: ['Local road transfer options are limited; walking or taxi is usually simpler.', 'Estimated travel time: 20-30 minutes including tendering.'] },
      taxi: { time: 'Typical travel time: 18-25 minutes including tendering.' }
    },
    'old man of storr': {
      title: 'Old Man of Storr',
      googleMapsQuery: 'Old Man of Storr',
      summary: [
        'One of Skye\'s iconic natural landmarks with dramatic rock formations and wide views.',
        'Road transfer and walking effort are both meaningful here.',
        'Weather and trail conditions matter more than in Portree village stops.'
      ],
      tube: { steps: ['No Tube service. Direct road transfer from the tender landing is the practical choice.', 'Estimated travel time: 40-55 minutes including tendering.'] },
      bus: { steps: ['Public service is limited and less flexible than taxi or organized transfer.', 'Estimated travel time: 45-60 minutes including tendering.'] },
      taxi: { time: 'Typical travel time: 35-45 minutes including tendering.' }
    },
    'kilt rock': {
      title: 'Kilt Rock',
      googleMapsQuery: 'Kilt Rock',
      summary: [
        'A fast, high-impact coastal viewpoint with cliff and waterfall scenery.',
        'Good choice if you want one dramatic roadside Skye stop without a long hike.',
        'Wind exposure can be significant at the viewpoint.'
      ],
      tube: { steps: ['No Tube service. Use direct road transfer from the tender landing.', 'Estimated travel time: 40-50 minutes including tendering.'] },
      bus: { steps: ['Public service is limited; direct transfer is more reliable for return timing.', 'Estimated travel time: 45-60 minutes including tendering.'] },
      taxi: { time: 'Typical travel time: 35-45 minutes including tendering.' }
    },
    'talisker distillery': {
      title: 'Talisker Distillery',
      googleMapsQuery: 'Talisker Distillery',
      summary: [
        'A classic Skye whisky stop with strong island character and a longer road transfer.',
        'Best treated as one major out-of-town excursion rather than combined with too many other far stops.',
        'Return buffer matters because the west-coast road segment can take longer than expected.'
      ],
      tube: { steps: ['No Tube service. Direct road transfer is the practical choice from Portree tender arrival.', 'Estimated travel time: 70-85 minutes including tendering.'] },
      bus: { steps: ['Bus options are slower and less flexible than taxi or organized transfer.', 'Estimated travel time: 80-100 minutes including tendering.'] },
      taxi: { time: 'Typical travel time: 65-80 minutes including tendering.' }
    }
  };

  const liverpoolBeforeYouGoTemplates = {
    'royal albert dock': {
      title: 'Royal Albert Dock',
      googleMapsQuery: 'Royal Albert Dock Liverpool',
      summary: [
        'The waterfront anchor for galleries, museums, views, and easy city walking.',
        'Best first stop if you want the strongest balance of scenery and low-friction logistics.',
        'Pairs naturally with the Pier Head and Beatles Story area.'
      ],
      tube: { steps: ['No Tube service. Walk or transfer along the waterfront from the ship area.', 'Estimated travel time: 10-20 minutes.'] },
      bus: { steps: ['City bus connections are available, but the waterfront is often easiest on foot.', 'Estimated travel time: 10-20 minutes.'] },
      taxi: { time: 'Typical travel time: 5-15 minutes.' }
    },
    'the beatles story': {
      title: 'The Beatles Story',
      googleMapsQuery: 'The Beatles Story Liverpool',
      summary: [
        'Strong indoor attraction for music history and a good fit in mixed weather.',
        'Easy to combine with the Albert Dock and nearby waterfront stops.',
        'Useful anchor if you want a themed visit without long transfers.'
      ],
      tube: { steps: ['No Tube service. Continue on foot or by short transfer to the dock area.', 'Estimated travel time: 10-20 minutes.'] },
      bus: { steps: ['Short city bus hops can help, but the dock area is often easiest to walk.', 'Estimated travel time: 10-20 minutes.'] },
      taxi: { time: 'Typical travel time: 5-15 minutes.' }
    },
    'pier head liverpool': {
      title: 'Pier Head',
      googleMapsQuery: 'Pier Head Liverpool',
      summary: [
        'Classic Three Graces waterfront stop with easy open-air walking and city views.',
        'Good choice for low-effort orientation and photo opportunities.',
        'Pairs well with the ferry terminal area and nearby cafés.'
      ],
      tube: { steps: ['No Tube service. The cruise and ferry frontage are usually easiest to reach on foot.', 'Estimated travel time: 5-15 minutes.'] },
      bus: { steps: ['City buses stop nearby, but the waterfront route is usually straightforward on foot.', 'Estimated travel time: 5-15 minutes.'] },
      taxi: { time: 'Typical travel time: 5-10 minutes.' }
    },
    'cavern quarter': {
      title: 'Cavern Quarter',
      googleMapsQuery: 'Cavern Club Liverpool',
      summary: [
        'Music history, compact streets, and easy café/pub access define this central stop.',
        'Best paired with the waterfront or a Beatles-themed block of the city.',
        'Walking is easy, but crowds can build quickly in the quarter.'
      ],
      tube: { steps: ['No Tube service. Walk inward from the waterfront or use a short city transfer.', 'Estimated travel time: 12-20 minutes.'] },
      bus: { steps: ['Short city bus links are available but often not necessary for the central core.', 'Estimated travel time: 12-20 minutes.'] },
      taxi: { time: 'Typical travel time: 8-15 minutes.' }
    },
    'liverpool cathedral': {
      title: 'Liverpool Cathedral',
      googleMapsQuery: 'Liverpool Cathedral',
      summary: [
        'One of the city\'s strongest architectural and skyline stops, with more uphill effort than the waterfront.',
        'Best if you want a major interior plus elevated city views.',
        'Works well with a stronger walking block rather than a very short port call.'
      ],
      tube: { steps: ['No Tube service. Travel by road or a longer central walk from the waterfront.', 'Estimated travel time: 20-30 minutes.'] },
      bus: { steps: ['City buses can help reduce uphill walking for this stop.', 'Estimated travel time: 18-28 minutes.'] },
      taxi: { time: 'Typical travel time: 10-18 minutes.' }
    }
  };

  const dublinBeforeYouGoTemplates = {
    'trinity college dublin': {
      title: 'Trinity College',
      googleMapsQuery: 'Trinity College Dublin',
      summary: [
        'One of the clearest central cultural anchors in Dublin, combining architecture and literary history.',
        'Easy to pair with the Book of Kells area, Grafton Street, and nearby central blocks.',
        'Good first city stop if you want a compact cultural route.'
      ],
      tube: { steps: ['No Tube service. Use city transfer from the port, then continue on foot into the college area.', 'Estimated travel time: 20-30 minutes.'] },
      bus: { steps: ['Dublin bus links can help with the port-to-centre leg before a short final walk.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 15-25 minutes.' }
    },
    'dublin castle': {
      title: 'Dublin Castle',
      googleMapsQuery: 'Dublin Castle',
      summary: [
        'Historic core stop with easy links to the city centre and nearby museums.',
        'Works well with Trinity, Chester Beatty, and a compact historic-centre walking block.',
        'Good choice if you want strong history without a long detour.'
      ],
      tube: { steps: ['No Tube service. Transfer into central Dublin, then continue on foot toward the castle area.', 'Estimated travel time: 20-30 minutes.'] },
      bus: { steps: ['City bus routes can reduce walking from the port before the final central block on foot.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 15-25 minutes.' }
    },
    'st patricks cathedral dublin': {
      title: 'St. Patrick\'s Cathedral',
      googleMapsQuery: 'St. Patrick\'s Cathedral Dublin',
      summary: [
        'Strong architectural stop with a calmer atmosphere than the busiest central streets.',
        'Pairs well with Dublin Castle and nearby Georgian or cathedral-quarter walking.',
        'Best for a history-focused block with good indoor cover if weather turns.'
      ],
      tube: { steps: ['No Tube service. Use city transfer toward the centre, then continue on foot to the cathedral area.', 'Estimated travel time: 22-32 minutes.'] },
      bus: { steps: ['Bus routes can reduce the distance from the port before a short final walk.', 'Estimated travel time: 22-35 minutes.'] },
      taxi: { time: 'Typical travel time: 15-25 minutes.' }
    },
    'temple bar dublin': {
      title: 'Temple Bar',
      googleMapsQuery: 'Temple Bar Dublin',
      summary: [
        'Dublin\'s best-known social quarter with easy walking access to the river and central sights.',
        'Best for atmosphere, quick food or drink stops, and short city-centre loops.',
        'Crowds build quickly, so timing affects comfort more than distance.'
      ],
      tube: { steps: ['No Tube service. Reach central Dublin first, then continue on foot into Temple Bar.', 'Estimated travel time: 20-30 minutes.'] },
      bus: { steps: ['City bus routes can help with the port leg before final walking in the central core.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 15-25 minutes.' }
    },
    'epic the irish emigration museum': {
      title: 'EPIC The Irish Emigration Museum',
      googleMapsQuery: 'EPIC The Irish Emigration Museum',
      summary: [
        'Strong indoor museum option close to the river and transit nodes.',
        'Useful if you want a cultural stop with less weather exposure.',
        'Easy to pair with nearby riverfront and Docklands walking.'
      ],
      tube: { steps: ['No Tube service. Use port transfer toward the Docklands or central river area.', 'Estimated travel time: 18-28 minutes.'] },
      bus: { steps: ['Short city bus links can help with the port leg before a nearby walk to the museum.', 'Estimated travel time: 18-30 minutes.'] },
      taxi: { time: 'Typical travel time: 12-20 minutes.' }
    },
    'guinness storehouse dublin': {
      title: 'Guinness Storehouse',
      googleMapsQuery: 'Guinness Storehouse Dublin',
      summary: [
        'Major signature attraction with a stronger themed indoor block and city-view reward at the top.',
        'Best treated as one main cultural stop rather than a quick add-on.',
        'Easy to pair with another central attraction if you keep the route simple.'
      ],
      tube: { steps: ['No Tube service. Transfer by road into the St James\'s Gate area.', 'Estimated travel time: 20-30 minutes.'] },
      bus: { steps: ['Dublin bus links can help, though taxi is usually simpler for this route.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 15-25 minutes.' }
    }
  };

  const doverBeforeYouGoTemplates = {
    'dover castle': {
      title: 'Dover Castle',
      googleMapsQuery: 'Dover Castle',
      summary: [
        'Major Dover anchor combining medieval history, wartime infrastructure, and strong coastal views.',
        'Best treated as one substantial stop rather than a quick pass-through.',
        'Steep grades and larger grounds make timing and pacing important.'
      ],
      tube: { steps: ['No Tube service. Travel by short road transfer from the cruise terminal.', 'Estimated travel time: 10-20 minutes.'] },
      bus: { steps: ['Town bus options exist, but taxi or direct transfer is usually simpler from the port.', 'Estimated travel time: 15-25 minutes.'] },
      taxi: { time: 'Typical travel time: 8-15 minutes.' }
    },
    'white cliffs of dover': {
      title: 'White Cliffs of Dover',
      googleMapsQuery: 'White Cliffs of Dover',
      summary: [
        'Iconic coastal scenery with high-impact viewpoints and exposed cliff-top walking.',
        'Best for photography and open-air coastal experience.',
        'Weather and wind conditions can change comfort quickly.'
      ],
      tube: { steps: ['No Tube service. Use road transfer from the cruise area.', 'Estimated travel time: 15-30 minutes.'] },
      bus: { steps: ['Bus options are possible, but direct transfer is often simpler for return timing.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 12-22 minutes.' }
    },
    'secret wartime tunnels': {
      title: 'Secret Wartime Tunnels',
      googleMapsQuery: 'Dover Castle Secret Wartime Tunnels',
      summary: [
        'One of Dover\'s strongest WWII interpretation experiences, usually visited as part of the castle complex.',
        'Good indoor contrast to coastal viewpoints.',
        'Best sequenced with the castle to avoid duplicate transit.'
      ],
      tube: { steps: ['No Tube service. Access is via Dover Castle transfer and on-site routing.', 'Estimated travel time: 10-20 minutes to castle area.'] },
      bus: { steps: ['Use castle-bound transport and continue within the site.', 'Estimated travel time: 15-25 minutes to castle area.'] },
      taxi: { time: 'Typical travel time: 8-15 minutes to castle area.' }
    },
    'roman painted house dover': {
      title: 'Roman Painted House',
      googleMapsQuery: 'Roman Painted House Dover',
      summary: [
        'Compact archaeological stop with rare Roman wall paintings and strong historical context.',
        'Good low-duration add-on in central Dover.',
        'Useful if you want one short inland heritage stop between larger attractions.'
      ],
      tube: { steps: ['No Tube service. Reach central Dover by short transfer, then continue on foot.', 'Estimated travel time: 12-20 minutes.'] },
      bus: { steps: ['Town bus options can help, though short taxi transfer is often easiest.', 'Estimated travel time: 15-25 minutes.'] },
      taxi: { time: 'Typical travel time: 8-15 minutes.' }
    },
    'dover museum': {
      title: 'Dover Museum',
      googleMapsQuery: 'Dover Museum',
      summary: [
        'Compact museum stop covering local maritime and town history, including Bronze Age Boat displays.',
        'Useful indoor option if weather turns less favorable.',
        'Easy to pair with waterfront and town-centre walking.'
      ],
      tube: { steps: ['No Tube service. Reach town centre via short transfer from the port area.', 'Estimated travel time: 12-20 minutes.'] },
      bus: { steps: ['Local bus links can work, but short taxi or transfer may be faster.', 'Estimated travel time: 15-25 minutes.'] },
      taxi: { time: 'Typical travel time: 8-15 minutes.' }
    },
    'dover waterfront': {
      title: 'Dover Waterfront',
      googleMapsQuery: 'Dover Waterfront',
      summary: [
        'Easy maritime-zone stop close to cruise logistics and ideal for low-stress final blocks.',
        'Good for harbor atmosphere, short walks, and flexible food breaks.',
        'Works well before returning to the ship because of location and simple routing.'
      ],
      tube: { steps: ['No Tube service. Waterfront is typically reached by short walk or quick transfer from the terminal.', 'Estimated travel time: 8-18 minutes.'] },
      bus: { steps: ['Bus links are available, though walking can be practical depending on port gate routing.', 'Estimated travel time: 10-20 minutes.'] },
      taxi: { time: 'Typical travel time: 5-12 minutes.' }
    }
  };

  const rotterdamBeforeYouGoTemplates = {
    'markthal rotterdam': {
      title: 'Markthal',
      googleMapsQuery: 'Markthal Rotterdam',
      summary: [
        'Top central food-and-architecture stop with easy walking links to Old Harbour and Cube Houses.',
        'Best first city-centre anchor if you want flexible pacing and food options.',
        'Works in most weather because core areas are covered.'
      ],
      tube: { steps: ['No Tube service. Use tram, metro, or short transfer from the cruise terminal area.', 'Estimated travel time: 15-25 minutes.'] },
      bus: { steps: ['City transit links are good toward Blaak/Markthal, then continue on foot.', 'Estimated travel time: 15-30 minutes.'] },
      taxi: { time: 'Typical travel time: 10-18 minutes.' }
    },
    'cube houses rotterdam': {
      title: 'Cube Houses',
      googleMapsQuery: 'Cube Houses Rotterdam',
      summary: [
        'One of Rotterdam\'s best known architectural landmarks and an easy photo-first stop.',
        'Pairs naturally with Markthal and Old Harbour walking loops.',
        'Compact footprint makes this a low-friction add-on.'
      ],
      tube: { steps: ['No Tube service. Reach Blaak area by transit or short transfer, then walk to the houses.', 'Estimated travel time: 15-25 minutes.'] },
      bus: { steps: ['Tram/bus toward central Rotterdam is straightforward before a short final walk.', 'Estimated travel time: 15-30 minutes.'] },
      taxi: { time: 'Typical travel time: 10-18 minutes.' }
    },
    'erasmus bridge rotterdam': {
      title: 'Erasmus Bridge',
      googleMapsQuery: 'Erasmus Bridge Rotterdam',
      summary: [
        'Signature skyline and river-view corridor connecting multiple central districts.',
        'Excellent for photography and short scenic walking blocks.',
        'Easy to pair with Kop van Zuid, maritime areas, and central museums.'
      ],
      tube: { steps: ['No Tube service. Use tram/metro to a nearby stop, then continue on foot.', 'Estimated travel time: 10-22 minutes.'] },
      bus: { steps: ['Bus and tram routes converge near bridge approaches on both sides of the river.', 'Estimated travel time: 12-25 minutes.'] },
      taxi: { time: 'Typical travel time: 8-15 minutes.' }
    },
    'maritime museum rotterdam': {
      title: 'Maritime Museum',
      googleMapsQuery: 'Maritime Museum Rotterdam',
      summary: [
        'Strong port-history stop with interactive galleries and compact museum pacing.',
        'Best indoor cultural option for maritime-themed shore days.',
        'Easy to combine with bridge, waterfront, or Markthal areas.'
      ],
      tube: { steps: ['No Tube service. Reach central stations and continue a short walk to the museum.', 'Estimated travel time: 15-28 minutes.'] },
      bus: { steps: ['City transit options are frequent toward central museum and shopping corridors.', 'Estimated travel time: 15-30 minutes.'] },
      taxi: { time: 'Typical travel time: 10-20 minutes.' }
    },
    'euromast rotterdam': {
      title: 'Euromast',
      googleMapsQuery: 'Euromast Rotterdam',
      summary: [
        'Best elevated city-view stop for skyline and harbor perspective.',
        'Good anchor for a focused viewpoint-plus-park block.',
        'Weather visibility strongly shapes the value of the stop.'
      ],
      tube: { steps: ['No Tube service. Use tram/metro connections then short local transfer or walk.', 'Estimated travel time: 20-35 minutes.'] },
      bus: { steps: ['Transit is possible but may involve transfer plus walk depending on route.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 12-22 minutes.' }
    },
    'delfshaven rotterdam': {
      title: 'Delfshaven',
      googleMapsQuery: 'Delfshaven Rotterdam',
      summary: [
        'Historic canal district with older Dutch atmosphere and slower photo-friendly pacing.',
        'Good contrast to central modern architecture stops.',
        'Best as one dedicated side block rather than a rushed add-on.'
      ],
      tube: { steps: ['No Tube service. Use city transit westward, then continue locally on foot.', 'Estimated travel time: 20-35 minutes.'] },
      bus: { steps: ['Transit links are available but route choice can affect total transfer time.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 12-25 minutes.' }
    },
    'depot boijmans van beuningen': {
      title: 'Depot Boijmans Van Beuningen',
      googleMapsQuery: 'Depot Boijmans Van Beuningen Rotterdam',
      summary: [
        'Distinctive mirrored-architecture museum storage concept with strong visual and design appeal.',
        'Good indoor anchor in mixed weather with central cultural-quarter links.',
        'Works well with nearby museum district and park routes.'
      ],
      tube: { steps: ['No Tube service. Use central transit and continue to museum district stops.', 'Estimated travel time: 18-30 minutes.'] },
      bus: { steps: ['Tram/bus links serve the museum district; final approach is generally short on foot.', 'Estimated travel time: 18-32 minutes.'] },
      taxi: { time: 'Typical travel time: 12-22 minutes.' }
    }
  };

  const amsterdamBeforeYouGoTemplates = {
    'dam square amsterdam': {
      title: 'Dam Square',
      googleMapsQuery: 'Dam Square Amsterdam',
      summary: [
        'Central Amsterdam anchor with easy walking access to shopping streets and canal corridors.',
        'Best used as a navigation hub between historic core attractions.',
        'Crowd density varies sharply by time of day and event activity.'
      ],
      tube: { steps: ['No Tube service. Use tram/metro toward city centre then continue on foot.', 'Estimated travel time: 20-32 minutes.'] },
      bus: { steps: ['City tram/bus links are frequent toward Dam and central corridors.', 'Estimated travel time: 20-35 minutes.'] },
      taxi: { time: 'Typical travel time: 12-22 minutes.' }
    },
    'rijksmuseum amsterdam': {
      title: 'Rijksmuseum',
      googleMapsQuery: 'Rijksmuseum Amsterdam',
      summary: [
        'Major cultural anchor with high-value collections and timed-entry flow.',
        'Works best as one focused museum block rather than a rushed stop.',
        'Easy to pair with nearby Museumplein and canal walks.'
      ],
      tube: { steps: ['No Tube service. Use tram/metro to Museumplein-adjacent routes, then walk.', 'Estimated travel time: 24-38 minutes.'] },
      bus: { steps: ['Frequent transit options run toward museum district corridors.', 'Estimated travel time: 24-40 minutes.'] },
      taxi: { time: 'Typical travel time: 15-28 minutes.' }
    },
    'anne frank house amsterdam': {
      title: 'Anne Frank House',
      googleMapsQuery: 'Anne Frank House Amsterdam',
      summary: [
        'Essential historic stop with high demand and strict timed-entry rhythm.',
        'Best scheduled early in your city sequence to reduce timeline risk.',
        'Pairs naturally with Jordaan and canal-side walking.'
      ],
      tube: { steps: ['No Tube service. Use central transit, then continue through canal district on foot.', 'Estimated travel time: 22-36 minutes.'] },
      bus: { steps: ['Tram/bus options are good to central core, then short final walk.', 'Estimated travel time: 22-40 minutes.'] },
      taxi: { time: 'Typical travel time: 14-26 minutes.' }
    },
    'canal belt amsterdam': {
      title: 'Canal Belt',
      googleMapsQuery: 'Amsterdam Canal Belt',
      summary: [
        'Classic Amsterdam experience with flexible route options and short scenic blocks.',
        'Excellent for low-friction pacing between major attractions.',
        'Photography value is high throughout bridges and canal edges.'
      ],
      tube: { steps: ['No Tube service. Use central transit then walk the selected canal segment.', 'Estimated travel time: 20-35 minutes.'] },
      bus: { steps: ['City tram/bus links feed multiple canal-belt entry points.', 'Estimated travel time: 20-38 minutes.'] },
      taxi: { time: 'Typical travel time: 12-24 minutes.' }
    },
    'jordaan amsterdam': {
      title: 'Jordaan',
      googleMapsQuery: 'Jordaan Amsterdam',
      summary: [
        'Historic neighborhood with calmer streets, cafés, and boutique browsing.',
        'Strong contrast to busier central squares and museum corridors.',
        'Best visited as a slower-paced walk block.'
      ],
      tube: { steps: ['No Tube service. Use transit to central west side, then continue on foot.', 'Estimated travel time: 22-38 minutes.'] },
      bus: { steps: ['Tram/bus options are practical, followed by short local walking.', 'Estimated travel time: 22-40 minutes.'] },
      taxi: { time: 'Typical travel time: 14-26 minutes.' }
    },
    'royal palace amsterdam': {
      title: 'Royal Palace Amsterdam',
      googleMapsQuery: 'Royal Palace Amsterdam',
      summary: [
        'Historic palace stop at Dam Square with straightforward city-core access.',
        'Easy to combine with Dam area shopping and nearby canal routes.',
        'Good indoor option when weather shifts.'
      ],
      tube: { steps: ['No Tube service. Reach Dam area by central transit and continue on foot.', 'Estimated travel time: 20-34 minutes.'] },
      bus: { steps: ['Transit routes into central Dam corridor are frequent.', 'Estimated travel time: 20-36 minutes.'] },
      taxi: { time: 'Typical travel time: 12-22 minutes.' }
    },
    'bloemenmarkt amsterdam': {
      title: 'Bloemenmarkt',
      googleMapsQuery: 'Bloemenmarkt Amsterdam',
      summary: [
        'Iconic floating flower market area and compact central browsing stop.',
        'Works best as a short add-on between Dam/canal/museum zones.',
        'Easy to pair with nearby cafés and souvenir shopping.'
      ],
      tube: { steps: ['No Tube service. Use central transit toward Muntplein/Koningsplein corridor, then walk.', 'Estimated travel time: 20-34 minutes.'] },
      bus: { steps: ['Tram/bus links are frequent to nearby central stops.', 'Estimated travel time: 20-36 minutes.'] },
      taxi: { time: 'Typical travel time: 12-24 minutes.' }
    }
  };

  const haugesundBeforeYouGoTemplates = {
    'haraldshaugen national monument': {
      title: 'Haraldshaugen National Monument',
      googleMapsQuery: 'Haraldshaugen National Monument Haugesund',
      summary: [
        'Signature Haugesund historical monument with strong coastal atmosphere and views.',
        'Best used as a core heritage anchor in a compact port-day route.',
        'Works well with waterfront and city-centre walking stops.'
      ],
      tube: { steps: ['No Tube service. Use walking or short local transfer from port area.', 'Estimated travel time: 18-30 minutes.'] },
      bus: { steps: ['Local bus/taxi options are available for faster return timing.', 'Estimated travel time: 18-32 minutes.'] },
      taxi: { time: 'Typical travel time: 8-14 minutes.' }
    },
    'akrasanden beach haugesund': {
      title: 'Akrasanden Beach',
      googleMapsQuery: 'Akrasanden Beach',
      summary: [
        'Beautiful sandy coastal stop best treated as an optional longer transfer block.',
        'Best in favorable weather with enough return margin for ship timing.',
        'Pairs better as a dedicated outing than a quick add-on.'
      ],
      tube: { steps: ['No Tube service. Regional road transfer required.', 'Estimated travel time: 45-70 minutes.'] },
      bus: { steps: ['Regional buses can work but may reduce flexibility for return windows.', 'Estimated travel time: 55-85 minutes.'] },
      taxi: { time: 'Typical travel time: 35-55 minutes.' }
    },
    'djupadalen haugesund': {
      title: 'Djupadalen',
      googleMapsQuery: 'Djupadalen Haugesund',
      summary: [
        'Nature and walking area with lakeside/woodland character close to town.',
        'Good contrast to harbor and city stops with lower urban density.',
        'Best as a moderate-paced outdoor block depending on weather.'
      ],
      tube: { steps: ['No Tube service. Reach by walking plus short local transfer if preferred.', 'Estimated travel time: 25-40 minutes.'] },
      bus: { steps: ['Local transit is possible depending on route and day schedule.', 'Estimated travel time: 25-45 minutes.'] },
      taxi: { time: 'Typical travel time: 10-18 minutes.' }
    },
    'haugesund waterfront': {
      title: 'Haugesund Waterfront',
      googleMapsQuery: 'Haugesund Waterfront',
      summary: [
        'Low-friction maritime promenade stop near cruise logistics and city services.',
        'Ideal first or final block because of easy pacing and flexible timing.',
        'Strong café, photo, and short-shopping potential close to the harbor.'
      ],
      tube: { steps: ['No Tube service. Usually reachable by short walk from cruise area.', 'Estimated travel time: 8-18 minutes.'] },
      bus: { steps: ['Local bus options exist, but walking is often simplest in town core.', 'Estimated travel time: 10-20 minutes.'] },
      taxi: { time: 'Typical travel time: 5-10 minutes.' }
    },
    'haugesund city hall': {
      title: 'Haugesund City Hall',
      googleMapsQuery: 'Haugesund City Hall',
      summary: [
        'Distinctive local landmark with easy access from central harbor districts.',
        'Good short heritage-and-architecture stop with manageable pacing.',
        'Works well combined with waterfront and central walking routes.'
      ],
      tube: { steps: ['No Tube service. Reach by central walking route or short local transfer.', 'Estimated travel time: 15-25 minutes.'] },
      bus: { steps: ['Local bus links can reduce walking distance depending on stop choice.', 'Estimated travel time: 15-28 minutes.'] },
      taxi: { time: 'Typical travel time: 6-12 minutes.' }
    },
    'steinsfjellet viewpoint haugesund': {
      title: 'Steinsfjellet Viewpoint',
      googleMapsQuery: 'Steinsfjellet Viewpoint Haugesund',
      summary: [
        'High-value panorama stop over town and coastline with stronger elevation change.',
        'Best for photography and broad orientation of the surrounding region.',
        'Weather and visibility strongly affect this stop\'s value.'
      ],
      tube: { steps: ['No Tube service. Road transfer is typically the practical choice.', 'Estimated travel time: 22-38 minutes.'] },
      bus: { steps: ['Local transit may require timing checks and added walking.', 'Estimated travel time: 25-45 minutes.'] },
      taxi: { time: 'Typical travel time: 10-18 minutes.' }
    }
  };

  const oddaBeforeYouGoTemplates = {
    'trolltunga trail information odda': {
      title: 'Trolltunga Trail Information',
      googleMapsQuery: 'Trolltunga Skjeggedal Trailhead',
      summary: [
        'Planning anchor for Trolltunga access and realistic timing expectations.',
        'Best treated as a dedicated long excursion, not a quick in-port add-on.',
        'Weather, trail condition, and transfer reliability drive feasibility.'
      ],
      tube: { steps: ['No Tube service. Regional road transfer required to Skjeggedal access area.', 'Estimated travel time: 55-90 minutes.'] },
      bus: { steps: ['Limited regional bus options may require strict schedule matching.', 'Estimated travel time: 70-110 minutes.'] },
      taxi: { time: 'Typical travel time: 35-55 minutes.' }
    },
    'latefossen waterfall odda': {
      title: 'Latefossen Waterfall',
      googleMapsQuery: 'Latefossen Waterfall',
      summary: [
        'Major Odda scenic stop with dramatic twin-falls photography value.',
        'Best as a single dedicated scenic transfer block with return buffer.',
        'Road and weather conditions can affect arrival/stop pacing.'
      ],
      tube: { steps: ['No Tube service. Road transfer from Odda area is required.', 'Estimated travel time: 35-60 minutes.'] },
      bus: { steps: ['Regional bus options vary by day and can limit flexibility.', 'Estimated travel time: 40-70 minutes.'] },
      taxi: { time: 'Typical travel time: 20-35 minutes.' }
    },
    'odda town centre': {
      title: 'Odda Town Centre',
      googleMapsQuery: 'Odda Town Centre',
      summary: [
        'Low-friction logistics base for cafés, ATM, and route checks.',
        'Best starting point before weather-sensitive or remote segments.',
        'Easy to combine with waterfront walking and short scenic add-ons.'
      ],
      tube: { steps: ['No Tube service. Usually reached by short walk from arrival area.', 'Estimated travel time: 10-20 minutes.'] },
      bus: { steps: ['Local and regional bus stops are clustered near town core.', 'Estimated travel time: 12-24 minutes.'] },
      taxi: { time: 'Typical travel time: 5-10 minutes.' }
    },
    'buarbreen glacier area': {
      title: 'Buarbreen Glacier Area',
      googleMapsQuery: 'Buarbreen Glacier Area',
      summary: [
        'Nature-forward glacier-valley stop with more rugged walking context.',
        'Best when weather is stable and footwear is trail-appropriate.',
        'Plan as one focused outdoor segment rather than a short stop.'
      ],
      tube: { steps: ['No Tube service. Road transfer from Odda area is required.', 'Estimated travel time: 30-55 minutes.'] },
      bus: { steps: ['Regional/local transit options are limited; schedule checks are important.', 'Estimated travel time: 40-75 minutes.'] },
      taxi: { time: 'Typical travel time: 18-30 minutes.' }
    },
    'sorfjorden waterfront odda': {
      title: 'Sorfjorden Waterfront',
      googleMapsQuery: 'Sorfjorden Waterfront Odda',
      summary: [
        'Easy fjord-edge promenade option with low transfer complexity.',
        'Great final stop before ship return due to central proximity.',
        'Pairs well with town-centre food and quick shopping blocks.'
      ],
      tube: { steps: ['No Tube service. Usually reached by short walk from town core.', 'Estimated travel time: 10-20 minutes.'] },
      bus: { steps: ['Town and nearby stops make short bus links possible.', 'Estimated travel time: 12-24 minutes.'] },
      taxi: { time: 'Typical travel time: 5-10 minutes.' }
    },
    'rossnos viewpoint odda': {
      title: 'Rossnos Viewpoint',
      googleMapsQuery: 'Rossnos Viewpoint Odda',
      summary: [
        'High-value panorama stop over fjord and mountain terrain.',
        'Best treated as weather/visibility-dependent optional add-on.',
        'Wind and grade can affect comfort and schedule pace.'
      ],
      tube: { steps: ['No Tube service. Transfer by road and final ascent route is typical.', 'Estimated travel time: 30-55 minutes.'] },
      bus: { steps: ['Public transport access may be limited and timetable dependent.', 'Estimated travel time: 45-80 minutes.'] },
      taxi: { time: 'Typical travel time: 16-28 minutes.' }
    }
  };

  const nordfjordeidBeforeYouGoTemplates = {
    'sagastad viking center nordfjordeid': {
      title: 'Sagastad Viking Center',
      googleMapsQuery: 'Sagastad Viking Center Nordfjordeid',
      summary: [
        'Top Nordfjordeid heritage stop with strong indoor interpretation value.',
        'Easy to combine with waterfront and church/town walking segments.',
        'Reliable weather-safe anchor for a flexible port day.'
      ],
      tube: { steps: ['No Tube service. Usually reachable by short walk from cruise area or town core.', 'Estimated travel time: 10-20 minutes.'] },
      bus: { steps: ['Local stops are nearby, though walking is often easiest in central area.', 'Estimated travel time: 12-24 minutes.'] },
      taxi: { time: 'Typical travel time: 5-10 minutes.' }
    },
    'myklebust ship nordfjordeid': {
      title: 'Myklebust Ship',
      googleMapsQuery: 'Myklebust Ship Nordfjordeid',
      summary: [
        'Major Viking-era highlight connected with the Sagastad story.',
        'Strong cultural stop with manageable pacing near central routes.',
        'Works well in the same block as Sagastad and waterfront walking.'
      ],
      tube: { steps: ['No Tube service. Use short local walk/transfer in town area.', 'Estimated travel time: 12-22 minutes.'] },
      bus: { steps: ['Nearby local stops are usable but may not beat walking for short distances.', 'Estimated travel time: 14-26 minutes.'] },
      taxi: { time: 'Typical travel time: 5-12 minutes.' }
    },
    'eid church nordfjordeid': {
      title: 'Eid Church',
      googleMapsQuery: 'Eid Church Nordfjordeid',
      summary: [
        'Historic church stop with calm village setting and easy pacing.',
        'Useful short heritage segment between town and waterfront visits.',
        'Best with opening-hours awareness when interior access is desired.'
      ],
      tube: { steps: ['No Tube service. Reach via local walk through village core.', 'Estimated travel time: 12-24 minutes.'] },
      bus: { steps: ['Local bus options exist but walking often remains simplest.', 'Estimated travel time: 14-28 minutes.'] },
      taxi: { time: 'Typical travel time: 6-12 minutes.' }
    },
    'nordfjord waterfront nordfjordeid': {
      title: 'Nordfjord Waterfront',
      googleMapsQuery: 'Nordfjord Waterfront Nordfjordeid',
      summary: [
        'Low-friction fjord promenade with easy route flexibility.',
        'Excellent final scenic block before ship return logistics.',
        'Simple pairing with cafés and village-center stops.'
      ],
      tube: { steps: ['No Tube service. Usually reached by short central walk.', 'Estimated travel time: 8-18 minutes.'] },
      bus: { steps: ['Nearby local stops support short links when needed.', 'Estimated travel time: 10-22 minutes.'] },
      taxi: { time: 'Typical travel time: 5-10 minutes.' }
    },
    'nordfjordeid town centre walk': {
      title: 'Nordfjordeid Town Centre Walk',
      googleMapsQuery: 'Nordfjordeid Town Centre',
      summary: [
        'Best logistics anchor for coffee, ATM, and route checks.',
        'Easy-going village walk with low transfer risk and flexible timing.',
        'Ideal connective segment between museum/church/waterfront stops.'
      ],
      tube: { steps: ['No Tube service. Usually reached directly on foot from port approach.', 'Estimated travel time: 10-20 minutes.'] },
      bus: { steps: ['Town-centre stops exist, though distances are often walkable.', 'Estimated travel time: 12-24 minutes.'] },
      taxi: { time: 'Typical travel time: 5-10 minutes.' }
    },
    'harpefossen viewpoint nordfjordeid': {
      title: 'Harpefossen Viewpoint',
      googleMapsQuery: 'Harpefossen Viewpoint Nordfjordeid',
      summary: [
        'Scenic elevation option for broad fjord and valley perspective.',
        'Best handled as an optional weather-dependent add-on with buffer time.',
        'Road access and visibility conditions drive this stop\'s value.'
      ],
      tube: { steps: ['No Tube service. Road transfer is typically required.', 'Estimated travel time: 25-45 minutes.'] },
      bus: { steps: ['Public transit access can be limited and schedule-dependent.', 'Estimated travel time: 35-65 minutes.'] },
      taxi: { time: 'Typical travel time: 14-24 minutes.' }
    }
  };

  const alesundBeforeYouGoTemplates = {
    'mount aksla alesund': {
      title: 'Mount Aksla',
      googleMapsQuery: 'Mount Aksla Alesund',
      summary: [
        'Signature Alesund panorama anchor with high photo value.',
        'Uphill grade and stairs can slow pace compared to map minimums.',
        'Best paired with Fjellstua and flexible descent timing.'
      ],
      tube: { steps: ['No Tube service. Walk or local city bus/taxi from cruise berth area.', 'Estimated travel time: 18-32 minutes.'] },
      bus: { steps: ['Use local city bus toward Aksla hillside access points when available.', 'Estimated travel time: 15-28 minutes.'] },
      taxi: { time: 'Typical travel time: 8-14 minutes.' }
    },
    'aksla viewpoint alesund': {
      title: 'Aksla Viewpoint',
      googleMapsQuery: 'Aksla Viewpoint Alesund',
      summary: [
        'Classic postcard viewpoint over harbor, islands, and city blocks.',
        'Visibility and wind strongly affect stop quality.',
        'Combines well with Mount Aksla and Fjellstua route planning.'
      ],
      tube: { steps: ['No Tube service. Reach via uphill walk, local bus, or short taxi link.', 'Estimated travel time: 20-34 minutes.'] },
      bus: { steps: ['Use local bus routes toward central hillside approach where available.', 'Estimated travel time: 16-30 minutes.'] },
      taxi: { time: 'Typical travel time: 8-15 minutes.' }
    },
    'fjellstua alesund': {
      title: 'Fjellstua',
      googleMapsQuery: 'Fjellstua Alesund',
      summary: [
        'High-value viewpoint-and-cafe stop with strong rest-break potential.',
        'Good midday anchor after central walking segments.',
        'Service hours and weather should be checked before climbing.'
      ],
      tube: { steps: ['No Tube service. Reach by uphill route, local bus, or taxi.', 'Estimated travel time: 22-36 minutes.'] },
      bus: { steps: ['Use local bus/taxi toward Fjellstua access road where service is available.', 'Estimated travel time: 18-32 minutes.'] },
      taxi: { time: 'Typical travel time: 9-16 minutes.' }
    },
    'brosundet canal alesund': {
      title: 'Brosundet Canal',
      googleMapsQuery: 'Brosundet Canal Alesund',
      summary: [
        'Core canal-and-architecture route with low transfer complexity.',
        'Best first-stop orientation point close to town amenities.',
        'Easy pairing with Art Nouveau Centre and town-centre cafes.'
      ],
      tube: { steps: ['No Tube service. Usually reachable by short walk from cruise berth area.', 'Estimated travel time: 10-18 minutes.'] },
      bus: { steps: ['Local city bus stops are nearby, but walking is often quickest.', 'Estimated travel time: 12-22 minutes.'] },
      taxi: { time: 'Typical travel time: 5-9 minutes.' }
    },
    'art nouveau centre alesund': {
      title: 'Art Nouveau Centre',
      googleMapsQuery: 'Art Nouveau Centre Alesund',
      summary: [
        'Best cultural anchor for architecture and city-history context.',
        'Strong weather-safe indoor option for variable port-day conditions.',
        'Pairs naturally with canal walk and shopping stops.'
      ],
      tube: { steps: ['No Tube service. Reach by short walk from central harbor routes.', 'Estimated travel time: 12-20 minutes.'] },
      bus: { steps: ['Local city buses stop near town centre/canal district.', 'Estimated travel time: 12-24 minutes.'] },
      taxi: { time: 'Typical travel time: 6-10 minutes.' }
    },
    'atlantic sea park alesund': {
      title: 'Atlantic Sea Park',
      googleMapsQuery: 'Atlantic Sea Park Alesund',
      summary: [
        'Major marine attraction with strong indoor value and coastal setting.',
        'Longest transfer among core Alesund options, so keep return buffer.',
        'Works best as a dedicated block rather than a quick add-on.'
      ],
      tube: { steps: ['No Tube service. Regional/local bus or taxi transfer required.', 'Estimated travel time: 20-35 minutes.'] },
      bus: { steps: ['Use local bus routes toward Tueneset/Atlanterhavsparken corridor.', 'Estimated travel time: 22-38 minutes.'] },
      taxi: { time: 'Typical travel time: 12-20 minutes.' }
    },
    'alesund town centre': {
      title: 'Alesund Town Centre',
      googleMapsQuery: 'Alesund Town Centre',
      summary: [
        'Best logistics base for coffee, gift shopping, ATM, and route checks.',
        'Low-friction walking grid ideal for flexible pacing.',
        'Easy connector between Brosundet, Art Nouveau Centre, and harbor return.'
      ],
      tube: { steps: ['No Tube service. Usually reached directly on foot from cruise area.', 'Estimated travel time: 10-18 minutes.'] },
      bus: { steps: ['Local town stops are close, though walking is often easiest.', 'Estimated travel time: 10-20 minutes.'] },
      taxi: { time: 'Typical travel time: 5-9 minutes.' }
    }
  };

  const templateMap = pageName === 'london.html'
    ? londonBeforeYouGoTemplates
    : pageName === 'edinburgh.html'
      ? edinburghBeforeYouGoTemplates
      : pageName === 'inverness.html'
        ? invernessBeforeYouGoTemplates
        : pageName === 'portree.html'
          ? portreeBeforeYouGoTemplates
          : pageName === 'liverpool.html'
            ? liverpoolBeforeYouGoTemplates
            : pageName === 'dublin.html'
              ? dublinBeforeYouGoTemplates
              : pageName === 'dover.html'
                ? doverBeforeYouGoTemplates
                : pageName === 'rotterdam.html'
                  ? rotterdamBeforeYouGoTemplates
                  : pageName === 'amsterdam.html'
                    ? amsterdamBeforeYouGoTemplates
                    : pageName === 'odda.html'
                      ? oddaBeforeYouGoTemplates
                      : pageName === 'nordfjordeid.html'
                        ? nordfjordeidBeforeYouGoTemplates
                        : pageName === 'alesund.html'
                          ? alesundBeforeYouGoTemplates
                        : haugesundBeforeYouGoTemplates;
  const shipPlanningOriginByPage = {
    'edinburgh.html': 'Nieuw Statendam Edinburgh cruise port',
    'inverness.html': 'Nieuw Statendam Invergordon cruise port',
    'portree.html': 'Nieuw Statendam Portree tender arrival',
    'liverpool.html': 'Nieuw Statendam Liverpool waterfront arrival',
    'dublin.html': 'Nieuw Statendam Dublin cruise port',
    'dover.html': 'Nieuw Statendam Dover cruise terminal',
    'rotterdam.html': 'Nieuw Statendam Rotterdam cruise terminal',
    'amsterdam.html': 'Nieuw Statendam Amsterdam cruise terminal',
    'haugesund.html': 'Nieuw Statendam Haugesund cruise berth',
    'odda.html': 'Nieuw Statendam Odda cruise arrival point',
    'nordfjordeid.html': 'Nieuw Statendam Nordfjordeid cruise berth',
    'alesund.html': 'Nieuw Statendam Alesund cruise berth'
  };
  const hotelName = pageName === 'london.html' ? getTravelerStartingLocationOrigin() : shipPlanningOriginByPage[pageName];
  const defaultArrivalMinutes = pageName === 'london.html' ? 10 * 60 : 9 * 60 + 30;
  const walkingMinutesByKey = pageName === 'london.html' ? {
    'buckingham palace': 15,
    'westminster / big ben': 18,
    'trafalgar square': 20,
    'westminster abbey': 22,
    'churchill war rooms': 22,
    'tower of london': 45,
    'tower bridge': 40,
    'sky garden': 35,
    'borough market': 35,
    'st. paul\'s cathedral': 35,
    'kensington palace': 35,
    'windsor castle': 90
  } : pageName === 'edinburgh.html' ? {
    'edinburgh castle': 55,
    'royal mile edinburgh': 48,
    'st giles cathedral edinburgh': 46,
    'calton hill edinburgh': 42,
    'royal yacht britannia edinburgh': 20
  } : {
    'inverness castle viewpoint': 65,
    'river ness walk': 68,
    'victorian market inverness': 67,
    'culloden battlefield': 999,
    'loch ness and urquhart castle': 999
  };
  const portreeWalkingMinutesByKey = {
    'portree harbour': 18,
    'the viewpoint portree': 28,
    'old man of storr': 999,
    'kilt rock': 999,
    'talisker distillery': 999
  };
  const liverpoolWalkingMinutesByKey = {
    'royal albert dock': 18,
    'the beatles story': 18,
    'pier head liverpool': 12,
    'cavern quarter': 20,
    'liverpool cathedral': 35
  };
  const dublinWalkingMinutesByKey = {
    'trinity college dublin': 32,
    'dublin castle': 34,
    'st patricks cathedral dublin': 38,
    'temple bar dublin': 30,
    'epic the irish emigration museum': 22,
    'guinness storehouse dublin': 45
  };
  const doverWalkingMinutesByKey = {
    'dover castle': 40,
    'white cliffs of dover': 55,
    'secret wartime tunnels': 40,
    'roman painted house dover': 26,
    'dover museum': 24,
    'dover waterfront': 18
  };
  const rotterdamWalkingMinutesByKey = {
    'markthal rotterdam': 30,
    'cube houses rotterdam': 32,
    'erasmus bridge rotterdam': 22,
    'maritime museum rotterdam': 30,
    'euromast rotterdam': 50,
    'delfshaven rotterdam': 65,
    'depot boijmans van beuningen': 42
  };
  const amsterdamWalkingMinutesByKey = {
    'dam square amsterdam': 35,
    'rijksmuseum amsterdam': 45,
    'anne frank house amsterdam': 40,
    'canal belt amsterdam': 38,
    'jordaan amsterdam': 42,
    'royal palace amsterdam': 35,
    'bloemenmarkt amsterdam': 36
  };
  const haugesundWalkingMinutesByKey = {
    'haraldshaugen national monument': 40,
    'akrasanden beach haugesund': 999,
    'djupadalen haugesund': 50,
    'haugesund waterfront': 16,
    'haugesund city hall': 22,
    'steinsfjellet viewpoint haugesund': 999
  };
  const oddaWalkingMinutesByKey = {
    'trolltunga trail information odda': 999,
    'latefossen waterfall odda': 999,
    'odda town centre': 18,
    'buarbreen glacier area': 999,
    'sorfjorden waterfront odda': 16,
    'rossnos viewpoint odda': 999
  };
  const nordfjordeidWalkingMinutesByKey = {
    'sagastad viking center nordfjordeid': 18,
    'myklebust ship nordfjordeid': 20,
    'eid church nordfjordeid': 22,
    'nordfjord waterfront nordfjordeid': 14,
    'nordfjordeid town centre walk': 16,
    'harpefossen viewpoint nordfjordeid': 999
  };
  const alesundWalkingMinutesByKey = {
    'mount aksla alesund': 28,
    'aksla viewpoint alesund': 30,
    'fjellstua alesund': 34,
    'brosundet canal alesund': 14,
    'art nouveau centre alesund': 16,
    'atlantic sea park alesund': 999,
    'alesund town centre': 12
  };
  const effectiveWalkingMinutesByKey = pageName === 'portree.html'
    ? portreeWalkingMinutesByKey
    : pageName === 'liverpool.html'
      ? liverpoolWalkingMinutesByKey
      : pageName === 'dublin.html'
        ? dublinWalkingMinutesByKey
        : pageName === 'dover.html'
          ? doverWalkingMinutesByKey
          : pageName === 'rotterdam.html'
            ? rotterdamWalkingMinutesByKey
            : pageName === 'amsterdam.html'
              ? amsterdamWalkingMinutesByKey
              : pageName === 'odda.html'
                ? oddaWalkingMinutesByKey
              : pageName === 'nordfjordeid.html'
                ? nordfjordeidWalkingMinutesByKey
              : pageName === 'alesund.html'
                ? alesundWalkingMinutesByKey
              : pageName === 'haugesund.html'
                ? haugesundWalkingMinutesByKey
                : walkingMinutesByKey;

  const nearestStopsByKey = pageName === 'london.html' ? {
    'tower of london': { tube: 'Tower Hill', bus: 'Tower of London / Tower Hill' },
    'tower bridge': { tube: 'London Bridge or Tower Hill', bus: 'Tower Bridge Road / Tower Bridge' },
    'westminster / big ben': { tube: 'Westminster', bus: 'Parliament Square / Westminster' },
    'buckingham palace': { tube: 'Green Park', bus: 'Buckingham Palace Road / Victoria Memorial' },
    'sky garden': { tube: 'Monument', bus: 'Monument / Gracechurch Street' },
    'borough market': { tube: 'London Bridge', bus: 'Borough High Street / London Bridge' },
    'trafalgar square': { tube: 'Charing Cross', bus: 'Trafalgar Square / Charing Cross' },
    'westminster abbey': { tube: 'Westminster', bus: 'Parliament Square / Westminster Abbey' },
    'churchill war rooms': { tube: 'Westminster', bus: 'Whitehall / Parliament Square' },
    'st. paul\'s cathedral': { tube: 'St Paul\'s', bus: 'St Paul\'s Churchyard' },
    'kensington palace': { tube: 'High Street Kensington', bus: 'Kensington High Street' },
    'windsor castle': { tube: 'Windsor & Eton Riverside', bus: 'Windsor Theatre Royal (coach stop)' }
  } : pageName === 'edinburgh.html' ? {
    'edinburgh castle': { tube: 'Princes Street tram stop', bus: 'Castle Terrace / Lothian Road' },
    'royal mile edinburgh': { tube: 'St Andrew Square tram stop', bus: 'North Bridge / High Street' },
    'st giles cathedral edinburgh': { tube: 'St Andrew Square tram stop', bus: 'High Street / North Bridge' },
    'calton hill edinburgh': { tube: 'St Andrew Square tram stop', bus: 'Waterloo Place' },
    'royal yacht britannia edinburgh': { tube: 'Ocean Terminal tram/bus area', bus: 'Ocean Terminal' }
  } : {
    'inverness castle viewpoint': { tube: 'No Tube service', bus: 'Inverness bus station / city centre' },
    'river ness walk': { tube: 'No Tube service', bus: 'Inverness city centre stops' },
    'victorian market inverness': { tube: 'No Tube service', bus: 'Inverness bus station' },
    'culloden battlefield': { tube: 'No Tube service', bus: 'Culloden visitor stop area' },
    'loch ness and urquhart castle': { tube: 'No Tube service', bus: 'Drumnadrochit / Urquhart stop area' }
  };
  const portreeNearestStopsByKey = {
    'portree harbour': { tube: 'No Tube service', bus: 'Tender pier / harbour area' },
    'the viewpoint portree': { tube: 'No Tube service', bus: 'Portree Square / local taxi area' },
    'old man of storr': { tube: 'No Tube service', bus: 'Storr trailhead area' },
    'kilt rock': { tube: 'No Tube service', bus: 'Kilt Rock viewpoint area' },
    'talisker distillery': { tube: 'No Tube service', bus: 'Carbost / Talisker area' }
  };
  const liverpoolNearestStopsByKey = {
    'royal albert dock': { tube: 'No Tube service', bus: 'Waterfront / Albert Dock stops' },
    'the beatles story': { tube: 'No Tube service', bus: 'Albert Dock / Waterfront stops' },
    'pier head liverpool': { tube: 'No Tube service', bus: 'Pier Head / waterfront stops' },
    'cavern quarter': { tube: 'No Tube service', bus: 'Castle Street / Dale Street stops' },
    'liverpool cathedral': { tube: 'No Tube service', bus: 'Hope Street / Upper Duke Street stops' }
  };
  const dublinNearestStopsByKey = {
    'trinity college dublin': { tube: 'No Tube service', bus: 'College Green / Nassau Street' },
    'dublin castle': { tube: 'No Tube service', bus: 'Dame Street / Lord Edward Street' },
    'st patricks cathedral dublin': { tube: 'No Tube service', bus: 'Patrick Street / Nicholas Street' },
    'temple bar dublin': { tube: 'No Tube service', bus: 'Westmoreland Street / Dame Street' },
    'epic the irish emigration museum': { tube: 'No Tube service', bus: 'CHQ / Custom House Quay' },
    'guinness storehouse dublin': { tube: 'No Tube service', bus: 'James Street / St James\'s Gate' }
  };
  const doverNearestStopsByKey = {
    'dover castle': { tube: 'No Tube service', bus: 'Castle Hill / Dover Castle stop area' },
    'white cliffs of dover': { tube: 'No Tube service', bus: 'White Cliffs visitor area stop' },
    'secret wartime tunnels': { tube: 'No Tube service', bus: 'Dover Castle stop area' },
    'roman painted house dover': { tube: 'No Tube service', bus: 'Town centre / New Street area' },
    'dover museum': { tube: 'No Tube service', bus: 'Market Square / Pencester Road' },
    'dover waterfront': { tube: 'No Tube service', bus: 'Waterfront / seafront stops' }
  };
  const rotterdamNearestStopsByKey = {
    'markthal rotterdam': { tube: 'No Tube service', bus: 'Blaak / Markthal stops' },
    'cube houses rotterdam': { tube: 'No Tube service', bus: 'Blaak / Oude Haven stops' },
    'erasmus bridge rotterdam': { tube: 'No Tube service', bus: 'Leuvehaven / Kop van Zuid corridor' },
    'maritime museum rotterdam': { tube: 'No Tube service', bus: 'Leuvehaven / Beurs stops' },
    'euromast rotterdam': { tube: 'No Tube service', bus: 'Parkhaven / Euromast area stops' },
    'delfshaven rotterdam': { tube: 'No Tube service', bus: 'Delfshaven / Schiedamseweg corridor' },
    'depot boijmans van beuningen': { tube: 'No Tube service', bus: 'Museumpark / Eendrachtsplein stops' }
  };
  const amsterdamNearestStopsByKey = {
    'dam square amsterdam': { tube: 'No Tube service', bus: 'Dam / Paleisstraat tram stops' },
    'rijksmuseum amsterdam': { tube: 'No Tube service', bus: 'Rijksmuseum / Museumplein tram stops' },
    'anne frank house amsterdam': { tube: 'No Tube service', bus: 'Westermarkt tram stop' },
    'canal belt amsterdam': { tube: 'No Tube service', bus: 'Leidseplein / Koningsplein corridor stops' },
    'jordaan amsterdam': { tube: 'No Tube service', bus: 'Marnixstraat / Rozengracht tram stops' },
    'royal palace amsterdam': { tube: 'No Tube service', bus: 'Dam / Paleisstraat tram stops' },
    'bloemenmarkt amsterdam': { tube: 'No Tube service', bus: 'Koningsplein / Muntplein tram stops' }
  };
  const haugesundNearestStopsByKey = {
    'haraldshaugen national monument': { tube: 'No Tube service', bus: 'Haraldshaugen / Karmelvegen corridor' },
    'akrasanden beach haugesund': { tube: 'No Tube service', bus: 'Akrehamn / Akrasanden regional stops' },
    'djupadalen haugesund': { tube: 'No Tube service', bus: 'Djupadalen / Haraldsvang area stops' },
    'haugesund waterfront': { tube: 'No Tube service', bus: 'Harbor / city centre stops' },
    'haugesund city hall': { tube: 'No Tube service', bus: 'City Hall / central Haugesund stops' },
    'steinsfjellet viewpoint haugesund': { tube: 'No Tube service', bus: 'Steinsfjellet access area (limited service)' }
  };
  const oddaNearestStopsByKey = {
    'trolltunga trail information odda': { tube: 'No Tube service', bus: 'Skjeggedal / Trolltunga access bus area' },
    'latefossen waterfall odda': { tube: 'No Tube service', bus: 'Latefossen roadside regional stop area' },
    'odda town centre': { tube: 'No Tube service', bus: 'Odda sentrum / town centre stops' },
    'buarbreen glacier area': { tube: 'No Tube service', bus: 'Buar / glacier access area (limited service)' },
    'sorfjorden waterfront odda': { tube: 'No Tube service', bus: 'Waterfront / Odda centre stops' },
    'rossnos viewpoint odda': { tube: 'No Tube service', bus: 'Rossnos access area (limited service)' }
  };
  const nordfjordeidNearestStopsByKey = {
    'sagastad viking center nordfjordeid': { tube: 'No Tube service', bus: 'Sagastad / Eidsgata central stops' },
    'myklebust ship nordfjordeid': { tube: 'No Tube service', bus: 'Sagastad / central Nordfjordeid stops' },
    'eid church nordfjordeid': { tube: 'No Tube service', bus: 'Eid Church / central village stops' },
    'nordfjord waterfront nordfjordeid': { tube: 'No Tube service', bus: 'Waterfront / harbor area stops' },
    'nordfjordeid town centre walk': { tube: 'No Tube service', bus: 'Nordfjordeid sentrum stops' },
    'harpefossen viewpoint nordfjordeid': { tube: 'No Tube service', bus: 'Harpefossen access area (limited service)' }
  };
  const alesundNearestStopsByKey = {
    'mount aksla alesund': { tube: 'No Tube service', bus: 'Aksla hill access / central Alesund stops' },
    'aksla viewpoint alesund': { tube: 'No Tube service', bus: 'Aksla viewpoint approach stops' },
    'fjellstua alesund': { tube: 'No Tube service', bus: 'Fjellstua / Aksla access area' },
    'brosundet canal alesund': { tube: 'No Tube service', bus: 'Brosundet / central harbor stops' },
    'art nouveau centre alesund': { tube: 'No Tube service', bus: 'Apotekergata / central museum-area stops' },
    'atlantic sea park alesund': { tube: 'No Tube service', bus: 'Atlanterhavsparken / Tueneset corridor stops' },
    'alesund town centre': { tube: 'No Tube service', bus: 'Alesund sentrum / central harbor stops' }
  };
  const effectiveNearestStopsByKey = pageName === 'portree.html'
    ? portreeNearestStopsByKey
    : pageName === 'liverpool.html'
      ? liverpoolNearestStopsByKey
      : pageName === 'dublin.html'
        ? dublinNearestStopsByKey
        : pageName === 'dover.html'
          ? doverNearestStopsByKey
          : pageName === 'rotterdam.html'
            ? rotterdamNearestStopsByKey
            : pageName === 'amsterdam.html'
              ? amsterdamNearestStopsByKey
              : pageName === 'odda.html'
                ? oddaNearestStopsByKey
              : pageName === 'nordfjordeid.html'
                ? nordfjordeidNearestStopsByKey
              : pageName === 'alesund.html'
                ? alesundNearestStopsByKey
              : pageName === 'haugesund.html'
                ? haugesundNearestStopsByKey
                : nearestStopsByKey;

  const securityNotesByKey = pageName === 'london.html' ? {
    'tower of london': [
      'Security screening at entry is standard and queues can build quickly at opening.',
      'Large wheeled bags are typically not permitted; travel with a small day bag.',
      'Tripods, selfie sticks, and drones are generally not permitted inside the attraction.',
      'Knives, sharp objects, and other prohibited items may be confiscated at screening.'
    ],
    'westminster abbey': [
      'Photography is typically restricted inside much of the Abbey.',
      'Large bags and prohibited items may be refused during screening.',
      'Tripods and selfie sticks are typically not permitted during visitor entry.',
      'Please keep luggage minimal because bag-size controls may be enforced at entry.'
    ],
    'churchill war rooms': [
      'Expect bag checks at the entrance with airport-style screening measures.',
      'Avoid sharp objects and oversize luggage.',
      'Photography rules may vary by gallery space; follow posted restrictions.',
      'Tripods and bulky camera accessories are generally not appropriate inside the museum.'
    ],
    'st. paul\'s cathedral': [
      'Photography may be restricted in some interior areas; follow posted guidance.',
      'Security checks apply and bag size limits may be enforced on busy days.',
      'Tripods and selfie sticks are generally not permitted during sightseeing visits.',
      'Glass items, blades, and other prohibited articles may be refused at entry.'
    ],
    'windsor castle': [
      'Airport-style security screening applies before entry.',
      'Restricted items and large suitcases are typically not allowed; liquids may be checked.',
      'Photography restrictions may apply in selected interiors and special exhibition areas.',
      'Tripods, selfie sticks, and similar equipment are generally not permitted.'
    ],
    'buckingham palace': [
      'Security checks are standard and late arrivals can miss timed entry windows.',
      'Oversize bags and sharp items are generally not permitted.',
      'Tripods, selfie sticks, and restricted photography equipment are generally not allowed inside tours.',
      'Liquids may be subject to inspection and prohibited items will be refused at screening.'
    ]
  } : pageName === 'edinburgh.html' ? {
    'edinburgh castle': [
      'Security screening is common at the castle entrance during busy periods.',
      'Large bags, prohibited items, and sharp objects may slow or block entry.'
    ],
    'st giles cathedral edinburgh': [
      'Photography rules can vary by service times and special areas inside the cathedral.',
      'Respect quiet areas and any posted restrictions on equipment.'
    ],
    'calton hill edinburgh': [
      'Strong winds and wet stone can affect footing near the monuments and paths.',
      'Check conditions before climbing if the weather turns quickly.'
    ],
    'royal yacht britannia edinburgh': [
      'Standard attraction screening and ticket checks may apply on busy days.',
      'Photography restrictions can vary by exhibit area.'
    ]
  } : {
    'inverness castle viewpoint': [
      'Check same-day visitor access if castle-viewpoint operations change.',
      'Steep approaches and weather can affect comfort more than screening rules.'
    ],
    'river ness walk': [
      'Riverside paths can be wet or slippery after rain.',
      'Wind and changing weather matter even on short waterfront walks.'
    ],
    'victorian market inverness': [
      'Opening hours vary by stall and some shops close earlier than expected.',
      'Photography may be best kept discreet in smaller independent shops.'
    ],
    'culloden battlefield': [
      'Respect protected memorial areas and any restricted museum sections.',
      'Weather protection matters because much of the site is exposed.',
      'Some visitor-centre or exhibition photography rules may apply.'
    ],
    'loch ness and urquhart castle': [
      'Historic surfaces, steps, and exposed viewpoints can affect accessibility.',
      'Weather and wind can change quickly at the loch and castle ruins.',
      'Photography is encouraged outdoors, but restricted areas may still be signed.'
    ]
  };
  const portreeSecurityNotesByKey = {
    'portree harbour': [
      'Tender timing and queue flow can affect how quickly you get ashore or back to the ship.',
      'Harbour slopes and wet surfaces can be slippery in drizzle.'
    ],
    'the viewpoint portree': [
      'Wind and wet grass can affect footing near scenic edges.',
      'Accessibility is more limited than the harbour and town centre.'
    ],
    'old man of storr': [
      'Trail conditions can be muddy, uneven, and exposed to sudden weather changes.',
      'Walking difficulty is higher than village attractions and may not suit all mobility levels.',
      'Photography is excellent, but weather protection for equipment is important.'
    ],
    'kilt rock': [
      'Strong wind is common at the cliff viewpoint, so take extra care near open edges.',
      'Short stop, but conditions can still be exposed and wet.'
    ],
    'talisker distillery': [
      'Visitor access, tastings, and photography rules can vary by tour format and crowd level.',
      'Road travel time is significant, so return timing matters.'
    ]
  };
  const liverpoolSecurityNotesByKey = {
    'royal albert dock': [
      'Waterfront walking is generally easy, but weather and crowds can shape pacing.',
      'Museum or gallery spaces nearby may have separate bag and photography guidance.'
    ],
    'the beatles story': [
      'Timed-entry and bag guidance can vary on busy days.',
      'Photography rules may differ across exhibition areas.'
    ],
    'pier head liverpool': [
      'Open waterfront conditions can be windy and exposed.',
      'Street events or cruise-day crowd flow can affect access around the frontage.'
    ],
    'cavern quarter': [
      'Crowds can build quickly in the quarter, especially later in the day.',
      'Music venues and interior spaces may have their own access and photography policies.'
    ],
    'liverpool cathedral': [
      'Photography rules may vary by worship space and special exhibition areas.',
      'Interior scale and steps can affect accessibility for some routes.'
    ]
  };
  const dublinSecurityNotesByKey = {
    'trinity college dublin': [
      'Timed-entry and bag guidance can vary for major exhibitions or library spaces.',
      'Photography rules may differ by interior section.'
    ],
    'dublin castle': [
      'Some interior rooms, exhibitions, or state spaces may have separate photography guidance.',
      'Event setup can affect access on selected days.'
    ],
    'st patricks cathedral dublin': [
      'Photography rules may vary inside worship spaces and during services.',
      'Respect quiet areas and any posted visitor restrictions.'
    ],
    'temple bar dublin': [
      'Crowds can build quickly and make the area feel busier than the map suggests.',
      'Pub and venue entry rules vary, especially for live-music spaces.'
    ],
    'epic the irish emigration museum': [
      'Interactive galleries may have different photography or access guidance by section.',
      'Timed entry or queueing can affect the easiest arrival window.'
    ],
    'guinness storehouse dublin': [
      'Timed-entry and bag guidance can vary on busy days.',
      'Photography is common, but some exhibit areas may still have posted restrictions.'
    ]
  };
  const doverSecurityNotesByKey = {
    'dover castle': [
      'Security checks and bag policies may apply at selected entry points.',
      'Steep grades, stairs, and larger site distances can affect mobility pacing.'
    ],
    'white cliffs of dover': [
      'Cliff-top wind and weather can change rapidly; stay on marked paths.',
      'Edges are exposed in places, so footing and visibility matter.'
    ],
    'secret wartime tunnels': [
      'Interior sections can be cooler and lower-lit than surface attractions.',
      'Some areas may have accessibility limits due to historic tunnel geometry.'
    ],
    'roman painted house dover': [
      'Compact site with protected heritage surfaces; follow staff guidance closely.',
      'Photography rules can vary in enclosed exhibit sections.'
    ],
    'dover museum': [
      'Gallery-specific photography or flash rules may apply in certain sections.',
      'Opening hours can vary by season or special events.'
    ],
    'dover waterfront': [
      'Working-port activity means pedestrian attention is important near active roads and quays.',
      'Wind exposure can be stronger than in the town centre.'
    ]
  };
  const rotterdamSecurityNotesByKey = {
    'markthal rotterdam': [
      'Busy food-market flow can affect pacing at peak lunch windows.',
      'Photography is generally easy, but vendor areas still require respectful spacing.'
    ],
    'cube houses rotterdam': [
      'Narrow paths and stairs in interior demo spaces can affect accessibility.',
      'Crowds build quickly at exterior photo points.'
    ],
    'erasmus bridge rotterdam': [
      'Bridge paths can be windy, especially in exposed weather.',
      'Bike and pedestrian flow can be fast at commuting hours.'
    ],
    'maritime museum rotterdam': [
      'Gallery-specific photography guidance can vary by exhibit section.',
      'Opening hours and exhibit access can change by day and event schedule.'
    ],
    'euromast rotterdam': [
      'Visibility and comfort depend on weather and wind conditions.',
      'Lift queues can increase at peak sightseeing times.'
    ],
    'delfshaven rotterdam': [
      'Historic surfaces and quay edges may be uneven or slippery after rain.',
      'Quieter streets are easy to navigate but can be less direct than central blocks.'
    ],
    'depot boijmans van beuningen': [
      'Timed entry windows or queueing can apply on busy days.',
      'Interior photography policy can vary by section and temporary displays.'
    ]
  };
  const amsterdamSecurityNotesByKey = {
    'dam square amsterdam': [
      'Large crowd flows and events can affect movement and crossing pace.',
      'Watch bike-lane traffic carefully around all square approaches.'
    ],
    'rijksmuseum amsterdam': [
      'Timed-entry and bag-policy enforcement can vary by day and exhibit.',
      'Some gallery zones may limit flash or tripods.'
    ],
    'anne frank house amsterdam': [
      'Timed-ticket policy is strict and late arrivals may lose entry windows.',
      'Interior circulation is controlled and can include stairs and narrow passages.'
    ],
    'canal belt amsterdam': [
      'Canal edges, bridges, and wet paving can be slippery after rain.',
      'Bike traffic remains active even in seemingly quiet lanes.'
    ],
    'jordaan amsterdam': [
      'Narrow streets and mixed bike/pedestrian movement can slow pacing.',
      'Some smaller venues have tighter interior space and access limits.'
    ],
    'royal palace amsterdam': [
      'Entry screening and venue-specific photography guidance can apply.',
      'Opening hours can vary for events or state functions.'
    ],
    'bloemenmarkt amsterdam': [
      'Vendor hours and stall availability vary through the day.',
      'Crowded walkway sections can affect stop-and-photo comfort.'
    ]
  };
  const haugesundSecurityNotesByKey = {
    'haraldshaugen national monument': [
      'Coastal wind and exposed paths can affect comfort and photo stability.',
      'Wet surfaces may be slippery after rain.'
    ],
    'akrasanden beach haugesund': [
      'Weather and wind can shift quickly on exposed beach routes.',
      'Longer transfer distance requires stronger return-time discipline.'
    ],
    'djupadalen haugesund': [
      'Trail and park surfaces can be uneven or damp after rain.',
      'Daylight and weather changes can affect route comfort in wooded sections.'
    ],
    'haugesund waterfront': [
      'Harbor activity and mixed pedestrian/cycle flow can affect pacing.',
      'Coastal gusts are common along open promenade segments.'
    ],
    'haugesund city hall': [
      'Event activity can affect nearby access and quiet zones.',
      'Opening-hour checks are recommended before planning interior access.'
    ],
    'steinsfjellet viewpoint haugesund': [
      'Visibility and wind conditions strongly affect viewpoint value.',
      'Edge awareness and weather layering are important in exposed areas.'
    ]
  };
  const oddaSecurityNotesByKey = {
    'trolltunga trail information odda': [
      'Trolltunga route is a serious full-day mountain hike and not a quick port stop.',
      'Weather, daylight window, and trail condition must be confirmed before committing.'
    ],
    'latefossen waterfall odda': [
      'Wet spray and slick surfaces are common near waterfall viewpoints.',
      'Roadside stops require careful awareness of vehicle traffic and narrow shoulders.'
    ],
    'odda town centre': [
      'Street and crossing conditions are generally easy, but weather can still affect footing.',
      'Service hours may be shorter outside peak periods.'
    ],
    'buarbreen glacier area': [
      'Trail surfaces can be uneven, wet, and steep in places.',
      'Layering and sturdy footwear are strongly recommended.'
    ],
    'sorfjorden waterfront odda': [
      'Fjord-edge wind and rain can change comfort quickly.',
      'Waterfront surfaces may be slick during wet conditions.'
    ],
    'rossnos viewpoint odda': [
      'Visibility, wind, and exposed edges can affect both safety and photo quality.',
      'Use additional return-time margin for ascent/descent variability.'
    ]
  };
  const nordfjordeidSecurityNotesByKey = {
    'sagastad viking center nordfjordeid': [
      'Check museum opening windows and ticket desk timing before departure.',
      'Indoor exhibit rules for bags/photography can vary by event setup.'
    ],
    'myklebust ship nordfjordeid': [
      'Visitor flow can concentrate around key display areas during cruise calls.',
      'Follow on-site photography guidance where posted.'
    ],
    'eid church nordfjordeid': [
      'Opening times can vary around services or community events.',
      'Respect quiet-use expectations and posted access notices.'
    ],
    'nordfjord waterfront nordfjordeid': [
      'Fjord-edge wind and rain can make surfaces slick.',
      'Mixed pedestrian/vehicle activity near harbor roads can affect pacing.'
    ],
    'nordfjordeid town centre walk': [
      'Shop and café opening times may be shorter outside peak periods.',
      'Weather shifts can still affect comfort on village walking routes.'
    ],
    'harpefossen viewpoint nordfjordeid': [
      'Visibility and wind strongly affect viewpoint value and comfort.',
      'Road and edge awareness are important in exposed scenic areas.'
    ]
  };
  const alesundSecurityNotesByKey = {
    'mount aksla alesund': [
      'Stepped and uphill approaches can be slippery in rain; pace yourself on descents.',
      'Wind at exposed viewpoints can affect comfort and photo stability.'
    ],
    'aksla viewpoint alesund': [
      'Visibility and wind strongly affect photo conditions and comfort.',
      'Guardrails and edge awareness remain important in crowded scenic zones.'
    ],
    'fjellstua alesund': [
      'Check service/opening windows before climbing to avoid dead-time at the top.',
      'Weather shifts can make the route feel cooler and slower than expected.'
    ],
    'brosundet canal alesund': [
      'Bridge approaches and waterfront surfaces may be slick after rain.',
      'Narrow quays can get busy with mixed pedestrian traffic in peak periods.'
    ],
    'art nouveau centre alesund': [
      'Museum entry windows and exhibit access can vary by day and event schedule.',
      'Indoor photography guidance may vary by gallery section.'
    ],
    'atlantic sea park alesund': [
      'Longer transfer requires stronger return-time discipline for ship boarding windows.',
      'Check feeding/show schedules and last-entry timing before departure from town.'
    ],
    'alesund town centre': [
      'Shop and cafe hours may be shorter outside peak hours.',
      'Mixed weather can still affect comfort on frequent short walking links.'
    ]
  };
  const effectiveSecurityNotesByKey = pageName === 'portree.html'
    ? portreeSecurityNotesByKey
    : pageName === 'liverpool.html'
      ? liverpoolSecurityNotesByKey
      : pageName === 'dublin.html'
        ? dublinSecurityNotesByKey
        : pageName === 'dover.html'
          ? doverSecurityNotesByKey
          : pageName === 'rotterdam.html'
            ? rotterdamSecurityNotesByKey
            : pageName === 'amsterdam.html'
              ? amsterdamSecurityNotesByKey
              : pageName === 'odda.html'
                ? oddaSecurityNotesByKey
              : pageName === 'nordfjordeid.html'
                ? nordfjordeidSecurityNotesByKey
              : pageName === 'alesund.html'
                ? alesundSecurityNotesByKey
              : pageName === 'haugesund.html'
                ? haugesundSecurityNotesByKey
                : securityNotesByKey;

  const nearbyDetailsByKey = pageName === 'london.html' ? {
    'tower of london': {
      coffee: 'Tower Hill area - outside attraction',
      pub: 'St Katharine Docks - 5 to 8 min walk',
      restrooms: 'Available inside attraction',
      giftshop: 'Inside attraction',
      atm: 'Tower Hill station area'
    },
    'buckingham palace': {
      coffee: 'Green Park / Piccadilly side cafes',
      pub: 'Westminster / St James\'s - 8 to 12 min walk',
      restrooms: 'Nearby parks and cafes',
      giftshop: 'Official and nearby souvenir shops',
      atm: 'Green Park and Victoria areas'
    }
  } : pageName === 'edinburgh.html' ? {
    'edinburgh castle': {
      coffee: 'Castlehill / Lawnmarket cafés',
      pub: 'Grassmarket - 8 to 10 min walk',
      restrooms: 'Inside attraction or nearby cafés',
      giftshop: 'Castle shops and Royal Mile stores',
      atm: 'Princes Street and the Mound'
    },
    'royal mile edinburgh': {
      coffee: 'Royal Mile and Victoria Street cafés',
      pub: 'High Street and Grassmarket options',
      restrooms: 'Public facilities and nearby cafés',
      giftshop: 'Royal Mile souvenir shops',
      atm: 'High Street / North Bridge'
    },
    'st giles cathedral edinburgh': {
      coffee: 'High Street and George IV Bridge cafés',
      pub: 'Royal Mile and Cowgate pubs',
      restrooms: 'Nearby public facilities and cafés',
      giftshop: 'Royal Mile gift shops',
      atm: 'High Street / South Bridge'
    },
    'calton hill edinburgh': {
      coffee: 'Princes Street and St Andrew Square cafés',
      pub: 'Waterloo Place and city-centre pubs',
      restrooms: 'Nearby station and city-centre facilities',
      giftshop: 'Princes Street area shops',
      atm: 'Princes Street / St Andrew Square'
    },
    'royal yacht britannia edinburgh': {
      coffee: 'Ocean Terminal and waterfront cafés',
      pub: 'Leith waterfront pubs',
      restrooms: 'Ocean Terminal facilities',
      giftshop: 'On-site and terminal shopping',
      atm: 'Ocean Terminal'
    }
  } : {
    'inverness castle viewpoint': {
      coffee: 'River Ness and castle-area cafés',
      pub: 'Castle Tavern / riverside pubs',
      restrooms: 'City centre and nearby cafés',
      giftshop: 'Castle / city-centre gift options',
      atm: 'High Street / station area'
    },
    'river ness walk': {
      coffee: 'Riverside and cathedral-side cafés',
      pub: 'Riverside pubs and central Inverness bars',
      restrooms: 'City centre facilities and cafés',
      giftshop: 'Nearby central shops',
      atm: 'City centre cash machines'
    },
    'victorian market inverness': {
      coffee: 'Market and station-side cafés',
      pub: 'Academy Street / Old Town pubs',
      restrooms: 'Market and station facilities',
      giftshop: 'Inside market and nearby souvenir shops',
      atm: 'Station and market area'
    },
    'culloden battlefield': {
      coffee: 'Visitor-centre or Inverness return stop',
      pub: 'Inverness or nearby route pub options',
      restrooms: 'Visitor-centre facilities',
      giftshop: 'Visitor-centre shop',
      atm: 'Best handled in Inverness before departure'
    },
    'loch ness and urquhart castle': {
      coffee: 'Drumnadrochit or visitor-centre café options',
      pub: 'Loch-side or village pub options',
      restrooms: 'Visitor-centre and village facilities',
      giftshop: 'Urquhart / Loch Ness gift options',
      atm: 'Best handled before leaving Inverness'
    }
  };
  const portreeNearbyDetailsByKey = {
    'portree harbour': {
      coffee: 'Harbour-front and quay cafés',
      pub: 'Harbour and Somerled Square pubs',
      restrooms: 'Harbour and village-centre facilities',
      giftshop: 'Harbour and main-street shops',
      atm: 'Portree town centre'
    },
    'the viewpoint portree': {
      coffee: 'Portree centre cafés before or after the climb',
      pub: 'Portree harbour and square pubs',
      restrooms: 'Best handled in town before leaving',
      giftshop: 'Town-centre shops',
      atm: 'Portree centre'
    },
    'old man of storr': {
      coffee: 'Portree or trail-route cafés',
      pub: 'Return to Portree for easiest pub stop',
      restrooms: 'Limited trailhead facilities',
      giftshop: 'Best handled in Portree',
      atm: 'Best handled in Portree before departure'
    },
    'kilt rock': {
      coffee: 'Portree or route-stop café options',
      pub: 'Return to Portree for pub stop',
      restrooms: 'Limited route facilities',
      giftshop: 'Portree town shops',
      atm: 'Portree centre before departure'
    },
    'talisker distillery': {
      coffee: 'Carbost or distillery-area café options',
      pub: 'Carbost / Portree pub options',
      restrooms: 'Distillery visitor facilities',
      giftshop: 'Distillery shop',
      atm: 'Best handled in Portree before departure'
    }
  };
  const liverpoolNearbyDetailsByKey = {
    'royal albert dock': {
      coffee: 'Albert Dock waterfront cafés',
      pub: 'Dockside and waterfront pubs',
      restrooms: 'Dock and nearby museum facilities',
      giftshop: 'Dockside and museum shops',
      atm: 'Albert Dock / city-centre cash machines'
    },
    'the beatles story': {
      coffee: 'Albert Dock cafés',
      pub: 'Dockside or Cavern-area pubs',
      restrooms: 'Attraction and nearby dock facilities',
      giftshop: 'Beatles Story and dockside shops',
      atm: 'Albert Dock / city centre'
    },
    'pier head liverpool': {
      coffee: 'Waterfront and Pier Head cafés',
      pub: 'Waterfront pubs and nearby city-centre bars',
      restrooms: 'Waterfront and transport-hub facilities',
      giftshop: 'Nearby visitor and waterfront shops',
      atm: 'Pier Head / Liverpool One area'
    },
    'cavern quarter': {
      coffee: 'Mathew Street and central cafés',
      pub: 'Cavern Quarter pubs and live-music bars',
      restrooms: 'Nearby cafés and central public facilities',
      giftshop: 'Beatles and city-centre shops',
      atm: 'City-centre cash machines'
    },
    'liverpool cathedral': {
      coffee: 'Hope Street and cathedral-side cafés',
      pub: 'Hope Street pubs and restaurants',
      restrooms: 'Cathedral and nearby cultural-quarter facilities',
      giftshop: 'Cathedral shop and nearby stores',
      atm: 'Hope Street / city centre'
    }
  };
  const dublinNearbyDetailsByKey = {
    'trinity college dublin': {
      coffee: 'College Green and Grafton Street cafés',
      pub: 'Temple Bar and central pubs',
      restrooms: 'Campus or nearby central facilities',
      giftshop: 'College and city-centre shops',
      atm: 'College Green / Grafton Street'
    },
    'dublin castle': {
      coffee: 'Castle and Dame Street cafés',
      pub: 'Temple Bar and nearby historic pubs',
      restrooms: 'Castle and nearby central facilities',
      giftshop: 'Castle and city-centre shops',
      atm: 'Dame Street / city centre'
    },
    'st patricks cathedral dublin': {
      coffee: 'Cathedral and Liberties cafés',
      pub: 'Liberties and central pubs',
      restrooms: 'Cathedral and nearby visitor facilities',
      giftshop: 'Cathedral shop and nearby stores',
      atm: 'City-centre cash machines'
    },
    'temple bar dublin': {
      coffee: 'Temple Bar and nearby central cafés',
      pub: 'Temple Bar pubs and live-music venues',
      restrooms: 'Nearby central public facilities and cafés',
      giftshop: 'Temple Bar and city-centre souvenir shops',
      atm: 'Temple Bar / city centre'
    },
    'epic the irish emigration museum': {
      coffee: 'CHQ / Docklands cafés',
      pub: 'Docklands and riverfront pubs',
      restrooms: 'Museum and Docklands facilities',
      giftshop: 'Museum and nearby shops',
      atm: 'Docklands / city centre'
    },
    'guinness storehouse dublin': {
      coffee: 'Storehouse or nearby Liberties cafés',
      pub: 'Liberties and St James\'s area pubs',
      restrooms: 'Attraction facilities',
      giftshop: 'Storehouse shop',
      atm: 'City-centre before arrival'
    }
  };
  const doverNearbyDetailsByKey = {
    'dover castle': {
      coffee: 'Castle visitor café or nearby town cafés',
      pub: 'Town centre pubs after castle visit',
      restrooms: 'Castle visitor facilities',
      giftshop: 'Castle gift shop',
      atm: 'Town centre before or after visit'
    },
    'white cliffs of dover': {
      coffee: 'Cliffs visitor café options',
      pub: 'Dover town pubs after cliffs stop',
      restrooms: 'Visitor-centre facilities',
      giftshop: 'National Trust / visitor shop options',
      atm: 'Best handled in town before departure'
    },
    'secret wartime tunnels': {
      coffee: 'Castle-area café options',
      pub: 'Town-centre pubs',
      restrooms: 'Castle facilities',
      giftshop: 'Castle gift shop',
      atm: 'Town centre cash machines'
    },
    'roman painted house dover': {
      coffee: 'Town-centre cafés',
      pub: 'Dover town pubs',
      restrooms: 'Nearby central facilities',
      giftshop: 'Local heritage shops',
      atm: 'Town centre'
    },
    'dover museum': {
      coffee: 'Museum and nearby high-street cafés',
      pub: 'Town-centre and waterfront pubs',
      restrooms: 'Museum facilities',
      giftshop: 'Museum shop and nearby stores',
      atm: 'Town-centre cash machines'
    },
    'dover waterfront': {
      coffee: 'Waterfront cafés and kiosks',
      pub: 'Harbour-side pubs',
      restrooms: 'Waterfront and nearby public facilities',
      giftshop: 'Waterfront and town-centre shops',
      atm: 'Waterfront / town-centre cash machines'
    }
  };
  const rotterdamNearbyDetailsByKey = {
    'markthal rotterdam': {
      coffee: 'Markthal and Blaak cafés',
      pub: 'Oude Haven and central pubs',
      restrooms: 'Markthal and nearby station facilities',
      giftshop: 'Market and central souvenir/design shops',
      atm: 'Blaak / central cash machines'
    },
    'cube houses rotterdam': {
      coffee: 'Blaak and Old Harbour cafés',
      pub: 'Oude Haven bars and pubs',
      restrooms: 'Nearby Markthal and station facilities',
      giftshop: 'Cube House and nearby city shops',
      atm: 'Blaak area'
    },
    'erasmus bridge rotterdam': {
      coffee: 'Kop van Zuid and Leuvehaven cafés',
      pub: 'Riverside bars on both banks',
      restrooms: 'Nearby museums, cafés, and transit hubs',
      giftshop: 'Central/cultural district shops',
      atm: 'City-centre cash machines'
    },
    'maritime museum rotterdam': {
      coffee: 'Museum and Leuvehaven cafés',
      pub: 'Witte de With and riverside pubs',
      restrooms: 'Museum facilities',
      giftshop: 'Museum and nearby design shops',
      atm: 'Beurs / city centre'
    },
    'euromast rotterdam': {
      coffee: 'Euromast and Parkhaven cafés',
      pub: 'Parkhaven and central riverside pubs',
      restrooms: 'Euromast and park facilities',
      giftshop: 'Euromast shop and city-centre stores',
      atm: 'Parkhaven / city centre'
    },
    'delfshaven rotterdam': {
      coffee: 'Canal-side cafés in Delfshaven',
      pub: 'Historic-district pubs',
      restrooms: 'Nearby cafés and local facilities',
      giftshop: 'Local artisan and city shops',
      atm: 'Delfshaven / city-centre cash machines'
    },
    'depot boijmans van beuningen': {
      coffee: 'Museumpark cafés',
      pub: 'Museum district and central pubs',
      restrooms: 'Depot and nearby museum facilities',
      giftshop: 'Depot/museum shops',
      atm: 'Museumpark / Eendrachtsplein'
    }
  };
  const amsterdamNearbyDetailsByKey = {
    'dam square amsterdam': {
      coffee: 'Damrak and central cafés',
      pub: 'Dam/Nieuwendijk and old-centre pubs',
      restrooms: 'Department-store and station-area facilities',
      giftshop: 'Dam Square and Kalverstraat shops',
      atm: 'Dam / Central Station area'
    },
    'rijksmuseum amsterdam': {
      coffee: 'Museumplein and Spiegelkwartier cafés',
      pub: 'Leidseplein and museum-quarter pubs',
      restrooms: 'Museum facilities',
      giftshop: 'Museum and nearby design shops',
      atm: 'Museumplein / Leidseplein'
    },
    'anne frank house amsterdam': {
      coffee: 'Westermarkt and Jordaan cafés',
      pub: 'Jordaan canal-side pubs',
      restrooms: 'Attraction and nearby café facilities',
      giftshop: 'Museum and nearby souvenir shops',
      atm: 'Westermarkt / central canal district'
    },
    'canal belt amsterdam': {
      coffee: 'Canal-side cafés across central belt',
      pub: 'Canal district and Leidseplein pubs',
      restrooms: 'Cafés and public facilities near major squares',
      giftshop: 'Nine Streets and canal boutiques',
      atm: 'City-centre cash machines'
    },
    'jordaan amsterdam': {
      coffee: 'Jordaan neighborhood cafés',
      pub: 'Brown cafés in Jordaan',
      restrooms: 'Café and local venue facilities',
      giftshop: 'Jordaan artisan and boutique shops',
      atm: 'Jordaan / central cash machines'
    },
    'royal palace amsterdam': {
      coffee: 'Dam and Kalverstraat cafés',
      pub: 'Old-centre and Spui pubs',
      restrooms: 'Palace-area and nearby department facilities',
      giftshop: 'Dam and old-centre shops',
      atm: 'Dam area'
    },
    'bloemenmarkt amsterdam': {
      coffee: 'Muntplein and canal-side cafés',
      pub: 'Spui and Rembrandtplein pubs',
      restrooms: 'Nearby cafés and central facilities',
      giftshop: 'Flower market and central souvenir stalls',
      atm: 'Muntplein / Koningsplein'
    }
  };
  const haugesundNearbyDetailsByKey = {
    'haraldshaugen national monument': {
      coffee: 'Haraldshaugen route cafés and city-centre options',
      pub: 'Harbor and central Haugesund pubs',
      restrooms: 'Nearby park/city facilities',
      giftshop: 'City-centre souvenir shops',
      atm: 'Central Haugesund cash machines'
    },
    'akrasanden beach haugesund': {
      coffee: 'Akrehamn cafés (limited) or Haugesund centre',
      pub: 'Akrehamn/local options; stronger choice in Haugesund centre',
      restrooms: 'Beach/nearby facilities vary seasonally',
      giftshop: 'Limited near beach; better in city centre',
      atm: 'Akrehamn or Haugesund centre'
    },
    'djupadalen haugesund': {
      coffee: 'Nearby city and park-adjacent cafés',
      pub: 'City-centre pubs after park stop',
      restrooms: 'Park and city facilities',
      giftshop: 'City-centre shops',
      atm: 'Central Haugesund'
    },
    'haugesund waterfront': {
      coffee: 'Harbor-front cafés',
      pub: 'Waterfront and central pubs',
      restrooms: 'Waterfront and city facilities',
      giftshop: 'Harbor and high-street shops',
      atm: 'Harbor / city centre'
    },
    'haugesund city hall': {
      coffee: 'City Hall district and central cafés',
      pub: 'Central Haugesund pubs',
      restrooms: 'Nearby municipal and café facilities',
      giftshop: 'Town-centre shops',
      atm: 'Central Haugesund'
    },
    'steinsfjellet viewpoint haugesund': {
      coffee: 'Best handled in town before/after viewpoint',
      pub: 'Return to city centre for pub options',
      restrooms: 'Limited at viewpoint; use town facilities',
      giftshop: 'City-centre shops',
      atm: 'City centre before departure'
    }
  };
  const oddaNearbyDetailsByKey = {
    'trolltunga trail information odda': {
      coffee: 'Odda centre cafés before transfer to trail access',
      pub: 'Best handled back in Odda town after route block',
      restrooms: 'Trail access facilities vary; use town facilities first',
      giftshop: 'Town-centre shops before/after transfer',
      atm: 'Odda centre before departure'
    },
    'latefossen waterfall odda': {
      coffee: 'Odda centre cafés or route-stop options',
      pub: 'Return to Odda town for strongest pub selection',
      restrooms: 'Roadside facilities are limited; use town facilities first',
      giftshop: 'Town-centre shops',
      atm: 'Odda centre'
    },
    'odda town centre': {
      coffee: 'Central Odda cafés and bakeries',
      pub: 'Town-centre pubs and casual bars',
      restrooms: 'Town-centre public and café facilities',
      giftshop: 'Local souvenir and outdoor shops',
      atm: 'Odda town cash machines'
    },
    'buarbreen glacier area': {
      coffee: 'Best handled in Odda before/after glacier route',
      pub: 'Return to Odda centre for pub options',
      restrooms: 'Limited at trail area; use town facilities first',
      giftshop: 'Town-centre shops',
      atm: 'Odda centre before departure'
    },
    'sorfjorden waterfront odda': {
      coffee: 'Waterfront and town-centre cafés',
      pub: 'Nearby town-centre pubs',
      restrooms: 'Waterfront and central facilities',
      giftshop: 'Waterfront and town shops',
      atm: 'Town-centre cash machines'
    },
    'rossnos viewpoint odda': {
      coffee: 'Best handled in town before/after viewpoint',
      pub: 'Return to Odda centre for pub options',
      restrooms: 'Limited at viewpoint; plan in town',
      giftshop: 'Town-centre shops',
      atm: 'Odda centre before departure'
    }
  };
  const nordfjordeidNearbyDetailsByKey = {
    'sagastad viking center nordfjordeid': {
      coffee: 'Sagastad and central Nordfjordeid cafés',
      pub: 'Village-centre pubs and casual bars',
      restrooms: 'Museum and nearby central facilities',
      giftshop: 'Sagastad and town-centre gift options',
      atm: 'Nordfjordeid centre cash machines'
    },
    'myklebust ship nordfjordeid': {
      coffee: 'Nearby Sagastad and village cafés',
      pub: 'Town-centre pub options',
      restrooms: 'Museum/central visitor facilities',
      giftshop: 'Sagastad and nearby shops',
      atm: 'Nordfjordeid centre'
    },
    'eid church nordfjordeid': {
      coffee: 'Central cafés near church route',
      pub: 'Village-centre pub options',
      restrooms: 'Nearby town and café facilities',
      giftshop: 'Town-centre shops',
      atm: 'Central Nordfjordeid'
    },
    'nordfjord waterfront nordfjordeid': {
      coffee: 'Waterfront and town-core cafés',
      pub: 'Nearby village pubs',
      restrooms: 'Waterfront and central facilities',
      giftshop: 'Harbor and village shops',
      atm: 'Town-centre cash machines'
    },
    'nordfjordeid town centre walk': {
      coffee: 'Town-centre cafés and bakeries',
      pub: 'Nordfjordeid pubs and casual bars',
      restrooms: 'Central public and café facilities',
      giftshop: 'Village gift and local-product shops',
      atm: 'Central Nordfjordeid cash machines'
    },
    'harpefossen viewpoint nordfjordeid': {
      coffee: 'Best handled in town before/after viewpoint',
      pub: 'Return to village centre for pub options',
      restrooms: 'Limited at viewpoint; plan in town',
      giftshop: 'Town-centre shops',
      atm: 'Nordfjordeid centre before departure'
    }
  };
  const alesundNearbyDetailsByKey = {
    'mount aksla alesund': {
      coffee: 'Fjellstua and central-city cafes after descent',
      pub: 'Town-centre and canal-side pub options',
      restrooms: 'Use viewpoint/cafe facilities or town-centre options',
      giftshop: 'Town-centre and canal district shops',
      atm: 'Alesund sentrum cash machines'
    },
    'aksla viewpoint alesund': {
      coffee: 'Nearby Fjellstua or central cafes after descent',
      pub: 'Canal-side and centre pub options',
      restrooms: 'Use nearby cafe/viewpoint facilities where available',
      giftshop: 'Town-centre gift and design shops',
      atm: 'Central Alesund'
    },
    'fjellstua alesund': {
      coffee: 'On-site or nearby hillside cafe options',
      pub: 'Return to Brosundet/city centre for pub choices',
      restrooms: 'Fjellstua or town-centre facilities',
      giftshop: 'Town-centre gift and local-design shops',
      atm: 'Alesund centre before/after visit'
    },
    'brosundet canal alesund': {
      coffee: 'Canal-side and central waterfront cafes',
      pub: 'Brosundet and central harbor pubs',
      restrooms: 'Nearby cafes and central facilities',
      giftshop: 'Canal district and high-street gift shops',
      atm: 'Central harbor area ATMs'
    },
    'art nouveau centre alesund': {
      coffee: 'Museum-area and canal-side cafes',
      pub: 'Nearby town-centre pub options',
      restrooms: 'Museum and central public facilities',
      giftshop: 'Museum shop and nearby design stores',
      atm: 'Alesund sentrum'
    },
    'atlantic sea park alesund': {
      coffee: 'Sea park cafe and return-to-town options',
      pub: 'Best options back in Alesund town centre',
      restrooms: 'Attraction facilities available on-site',
      giftshop: 'On-site gift shop plus town-centre options',
      atm: 'Use town-centre ATM before coastal transfer'
    },
    'alesund town centre': {
      coffee: 'Central cafes and bakeries',
      pub: 'Brosundet and sentrum pub options',
      restrooms: 'Central public and cafe facilities',
      giftshop: 'Local souvenir and design shops',
      atm: 'Town-centre cash machines'
    }
  };
  const effectiveNearbyDetailsByKey = pageName === 'portree.html'
    ? portreeNearbyDetailsByKey
    : pageName === 'liverpool.html'
      ? liverpoolNearbyDetailsByKey
      : pageName === 'dublin.html'
        ? dublinNearbyDetailsByKey
        : pageName === 'dover.html'
          ? doverNearbyDetailsByKey
          : pageName === 'rotterdam.html'
            ? rotterdamNearbyDetailsByKey
            : pageName === 'amsterdam.html'
              ? amsterdamNearbyDetailsByKey
              : pageName === 'odda.html'
                ? oddaNearbyDetailsByKey
              : pageName === 'nordfjordeid.html'
                ? nordfjordeidNearbyDetailsByKey
              : pageName === 'alesund.html'
                ? alesundNearbyDetailsByKey
              : pageName === 'haugesund.html'
                ? haugesundNearbyDetailsByKey
                : nearbyDetailsByKey;

  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
  }

  function setLink(id, href) {
    const link = document.getElementById(id);
    if (link) {
      link.href = href || '#';
    }
  }

  function toClock(minutesFromMidnight) {
    const normalized = ((minutesFromMidnight % 1440) + 1440) % 1440;
    const hours24 = Math.floor(normalized / 60);
    const mins = normalized % 60;
    const suffix = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    return `${hours12}:${String(mins).padStart(2, '0')} ${suffix}`;
  }

  function getMinutesFromRangeText(value, fallbackMinutes) {
    if (!value || value === '--') {
      return fallbackMinutes;
    }

    const numbers = (value.match(/\d+/g) || []).map((item) => Number(item)).filter(Number.isFinite);
    if (!numbers.length) {
      return fallbackMinutes;
    }

    if (numbers.length === 1) {
      return numbers[0];
    }

    return Math.round((numbers[0] + numbers[1]) / 2);
  }

  function computeLeaveBy(travelMinutes) {
    if (!Number.isFinite(travelMinutes) || travelMinutes <= 0) {
      return '--';
    }

    return toClock(defaultArrivalMinutes - travelMinutes);
  }

  function findEstimatedTime(steps, fallback = '--') {
    if (!Array.isArray(steps)) {
      return fallback;
    }

    const joined = steps.join(' ');
    const match = joined.match(/Estimated travel time:\s*([^\.]+)\.?/i);
    return match ? match[1].trim() : fallback;
  }

  function findWalkToStopTime(steps) {
    if (!Array.isArray(steps) || !steps.length) {
      return '--';
    }

    const firstStep = steps[0] || '';
    const match = firstStep.match(/(\d+\s*(?:-|to)\s*\d+|\d+)\s*minutes?/i);
    return match ? `${match[1].replace(/\s+/g, ' ')} minutes` : '--';
  }

  function extractTubeLines(steps) {
    if (!Array.isArray(steps)) {
      return '--';
    }

    const lines = new Set();
    const linePattern = /(Bakerloo|Central|Circle|District|Hammersmith\s*&\s*City|Jubilee|Metropolitan|Northern|Piccadilly|Victoria|Waterloo\s*&\s*City|Elizabeth|DLR|Overground)\s*line?/ig;

    steps.forEach((step) => {
      let match = linePattern.exec(step);
      while (match) {
        const raw = match[1].replace(/\s+/g, ' ').trim();
        lines.add(raw === 'DLR' || raw === 'Overground' ? raw : `${raw} line`);
        match = linePattern.exec(step);
      }
      linePattern.lastIndex = 0;
    });

    return lines.size ? Array.from(lines).join(', ') : '--';
  }

  function extractBusRoutes(steps) {
    if (!Array.isArray(steps)) {
      return '--';
    }

    const routes = new Set();
    steps.forEach((step) => {
      if (!/route/i.test(step)) {
        return;
      }

      const found = step.match(/\b[0-9]{1,3}[A-Z]?\b/g) || [];
      found.forEach((route) => routes.add(route));
    });

    return routes.size ? Array.from(routes).join(', ') : '--';
  }

  function buildVoiceNavigateUrl(destination, travelmode, origin, transitMode) {
    const params = new URLSearchParams({
      api: '1',
      destination,
      travelmode,
      dir_action: 'navigate'
    });

    if (origin) {
      params.set('origin', origin);
    }

    if (transitMode) {
      params.set('transit_mode', transitMode);
    }

    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function updateGoodToKnow(template, key) {
    const list = document.getElementById('before-you-go-good-to-know-list');
    if (!list) {
      return;
    }

    const notes = [
      pageName === 'edinburgh.html' ? 'Festival and Old Town congestion can add time to every route.' : pageName === 'inverness.html' ? 'Road-transfer timing can vary with Highland traffic and weather.' : pageName === 'liverpool.html' ? 'Cruise-day waterfront crowds can reshape the easiest route through the city.' : pageName === 'dublin.html' ? 'Central Dublin traffic and crowd flow can slow the easiest route into the city core.' : pageName === 'dover.html' ? 'Port-area and cliff-route traffic can change quickly; keep a wider return buffer.' : pageName === 'rotterdam.html' ? 'Bridge crossings, tram interchanges, and market congestion can add time between stops.' : pageName === 'amsterdam.html' ? 'Canal-crossing foot traffic, trams, and bike lanes can add timing variability between stops.' : pageName === 'odda.html' ? 'Mountain-road transfers and weather can shift timing quickly between scenic stops.' : pageName === 'nordfjordeid.html' ? 'Village-service windows and scenic-route timing can shift with weather and local traffic.' : pageName === 'alesund.html' ? 'Alesund hill routes, stairs, and weather shifts can change timing between stops.' : pageName === 'haugesund.html' ? 'Coastal weather shifts and regional transfer distances can change timing quickly.' : 'Security screening may add wait time.',
      pageName === 'edinburgh.html' ? 'Wear comfortable shoes for cobbles and uphill sections.' : pageName === 'inverness.html' ? 'Carry a rain layer and wear comfortable shoes for riverside paths and uneven ground.' : pageName === 'liverpool.html' ? 'Waterfront walking is straightforward, but longer city blocks still add up quickly.' : pageName === 'dublin.html' ? 'Walking is manageable once central, but city blocks and river crossings add up faster than they look.' : pageName === 'dover.html' ? 'Castle and cliff areas can include steeper walking; wear sturdy shoes and carry a wind layer.' : pageName === 'rotterdam.html' ? 'Rotterdam is walkable but bike/tram traffic and river wind can affect pace and comfort.' : pageName === 'amsterdam.html' ? 'Amsterdam is highly walkable, but cobbles, bridge grades, and bike traffic can affect pace.' : pageName === 'odda.html' ? 'Bring a wind/rain layer and sturdy footwear for wet, uneven mountain and trail surfaces.' : pageName === 'nordfjordeid.html' ? 'Fjord weather can cool quickly; bring a wind/rain layer and comfortable walking shoes.' : pageName === 'alesund.html' ? 'Bring a wind/rain layer and stable footwear for stairs, slopes, and slick waterfront surfaces.' : pageName === 'haugesund.html' ? 'Bring a wind/rain layer; exposed waterfront and viewpoint stops can feel cooler than expected.' : 'Wear comfortable walking shoes.',
      template?.visitTime || 'Estimated visit length: --',
      'Check weather before departure.',
      pageName === 'edinburgh.html' ? 'Edinburgh routes can change quickly around events; confirm Google Maps before leaving.' : pageName === 'inverness.html' ? 'Highland routes can lengthen quickly; confirm Google Maps before leaving the ship.' : pageName === 'liverpool.html' ? 'Liverpool waterfront and city-centre traffic can change quickly; confirm Google Maps before leaving the ship.' : pageName === 'dublin.html' ? 'Dublin routes can change quickly around traffic and city-centre congestion; confirm Google Maps before leaving the ship.' : pageName === 'dover.html' ? 'Dover routes can change quickly with port and coastal traffic; confirm Google Maps before leaving the ship.' : pageName === 'rotterdam.html' ? 'Rotterdam transit and bridge routes can change quickly; confirm Google Maps before leaving the ship.' : pageName === 'amsterdam.html' ? 'Amsterdam tram/bike/canal routes can shift quickly; confirm Google Maps before leaving the ship.' : pageName === 'odda.html' ? 'Odda fjord-and-mountain routes can shift with weather and road conditions; confirm Google Maps before leaving the ship.' : pageName === 'nordfjordeid.html' ? 'Nordfjordeid fjord routes and service timings can shift quickly; confirm Google Maps before leaving the ship.' : pageName === 'alesund.html' ? 'Alesund hill-route timing and coastal weather can shift quickly; confirm Google Maps before leaving the ship.' : pageName === 'haugesund.html' ? 'Haugesund coastal and regional routes can shift with weather; confirm Google Maps before leaving the ship.' : 'London traffic can change quickly; check Google Maps before leaving.'
    ];

    const securityNotes = effectiveSecurityNotesByKey[key] || [];
    securityNotes.forEach((note) => notes.push(note));

    if (!securityNotes.length) {
      notes.push('Attraction-specific restrictions: check official venue policy before departure.');
      notes.push('Prohibited items, tripod/selfie-stick rules, and photography limits may vary by venue.');
    }

    list.innerHTML = notes.map((note) => `<li>${note}</li>`).join('');
  }

  function updateDontMiss(template) {
    const list = document.getElementById('before-you-go-dont-miss-list');
    if (!list) {
      return;
    }

    const highlights = (template?.summary || [])
      .slice(0, 3)
      .map((item) => item.replace(/^\s*[^:]+:\s*/,'').trim())
      .filter(Boolean);

    const fallback = [
      'Top highlight #1 for this attraction',
      'Top highlight #2 for this attraction',
      'Top highlight #3 for this attraction'
    ];

    const rows = (highlights.length ? highlights : fallback).slice(0, 3);
    list.innerHTML = rows.map((item) => `<li>${item}</li>`).join('');
  }

  function updateNearbyLinks(destinationQuery, key) {
    const meta = londonPersonalMetadata[key] || {};
    const food = meta.food || {};
    const details = effectiveNearbyDetailsByKey[key] || {};

    const nearbyConfig = [
      { id: 'coffee', query: food.coffee || `${destinationQuery} coffee`, detail: details.coffee || 'Nearest options near attraction' },
      { id: 'pub', query: food.pub || `${destinationQuery} pub`, detail: details.pub || 'Nearest pub area' },
      { id: 'restrooms', query: `${destinationQuery} public restroom`, detail: details.restrooms || (meta.restrooms ? String(meta.restrooms) : 'Check attraction facilities') },
      { id: 'giftshop', query: `${destinationQuery} gift shop`, detail: details.giftshop || 'Inside attraction or nearby' },
      { id: 'atm', query: `${destinationQuery} atm`, detail: details.atm || 'Nearest cash machine via Maps' }
    ];

    nearbyConfig.forEach((item) => {
      const directions = pageName === 'london.html'
        ? buildWalkingDirectionsUrl(destinationQuery, item.query)
        : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.query)}&travelmode=walking`;
      const voice = pageName === 'london.html'
        ? buildVoiceNavigateUrl(item.query, 'walking', destinationQuery)
        : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.query)}&travelmode=walking&dir_action=navigate`;
      setText(`byg-nearby-${item.id}-detail`, item.detail);
      setLink(`byg-nearby-${item.id}-directions`, directions);
      setLink(`byg-nearby-${item.id}-voice`, voice);
    });
  }

  let selectedKey = '';

  function selectDefaultAttractionKey() {
    const openCard = document.querySelector('details.london-attraction-accordion[open] .destination-card');
    const openKey = openCard?.dataset.attractionKey;
    if (openKey && templateMap[openKey]) {
      return openKey;
    }

    const firstKey = Object.keys(templateMap)[0] || '';
    return templateMap[firstKey] ? firstKey : '';
  }

  function updateBriefing(key) {
    const template = templateMap[key];
    if (!template) {
      return;
    }

    const destinationQuery = template.googleMapsQuery || template.title;
    const useLiveGpsDirections = pageName !== 'london.html';
    const liveWalkingDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=walking`;
    const liveTransitDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=transit`;
    const stopInfo = effectiveNearestStopsByKey[key] || { tube: '--', bus: '--' };
    const walkMinutes = effectiveWalkingMinutesByKey[key] || 25;
    const walkTime = walkMinutes > 180 ? 'Not practical' : `${walkMinutes} min`;
    const tubeTime = findEstimatedTime(template.tube?.steps);
    const busTime = findEstimatedTime(template.bus?.steps);
    const taxiTime = (template.taxi?.time || '--')
      .replace(/^Typical travel time:\s*/i, '')
      .replace(/\.$/, '')
      .trim();

    const tubeMinutes = getMinutesFromRangeText(tubeTime, 22);
    const busMinutes = getMinutesFromRangeText(busTime, 28);
    const taxiMinutes = getMinutesFromRangeText(taxiTime, 18);

    setText('before-you-go-attraction-name', template.title);
    setText('byg-walk-leave', walkMinutes > 180 ? '--' : computeLeaveBy(walkMinutes));
    setText('byg-walk-time', walkTime);
    setText('byg-tube-leave', computeLeaveBy(tubeMinutes));
    setText('byg-tube-time', tubeTime === '--' ? '--' : tubeTime);
    setText('byg-bus-leave', computeLeaveBy(busMinutes));
    setText('byg-bus-time', busTime === '--' ? '--' : busTime);
    setText('byg-taxi-leave', computeLeaveBy(taxiMinutes));
    setText('byg-taxi-time', taxiTime || '--');

    setText('byg-tube-station', stopInfo.tube || '--');
    setText('byg-tube-walk', findWalkToStopTime(template.tube?.steps));
    setText('byg-tube-lines', extractTubeLines(template.tube?.steps));

    setText('byg-bus-stop', stopInfo.bus || '--');
    setText('byg-bus-walk', findWalkToStopTime(template.bus?.steps));
    setText('byg-bus-routes', extractBusRoutes(template.bus?.steps));

    setLink('byg-walk-directions', useLiveGpsDirections ? liveWalkingDirections : buildWalkingDirectionsUrl(hotelName, destinationQuery));
    setLink('byg-walk-voice', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=walking&dir_action=navigate` : buildVoiceNavigateUrl(destinationQuery, 'walking', hotelName));

    setLink('byg-tube-directions', useLiveGpsDirections ? `${liveTransitDirections}&transit_mode=subway` : buildTransitDirectionsUrl(hotelName, destinationQuery, 'subway'));
    setLink('byg-tube-voice', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=transit&transit_mode=subway&dir_action=navigate` : buildVoiceNavigateUrl(destinationQuery, 'transit', hotelName, 'subway'));
    setLink('byg-tube-details-directions', useLiveGpsDirections ? `${liveTransitDirections}&transit_mode=subway` : buildTransitDirectionsUrl(hotelName, destinationQuery, 'subway'));
    setLink('byg-tube-details-voice', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=transit&transit_mode=subway&dir_action=navigate` : buildVoiceNavigateUrl(destinationQuery, 'transit', hotelName, 'subway'));

    setLink('byg-bus-directions', useLiveGpsDirections ? `${liveTransitDirections}&transit_mode=bus` : buildTransitDirectionsUrl(hotelName, destinationQuery, 'bus'));
    setLink('byg-bus-voice', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=transit&transit_mode=bus&dir_action=navigate` : buildVoiceNavigateUrl(destinationQuery, 'transit', hotelName, 'bus'));
    setLink('byg-bus-details-directions', useLiveGpsDirections ? `${liveTransitDirections}&transit_mode=bus` : buildTransitDirectionsUrl(hotelName, destinationQuery, 'bus'));
    setLink('byg-bus-details-voice', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=transit&transit_mode=bus&dir_action=navigate` : buildVoiceNavigateUrl(destinationQuery, 'transit', hotelName, 'bus'));

    setLink('byg-taxi-directions', `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}`);
    setLink('byg-taxi-voice', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=driving&dir_action=navigate` : buildVoiceNavigateUrl(destinationQuery, 'driving', hotelName));

    setLink('byg-start-voice-directions', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=transit&dir_action=navigate` : buildVoiceNavigateUrl(destinationQuery, 'transit', hotelName));
    setLink('byg-reroute', useLiveGpsDirections ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}&travelmode=transit` : buildVoiceNavigateUrl(destinationQuery, 'transit', hotelName));

    updateNearbyLinks(destinationQuery, key);
    updateDontMiss(template);
    updateGoodToKnow(template, key);
  }

  if (panel.dataset.beforeYouGoBound !== 'true') {
    document.querySelectorAll('details.london-attraction-accordion').forEach((details) => {
      details.addEventListener('toggle', () => {
        if (!details.open) {
          return;
        }

        const card = details.querySelector('.destination-card');
        const key = card?.dataset.attractionKey;
        if (key && templateMap[key]) {
          selectedKey = key;
          updateBriefing(selectedKey);
        }
      });
    });

    panel.dataset.beforeYouGoBound = 'true';
  }

  selectedKey = selectedKey || selectDefaultAttractionKey();
  if (selectedKey) {
    updateBriefing(selectedKey);
  }
}

function removeLegacyLondonAttractionSections() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'london.html') {
    return;
  }

  const removableHeadings = [
    'buckingham palace',
    'westminster / big ben',
    'westminster abbey',
    'churchill war rooms',
    'tower of london',
    'tower bridge',
    'st. paul\'s cathedral',
    'sky garden',
    'borough market',
    'windsor castle',
    'kensington palace',
    'attractions details'
  ];

  const legacyHeadings = Array.from(document.querySelectorAll('article.overview-card h4'))
    .filter((heading) => removableHeadings.includes(heading.textContent.trim().toLowerCase()));

  if (!legacyHeadings.length) {
    return;
  }

  legacyHeadings.forEach((legacyHeading) => {
    let node = legacyHeading.nextElementSibling;
    while (node && node.tagName !== 'H4') {
      const next = node.nextElementSibling;
      node.remove();
      node = next;
    }

    legacyHeading.remove();
  });
}

function refreshLondonPersonalButtonState() {
  const favorites = getLondonFavorites();
  const todayPlanKeys = new Set(getLondonTodayPlan().map((item) => item.key));
  const visitStatuses = getLondonVisitStatuses();

  document.querySelectorAll('button[data-add-to-today-plan]').forEach((button) => {
    const key = button.dataset.addToTodayPlan;
    const isPlanned = todayPlanKeys.has(key);
    button.textContent = isPlanned ? '✓ Remove from Today\'s Plan' : '➕ Add to Today\'s Plan';
  });

  document.querySelectorAll('button[data-favorite-attraction]').forEach((button) => {
    const key = button.dataset.favoriteAttraction;
    const isFavorite = favorites.has(key);
    button.textContent = isFavorite ? '❤️ Favorite' : '🤍 Favorite';
  });

  document.querySelectorAll('button[data-visit-status]').forEach((button) => {
    const key = button.dataset.visitStatus;
    const status = visitStatuses[key] === 'visited' ? 'visited' : 'planned';
    button.textContent = status === 'visited' ? '✓ Visited' : '□ Planned';
  });
}

function initializeLondonPersonalFeatures() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'london.html') {
    return;
  }

  const templateMap = getLondonTemplateMap();

  document.querySelectorAll('button[data-add-to-today-plan]').forEach((button) => {
    button.onclick = () => {
      const key = button.dataset.addToTodayPlan;
      if (!templateMap[key]) {
        return;
      }

      const plan = getLondonTodayPlan();
      const existingIndex = plan.findIndex((item) => item.key === key);
      if (existingIndex >= 0) {
        plan.splice(existingIndex, 1);
      } else {
        plan.push({ key, note: '' });
      }

      setLondonTodayPlan(plan);
      refreshLondonPersonalButtonState();
    };
  });

  document.querySelectorAll('button[data-favorite-attraction]').forEach((button) => {
    button.onclick = () => {
      const key = button.dataset.favoriteAttraction;
      const favorites = getLondonFavorites();
      if (favorites.has(key)) {
        favorites.delete(key);
      } else {
        favorites.add(key);
      }

      setLondonFavorites(favorites);
      refreshLondonPersonalButtonState();
    };
  });

  document.querySelectorAll('button[data-visit-status]').forEach((button) => {
    button.onclick = () => {
      const key = button.dataset.visitStatus;
      const visitStatuses = getLondonVisitStatuses();
      const current = visitStatuses[key] === 'visited' ? 'visited' : 'planned';
      visitStatuses[key] = current === 'visited' ? 'planned' : 'visited';
      setLondonVisitStatuses(visitStatuses);
      refreshLondonPersonalButtonState();
    };
  });

  const notes = getLondonNotes();
  document.querySelectorAll('textarea[data-my-notes-key]').forEach((textarea) => {
    const key = textarea.dataset.myNotesKey;
    textarea.value = notes[key] || '';
    textarea.addEventListener('input', () => {
      const updated = getLondonNotes();
      updated[key] = textarea.value;
      setLondonNotes(updated);
    });
  });

  refreshLondonPersonalButtonState();
}

function renderLondonTodayPlanPage() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'todays-plan.html') {
    return;
  }

  const templateMap = getLondonTemplateMap();
  const main = document.querySelector('main');
  if (!main) {
    return;
  }

  main.innerHTML = `
    <section class="page-intro">
      <h1>Today's Plan</h1>
      <p class="subtitle">Drag attractions to reorder your day. Travel time updates automatically based on order.</p>
    </section>
    <section class="card-grid" id="today-plan-list"></section>
  `;

  const list = document.getElementById('today-plan-list');
  const plan = getLondonTodayPlan();

  if (!plan.length) {
    list.innerHTML = '<article class="destination-card"><h3>No stops yet</h3><p>Add attractions from the London page using ➕ Add to Today\'s Plan.</p></article>';
    return;
  }

  plan.forEach((item, index) => {
    const template = templateMap[item.key];
    if (!template) {
      return;
    }

    const previous = index > 0 ? plan[index - 1].key : '';
    const card = document.createElement('article');
    card.className = 'destination-card plan-stop-card';
    card.draggable = true;
    card.dataset.planKey = item.key;
    card.innerHTML = `
      <h3>${template.title}</h3>
      <p><strong>${template.visitTime}</strong></p>
      <p><strong>${formatEstimatedTravel(previous, item.key)}</strong></p>
      <label style="display:block;margin-top:0.45rem;font-weight:700;">Notes</label>
      <textarea rows="3" style="width:100%;border-radius:12px;padding:0.75rem;background:rgba(0,0,0,0.2);color:var(--text);border:1px solid rgba(255,255,255,0.16);" data-plan-note="${item.key}" placeholder="Add stop notes...">${item.note || ''}</textarea>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.65rem;">
        <button type="button" class="button secondary" data-remove-plan-item="${item.key}">Remove</button>
        <span class="button secondary" style="cursor:grab;">Drag to Reorder</span>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('textarea[data-plan-note]').forEach((textarea) => {
    textarea.addEventListener('input', () => {
      const key = textarea.dataset.planNote;
      const updated = getLondonTodayPlan().map((item) => (
        item.key === key ? { ...item, note: textarea.value } : item
      ));
      setLondonTodayPlan(updated);
    });
  });

  list.querySelectorAll('button[data-remove-plan-item]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.removePlanItem;
      const updated = getLondonTodayPlan().filter((item) => item.key !== key);
      setLondonTodayPlan(updated);
      renderLondonTodayPlanPage();
    });
  });

  let draggedCard = null;

  list.querySelectorAll('.plan-stop-card').forEach((card) => {
    card.addEventListener('dragstart', () => {
      draggedCard = card;
      card.classList.add('dragging');
      card.style.opacity = '0.65';
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      card.style.opacity = '1';
      draggedCard = null;
      const newOrder = Array.from(list.querySelectorAll('.plan-stop-card')).map((node) => node.dataset.planKey);
      const currentPlan = getLondonTodayPlan();
      const reordered = newOrder.map((key) => currentPlan.find((item) => item.key === key)).filter(Boolean);
      setLondonTodayPlan(reordered);
      renderLondonTodayPlanPage();
    });
  });

  list.addEventListener('dragover', (event) => {
    event.preventDefault();
    const afterElement = Array.from(list.querySelectorAll('.plan-stop-card:not(.dragging)')).find((node) => {
      const rect = node.getBoundingClientRect();
      return event.clientY < rect.top + rect.height / 2;
    });

    if (!draggedCard) {
      return;
    }

    if (!afterElement) {
      list.appendChild(draggedCard);
    } else {
      list.insertBefore(draggedCard, afterElement);
    }
  });
}

function renderLondonFavoritesPage() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'my-favorites.html') {
    return;
  }

  const templateMap = getLondonTemplateMap();
  const main = document.querySelector('main');
  if (!main) {
    return;
  }

  const favorites = Array.from(getLondonFavorites()).filter((key) => templateMap[key]);
  main.innerHTML = `
    <section class="page-intro">
      <h1>My Favorites</h1>
      <p class="subtitle">Your saved London favorites. Remove any stop with one tap.</p>
    </section>
    <section class="card-grid" id="favorites-list"></section>
  `;

  const list = document.getElementById('favorites-list');

  if (!favorites.length) {
    list.innerHTML = '<article class="destination-card"><h3>No favorites yet</h3><p>Tap ❤️ Favorite on the London page to save attractions here.</p></article>';
    return;
  }

  favorites.forEach((key) => {
    const template = templateMap[key];
    const mapsHref = buildMapsSearchUrl(template.googleMapsQuery || template.title);
    const card = document.createElement('article');
    card.className = 'destination-card';
    card.innerHTML = `
      <h3>${template.title}</h3>
      <p><strong>${template.visitTime}</strong></p>
      <div style="display:flex;flex-wrap:wrap;gap:0.6rem;">
        <a class="button secondary" href="${mapsHref}" target="_blank" rel="noopener noreferrer">📍 Open in Google Maps</a>
        <button type="button" class="button secondary" data-remove-favorite="${key}">Remove Favorite</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('button[data-remove-favorite]').forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.removeFavorite;
      const favoritesSet = getLondonFavorites();
      favoritesSet.delete(key);
      setLondonFavorites(favoritesSet);
      renderLondonFavoritesPage();
    });
  });
}

function initializeLondonUtilityPages() {
  renderLondonTodayPlanPage();
  renderLondonFavoritesPage();
}

function initializeDestinationTravelSections() {
  const cards = document.querySelectorAll('.destination-card');
  if (!cards.length) {
    return;
  }

  const pageName = (window.location.pathname.split('/').pop() || '').toLowerCase();

  const pageDefaults = {
    'london.html': {
      walkTime: '20-25 minutes',
      walkDistance: '0.8 miles (1.3 km)',
      taxiTime: '6-10 minutes',
      taxiFare: '£10-£16',
      rideshare: 'Uber available',
      transitBest: 'Underground (Tube) or local bus',
      transitStop: 'Nearest Tube or bus stop for your current area',
      transitTime: '12-20 minutes',
      transitFare: '£1.75-£3.50',
      transitNotes: 'Tap in/out with contactless when required.',
      fromShipMethod: 'Taxi or cruise transfer from terminal',
      fromShipTime: '20-35 minutes',
      fromShipCost: '£25-£45',
      fromShipNotes: 'Allow extra time during central traffic peaks.'
    },
    'dover.html': {
      walkTime: '18-24 minutes',
      walkDistance: '0.9 miles (1.4 km)',
      taxiTime: '8-12 minutes',
      taxiFare: '£10-£16',
      rideshare: 'Uber availability can vary',
      transitBest: 'Taxi or local bus from cruise area',
      transitStop: 'Dover Priory / town bus interchange',
      transitTime: '15-25 minutes',
      transitFare: '£2-£5',
      transitNotes: 'Bus frequency varies by day and season.',
      fromShipMethod: 'Shore transfer or taxi from Dover terminal',
      fromShipTime: '10-20 minutes',
      fromShipCost: '£8-£18',
      fromShipNotes: 'Allow queue time at terminal exits.'
    },
    'rotterdam.html': {
      walkTime: '20-28 minutes',
      walkDistance: '1.0 miles (1.6 km)',
      taxiTime: '8-12 minutes',
      taxiFare: '€12-€20',
      rideshare: 'Uber available',
      transitBest: 'RET tram/metro',
      transitStop: 'Nearest RET stop to your attraction',
      transitTime: '12-22 minutes',
      transitFare: '€3-€5',
      transitNotes: 'Use contactless or RET day pass for simplicity.',
      fromShipMethod: 'Tram, water taxi, or regular taxi',
      fromShipTime: '15-30 minutes',
      fromShipCost: '€10-€25',
      fromShipNotes: 'Water taxi is fast for some waterfront stops.'
    },
    'edinburgh.html': {
      walkTime: '20-30 minutes',
      walkDistance: '0.9 miles (1.4 km)',
      taxiTime: '8-14 minutes',
      taxiFare: '£10-£18',
      rideshare: 'Uber available',
      transitBest: 'Lothian bus or tram+walk',
      transitStop: 'Nearest Royal Mile / city center stop',
      transitTime: '15-28 minutes',
      transitFare: '£2-£5',
      transitNotes: 'Crowds may affect evening service near events.',
      fromShipMethod: 'Taxi or shuttle from Leith cruise terminal',
      fromShipTime: '20-35 minutes',
      fromShipCost: '£15-£30',
      fromShipNotes: 'Build buffer time during festival/Tattoo hours.'
    },
    'inverness.html': {
      walkTime: '18-24 minutes',
      walkDistance: '0.8 miles (1.3 km)',
      taxiTime: '6-10 minutes',
      taxiFare: '£8-£14',
      rideshare: 'Local rideshare availability limited',
      transitBest: 'Taxi or local Stagecoach service',
      transitStop: 'Inverness city center / station stops',
      transitTime: '12-24 minutes',
      transitFare: '£2-£6',
      transitNotes: 'Service intervals vary outside peak times.',
      fromShipMethod: 'Cruise shuttle or private transfer from Invergordon',
      fromShipTime: '50-60 minutes',
      fromShipCost: '£45-£60 each way by taxi',
      fromShipNotes: 'Confirm return transfer timing before noon.'
    },
    'portree.html': {
      walkTime: '20-30 minutes',
      walkDistance: '1.0 miles (1.6 km)',
      taxiTime: '8-12 minutes',
      taxiFare: '£10-£18',
      rideshare: 'Uber availability limited',
      transitBest: 'Taxi or local bus where available',
      transitStop: 'Portree Square / harbor area',
      transitTime: '15-28 minutes',
      transitFare: '£2-£7',
      transitNotes: 'Schedules can be reduced in remote routes.',
      fromShipMethod: 'Tender + walk/taxi from landing point',
      fromShipTime: '10-25 minutes',
      fromShipCost: '£8-£20',
      fromShipNotes: 'Leave extra margin for tender return queues.'
    },
    'belfast.html': {
      walkTime: '20-28 minutes',
      walkDistance: '1.0 miles (1.6 km)',
      taxiTime: '8-12 minutes',
      taxiFare: '£10-£16',
      rideshare: 'Uber available',
      transitBest: 'Taxi or city bus',
      transitStop: 'City center and Titanic Quarter stops',
      transitTime: '12-22 minutes',
      transitFare: '£2-£5',
      transitNotes: 'Keep coins/card ready for quick boarding.',
      fromShipMethod: 'Shuttle or taxi from Belfast Harbour',
      fromShipTime: '10-20 minutes',
      fromShipCost: '£8-£18',
      fromShipNotes: 'Confirm shuttle return point before exploring.'
    },
    'glasgow.html': {
      walkTime: '20-30 minutes',
      walkDistance: '1.0 miles (1.6 km)',
      taxiTime: '8-14 minutes',
      taxiFare: '£10-£20',
      rideshare: 'Uber available',
      transitBest: 'Train + short walk or taxi',
      transitStop: 'Glasgow Central / key city stops',
      transitTime: '15-30 minutes',
      transitFare: '£3-£8',
      transitNotes: 'City center is very walkable once in town.',
      fromShipMethod: 'Coach, train, or taxi from Greenock',
      fromShipTime: '45-60 minutes',
      fromShipCost: '£15-£45',
      fromShipNotes: 'Plan return early to avoid peak inbound traffic.'
    },
    'liverpool.html': {
      walkTime: '18-25 minutes',
      walkDistance: '0.9 miles (1.4 km)',
      taxiTime: '6-10 minutes',
      taxiFare: '£8-£14',
      rideshare: 'Uber available',
      transitBest: 'Walk or city bus',
      transitStop: 'Waterfront and city center stops',
      transitTime: '10-20 minutes',
      transitFare: '£2-£5',
      transitNotes: 'Many highlights are clustered near the docks.',
      fromShipMethod: 'Walk, shuttle, or short taxi from cruise berth',
      fromShipTime: '5-20 minutes',
      fromShipCost: '£0-£14',
      fromShipNotes: 'Waterfront routes are straightforward and scenic.'
    },
    'dublin.html': {
      walkTime: '20-27 minutes',
      walkDistance: '0.9 miles (1.4 km)',
      taxiTime: '7-12 minutes',
      taxiFare: '€10-€18',
      rideshare: 'Uber availability limited; local taxi apps common',
      transitBest: 'Taxi or city bus/tram where available',
      transitStop: 'Central Dublin bus corridors',
      transitTime: '12-25 minutes',
      transitFare: '€2-€5',
      transitNotes: 'Traffic can slow downtown bus segments.',
      fromShipMethod: 'Taxi or cruise transfer from Dublin Port',
      fromShipTime: '15-25 minutes',
      fromShipCost: '€12-€25',
      fromShipNotes: 'Confirm return pickup point before walking route.'
    },
    'cork.html': {
      walkTime: '20-28 minutes',
      walkDistance: '1.0 miles (1.6 km)',
      taxiTime: '8-12 minutes',
      taxiFare: '€10-€18',
      rideshare: 'Uber availability limited',
      transitBest: 'Taxi or local bus/train depending stop',
      transitStop: 'Cork city center / Kent Station',
      transitTime: '15-28 minutes',
      transitFare: '€2-€6',
      transitNotes: 'Plan around train times if returning via Cobh.',
      fromShipMethod: 'Shuttle or taxi from cruise call area',
      fromShipTime: '10-30 minutes',
      fromShipCost: '€10-€25',
      fromShipNotes: 'Check whether your call is Cobh-based for timing.'
    },
    'amsterdam.html': {
      walkTime: '20-28 minutes',
      walkDistance: '1.0 miles (1.6 km)',
      taxiTime: '8-14 minutes',
      taxiFare: '€12-€22',
      rideshare: 'Uber available',
      transitBest: 'Tram or metro',
      transitStop: 'Nearest central tram stop for attraction',
      transitTime: '12-24 minutes',
      transitFare: '€3-€5',
      transitNotes: 'Watch for bikes at all crossings.',
      fromShipMethod: 'Taxi, tram, or cruise shuttle from terminal',
      fromShipTime: '15-30 minutes',
      fromShipCost: '€12-€30',
      fromShipNotes: 'Allow extra return time during peak periods.'
    },
    'haugesund.html': {
      walkTime: '18-24 minutes',
      walkDistance: '0.8 miles (1.3 km)',
      taxiTime: '6-10 minutes',
      taxiFare: 'NOK 120-NOK 220',
      rideshare: 'Uber availability limited',
      transitBest: 'Walk or taxi in town core',
      transitStop: 'Harbor and city center stops',
      transitTime: '10-18 minutes',
      transitFare: 'NOK 35-NOK 60',
      transitNotes: 'Town core is compact and easy to navigate.',
      fromShipMethod: 'Walk or short taxi from berth',
      fromShipTime: '5-15 minutes',
      fromShipCost: 'NOK 0-NOK 220',
      fromShipNotes: 'Longer fjord trips need pre-arranged transport.'
    },
    'odda.html': {
      walkTime: '20-28 minutes',
      walkDistance: '1.0 miles (1.6 km)',
      taxiTime: '8-12 minutes',
      taxiFare: 'NOK 130-NOK 260',
      rideshare: 'Uber availability limited',
      transitBest: 'Walk in town, taxi for outlying stops',
      transitStop: 'Odda town center stop',
      transitTime: '12-24 minutes',
      transitFare: 'NOK 40-NOK 80',
      transitNotes: 'Regional bus frequency can be limited.',
      fromShipMethod: 'Tender + walk/taxi from landing area',
      fromShipTime: '10-25 minutes',
      fromShipCost: 'NOK 0-NOK 260',
      fromShipNotes: 'Build return margin around tender schedules.'
    },
    'nordfjordeid.html': {
      walkTime: '18-24 minutes',
      walkDistance: '0.8 miles (1.3 km)',
      taxiTime: '6-10 minutes',
      taxiFare: 'NOK 120-NOK 240',
      rideshare: 'Uber availability limited',
      transitBest: 'Walk or taxi',
      transitStop: 'Nordfjordeid center / harbor area',
      transitTime: '10-20 minutes',
      transitFare: 'NOK 35-NOK 70',
      transitNotes: 'Town attractions are generally close together.',
      fromShipMethod: 'Walk or short taxi from port',
      fromShipTime: '5-15 minutes',
      fromShipCost: 'NOK 0-NOK 240',
      fromShipNotes: 'Loen-area routes require longer pre-arranged travel.'
    },
    'alesund.html': {
      walkTime: '18-24 minutes',
      walkDistance: '0.8 miles (1.3 km)',
      taxiTime: '6-10 minutes',
      taxiFare: 'NOK 120-NOK 240',
      rideshare: 'Uber availability limited',
      transitBest: 'Walk or taxi to viewpoint starts',
      transitStop: 'Alesund center / harbor stops',
      transitTime: '10-20 minutes',
      transitFare: 'NOK 35-NOK 70',
      transitNotes: 'Hills and stairs can add time to routes.',
      fromShipMethod: 'Walk from berth or short taxi',
      fromShipTime: '5-15 minutes',
      fromShipCost: 'NOK 0-NOK 240',
      fromShipNotes: 'Use taxi for uphill segments when preferred.'
    }
  };

  const defaultFallback = {
    walkTime: '20-25 minutes',
    walkDistance: '0.8 miles (1.3 km)',
    taxiTime: '6-8 minutes',
    taxiFare: 'See live estimate in app',
    rideshare: 'Uber or local rideshare may be available',
    transitBest: 'Best local public transportation option',
    transitStop: 'Nearest stop to this attraction',
    transitTime: '12-20 minutes',
    transitFare: 'See live fare in transit app',
    transitNotes: 'Check real-time departures before boarding.',
    fromShipMethod: 'Taxi or shuttle from cruise terminal',
    fromShipTime: '15-30 minutes',
    fromShipCost: 'See live estimate at the terminal',
    fromShipNotes: 'Leave buffer time for return to ship.'
  };

  const plannedVisits = {
    'edinburgh castle': [
      'Day One anchor stop before the Royal Mile and evening events.',
      'Prioritize entry early, then continue downhill through Old Town.'
    ],
    'meet gareth gerry marr walk the royal mile together': [
      'Meet Gareth & Gerry first, then walk the Royal Mile together as one shared experience.',
      'Keep timing flexible for conversation, photos, and spontaneous stops.'
    ],
    'royal edinburgh military tattoo': [
      'Day One evening highlight at Edinburgh Castle Esplanade.',
      'Arrive early for entry, seating, and pre-show atmosphere.'
    ],
    'dirleton castle day two': [
      'Day Two heritage visit tied to family history.',
      'Use a slower pace for grounds, photos, and personal reflection.'
    ],
    'optional royal yacht britannia if time permits': [
      'Optional Day Two add-on if schedule allows after Dirleton Castle.',
      'Use as a flexible maritime-history stop before return logistics.'
    ],
    'guinness storehouse': [
      'Scheduled visit: Guinness Experience at 8:00 AM.',
      'Keep timed entry first, then continue Dublin route.'
    ],
    'tower of london': [
      'Planned London priority stop for Crown Jewels and Yeoman Warder tour.',
      'Enter early and keep return timing aligned with the day plan.'
    ],
    'buckingham palace': [
      'Planned London tour stop: Buckingham Palace Tour.',
      'Scheduled tour time in project itinerary: 10:15 AM.'
    ],
    'royal edinburgh military tattoo plans': [
      'Day One evening highlight with timed arrival and security buffer.',
      'Coordinate transport before and after event crowds.'
    ]
  };

  const londonTravelInfoByKey = {
    'tower of london': { tube: 'Tower Hill', bus: 'Tower of London / Tower Hill' },
    'tower bridge': { tube: 'London Bridge or Tower Hill', bus: 'Tower Bridge Road / Tower Bridge' },
    'westminster / big ben': { tube: 'Westminster', bus: 'Parliament Square / Westminster' },
    'buckingham palace': { tube: 'Green Park', bus: 'Buckingham Palace Road / Victoria Memorial' },
    'sky garden': { tube: 'Monument', bus: 'Monument / Gracechurch Street' },
    'borough market': { tube: 'London Bridge', bus: 'Borough High Street / London Bridge' },
    'trafalgar square': { tube: 'Charing Cross', bus: 'Trafalgar Square / Charing Cross' },
    'westminster abbey': { tube: 'Westminster', bus: 'Parliament Square / Westminster Abbey' },
    'churchill war rooms': { tube: 'Westminster', bus: 'Whitehall / Parliament Square' },
    'st. paul\'s cathedral': { tube: 'St Paul\'s', bus: 'St Paul\'s Churchyard' },
    'kensington palace': { tube: 'High Street Kensington', bus: 'Kensington High Street' },
    'windsor castle': { tube: 'N/A (National Rail to Windsor & Eton)', bus: 'Windsor Theatre Royal (coach stop)' }
  };

  const postEmbarkationCruisePortPages = new Set([
    'rotterdam.html',
    'haugesund.html',
    'odda.html',
    'nordfjordeid.html',
    'alesund.html',
    'inverness.html',
    'portree.html',
    'belfast.html',
    'liverpool.html',
    'dublin.html',
    'cork.html',
    'amsterdam.html',
    'edinburgh.html',
    'glasgow.html'
  ]);

  function normalizeTitle(value) {
    return (value || '')
      .toLowerCase()
      .replace(/&amp;/g, 'and')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function getDestinationQuery(card) {
    const mapLink = card.querySelector('.london-action-bar a.button');
    const directionsLink = card.querySelector('.london-action-bar a.button.secondary');

    const mapHref = mapLink?.getAttribute('href') || '';
    const directionsHref = directionsLink?.getAttribute('href') || '';

    try {
      if (directionsHref.includes('?')) {
        const params = new URLSearchParams(directionsHref.split('?')[1]);
        const destination = params.get('destination');
        if (destination) {
          return destination;
        }
      }
    } catch (error) {
      console.warn('Unable to parse directions destination:', error);
    }

    try {
      if (mapHref.includes('?')) {
        const params = new URLSearchParams(mapHref.split('?')[1]);
        const query = params.get('query');
        if (query) {
          return query;
        }
      }
    } catch (error) {
      console.warn('Unable to parse map query:', error);
    }

    return card.querySelector('h3')?.textContent?.trim() || '';
  }

  function createDetails(summaryText, id, className, innerHtml, isOpen = false) {
    const details = document.createElement('details');
    details.id = id;
    details.className = className;
    if (isOpen) {
      details.open = true;
    }

    const summary = document.createElement('summary');
    summary.className = 'london-section-summary';
    summary.textContent = summaryText;

    const body = document.createElement('div');
    body.className = 'london-section-body';
    body.innerHTML = innerHtml;

    details.appendChild(summary);
    details.appendChild(body);
    bindLondonAccordionIndicator(details);

    return details;
  }

  cards.forEach((card, index) => {
    if (card.dataset.gettingThereEnhanced === 'true') {
      return;
    }

    const title = card.querySelector('h3')?.textContent?.trim() || card.dataset.attractionTitle || `Attraction ${index + 1}`;
    const normalizedTitle = normalizeTitle(title);
    const attractionKey = (card.dataset.attractionKey || '').trim().toLowerCase();
    const fallback = pageDefaults[pageName] || defaultFallback;
    const planned = plannedVisits[attractionKey] || plannedVisits[normalizedTitle] || [
      'Follow your current day plan timing for this stop.',
      'Keep return-to-ship margin aligned with the schedule.'
    ];
    const shouldAddPlannedVisit = !['edinburgh.html', 'inverness.html', 'portree.html', 'liverpool.html', 'dublin.html', 'dover.html', 'rotterdam.html', 'amsterdam.html', 'haugesund.html', 'odda.html', 'nordfjordeid.html', 'alesund.html'].includes(pageName);

    const londonTravelStops = londonTravelInfoByKey[attractionKey] || null;
    const nearestTube = londonTravelStops?.tube || 'Check nearest station in Google Maps';
    const nearestBus = londonTravelStops?.bus || fallback.transitStop;
    const destinationQuery = getDestinationQuery(card);
    const londonBigBusHref = buildMapsSearchUrl(`${destinationQuery} Big Bus stop London`);
    const taxiTipGuidance = pageName === 'london.html'
      ? 'UK guidance: round up to the nearest pound for short rides; about 10% is typical for excellent service.'
      : 'Tip guidance varies by destination.';
    const includeShipOriginSection = postEmbarkationCruisePortPages.has(pageName);
    const bigBusSectionHtml = pageName === 'london.html'
      ? `
        <p><strong>🚍 Big Bus Hop-On Hop-Off</strong></p>
        <p><strong>Nearest Big Bus area:</strong> ${nearestBus}</p>
        <p>Use Big Bus for easy landmark-to-landmark transfers with less Tube switching.</p>
        <p><a class="button secondary" href="${londonBigBusHref}" target="_blank" rel="noopener noreferrer">Find Nearest Big Bus Stop</a></p>
      `
      : '';
    const shipOriginSectionHtml = includeShipOriginSection
      ? `
        <p><strong>🚢 From Nieuw Statendam</strong></p>
        <p><strong>Best method:</strong> ${fallback.fromShipMethod}</p>
        <p><strong>Estimated travel time:</strong> ${fallback.fromShipTime}</p>
        <p><strong>Estimated cost:</strong> ${fallback.fromShipCost}</p>
        <p>${fallback.fromShipNotes}</p>
      `
      : '';

    const actionBar = card.querySelector('.london-action-bar');
    const photoButton = actionBar?.querySelector('button[data-london-toggle-target$="-gallery"]');
    const directionsLink = actionBar?.querySelector('a.button.secondary');
    const navigateHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationQuery)}`;

    const safeSlug = `${normalizedTitle || `attraction-${index + 1}`}`.replace(/\s+/g, '-');
    const gettingThereId = `${safeSlug}-getting-there-${index + 1}`;
    const plannedVisitId = `${safeSlug}-our-planned-visit-${index + 1}`;

    if (actionBar && photoButton && !actionBar.querySelector(`button[data-london-toggle-target="${gettingThereId}"]`)) {
      const gettingButton = document.createElement('button');
      gettingButton.type = 'button';
      gettingButton.className = 'button secondary';
      gettingButton.setAttribute('data-london-toggle-target', gettingThereId);
      gettingButton.textContent = '🧭 Travel Information';

      actionBar.insertBefore(gettingButton, photoButton);
    }

    const galleryDetails = card.querySelector('details.london-section-gallery');
    if (!galleryDetails) {
      return;
    }

    if (!card.querySelector(`#${gettingThereId}`)) {
      const gettingThereHtml = pageName === 'london.html'
        ? `
        <p><strong>📍 Navigate From Here</strong></p>
        <p><a class="button" href="${navigateHref}" target="_blank" rel="noopener noreferrer">Navigate From Here</a></p>

        <p><strong>📍 Getting There</strong></p>
        <ul>
          <li>Tap "Navigate From Here" for personalized walking, driving, transit, or rideshare directions from your current location.</li>
          <li><strong>Nearest Tube / Metro Station:</strong> ${nearestTube}</li>
          <li><strong>Nearest Bus Stop:</strong> ${nearestBus}</li>
          <li><strong>Typical Taxi Information:</strong> ${fallback.taxiFare}. Actual cost depends on traffic and your starting point.</li>
          <li><strong>Local Transportation Tip:</strong> ${fallback.transitNotes}</li>
          <li><strong>Hop-On Hop-Off:</strong> Nearest Big Bus area: ${nearestBus}. Use the stop finder below when this attraction fits your route.</li>
        </ul>

        <p><strong>🚕 Taxi / Rideshare</strong></p>
        <p>Use "Navigate From Here" for live travel time and route options based on your current location.</p>
        <p>${fallback.rideshare}</p>

        <p><strong>🚌 Public Transportation</strong></p>
        <p><strong>Best option:</strong> ${fallback.transitBest}</p>
        <p><strong>Nearest stop:</strong> ${fallback.transitStop}</p>
        <p><strong>Estimated fare:</strong> ${fallback.transitFare}</p>
        <p><strong>Boarding notes:</strong> ${fallback.transitNotes}</p>

        ${bigBusSectionHtml}
      `
        : `
        <p><strong>📍 Navigate From Here</strong></p>
        <p><a class="button" href="${navigateHref}" target="_blank" rel="noopener noreferrer">Navigate From Here</a></p>

        <p><strong>Travel Information Summary</strong></p>
        <ul>
          <li><strong>Approximate walking time:</strong> ${fallback.walkTime}</li>
          <li><strong>Transit time:</strong> ${fallback.transitTime}</li>
          <li><strong>Nearest Tube station:</strong> ${nearestTube}</li>
          <li><strong>Nearest bus stop:</strong> ${nearestBus}</li>
          <li><strong>Estimated taxi fare:</strong> ${fallback.taxiFare}</li>
          <li><strong>UK taxi tip guidance:</strong> ${taxiTipGuidance}</li>
        </ul>

        <p><strong>🚶 Comfortable Walk</strong></p>
        <p>${fallback.walkTime}</p>
        <p>${fallback.walkDistance}</p>

        <p><strong>🚕 Taxi</strong></p>
        <p>${fallback.taxiTime}</p>
        <p>${fallback.taxiFare}</p>
        <p>${fallback.rideshare}</p>

        <p><strong>🚌 Public Transportation</strong></p>
        <p><strong>Best option:</strong> ${fallback.transitBest}</p>
        <p><strong>Nearest stop:</strong> ${fallback.transitStop}</p>
        <p><strong>Estimated travel time:</strong> ${fallback.transitTime}</p>
        <p><strong>Estimated fare:</strong> ${fallback.transitFare}</p>
        <p><strong>Boarding notes:</strong> ${fallback.transitNotes}</p>

        ${bigBusSectionHtml}
        ${shipOriginSectionHtml}
      `;

      const gettingThereDetails = createDetails(
        '🧭 Travel Information',
        gettingThereId,
        'london-section london-section-transit',
        gettingThereHtml
      );
      card.insertBefore(gettingThereDetails, galleryDetails);
    }

    if (shouldAddPlannedVisit && !card.querySelector(`#${plannedVisitId}`)) {
      const plannedHtml = `
        <p>${planned[0]}</p>
        <p>${planned[1]}</p>
      `;

      const plannedDetails = createDetails(
        '📝 Our Planned Visit',
        plannedVisitId,
        'london-section london-section-plan',
        plannedHtml
      );
      card.insertBefore(plannedDetails, galleryDetails);
    }

    if (directionsLink && !directionsLink.getAttribute('target')) {
      directionsLink.setAttribute('target', '_blank');
      directionsLink.setAttribute('rel', 'noopener noreferrer');
    }

    card.dataset.gettingThereEnhanced = 'true';
  });
}

function initializeLondonAccordionButtons() {
  const buttons = document.querySelectorAll('button[data-london-toggle-target]');
  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.onclick = () => {
      const targetId = button.dataset.londonToggleTarget;
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) {
        return;
      }

      const isGalleryTarget = target.classList.contains('london-section-gallery') || targetId.endsWith('-gallery');
      if (isGalleryTarget) {
        const galleryToggle = document.querySelector('.gallery-toggle');
        const galleryContent = document.querySelector('.gallery-content');
        const isCollapsed = galleryToggle?.getAttribute('aria-expanded') !== 'true';

        if (isCollapsed && galleryToggle) {
          galleryToggle.click();
        }

        galleryContent?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      target.open = !target.open;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  });
}

function initializeLondonPhotoGalleryButtons() {
  const buttons = document.querySelectorAll('button[data-open-global-photo-gallery="true"]');
  if (!buttons.length) {
    return;
  }

  buttons.forEach((button) => {
    button.onclick = (event) => {
      event.preventDefault();
      const galleryToggle = document.querySelector('.gallery-toggle');
      const galleryContent = document.querySelector('.gallery-content');
      const isCollapsed = galleryToggle?.getAttribute('aria-expanded') !== 'true';

      if (isCollapsed && galleryToggle) {
        galleryToggle.click();
      }

      galleryContent?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  });
}

function formatCoordinateValue(latitude, longitude, fallbackName) {
  const hasLat = Number.isFinite(latitude);
  const hasLng = Number.isFinite(longitude);
  if (hasLat && hasLng) {
    return `${latitude},${longitude}`;
  }

  return fallbackName || '';
}

function mergeTransportationRecord(defaults, record, fallbackName) {
  if (!record) {
    return null;
  }

  return {
    attractionName: record.attractionName || fallbackName || '',
    latitude: Number.isFinite(record.latitude) ? record.latitude : null,
    longitude: Number.isFinite(record.longitude) ? record.longitude : null,
    hotelName: record.hotelName || defaults.hotelName || '',
    hotelLatitude: Number.isFinite(record.hotelLatitude) ? record.hotelLatitude : (Number.isFinite(defaults.hotelLatitude) ? defaults.hotelLatitude : null),
    hotelLongitude: Number.isFinite(record.hotelLongitude) ? record.hotelLongitude : (Number.isFinite(defaults.hotelLongitude) ? defaults.hotelLongitude : null),
    shipShuttleDropoff: record.shipShuttleDropoff || defaults.shipShuttleDropoff || null,
    shuttleLatitude: Number.isFinite(record.shuttleLatitude) ? record.shuttleLatitude : (Number.isFinite(defaults.shuttleLatitude) ? defaults.shuttleLatitude : null),
    shuttleLongitude: Number.isFinite(record.shuttleLongitude) ? record.shuttleLongitude : (Number.isFinite(defaults.shuttleLongitude) ? defaults.shuttleLongitude : null),
    verifiedBigBusStop: record.verifiedBigBusStop || null,
    busStopLatitude: Number.isFinite(record.busStopLatitude) ? record.busStopLatitude : null,
    busStopLongitude: Number.isFinite(record.busStopLongitude) ? record.busStopLongitude : null,
    taxiDestinationName: record.taxiDestinationName || null,
    taxiLatitude: Number.isFinite(record.taxiLatitude) ? record.taxiLatitude : null,
    taxiLongitude: Number.isFinite(record.taxiLongitude) ? record.taxiLongitude : null,
    googleMapsPlaceId: record.googleMapsPlaceId || null,
    walkingDestination: record.walkingDestination || null,
    hotelAddress: defaults.hotelAddress || ''
  };
}

function resolveAttractionKeyForElement(element) {
  const explicitKey = element.dataset.attractionKey?.trim().toLowerCase();
  if (explicitKey) {
    return explicitKey;
  }

  const destinationCard = element.closest('.destination-card');
  if (destinationCard) {
    const cardHeading = destinationCard.querySelector('h3');
    return cardHeading?.textContent?.trim().toLowerCase() || '';
  }

  const container = element.closest('.destination-card, article');
  if (!container) {
    return '';
  }

  const headingCandidates = Array.from(container.querySelectorAll('h3, h4'));
  let closestHeading = null;

  headingCandidates.forEach((heading) => {
    const position = heading.compareDocumentPosition(element);
    const isBefore = Boolean(position & Node.DOCUMENT_POSITION_FOLLOWING);
    const normalized = heading.textContent.trim().toLowerCase();
    const isContextSubheading = normalized.startsWith("while you're here");
    if (isBefore && !isContextSubheading) {
      closestHeading = heading;
    }
  });

  return closestHeading?.textContent?.trim().toLowerCase() || '';
}

function ensureExternalLinkBehavior(link) {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
}

function ensureWalkFromHotelButton(actionRow, transportRecord, destination) {
  if (!actionRow) {
    return;
  }

  let walkFromHotelButton = actionRow.querySelector('a[data-walk-from-hotel="true"]');
  if (!walkFromHotelButton) {
    walkFromHotelButton = document.createElement('a');
    walkFromHotelButton.className = 'button secondary';
    walkFromHotelButton.dataset.walkFromHotel = 'true';
    walkFromHotelButton.textContent = '🚶 Walking Directions';

    const openMapsButton = actionRow.querySelector('a.button');
    if (openMapsButton?.nextSibling) {
      actionRow.insertBefore(walkFromHotelButton, openMapsButton.nextSibling);
    } else {
      actionRow.appendChild(walkFromHotelButton);
    }
  }

  const hotelOrigin = formatCoordinateValue(
    transportRecord?.hotelLatitude,
    transportRecord?.hotelLongitude,
    transportRecord?.hotelAddress || transportRecord?.hotelName
  );

  if (!hotelOrigin || !destination) {
    walkFromHotelButton.removeAttribute('href');
    walkFromHotelButton.removeAttribute('target');
    walkFromHotelButton.removeAttribute('rel');
    walkFromHotelButton.setAttribute('aria-disabled', 'true');
    walkFromHotelButton.tabIndex = -1;
    walkFromHotelButton.textContent = INFORMATION_COMING_SOON;
    walkFromHotelButton.onclick = (event) => {
      event.preventDefault();
    };
    return;
  }

  walkFromHotelButton.href = buildWalkingDirectionsUrl(hotelOrigin, destination);
  walkFromHotelButton.removeAttribute('aria-disabled');
  walkFromHotelButton.removeAttribute('tabindex');
  walkFromHotelButton.textContent = '🚶 Walking Directions';
  walkFromHotelButton.onclick = null;
  ensureExternalLinkBehavior(walkFromHotelButton);
}

function configureOpenInGoogleMapsButton(button, transportRecord) {
  if (!button) {
    return;
  }

  const destination = formatCoordinateValue(
    transportRecord?.latitude,
    transportRecord?.longitude,
    transportRecord?.walkingDestination || transportRecord?.attractionName
  );

  const mapsUrl = buildMapsSearchUrl(destination, transportRecord?.googleMapsPlaceId);
  if (!mapsUrl) {
    button.removeAttribute('href');
    button.removeAttribute('target');
    button.removeAttribute('rel');
    button.setAttribute('aria-disabled', 'true');
    button.tabIndex = -1;
    button.textContent = INFORMATION_COMING_SOON;
    button.onclick = (event) => {
      event.preventDefault();
    };
    return;
  }

  button.href = mapsUrl;
  button.textContent = 'Open in Google Maps';
  button.removeAttribute('aria-disabled');
  button.removeAttribute('tabindex');
  button.onclick = null;
  ensureExternalLinkBehavior(button);
}

function configureWalkToBigBusButton(button, transportRecord) {
  if (!button) {
    return;
  }

  const attractionDestination = formatCoordinateValue(
    transportRecord?.latitude,
    transportRecord?.longitude,
    transportRecord?.walkingDestination || transportRecord?.attractionName
  );

  const busStopDestination = formatCoordinateValue(
    transportRecord?.busStopLatitude,
    transportRecord?.busStopLongitude,
    transportRecord?.verifiedBigBusStop
  );

  const hasVerifiedStop = Boolean(
    transportRecord?.verifiedBigBusStop
    && busStopDestination
    && attractionDestination
  );

  if (hasVerifiedStop) {
    button.href = buildWalkingDirectionsUrl(attractionDestination, busStopDestination);
    button.textContent = '🚍 Walk to Big Bus Stop';
    button.removeAttribute('aria-disabled');
    button.removeAttribute('tabindex');
    button.onclick = null;
    ensureExternalLinkBehavior(button);
    return;
  }

  button.removeAttribute('href');
  button.removeAttribute('target');
  button.removeAttribute('rel');
  button.setAttribute('aria-disabled', 'true');
  button.tabIndex = -1;
  button.textContent = INFORMATION_COMING_SOON;
  button.onclick = (event) => {
    event.preventDefault();
  };
}

function initializeLondonBigBusWalkButtons() {
  const pageName = window.location.pathname.split('/').pop().toLowerCase();
  if (pageName !== 'london.html') {
    return;
  }

  document.querySelectorAll('a[data-walk-big-bus="true"]').forEach((button) => button.remove());
}
