import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Popup, { ToolbarItem, Position } from "devextreme-react/popup";
import List from "devextreme-react/list";

export default function CustomColumnChooser(props) {
  const { container, button, visible, columns, onHiding, onApply } = props;

  const listRef = useRef(null);

  const onPopupHiding = useCallback(() => {
    onHiding();
  }, [onHiding]);

  const columnsList = useMemo(() => {
    return columns.map((column) => captionize(column.dataField));
  }, [columns]);

  const [selectedItems, setSelectedItems] = useState(
    columns
      .filter((column) => column.visible)
      .map((column) => captionize(column.dataField))
  );

  useEffect(() => {
    setSelectedItems(
      columns
        .filter((column) => column.visible)
        .map((column) => captionize(column.dataField))
    );
  }, [columns, setSelectedItems]);

  const onSelectionChanged = useCallback((e) => {
    setSelectedItems(e.component.option("selectedItems"));
  }, [setSelectedItems]);

  const applyButtonOptions = useMemo(() => {
    return {
      text: "Apply",
      onClick: () => {
        const selectedItems = listRef.current.instance.option("selectedItems");

        let changes = [];
        columns.forEach((column) => {
          var isSelected = selectedItems.includes(captionize(column.dataField));
          if (column.visible !== isSelected) {
            changes.push({
              ...column,
              visible: isSelected,
            });
          }
        });
        onApply(changes);
      },
    };
  }, [listRef, columns, onApply]);

  const cancelButtonOptions = useMemo(() => {
    return {
      text: "Cancel",
      onClick: () => {
        setSelectedItems(
          columns
            .filter((column) => column.visible)
            .map((column) => captionize(column.dataField))
        );
        onHiding();
      },
    };
  }, [columns, onHiding, setSelectedItems]);

  return (
    <Popup
      container={container}
      title="Column Chooser"
      width={250}
      height={350}
      resizeEnabled={false}
      shading={false}
      showCloseButton={false}
      dragEnabled={false}
      closeOnOutsideClick={false}
      visible={visible}
      onHiding={onPopupHiding}
    >
      <Position
        at="right bottom"
        my="right top"
        of={`${container} ${button}`}
      />

      <List
        ref={listRef}
        items={columnsList}
        selectionMode="all"
        showSelectionControls={true}
        selectedItems={selectedItems}
        onSelectionChanged={onSelectionChanged}
      />

      <ToolbarItem
        widget="dxButton"
        location="after"
        toolbar="bottom"
        options={applyButtonOptions}
      />

      <ToolbarItem
        widget="dxButton"
        location="after"
        toolbar="bottom"
        options={cancelButtonOptions}
      />
    </Popup>
  );
}

const DIGIT_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function captionize(name) {
  const captionList = [];
  let i;
  let char;
  let isPrevCharNewWord = false;
  let isNewWord = false;

  for (i = 0; i < name.length; i++) {
    char = name.charAt(i);
    isNewWord =
      (char === char.toUpperCase() &&
        char !== "-" &&
        char !== ")" &&
        char !== "/") ||
      char in DIGIT_CHARS;
    if (char === "_" || char === ".") {
      char = " ";
      isNewWord = true;
    } else if (i === 0) {
      char = char.toUpperCase();
      isNewWord = true;
    } else if (!isPrevCharNewWord && isNewWord) {
      if (captionList.length > 0) {
        captionList.push(" ");
      }
    }
    captionList.push(char);
    isPrevCharNewWord = isNewWord;
  }
  return captionList.join("");
}
