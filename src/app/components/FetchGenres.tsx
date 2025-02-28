import axios from "axios";
import * as cheerio from "cheerio";

const FetchGenres = async () => {
    try {
        const { data } = await axios.get("https://lk21.film/", { headers: { "User-Agent": "Mozilla/5.0" }, });
        const $ = cheerio.load(data);
        const validGenres = [
            "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
            "Documentary", "Drama", "Family", "Fantasy", "Film-Noir", "History",
            "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Sport",
            "Thriller", "War", "Western"
        ];

        const genres = $(".dropdown-menu a[rel='category']")
            .map((_, el) => {
                const name = $(el).text().trim();
                const url = $(el).attr("href")?.split("/").filter(Boolean).pop() || "#";
                return validGenres.includes(name) ? { name, url } : null;
            }) .get() .filter(Boolean);
        return genres;
    } catch { return []; }
};

export default FetchGenres;