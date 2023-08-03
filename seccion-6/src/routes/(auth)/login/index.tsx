import {
  $,
  component$,
  useComputed$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";

import styles from "./login.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const formState = useStore({
    email: "",
    password: "",
    formPosted: false,
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes("@")) return "";

    return "not-valid";
  });

  const passwordError = useComputed$(() => {
    if (formState.password.length >= 6) return "";

    return "not-valid";
  });

  const onSubmit = $(() => {
    formState.formPosted = true;
    const { email, password } = formState;
    console.log({ email, password });
  });

  return (
    <form onSubmit$={onSubmit} class="login-form" preventdefault:submit>
      <div class="relative">
        <input
          onInput$={(ev) =>
            (formState.email = (ev.target as HTMLInputElement).value)
          }
          name="email"
          type="text"
          class={formState.formPosted ? emailError.value : ""}
          placeholder="Email address"
        />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          onInput$={(ev) =>
            (formState.password = (ev.target as HTMLInputElement).value)
          }
          name="password"
          type="password"
          placeholder="Password"
          class={formState.formPosted ? passwordError.value : ""}
        />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <code>{JSON.stringify(formState, undefined, 2)}</code>
    </form>
  );
});
