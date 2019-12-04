const fs = require('fs-extra');
const path = require('path');

(async () => {
  const base = process.argv[2];
  const dirs = await fs.readdir(base);
  const stats = await Promise.all(
    dirs.map(async dir => {
      const fullPath = path.join(base, dir);
      const stats = await fs.stat(fullPath);
      return {
        path: fullPath,
        isDir: stats.isDirectory(),
        isFile: stats.isFile(),
        size: stats.size,
        modified: stats.mtimeMs,
        created: stats.birthtimeMs,
        base: path.basename(fullPath),
      };
    }),
  );
  process.send(stats, () => {
    process.exit(0);
  });
})();
