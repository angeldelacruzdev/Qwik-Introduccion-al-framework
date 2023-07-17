import type { BasicPokemonInfo, PokemonListReponse } from "~/interfaces";

export const getSmallPokemons = async (
  currentValue: number = 0,
  limit: number = 10
): Promise<BasicPokemonInfo[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentValue}`
  );

  const data = (await response.json()) as PokemonListReponse;

  return data.results.map(({ url, name }) => {
    const segments = url.split("/");

    const id = segments.at(-2)!;

    return {
      id,
      name,
      url,
    };
  });
};
