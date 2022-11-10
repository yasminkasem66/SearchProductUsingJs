function Search(){
  const SearchBox = document.getElementById("Search-item").value.toUpperCase();
  const product = document.querySelectorAll(".product");

  for (let i = 0; i < product.length; i++) {
    let match =product[i].getElementsByTagName('h2')[0];
    if(match){
       let textValue =match.textContent || match.innerHTML
       if(textValue.toUpperCase().indexOf(SearchBox) > -1){
        product[i].style.display="";
       }else{
        product[i].style.display="none";
       }
    
    }
  }
}
