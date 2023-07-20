import {
  $,
  component$,
  useComputed$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { Modal } from "~/components/shared";
import { getSmallPokemons } from "~/helpers/get-pokemons";
import type { BasicPokemonInfo } from "~/interfaces";

export const usePokemonList = routeLoader$<BasicPokemonInfo[]>(
  async ({ query, redirect, pathname }) => {
    const currentValue = Number(query.get("offset") || 0);

    if (currentValue < 0) redirect(301, pathname);

    return await getSmallPokemons(currentValue);
  }
);

export default component$(() => {
  const response = usePokemonList();
  const location = useLocation();
  const modalVisible = useSignal(false);
  const modalPokemonStore = useStore({
    id: "",
    name: "",
  });

  const paramValue = useComputed$<number>(() => {
    const offsetString = new URLSearchParams(location.url.search);
    const number = Number(offsetString.get("offset") || 0);

    return number;
  });

  //Modal Functions
  const showModal = $((id: string, name: string) => {
    modalPokemonStore.id = id;
    modalPokemonStore.name = name;

    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span class=" ">Página actual: {paramValue}</span>
        <span class="mt-4">
          {location.isNavigating && (
            <>
              <span> Está cargando página</span>
            </>
          )}
        </span>
      </div>

      <div class="mt-10 flex gap-2">
        <Link
          href={`/pokemons/list-ssr/?offset=${paramValue.value - 10}`}
          class="btn btn-primary"
        >
          Anteriores
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${paramValue.value + 10}`}
          class="btn btn-primary"
        >
          Siguientes
        </Link>
      </div>

      <div class="grid grid-cols-6  gap-4 mt-5">
        {response.value.map(({ name, id }) => (
          <div
            key={name}
            onClick$={() => showModal(id, name)}
            class="m-5 flex flex-col justify-center items-center"
          >
            <PokemonImage id={+id} backIimage={false} isVisible />
            <span class="capitalize">{name}</span>
          </div>
        ))}
      </div>
      <Modal showModal={modalVisible.value} closeFn={closeModal} size="lg">
        <div q:slot="title" class="font-bold">
          {modalPokemonStore.name}
        </div>
        <div class="flex flex-col justify-center items-center" q:slot="content">
          <PokemonImage id={+modalPokemonStore.id} isVisible={true} backIimage />
          <span>Preguntale a CHATGPT</span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: "List SSR",
};
