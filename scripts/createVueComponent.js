const fs = require("fs");

if (process.argv.length < 3) return;

const componentName       = process.argv[2];
const componentFolderName = componentName;
const componentFolderPath = `${__dirname}/${componentFolderName}`; 
const componentFilePath   = `${componentFolderPath}/${componentFolderName}`;

const VUE_FILE_BOILERPLATE = 
`<template>
</template>

<script src="./${componentName}.mjs"  module></script>
<style  src="./${componentName}.scss" scoped lang="scss"></style>
`;
const MJS_FILE_BOILERPLATE = 
`export default Vue.component("${componentName}", {
});
`;
const SCSS_FILE_BOILERPLATE = 
`
`;

fs.mkdir(componentFolderPath, () => {
  fs.appendFile(`${componentFilePath}.vue`,  VUE_FILE_BOILERPLATE,  () => {});
  fs.appendFile(`${componentFilePath}.mjs`,  MJS_FILE_BOILERPLATE,  () => {});
  fs.appendFile(`${componentFilePath}.scss`, SCSS_FILE_BOILERPLATE, () => {});
});
