
var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
var bookName = 'eggs';

var newUrl = bookUrl + bookName;

document.getElementById('clickMe').onclick = function (){bookSearch ()};

function bookSearch (){
  var search = document.getElementById('input-search').value;
  if( search != '') {
    console.log(search);
    newUrl = bookUrl + search;
    bookName = search;
    bookstore (newUrl);

    document.getElementById('title').innerHTML = '';
  }
}

function bookstore( newUrl){
  // asyncronous -- happens at different type
  $.ajax({
    url: newUrl,
    dataType: 'json',
    success: function(data){
      console.log(data);
      var test = data.items[0];

      var newTitle = document.createElement('h1');
      var bookTitle = document.createTextNode(bookName);
      newTitle.appendChild(bookTitle);
      var addHere = document.getElementById('title');
      addHere.appendChild(newTitle);

      console.log(test.volumeInfo.title);

      var divRow = document.createElement('div');
      divRow.className = 'row';
      divRow.id = 'books';
      addHere.appendChild(divRow);

      for (var i = 0; i < data.items.length; i++) {

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
        divInfo.id = 'book-info' + i;
        divInfo.innerHTML += "<h3>" + data.items[i].volumeInfo.title + "</h3>";
        var addInfoHere = document.getElementById(divCol.id)
        addInfoHere.appendChild(divInfo);

        var pAuthor = document.createElement('p');
        pAuthor.className = 'author';
        var pText = document.createTextNode('by ' + data.items[i].volumeInfo.authors);
        var addPHere = document.getElementById(divInfo.id);
        pAuthor.appendChild(pText);
        addPHere.appendChild(pAuthor);

        var pDescription = document.createElement('p');
        pDescription.className = 'description';
        var pText = document.createTextNode(data.items[i].volumeInfo.description);
        pDescription.appendChild(pText);
        addPHere.appendChild(pDescription);

        if(data.items[i].saleInfo.hasOwnProperty('listPrice') ){
          var price = document.createElement('p');
          price.className = 'price';
          var currency = data.items[i].saleInfo.listPrice.currencyCode;
          var priceText = document.createTextNode('Price:  ' + data.items[i].saleInfo.listPrice.amount + '  ' + currency);
          price.appendChild(priceText);
          addPHere.appendChild(price);
        }
      }
      // console.log("description:" + test.volumeInfo.description);
      // console.log("author:" + test.volumeInfo.authors);
      // console.log("price:" + test.saleInfo.listPrice.amount);
    }
  })
}

bookstore (newUrl);
