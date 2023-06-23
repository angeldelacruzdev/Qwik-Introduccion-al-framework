import {
  component$,
  Slot,
  useContextProvider,
  useStore,
  useStyles$,
} from "@builder.io/qwik";

import Navbar from "~/components/shared/navbar/navbar";

import styles from "./styles.css?inline";
import { PokemonGameContext, PokemonGameState } from "~/context";

export default component$(() => {
  useStyles$(styles);

  const pokemonGame = useStore<PokemonGameState>({
    pokemondId: 1,
    showBackImage: false,
    isVisibleImage: true,
  });

  useContextProvider(PokemonGameContext, pokemonGame);

  return (
    <>
      <Navbar />
      <main class="flex   flex-col items-center">
        <Slot />
      </main>
    </>
  );
});
