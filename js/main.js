// MIU 1207 Week 3
// Anthony Torrez



// JQuery file

var parseBookform = function(data){
	// uses the form data here:
	console.log(data);
};

$(document).bind('pageinit', function(){

	var rbform = $('#recordbooksform'),
		rberrorslink = $('#rberrorslink')
	;
	
	rbform.validate({
		invalidHandler: function(form, validator){
			rberrorslink.click();
			var html = '';
			//console.log(validator.submitted);
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');  // error with a label except those generated.
				//console.log(label.text());
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');  
				var fieldName = legend.length ? legend.text() : label.text();
				console.log(fieldName);
				html += '<li>'+ fieldName +'</li>';
			};
			$("#recordbookserrors ul").html(html);
		},
		submitHandler: function() {
			var data = rbform.serializeArray();
			localStorage.setItem('rbform', data);
			parseBookform(data);
		}
	});
	
		// getElementById Function
	function MiU(x) {
		var ElementX = document.getElementById(x);
		return ElementX;
	}
	
		// Get value of selected Radio Button
	function getSelectedRadio( ) {
		var rbuttons = document.forms[0].isaseries;
		console.log(rbuttons);
		for ( var i=0; i < rbuttons.length; i++ ) {
			if ( rbuttons[ i ].checked) {
			isaseries = rbuttons[ i ].value;
			}
		}
	}
	
	function toggleControls( n ) {
		switch( n ) {
			case "on":
				MiU( 'recordbooksform').style.display = "inline";  // hide the form
				MiU( 'clearLink' ).style.display = "block";
				MiU( 'displayLink' ).style.display = "inline";
				//  MiU( 'refresh' ).style.display = "block";
				break;
			case "off":
				MiU( 'recordbooksform').style.display = "inline";
				MiU( 'clearLink' ).style.display = "block";
				MiU( 'displayLink' ).style.display = "block";
				// MiU( 'refresh' ).style.display = "block";  // decided to keep refresh option available at all times.
				MiU( 'items' ).style.display = "block";
				break;
			default:
			return false;
		}
	}
    
    	//	console.log(localStorage);
    		
    		
        	function storeData(key) {
		// If there is no key, then this is a brand new item and needs a key.
		if (!key) {
			var id = Math.floor(Math.random( )*1000000001); // collect and store all form field values as a object.
		} else {	
			var id = key;
		// Set the id of the existing key we're editing so that it will save over the data
		// This is the same key that has been passed along from the editSubmit event handler
		// to the Validate function, and then passed here, into the storeData function
			
		}
		getSelectedRadio( ); // calls the value of the radio button
		var item = { };
			item.genre = [ "Genre:", MiU( 'genre' ).value ];
			item.btitle = [ "Book Title:", MiU( 'btitle' ).value ];
			item.author = [ "Author:", MiU( 'author' ).value ];
			item.isbn = [ "ISBN #:", MiU( 'isbn' ).value ];
			item.comments = ["Comments:", MiU( 'comments' ).value ];
			item.series = [ "Series:", isaseries ]; // for radio buttons
			item.seriesname = [ "Series Name:", MiU( 'seriesname' ).value ];
			item.seriesnum = [ "Series Number:", MiU( 'seriesnum' ).value ];
			item.date = [ "Date:", MiU( 'date' ).value ];    // correcting missing date field
			// Save data to local storage using JSON stringify to convert objects to a string.
			localStorage.setItem( id, JSON.stringify( item ) );
		alert ("Saved" );
		}
		
			function autoFillData( ) {
		// The actual JSON object data required for this to work is coming from the json.js which is loaded from the html page.
     	// Store the JSON data into local storage
		for (var n in json) {
			var id = Math.floor(Math.random( )*1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	function editItem( ) {
		// take the item data from local storage
		var value = localStorage.getItem( this.key );
//		console.log(getItem(this.key);
		var item = JSON.parse( value );
		var save = MiU ( 'submit' );
        
		// Show the form
		toggleControls( "off" );
        
		// populate the form with current localStorage values.
		MiU( 'genre' ).value = item.genre[1];
		MiU( 'btitle' ).value = item.btitle[1];
		MiU( 'author' ).value = item.author[1];
		MiU( 'isbn' ).value = item.isbn[1];
		MiU( 'comments' ).value = item.comments[1];
		MiU( 'seriesname' ).value = item.seriesname[1];
		MiU( 'seriesnum' ).value = item.seriesnum[1];
		MiU( 'date' ).value = item.date[1];    // correcting missing date field
		var radios = document.forms[0].isaseries;
			for ( var i=0; i<radios.length; i++ ) {
				if ( radios[i].value == "No" && item.series[1] == "No" ) {
					radios[i].setAttribute("checked", "checked" );
			} else if( radios[i].value == "Yes" && item.series[1] == "Yes" ) {
				radios[i].setAttribute( "checked", "checked" );
			}
		}

		save.removeEventListener( "click", storeData );
		// Change the submit button value to Edit button
		MiU( 'submit' ).value = "Edit Book Info";
		var editSubmit = MiU( 'submit' );
		// Save the key value established in this function as a property of the editSubmit event
		// so it can be used when we save the edited data.
		editSubmit.addEventListener( "click", validate );
		editSubmit.key = this.key;
    }
    
    function deleteItem( ) {
		var ask = confirm( "Are you sure you want to delete this book?" );
		if (ask) {
			localStorage.removeItem( this.key );
			alert ( "The book has been deleted");
			window.location.reload( );
		} else {
			alert ( "The book was NOT deleted");
		}
	}
	
		// Make Item Links - create the edit and delete links for each item when displayed.
	function makeItemLinks( key, linksLi ) {
		// add edit single item link
		var editLink = document.createElement( 'a' );
		editLink.href = "#";
		editLink.key = key;
		console.log(editLink.key);
		var editText = "Edit Book Info";
		editLink.addEventListener( "click", editItem );
		editLink.innerHTML = editText;
		linksLi.appendChild( editLink );
        
		// add a line break
		var breakTag = document.createElement( 'br' );
		linksLi.appendChild( breakTag );
        
		// add delete single item link
		var deleteLink = document.createElement( 'a' );
		deleteLink.href = '#';
		deleteLink.key = key;
		var deleteText = "Delete Book Info";
		deleteLink.addEventListener( "click", deleteItem );
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild( deleteLink );
	}
	
		// Get the image for the genre being displayed
	function getImage( catName, makeSubList ) {
		var imageLi = document.createElement( 'li' );
		makeSubList.appendChild( imageLi );
		var newImg = document.createElement( 'img' );
		var setSrc = newImg.setAttribute( "src", "../images/" + catName + ".png" );
		imageLi.appendChild(newImg);
	}

		function getData ( ) {
		toggleControls( "on" );
		if (localStorage.length === 0 ) {
			alert ( "There is no data in Local Storage so default data was added." );
			autoFillData();
		}
		var makeDiv = document.createElement( 'div' );
		makeDiv.setAttribute( "id", "items" );
		var makeList = document.createElement( 'ul' );
		makeDiv.appendChild( makeList );
		document.body.appendChild( makeDiv );
		document.getElementById("myLibrary").appendChild(makeDiv);
		MiU( 'items' ).style.display = "block";
		for (var i=0, len=localStorage.length; i<len; i++ ) {
			var makeli = document.createElement( 'li' );
			var linksLi = document.createElement( 'li' );
			makeList.appendChild( makeli );
			var key = localStorage.key( i );
//			console.log(key);
			var value = localStorage.getItem( key );
			// Convert the string from local storage value back to an object by using stringify
			var obj = JSON.parse( value );
			var makeSubList = document.createElement( 'ul' );
			makeli.appendChild( makeSubList );
			getImage( obj.genre[1], makeSubList );
			for (var n in obj ) {
				var makeSubli = document.createElement( 'li' );
				makeSubList.appendChild( makeSubli );
				var optSubText = obj[ n ] [ 0 ]+ " " +obj[ n ] [ 1 ];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
		makeItemLinks( localStorage.key(i), linksLi); // create the edit and delete buttons or links for each item in local storage.
		}
	}
	
	
	function clearLocData( ) {
		if (localStorage.length === 0) {
			alert ( "This is no data to clear." );
		} else {
			localStorage.clear( );
			alert( "All contacts are deleted!" );
			window.location.reload( );
			return false;
		}
	}
	
	var parseEventForm = function(data) {              //use data store
		storeData();
		console.log(localStorage);
	};
	
	var displayLink = MiU ( 'displayLink' );
	displayLink.addEventListener ( 'click', getData );
    
	var clearLink = MiU ( 'clearLink' );
	clearLink.addEventListener ( 'click', clearLocData );

	var save = MiU ( 'submit' );
	save.addEventListener ( 'click', storeData );




/*
	function getLib() {
		var bookShelf = "";  
		var b = 0;
		// get the number of items in storage starting at 0
		var storeLength = localStorage.length-1;
		for (b = 0; b < storeLength; b++) {
			var bookKey = localStorage.key(b);
			var values = localStorage.getItem(bookKey);
			values = values.split(";");
			var v1 = values[0];
			var v2 = values[1];
			var v3 = values[2];
			var v4 = values[3];
			var v5 = values[4];
			var v6 = values[5];
			var v7 = values[6];
			var v8 = values[7];
			
			bookShelf += '<li>Book Title:'+v1+' Author: '+v2+' ? '+v3+' ? '+v4+' ? '+v5+' ? '+v6+' ? '+v7+' ? '+v8;
		}   
		
		// if there are no items in storage
		if(bookShelf === "") {
			bookShelf = '<li class="empty">No books in storage</li>';
		
		$("theLibrary").html(bookShelf);
		}
	}
	
	
	getLib();   */
});



