import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './FeaturedProjects.css';

export default function FeaturedProjects({ username = '', featured = [] }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            if (!featured.length) {
                setProjects([]);
                setLoading(false);
                return;
            }

            try {
                const enriched = await Promise.all(
                    featured.map(async (proj) => {
                        try {
                            // Fetch repo metadata
                            const repoRes = await fetch(`https://api.github.com/repos/${username}/${proj.repoName}`);
                            if (!repoRes.ok) throw new Error('API error');
                            const data = await repoRes.json();

                            // Fetch repo languages
                            let languages = [];
                            if (data.languages_url) {
                                const langRes = await fetch(data.languages_url);
                                if (langRes.ok) {
                                    const langs = await langRes.json();
                                    languages = Object.keys(langs);
                                }
                            }

                            return {
                                ...proj,
                                description: data.description || proj.description || '',
                                stars: data.stargazers_count || 0,
                                forks: data.forks_count || 0,
                                language: data.language || 'N/A',
                                updatedAt: data.updated_at || '',
                                languages
                            };
                        } catch (e) {
                            console.error(`Error loading ${proj.repoName}:`, e);
                            return proj;  // fallback to manual data
                        }
                    })
                );

                setProjects(enriched);
            } catch (error) {
                console.error('Error loading projects:', error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, [username, featured]);

    if (loading) {
        return (
            <div className="featured-projects">
                <p className="loading">Loading featured projects...</p>
            </div>
        );
    }

    return (
        <div className="featured-projects">
            <h2>⭐ Featured Projects</h2>
            {projects.length === 0 ? (
                <p className="empty">No featured projects available.</p>
            ) : (
                <div className="featured-list">
                    {projects.map((project) => (
                        <div key={project.repoName} className="featured-card">
                            <img
                                src={project.image || '/placeholder-project.png'}
                                alt={project.name}
                                className="featured-image"
                            />
                            <div className="featured-content">
                                <h3>{project.name}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="featured-meta">
                                    <span>⭐ {project.stars}</span>
                                    <span>🍴 {project.forks}</span>
                                </div>

                                {project.languages && project.languages.length > 0 && (
                                    <div className="languages">
                                        {project.languages.map((lang) => (
                                            <span key={lang} className="language-tag">{lang}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="featured-links">
                                    <Link
                                        to={`/projects/${project.repoName}`}
                                        className="button preview"
                                    >
                                        👁️ Preview
                                    </Link>
                                    <a
                                        href={`https://github.com/${username}/${project.repoName}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="button github"
                                    >
                                        🐙 GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}