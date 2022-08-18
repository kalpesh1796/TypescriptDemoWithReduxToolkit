module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "utils": "./src/utils",
          "screen": "./src/screen",
          "service": "./src/service",
          "components": "./src/components",
        }
      }
    ]
  ]
};
