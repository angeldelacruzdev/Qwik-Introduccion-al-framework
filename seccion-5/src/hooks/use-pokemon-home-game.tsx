import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonHomeGame = () => {
  const usePokemon = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (usePokemon.pokemondId + value <= 0) return;
    usePokemon.pokemondId += value;
  });

  const toggleShowBackImage = $(() => {
    usePokemon.showBackImage = !usePokemon.showBackImage;
  });

  const toggleVisibleImage = $(() => {
    usePokemon.isVisibleImage = !usePokemon.isVisibleImage;
  });

  return {
    pokemondId: useComputed$(() => usePokemon.pokemondId),
    showBackImage: useComputed$(() => usePokemon.showBackImage),
    isVisibleImage: useComputed$(() => usePokemon.isVisibleImage),

    nextPokemon: $(() => changePokemonId(+1)),
    prevPokemon: $(() => changePokemonId(-1)),

    toggleShowBackImage: toggleShowBackImage,
    toggleVisibleImage: toggleVisibleImage,
  };
};
