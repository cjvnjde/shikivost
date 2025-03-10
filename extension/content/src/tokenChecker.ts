import { Api } from "./api";

const api = Api.create();

export async function tokenChecker() {
  const url = new URL(window.location.href);

  if (url.searchParams.has("code")) {
    const code = url.searchParams.get("code");
    url.searchParams.delete("code");

    history.replaceState(null, "", url.toString());
    await api.fetchTokens(code);
  }
}
