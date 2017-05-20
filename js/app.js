//
// asyncronous -- happens at different type
$.ajax({
  url: 'https://www.googleapis.com/books/v1/volumes?q=eggs',
  dataType: 'json',
  success: function(data){
    console.log(data);
    var test = data.items[0];

    var newTitle = document.createElement('h1');
    var bookTitle = document.createTextNode(test.volumeInfo.title);
    newTitle.appendChild(bookTitle);
    var addHere = document.getElementById('title');
    addHere.appendChild(newTitle);

    console.log(test.volumeInfo.title);

    for (var i = 0; i < data.items.length; i++) {
      var divRow = document.createElement('div');
      divRow.className = 'row';
      divRow.id = 'books';
      addHere.appendChild(divRow);

      var divCol = document.createElement("div");
      divCol.className = 'col-md-6';
      divCol.id = 'books-img-info' + i;
      var addBooksHere = document.getElementById('books');
      addBooksHere.appendChild(divCol);

      var divImg = document.createElement('div');
      divImg.innerHTML += "<img src=" + data.items[i].volumeInfo.imageLinks.thumbnail + "/>"
      divImg.className = 'book-image';
      var addImgHere = document.getElementById(divCol.id);
      addImgHere.appendChild(divImg);

      var divInfo = document.createElement('div');
      divInfo.className = 'book-info';
      divInfo.innerHTML += "<h3>" + data.items[i].volumeInfo.title + "</h3>";
      var addInfoHere = document.getElementById(divCol.id)
      addInfoHere.appendChild(divInfo);

    }

    console.log("description:" + test.volumeInfo.description);
    console.log("author:" + test.volumeInfo.authors);
    console.log("price:" + test.saleInfo.listPrice.amount);
    console.log("image: "+ test.volumeInfo.imageLinks.thumbnail);

  }
})
