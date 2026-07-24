"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";

const phoneDisplay = "(678) 583-4727";
const phoneHref = "+16785834727";
const address = "1664 Hwy 81, McDonough, GA 30252";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=1664+Hwy+81%2C+McDonough%2C+GA+30252";

const services = [
  {
    number: "01",
    title: "Dry cleaning",
    copy: "Thoughtful care for suits, dresses, jackets, and the pieces you want looking their best.",
  },
  {
    number: "02",
    title: "Shirt laundry",
    copy: "Clean, crisp shirts with careful pressing and the finish you prefer.",
  },
  {
    number: "03",
    title: "Alterations",
    copy: "Hems, fit adjustments, and repairs for everyday clothing and special-occasion pieces.",
  },
  {
    number: "04",
    title: "Formal & uniform care",
    copy: "Detail-minded pressing for prom dresses, wedding attire, military uniforms, and more.",
  },
  {
    number: "05",
    title: "Household items",
    copy: "Bring in comforters and select household fabrics for a professional refresh.",
  },
];

const reviews = [
  {
    quote:
      "The owners are so sweet and always fast with our clothes. Every time I pull up they greet me by name.",
    name: "Brittany",
    note: "Local customer",
  },
  {
    quote: "Friendly, great price, and very nice work done to my prom dress.",
    name: "Jo",
    note: "Alterations customer",
  },
  {
    quote: "They have been excellent in their customer service and care of our clothing.",
    name: "E. Elaine",
    note: "Local Guide",
  },
  {
    quote:
      "They did an excellent job pressing my son’s military uniform—and provided a rigid hanger.",
    name: "Robert",
    note: "Uniform care customer",
  },
  {
    quote:
      "I use them weekly. They always take the extra effort to make sure my items are cleaned quickly.",
    name: "Phillip",
    note: "Longtime customer",
  },
  {
    quote:
      "The owners have always been pleasant and professional. Even with last-minute items, they have been flexible.",
    name: "Ira",
    note: "Longtime customer",
  },
];

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
    return { open: true, label: `Open today until ${close}` };
  }

  return {
    open: false,
    label: day === "Sat" ? "Closed · Opens Monday at 7:00 AM" : "Closed now",
  };
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState({ open: true, label: "Open today" });
  const [sent, setSent] = useState(false);
  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    const update = () => setStatus(getBusinessStatus());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      "Hi JS Cleaners! I’d like to ask about a garment.",
      `Name: ${form.get("name")}`,
      `Service: ${form.get("service")}`,
      form.get("needed") ? `Needed by: ${form.get("needed")}` : "",
      `Details: ${form.get("details")}`,
      `Best callback number: ${form.get("phone")}`,
    ]
      .filter(Boolean)
      .join("\n");
    const separator = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "&" : "?";
    setSent(true);
    window.location.href = `sms:${phoneHref}${separator}body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="JS Cleaners home">
          <span className="brand-mark">JS</span>
          <span>
            <strong>JS Cleaners</strong>
            <small>McDonough, Georgia</small>
          </span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span /><span />
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a>
          <a className="nav-call" href={`tel:${phoneHref}`}>Call {phoneDisplay}</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />Your neighborhood dry cleaner</div>
            <h1>Care you can feel.<br /><em>Quality you can see.</em></h1>
            <p className="hero-intro">
              Family-style service, careful garment work, and a warm welcome—right here in McDonough.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={`tel:${phoneHref}`}>
                Call the shop <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href={directionsUrl} target="_blank" rel="noreferrer">
                Get directions
              </a>
            </div>
            <div className="hero-proof" aria-label="JS Cleaners customer rating">
              <div className="stars" aria-hidden="true">★★★★★</div>
              <p><strong>4.4 out of 5</strong><span>from 58 local reviews</span></p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <img src="/pressed-shirts.webp" alt="Clean dress shirts hanging neatly on a garment rack" />
              <div className="photo-label"><small>Pressed with care</small><strong>Ready to wear</strong></div>
            </div>
            <div className={status.open ? "open-card" : "open-card closed-card"}>
              <span className="status-dot" aria-hidden="true" />
              <div><small>{status.open ? "We’re open" : "We’re closed"}</small><strong>{status.label}</strong></div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="What customers value">
          <span>Friendly owners</span><span>Careful workmanship</span>
          <span>Fair prices</span><span>Dependable turnaround</span>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading">
            <div><p className="kicker">What we care for</p><h2>From everyday shirts to the moments that matter.</h2></div>
            <p>Not sure whether we can help with a piece? Call us or bring it by. We’ll look at the garment with you and talk through the best next step.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.title}>
                <span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p>
                <a href="#request" aria-label={`Ask about ${service.title}`}>Ask us <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="story-section">
          <div className="story-card">
            <p className="kicker">The JS difference</p>
            <blockquote>“Every time I pull up, they greet me by name—even with months between visits.”</blockquote>
            <p className="story-attribution">— Brittany, recent customer</p>
          </div>
          <div className="story-copy">
            <p className="kicker">A local gem</p>
            <h2>Good service starts with knowing your neighbors.</h2>
            <p>Customers come back to JS Cleaners for the quality of the work. They also come back because they’re remembered, listened to, and treated with genuine kindness.</p>
            <div className="story-points">
              <div><strong>Personal</strong><span>Friendly, familiar service</span></div>
              <div><strong>Careful</strong><span>Attention to every piece</span></div>
              <div><strong>Reliable</strong><span>Ready when promised</span></div>
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="reviews-heading">
            <p className="kicker">Neighbor to neighbor</p><h2>McDonough has good things to say.</h2>
            <p>Real feedback from customers who trust JS Cleaners with weekly shirts, special outfits, uniforms, and family clothing.</p>
          </div>
          <div className="review-grid">
            {reviews.map((review, index) => (
              <article className={index === 0 ? "review-card review-featured" : "review-card"} key={review.name}>
                <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{review.quote}”</blockquote>
                <footer><span className="review-avatar">{review.name.charAt(0)}</span><p><strong>{review.name}</strong><small>{review.note}</small></p></footer>
              </article>
            ))}
          </div>
          <p className="review-note">Review excerpts were lightly edited for length and clarity.</p>
        </section>

        <section className="request-section" id="request">
          <div className="request-intro">
            <p className="kicker">Have a garment in mind?</p><h2>Tell us what you need.</h2>
            <p>Fill this out and we’ll prepare a text message you can send directly to the shop. For the quickest answer, just give us a call.</p>
            <a className="text-call-link" href={`tel:${phoneHref}`}><span>Call now</span><strong>{phoneDisplay}</strong></a>
          </div>
          <form className="request-form" onSubmit={handleRequest}>
            <div className="form-row">
              <label>Your name<input name="name" type="text" autoComplete="name" required /></label>
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label>
            </div>
            <div className="form-row">
              <label>What can we help with?
                <select name="service" required defaultValue="">
                  <option value="" disabled>Choose a service</option>
                  <option>Dry cleaning</option><option>Shirt laundry</option>
                  <option>Alterations or repairs</option><option>Formal wear or uniform</option>
                  <option>Household item</option><option>Something else</option>
                </select>
              </label>
              <label>Needed by <span>(optional)</span><input name="needed" type="date" min={minDate} /></label>
            </div>
            <label>Tell us about the item
              <textarea name="details" rows={4} placeholder="Example: Hem a prom dress, clean a two-piece suit, press a uniform…" required />
            </label>
            <button className="button button-light" type="submit">Prepare my text <span aria-hidden="true">↗</span></button>
            <p className="form-note" aria-live="polite">
              {sent ? "Your messaging app should open with the request ready to send." : "Nothing is sent until you approve it in your messaging app."}
            </p>
          </form>
        </section>

        <section className="section visit-section" id="visit">
          <div className="visit-map">
            <iframe title="Map showing JS Cleaners in McDonough, Georgia" src="https://www.google.com/maps?q=1664+Hwy+81,+McDonough,+GA+30252&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="visit-details">
            <p className="kicker">Come see us</p><h2>Right here on Highway 81.</h2>
            <address>{address}</address>
            <div className="visit-actions">
              <a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href={`tel:${phoneHref}`}>{phoneDisplay}</a>
            </div>
            <div className="hours">
              <div className="hours-title"><h3>Shop hours</h3><span className={status.open ? "hours-status" : "hours-status is-closed"}>{status.open ? "Open now" : "Closed now"}</span></div>
              <dl>{hours.map(([day, time]) => <div key={day}><dt>{day}</dt><dd>{time}</dd></div>)}</dl>
              <p>Holiday hours may vary. Call ahead if you’re making a special trip.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark">JS</span><div><strong>JS Cleaners</strong><span>Care you can feel. Quality you can see.</span></div></div>
        <div className="footer-contact"><a href={`tel:${phoneHref}`}>{phoneDisplay}</a><a href={directionsUrl} target="_blank" rel="noreferrer">{address}</a></div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} JS Cleaners</span><a href="https://unsplash.com/photos/shirts-hanging-on-a-clothing-rack-tyllGRM7zPc" target="_blank" rel="noreferrer">Photo by Ian Talmacs</a></div>
      </footer>

      <div className="mobile-bar" aria-label="Quick actions">
        <a href={`tel:${phoneHref}`}>Call</a><a href={directionsUrl} target="_blank" rel="noreferrer">Directions</a><a href="#request">Request</a>
      </div>
    </>
  );
}
