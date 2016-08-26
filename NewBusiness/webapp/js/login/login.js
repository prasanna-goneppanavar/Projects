$(document).ready(function() {
	$(document).keypress(function(e) {
	    if(e.keyCode == 13) {
	    	$("#login").click();
	    }
	});
    var elements = document.getElementsByTagName("input");
    for (var i = 0; i < elements.length; i++) {
    	 $(elements[i]).bind("invalid", function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("Please enter your "+e.target.alt);
            }
        });
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
});
