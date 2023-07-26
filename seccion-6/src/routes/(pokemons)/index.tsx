import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { usePokemonHomeGame } from "~/hooks/use-pokemon-home-game";

export default component$(() => {
  const navigate = useNavigate();

  const {
    isVisibleImage,
    showBackImage,
    pokemondId,
    nextPokemon,
    prevPokemon,
    toggleShowBackImage,
    toggleVisibleImage,
  } = usePokemonHomeGame();
  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemondId.value}</span>

      <div
        class="cursor-pointer"
        onClick$={async () =>
          await navigate(`/pokemons/pokemon/${pokemondId.value}/`)
        }
      >
        <PokemonImage
          id={pokemondId.value}
          backIimage={showBackImage.value}
          isVisible={isVisibleImage.value}
        />
      </div>

      <div class="flex gap-3 mt-2">
        <button onClick$={prevPokemon} class="btn btn-primary">
          Anterior
        </button>
        <button onClick$={nextPokemon} class="btn btn-primary">
          Siguiente
        </button>
        <button onClick$={toggleShowBackImage} class="btn btn-primary">
          Voltear
        </button>
        <button onClick$={toggleVisibleImage} class="btn btn-primary">
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
