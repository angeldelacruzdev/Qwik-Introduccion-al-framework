import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
  pokemondId: number;
  showBackImage: boolean;
  isVisibleImage: boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>(
  "pokemon.game-contex"
);
