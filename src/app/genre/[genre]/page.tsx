import { randomInt } from "crypto";
import MovieCarousel from "@/app/components/MovieCarousel";
import FetchMovies from "@/app/components/FetchMovies";
import SideMenu from "@/app/components/SideMenu";
import MovieBanner from "@/app/components/MovieBanner";

export default async function HomePage({ params }: { params: { genre: string } }) {
    const { genre } = await Promise.resolve(params);
    const Movies = await FetchMovies(`https://lk21.film/genre/${genre}/`);
    const randomMovie = Movies.length > 0 ? Movies[randomInt(Movies.length)] : null;
    return (
        <div className="min-h-screen bg-[#141414] text-white font-sans">
            <SideMenu />
            <main className="ml-16 pb-20">
                {randomMovie && <MovieBanner movie={randomMovie} />}
                <MovieCarousel title={`Movies categorized by ${genre}`} movies={Movies} />
            </main>
        </div>
    );
}
