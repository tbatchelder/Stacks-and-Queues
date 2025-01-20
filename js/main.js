// Create an object to store all of the needed information so we only have to access it once.
store = [];
store[0] = {};
store[0].size = 1;
store[0].front = 0;
store[0].tail = 0;
store[0].loop = 0;
store[0].sizeButton = document.getElementById("setQ1Size");
store[0].frontButton = document.getElementById("isQ1Front");
store[0].tailButton = document.getElementById("isQ1Tail");
store[0].status = document.getElementById("isQ1Status");
store[0].q1_0 = document.getElementById("q1_0");
store[0].contents = [];

store[1] = {};
store[1].top = 0;
store[1].bottomButton = document.getElementById("isS1Bottom");
store[1].topButton = document.getElementById("isS1Top");
store[1].status = document.getElementById("isS1Status");
store[1].s1_0 = document.getElementById("s1_0");
store[1].count = 0;

// store[0].contents is the critical pin that controls Enq and Deq since it holds all values in order.
// store[0].loop allows the counter to count properly as the Queue loops around multiple times.
// The first value is always the front.
// The last value is always the tail.

// Increment the size of the Queue or Stack
function setQueueSize(area) { 
  // Let's make sure they can't increase the size if there are Queue items already
  if (store[0].contents == []) {
    // Increment the size value
    store[0].size += 1;
    // Update the size display
    store[0].sizeButton.innerHTML = "Size: " + (store[0].size);
    // Create the new DOM element
    addElement("Q", store[0].size - 1, "posCounter", "qPosition", "qP1_" + (store[0].size - 1), "visuals", "qVisual", "q1_" + (store[0].size - 1));
  } else {
    store[0].status.textContent = "Status: Please clear the Queue before increasing the size.";
    statusRestore("Q");
  }
}

// Create a new element
// Parameters:
//   position counter value
//   CSS class of new element for the position
//   ID of the div to place the new element into for the position counter
//   ID of the position counter
//   CSS class of the new Queue element
//   ID of the div to place the new element into for the Queue display
//   ID of the new Queue element so it can be interacted with later on
function addElement (theType, theCount, posClass, posParentID, posNewID, visClass, visParentID, visNewID) {
  // Create the new element for the position display
  let newPositionElement = document.createElement("span");
  // Set the text for it
  newPositionElement.textContent = theCount;
  // Add the class to the element
  newPositionElement.classList.add(posClass);
  // Add the id to the element
  newPositionElement.setAttribute("id", posNewID);
  // Get the parent element where you want to add the new element
  let parentElement = document.getElementById(posParentID);
  // Append the new element to the parent
  parentElement.appendChild(newPositionElement); 
  
  // Keep the line to only 10 items wide so it doesn't go on forever
  if (theCount % 9 == 0) {
    let breaker = document.createElement("br");
    parentElement.appendChild(breaker);
  }
  
  // Now add the visual part of the Stack/Queue in the same manner
  let newVisualElement = document.createElement("span");
  if (theType == "Q") {
    newVisualElement.textContent = String.fromCharCode(164);
  } else {
    newVisualElement.textContent = theCount;
  }
  newVisualElement.textContent = String.fromCharCode(164);
  newVisualElement.classList.add(visClass);

  // Add the id to the new element
  newVisualElement.setAttribute("id", visNewID);
  let parentVisualElement = document.getElementById(visParentID); 
  parentVisualElement.appendChild(newVisualElement);
  
  // Keep the line to only 10 items wide so it doesn't go on forever
  if (theCount % 9 == 0) {
    let breaker = document.createElement("br");
    parentVisualElement.appendChild(breaker);
  }
  
  // Add the new element to the store
  if (theType == "Q") {
    store[0][visNewID] = document.getElementById(visNewID);
  } else {
    store[1][visNewID] = document.getElementById(visNewID);
  }

  // Update the status
  if (theType == "Q") {
    store[0].status.textContent = "Status: Added element to Queue.";
    statusRestore("Q");
  } else {
    store[1].status.textContent = "Status: Added element to Stack.";
    statusRestore("S");
  }
};

