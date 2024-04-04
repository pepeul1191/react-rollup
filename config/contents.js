import jsYaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import os from 'os';

const osName = os.platform();

const __dirname = (osName != 'linux' ?  new URL('.', import.meta.url).pathname.substring (1) : new URL('.', import.meta.url).pathname);

export const getContent = (file) => {
  const fileRoute = path.join(__dirname, '../api/contents', `${file}_content.yml`);
  return jsYaml.load(fs.readFileSync(fileRoute, 'utf8'));
};

export const getTitle = () => {
  const fileRoute = path.join(__dirname, '../api/contents', '_titles.yml');
  return jsYaml.load(fs.readFileSync(fileRoute, 'utf8'));
};
