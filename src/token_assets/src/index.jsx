import ReactDOM from "react-dom"
import React from "react"
import App from "./components/App"
import { AuthClient } from "../../../node_modules/@dfinity/auth-client/lib/cjs/index"

//Identity Anchor:2117261
//2117261 slab random prefer punch style october radar random water tackle ahead thunder guilt rack sentence talk clown cube swallow ginger once giant flag venture

const init = async () => {
  const authClient = await AuthClient.create()
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient)
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient)
      },
    })
  }
}

async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity()
  const userPrincipal = identity._principal.toString()
  ReactDOM.render(
    <App userPrincipal={userPrincipal} />,
    document.getElementById("root")
  )
}

init()
