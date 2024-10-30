
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

const itemFilter = document.getElementById('filter'); //new----------------




function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  //create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  //add li to the DOM
  itemList.appendChild(li);
  checkUI() //new -------------------------------------------------------
  itemInput.value='';
}

function createButton(classes){
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes){
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function removeItem(e){ 
  if(e.target.parentElement.classList.contains('remove-item')){
    if(confirm('Are you sure?')){ //new----------------
      e.target.parentElement.parentElement.remove();
      checkUI(); //new------------------------------------
  }
}

function clearItems(e){ 
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  checkUI(); //new----------------------------------------------------------
}

function checkUI(){ //new-------------------------------------------------
  const items = itemList.querySelectorAll('li');  //new------------------------
  if(items.length === 0){
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  }else{
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

//Event listeners
itemForm.addEventListener('submit', onAddItemSubmit);

itemList.addEventListener('click', removeItem); 
clearBtn.addEventListener('click', clearItems); 

checkUI();  //new------------------------------------------------