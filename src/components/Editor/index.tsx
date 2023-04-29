import { useEffect, useRef, useState } from 'react';
// import type { ValidationContext, SDLValidationContext } from 'graphql';

import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/theme/cobalt.css';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import { getIntrospectionQuery, buildClientSchema } from 'graphql';

export default function Editor() {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [isEditorCreated, setEditorCreated] = useState<boolean>(false);

  useEffect(() => {
    if (textArea.current && !isEditorCreated) {
      CodeMirror.fromTextArea(textArea.current, {
        mode: 'graphql',
        lint: true,
        theme: 'cobalt',
        lineNumbers: true,
        indentUnit: 2,
        placeholder: '#example',
      });
    }
    setEditorCreated(true);
  }, [isEditorCreated]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(buildClientSchema(data.data)));
  }, []);

  return <textarea ref={textArea} />;
}
