import './Experience.css';

export default function Experience() {
    const timelineData = [
        {
            type: 'education',
            date: 'Aug 2023 – May 2025',
            title: 'Rutgers, The State University of New Jersey',
            subtitle: 'Master of Science in Statistics',
            bullets: [
                'New Brunswick, NJ, USA',
                'Advanced coursework in statistical modeling, data analysis, and research methodologies.'
            ],
            sortDate: '2025-05'
        },
        {
            type: 'experience',
            date: 'Sep 2025 – Present',
            title: 'Syndnet',
            subtitle: 'Lead Software Engineer',
            bullets: [
                'Improved backend scalability and query efficiency by designing FastAPI-PostgreSQL/PostGIS schemas and optimizing asynchronous ORM operations for property data.',
                'Accelerated property intelligence generation by integrating ATTOM and OpenAI APIs through RAG-based retrieval, reducing manual data aggregation time.',
                'Increased data accuracy and ranking precision by building a property scoring engine (1-100) using ATTOM and GIS overlays filtered by user buy-boxes.'
            ],
            sortDate: '2025-09'
        },
        {
            type: 'experience',
            date: 'Aug 2024 – Apr 2025',
            title: 'VerosAI',
            subtitle: 'Founding Engineer',
            bullets: [
                'Designed a highly scalable backend system for seamless data migration to SAP S4/HANA cloud, ensuring data integrity through enterprise-grade validation, AI-powered anomaly detection, and regulatory compliance.',
                'Enhanced ETL workflows using multithreading and parallel processing, achieving a 35% performance gain and halving overall processing time to support real-time analytics.',
                'Delivered secure REST APIs with AES encryption, SHA-256 hashing, and OAuth 2.0, safeguarding data confidentiality while maintaining system uptime with zero security breaches.'
            ],
            sortDate: '2024-08'
        },
        {
            type: 'experience',
            date: 'Oct 2022 – Jun 2023',
            title: 'Joyride Games',
            subtitle: 'Software Engineer',
            bullets: [
                'Enabled 100K+ secure digital wallet transactions per day by engineering a payment gateway with high-throughput APIs and a scalable relational database backend.',
                'Reduced payment errors and ensured transactional integrity under peak load by implementing concurrency-safe credit/debit flows with distributed locking.',
                'Improved customer security and trust by designing a role-based access system with short-lived tokens, refresh flows, and fine-grained session controls.',
                'Protected internal services from misuse and abuse by delivering secure APIs with rate limiting, token introspection, and controlled partner access.',
                'Increased transparency for customers and operations teams by developing a real-time analytics dashboard to visualize wallet usage, transaction history, and balances.'
            ],
            sortDate: '2023-06'
        },
        {
            type: 'experience',
            date: 'Jul 2021 – Aug 2022',
            title: 'Amazon',
            subtitle: 'Software Engineer',
            bullets: [
                'Reduced invoices search latency for real-time queries by designing and implementing optimized JDBC operations with feature toggles, improving performance and responsiveness for end users.',
                'Streamlined monitoring and validation of large invoice batches by integrating with 120+ APIs, enabling faster error detection and resolution at scale.',
                'Enhanced system reliability and audit accuracy by contributing additional fields to the invoice header, improving data completeness for compliance checks.',
                'Accelerated invoice data retrieval and validation by integrating advanced search algorithms, cutting query times and boosting operational efficiency.',
                'Modernized the TIPS UI to version 2.0 by leading multiple feature improvements, improving performance and user experience for business stakeholders.'
            ],
            sortDate: '2022-08'
        },
        {
            type: 'education',
            date: 'Jul 2016 – May 2021',
            title: 'Indian Institute of Technology, Kharagpur',
            subtitle: 'Dual Degree (B-Tech + M-Tech), Engineering',
            bullets: [
                'Focused on core engineering principles, research projects, and internships.',
                'Built a strong foundation for software development and problem-solving.',
                'Completed courses in algorithms, systems design, and applied machine learning.'
            ],
            sortDate: '2021-05'
        }
    ];

    const sortedData = timelineData.sort((a, b) => (a.sortDate < b.sortDate ? 1 : -1));

    return (
        <div className="timeline-container">
            <h2 className="timeline-title">My Experience & Education</h2>
            <div className="timeline">
                {sortedData.map((item, index) => (
                    <div key={index} className={`timeline-item ${item.type} ${index % 2 === 0 ? 'left' : 'right'}`}>
                        <div className="timeline-content">
                            <span className="timeline-date">{item.date}</span>
                            <h3 className="timeline-heading">{item.title}</h3>
                            <h4 className="timeline-subtitle">{item.subtitle}</h4>
                            <ul className="timeline-bullets">
                                {item.bullets.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                <div className="timeline-line"></div>
            </div>
        </div>
    );
}