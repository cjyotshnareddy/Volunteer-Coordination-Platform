import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homeWrapper}>
      {/* Hero Section */}
      <section className={styles.hero}
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/hero-volunteer.webp)` }}

      >
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>Be The Change You Wish to See</h1>
          <p>Welcome to Evergreen Events – where compassion meets community. Discover local and national volunteer opportunities tailored for you.</p>
          <Link to="/signup" className={styles.cta}>Start Volunteering</Link>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className={styles.stats}>
        <h2>Our Impact</h2>
        <div className={styles.statCards}>
          <div>
            <h3>5,000+</h3>
            <p>Volunteers</p>
          </div>
          <div>
            <h3>120+</h3>
            <p>Partner NGOs</p>
          </div>
          <div>
            <h3>200+</h3>
            <p>Successful Events</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2>How It Works</h2>
        <div className={styles.steps}>
          <div>
            <span>1</span>
            <h3>Create Profile</h3>
            <p>Sign up and share your interests and availability.</p>
          </div>
          <div>
            <span>2</span>
            <h3>Find Events</h3>
            <p>Browse verified volunteering events across India.</p>
          </div>
          <div>
            <span>3</span>
            <h3>Make an Impact</h3>
            <p>Join causes and create positive change in your community.</p>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className={styles.stories}>
        <h2>Volunteer Stories</h2>
        <div className={styles.storyCards}>
          <div>
            <p>“I joined a tree plantation drive and ended up creating a monthly green club in my college!”</p>
            <span>- Anjali, Chennai</span>
          </div>
          <div>
            <p>“Thanks to Evergreen, I found my passion for teaching kids in underprivileged schools.”</p>
            <span>- Ramesh, Pune</span>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className={styles.ctaBanner}>
        <h2>Ready to Make a Difference?</h2>
        <p>Join hands with thousands of changemakers today.</p>
        <Link to="/signup" className={styles.ctaLarge}>Join Evergreen Events</Link>
      </section>
    </div>
  );
};

export default Home;
