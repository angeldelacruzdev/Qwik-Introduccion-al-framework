import { component$, useTask$ } from "@builder.io/qwik";
import { DocumentHead, Link, routeLoader$ } from "@builder.io/qwik-city";

export const usePokemonList = routeLoader$(async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=10`
  );

  const data = await response.json();

  return data;
});

export default component$(() => {
  const response = usePokemonList();

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class=" ">Página actual</span>
        <span class=" ">Está cargando página: xxxx</span>
      </div>

      <div class="mt-10 flex gap-2">
        <Link class="btn btn-primary">Anteriores</Link>
        <Link class="btn btn-primary">Siguientes</Link>
      </div>

      <div class="grid grid-cols-6  gap-4 mt-5">
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
        <div class="m-5 flex flex-col justify-center items-center">Pokemon</div>
      </div>

      <div>{JSON.stringify(response)}</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
