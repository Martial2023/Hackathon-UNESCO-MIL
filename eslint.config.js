// eslint.config.js
import next from 'eslint-config-next';

export default [
  ...next,
  {
    ignores: ['lib/generated/**'], // 👈 Ignorer les fichiers générés ici
  },
];