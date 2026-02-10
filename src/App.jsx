import { useEffect, useMemo, useState } from "react";

const heroImages = [
  "/assets/hero1.png",
  "/assets/hero2.png",
  "/assets/hero3.png",
];

const products = [
  {
    id: 1,
    title: "Gentle Bloom I",
    price: "Rp 125.000",
    image: "/assets/product1.jpg",
    tag: "Limited",
  },
  {
    id: 2,
    title: "Soft Drift II",
    price: "Rp 230.000",
    image: "/assets/product2.jpg",
    tag: "New",
  },
  {
    id: 3,
    title: "Quiet Frame III",
    price: "Rp 128.000",
    image: "/assets/product3.jpg",
    tag: "Print",
  },
  {
    id: 4,
    title: "Muted Glow IV",
    price: "Rp 225.000",
    image: "/assets/product4.jpg",
    tag: "Original",
  },
  {
    id: 5,
    title: "Velvet Noon V",
    price: "Rp 325.000",
    image: "/assets/product5.jpg",
    tag: "Collector",
  },
  {
    id: 6,
    title: "Soft Bloom VI",
    price: "Rp 125.000",
    image: "/assets/product6.jpg",
    tag: "Print",
  },
];

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [greetingName, setGreetingName] = useState("Guest");
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "Female",
    message: "",
  });
  const [result, setResult] = useState(null);
  const [activeSection, setActiveSection] = useState("home-section");
  const [formError, setFormError] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const lightboxItems = useMemo(
    () => [
      ...products.map((product) => ({
        src: product.image,
        title: product.title,
      })),
      { src: "/assets/product4.jpg", title: "Quiet Atmosphere I" },
      { src: "/assets/product5.jpg", title: "Quiet Atmosphere II" },
      { src: "/assets/product2.jpg", title: "Quiet Atmosphere III" },
    ],
    []
  );

  useEffect(() => {
    const id = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "home-section",
      "product-section",
      "featured-section",
      "story-section",
      "testimonials-section",
      "about-us-section",
      "message-us-section",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animated = Array.from(
      document.querySelectorAll("[data-animate]")
    );

    if (!animated.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animated.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") {
        setLightbox(null);
        return;
      }

      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrev();
      }
    }

    if (lightbox) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox]);

  const heroImage = useMemo(() => heroImages[slideIndex], [slideIndex]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
    setFormStatus("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedMessage = formData.message.trim();
    const trimmedName = formData.name.trim();

    if (trimmedName.length < 2) {
      setFormError("Please share your name (at least 2 characters).");
      return;
    }

    if (trimmedMessage.length < 12) {
      setFormError("Please tell us a bit more (minimum 12 characters).");
      return;
    }

    const currentTime = new Date().toLocaleString();
    setResult({
      currentTime,
      name: trimmedName,
      birthDate: formData.birthDate,
      gender: formData.gender,
      message: trimmedMessage,
    });
    setGreetingName(trimmedName || "Guest");
    setFormStatus("Thanks! Your note is on the way to the studio.");
  }

  function openLightbox(index) {
    setLightboxIndex(index);
    setLightbox(lightboxItems[index]);
  }

  function goNext() {
    setLightboxIndex((prev) => {
      const next = (prev + 1) % lightboxItems.length;
      setLightbox(lightboxItems[next]);
      return next;
    });
  }

  function goPrev() {
    setLightboxIndex((prev) => {
      const next = (prev - 1 + lightboxItems.length) % lightboxItems.length;
      setLightbox(lightboxItems[next]);
      return next;
    });
  }

  function handleTouchStart(event) {
    setTouchStartX(event.touches[0].clientX);
  }

  function handleTouchEnd(event) {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    setTouchStartX(null);
    if (Math.abs(delta) < 50) return;
    if (delta < 0) {
      goNext();
    } else {
      goPrev();
    }
  }

  return (
    <div className="page">
      <header className="main-header">
        <div className="brand">
          <img className="main-logo" src="/assets/logo.jpg" alt="Logo" />
          <span className="brand-name">Atelier Soft</span>
        </div>
        <nav className="navbar">
          <ul className="nav-link">
            <li>
              <a
                href="#home-section"
                className={activeSection === "home-section" ? "active" : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#product-section"
                className={activeSection === "product-section" ? "active" : ""}
              >
                Collections
              </a>
            </li>
            <li>
              <a
                href="#story-section"
                className={activeSection === "story-section" ? "active" : ""}
              >
                Story
              </a>
            </li>
            <li>
              <a
                href="#about-us-section"
                className={activeSection === "about-us-section" ? "active" : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#message-us-section"
                className={activeSection === "message-us-section" ? "active" : ""}
              >
                Message
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home-section" className="hero-section" data-animate>
          <div className="hero-container">
            <div className="hero-image">
              <img src={heroImage} alt="Soft art preview" />
              <div className="hero-caption">Curated soft minimal art</div>
            </div>
            <div className="hero-text">
              <p className="eyebrow">Art market for calm spaces</p>
              <h1>
                Welcome <span className="accent-name">{greetingName}</span>
              </h1>
              <p className="lead">
                Discover quiet compositions, gentle palettes, and tactile textures
                crafted for modern interiors.
              </p>
              <div className="hero-actions">
                <a href="#product-section" className="cta-button">
                  Explore Collection
                </a>
                <a href="#message-us-section" className="ghost-button">
                  Commission Piece
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          className="product-section"
          id="product-section"
          data-animate
        >
          <div className="section-header">
            <h2 className="section-title">Soft Minimal Collections</h2>
            <p className="section-subtitle">
              Originals and curated prints, ready to ship.
            </p>
          </div>
          <div className="product-grid">
            {products.map((product, index) => (
              <article
                className="product-card reveal"
                style={{ "--i": index }}
                key={product.id}
                data-animate
              >
                <div className="product-badge">{product.tag}</div>
                <button
                  type="button"
                  className="image-button"
                  onClick={() => openLightbox(index)}
                >
                  <img src={product.image} alt={product.title} />
                </button>
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-price">{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="featured-section" className="featured-section" data-animate>
          <div className="featured-container">
            <div className="featured-copy">
              <p className="eyebrow">Featured Collection</p>
              <h2>Quiet Atmospheres</h2>
              <p>
                A trio of soft tonal studies that pair layered watercolor washes
                with linen textures. Designed to bring a sense of pause to entry
                halls, bedrooms, and studio corners.
              </p>
              <div className="featured-tags">
                <span>Limited run</span>
                <span>Signed edition</span>
                <span>Framed or unframed</span>
              </div>
            </div>
            <div className="featured-grid">
              <article className="featured-card">
                <button
                  type="button"
                  className="image-button"
                  onClick={() => openLightbox(products.length)}
                >
                  <img src="/assets/product4.jpg" alt="Quiet Atmosphere I" />
                </button>
                <div>
                  <h3>Quiet Atmosphere I</h3>
                  <p>Soft umber, textured paper</p>
                </div>
              </article>
              <article className="featured-card">
                <button
                  type="button"
                  className="image-button"
                  onClick={() => openLightbox(products.length + 1)}
                >
                  <img src="/assets/product5.jpg" alt="Quiet Atmosphere II" />
                </button>
                <div>
                  <h3>Quiet Atmosphere II</h3>
                  <p>Muted blush, layered lines</p>
                </div>
              </article>
              <article className="featured-card">
                <button
                  type="button"
                  className="image-button"
                  onClick={() => openLightbox(products.length + 2)}
                >
                  <img src="/assets/product2.jpg" alt="Quiet Atmosphere III" />
                </button>
                <div>
                  <h3>Quiet Atmosphere III</h3>
                  <p>Warm stone, subtle gradient</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="story-section" className="story-section" data-animate>
          <div className="story-grid">
            <div className="story-card">
              <p className="eyebrow">Artist Story</p>
              <h2>Crafted by hand, curated with calm.</h2>
              <p>
                Atelier Soft is led by Maya Adira, a Makassar-based artist who
                focuses on minimal compositions and organic textures. Each
                piece is built in layered stages, combining handmade paper,
                natural pigments, and soft graphite details.
              </p>
              <div className="story-stats">
                <div>
                  <span>28</span>
                  <p>Originals released</p>
                </div>
                <div>
                  <span>120+</span>
                  <p>Homes styled</p>
                </div>
                <div>
                  <span>4</span>
                  <p>Gallery partners</p>
                </div>
              </div>
            </div>
            <div className="story-panel">
              <div>
                <h3>Studio Notes</h3>
                <p>
                  We favor slow production runs to preserve intentionality.
                  Every artwork is photographed in natural light and shipped
                  in archival packaging.
                </p>
              </div>
              <div>
                <h3>Commission Flow</h3>
                <p>
                  Share your room palette, wall size, and mood references.
                  You will receive a concept preview within 5 working days.
                </p>
              </div>
              <div>
                <h3>Care Promise</h3>
                <p>
                  Prints are sealed with matte coating and shipped with
                  humidity-safe wrapping for tropical climates.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials-section"
          className="testimonials-section"
          data-animate
        >
          <div className="section-header">
            <h2 className="section-title">Collector Notes</h2>
            <p className="section-subtitle">
              Quiet words from new homes of Atelier Soft.
            </p>
          </div>
          <div className="testimonials-grid">
            <article>
              <p>
                “The palette sits perfectly with our oak furniture. It feels
                like the room exhales now.”
              </p>
              <span>Raisa, Jakarta</span>
            </article>
            <article>
              <p>
                “We commissioned a trio for our studio. The textures feel
                meditative and grounded.”
              </p>
              <span>Studio Loka, Bali</span>
            </article>
            <article>
              <p>
                “Fast delivery and beautiful packaging. The print quality is
                rich and soft.”
              </p>
              <span>Arman, Bandung</span>
            </article>
          </div>
        </section>

        <section id="about-us-section" className="about-section" data-animate>
          <div className="about-content">
            <h2>About the Studio</h2>
            <p>
              Atelier Soft curates a collection of minimal art pieces inspired by
              quiet light, textured paper, and soft tonal harmonies. Every work is
              assembled to bring calm focus into your space.
            </p>
            <p>
              From intimate gifts to statement walls, our series celebrates slow
              craft and tactile balance. Each edition is carefully packaged and
              shipped with care.
            </p>
          </div>
        </section>

        <section
          className="contact-section"
          id="message-us-section"
          data-animate
        >
          <div className="contact-container">
            <div className="form-area">
              <h2>Message Us</h2>
              <p className="form-caption">
                Tell us about your space and we will suggest a perfect piece.
              </p>
              <form id="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="birth-date">Birth Date</label>
                <input
                  id="birth-date"
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />

                <label>Gender</label>
                <div className="gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                    />
                    Male
                  </label>
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {formError ? <p className="form-error">{formError}</p> : null}
                {formStatus ? <p className="form-success">{formStatus}</p> : null}
                <button type="submit">Send Message</button>
              </form>
            </div>

            <div className="output-area">
              <h2>Form Result</h2>
              <div id="result-display">
                {result ? (
                  <div className="result-card">
                    <p>
                      <strong>Current Time:</strong> {result.currentTime}
                    </p>
                    <p>
                      <strong>Nama:</strong> {result.name}
                    </p>
                    <p>
                      <strong>Tanggal Lahir:</strong> {result.birthDate}
                    </p>
                    <p>
                      <strong>Jenis Kelamin:</strong> {result.gender}
                    </p>
                    <p>
                      <strong>Pesan:</strong>
                    </p>
                    <p className="result-message">{result.message}</p>
                  </div>
                ) : (
                  <p className="placeholder">
                    Submit the form to preview your message here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <span className="brand-name">Atelier Soft</span>
          <div className="social-icons">
            <a href="#">
              <img src="/assets/whatsapp_logo.png" alt="Whatsapp" />
            </a>
            <a href="#">
              <img src="/assets/instagram_logo.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </footer>

      {lightbox ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <div
            className="lightbox-backdrop"
            onClick={() => setLightbox(null)}
          />
          <div
            className="lightbox-content"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="lightbox-close"
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close preview"
            >
              ✕
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              type="button"
              onClick={goPrev}
              aria-label="Previous artwork"
            >
              ←
            </button>
            <button
              className="lightbox-nav lightbox-next"
              type="button"
              onClick={goNext}
              aria-label="Next artwork"
            >
              →
            </button>
            <img src={lightbox.src} alt={lightbox.title} />
            <p>{lightbox.title}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
