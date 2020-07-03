import React from 'react';
import { useSlate } from 'slate-react';

import {
  getActiveEntry,
  toggleBlock,
  toggleList,
  convertAllToParagraph,
} from 'volto-slate/utils';
import ToolbarButton from './ToolbarButton';

const newToggleBlock = (editor, format, isActive) => {
  switch (format) {
    case 'bulleted-list':
    case 'numbered-list':
      toggleList(editor, {
        typeList: format,
        isBulletedActive: !!getActiveEntry(editor, 'bulleted-list'),
        isNumberedActive: !!getActiveEntry(editor, 'numbered-list'),
      });
      break;
    case 'block-quote':
    case 'heading-two':
    case 'heading-three':
    default:
      convertAllToParagraph(editor);
      if (!isActive) {
        toggleBlock(editor, format, false);
      }
      break;
  }
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();

  const isActive = !!getActiveEntry(editor, format);

  const handleMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();
      newToggleBlock(editor, format, isActive);
    },
    [editor, format, isActive],
  );

  return (
    <ToolbarButton
      active={isActive}
      onMouseDown={handleMouseDown}
      icon={icon}
    />
  );
};

export default BlockButton;
