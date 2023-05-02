import { TEditorOptions } from '../types/editor';

const editorOptions: TEditorOptions = {
  hover: {
    enabled: true,
  },
  formatOnPaste: true,
  formatOnType: true,
  theme: 'vs-dark',
  automaticLayout: true,
  tabSize: 2,
  fixedOverflowWidgets: true,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    alwaysConsumeMouseWheel: true,
  },
};

enum InitValues {
  query = 'query { }',
  variables = '{ }',
  result = ' ',
}

enum Files {
  query = 'query.graphql',
  variables = 'variables.json',
  result = 'result.json',
}

export { editorOptions, InitValues, Files };
