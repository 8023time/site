export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '!(package)*.json': ['prettier --write'],
  'package.json': ['prettier --write'],
  '*.{tsx,ts,jsx,js}': ['prettier --write'],
  '*.{css,scss,postcss,less}': ['prettier --write'],
  '*.md': ['prettier --write'],
};
