const { default: rebuild } = require("electron-rebuild")
const fs = require("fs-extra")
const path = require("path")

module.exports = {
  packagerConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  hooks: {
    packageAfterCopy: async (conf, buildPath, electronVersion, platform, arch) => {
      // copy shared packages to production node_modules
      const files = fs.readdirSync(path.resolve(buildPath, "node_modules"), {encoding: 'utf8', withFileTypes: true});
      await files.forEach((module) => {
        if (module.isSymbolicLink()) {
          const moduleInBuild = path.resolve(buildPath, "node_modules", module.name);
          const moduleInDev = path.resolve(path.resolve(__dirname, "node_modules", module.name));
          const realpath = fs.realpathSync(moduleInDev);
          fs.rmSync(moduleInBuild, { recursive: true, force: true });
          fs.copySync(realpath, moduleInBuild, { overwrite: true, recursive: true });
        }
      });
      // rebuild native modules to local node version
      await rebuild({
        buildPath,
        arch,
        electronVersion,
        force: true
      });
    },
  }
};
