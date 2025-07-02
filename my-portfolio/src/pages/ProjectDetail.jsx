import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './ProjectDetail.css';

const username = 'nagasatyadheerajanumala';

export default function ProjectDetail() {
    const { name } = useParams();
    const [readme, setReadme] = useState('');
    const [loadingReadme, setLoadingReadme] = useState(true);
    const [readmeError, setReadmeError] = useState(false);

    const [repoTree, setRepoTree] = useState([]);
    const [loadingTree, setLoadingTree] = useState(true);
    const [treeError, setTreeError] = useState(false);

    // Fetch README
    useEffect(() => {
        async function fetchReadme() {
            setLoadingReadme(true);
            setReadmeError(false);
            try {
                const res = await fetch(`https://raw.githubusercontent.com/${username}/${name}/main/README.md`);
                if (!res.ok) throw new Error('README not found');
                const text = await res.text();
                setReadme(text);
            } catch (err) {
                setReadmeError(true);
            } finally {
                setLoadingReadme(false);
            }
        }
        fetchReadme();
    }, [name]);

    // Fetch repo tree
    useEffect(() => {
        async function fetchRoot() {
            setLoadingTree(true);
            setTreeError(false);
            try {
                const contents = await fetchDirectoryContents(username, name, '');
                setRepoTree(contents);
            } catch (err) {
                console.error(err);
                setTreeError(true);
            } finally {
                setLoadingTree(false);
            }
        }
        fetchRoot();
    }, [name]);

    // Helper to fetch any directory
    async function fetchDirectoryContents(owner, repo, path = '') {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
        if (!res.ok) throw new Error('Failed to fetch contents');
        return res.json();
    }

    // Recursively render the tree
    function FileTree({ items, depth = 0 }) {
        return (
            <div className="file-tree">
                {items.map(item => (
                    <div key={item.path} style={{ paddingLeft: `${depth * 20}px` }}>
                        {item.type === 'dir' ? (
                            <details>
                                <summary>📁 {item.name}</summary>
                                <Subdirectory owner={username} repo={name} path={item.path} depth={depth + 1} />
                            </details>
                        ) : (
                            <span>📄 {item.name}</span>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    // Loads subdirectories on expand
    function Subdirectory({ owner, repo, path, depth }) {
        const [contents, setContents] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);

        useEffect(() => {
            fetchDirectoryContents(owner, repo, path)
                .then(data => setContents(data))
                .catch(() => setError(true))
                .finally(() => setLoading(false));
        }, [owner, repo, path]);

        if (loading) return <div style={{ paddingLeft: `${depth * 20}px` }}>Loading...</div>;
        if (error) return <div style={{ paddingLeft: `${depth * 20}px` }}>Error loading contents</div>;

        return <FileTree items={contents} depth={depth} />;
    }

    return (
        <div className="project-detail">
            <Link to="/projects" className="back-link">← Back to Projects</Link>
            <h1>{name}</h1>

            <section className="structure-section">
                <h2>📂 Repository Structure</h2>
                {loadingTree && <p>Loading repository tree...</p>}
                {treeError && <p className="error">Error loading repository structure.</p>}
                {!loadingTree && !treeError && <FileTree items={repoTree} />}
            </section>

            <section className="readme-section">
                <h2>📖 README</h2>
                {loadingReadme && <p>Loading README...</p>}
                {!loadingReadme && readmeError && (
                    <div className="error-box">
                        <h3>README not found</h3>
                        <p>Check it on <a href={`https://github.com/${username}/${name}`} target="_blank" rel="noreferrer">GitHub</a>.</p>
                    </div>
                )}
                {!loadingReadme && !readmeError && (
                    <div className="markdown-body">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
                    </div>
                )}
            </section>

            <a className="github-link" href={`https://github.com/${username}/${name}`} target="_blank" rel="noreferrer">
                View on GitHub
            </a>
        </div>
    );
}