import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import autoPreprocess from "svelte-preprocess";
import { env } from "process";

export default {
  input: "src/main.ts",
  output: {
    format: "cjs",
    file: "main.js",
    exports: "default",
  },
  external: ["obsidian", "fs", "os", "path"],
  plugins: [
    {
      name: "fork-plugin-settings",
      transform(code, id) {
        if (!id.includes("obsidian-daily-notes-interface/dist/main.js")) return null;
        const calls = code.match(/getPlugin\("calendar"\)/g) || [];
        if (calls.length !== 2) throw new Error("Review Calendar settings lookups after updating the daily-notes interface");
        return { code: code.replace(/getPlugin\("calendar"\)/g, 'getPlugin("dan-calendar")'), map: null };
      },
    },
    svelte({
      emitCss: false,
      preprocess: autoPreprocess(),
    }),
    typescript({ sourceMap: env.env === "DEV" }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs({
      include: "node_modules/**",
    }),
  ],
};
