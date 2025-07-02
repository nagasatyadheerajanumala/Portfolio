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
            date: 'Oct 2022 – Jan 2023',
            title: 'Joyride Games',
            subtitle: 'Software Engineer',
            bullets: [
                'Integrated a UPI payment system with concurrency-safe transaction flows for 500K+ users.',
                'Built and enhanced RESTful APIs to manage 5.8M+ game session records with improved scalability.',
                'Accelerated backend database access by over 40% via advanced indexing and SQL tuning.',
                'Architected a session tracking mechanism for real-time gameplay event visibility and audit readiness.'
            ],
            sortDate: '2023-01'
        },
        {
            type: 'experience',
            date: 'Jul 2021 – Aug 2022',
            title: 'Amazon',
            subtitle: 'Software Engineer',
            bullets: [
                'Reduced invoice query latency by 65% across 5M+ records with optimized microservices indexing.',
                'Improved invoice validation across 120+ endpoints using batch processing and streaming.',
                'Achieved 5x throughput by refactoring monolith into async event-driven services.',
                'Enabled safe daily deployments with feature flags and canary releases in CI/CD.',
                'Standardized observability with Prometheus and Grafana for 10+ teams.'
            ],
            sortDate: '2022-08'
        },
        {
            type: 'experience',
            date: 'Apr 2020 – Jul 2020',
            title: 'Agrii Prince',
            subtitle: 'Machine Learning Engineer',
            bullets: [
                'Built end-to-end chatbot using RASA and Dialogflow with support for native languages.',
                'Engineered a Streamlit dashboard to visualize metrics, detect drift, and monitor ML pipeline health.',
                'Trained and deployed classification models using spaCy and TensorFlow with 89% precision.'
            ],
            sortDate: '2020-07'
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