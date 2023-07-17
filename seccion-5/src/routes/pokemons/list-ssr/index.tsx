import { component$, useComputed$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-pokemons";
import type { BasicPokemonInfo } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    const currentValue = Number(query.get("offset") || 0);

    if (currentValue < 0) redirect(301, pathname);

    return await getSmallPokemons(currentValue);
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
        {response.value.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={+id} backIimage={false} isVisible/>
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
