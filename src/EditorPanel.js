// import { Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
// import 'draft-js/dist/Draft.css';
// import React, { useEffect, useRef, useState } from 'react';
// import './EditorPanel.css';

// const EditorPanel = () => {
//   const [editorState, setEditorState] = useState(() => {
//     const savedContent = localStorage.getItem('editorContent');
//     if (savedContent) {
//       return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)));
//     } else {
//       return EditorState.createEmpty();
//     }
//   });

//   useEffect(() => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateJSON = JSON.stringify(convertToRaw(contentState));
//     localStorage.setItem('editorContent', contentStateJSON);
//   }, [editorState]);

//   const handleInputChange = (newState) => {
//     setEditorState(newState);
//   };

//   const handleSave = () => {
//     const contentState = editorState.getCurrentContent();
//     const contentStateJSON = JSON.stringify(convertToRaw(contentState));
//     localStorage.setItem('editorContent', contentStateJSON);
//   };

//   const handleKeyCommand = (command, state) => {
//     const newState = RichUtils.handleKeyCommand(state, command);

//     if (newState) {
//       handleInputChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   };

//   const onTab = (e) => {
//     const maxDepth = 4;
//     handleInputChange(RichUtils.onTab(e, editorState, maxDepth));
//   };

//   const customStyleMap = {
//     'RED': {
//       color: 'red',
//     },
//     'UNDERLINE': {
//       textDecoration: 'underline',
//     },
//   };

//   const handleReturn = (e) => {
//     const contentState = editorState.getCurrentContent();
//     const selection = editorState.getSelection();
//     const currentContent = contentState.getBlockForKey(selection.getStartKey()).getText();

//     if (e.key === ' ') {
//       if (currentContent.startsWith('# ')) {
//         // Heading format
//         const newContentState = Modifier.replaceText(
//           contentState,
//           selection.merge({
//             anchorOffset: 0,
//             focusOffset: currentContent.length,
//           }),
//           '',
//           null,
//           null,
//           EditorState.createEmpty().getCurrentContent(),
//         );
//         const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
//         handleInputChange(newEditorState);
//         return 'handled';
//       } else if (currentContent.startsWith('* ')) {
//         // Bold format
//         const newContentState = Modifier.replaceText(
//           contentState,
//           selection.merge({
//             anchorOffset: 0,
//             focusOffset: currentContent.length,
//           }),
//           '',
//           null,
//           null,
//           EditorState.createEmpty().getCurrentContent(),
//         );
//         const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
//         handleInputChange(newEditorState);
//         return 'handled';
//       } else if (currentContent.startsWith('** ')) {
//         // Red line format
//         const newContentState = Modifier.replaceText(
//           contentState,
//           selection.merge({
//             anchorOffset: 0,
//             focusOffset: currentContent.length,
//           }),
//           '',
//           null,
//           { RED: true },
//           EditorState.createEmpty().getCurrentContent(),
//         );
//         const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
//         handleInputChange(newEditorState);
//         return 'handled';
//       } else if (currentContent.startsWith('*** ')) {
//         // Underline format
//         const newContentState = Modifier.replaceText(
//           contentState,
//           selection.merge({
//             anchorOffset: 0,
//             focusOffset: currentContent.length,
//           }),
//           '',
//           null,
//           { UNDERLINE: true },
//           EditorState.createEmpty().getCurrentContent(),
//         );
//         const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
//         handleInputChange(newEditorState);
//         return 'handled';
//       }
//     }

//     const newState = RichUtils.handleKeyCommand(editorState, 'split-block');
//     if (newState) {
//       handleInputChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   };

//   const handleResize = () => {
//     console.log('Editor resized');
//     // Additional logic for handling resize
//   };

//   const editorRef = useRef(null);

//   useEffect(() => {
//     const observer = new ResizeObserver(handleResize);
//     observer.observe(editorRef.current);

//     return () => {
//       observer.disconnect();
//     };
//   }, [handleResize]);

