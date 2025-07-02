import React from 'react';
import './Timeline.css';

export default function TimelineItem({ date, title, subtitle, description, side }) {
    return (
        <div className={`timeline-item ${side}`}>
            <div className="content">
                <span className="date">{date}</span>
                <h3 className="title">{title}</h3>
                <h4 className="subtitle">{subtitle}</h4>
                <p className="description">{description}</p>
            </div>
        </div>
    );
}