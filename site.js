// The show starts at 2 PM in New York; say when that is for the reader, and whether it should be on now.
(function () {
  const el = document.getElementById('local');
  if (!el || !window.Intl) return;
  const NY = 'America/New_York', START = 14, HOURS = 8.5;
  const now = new Date();
  const part = (d, opts) => new Intl.DateTimeFormat('en-US', { timeZone: NY, ...opts }).format(d);
  const [m, d, y] = part(now, { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').map(Number);
  let start = Date.UTC(y, m - 1, d, START);                    // 2 PM as if New York were UTC...
  const off = (Number(part(new Date(start), { hour: 'numeric', hourCycle: 'h23' })) - START + 36) % 24 - 12;
  start -= off * 3600e3;                                       // ...moved to the real instant
  const end = start + HOURS * 3600e3;
  const mine = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const local = new Date(start).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  let text = mine === NY ? '' : ` (${local} where you are)`;
  if (now >= start && now < end) text += '. It should be on air right now.';
  else text += '.';
  el.textContent = text;
})();
