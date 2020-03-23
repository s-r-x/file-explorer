import path from "path";
import _ from "lodash";

const names = {
  Makefile: "makefile",
  Dockerfile: "docker",
  ".dockerignore": "docker",
  ".gitignore": "git",
  ".gitmodules": "git",
  "docker-compose.yml": "docker",
  "webpack.config.js": "webpack"
};
const extensions = {
  ".js": "js",
  ".jsx": "js",
  ".ts": "ts",
  ".tsx": "ts",
  ".yml": "yaml",
  ".json": "json",
  ".svg": "svg",
  ".sh": "sh",
  ".md": "markdown",
  ".vue": "vue",
  ".py": "python",
  ".sql": "sql",
  ".toml": "toml",
  ".txt": "text",
  ".html": "html",
  ".less": "less",
  ".css": "css",
  ".sass": "sass",
  ".scss": "scss"
};
const baseIcons: { [key: string]: string } = {
  default_file: "default_file",
  default_folder: "default_folder",
  ...extensions,
  ...names
};
type IconsDict = typeof baseIcons;
const root = "/icons";
const ext = ".svg";
const icons: IconsDict = _.reduce(
  baseIcons,
  (acc: any, value: any, key: any) => {
    acc[key] = path.join(root, value + ext);
    return acc;
  },
  {}
);
const isImg = (ext: string) => {
  switch (ext) {
    case ".png":
    case ".jpg":
    case ".jpeg":
    case ".gif":
      return true;
    default:
      return false;
  }
};
export const getIcon = (file: FileExcerpt) => {
  if (file.isDir) {
    return icons.default_folder;
  } else {
    const ext = path.extname(file.path);
    if (isImg(ext)) {
      return 'file:' + file.path;
    }
    const { base } = file;
    if (base && base in names) {
      return icons[base];
    } else if (ext && ext in extensions) {
      return icons[ext];
    } else {
      return icons.default_file;
    }
  }
};
