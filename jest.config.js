module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!@babel)'],
  transform: {
    '^.+\\.vue$': 'vue-jest'
  }
}
