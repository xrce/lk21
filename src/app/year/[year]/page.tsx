import { randomInt } from "crypto";
import MovieCarousel from "@/app/components/MovieCarousel";
import FetchMovies from "@/app/components/FetchMovies";
import SideMenu from "@/app/components/SideMenu";
import MovieBanner from "@/app/components/MovieBanner";

export default async function HomePage({ params }: { params: { year: string } }) {
    const { year } = await Promise.resolve(params);
    const Movies = await FetchMovies(`https://lk21.film/year/${year}/`);
    const randomMovie = Movies.length > 0 ? Movies[randomInt(Movies.length)] : null;
    return (
        <div className="min-h-screen bg-[#141414] text-white font-sans">
            <SideMenu />
            <main className="ml-16 pb-20">
                {randomMovie && <MovieBanner movie={randomMovie} />}
                <MovieCarousel title={`Movies released on ${year}`} movies={Movies} />
            </main>
        </div>
    );
}
