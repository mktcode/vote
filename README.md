# Phorum - DAO voting and execution

Phorum can be hosted by DAOs (or its community) to hold votes and transfer assets based on results, in a fully decentralized way.

## Distributed storage

As a DAO you don't need to run expensive infrastructure nor rely on third parties.
Proposals and votes are distributed among members,
making Phorum cheap to run and censorship resistent at the same time.

# Development

You need to run a [peerjs signaling server](https://github.com/peers/peerjs-server) to connect peers.

```sh
# Install peer
$ npm install peer -g
```

```sh
# Run signaling server with peer discover
$ peerjs --port 9000 --allow_discovery
```

No you can run the app.

```sh
$ npm run dev
```

Open the app in multiple browsers at `http://localhost:5173/`.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
