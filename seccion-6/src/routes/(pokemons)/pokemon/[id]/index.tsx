import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    redirect(301, "/");
  }

  if (id <= 0) {
    redirect(301, "/");
  }

  if (id > 1000) {
    redirect(301, "/");
  }

  return id;
});

export default component$(() => {
  const { isVisibleImage, pokemondId, showBackImage } = usePokemonGame();

  return (
    <>
      <span class="text-2xl"> Pokemon por ID: {pokemondId.value} </span>

      <PokemonImage
        id={pokemondId.value}
        backIimage={showBackImage.value}
        size={350}
        isVisible={isVisibleImage.value}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon",
};
