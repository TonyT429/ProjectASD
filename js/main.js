//  Anthony Torrez
//  ProjectASD 

$('#home').on('pageinit', function() {
});

$('#addBook').on('pageinit', function() {
	var bookform = $('#recordbook'),
		errorlink = $('errorlink');
	bookform.validate({
		invalidHandler: function(form, validator) {
		errorlink.click();
		var html = ' ';
		for (var key in validator.submitted){
			var label = $('label[for^="'+ key +'"]').not('[generated]');
			var legend = label.closest('fieldset').find('.ui-controlgroup-label');
			var fieldName = legend.length ? legend.text() : label.text();
			console.log(fieldName);
			html += '<li>'+ fieldName +'</li>';
		};
		$('bookerrors ul').html(html);
		},
		submitHandler: function() {
			var data = bookform.serializeArray();
			localStorage.setItem('bookform', data);
			storeData(data);
		}
	});
});

var autofill = function() {
	for(var b in json) {
		var id = Math.floor(Math.random() * 1000000001);
		localStorage.setItem(id, JSON.stringify(json[b]));
		console.log(json);
	}
};

function toggleControls(n){
	switch(n) {
		case "on":
			$('#addItem').css('display', 'none');
			$('#getBooklist').css('display', 'none');
			$('#display').css('display', 'block');
			break;
		case 'off':
			$('#addItem').css('display', 'block');
			$('#getBooklist').css('display', 'inline');
			break;
		default:
			return false;
	}
}

$('#getBooklist').on('click', getBooklist);  // Check to see if there is data in local storage.  If empty, load dummy data.
	function getBooklist() {
		toggleControls('on');
		if(localStorage.length === 0) {
			alert('There are no books on the shelf, so example books have been added');
			autofill();
		}
		var list = $.find('#listTheBooks');
		$('#booklist').attr('id', 'items');
		for (var i=0, j=localStorage.length; i<j; i++) {
			var makelist = $('<li class="bookItem"></li>').appentTo(list);
			var linklist = $('<li class="bookLink"></li>').appendTo(list);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			for(var x in object) {
				$('<p>' + object[x][0] + objct[x][1] + '</p>'.appendTo(makelist);
			}
			createBooklinks(localStorage.key(i), linklist);
		}
		$('#listTheBooks').listview('refresh');
	};
	var createBooklinks = function(key, linklist) {
		var deleteLink = $(linklist).append('<a href="#">Delete Book Information</a>');
		deleteLink.key = key;
		$('#deleteLink').on('click', deleteLink);
		var editLink = $(linklist).append('<a href="#">Edit Book Information</a>');
		editLink.key = key;
		$('#editLink').on('click', editLink);
	}
	
// Gets the value of the selected Radio button
var radioSelect = function() {
	return $('input:radio[name=series]:checked').val();
};

var stored = function(key) {
	if (:key) {
		id = key;
		button = radioSelect();  //call in the value of the radio button
		var item = ();
			item.category = ["Category:", $('#category').val()];
			item.title = ["Book Title:", $('#title').val()];
			item.author = ["Author:", $('#author').val()];
			item.series = ["Part of a Series:" , button];
			item.seriesname = ["Name of Series:", $('#seriesname').val()];
			item.seriesnumber = ["Number in Series:", $('#seriesnumber').val()];
			item.rate = ["Rate the Book:", $('#rate').val()];
			item.comments = ["Comments:", $('#comments').val()];
			console.log(item);
			localStorage.setItem(id, JSON.stringify(item));
	}
	return false;
};


var deleteItem = function() {
	var verify = confirm('Delete this Book?');
	if(verify) {
		localStorage.removeItem(this.key);
		window.location.reload();
	} else {
		alert('Delete Book Cancelled');
	}
};

$('#display').on('click', display);
	function display() {
		if (localStorage.length === 0) {
			alert('No Books to Display!');
			autofill();
		} else {
			getBooklist();
		}
	};
	
$('clearStorage').on('click', clearStorage);
	function clearStorage() {
		if (localStorage === 0) {
			alert ('There is nothing to clear');
		} else {
			localStorage.clear();
			alert ('All Books have been removed');
			return false;
		}
	};
	

var editItem = function() {
	var value = localStorage.key(this.key);
	var item = JSON.parse(value);
	$('category').value = item.category[1];
	$('title').value = item.title[1];
	$('author').value = item.author[1];
	$('series').value = item.series[1];
	$('seriesname').value = item.seriesname[1];
	$('seriesnumber').value = item.seriesnumber[1];
	$('rate').value = item.rate[1];
	$('comments').value = item.comments[1];
	$('editItem').on('click', stored); //this may have been the error you were looking for!!!
	$('stored').val() = 'Edit';
	var editstored = $('stored');
	$('editstored').on('click', validate);
	editstored.key = this.key;
}
	
	
// Data Serialization

$('serial').on('pageinit', function() {
	
// Serialize the XML Data
	$('xmlBooks').on('click', function() {
		$('#bookshelf').empty();
			$.ajax({
				url: 'xhr/data.xml',
				type: 'GET',
				datatype: 'xml',
				success: function(xml) {
	                $(xml).find('item').each(function() {
	                    var item = $(this).find('item').text();
	                    var title = $(this).find('title').text();
					var author = $(this).find('author').text();
					var category = $(this).find('category').text();                   
	                    var series = $(this).find('series').text();
	                    var seriesName = $(this).find('seriesName').text();
	                    var seriesNum = $(this).find('seriesNum').text();
	                    var comments = $(this).find('comments').text();
	                    var rate = $(this).find('rate').text(); 
                         $("" +
                             '<li>' +
                                 '<h5>Title:  ' + title + '</h5>' +
                                   '<p>Author:  ' + author + '</p>' +
                                   '<p>Category:  ' + category + '</p>' +
                                   '<p>Series:  ' + series + '</p>' +
                                   '<p>Series Name:  ' + seriesName + '</p>' +
                                   '<p>Number in Series:  ' + seriesNum + '</p>' +
                                   '<p>Rate:  ' + rate + '</p>' +
                                   '<p>Comments:  ' + comments + '</p>' +
                              '</li>'
                              ).appendTo('#bookshelf');
                              $('#bookshelf').listview('refresh');
				});
            	}
	    });
	});


     
     
// Serialization of JSON Data
    $('#jsonBooks').on('click', function() {
          $('#bookshelf').empty();
          $.ajax({
			url: 'xhr/data.json',
			type: 'GET',
               dataType: 'json',
               success: function(responseText) {
                   for (var i=0, j=responseText.items.length; i<j; i++){
					var book = responseText.items[i];
                         	$(""+
                         	'<li>' +
                                    '<h5>Title:  ' + book.title + '</h5>' +
                                  	 '<p>Author:  ' + book.author + '</p>' +
                                  	 '<p>Category:  ' + book.category + '</p>' +
                                    '<p>Series:  ' + book.series + '</p>' +
                                    '<p>Series Name:  ' + book.seriesname + '</p>' +
                                    '<p>Number in Series:  ' + book.seriesnumber + '</p>' +
                                    '<p>Rate:  ' + book.rate + '</p>' +
                                    '<p>Comments:  ' + book.comments + '</p>' +
						'</li>'
						).appendTo('#bookshelf');
                              $("#bookshelf").listview("refresh");
                              	console.log("Working");
                              	console.log(responseText);
                    }
			}  
          });
     });
     return false;
});





