import { component$ } from "@builder.io/qwik";
import { useCounter } from "~/hooks/use-counter";

export default component$(() => {
  const { value, increaseCounter, decreaseCounter } = useCounter(5);

  return (
    <>
      <span class="text-2xl">Counter</span>
      <span class="text-4xl">{value.value}</span>

      <div class="flex flex-row gap-2  mt-2">
        <button onClick$={increaseCounter} class="btn btn-primary">
          +1
        </button>
        <button onClick$={decreaseCounter} class="btn btn-primary">
          -1
        </button>
      </div>
    </>
  );
});
