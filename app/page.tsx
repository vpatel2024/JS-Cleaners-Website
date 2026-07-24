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
          <a href="/hours" onClick={() => setMenuOpen(false)}>Hours</a>
          <a className="nav-call" href={`tel:${phoneHref}`}>Call {phoneDisplay}</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" />Your neighborhood dry cleaner</div>
            <h1>Care you can feel.<br /><em>Quality you can see.</em></h1>
            <p className="hero-intro">
              Family-style service, careful garment work, and a warm welcome right here in McDonough.
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
            <a className="open-card" href="/hours">
              <span className="status-dot private-dot" aria-hidden="true" />
              <div><small>Private schedule</small><strong>View password-protected hours</strong></div>
            </a>
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
                <a href={`tel:${phoneHref}`} aria-label={`Call about ${service.title}`}>Call us <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className="story-section">
          <div className="story-card">
            <p className="kicker">The JS difference</p>
            <blockquote>“Every time I pull up, they greet me by name, even with months between visits.”</blockquote>
            <p className="story-attribution">Brittany, recent customer</p>
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
            <div className="protected-hours-link">
              <div>
                <p className="kicker">Private page</p>
                <h3>Shop hours</h3>
                <p>The full weekly schedule is available on our password-protected hours page.</p>
              </div>
              <a className="button button-secondary" href="/hours">View hours</a>
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
        <a href={`tel:${phoneHref}`}>Call</a><a href={directionsUrl} target="_blank" rel="noreferrer">Directions</a>
      </div>
    </>
  );
}
