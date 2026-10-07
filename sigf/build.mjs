// LethalCraft (ThatGuyTHD, MIT): Minecraft inside Lethal Company. A port of chasmlol's SkyCraft: a BepInEx 5 plugin in
// Lethal Company (LethalCraft.dll) plays the part of SkyCraft's Skyrim plugin and drives SkyCraft's Fabric mod with
// LethalCraft's changes (skycraft-0.2.4-lethalcraft.jar) over the shared memory Local\LethalCraft_v1, protocol 16.
// Rehosted on SIGFAI/lethalcraft (standard upstream fusion) from the plain release zip LethalCraft-0.2.4.zip (the
// author's Setup exe is never used): the DLL and the jar unchanged, with the official BepInEx 5 x64 build.
// BepInEx.cfg with `[Chainloader] HideManagerGameObject = true` is required by the plugin (upstream Install.ps1; BepInEx
// fills in the other keys on first start). Minecraft runs in the app's Prism instance, so upstream's launcher is not used.
//   node library/lethalcraft/build.mjs       (outputs: library/lib.mjs)
import { mrpack, resolveFabricApi, unzip } from '../../orchestrator/src/recipe.js';
import { BEPINEX, asset, card, dl, emit, pinned, player, zipAsset } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/ThatGuyTHD/LethalCraft', tag: 'v0.2.4', commit: '49c9a8a0a01eaa4e7722cd01100fbb9b7570c43c',
  license: 'MIT', authors: ['ThatGuyTHD', 'chasmlol'],
  zip: { file: 'LethalCraft-0.2.4.zip', sha256: 'bbabad6f9a30ff7887f5d6a17042a73d2818983f749fe83adbc176b43d9fb44e' }, // = GitHub digest, 2026-10-07
  dll: { path: 'mods/LethalCraft.dll', sha256: '88a5242f57d51be90fefbad3cc774bfcb88f8c02ea6ef35410ca7be3414c533b' }, // = upstream SHA256SUMS.txt
  jar: { path: 'mods/skycraft-0.2.4-lethalcraft.jar', sha256: '65c75f794c845e1f1589ce184b412fb49e91169ab1e8e8fa1a2ea89fb1e9340f' }, // = upstream SHA256SUMS.txt
};
const SKY = { repo: 'https://github.com/chasmlol/SkyCraft' };
const ID = 'lethalcraft', VERSION = '0.2.4', NAME = 'LethalCraft';
const MC = { mc: '26.3', loader: '0.19.5', fabricApi: '0.161.0+26.3', java: '25' }; // fabric/gradle.properties at the tag
const TAGLINE = 'Minecraft inside Lethal Company: build, mine and fight the monsters with Minecraft gear, solo or with friends.';
const BEPINEX_CFG = '[Chainloader]\r\nHideManagerGameObject = true\r\n';

const up = new Map(unzip(await pinned(`${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`, UP.zip.sha256)).map(e => [e.name.replace(/\\/g, '/'), e.data]));
for (const f of [UP.dll.path, UP.jar.path, 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'licenses/SkyCraft-LICENSE.txt']) if (!up.has(f)) throw new Error(`${UP.zip.file} has no ${f}`);
const bepinex = asset(BEPINEX.file, await pinned(BEPINEX.url, BEPINEX.sha256), { zipped: true });
const plugin = zipAsset(`${ID}-lethal.zip`, [
  { name: 'BepInEx/plugins/LethalCraft/LethalCraft.dll', data: up.get(UP.dll.path) },
  { name: 'BepInEx/plugins/LethalCraft/LICENSE.txt', data: up.get('LICENSE') },
  { name: 'BepInEx/plugins/LethalCraft/THIRD_PARTY_NOTICES.md', data: up.get('THIRD_PARTY_NOTICES.md') },
  { name: 'BepInEx/config/BepInEx.cfg', data: Buffer.from(BEPINEX_CFG) },
]);
if (!plugin.contents.some(c => c.path.endsWith('LethalCraft.dll') && c.sha256 === UP.dll.sha256)) throw new Error('LethalCraft.dll hash differs from the reviewed build');
const pack = async (offline) => {
  const fabricApi = offline ? null : await resolveFabricApi(MC.fabricApi, MC.mc);
  if (!offline && !fabricApi?.download) throw new Error(`Fabric API ${MC.fabricApi} not resolved on Modrinth`);
  return asset(`${ID}.mrpack`, mrpack({ name: NAME, summary: TAGLINE, versions: MC, versionId: VERSION, fabricApi,
    jars: [{ name: 'skycraft-0.2.4-lethalcraft.jar', data: up.get(UP.jar.path) }],
    extra: [
      { name: 'overrides/licenses/lethalcraft-LICENSE.txt', data: up.get('LICENSE') },
      { name: 'overrides/licenses/SkyCraft-LICENSE.txt', data: up.get('licenses/SkyCraft-LICENSE.txt') },
    ] }));
};
const assets = [bepinex, plugin, await pack(false)];

