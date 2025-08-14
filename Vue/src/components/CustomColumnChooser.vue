<template>
  <div class="chart-cell">
    <DxPopup
      :container="container"
      title="Column Chooser"
      :width="250"
      :height="350"
      :resize-enabled="false"
      :shading="false"
      :show-close-button="false"
      :drag-enabled="false"
      :close-on-outside-click="false"
      :visible="visible"
      @hiding="onHiding"
    >
      <DxPosition
        at="right bottom"
        my="right top"
        :of="positionOf"
      />

      <DxList
        ref="listRef"
        :data-source="columnsList"
        selection-mode="all"
        :show-selection-controls="true"
        :selected-items="selectedItems"
        :search-enabled="true"
      />

      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="applyButtonOptions"
      />

      <DxToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        :options="cancelButtonOptions"
      />
    </DxPopup>
  </div>
</template>
<script setup lang="ts">
import DxPopup, { DxToolbarItem, DxPosition } from 'devextreme-vue/popup';
import DxList from 'devextreme-vue/list';
import { ref, computed } from 'vue';
import type { Column } from '../data';
import { captionize } from '../utils';

const props = withDefaults(defineProps<{
  visible: boolean;
  container: string;
  button: string;
  columns: Array<Column>;
}>(), {
  visible: false,
  container: '',
  button: '',
  columns: () => [],
});

/* eslint-disable */
const emit = defineEmits<{
  (e: 'hiding'): void;
  (e: 'apply', columns: Column[]): void;
}>();
/* eslint-enable */

const listRef = ref<DxList>();

const columnsList = computed(() =>
  props.columns.map((column) => captionize(column.dataField))
);

const selectedItems = ref(
  props.columns.filter((column) => column.visible).map((column) => captionize(column.dataField))
);

function handleApply() {
  const selected: string [] = listRef.value?.instance?.option('selectedItems') || [];
  const changes: Column[] = [];
  props.columns.forEach((column) => {
    const isSelected = selected.includes(captionize(column.dataField));
    if (column.visible !== isSelected) {
      changes.push({
        ...column,
        visible: isSelected,
      });
    }
  });
  emit('apply', changes);
}

function handleCancel() {
  selectedItems.value = props.columns
    .filter((column) => column.visible)
    .map((column) => captionize(column.dataField));
  emit('hiding');
}

const applyButtonOptions = {
  text: 'Apply',
  onClick: handleApply,
};

const cancelButtonOptions = {
  text: 'Cancel',
  onClick: handleCancel,
};

const positionOf = computed(() => `${props.container} ${props.button}`);

</script>
