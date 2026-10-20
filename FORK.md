# Dan Calendar

Installable fork of liamcain/obsidian-calendar-plugin, retaining the upstream MIT license.

- Plugin ID: `dan-calendar`; version: 1.5.11.
- Keep the original Calendar disabled. The view type and calendar events remain compatible with existing saved workspaces and integrations.
- Daily note folder, date format, and template come from the same settings used to create notes (Daily Notes, or enabled Periodic Notes).
- Only the exact configured path is indexed. Dated subfolders work when included in the date format (for example `YYYY/MM/DD`). Notes elsewhere are untouched.
- Weekly-note settings are read from this fork. A guarded Rollup transform adapts the two legacy dependency lookups that otherwise assume plugin ID `calendar`.

## Build and install

Use the checked-in Yarn lockfile: `npx --yes --package=yarn@1.22.22 yarn install --frozen-lockfile --ignore-scripts`.
Run `npm test -- --runInBand` and `npm run build`.
Copy `main.js`, `manifest.json`, and `styles.css` into `.obsidian/plugins/dan-calendar/`. To retain existing Calendar preferences, copy its `data.json` once, before enabling this fork.
Disable the original Calendar, then enable Dan Calendar. Mobile uses the same bundle.
The small `scripts/legacy-node.cjs` shim is build-only and accommodates the old source-map package on current Node versions.

## Updating

`upstream` points to the original repository; `origin` points to the maintained fork.
The `fix/daily-note-path-resolution` branch contains only the upstream path fix and tests; `dan-calendar` additionally contains the fork identity and build compatibility changes.
Fetch upstream, review the diff, incorporate relevant updates in a separate branch, run tests/build, and verify daily-note navigation before replacing the installed bundle. Do not copy a new upstream `main.js` over this fork: that would discard the fix and fork settings adaptation.
Community updates to the original `calendar` plugin cannot overwrite the `dan-calendar` directory. No automatic update or merge job is installed.
