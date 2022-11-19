import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

// ============================skills============================
import SkillPage from "./Pages/Skills/SkillPage";
import AddSkills from "./Pages/Skills/AddSkills"
import EditSkill from "./Pages/Skills/EditSkill";
// ============================projects============================
import ProjectPage from "./Pages/Projects/ProjectPage"
import AddProjects from "./Pages/Projects/AddProjects"
import EditProject from "./Pages/Projects/EditProject";
// ============================experiences============================
import ExperiencePage from "./Pages/Experiences/ExperiencePage"
import AddExperience from "./Pages/Experiences/AddExperience"
import EditExperience from "./Pages/Experiences/EditExperience";
// ============================etc============================
import MainMenu from "./Pages/MainMenu";
import NotFound from "./Pages/NotFound"

function App() {
    return (
        <BrowserRouter>
            <div className="App"></div>
            <Routes>
                {/* ============================skills============================ */}
                <Route exact path ="/skills" element = {<SkillPage/>}/>
                <Route exact path ="/skills/add" element = {<AddSkills/>}/>
                <Route exact path ="/skills/edit" element = {<EditSkill/>}/>
                {/* ============================projects============================ */}
                <Route exact path ="/projects" element = {<ProjectPage/>}/>
                <Route exact path ="/projects/add" element = {<AddProjects/>}/>
                <Route exact path ="/projects/edit" element = {<EditProject/>}/>
                {/* ============================experiences============================ */}
                <Route exact path ="/experiences" element = {<ExperiencePage/>}/>
                <Route exact path ="/experiences/add" element = {<AddExperience/>}/>
                <Route exact path ="/experiences/edit" element = {<EditExperience/>}/>
                {/* ============================etc============================ */}
                <Route exact path="/" element={<MainMenu />} />
                <Route exact path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
