/* eslint-disable qwik/jsx-img */
import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

type Props = {
  id: number;
  size?: number;
  backIimage?: boolean;
  isVisible?: boolean;
};

export const PokemonImage = component$(
  ({ id, backIimage, size, isVisible }: Props) => {
    const imageLoaded = useSignal(false);

    useTask$(({ track }) => {
      track(() => id);

      imageLoaded.value = false;
    });

    const imageUrl = useComputed$(() => {
      if (id === 0) return "";

      return backIimage
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`;
    });

    return (
      <div
        class="flex justify-center items-center transition-all"
        style={{ with: `${size}px`, heigth: `${size}px` }}
      >
        <span> {!imageLoaded.value && <span>Cargando..</span>}</span>
        <img
          src={imageUrl.value}
          alt=""
          onLoad$={() => {
            setTimeout(() => {
              imageLoaded.value = true;
            }, 100);
          }}
          class={[
            { hidden: !imageLoaded.value, "brightness-0": !isVisible },
            "transition-all",
          ]}
        />
      </div>
    );
  }
);
