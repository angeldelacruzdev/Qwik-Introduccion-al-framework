import { component$, useComputed$, useTask$ } from "@builder.io/qwik";
import {
  DocumentHead,
  Link,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { BasicPokemonInfo, PokemonListReponse } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    const currentValue = Number(query.get("offset") || 0);

    if (currentValue < 0) redirect(301, pathname);

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${currentValue}`
    );

    const data = (await response.json()) as PokemonListReponse;

    return data.results;
  }
);

export default component$(() => {
  const response = usePokemonList();
  const location = useLocation();
  const paramValue = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    const number = Number(offsetString.get("offset") || 0);

    return number;
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class=" ">Página actual: {paramValue}</span>
        <span class="mt-4">
          {location.isNavigating && (
            <>
              <span> Está cargando página</span>
            </>
          )}
        </span>
      </div>

      <div class="mt-10 flex gap-2">
        <Link
          href={`/pokemons/list-ssr/?offset=${paramValue.value - 10}`}
          class="btn btn-primary"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${paramValue.value + 10}`}
          class="btn btn-primary"
        >
          Siguientes
        </Link>
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
