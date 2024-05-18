import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  { files: ["**/*.js", "**/*.vue"], languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {
      'vetur.validation.style': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-explicit-emits': 'off',
      "vue/script-indent": ["warn", 2, { "baseIndent": 1 }],
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
];