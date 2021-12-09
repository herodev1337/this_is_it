let fs = require('fs');
let path = require('path');

String.prototype.toTitleCase = function () {
  const str = this.toString();
  const tmp = str.toLowerCase().slice(1);
  const first = str[0].toUpperCase();
  return `${first}${tmp}`;
};

const scan_dir = (dir, root = null) => {
  root = root === null ? dir : root;

  return fs.readdirSync(dir).map((f) => {
    const curPath = path.join(dir, f);
    const isDir = fs.lstatSync(curPath).isDirectory();

    f = f.includes('.md') ? f.replace('.md', '') : f;

    const entry = {
      label: f,
      title: '',
      path: curPath.replace(root, '').replaceAll('\\', '/').replace('.md', ''),
      // icon: 'fas fa-folder',
      type: '',
    };

    if (isDir) {
      entry.type = 'dir';
      entry.title = `${f.toTitleCase()} folder`;
      entry.children = scan_dir(curPath, root);
      // return scan_dir(curPath);
      return entry;
    } else {
      entry.type = 'file';
      entry.title = `${f.toTitleCase()} file`;
      return entry;
    }
  });
};

const up = path.resolve(__dirname, '../');
const dir = path.join(up, 'docs');
const ret = scan_dir(dir);

const out = path.join(up, 'structure.json');
const data = JSON.stringify(ret, null, 2);

console.log("Hier: ", out)
fs.writeFileSync(out, data);
