const historyItems = [];

// ---- Character counter ----
const textarea = document.getElementById('message');
const charCountEl = document.getElementById('char-count');

textarea.addEventListener('input', function () {
  const len = this.value.length;
  charCountEl.textContent = len + ' / 2000';
  charCountEl.style.color = len > 1900 ? '#f87171' : '#4b5563';
});

// ---- Clear input ----
function clearInput() {
  textarea.value = '';
  charCountEl.textContent = '0 / 2000';
  charCountEl.style.color = '#4b5563';
  document.getElementById('result').innerHTML = '';
}

// ---- Update stat counters ----
function updateStats() {
  const total = historyItems.length;
  const spam  = historyItems.filter(x => x.isSpam).length;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-spam').textContent  = spam;
  document.getElementById('stat-ham').textContent   = total - spam;
}

// ---- Add entry to history ----
function addHistory(text, isSpam) {
  historyItems.unshift({ text, isSpam, time: new Date() });
  if (historyItems.length > 3) historyItems.pop();
  renderHistory();
  updateStats();
}

// ---- Render history list ----
function renderHistory() {
  const section = document.getElementById('history-section');
  const list    = document.getElementById('history-list');

  if (historyItems.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  list.innerHTML = historyItems.map(function (item) {
    const timeStr   = item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const pillClass = item.isSpam ? 'pill-spam' : 'pill-ham';
    const label     = item.isSpam ? 'SPAM' : 'HAM';
    const excerpt   = item.text.length > 50 ? item.text.slice(0, 50) + '…' : item.text;

    // Escape HTML to prevent XSS
    const safe = excerpt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return (
      '<div class="sc-history-item">' +
        '<span class="sc-history-pill ' + pillClass + '">' + label + '</span>' +
        '<span class="sc-history-text">' + safe + '</span>' +
        '<span class="sc-history-time">' + timeStr + '</span>' +
      '</div>'
    );
  }).join('');
}

// ---- Show result card helper ----
function showResult(themeClass, icon, label, verdict, subtext) {
  const resultEl = document.getElementById('result');

  resultEl.innerHTML =
    '<div class="sc-result ' + themeClass + ' fade-in">' +
      '<div class="sc-result-inner">' +
        '<div class="sc-result-icon">' + icon + '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div class="sc-result-label">' + label + '</div>' +
          '<div class="sc-result-verdict">' + verdict + '</div>' +
          '<div class="sc-result-sub">' + subtext + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

}

// ---- Loading state ----
function setLoading(loading) {
  var btn = document.getElementById('predict-btn');
  if (loading) {
    btn.disabled = true;
    btn.innerHTML = '<span class="spin">⟳</span>&nbsp; Analyzing...';
  } else {
    btn.disabled = false;
    btn.innerHTML = '<i class="ti ti-shield-check"></i> Analyze Message';
  }
}

// ---- Main predict function ----
async function predictSpam() {
  var message = textarea.value.trim();

  // Validation
  if (!message) {
    showResult(
      'warn-res',
      '⚠️',
      'Heads up',
      'Please enter a message first',
      'Type or paste an SMS/Email message in the box above.'
    );
    return;
  }

  setLoading(true);

  // Interim loading card
  document.getElementById('result').innerHTML =
    '<div class="sc-result" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);">' +
      '<div class="sc-result-inner" style="justify-content:center;padding:22px;">' +
        '<span style="color:#6b7280;font-size:13px;">Scanning message patterns…</span>' +
      '</div>' +
    '</div>';

  try {
    var formData = new FormData();
    formData.append('message', message);

    var response = await fetch('/predict', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Server returned ' + response.status);
    }

    var data = await response.json();

    var raw    = (data.prediction || '').toLowerCase();
    var isSpam = raw.includes('spam');

    if (isSpam) {
      showResult(
        'spam-res',
        '🚨',
        'Threat detected',
        'Spam Message',
        'This message shows patterns consistent with spam or phishing. Exercise caution.'
      );
    } else {
      showResult(
        'ham-res',
        '✅',
        'Message clear',
        'Ham Message',
        'No suspicious patterns detected. This message appears to be Ham.'
      );
    }

    addHistory(message, isSpam);

  } catch (err) {
    console.error('Prediction error:', err);
    showResult(
      'err-res',
      '🔌',
      'Connection error',
      'Could not reach the server',
      'Make sure your Flask app is running and the /predict route is active.'
    );
  } finally {
    setLoading(false);
  }
}

// ---- Allow Enter key to submit (Shift+Enter for new line) ----
textarea.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    predictSpam();
  }
});
