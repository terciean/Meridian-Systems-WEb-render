import { readFile, writeFile, mkdir, rm, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const clientDir = resolve(root, 'dist');
const serverDir = resolve(root, 'dist-ssr');

// The SSR bundle's location can vary by build environment, so find it rather than assume a path.
const serverFiles = await readdir(serverDir, { recursive: true });
const entryFile = serverFiles.find((file) => /(^|[\/])entry-server[^\/]*\.js$/.test(file));
if (!entryFile) throw new Error(`entry-server bundle not found in ${serverDir}`);

const { render, SOLUTION_LIST } = await import(pathToFileURL(resolve(serverDir, entryFile)).href);

const template = await readFile(resolve(clientDir, 'index.html'), 'utf-8');

const staticRoutes = ['/', '/our-work', '/contact', '/enquire'];
const solutionRoutes = (SOLUTION_LIST ?? []).map((solution) => solution.path);
const routes = [...staticRoutes, ...solutionRoutes];

function outputPathFor(route) {
  if (route === '/') return resolve(clientDir, 'index.html');
  return resolve(clientDir, `.${route}`, 'index.html');
}

function inject(appHtml, helmet) {
  const headExtras = [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString()].join('\n    ');
  const withoutStaticTitle = template.replace(/<title>.*?<\/title>/s, '');
  const withHead = withoutStaticTitle.replace('</head>', `    ${headExtras}\n  </head>`);
  return withHead.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

for (const route of routes) {
  const { html, helmet } = render(route);
  const finalHtml = inject(html, helmet);
  const outPath = outputPathFor(route);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, finalHtml, 'utf-8');
  console.log(`prerendered ${route} -> ${outPath.replace(root, '')}`);
}

// Best-effort static 404 page for hosts that serve one automatically.
const notFound = render('/__not_found__');
await writeFile(resolve(clientDir, '404.html'), inject(notFound.html, notFound.helmet), 'utf-8');
console.log('prerendered 404 -> /dist/404.html');

await rm(serverDir, { recursive: true, force: true });
