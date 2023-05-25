import { component$, useSignal, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const pokemondId = useSignal(1);

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemondId}</span>

      {/* TODO: crear imagen */}

      <div class="flex gap-3 mt-2">
        <button  class="btn btn-primary">Anterior</button>
        <button class="btn btn-primary">Siguientes</button>
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
