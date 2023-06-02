import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    redirect(301, "/");
  }

  if (id <= 0) {
    redirect(301, "/");
  }

  return id;
});

export default component$(() => {
  const pokemonId = usePokemonId();

  return (
    <>
      <span class="text-2xl"> Pokemon por ID: {pokemonId} </span>

      <PokemonImage
        id={pokemonId.value}
        backIimage={false}
        size={350}
        isVisible
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon",
};
