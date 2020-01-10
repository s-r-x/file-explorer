const {ASSETS_PATH} = require('../constants');
const {spawn} = require('child_process');

module.exports = {
  stats: 'errors-only',
  port: process.env.PORT || 8080,
  open: false,
  hot: true,
  overlay: true,
  writeToDisk: true,
  contentBase: ASSETS_PATH,
  host: process.env.HOST || '0.0.0.0',
  historyApiFallback: true,
  before() {
    spawn('electron', ['.'], {
      shell: true,
      env: process.env,
      stdio: 'inherit',
    }).on('error', spawnError => console.error(spawnError));
  },
};
