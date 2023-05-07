import { TEditorOptions } from '../types/editor';

const editorOptions: TEditorOptions = {
  formatOnPaste: true,
  formatOnType: true,
  theme: 'vs-light',
  tabSize: 2,
  fixedOverflowWidgets: true,
  automaticLayout: true,
  scrollBeyondLastLine: false,
  padding: {
    bottom: 10,
    top: 10,
  },
  minimap: {
    enabled: false,
  },
  scrollbar: {
    verticalScrollbarSize: 5,
    horizontalScrollbarSize: 5,
    alwaysConsumeMouseWheel: true,
  },
  renderLineHighlight: 'none',
};

const queryEditorOptions: TEditorOptions = {
  ...editorOptions,
  hover: { enabled: false },
};

const resultEditorOptions: TEditorOptions = {
  ...editorOptions,
  readOnly: true,
  lineNumbers: 'off',
  guides: {
    indentation: false,
  },
};

enum Files {
  query = 'query.graphql',
  variables = 'variables.json',
  headers = 'headers.json',
  result = 'result.json',
}

export { editorOptions, Files, queryEditorOptions, resultEditorOptions };
