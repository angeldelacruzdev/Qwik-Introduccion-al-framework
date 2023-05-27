import { component$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemondId = useSignal(1);

  const changePokeminId = $((value: number) => {
    if (pokemondId.value + value <= 0) return;

    pokemondId.value += value;
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemondId}</span>

      {/* TODO: crear imagen */}
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemondId.value}.png`}
        alt=""
      />

      <div class="flex gap-3 mt-2">
        <button onClick$={() => changePokeminId(-1)} class="btn btn-primary">
          Anterior
        </button>
        <button onClick$={() => changePokeminId(+1)} class="btn btn-primary">
          Siguientes
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
