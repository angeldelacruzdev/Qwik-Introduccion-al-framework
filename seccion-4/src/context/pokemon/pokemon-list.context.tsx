import { createContextId } from "@builder.io/qwik";
import { BasicPokemonInfo } from "~/interfaces";

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean;
  pokemon: BasicPokemonInfo[];
}

export const PokemonListContext = createContextId<PokemonListState>(
  "pokemon.list-contex"
);
