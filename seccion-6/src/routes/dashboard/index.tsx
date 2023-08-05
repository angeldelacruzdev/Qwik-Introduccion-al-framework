import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
("");

export const useChackAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwtCookie = cookie.get("jwt");

  if (jwtCookie) {
    console.log("Cookie valido", jwtCookie);

    return;
  }


  redirect(302, "/")
});

export default component$(() => {
  return (
    <>
      <h3>Admin Dashboard</h3>
      <p>Esta ruta debe ser privada</p>
    </>
  );
});
