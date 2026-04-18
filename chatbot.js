(function () {
  'use strict';

  /** Minimum score to accept a rule (single strong keyword = 1). */
  var MATCH_THRESHOLD = 1;
  var PHRASE_BONUS = 5;
  var SHORT_KEYWORD_MAX = 3;

  /** How many ms to show the typing indicator before revealing the answer. */
  var TYPING_DELAY_MS = 750;

  /** Tracks IDs of rules answered so far this session. */
  var sessionTopics = [];

  function getMeta() {
    return typeof CHATBOT_META !== 'undefined' ? CHATBOT_META : {};
  }

  function getRules() {
    return typeof CHATBOT_RULES !== 'undefined' ? CHATBOT_RULES : [];
  }

  function normalizeQuery(raw) {
    return String(raw || '')
      .toLowerCase()
      .replace(/[^\w\s\u00c0-\u024f]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function wordBoundaryMatch(haystack, word) {
    var re = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    return re.test(haystack);
  }

  function keywordScore(normalized, keyword) {
    var k = keyword.toLowerCase().trim();
    if (!k) return 0;
    if (k.length <= SHORT_KEYWORD_MAX) {
      return wordBoundaryMatch(normalized, k) ? 1 : 0;
    }
    return normalized.indexOf(k) !== -1 ? 1 : 0;
  }

  function scoreRule(rule, normalized) {
    var score = 0;
    var phrases = rule.phrases || [];
    var i;
    for (i = 0; i < phrases.length; i++) {
      if (normalized.indexOf(phrases[i].toLowerCase()) !== -1) {
        score += PHRASE_BONUS;
      }
    }
    var keywords = rule.keywords || [];
    for (i = 0; i < keywords.length; i++) {
      score += keywordScore(normalized, keywords[i]);
    }
    return score;
  }

  function matchRule(query) {
    var normalized = normalizeQuery(query);
    if (!normalized) return null;

    var rules = getRules();
    var best = null;
    var bestScore = 0;
    var r;
    for (r = 0; r < rules.length; r++) {
      var s = scoreRule(rules[r], normalized);
      if (s > bestScore) {
        bestScore = s;
        best = rules[r];
      }
    }
    if (bestScore < MATCH_THRESHOLD) return null;
    return { rule: best, score: bestScore };
  }

  /**
   * Pick a random answer variant from a rule.
   * Prefers variants not recently shown to avoid back-to-back repeats.
   * Falls back to legacy `answer` string for backward compatibility.
   */
  function pickAnswer(rule) {
    var pool = rule.answers && rule.answers.length ? rule.answers : null;
    if (!pool) return rule.answer || '';

    if (pool.length === 1) return pool[0];

    /* Try to avoid the last-shown variant stored on the rule itself. */
    var last = rule._lastVariantIdx;
    var candidates = [];
    for (var i = 0; i < pool.length; i++) {
      if (i !== last) candidates.push(i);
    }
    var idx = candidates[Math.floor(Math.random() * candidates.length)];
    rule._lastVariantIdx = idx;
    return pool[idx];
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function buildFallbackAnswer() {
    var m = getMeta();
    var openers = [
      "Hmm, I didn't quite catch that one.",
      "That's outside what I can answer directly.",
      "I'm not sure I have a good answer for that.",
    ];
    var opener = openers[Math.floor(Math.random() * openers.length)];
    var parts = [opener + ' Try a quick topic below, or reach out directly.'];
    parts.push(
      '<br><br><strong>Contact:</strong> <a href="mailto:' +
        escapeHtml(m.email || '') +
        '">' +
        escapeHtml(m.email || '') +
        '</a>'
    );
    if (m.linkedin) {
      parts.push(
        ' · <a href="' +
          escapeHtml(m.linkedin) +
          '" target="_blank" rel="noopener noreferrer">LinkedIn</a>'
      );
    }
    if (m.github) {
      parts.push(
        ' · <a href="' +
          escapeHtml(m.github) +
          '" target="_blank" rel="noopener noreferrer">GitHub</a>'
      );
    }
    if (m.availability) {
      parts.push('<br><br><strong>Availability:</strong> ' + escapeHtml(m.availability));
    }
    if (m.timezone) {
      parts.push('<br><strong>Timezone:</strong> ' + escapeHtml(m.timezone));
    }
    if (m.remotePreference) {
      parts.push('<br><strong>Work arrangement:</strong> ' + escapeHtml(m.remotePreference));
    }
    if (m.emailResponseTime) {
      parts.push('<br><strong>Typical reply time:</strong> ' + escapeHtml(m.emailResponseTime));
    }
    if (m.phone) {
      parts.push('<br><strong>Phone:</strong> ' + escapeHtml(m.phone));
    }
    return parts.join('');
  }

  /**
   * Build a context bridge sentence when the user has already covered related topics.
   * Returns an empty string if no relevant context to reference.
   */
  function buildContextBridge(ruleId) {
    var bridges = {
      projects: { needs: ['skills'], text: 'Since you already know his stack — ' },
      skills:   { needs: ['experience'], text: 'To go with that experience — ' },
      hiring:   { needs: ['contact'], text: "You already have his contact details, so — " },
      contact:  { needs: ['hiring'], text: 'Good timing — ' },
    };
    var bridge = bridges[ruleId];
    if (!bridge) return '';
    for (var i = 0; i < bridge.needs.length; i++) {
      if (sessionTopics.indexOf(bridge.needs[i]) !== -1) {
        return '<em class="faq-context-bridge">' + bridge.text + '</em>';
      }
    }
    return '';
  }

  function appendBubble(container, role, htmlOrText, isHtml) {
    var row = document.createElement('div');
    row.className = 'faq-chat-msg faq-chat-msg--' + role;
    var bubble = document.createElement('div');
    bubble.className = 'faq-chat-bubble';
    if (isHtml) {
      bubble.innerHTML = htmlOrText;
    } else {
      bubble.textContent = htmlOrText;
    }
    row.appendChild(bubble);
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;
    return bubble;
  }

  /** Show a typing indicator, then after a delay replace it with the real answer. */
  function showTypingThenAnswer(container, answerHtml) {
    var row = document.createElement('div');
    row.className = 'faq-chat-msg faq-chat-msg--bot';
    var bubble = document.createElement('div');
    bubble.className = 'faq-chat-bubble faq-chat-bubble--typing';
    bubble.innerHTML =
      '<span class="faq-typing-dot"></span>' +
      '<span class="faq-typing-dot"></span>' +
      '<span class="faq-typing-dot"></span>';
    row.appendChild(bubble);
    container.appendChild(row);
    container.scrollTop = container.scrollHeight;

    setTimeout(function () {
      bubble.className = 'faq-chat-bubble';
      bubble.innerHTML = answerHtml;
      container.scrollTop = container.scrollHeight;
    }, TYPING_DELAY_MS);
  }

  function handleSend() {
    var input = document.getElementById('faqChatInput');
    var log = document.getElementById('faqChatLog');
    if (!input || !log) return;

    var text = input.value.trim();
    if (!text) return;

    appendBubble(log, 'user', escapeHtml(text), false);
    input.value = '';

    var matched = matchRule(text);
    var answer;
    if (matched && matched.rule) {
      var ruleId = matched.rule.id;
      var alreadyAsked = sessionTopics.indexOf(ruleId) !== -1;
      var bridge = alreadyAsked ? '' : buildContextBridge(ruleId);

      answer = bridge + pickAnswer(matched.rule);

      if (!alreadyAsked) sessionTopics.push(ruleId);
    } else {
      answer = buildFallbackAnswer();
    }

    showTypingThenAnswer(log, answer);
  }

  function initChips() {
    var wrap = document.getElementById('faqChatChips');
    if (!wrap) return;

    var presets = [
      { label: 'Education', query: 'Tell me about your education at Holy Angel University' },
      { label: 'Experience', query: 'What is your work experience' },
      { label: 'Projects', query: 'What projects have you built' },
      { label: 'Contact', query: 'How can I contact you' },
      { label: 'Hiring', query: 'Are you open to full-time or contract work' },
    ];

    presets.forEach(function (p) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'faq-chat-chip';
      btn.textContent = p.label;
      btn.addEventListener('click', function () {
        var input = document.getElementById('faqChatInput');
        if (input) input.value = p.query;
        handleSend();
      });
      wrap.appendChild(btn);
    });
  }

  function setOpen(open) {
    var panel = document.getElementById('faqChatPanel');
    var backdrop = document.getElementById('faqChatBackdrop');
    var fab = document.getElementById('faqChatFab');
    if (!panel || !fab) return;

    if (open) {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      if (backdrop) {
        backdrop.classList.add('is-open');
        backdrop.setAttribute('aria-hidden', 'false');
      }
      fab.setAttribute('aria-expanded', 'true');
      document.body.classList.add('faq-chat-open');
      var input = document.getElementById('faqChatInput');
      if (input) {
        setTimeout(function () {
          input.focus();
        }, 10);
      }
    } else {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      if (backdrop) {
        backdrop.classList.remove('is-open');
        backdrop.setAttribute('aria-hidden', 'true');
      }
      fab.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('faq-chat-open');
      fab.focus();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var fab = document.getElementById('faqChatFab');
    var closeBtn = document.getElementById('faqChatClose');
    var backdrop = document.getElementById('faqChatBackdrop');
    var input = document.getElementById('faqChatInput');
    var sendBtn = document.getElementById('faqChatSend');

    initChips();

    if (fab) {
      fab.addEventListener('click', function () {
        var panel = document.getElementById('faqChatPanel');
        var isOpen = panel && panel.classList.contains('is-open');
        setOpen(!isOpen);
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setOpen(false);
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setOpen(false);
      });
    }

    if (input) {
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', function () {
        handleSend();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var panel = document.getElementById('faqChatPanel');
      if (panel && panel.classList.contains('is-open')) {
        setOpen(false);
      }
    });
  });
})();
