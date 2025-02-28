import axios from "axios";
import * as cheerio from "cheerio";
import { redirect } from "next/navigation";

export default async function WatchPage({ params }: { params: { movie: string } }) {
  const { data } = await axios.get(`https://tv.lk21official.cc/${params.movie}/`, { headers: { "User-Agent": "Mozilla/5.0" } });
  const $ = cheerio.load(data);
  const player = $("#loadProviders li a").first().attr("href")?.split("url=")[1];

  return player ? redirect(`https://playeriframe.lol/iframe.php?url=${decodeURIComponent(player)}`) : <h1 className="text-center text-red-500">No available players</h1>;
}
