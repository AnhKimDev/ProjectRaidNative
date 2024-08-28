module.exports = {
  // ... other configurations ...
  preset: "react-native",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react|react-native|@react-native|@expo|expo|react|react-dom|react-test-renderer)",
  ],
  globals: {
    __DEV__: true,
  },

  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
    "android.js",
    "ios.js",
  ],
};
