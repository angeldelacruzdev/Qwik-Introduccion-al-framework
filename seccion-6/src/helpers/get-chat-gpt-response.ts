import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const getFunFactAboutPokemon = async (
  pokemon: string
): Promise<string> => {
  console.log(pokemon);

  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: `Escribe datos interesantes del pokémon ${pokemon}`,
    temperature: 1,

    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log({ response });

  return "";
};
