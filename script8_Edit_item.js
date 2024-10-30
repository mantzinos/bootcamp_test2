
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

const itemFilter = document.getElementById('filter'); 
const formBtn = itemForm.querySelector('button'); //new--------------

let isEditMode = false; //new----------------------------------------

function displayItems(){ 
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach(each=>addItemToDOM(item));
  checkUI();
}


function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;


  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  //Create item DOM element
  addItemToDOM(newItem); 
  //content has been moved to addITemToDOM
  //Add item to local storage
  addItemToStorage(newItem);
  checkUI() 
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



function clearItems(e){ 
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  //clear from local storage
  localStorage.removeItem('items'); 
  checkUI(); 
}

function filterItems(e){ 
  const items = itemList.querySelectorAll('li');  
  const text = e.target.value.toLowerCase();

  items.forEach(item =>{
    const itemName = item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text) !=-1){
      item.style.display = 'flex';
    }else{
      item.display.display='none';
    }
  });

}

function checkUI(){ 
  const items = itemList.querySelectorAll('li');  
  if(items.length === 0){
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  }else{
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

function addItemToDOM(item){ 
  //create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  //add li to the DOM
  itemList.appendChild(li);
}

function addItemToStorage(item){ 
  const itemsFromStorage =getItemsFromStorage(); 

  //Adding new item to array
  itemsFromStorage.push(item);
  //Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){ 
  let itemsFromStorage;
  if(localStorage.getItem('items')==null){
    itemsFromStorage =[];
  }else{
    itemsFromStorage=JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function removeItem(item){ 
  if(confirm('Are you sure')){
    //Remove item from DOM
    item.remove();
    //Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }

  }

  function removeItemFromStorage(item){ 
    let itemsFromStorage = getItemsFromStorage();
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i)=>i !== item);
    //Re-set to localstorage
    localStorage.setITem('items', JSON.stringify(itemsFromStorage));
  }

function onClickItem(e){ //new-------------------------------------
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
  }else{ //new-------------------------------------------------------
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item){ //new----------------------------------
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));
  item.style.color = '#ccc';
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></> Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
  
}


//Event listeners
itemForm.addEventListener('submit', onAddItemSubmit);

itemList.addEventListener('click', onClickItem); 
clearBtn.addEventListener('click', clearItems); 

itemFilter.addEventListener('input', filterItems); 
document.addEventListener('DOMContentLoaded', displayItems); 
checkUI();  