// Enqueue a value into the Queue Q1
function enqQ1() {
  // Check to see if the queue is full
  if (store[0].contents.length == store[0].size) {
    store[0].status.textContent = "Status: Queue is full.  Expand the Queue or Dequeue an item.";
    statusRestore("Q");
    return;
  }

  switch (true) {
    // If the Queue is empty, add the first item to it
    case store[0].contents.length == 0:
      store[0].front = 0;
      store[0].tail = 0;
      store[0].contents.push(0);
      store[0].status.textContent = "Status: Added item to queue.";
      statusRestore("Q");
      break;
    
    // Check to see if the new tail will overwrite the current head
    case (store[0].tail + 1) == store[0].front:
      store[0].status.textContent = "Status: New Tail cannot overwrite Front. Queue is full. Dequeue an item.";
      statusRestore("Q");
      break;
    
    // Check to see if the Queue has space open from the current tail to the end of the Queue size
    case (store[0].tail + 1) < store[0].size:
      store[0].tail += 1;
      if (store[0].tail < store[0].front) {
        // Here, we need to account for looping of the Queue so we take the current tail and add the current Queue size time the loop counter
        store[0].contents.push(store[0].tail + store[0].size * store[0].loop);
      } else {
        store[0].contents.push(store[0].tail + store[0].size * store[0].loop);
      }
      store[0].status.textContent = "Status: Added item to queue.";
      statusRestore("Q");
      break;
    
    // Check to see if the new tail exceeds the Queue size
    case (store[0].tail + 1 == store[0].size):
      // If the Queue is full, it needs to check to see if it can loop to the front or if the Queue is full
      if (store[0].contents.length == store[0].size) {
        store[0].status.textContent = "Status: New Tail cannot overwrite Front. Queue is full. Dequeue an item.";
      } else if (store[0].head != 0) {
        store[0].tail = 0;
        store[0].loop += 1; // If we loop to the front, increment the counter
        store[0].contents.push(store[0].tail + store[0].size * store[0].loop);
        store[0].status.textContent = "Status: Added item to queue.";
      }
      statusRestore("Q");
      break;
  }
 
  // Update the visuals
  store[0].frontButton.textContent = "Front: " + store[0].front;
  store[0].tailButton.textContent = "Tail: " + store[0].tail;
  store[0]["q1_" + store[0].tail].textContent = store[0].contents[store[0].contents.length - 1];
}

// Dequeue a value from the Queue Q1
function deqQ1() {
  // Since we know where the front is, we can set the cell and contents right away
  store[0]["q1_" + store[0].front].textContent = String.fromCharCode(164);
  temp = store[0].contents;
  temp.splice(0, 1);
  store[0].contents = temp;

  // Let's make a switch case to clean this up
  //   If the front = tail and we Deq, there is no Queue anymore
  //   If the front < tail and we Deq, then we move the front forward one space unless we exceed the Queue
  //   If the front > tail and we Deq, we have to figure out if the new front loops around
  let checkSpace = store[0].tail - store[0].front;
  switch (true) {
    case checkSpace == 0:
      store[0].front = 0;
      store[0].tail = 0;
      store[0].status.textContent = "Status: All items removed from Queue.";
      statusRestore("Q");
      break;
    
    case checkSpace > 0:
      // As stated, we need to check to see if the front will move beyond the Queue size
      if (store[0].front + 1 < store[0].size) {
        store[0].front += 1;
        store[0].status.textContent = "Status: One item removed from Queue. Front updated.";
        statusRestore("Q");
      } else if (store[0].front + 1 == store[0].size) {
        store[0].front = 0;
        store[0].status.textContent = "Status: One item removed from Queue. Front updated.";
        statusRestore("Q");
      };
      break;
    
    case checkSpace < 0:
      if (store[0].front + 1 == store[0].size) {
        store[0].front = 0;
      } else {
        store[0].front += 1;
      }
      store[0].status.textContent = "Status: One item removed from Queue. Front updated.";
      break;
  }
  
  // store[0].status.textContent = "Status: Removed item from queue.";
  store[0].frontButton.textContent = "Front: " + store[0].front;
};

