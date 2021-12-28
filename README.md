# Ssr Translate

## Nestjs install bug (patch is created)

`An unhandled exception occurred: Package subpath './schematics/utils' is not defined by "exports" in..`

1. Run `npm i --save @nguniversal/express-engine`
2. Open: `node_modules/@nguniversal/express-engine/package.json`
3. Remove: `"type": "module"`
4. Add:

```
    "./schematics/utils": {
      "types": "./schematics/utils/index.d.ts",
      "esm2020": "./schematics/utils/index.js",
      "es2020": "./schematics/utils/index.js",
      "es2015": "./schematics/utils/index.js",
      "node": "./schematics/utils/index.js",
      "default": "./schematics/utils/index.js"
    }

```
