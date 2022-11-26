import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// ============================login============================
import Login from "./Pages/Login";


// ============================portfolio site management============================
// ======================Main menu======================
import MainMenu from "./Pages/PortfolioManagement/MainMenu";

// ======================skills======================
import SkillPage from "./Pages/PortfolioManagement/Skills/SkillPage";
import AddSkills from "./Pages/PortfolioManagement/Skills/AddSkills";
import EditSkill from "./Pages/PortfolioManagement/Skills/EditSkill";
// ======================projects======================
import ProjectPage from "./Pages/PortfolioManagement/Projects/ProjectPage"
import AddProjects from "./Pages/PortfolioManagement/Projects/AddProjects"
import EditProject from "./Pages/PortfolioManagement/Projects/EditProject";
// ======================experiences======================
import ExperiencePage from "./Pages/PortfolioManagement/Experiences/ExperiencePage"
import AddExperience from "./Pages/PortfolioManagement/Experiences/AddExperience"
import ViewExperience from "./Pages/PortfolioManagement/Experiences/ViewExperience";


// ============================redirect============================
import NotFound from "./Pages/RedirectPages/NotFound"
import Redirection from "./Pages/RedirectPages/Redirection";

function App() {
    return (
        <BrowserRouter>
            <div className="App"></div>
            <Routes>
                {/* ============================login============================ */}
                <Route exact path ="/login" element = {<Login/>}/>

                {/* ============================very main menu============================ */}
                <Route exact path="/home" element={<MainMenu />} />

                {/* ============================portfolio site management============================ */}
                 {/* ======================home====================== */}
                 <Route exact path="/home/portfolio" element={<MainMenu />} />
                {/* ======================skills====================== */}
                <Route exact path ="/portfolio/skills" element = {<SkillPage/>}/>
                <Route exact path ="/portfolio/skills/add" element = {<AddSkills/>}/>
                <Route exact path ="/portfolio/skills/:skillId" element = {<EditSkill/>}/>
                {/* ======================projects====================== */}
                <Route exact path ="/portfolio/projects" element = {<ProjectPage/>}/>
                <Route exact path ="/portfolio/projects/add" element = {<AddProjects/>}/>
                <Route exact path ="/portfolio/projects/:projectId" element = {<EditProject/>}/>
                {/* ======================experiences====================== */}
                <Route exact path ="/portfolio/experience" element = {<ExperiencePage/>}/>
                <Route exact path ="/portfolio/experience/add" element = {<AddExperience/>}/>
                <Route exact path ="/portfolio/experience/:experienceId" element = {<ViewExperience/>}/>
                {/* ======================etc====================== */}
                <Route exact path="/" element={<Redirection />} />
                <Route exact path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
