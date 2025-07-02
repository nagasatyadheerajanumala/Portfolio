import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero fade-in">
                <div className="hero-overlay">
                    <h1>Hi, I'm Dheeraj 👋</h1>
                    <p className="tagline">
                        Code. Explore. Watch. Play.<br />
                        Let's build something amazing together.
                    </p>
                    <Link to="/contact" className="button primary">Let's Connect</Link>
                    <div className="scroll-down">↓ Scroll to explore ↓</div>
                </div>
                <div className="hero-circles">
                    <span className="circle"></span>
                    <span className="circle"></span>
                    <span className="circle"></span>
                </div>
            </section>

            {/* About Me Section */}
            <section className="about fade-in">
                <h2>About Me 🗣️</h2>
                <div className="about-content">
                    <img
                        src="/images/dheeraj-anumala.jpg"
                        alt="Dheeraj smiling with sunglasses"
                        className="profile-pic"
                    />
                    <p>
                        I'm a software engineer who loves building scalable systems, solving real-world problems,
                        and delivering clean, maintainable code.
                        <br /><br />
                        Beyond work, you'll find me traveling, watching great cinema, and playing cricket or hockey
                        with friends. I love learning, meeting people, and making great stories along the way.
                    </p>
                </div>
            </section>

            {/* Fun Facts Section */}
            <section className="fun-facts fade-in">
                <h2>Fun Facts About Me 🎯</h2>
                <div className="fun-facts-grid">
                    <div className="fun-fact cricket">
                        <span role="img" aria-label="Cricket">🏏</span>
                        <h3>Cricket</h3>
                        <p>Competitive player since school. Still love the game!</p>
                    </div>
                    <div className="fun-fact hockey">
                        <span role="img" aria-label="Hockey">🏒</span>
                        <h3>Hockey</h3>
                        <p>Weekend hockey sessions. Energy + teamwork = ❤️</p>
                    </div>
                    <div className="fun-fact film">
                        <span role="img" aria-label="Movies">🎥</span>
                        <h3>Film Buff</h3>
                        <p>From classics to blockbusters. Always happy to recommend!</p>
                    </div>
                    <div className="fun-fact travel">
                        <span role="img" aria-label="Travel">🌎</span>
                        <h3>Traveling</h3>
                        <p>Planning my next adventure. Culture, food, people.</p>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="skills fade-in">
                <h2>My Skills 💻</h2>
                <div className="skills-grid">
                    <span>Java</span>
                    <span>Spring Boot</span>
                    <span>React</span>
                    <span>Node.js</span>
                    <span>Python</span>
                    <span>SQL</span>
                    <span>NoSQL</span>
                    <span>AWS</span>
                    <span>Docker</span>
                    <span>Git</span>
                </div>
            </section>

            {/* Footer */}
            <footer className="fade-in">
                <p>© 2025 Dheeraj Anumala. Built with ❤️ using React.</p>
                <Link to="/contact">Contact Me</Link>
            </footer>

        </div>
    );
}