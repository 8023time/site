export default {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
  '!(package)*.json': ['prettier --write'],
  'package.json': ['prettier --write'],
  '*.{tsx,ts,jsx,js}': ['prettier --write'],
  '*.{css,scss,postcss,less}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
};
