import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut
} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js';
import {
  getFirestore,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc
} from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAbtUny0qW-ZHYdLVK9bABYnT9WpacQvPQ',
  authDomain: 'personal-travel-companion.firebaseapp.com',
  projectId: 'personal-travel-companion',
  storageBucket: 'personal-travel-companion.firebasestorage.app',
  messagingSenderId: '253278096133',
  appId: '1:253278096133:web:6135f39f39250530ffc56c'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const pageName = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
const fieldRegistry = new Map();
let activeUser = null;
let pageDocRef = null;
let unsubscribeSnapshot = null;
let observer = null;

function normalizeKeyPart(value, fallback = 'field') {
  const normalized = String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || fallback;
}

function getSiblingHeadingText(textarea) {
  let node = textarea.previousElementSibling;
  while (node) {
    if (/^H[1-6]$/.test(node.tagName)) {
      return node.textContent || '';
    }

    node = node.previousElementSibling;
  }

  return '';
}

function getContextText(textarea) {
  const parts = [];
  const placeholder = textarea.getAttribute('placeholder');
  if (placeholder) {
    parts.push(placeholder);
  }

  const heading = getSiblingHeadingText(textarea);
  if (heading) {
    parts.push(heading);
  }

  const details = textarea.closest('details');
  const summary = details?.querySelector(':scope > summary');
  if (summary?.textContent) {
    parts.push(summary.textContent);
  }

  const journalSection = textarea.closest('.travel-journal');
  if (journalSection?.textContent) {
    parts.push(journalSection.textContent.slice(0, 240));
  }

  return parts.join(' ').toLowerCase();
}

function classifyTextarea(textarea) {
  const context = getContextText(textarea);
  if (context.includes('facebook')) {
    return 'facebook';
  }

  if (context.includes('book')) {
    return 'book';
  }

  if (context.includes('journal') || context.includes('story')) {
    return 'journal';
  }

  return 'other';
}

function shouldSyncTextarea(textarea) {
  if (!(textarea instanceof HTMLTextAreaElement)) {
    return false;
  }

  if (textarea.dataset.cloudSyncIgnore === 'true') {
    return false;
  }

  if (textarea.closest('.photo-card')) {
    return false;
  }

  if (textarea.hasAttribute('data-my-notes-key') || textarea.hasAttribute('data-plan-note')) {
    return true;
  }

  const context = getContextText(textarea);
  return /facebook|book|journal|story|travel note|trip notes|personal notes/.test(context);
}

function buildFieldId(textarea, category) {
  if (textarea.dataset.cloudFieldId) {
    return textarea.dataset.cloudFieldId;
  }

  let base = '';
  if (textarea.dataset.myNotesKey) {
    base = `my-notes-${textarea.dataset.myNotesKey}`;
  } else if (textarea.dataset.planNote) {
    base = `today-plan-${textarea.dataset.planNote}`;
  } else if (textarea.id) {
    base = `id-${textarea.id}`;
  } else if (textarea.name) {
    base = `name-${textarea.name}`;
  } else if (textarea.placeholder) {
    base = `placeholder-${textarea.placeholder}`;
  } else {
    base = 'untitled-textarea';
  }

  const all = Array.from(document.querySelectorAll('textarea')).filter((node) => shouldSyncTextarea(node));
  const ordinal = all.indexOf(textarea) + 1;
  const fieldId = `${normalizeKeyPart(category)}-${normalizeKeyPart(base)}-${ordinal}`;
  textarea.dataset.cloudFieldId = fieldId;
  return fieldId;
}

function setFieldStatus(meta, message, state = '') {
  if (!meta?.statusEl) {
    return;
  }

  meta.statusEl.textContent = message;
  meta.statusEl.dataset.state = state;
}

