var addTimestamp = function(context) {

    doc = context.document;
    selection = context.selection;

    //capturing the date and formatting it
    var d = new Date();
    var date = d.getMonth()+1+"/"+d.getDate()+"/"+d.getFullYear();

    // So first let's get the selection count.
    var count = selection.length;

    var createTimestamp = function(item, count) {

        //if everything is fine until here, go ahead and look for a timestamp.
        //if we find it, we will update it, otherwise we will create a new one on the selected artboard

        var layerParentGroup = item;
        var artboardToSelect = null;
        var timestampFlag = 0;

        //check if the selection is artboard, if not return the layer's artboard
        while (layerParentGroup) {

            if (layerParentGroup.class() == "MSArtboardGroup")) {
              artboardToSelect = layerParentGroup;
              break;
            }

            layerParentGroup = layerParentGroup.parentGroup();
        };

        //iterate on the children to find out if timestamp is already present
        //if it is, update it and show a confirmation message
        for (var i = 0; i < artboardToSelect.children().length; i++) {

            var sublayer = artboardToSelect.children()[i];

            if(sublayer.name() == "timestamp" || sublayer.name() == "Timestamp") {

                sublayer.setStringValue("Last updated: " + date);
                timestampFlag = 1;

                //lock the layer if it was unlocked by the user manually
                if(sublayer.isLocked() == 0) {
                    sublayer.setIsLocked(true);
                }
            }
        };

        //if timestamp is found, then show a confirmation message, else trigger the modal
        if(timestampFlag == 1 && count == 1) {

            doc.showMessage("Timestamp was found on this artboard and was updated");
        
        } else if(timestampFlag == 1 && count > 1) {

            doc.showMessage("Timestamps on these artboards were updated");

        } else {

            //capturing the current artboard frame
            var artboardFrame = artboardToSelect.frame();

            //current values of the artboard
            var artboardHeight = artboardFrame.height();
            var artboardWidth = artboardFrame.width();

            //new height of the selected artboard
            var newHeight = artboardHeight + 60;
            artboardFrame.setHeight(newHeight);

            //defining and creating the new layer
            var layer = MSTextLayer.new();

            //defining the x and y of the new timestamp layer
            layer.frame().setX(artboardWidth - 150);
            layer.frame().setY(newHeight - 30);

            
            //Set the text value of this layer to date
            layer.setStringValue("Last updated: "+ date);

            //adding the layer to the artboard and changing the characteristics
            artboardToSelect.addLayer(layer);
            layer.setFontSize(10);
            layer.setName("timestamp");
            layer.setIsLocked(true);

        }

        return;
    };


    //I did a little bit of a hack here as I made updates after I wrote the first logic. 
    //So, if count is 0, then we ask the user to select time stamps
    // if count is 1, then we call the timestamp function with the first selection
    //if count is > 1, then we create a modal for asking the user about adding timestamps and having them click add
    
    if (count == 0) {

        // // If nothing is selected, ask the user to select something first
        // doc.showMessage("Select artboards to add a timestamps");

        //if no artboard is selected, take the current page and add timestamps to all the artboards
        var artboardArray = [];

        for(var i=0; i<context.document.currentPage().children().length; i++ ) {

            //iterate on the children of this page
            //this is not optimal since there are a high number of layers and
            //and artboards on a page but works for now

            //if child is a artboard, add it to the array
            if (context.document.currentPage().children()[i].isMemberOfClass(MSArtboardGroup)) {

                artboardArray.push(context.document.currentPage().children()[i]);
            }   
        };

        //loop on all the artboards and add or update the timestamp
        for(var j=0; j<artboardArray.length; j++) {

            createTimestamp(artboardArray[j], 1);
        }

        //if there is no artboard on the page, tell the user,
        //else show success message
        if(artboardArray.length == 0) {

            doc.showMessage("No artboards found on this page");

        } else {

            doc.showMessage("Timestamps were added or updated to all artboards on this page ");

        };      

    } else if (count == 1) {

        //defining the modal and it's characteristics
        var timestamp = COSAlertWindow.new();

        // Text for modal
        timestamp.setMessageText("Add a timestamp?");
        timestamp.setInformativeText("This will add a new text layer named \"timestamp\" at the bottom right of this artboard");

        // Add timestamp and Cancel buttons
        timestamp.addButtonWithTitle('Add');
        timestamp.addButtonWithTitle('Cancel');

        // Return the Modal structure
        var result = timestamp.runModal();

        //if user clicks 'Add timestamp':
        if (result == 1000) {

            createTimestamp(selection[0], count);

            //show message that timestamp was added
            //doc.showMessage("Timestamp was added");

        } else {

            doc.showMessage("Cancelled");
        }

    } else if (count > 1) {

        //defining the modal and it's characteristics
        var timestampModalMultiple = COSAlertWindow.new();

        // Text for modal
        timestampModalMultiple.setMessageText("Add or update timestamps to "+count+ " artboards?");
        timestampModalMultiple.setInformativeText("This will add a new text layer named \"timestamp\" at the bottom right of these artboards");

        // Add timestamp and Cancel buttons
        timestampModalMultiple.addButtonWithTitle('Add or Update');
        timestampModalMultiple.addButtonWithTitle('Cancel');

        // Return the Modal structure
        var response = timestampModalMultiple.runModal();

        if(response == 1000) {

            for (var i = 0; i < count; i++) {

                createTimestamp(selection[i], count);

            };

            //show message that timestamp was added
            doc.showMessage("Timestamps were added or updated to "+count+" artboards");

        } else {

            doc.showMessage("Cancelled");

        };
    };

};

// //helper function to create a symbol from a layer
// var layerToSymbol = function(layer){

//     var layerArray = MSLayerArray.arrayWithLayers([layer]);
//     var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layerArray, layer.name(), true).symbolMaster();

//     return symbolInstance.objectID();

// };
