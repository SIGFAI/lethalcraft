# LethalCraft

Minecraft inside Lethal Company: build, mine and fight the monsters with Minecraft gear, solo or with friends.

**LethalCraft is made by [ThatGuyTHD](https://github.com/ThatGuyTHD).** All credit for the mod goes to them. It is built on [chasmlol/SkyCraft](https://github.com/chasmlol/SkyCraft) by chasmlol.

- Original project: https://github.com/ThatGuyTHD/LethalCraft
- Report bugs and ask questions there: https://github.com/ThatGuyTHD/LethalCraft/issues
- Upstream release packaged here: [v0.2.4](https://github.com/ThatGuyTHD/LethalCraft/releases/tag/v0.2.4) (commit [`49c9a8a`](https://github.com/ThatGuyTHD/LethalCraft/tree/49c9a8a0a01eaa4e7722cd01100fbb9b7570c43c))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Lethal Company** ([Steam](https://store.steampowered.com/app/1966720/)): v81, Steam build 22825947 (tested by the author).
- **Minecraft**: Java Edition 26.3.
- Windows and the [SIGF app](https://sigf.ai). The app installs bepinex 5.4.23.5, fabric-loader 0.19.5, fabric-api 0.161.0+26.3 for you.

## Install

In the SIGF app, open **LethalCraft** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v0.2.4`](../../releases/tag/v0.2.4).

### How to play

- Lethal Company's moons and monsters, played as a Minecraft player: place and break blocks, open chests, craft and fight with Minecraft weapons and shields.
- Press Play: Minecraft starts hidden first, then Lethal Company. Host or join a crew as usual; Minecraft joins the host's world by itself.
- E uses Lethal Company prompts or Minecraft blocks, I opens the inventory, right click uses an item or raises a shield, F5 changes the camera.
- Tab switches to Lethal Company's own controls (hold Alt for a moment), F7 toggles the helmet overlay, F8 turns the bridge off and on.
- Each moon keeps its own builds and chests; your carried inventory travels with you, and your builds stay with the save slot.

### Good to know

- You need Lethal Company on Steam and Minecraft: Java Edition (Windows), plus a few GB of free RAM for the hidden Minecraft. Made for Lethal Company v81 (Steam build 22825947); a game update can break it.
- Experimental. Co-op: every player needs both games and this same version. Two players on one LAN were tested by the author; a real two-PC Steam session was not. Other mods can break it.
- Native Lethal Company terrain cannot be mined, and scripted monster kills still follow Lethal Company's rules. Damage of Minecraft weapons: BepInEx\config\local.lethalcraft.bridge.cfg.
- BepInEx 5.4.23.5 comes with the mod and Restore removes both. Your Lethal Company and Minecraft saves are kept. Beta: report bugs to the author on the upstream issue tracker with BepInEx\LogOutput.log.

## What this repository holds

1. The upstream source tree at tag `v0.2.4`, commit [`49c9a8a0a01eaa4e7722cd01100fbb9b7570c43c`](https://github.com/ThatGuyTHD/LethalCraft/tree/49c9a8a0a01eaa4e7722cd01100fbb9b7570c43c), every file unchanged (same git blobs). Upstream's own `README.md` is there, unchanged; GitHub shows this file (`.github/README.md`) first.
2. Added by SIGF in the same commit: this file, `THIRD-PARTY.md` (licenses and sources of the third-party files in the release), and `sigf/` (the scripts that built the release assets, for reference: they run inside the SIGF repository).
3. `mashup.json`, the SIGF app recipe (the next commit).
4. The release `v0.2.4` (its tag is the first commit):

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `BepInEx_win_x64_5.4.23.5.zip` | 639118 B | `82f9878551030f54657792c0740d9d51a09500eeae1fba21106b0c441e6732c4` | BepInEx 5.4.23.5 x64, the official build, unchanged (see THIRD-PARTY.md); unpacked into the Lethal Company folder. |
| `lethalcraft-lethal.zip` | 81269 B | `1579f59b430509f7e2b225d0f441063db18845def964f94c04810470ca963222` | upstream's `LethalCraft.dll` from release `v0.2.4`, unchanged (sha256 `88a5242f...533b`, as in upstream's SHA256SUMS.txt), with upstream's LICENSE and THIRD_PARTY_NOTICES under `BepInEx/plugins/LethalCraft/`, and ours: `BepInEx/config/BepInEx.cfg` with `HideManagerGameObject = true`, which the plugin requires; into the Lethal Company folder. |
| `lethalcraft.mrpack` | 274927 B | `1e09818433d551fe1bab5a334131911ca98c1bcd35f210251827088944d2cb3c` | the Minecraft side: upstream's `skycraft-0.2.4-lethalcraft.jar` (SkyCraft with LethalCraft's changes) unchanged, with LethalCraft's and SkyCraft's licenses, for Minecraft 26.3 with Fabric Loader 0.19.5; Fabric API 0.161.0+26.3 is a Modrinth download link, not stored here. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| LethalCraft (all of the upstream tree) | MIT, Copyright ThatGuyTHD; adapted from SkyCraft (MIT, chasmlol) | `LICENSE`, `THIRD_PARTY_NOTICES.md`, `licenses/` |
| BepInEx 5.4.23.5 and what its zip bundles (release asset) | MIT; UnityDoorstop LGPL-2.1 | `THIRD-PARTY.md` |
| Fabric API (downloaded from Modrinth by the app, not stored here) | Apache-2.0 | https://github.com/FabricMC/fabric |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes LethalCraft installable in one click, credited to ThatGuyTHD. If you are the author and want anything changed or taken down, open an issue here.
