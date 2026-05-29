import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <header className="hero-section">
        <span className="badge">Europe's #1 Lottery Tool</span>
        <h1 className="main-title">Smart EuroJackpot Number Generator</h1>
        <p className="hero-subtitle">
          Revolutionize the way you pick your numbers. Our advanced generator
          creates unique, balanced combinations designed to help you prepare for
          the next big draw. Stop guessing blindly—trust logic and probability.
        </p>
      </header>

      <hr className="divider" />

      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Our Generator?</h2>
          <p>
            Most players pick numbers based on birthdays, limiting their pool to
            1 through 31. Our system ensures your ticket utilizes the full
            mathematical potential of the game.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚫</div>
            <h3>Guaranteed Unique</h3>
            <p>
              Every single line generated is 100% unique. The system makes sure
              that within a single bet (5 main numbers and 2 Euro Numbers), no
              values ever overlap. You get a clean, ready-to-play ticket every
              time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Smart Filtering</h3>
            <p>
              This isn't just a blind randomizer. Our algorithm automatically
              filters out highly improbable combinations, such as five
              consecutive numbers (e.g., 1, 2, 3, 4, 5) or lines consisting
              entirely of odd or even numbers.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>
              Whether you need one perfect combination for Friday night or you
              are generating multiple lines for a complex system bet, our
              algorithm delivers results in a fraction of a second right in your
              browser.
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-content">
          <h2>How to Play EuroJackpot: A Quick Refresher</h2>
          <p>
            EuroJackpot is one of Europe's largest and most popular
            transnational lotteries. To fill out a valid slip, you must choose a
            total of 7 numbers:
            <strong> 5 main numbers from a pool of 1 to 50</strong> and{" "}
            <strong>2 additional Euro Numbers from a pool of 1 to 12</strong>.
          </p>
          <p>
            The jackpot is won by matching all 7 numbers correctly. The
            guaranteed minimum jackpot is <strong>€10 million</strong>, and it
            can roll over to a staggering maximum cap of
            <strong> €120 million</strong>! Our generator helps you maintain a
            healthy balance between high/low and odd/even numbers.
          </p>
        </div>
      </section>

      <footer className="main-footer">
        <p>
          © {new Date().getFullYear()} EuroJackpot Generator. All rights
          reserved.
        </p>
        <p className="footer-disclaimer">
          This application is intended solely for entertainment, informational,
          and organizational purposes. We are not affiliated with, nor endorsed
          by, any official European lottery operator. Please play responsibly.
        </p>
      </footer>
    </div>
  );
}
