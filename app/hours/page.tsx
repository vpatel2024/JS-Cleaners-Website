import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop Hours | JS Cleaners",
  description: "The current weekly shop hours for JS Cleaners in McDonough, Georgia.",
  robots: {
    index: false,
    follow: false,
  },
};

const phoneDisplay = "(678) 583-4727";
const phoneHref = "+16785834727";
const address = "1664 Hwy 81, McDonough, GA 30252";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=1664+Hwy+81%2C+McDonough%2C+GA+30252";

const hours = [
  ["Monday", "7:00 AM – 7:00 PM"],
  ["Tuesday", "7:00 AM – 7:00 PM"],
  ["Wednesday", "7:00 AM – 7:00 PM"],
  ["Thursday", "7:00 AM – 7:00 PM"],
  ["Friday", "7:00 AM – 7:00 PM"],
  ["Saturday", "8:30 AM – 1:00 PM"],
  ["Sunday", "Closed"],
];

function getBusinessStatus() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const day = value.weekday;
  const current = Number(value.hour) * 60 + Number(value.minute);
  const schedule: Record<string, [number, number] | null> = {
    Mon: [7 * 60, 19 * 60],
    Tue: [7 * 60, 19 * 60],
    Wed: [7 * 60, 19 * 60],
    Thu: [7 * 60, 19 * 60],
    Fri: [7 * 60, 19 * 60],
    Sat: [8 * 60 + 30, 13 * 60],
    Sun: null,
  };
  const today = schedule[day];

  if (today && current >= today[0] && current < today[1]) {
    const close = day === "Sat" ? "1:00 PM" : "7:00 PM";
    return { open: true, label: `Open until ${close}` };
  }

  return { open: false, label: "Closed now" };
}

export default async function HoursPage() {
  await headers();
  const status = getBusinessStatus();

  return (
    <>
      <a className="skip-link" href="#hours-main">Skip to content</a>

      <header className="site-header">
        <Link className="brand" href="/" aria-label="JS Cleaners home">
          <span className="brand-mark">JS</span>
          <span>
            <strong>JS Cleaners</strong>
            <small>McDonough, Georgia</small>
          </span>
        </Link>
        <nav className="nav hours-nav" aria-label="Hours page navigation">
          <Link href="/">Back to home</Link>
          <a className="nav-call" href={`tel:${phoneHref}`}>Call {phoneDisplay}</a>
        </nav>
      </header>

      <main className="hours-page" id="hours-main">
        <section className="hours-hero">
          <div className="hours-page-heading">
            <p className="kicker">Plan your visit</p>
            <h1>Shop hours.</h1>
            <p>Our current weekly schedule is below. Holiday hours may vary, so call ahead if you are making a special trip.</p>
          </div>

          <div className="hours-panel">
            <div className="hours-title">
              <h2>This week</h2>
              <span className={status.open ? "hours-status" : "hours-status is-closed"}>
                {status.label}
              </span>
            </div>
            <dl>
              {hours.map(([day, time]) => (
                <div key={day}>
                  <dt>{day}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
            <div className="hours-page-actions">
              <a className="button button-primary" href={`tel:${phoneHref}`}>Call the shop</a>
              <a className="button button-secondary" href={directionsUrl} target="_blank" rel="noreferrer">Get directions</a>
            </div>
          </div>
        </section>

        <section className="hours-visit-card">
          <p className="kicker">JS Cleaners</p>
          <address>{address}</address>
          <a href={directionsUrl} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
        </section>
      </main>

      <footer className="site-footer hours-footer">
        <div className="footer-brand"><span className="brand-mark">JS</span><div><strong>JS Cleaners</strong><span>Care you can feel. Quality you can see.</span></div></div>
        <div className="footer-contact"><a href={`tel:${phoneHref}`}>{phoneDisplay}</a><a href={directionsUrl} target="_blank" rel="noreferrer">{address}</a></div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} JS Cleaners</span><Link href="/">Return home</Link></div>
      </footer>
    </>
  );
}
