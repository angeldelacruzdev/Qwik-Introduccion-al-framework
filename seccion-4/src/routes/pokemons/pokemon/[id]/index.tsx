import { component$, useContext } from "@builder.io/qwik";
import {
  type DocumentHead,
  useLocation,
  routeLoader$,
} from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

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

  const pokemonGame = useContext(PokemonGameContext);

  return (
    <>
      <span class="text-2xl"> Pokemon por ID: {pokemonId} </span>

      <PokemonImage
        id={pokemonId.value}
        backIimage={pokemonGame.showBackImage}
        size={350}
        isVisible={pokemonGame.isVisibleImage}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Pokemon",
};