async function writeFieldValue(meta) {
  if (!activeUser || !pageDocRef || !meta) {
    return;
  }

  const value = meta.textarea.value || '';
  const payload = {
    updatedAt: serverTimestamp(),
    [meta.category]: {
      [meta.fieldId]: value
    }
  };

  try {
    setFieldStatus(meta, 'Saving...', 'saving');
    await setDoc(pageDocRef, payload, { merge: true });
    meta.lastSavedValue = value;
    setFieldStatus(meta, 'Saved \u2713', 'saved');
  } catch (error) {
    console.warn('Cloud save failed:', error);
    setFieldStatus(meta, 'Save failed', 'error');
  }
}

function scheduleAutoSave(meta) {
  if (!meta) {
    return;
  }

  if (meta.debounceTimer) {
    window.clearTimeout(meta.debounceTimer);
  }

  meta.debounceTimer = window.setTimeout(() => {
    writeFieldValue(meta);
  }, 700);
}

function insertFieldControls(textarea, meta) {
  if (textarea.nextElementSibling?.classList.contains('cloud-sync-controls')) {
    const statusEl = textarea.nextElementSibling.querySelector('.cloud-sync-status');
    const buttonEl = textarea.nextElementSibling.querySelector('.cloud-save-button');
    return { statusEl, buttonEl };
  }

  const controls = document.createElement('div');
  controls.className = 'cloud-sync-controls';

  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.className = 'button secondary cloud-save-button';
  saveButton.textContent = 'SAVE';

  const status = document.createElement('span');
  status.className = 'cloud-sync-status';
  status.textContent = 'Not saved';
  status.dataset.state = 'idle';

  controls.appendChild(saveButton);
  controls.appendChild(status);
  textarea.insertAdjacentElement('afterend', controls);

  saveButton.addEventListener('click', async () => {
    if (!activeUser) {
      setFieldStatus(meta, 'Sign in to save', 'error');
      return;
    }

    await writeFieldValue(meta);
  });

  return { statusEl: status, buttonEl: saveButton };
}

function bindTextarea(textarea) {
  if (!shouldSyncTextarea(textarea)) {
    return;
  }

  if (textarea.dataset.cloudSyncBound === 'true') {
    return;
  }

  const category = classifyTextarea(textarea);
  const fieldId = buildFieldId(textarea, category);
  const meta = {
    textarea,
    category,
    fieldId,
    statusEl: null,
    buttonEl: null,
    debounceTimer: null,
    isApplyingRemote: false,
    lastSavedValue: ''
  };

  const controls = insertFieldControls(textarea, meta);
  meta.statusEl = controls.statusEl;
  meta.buttonEl = controls.buttonEl;

  textarea.addEventListener('input', () => {
    if (meta.isApplyingRemote) {
      return;
    }

    if (!activeUser) {
      setFieldStatus(meta, 'Sign in to sync', 'idle');
      return;
    }

    setFieldStatus(meta, 'Saving...', 'saving');
    scheduleAutoSave(meta);
  });

  fieldRegistry.set(fieldId, meta);
  textarea.dataset.cloudSyncBound = 'true';
}

function bindAllTextareas() {
  const textareas = Array.from(document.querySelectorAll('textarea'));
  textareas.forEach((textarea) => bindTextarea(textarea));
}

function applyRemoteState(data) {
  fieldRegistry.forEach((meta) => {
    const categoryData = data && typeof data[meta.category] === 'object' ? data[meta.category] : null;
    if (!categoryData || !(meta.fieldId in categoryData)) {
      return;
    }

    const remoteValue = categoryData[meta.fieldId] || '';
    meta.lastSavedValue = remoteValue;

    // Avoid interrupting the writer while a field has focus.
    if (document.activeElement === meta.textarea) {
      return;
    }

    if (meta.textarea.value !== remoteValue) {
      meta.isApplyingRemote = true;
      meta.textarea.value = remoteValue;
      meta.isApplyingRemote = false;
    }

    setFieldStatus(meta, 'Saved \u2713', 'saved');
  });
}

function setGlobalSyncStatus(message, state = 'idle') {
  const status = document.getElementById('cloud-sync-global-status');
  if (!status) {
    return;
  }

  status.textContent = message;
  status.dataset.state = state;
}

