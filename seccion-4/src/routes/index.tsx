import { component$, useSignal, $, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonGameContext } from "~/context";

export default component$(() => {
  const usePokemon = useContext(PokemonGameContext);

  const navigate = useNavigate();

  const changePokeminId = $((value: number) => {
    if (usePokemon.pokemondId + value <= 0) return;

    usePokemon.pokemondId += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{usePokemon.pokemondId}</span>

      <div
        class="cursor-pointer"
        onClick$={async () =>
          await navigate(`/pokemons/pokemon/${usePokemon.pokemondId}/`)
        }
      >
        <PokemonImage
          id={usePokemon.pokemondId}
          backIimage={usePokemon.showBackImage}
          isVisible={usePokemon.isVisibleImage}
        />
      </div>

      <div class="flex gap-3 mt-2">
        <button onClick$={() => changePokeminId(-1)} class="btn btn-primary">
          Anterior
        </button>
        <button onClick$={() => changePokeminId(+1)} class="btn btn-primary">
          Siguiente
        </button>
        <button
          onClick$={() =>
            (usePokemon.showBackImage = !usePokemon.showBackImage)
          }
          class="btn btn-primary"
        >
          Voltear
        </button>
        <button
          onClick$={() =>
            (usePokemon.isVisibleImage = !usePokemon.isVisibleImage)
          }
          class="btn btn-primary"
        >
          Revelar
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Poke Qwik",
  meta: [
    {
      name: "description",
      content: "Mi primera página en Qwik.",
    },
  ],
};
