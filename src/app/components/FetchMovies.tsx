import axios from "axios";
import * as cheerio from "cheerio";

const FetchMovies = async (url) => {
    try {
        const { data } = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const $ = cheerio.load(data);

        return $("script[type='application/ld+json']")
            .map((_, el) => {
                try {
                    const json = JSON.parse($(el).html()?.replace(/[ -\x1F\x7F]/g, "") || "{}");
                    return json["@type"] === "Movie"
                        ? {
                            name: json.name,
                            url: json.url,
                            trailer: json.hasPart?.potentialAction?.target[0]?.urlTemplate,
                            image: json.image?.startsWith("//") ? "https:" + json.image : json.image,
                            date: json.datePublished,
                            genre: json.genre?.join(", "),
                            rating: json.aggregateRating?.ratingValue || "N/A",
                        } : null;
                } catch { return null; }
            }) .get();
    } catch { return []; }
};

export default FetchMovies;