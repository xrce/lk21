import { FaPlay, FaInfoCircle } from "react-icons/fa";

const MovieBanner = ({ movie }) => (
    <div className="relative h-[500px] md:h-[700px] flex items-end pb-32 px-12 bg-cover bg-center" style={{ backgroundImage: `url(${movie.image})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80"></div>
        <div className="relative max-w-2xl">
            <h1 className="text-5xl font-bold">{movie.name}</h1>
            <p className="text-lg text-gray-300 mt-3">{movie.genre} • ⭐ {movie.rating}</p>
            <div className="mt-6 flex gap-4">
                <a href={new URL(movie.url).pathname} className="bg-white text-black px-6 py-3 rounded-lg text-lg font-bold flex items-center gap-2">
                    <FaPlay /> Play
                </a>
                <a href={movie.trailer} target="_blank" className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-bold flex items-center gap-2">
                    <FaInfoCircle /> More Info
                </a>
            </div>
        </div>
    </div>
);

export default MovieBanner;