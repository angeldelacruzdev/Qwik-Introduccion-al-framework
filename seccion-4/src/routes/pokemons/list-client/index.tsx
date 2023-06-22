import {
  $,
  component$,
  useOnDocument,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { getSmallPokemons } from "~/helpers/get-pokemons";
import type { BasicPokemonInfo } from "~/interfaces";

interface PokemonState {
  currentPage: number;
  isLoading: boolean;
  pokemons: BasicPokemonInfo[];
}

export default component$(() => {
  const pokemonState = useStore<PokemonState>({
    currentPage: 0,
    isLoading: false,
    pokemons: [],
  });

  // useVisibleTask$(async ({ track }) => {
  //   track(() => pokemonState.currentPage);

  //   const pokemons = await getSmallPokemons(pokemonState.currentPage * 10);
  //   pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
  // });

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    pokemonState.isLoading = true;

    const pokemons = await getSmallPokemons(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];

    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $((event) => {
      console.log(event);
      const maxScroll = document.body.scrollHeight;

      const currentScroll = window.scrollY + window.innerHeight;

      console.log(currentScroll, maxScroll);

      if (currentScroll + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class=" ">Página actual: {pokemonState.currentPage}</span>
        <span class="mt-4">
          <span> Está cargando página</span>
        </span>
      </div>

      <div class="mt-10 flex gap-2">
        {/* <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary"
        >
          Anteriores
        </button> */}
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary"
        >
          Siguientes
        </button>
      </div>

      <div class="grid grid-cols-6  gap-4 mt-5">
        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={+id} backIimage isVisible />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List Client",
};
