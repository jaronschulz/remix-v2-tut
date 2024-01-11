/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
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

const Movie = () => {
  const data: any = useLoaderData();

  console.log(data);

  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        alt={data.title}
        className="h-[40vh] object-cover w-full rounded-lg shadow-lg"
      />
      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>
      <p className="text-center pt-2">
        {data.genres.map((genre: any) => genre.name).join(", ")}
      </p>
      <div className="flex gap-x-10 mt-10">
        <div className="flex flex-col gap-y-2">
          <p className="font-bold">Release Date</p>
          <p>{data.release_date}</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-bold">Runtime</p>
          <p>{data.runtime} minutes</p>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="font-bold">Rating</p>
          <p>{data.vote_average}</p>
        </div>

        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Movie;
