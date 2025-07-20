$(function(){
    $("#gridContainer").dxDataGrid({
        dataSource: customers,
        columns: ["CompanyName", "City", "State", "Phone", "Fax"],
        showBorders: true,
        onToolbarPreparing: function(e) {
            var customColumnChooser = createColumnChooser(e.component);
            
            e.toolbarOptions.items.push({
              widget: "dxButton",
              options: {
                icon: "columnchooser",
                onClick: function(){
                  customColumnChooser.show();
                }},
              location: "after"
            });
        }
    });
});

function createColumnChooser(grid) {
    var columns = grid.option("columns").map(function(column) {
        return {
            dataField: column,
            caption: captionize(column)
        };
    });
    
    // Create List
    var list = $("<div>").dxList({
        dataSource: columns,
        selectedItems: columns,
        displayExpr: "caption",
        searchExpr: "caption",
        searchEnabled: true,
        showSelectionControls: true,
        selectionMode: "all"
    }).dxList("instance");
    
    // Create Popup
    var popup = $("#customColumnChooser").dxPopup({
        title: "Column Chooser",
        container: grid.element(),
        contentTemplate: function() { return list.element(); },
        width: 250,
        height: 350,
        resizeEnabled: true,
        shading: false,
        position: {
            at: "right bottom",
            my: "right bottom",
        },
        toolbarItems: [{
            widget: "dxButton",
            location: "after",
            toolbar: "bottom",
            options: { 
                text: "Apply", 
                onClick: function(e) {
                    var selectedItems = list.option("selectedItems");
                    grid.beginUpdate();
                    columns.forEach(function(column) {
                        grid.columnOption(column.dataField, "visible", selectedItems.includes(column));
                    });
                    grid.endUpdate();
                    popup.hide();
                }
            }
        }, {
            widget: "dxButton",
            location: "after",
            toolbar: "bottom",
            options: { 
                text: "Cancel", 
                onClick: function(e) {
                    popup.hide();
                }
            }
        }]
    }).dxPopup("instance");
    
    // Sync selected items
    grid.on("optionChanged", function(e) {
        if (e.name == "columns" && e.fullName.includes("visible")) {
            var columnIndex = parseInt(e.fullName.charAt(8));
            if (e.value) {
                list.selectItem(columnIndex);
            } else {
                list.unselectItem(columnIndex);
            }
        }
    });
    
    return popup;
}

const DIGIT_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function captionize(name) {
    const captionList = [];
    let i;
    let char;
    let isPrevCharNewWord = false;
    let isNewWord = false;

    for(i = 0; i < name.length; i++) {
        char = name.charAt(i);
        isNewWord = (char === char.toUpperCase() && char !== '-' && char !== ')' && char !== '/') || (char in DIGIT_CHARS);
        if(char === '_' || char === '.') {
            char = ' ';
            isNewWord = true;
        } else if(i === 0) {
            char = char.toUpperCase();
            isNewWord = true;
        } else if(!isPrevCharNewWord && isNewWord) {
            if(captionList.length > 0) {
                captionList.push(' ');
            }
        }
        captionList.push(char);
        isPrevCharNewWord = isNewWord;
    }
    return captionList.join('');
};