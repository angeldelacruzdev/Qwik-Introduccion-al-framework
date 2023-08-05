import { $, component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./login.css?inline";
import { Form, routeAction$, z, zod$ } from "@builder.io/qwik-city";

export const useLoginUserAction = routeAction$(
  (data, { cookie, redirect }) => {
    const { email, password } = data;
    console.log({ email, password });

    if (email === "angeldelacruzdev@gmail.com" && password === "admin123456") {
      cookie.set("jwt", "jwt_000012121a2s1d2a1d2a1d2a1d2a1da21da2s1d", {
        secure: true,
        path: "/",
      });
      redirect(302, "/");
    }

    return {
      success: false,
      jwt: null,
    };
  },
  zod$({
    email: z.string().email("El email no es valido."),
    password: z.string().min(6, "Minimo 6 caracteres."),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLoginUserAction();

  return (
    <Form action={action} class="login-form mt-5">
      <div class="relative">
        <input name="email" type="text" placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input name="password" type="password" placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button type="submit">Ingresar</button>
      </div>

      <p>
        {action.value?.success && (
          <code>Atenticado: Token = {action.value.jwt} </code>
        )}
      </p>

      <code>{JSON.stringify(action.value, undefined, 2)}</code>
    </Form>
  );
});
