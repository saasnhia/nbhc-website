// Line-icon set for native sector demos — same visual language as
// AutomationFlow's icons (18x18, viewBox 20x20, strokeWidth 1.4) but kept
// separate: AutomationFlow is the generic diagram being retired from this
// section, these are purpose-built for specific demo scenes.

export function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 3h2.3l1 3.5-1.7 1.3a9 9 0 0 0 5.6 5.6l1.3-1.7 3.5 1v2.3c0 .9-.8 1.6-1.7 1.4-6-1-10.6-5.6-11.6-11.6C3.4 3.8 4.1 3 5 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WaveformIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 10v0M5.5 6.5v7M8.5 3.5v13M11.5 6.5v7M14.5 5v10M17.5 10v0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.5c.5 3 2 5 5 5.5-3 .5-4.5 2.5-5 5.5-.5-3-2-5-5-5.5 3-.5 4.5-2.5 5-5.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 7.5h15M6 2.5v3M14 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="11.3" r="1" fill="currentColor" />
      <circle cx="10" cy="11.3" r="1" fill="currentColor" />
    </svg>
  );
}

export function CalendarCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 7.5h15M6 2.5v3M14 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.7 11.7l1.6 1.6 3.2-3.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckCircleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.7 10.2l2.2 2.2 4.4-4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
