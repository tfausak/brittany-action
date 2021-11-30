const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const glob = require('@actions/glob');
const toolCache = require('@actions/tool-cache');
const util = require('util');

const DEFAULT_CONFIG = 'brittany.yaml';

const DEFAULT_PATTERN = '**/*.hs';

const DEFAULT_VERSION = '0.14.0.0';

const EXTENSIONS = {
  darwin: '',
  linux: '',
  win32: '.exe'
};

const PLATFORMS = {
  darwin: 'macos',
  linux: 'ubuntu',
  win32: 'windows',
};

const buildUrl = (version, platform, extension) =>
  `https://github.com/tfausak/brittany/releases/download/${version}/brittany-${version}-${platform}${extension}`;

const isUndefined = (x) =>
  typeof x === 'undefined';

(async () => {
  try {
    const config = core.getInput('config') || DEFAULT_CONFIG;
    const extension = EXTENSIONS[process.platform];
    const pattern = core.getInput('pattern') || DEFAULT_PATTERN;
    const platform = PLATFORMS[process.platform];
    const version = core.getInput('version') || DEFAULT_VERSION;

    if (isUndefined(extension) || isUndefined(platform)) {
      throw new Error(`unsupported platform: ${process.platform}`);
    }

    const brittany = await toolCache.downloadTool(buildUrl(version, platform, extension));
    await util.promisify(fs.chmod)(brittany, 0o777);

    const globber = await glob.create(pattern);
    const files = await globber.glob();

    if (files.length > 0) {
      const arguments = ['--check-mode', ...files];
      if (config) {
        arguments.push('--config-file', config);
      }
      await exec.exec(brittany, arguments);
    }
  } catch (error) {
    console.error(error);
    core.setFailed(error);
  }
})();
