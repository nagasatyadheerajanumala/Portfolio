import { useEffect, useState } from 'react';
import './Blog.css';

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const feedURL = encodeURIComponent('https://medium.com/feed/@dheerajanumala2688');
                const response = await fetch(`https://api.allorigins.win/get?url=${feedURL}`);
                const data = await response.json();

                const parser = new DOMParser();
                const xml = parser.parseFromString(data.contents, "text/xml");

                const items = Array.from(xml.querySelectorAll("item")).map(item => ({
                    title: item.querySelector("title")?.textContent ?? "",
                    link: item.querySelector("link")?.textContent ?? "",
                    pubDate: item.querySelector("pubDate")?.textContent ?? "",
                    contentSnippet: item.querySelector("description")?.textContent ?? ""
                }));

                setPosts(items);
            } catch (error) {
                console.error('Failed to fetch Medium feed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    return (
        <div className="blog-page">
            <h1>My Medium Blogs</h1>
            {loading && <p>Loading...</p>}
            {!loading && posts.length === 0 && <p>No blog posts found.</p>}
            <div className="blog-list">
                {posts.map((post, idx) => (
                    <div key={idx} className="blog-card">
                        <h2 className="blog-title">{post.title}</h2>
                        <p className="blog-date">{new Date(post.pubDate).toLocaleDateString()}</p>
                        <p className="blog-excerpt" dangerouslySetInnerHTML={{ __html: post.contentSnippet }} />
                        <a className="blog-link" href={post.link} target="_blank" rel="noreferrer">
                            Read on Medium
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}