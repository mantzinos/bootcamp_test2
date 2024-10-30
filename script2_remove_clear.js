
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear'); //new



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
  itemList.appendChild(li);
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

function removeItem(e){ //new
  if(e.target.parentElement.classList.contains('remove-item')){
    e.target.parentElement.parentElement.remove();
  }
}

function clearItems(e){ //new
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
}

//Event listeners
itemForm.addEventListener('submit', onAddItemSubmit);

itemList.addEventListener('click', removeItem); //new
clearBtn.addEventListener('click', clearItems); //new