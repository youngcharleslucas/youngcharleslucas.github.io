+++
title = "a tiny fuzzy search filter in vanilla JS"
date = 2026-04-10
draft = false
+++

The blog index on this site filters posts as you type, with no search library.

The matcher walks through the query characters in order, finding each one in the title. If any character is missing, it's not a match. The score is the sum of gaps between consecutive matches — lower is better (tighter match).

```js
const fuzzy = (q, t) => {
  q = q.toLowerCase().trim(); t = t.toLowerCase();
  if (!q) return 0;
  let ti = 0, score = 0, last = -1;
  for (const ch of q) {
    if (ch === " ") continue;
    const idx = t.indexOf(ch, ti);
    if (idx === -1) return -1;
    if (last >= 0) score += idx - last;
    last = idx; ti = idx + 1;
  }
  return score;
};
```

Hugo renders the rows server-side, so the page works without JavaScript and is indexable. The script just filters the already-present DOM.
