import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import Popup, { ToolbarItem, Position } from 'devextreme-react/popup';
import List, { type ListRef, type ListTypes } from 'devextreme-react/list';
import type { Column } from '../data';
import { captionize } from '../utils';

interface CustomColumnChooserProps {
  container: string;
  button: string;
  visible: boolean;
  columns: Column[];
  onHiding: () => void;
  /* eslint-disable no-unused-vars */
  onApply: (columns: Column[]) => void;
}

export default function CustomColumnChooser(props: CustomColumnChooserProps): JSX.Element {
  const {
    container, button, visible, columns, onHiding, onApply,
  } = props;

  const listRef = useRef<ListRef>(null);

  const onPopupHiding = useCallback(() => {
    onHiding();
  }, [onHiding]);

  const columnsList = useMemo(() => columns.map((column: Column) => captionize(column.dataField)), [columns]);

  const [selectedItems, setSelectedItems] = useState(
    columns
      .filter((column) => column.visible)
      .map((column) => captionize(column.dataField)),
  );

  useEffect(() => {
    setSelectedItems(
      columns
        .filter((column) => column.visible)
        .map((column) => captionize(column.dataField)),
    );
  }, [columns, setSelectedItems]);

  const onSelectionChanged = useCallback((e: ListTypes.SelectionChangedEvent<string, string>) => {
    setSelectedItems(e.component.option('selectedItems') ?? []);
  }, [setSelectedItems]);

  const applyButtonOptions = useMemo(() => ({
    text: 'Apply',
    onClick: (): void => {
      const selectedItems = listRef.current?.instance().option('selectedItems');

      const changes: Column[] = [];
      columns.forEach((column) => {
        const isSelected = selectedItems?.includes(captionize(column.dataField));
        if (column.visible !== isSelected) {
          changes.push({
            ...column,
            visible: isSelected ?? false,
          });
        }
      });
      onApply(changes);
    },
  }), [listRef, columns, onApply]);

  const cancelButtonOptions = useMemo(() => ({
    text: 'Cancel',
    onClick: (): void => {
      setSelectedItems(
        columns
          .filter((column) => column.visible)
          .map((column) => captionize(column.dataField)),
      );
      onHiding();
    },
  }), [columns, onHiding, setSelectedItems]);

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
      hideOnOutsideClick={false}
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
        dataSource={columnsList}
        searchEnabled={true}
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

