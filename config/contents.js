import jsYaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

export const getContent = (file) => {
  const fileRoute = path.join(__dirname, '../api/contents', `${file}_content.yml`);
  return jsYaml.load(fs.readFileSync(fileRoute, 'utf8'));
};

export const getTitle = () => {
  const fileRoute = path.join(__dirname, '../api/contents', '_titles.yml');
  return jsYaml.load(fs.readFileSync(fileRoute, 'utf8'));
};