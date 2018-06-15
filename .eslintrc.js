module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "max-len": ["error", 120],
    "no-console": "off"
  },
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  }
};