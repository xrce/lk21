import { FaFilm, FaSearch, FaHome, FaCalendarAlt, FaGithub } from "react-icons/fa";

const SideMenu = () => (
    <aside className="fixed top-0 left-0 h-full w-16 bg-black flex flex-col items-center py-6 gap-6">
        <a href="/"><FaHome className="text-2xl text-gray-400 hover:text-white cursor-pointer transition" /></a>
        <a href="/search"><FaSearch className="text-2xl text-gray-400 hover:text-white cursor-pointer transition" /></a>
        <a href="https://github.com/xrce/lk21"><FaGithub className="text-2xl text-gray-400 hover:text-white cursor-pointer transition" /></a>
    </aside>
);

export default SideMenu;