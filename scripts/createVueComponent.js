const fs = require("fs");

if (process.argv.length < 3) return;
// console.log(process.argv, __dirname, process.cwd(), process.env.INIT_CWD);

const componentName       = process.argv[2];
const componentFolderName = componentName;
const componentFolderPath = `${process.env.INIT_CWD}/${componentFolderName}`; 
const componentFilePath   = `${componentFolderPath}/${componentFolderName}`;

const VUE_FILE_BOILERPLATE = 
`<template>
</template>

<script src="./${componentName}.ts"   module lang="ts"></script>
<style  src="./${componentName}.scss" scoped lang="scss"></style>
`;
const MJS_FILE_BOILERPLATE = 
`import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class ${componentName[0].toUpperCase() + componentName.slice(1)} extends Vue {
}
`;
const SCSS_FILE_BOILERPLATE = 
`.${componentName} { 
}
`;

fs.mkdir(componentFolderPath, () => {
  fs.appendFile(`${componentFilePath}.vue`,  VUE_FILE_BOILERPLATE,  () => {});
  fs.appendFile(`${componentFilePath}.ts`,   MJS_FILE_BOILERPLATE,  () => {});
  fs.appendFile(`${componentFilePath}.scss`, SCSS_FILE_BOILERPLATE, () => {});
});
