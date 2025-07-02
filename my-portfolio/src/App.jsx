import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';

import './App.css';

const GITHUB_USERNAME = 'nagasatyadheerajanumala';  // <-- put your actual GitHub username here

export default function App() {
    return (
        <BrowserRouter basename = "/Portfolio">
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/Portfolio" element={<Home />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/projects" element={<Projects username={GITHUB_USERNAME} />} />
                    <Route path="/projects/:name" element={<ProjectDetail username={GITHUB_USERNAME} />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}