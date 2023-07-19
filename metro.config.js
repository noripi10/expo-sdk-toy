// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

config.resolver.sourceExts.push('cjs', 'mjs');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => !config.resolver.sourceExts.includes(ext));

module.exports = config;
