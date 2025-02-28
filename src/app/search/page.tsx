"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MovieCarousel from "@/app/components/MovieCarousel";
import FetchMovies from "@/app/components/FetchMovies";
import FetchGenres from "@/app/components/FetchGenres";
import FetchYears from "@/app/components/FetchYears";
import SideMenu from "@/app/components/SideMenu";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export default async function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const genres = await FetchGenres();
  const movieGenrePromises = genres.map((genre) => FetchMovies(`https://lk21.film/genre/${genre.url}`));
  const moviesByGenre = await Promise.all(movieGenrePromises);
  const years = await FetchYears();
  const movieYearPromises = years.map((year) => FetchMovies(`https://lk21.film/year/${year.url}`));
  const moviesByYear = await Promise.all(movieYearPromises);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans p-8 ml-8">
      <SideMenu />
      <h1 className="text-3xl font-bold mb-6 ml-10">Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6 ml-10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none"
          />
          <button type="submit" className="bg-red-600 px-4 py-2 rounded-lg text-white font-bold flex items-center gap-2">
            <FaSearch /> Search
          </button>
        </form>
      <h1 className="text-3xl font-bold mb-6 ml-10">Genre</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 ml-10">
        {genres.map((genre) => (
          <Link
            key={genre.url}
            href={`/genre/${genre.url}`}
            className="block bg-gray-700 p-3 rounded-lg hover:bg-gray-600 text-center"
          >
            {genre.name}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl font-bold mb-6 ml-10">Release</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 ml-10">
        {years.map((year) => (
          <Link
            key={year.url}
            href={`/year/${year.url}`}
            className="block bg-gray-700 p-3 rounded-lg hover:bg-gray-600 text-center"
          >
            {year.name}
          </Link>
        ))}
      </div>
      {genres.map((genre, index) => {
        const movies = moviesByGenre[index];
        return (
          <div key={genre.url} className="mb-12">
            <MovieCarousel title={genre.name} movies={movies} />
          </div>
        );
      })}
      {years.map((year, index) => {
        const movies = moviesByYear[index];
        return (
          <div key={year.url} className="mb-12">
            <MovieCarousel title={year.name} movies={movies} />
          </div>
        );
      })}
    </div>
    
  );
}
