import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import FeaturedProjects from '../components/FeaturedProjects';
import './Projects.css';

export default function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    const username = "nagasatyadheerajanumala";

    const featured = useMemo(() => [
        {
            repoName: "PulseTrack",
            name: "PulseTrack",
            image: `${process.env.PUBLIC_URL}/images/pulsetrack-banner.png`,
        },
        {
            repoName: "ToDO_Backend",
            name: "Todo",
            image: `${process.env.PUBLIC_URL}/images/todo-banner.png`,
        },
        {
            repoName: "Tweet-vault",
            name: "TweetVault",
            image: `${process.env.PUBLIC_URL}/images/tweetvault-banner.png`,
        }
    ], []);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos`);
                const data = await res.json();

                if (!Array.isArray(data)) {
                    console.error("Unexpected data:", data);
                    setRepos([]);
                    return;
                }

                const featuredNames = new Set(featured.map(f => f.repoName.trim().toLowerCase()));
                const filtered = data.filter(repo =>
                    !featuredNames.has(repo.name.trim().toLowerCase())
                );
                setRepos(filtered);
            } catch (err) {
                console.error("Error fetching repos:", err);
                setRepos([]);
            } finally {
                setLoading(false);
            }
        }

        fetchRepos();
    }, [username, featured]);

    return (
        <div className="projects-page">
            <header className="projects-header">
                <h1>My Projects</h1>
                <p>Explore my featured work and other open-source repositories.</p>
            </header>

            <section className="featured-section">
                <FeaturedProjects username={username} featured={featured} />
            </section>

            <section className="other-section">
                <h2 className="section-title">📂 Other Repositories</h2>
                {loading && <p className="loading-message">Loading projects...</p>}

                {!loading && repos.length === 0 && (
                    <p className="empty-message">No other repositories found.</p>
                )}

                <div className="other-repos">
                    {Array.isArray(repos) && repos.length > 0 ? (
                        repos.map(repo => (
                            <div key={repo.id} className="repo-card">
                                <h3 className="repo-title">{repo.name}</h3>
                                <p className="repo-description">
                                    {repo.description || 'No description provided.'}
                                </p>
                                <a
                                    className="repo-link"
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="empty-message">No other repositories found.</p>
                    )}
                </div>
            </section>
        </div>
    );
}