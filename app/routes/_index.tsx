import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Tut 2024" },
    { name: "description", content: "Welcome to the tutorial" },
  ];
};

export const loader: LoaderFunction = async () => {
  const url = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmJlY2RmMzI1MWUxN2NlMTBjNWZkMjViZjgzNTJkMiIsInN1YiI6IjVhZWM5YzQ4OTI1MTQxMWQwNjAwMDBiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mtRzjOgtOq0_H30UMbpFfoS6NnEiFlevnFq2OW0cZM0",
      },
    },
  );

  return json(await url.json());
};

export default function Index() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = useLoaderData();
  const results = data.results;
  console.log(results);
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Top Trending Movies
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {results.map((movie: any) => (
            <div
              key={`FrameOf${movie.id}`}
              className="flex flex-col overflow-hidden bg-white rounded-lg shadow-sm "
            >
              <Link
                key={`LinkTo${movie.id}`}
                to={`/movie/${movie.id}/comments`}
                prefetch="intent"
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
              >
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="absolute inset-0 object-cover w-full h-full transition duration-200 group-hover:scale-110"
                  alt={movie.title}
                />
              </Link>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <h2 className="mb-2 text-lg font-semibold text-gray-800">
                  <Link
                    to={`/movie/${movie.id}/comments`}
                    prefetch="intent"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    {movie.title}
                  </Link>
                </h2>
                <p className="text-gray-500 line-clamp-3">{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
