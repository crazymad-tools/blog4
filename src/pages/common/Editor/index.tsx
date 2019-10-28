import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './index.scss';
import 'highlight.js/styles/dracula.css';
// import './tomorrow-night.css';
import codeParse from './hightlight';

interface Props {}

const Editor: React.FC<Props> = props => {
  const [lines, setLines] = useState(['']);
  const [code, setCode] = useState('');
  const [codeHtml, setCodeHtml] = useState('');
  const inputRef = useRef(null);

  // function input(e: any, index: number) {
  //   let val: string = e.currentTarget.innerText;
  //   let list: string[] = lines;
  //   list[index] = val;
  //   let enter: number = val.indexOf('\n');
  //   if (enter !== -1) {
  //     let prefix: string = val.substring(0, enter);
  //     let suffix: string = val.substring(enter);
  //     list[index] = prefix;
  //     console.log(prefix, suffix, index);
  //     list = list.slice(0, index).concat(suffix).concat(list.slice(index));
  //   }
  //   setLines(list.concat([]));
  // }

  function input (e: any) {
    setCode(e.currentTarget.value);
    setCodeHtml(codeParse(e.currentTarget.value));
  }

  function toFocus () {
    // console.log(inputRef.current.focus());
  }

  return (
    <div className="code-editor" onClick={toFocus}>
      <textarea ref={inputRef} value={code} onInput={input} />
      <code className="tomorrow-comment">
        <pre dangerouslySetInnerHTML={{__html: codeParse(code)}} />
      </code>
    </div>
  );
};

export default Editor;

/// <reference path="hightlight.d.ts" />
