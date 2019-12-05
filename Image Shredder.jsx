var mainWindow = new Window("palette", "Layer Shredder", undefined);
mainWindow.orientation = "row";
var input = mainWindow.add("edittext", undefined, "numStacks"); 
var shredButton = mainWindow.add("button", undefined, "Shred!");

shredButton.onClick = function() {
app.beginUndoGroup("Shred");
var comp = app.project.activeItem;
var layer = comp.layer(1);
var stacks = createStacks(comp, layer, parseInt(input.text));
app.endUndoGroup();
}

function createStacks(comp, layer, stacks) {
    var duplicates = [];
    var num = Math.floor(comp.height/stacks);
    var x = 0;
    var y = 0;
    var dLayer;
    var shape = new Shape();
    var layerMask;
        for(var i = 1; i <=stacks; i++) {
          dLayer = layer.duplicate();
          duplicates.push(dLayer);
          dLayer.audioEnabled = false;
          dLayer.name = "Duplicate_"+i;
          shape.vertices = [[x, y], [x, y+num], [x+comp.width, y+num], [x+comp.width, y]];
          layerMask = dLayer.Masks.addProperty("Mask");
          layerMask.property("ADBE Mask Shape").setValue(shape);
          y+=num;
            }
        layer.enabled = false;
        return duplicates;
    }

mainWindow.center();
mainWindow.show();