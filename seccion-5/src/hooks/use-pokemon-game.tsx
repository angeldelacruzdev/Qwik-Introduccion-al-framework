import { useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  return {
    pokemondId: useComputed$(() => pokemonGame.pokemondId),
    showBackImage: useComputed$(() => pokemonGame.showBackImage),
    isVisibleImage: useComputed$(() => pokemonGame.isVisibleImage),
  };
};
