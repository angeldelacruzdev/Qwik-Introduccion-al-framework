import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead} from "@builder.io/qwik-city";
import { useNavigate } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";

export default component$(() => {
  const pokemondId = useSignal(1);
  const showBackImage = useSignal(true);
  const isVisibleImage = useSignal(true);
  const navigate = useNavigate();

  const changePokeminId = $((value: number) => {
    if (pokemondId.value + value <= 0) return;

    pokemondId.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemondId}</span>

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
        <button onClick$={() => changePokeminId(-1)} class="btn btn-primary">
          Anterior
        </button>
        <button onClick$={() => changePokeminId(+1)} class="btn btn-primary">
          Siguiente
        </button>
        <button
          onClick$={() => (showBackImage.value = !showBackImage.value)}
          class="btn btn-primary"
        >
          Voltear
        </button>
        <button
          onClick$={() => (isVisibleImage.value = !isVisibleImage.value)}
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
