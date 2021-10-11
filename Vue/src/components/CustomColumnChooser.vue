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
      <DxPosition at="right bottom" my="right top" :of="positionOf" />

      <DxList
        :ref="listRefKey"
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
<script>
import DxPopup, { DxToolbarItem, DxPosition } from "devextreme-vue/popup";
import DxList from "devextreme-vue/list";

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

const listRefKey = "my-list";

export default {
  components: {
    DxPopup,
    DxToolbarItem,
    DxPosition,
    DxList,
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    container: {
      type: String,
      required: true,
      default: () => "",
    },
    button: {
      type: String,
      required: true,
      default: () => "",
    },
    onHiding: {
      type: Function,
      required: true,
      default: () => {},
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    onApply: {
      type: Function,
      required: true,
      default: () => {},
    },
  },

  data() {
    return {
      listRefKey,
      applyButtonOptions: {
        text: "Apply",
        onClick: () => {
          const selectedItems = this.list.option("selectedItems");

          let changes = [];
          this.columns.forEach((column) => {
            var isSelected = selectedItems.includes(
              captionize(column.dataField)
            );
            if (column.visible !== isSelected) {
              changes.push({
                ...column,
                visible: isSelected,
              });
            }
            this.onApply(changes);
          });
        },
      },
      cancelButtonOptions: {
        text: "Cancel",
        onClick: () => {
          this.selectedItems = this.columns
            .filter((column) => column.visible)
            .map((column) => captionize(column.dataField));
          this.onHiding();
        },
      },
      positionOf: `${this.container} ${this.button}`,
      columnsList: this.columns.map((column) => captionize(column.dataField)),
      selectedItems: this.columns
        .filter((column) => column.visible)
        .map((column) => captionize(column.dataField)),
    };
  },

  methods: {},

  computed: {
    list: function () {
      return this.$refs[listRefKey].instance;
    },
  },
};
</script>