function updateAuthUi(user) {
  const signedIn = Boolean(user);
  const signInButton = document.getElementById('cloud-sync-sign-in');
  const signOutButton = document.getElementById('cloud-sync-sign-out');
  const userLabel = document.getElementById('cloud-sync-user');

  if (signInButton) {
    signInButton.style.display = signedIn ? 'none' : 'inline-flex';
  }

  if (signOutButton) {
    signOutButton.style.display = signedIn ? 'inline-flex' : 'none';
  }

  if (userLabel) {
    userLabel.textContent = signedIn ? `Signed in: ${user.email || user.displayName || 'Google account'}` : 'Not signed in';
  }

  if (!signedIn) {
    setGlobalSyncStatus('Sign in to synchronize writing across devices.', 'idle');
    fieldRegistry.forEach((meta) => setFieldStatus(meta, 'Sign in to sync', 'idle'));
  }
}

function ensureGlobalSyncPanel() {
  if (document.getElementById('cloud-sync-panel')) {
    return;
  }

  const main = document.querySelector('main');
  if (!main) {
    return;
  }

  const panel = document.createElement('section');
  panel.id = 'cloud-sync-panel';
  panel.className = 'cloud-sync-panel';
  panel.innerHTML = `
    <div class="cloud-sync-row">
      <strong>Cloud Writing Sync</strong>
      <span id="cloud-sync-user">Not signed in</span>
    </div>
    <p id="cloud-sync-global-status" data-state="idle">Sign in to synchronize writing across devices.</p>
    <div class="cloud-sync-actions">
      <button type="button" class="button" id="cloud-sync-sign-in">Sign in with Google</button>
      <button type="button" class="button secondary" id="cloud-sync-sign-out" style="display:none;">Sign out</button>
    </div>
  `;

  main.insertBefore(panel, main.firstChild);

  const signInButton = panel.querySelector('#cloud-sync-sign-in');
  const signOutButton = panel.querySelector('#cloud-sync-sign-out');

  signInButton?.addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      const code = String(error?.code || '');
      const fallbackCodes = [
        'auth/popup-blocked',
        'auth/popup-closed-by-user',
        'auth/cancelled-popup-request',
        'auth/operation-not-supported-in-this-environment'
      ];

      if (fallbackCodes.includes(code)) {
        await signInWithRedirect(auth, provider);
        return;
      }

      console.warn('Google sign-in failed:', error);
      setGlobalSyncStatus('Sign-in failed. Please try again.', 'error');
    }
  });

  signOutButton?.addEventListener('click', async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn('Sign-out failed:', error);
      setGlobalSyncStatus('Sign-out failed. Please try again.', 'error');
    }
  });
}

function connectPageSnapshot(user) {
  if (unsubscribeSnapshot) {
    unsubscribeSnapshot();
    unsubscribeSnapshot = null;
  }

  pageDocRef = doc(db, 'users', user.uid, 'writingPages', pageName);

  unsubscribeSnapshot = onSnapshot(pageDocRef, (snapshot) => {
    applyRemoteState(snapshot.data() || {});
    setGlobalSyncStatus('Connected. Changes sync automatically.', 'saved');
  }, (error) => {
    console.warn('Snapshot error:', error);
    setGlobalSyncStatus('Cloud sync unavailable. Check connection.', 'error');
  });
}

function observeTextareaChanges() {
  if (observer) {
    observer.disconnect();
  }

  observer = new MutationObserver((mutations) => {
    let shouldRebind = false;

    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && (mutation.addedNodes.length || mutation.removedNodes.length)) {
        shouldRebind = true;
      }
    });

    if (shouldRebind) {
      bindAllTextareas();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}



}
window.addEventListener('load', () => {
  ensureGlobalSyncPanel();
  bindAllTextareas();
  observeTextareaChanges();

  onAuthStateChanged(auth, (user) => {
    activeUser = user;
    updateAuthUi(user);

    if (!user) {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      return;
    }

    connectPageSnapshot(user);
  });
});