const make = (urls, set) => {
  const mp = set.find(a => a.name.endsWith('.mrpack'));
  return {
    id: `sigf/${ID}`,
    version: VERSION,
    name: NAME,
    tagline: player(ID).tagline ?? TAGLINE,
    how_to_play: player(ID).howToPlay,
    kind: 'passthrough',
    games: [
      { game: 'lethal', role: 'host', label: 'Lethal Company', engine: 'Lethal Company (Unity 2022.3, Mono, x64) + BepInEx 5 plugin LethalCraft (C#)', apps: { steam: '1966720' }, runtime: 'v81, Steam build 22825947 (tested by the author)' },
      { game: 'minecraft', role: 'guest', label: 'Minecraft', engine: 'Minecraft Java 26.3 + SkyCraft\'s Fabric mod with LethalCraft\'s changes (Java)', mc: MC.mc, loader: `fabric@${MC.loader}`, java: MC.java },
    ],
    requires: [
      { id: BEPINEX.id, version: BEPINEX.version, license: `${BEPINEX.license}, shipped unchanged`, page: `${BEPINEX.repo}/releases/tag/v${BEPINEX.version}`,
        note: 'installed into the Lethal Company folder by the app', source: { url: urls[bepinex.name], sha256: bepinex.sha256 } },
      { id: 'fabric-loader', version: MC.loader },
      { id: 'fabric-api', version: MC.fabricApi, note: 'in the Minecraft pack (downloaded from Modrinth)' },
    ],
    install: [
      { game: 'lethal', strategy: 'game-dir-snapshot', loader: 'bepinex', files: [
        { src: bepinex.name, dst: '{game}', unpack: true, contents: bepinex.contents, ...dl(bepinex, urls) },
        { src: plugin.name, dst: '{game}', unpack: true, contents: plugin.contents, ...dl(plugin, urls) },
      ] },
      // -Dskycraft.startHidden=true: Minecraft's window stays hidden (upstream's prism/instance.cfg). Upstream's
      // javax.net.ssl trust store flags are not on the app's whitelist and are left out (TLS defaults of the JRE).
      { game: 'minecraft', strategy: 'mrpack', jvm_args: ['-Dskycraft.startHidden=true'], pack: { src: mp.name, ...dl(mp, urls) } },
    ],
    // Minecraft first (upstream Launch.ps1 order), then Lethal Company through Steam (the Online lobby needs Steam).
    launch: [{ game: 'minecraft' }, { game: 'lethal', args: [] }],
    files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
    source: {
      repo: UP.repo, license: 'MIT AND LGPL-2.1', upstream_license: UP.license, tag: UP.tag, commit: UP.commit,
      hosted: `https://github.com/SIGFAI/${ID}`,
      based_on: SKY.repo,
      bundled: [{ name: 'BepInEx', version: BEPINEX.version, repo: BEPINEX.repo, commit: BEPINEX.commit, license: BEPINEX.license }],
    },
    media: {},
    built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
    idea_by: UP.authors[0],
    built_at: '2026-10-07T00:00:00.000Z',
    ...card(UP.repo),
    notes: player(ID).notes,
  };
};

emit({ slug: ID, version: VERSION, assets, make });
