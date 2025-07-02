import './Resume.css';

export default function Resume() {
    return (
        <div className="resume-page">
            <header className="resume-hero">
                <div className="resume-hero-content">
                    <h1>📄 My Resume</h1>
                    <p>Browse my professional experience, projects, and skills in detail below.</p>
                    <a
                        href="/resume.pdf"
                        className="download-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ⬇️ Download PDF
                    </a>
                </div>
            </header>

            <div className="resume-container">
                <iframe
                    title="Dheeraj's Resume"
                    src="/resume.pdf"
                    frameBorder="0"
                />
            </div>
        </div>
    );
}