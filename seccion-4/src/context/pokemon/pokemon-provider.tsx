import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

import {
  PokemonGameContext,
  type PokemonGameState,
} from "./pokemon-game.context";

import {
  PokemonListContext,
  type PokemonListState,
} from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemondId: 1,
    showBackImage: false,
    isVisibleImage: true,
  });

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemon: [],
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    if (localStorage.getItem("pokemon-game")) {
      const {
        isVisibleImage = true,
        pokemondId = 1,
        showBackImage = false,
      } = JSON.parse(localStorage.getItem("pokemon-game")!) as PokemonGameState;

      pokemonGame.isVisibleImage = isVisibleImage;
      pokemonGame.pokemondId = pokemondId;
      pokemonGame.showBackImage = showBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [
      pokemonGame.isVisibleImage,
      pokemonGame.pokemondId,
      pokemonGame.showBackImage,
    ]);

    localStorage.setItem("pokemon-game", JSON.stringify(pokemonGame));
  });

  return <Slot />;
});
