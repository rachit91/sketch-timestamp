var toggleTimestamps = function(context) {

	doc = context.document;
    selection = context.selection;

    var toggle = function(array) {

        var artboards = array;

        //if no artboards on the page, tell user
        if(artboards.length == 0) {

        	doc.showMessage("No artboards on this page");

        } else {

        	//iterate on all the artboards and children of each one
        	//if an artboard has a timestamp and is visible, decrease its height by 60 and hide it
        	//if timestamp is found but is hidden, increase the height and make it visible
        	for (var j = 0; j < artboards.length; j++) {

        		for (var k = 0; k < artboards[j].children().length; k++) {

        			var sublayer = artboards[j].children()[k];

		            var artboardHeight = artboards[j].frame().height();

		            if(sublayer.name() == "timestamp" || sublayer.name() == "Timestamp") {

		            	if(sublayer.isVisible() == true) {

		            		sublayer.setIsVisible(false);
		            		artboards[j].frame().setHeight(artboardHeight - 60);

		            	} else {

		            		sublayer.setIsVisible(true);
		            		artboards[j].frame().setHeight(artboardHeight + 60);

		            		//taking care of the scenario where if the artboard height was increased after toggle
		            		//this will bring the timestamp back to the bottom of the artboard
		            		sublayer.frame().setY(artboards[j].frame().height() - 30);

		            	}
		            	
		            }

        		};
	            
        	};
        };
    }

    //capture all the artboards on this page

	var artboardArray = [];

	for ( var i=0; i < context.document.currentPage().children().length; i++ ) {

        //iterate on the children of this page
        //this is not optimal since there are a high number of layers and
        //and artboards on a page but works for now

        //if child is a artboard, add it to the array
        if (context.document.currentPage().children()[i].isMemberOfClass(MSArtboardGroup)) {

            artboardArray.push(context.document.currentPage().children()[i]);
        
        }
    
    };

    //call the toggle function for all the artboards on this page
    toggle(artboardArray);   

};