//   return (
//     <div className="editor-container" ref={editorRef}>
//       <div className="header">
//         <div></div>
//         <h1>Editor Panel by Saichakra</h1>
//         <button className='btn' onClick={handleSave}>Save</button>
//       </div>
//       <div className="editor">
//         <Editor
//           editorState={editorState}
//           onChange={handleInputChange}
//           handleKeyCommand={handleKeyCommand}
//           onTab={onTab}
//           handleReturn={handleReturn}
//           customStyleMap={customStyleMap}
//         />
//       </div>
//     </div>
//   );
// };

// export default EditorPanel;
import { Editor, EditorState, Modifier, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import React, { useLayoutEffect, useRef, useState } from 'react';
import './EditorPanel.css';

const EditorPanel = () => {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)));
    } else {
      return EditorState.createEmpty();
    }
  });

  useLayoutEffect(() => {
    const editorElement = editorRef.current;
    const observer = new ResizeObserver(handleResize);
    observer.observe(editorElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (newState) => {
    setEditorState(newState);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem('editorContent', contentStateJSON);
  };

  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);

    if (newState) {
      handleInputChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const onTab = (e) => {
    const maxDepth = 4;
    setEditorState(RichUtils.onTab(e, editorState, maxDepth));
  };

  const customStyleMap = {
    'RED': {
      color: 'red',
    },
    'UNDERLINE': {
      textDecoration: 'underline',
    },
  };

  const handleReturn = (e) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentContent = contentState.getBlockForKey(selection.getStartKey()).getText();
  
    if (e.key === ' ') {
      // Check if the current content starts with '#' and ends with a space
      if (currentContent.startsWith('# ') && currentContent.endsWith(' ')) {
        // Heading format
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({
            anchorOffset: 0,
            focusOffset: currentContent.length,
          }),
          '',
          null,
          null,
          EditorState.createEmpty().getCurrentContent(),
        );
  
        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
        setEditorState(newEditorState);
        return 'handled';
      }
  
      // Check if the current content starts with '* ' and ends with a space
      if (currentContent.startsWith('* ') && currentContent.endsWith(' ')) {
        // Bold format
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({
            anchorOffset: 0,
            focusOffset: currentContent.length,
          }),
          '',
          null,
          null,
          EditorState.createEmpty().getCurrentContent(),
        );
  
        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
        setEditorState(newEditorState);
        return 'handled';
      }
  
      // Check if the current content starts with '** ' and ends with a space
      if (currentContent.startsWith('** ') && currentContent.endsWith(' ')) {
        // Red line
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({
            anchorOffset: 0,
            focusOffset: currentContent.length,
          }),
          '',
          null,
          { RED: true },
          EditorState.createEmpty().getCurrentContent(),
        );
  
        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
        setEditorState(newEditorState);
        return 'handled';
      }
  
      // Check if the current content starts with '*** ' and ends with a space
      if (currentContent.startsWith('*** ') && currentContent.endsWith(' ')) {
        // Underline
        const newContentState = Modifier.replaceText(
          contentState,
          selection.merge({
            anchorOffset: 0,
            focusOffset: currentContent.length,
          }),
          '',
          null,
          { UNDERLINE: true },
          EditorState.createEmpty().getCurrentContent(),
        );
  
        const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
        setEditorState(newEditorState);
        return 'handled';
      }
    }
  
    // Default behavior
    const newState = RichUtils.handleKeyCommand(editorState, 'split-block');
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
  
    return 'not-handled';
  };
  
  const handleResize = () => {
    console.log('Editor resized');
    // Additional logic for handling resize
  };

  const editorRef = useRef(null);

  return (
    <div className="editor-container" ref={editorRef}>
      <div className="header">
        <div></div>
        <h1>Editor Panel by Saichakra</h1>
        <button className='btn' onClick={handleSave}>Save</button>
      </div>
      <div className="editor">
        <Editor
          editorState={editorState}
          onChange={handleInputChange}
          handleKeyCommand={handleKeyCommand}
          onTab={onTab}
          handleReturn={handleReturn}
          customStyleMap={customStyleMap}
        />
      </div>
    </div>
  );
};

export default EditorPanel;