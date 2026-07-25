"use client";

import { useState } from "react";

const phoneDisplay = "(678) 583-4727";
const phoneHref = "+16785834727";
const address = "1664 Hwy 81, McDonough, GA 30252";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=1664+Hwy+81%2C+McDonough%2C+GA+30252";

const services = [
  {
    number: "01",
    title: "Dry cleaning",
    copy: "Suits, dresses, jackets, and everyday garments, cleaned and finished with care.",
  },
  {
    number: "02",
    title: "Shirt laundry",
    copy: "Clean collars, crisp cuffs, and the level of starch you prefer.",
  },
  {
    number: "03",
    title: "Alterations",
    copy: "Hems, repairs, and fit adjustments for everyday clothing and special occasions.",
  },
  {
    number: "04",
    title: "Formal & uniform care",
    copy: "Careful pressing for prom dresses, wedding attire, military uniforms, and more.",
  },
  {
    number: "05",
    title: "Comforters & household",
    copy: "Professional cleaning for comforters and select household fabrics.",
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
      "They did an excellent job pressing my son’s military uniform. They also provided a rigid hanger.",
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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="JS Cleaners home">
          <img
            className="brand-logo"
            src="/js-cleaners-logo-main.png"
            alt="JS Cleaners, McDonough, Georgia"
            width="900"
            height="275"
          />
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
          <a href="/hours" onClick={() => setMenuOpen(false)}>Hours</a>
          <a className="nav-call" href={`tel:${phoneHref}`}>Call {phoneDisplay}</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />Local service on Highway 81</div>
            <h1>Dry cleaning<br /><em>done right.</em></h1>
            <p className="hero-intro">
              From work shirts and everyday clothes to prom dresses and military uniforms, we clean, press, alter, and care for every piece.
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
              <img src="/garments-ready.webp" alt="Freshly pressed shirts and a navy suit hanging in a clean garment-care shop" />
              <div className="photo-label"><small>Cleaned and pressed</small><strong>Ready when you are</strong></div>
            </div>
            <a className="open-card" href="/hours">
              <span className="status-dot" aria-hidden="true" />
              <div><small>Plan your visit</small><strong>See today&apos;s shop hours</strong></div>
            </a>
          </div>
        </section>

        <section className="trust-strip" aria-label="What customers value">
          <span>Friendly owners</span><span>Careful workmanship</span>
          <span>Fair prices</span><span>Dependable turnaround</span>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading">
            <div><p className="kicker">Services</p><h2>Care for the clothes you count on.</h2></div>
            <p>Have a stain, repair, or special request? Bring it in and we’ll take a look.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.title}>
                <span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p>
                <a href={`tel:${phoneHref}`} aria-label={`Call about ${service.title}`}>Call us <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="story-section">
          <div className="story-card">
            <p className="kicker">Why neighbors come back</p>
            <blockquote>“Every time I pull up, they greet me by name, even with months and months between visits.”</blockquote>
            <p className="story-attribution">Brittany, Google review</p>
          </div>
          <div className="story-copy">
            <p className="kicker">Local and personal</p>
            <h2>Friendly service. Careful work. No fuss.</h2>
            <p>People come back because their clothes look good and the service feels personal. The owners remember customers, explain the options, and do their best to help when timing is tight.</p>
            <div className="story-points">
              <div><strong>Friendly</strong><span>Service from people who know you</span></div>
              <div><strong>Careful</strong><span>Attention to each garment</span></div>
              <div><strong>Flexible</strong><span>Help when the timing is tight</span></div>
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="reviews-heading">
            <p className="kicker">Customer reviews</p><h2>What customers say.</h2>
            <p>From weekly shirt service to alterations and uniform pressing, customers appreciate the work and the welcome.</p>
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
          <p className="review-note">Review excerpts were shortened for space.</p>
        </section>

        <section className="section visit-section" id="visit">
          <div className="visit-map">
            <iframe title="Map showing JS Cleaners in McDonough, Georgia" src="https://www.google.com/maps?q=1664+Hwy+81,+McDonough,+GA+30252&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="visit-details">
            <p className="kicker">Visit the shop</p><h2>Find us on Highway 81.</h2>
            <address>{address}</address>
            <div className="visit-actions">
              <a className="button button-primary" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a>
              <a className="button button-secondary" href={`tel:${phoneHref}`}>{phoneDisplay}</a>
            </div>
            <div className="public-hours-card">
              <div>
                <p className="kicker">Hours</p>
                <h3>Plan your visit</h3>
                <dl>
                  <div><dt>Monday to Friday</dt><dd>7:00 AM to 7:00 PM</dd></div>
                  <div><dt>Saturday</dt><dd>8:30 AM to 1:00 PM</dd></div>
                  <div><dt>Sunday</dt><dd>Closed</dd></div>
                </dl>
                <p>Holiday hours may vary.</p>
              </div>
              <a className="button button-secondary" href="/hours">See full hours</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="/js-cleaners-logo-white.png"
            alt="JS Cleaners, McDonough, Georgia"
            width="900"
            height="283"
          />
        </div>
        <div className="footer-contact"><a href={`tel:${phoneHref}`}>{phoneDisplay}</a><a href={directionsUrl} target="_blank" rel="noreferrer">{address}</a></div>
        <div className="footer-meta"><span>© {new Date().getFullYear()} JS Cleaners</span><span>Serving McDonough, Georgia</span></div>
      </footer>

      <div className="mobile-bar" aria-label="Quick actions">
        <a href={`tel:${phoneHref}`}>Call</a><a href={directionsUrl} target="_blank" rel="noreferrer">Directions</a>
      </div>
    </>
  );
}