// Reset the system back to the default
function whiteoutQ() {
  store[0].sizeButton.textContent = "Size: 1";
  store[0].frontButton.textContent = "Front: 0";
  store[0].tailButton.textContent = "Tail: 0";
  store[0].q1_0.textContent = String.fromCharCode(164);
  store[0].front = 0;
  store[0].tail = 0;
  store[0].loop = 0;
  // We also need to remove the HTML elements added ... forgot about that :)
  for (i = 1; i < store[0].size; i++) {
    // Remove the position counter
    tempID = "qP1_" + i;
    tempElement = document.getElementById(tempID);
    tempElement.remove();
    // Remove the visual 
    tempID = "q1_" + i;
    tempElement = document.getElementById(tempID);
    tempElement.remove();
    // Remove the dictionary element
    delete store[0][tempID];
  }
  store[0].size = 1;
  store[0].contents = [];
  store[0].status.textContent = "Status: Cleared Queue.";
  statusRestore("Q");
};

// A delay function to force a pause in state changes
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

// Used to "blink" the appropirate Contents field so the user can see which one it is referring too
async function blinker(blinkee) {
  let blinkme = "";
  let theClass = "";

  switch (blinkee) {
    case 'frontQ':
      blinkme = store[0]["q1_" + store[0].front];
      theClass = "qFront";
      break;
    
    case 'tailQ':
      blinkme = store[0]["q1_" + store[0].tail];
      theClass = "qTail";
      break;
    
    case 'bottom':
      blinkme = store[1]["s1_0"];
      theClass = "sBottom";
      break;
    
    case 'top':
      blinkme = store[1]["s1_" + store[1].top];
      theClass = "sTop";
      break;
  }

  for (i = 0; i < 6; i++) {
    blinkme.classList.toggle(theClass);
    await delay(200);
  }
};

// Used to return the status line to a default value after each change
async function statusRestore(theType) {
  await delay(800);
  if (theType == "Q") {
    store[0].status.textContent = "Status: Awaiting command.";
  } else {
    store[1].status.textContent = "Status: Awaiting command.";
  }
}

//////////////////////////////////////////////////////////////

// Add a new item to the Stack
function push1() {
  // Check if there are no values in the Stack
  if (store[1].count == 0) {
    // If there is nothing, all we need to do is add the markers for it
    store[1].count += 1;

    store[1]["s1_0"].textContent = "0";
    store[1].status.textContent = "Status: Added element to Stack.";
    statusRestore("S");
  } else {
    addElement("S", store[1].count, "posCounter", "sPosition", "sP1_" + store[1].count, "visuals", "sVisual", "s1_" + store[1].count);
    store[1]["s1_" + store[1].count].textContent = store[1].count;
    store[1].count += 1;
    store[1].top += 1;
    store[1].topButton.textContent = "Top (Peek): " + store[1].top;
    statusRestore("S");
  }
}

// Remove an item from the stack
// We don't need to "hide" anything since the pop removes it ... so we just need to remove the item
function pop1() {
  if (store[1].top - 1 < 0) {
    store[1].top = 0;
    store[1].count = 0;
    store[1].topButton.textContent = "Top (Peak): " + store[1].top;
    store[1].s1_0.textContent = String.fromCharCode(164);
    store[1].status.textContent = "Status: All items removed; cannot remove more.";
    statusRestore("S");
    
  } else {
    store[1].top -= 1;
    store[1].count -= 1;
    store[1].topButton.textContent = "Top (Peak): " + store[1].top;

    tempID = "sP1_" + store[1].count;
    tempElement = document.getElementById(tempID);
    tempElement.remove();

    tempID = "s1_" + store[1].count;
    tempElement = document.getElementById(tempID);
    tempElement.remove();

    // Remove the dictionary element
    delete store[1][tempID];

    store[0].status.textContent = "Status: Popped Stack element.";
    statusRestore("Q");
  }
}

