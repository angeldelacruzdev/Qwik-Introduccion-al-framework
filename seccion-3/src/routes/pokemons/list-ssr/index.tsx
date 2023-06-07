import { component$, useTask$ } from "@builder.io/qwik";
import { DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";
import { BasicPokemonInfo, PokemonListReponse } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=20`
  );

  const data = (await response.json()) as PokemonListReponse;

  return data.results;
});

export default component$(() => {
  const response = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class=" ">Página actual</span>
        <span class=" ">Está cargando página: xxxx</span>
      </div>

      <div class="mt-10 flex gap-2">
        <Link class="btn btn-primary">Anteriores</Link>
        <Link class="btn btn-primary">Siguientes</Link>
      </div>

      <div class="grid grid-cols-6  gap-4 mt-5">
        {response.value.map(({ name, url }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
