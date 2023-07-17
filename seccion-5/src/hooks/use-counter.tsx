import { $, useComputed$, useSignal } from "@builder.io/qwik";

export const useCounter = (initialValue: number) => {
  const counter = useSignal(initialValue);

  const increaseCounter = $(() => {
    counter.value++;
  });

  const decreaseCounter = $(() => {
    counter.value--;
  });

  return {
    value: useComputed$(() => counter.value),
    increaseCounter,
    decreaseCounter,
  };
};
