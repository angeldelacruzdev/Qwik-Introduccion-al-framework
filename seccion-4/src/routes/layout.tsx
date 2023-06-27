import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from "@builder.io/qwik";

import Navbar from "~/components/shared/navbar/navbar";

import styles from "./styles.css?inline";
import { PokemonGameContext, PokemonListContext } from "~/context";
import { type PokemonGameState, type PokemonListState } from "~/context";

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    pokemondId: 1,
    showBackImage: false,
    isVisibleImage: true,
  });

  useContextProvider(PokemonGameContext, pokemonGame);

  const pokemonList = useStore<PokemonListState>({
    currentPage: 1,
    isLoading: false,
    pokemon: [],
  });

  useContextProvider(PokemonListContext, pokemonList);

  return (
    <>
      <Navbar />
      <main class="flex   flex-col items-center">
        <Slot />
      </main>
    </>
  );
});
