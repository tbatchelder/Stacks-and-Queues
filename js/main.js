// Create an object to store all of the needed information so we only have to access it once.
store = [];
store[0] = {};
store[0].size = 1;
store[0].front = 0;
store[0].tail = 0;
store[0].sizeButton = document.getElementById("setQ1Size");
store[0].frontButton = document.getElementById("isQ1Front");
store[0].tailButton = document.getElementById("isQ1Tail");
store[0].status = document.getElementById("isQ1Status");
store[0].q1_0 = document.getElementById("q1_0");
store[0].contents = [];

// store[0].contents is the critical pin that controls Eng and Deq since it holds all values in order.
// The first value is always the front.
// The last value is always the tail.

// Increment the size of the Queue or Stack
function setSize(area) {
  switch(area) {
    case "Q1": 
      // Increment the size value
      store[0].size += 1;
      // Update the size display
      store[0].sizeButton.innerHTML = "Size: " + (store[0].size);
      // Create the new DOM element
      addElement(store[0].size - 1, "posCounter", "qPosition", "visuals", "qVisual", "q1_" + (store[0].size - 1));
      break;
    
    default:
      break;
  }
}

// Create a new element
// Parameters:
//   position counter value
//   CSS class of new element for the position
//   ID of the div to place the new element into for the position counter
//   CSS class of the new Queue element
//   ID of the div to place the new element into for the Queue display
//   ID of the new Queue element so it can be interacted with later on
function addElement (theCount, posClass, posParentID, visClass, visParentID, visNewID) {
  // Create the new element for the position display
  let newPositionElement = document.createElement("span");
  // Set the text for it
  newPositionElement.textContent = theCount;
  // Add the class to the element
  newPositionElement.classList.add(posClass);
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
  store[0][visNewID] = document.getElementById(visNewID);

  // Update the status
  store[0].status.textContent = "Status: Added element to Queue.";
  statusRestore();
};

// Enqueue a value into the Queue Q1
function enqQ1() {
  // Check to see if the queue is full
  if (store[0].contents.length == store[0].size) {
    store[0].status.textContent = "Status: Queue is full.  Expand the Queue or Dequeue an item.";
    statusRestore();
    return;
  }

  // Add the first item to the queue if there is nothing in the Queue
  if (store[0].contents.length == 0) {
    store[0].front = 0;
    store[0].tail = 0;
    store[0].contents.push(0);
    store[0].status.textContent = "Status: Added item to queue.";
    statusRestore();

  // Here, we need to start checking the size and fullness of the queue
  } else {
    // Check that the head isn't in the way
    if ((store[0].tail + 1) == store[0].front) {
      store[0].status.textContent = "Status: New Tail cannot overwrite Front. Queue is full. Dequeue an item.";
      statusRestore();
    } else {
      // If the next open cell isn't the head, go ahead and add it
      store[0].tail += 1;
      store[0].contents.push(store[0].tail);
      store[0].status.textContent = "Status: Added item to queue.";
    }
  }
  console.log(store[0].contents);
  // Update the visuals
  store[0].frontButton.textContent = "Front: " + store[0].front;
  store[0].tailButton.textContent = "Tail: " + store[0].tail;
  store[0]["q1_" + store[0].tail].textContent = store[0].contents[store[0].tail];
}

// Dequeue a value from the Queue Q1
function deqQ1() {






  // Since we know where the front is, we can set the cell and contents right away
  store[0]["q1_" + store[0].front].textContent = String.fromCharCode(164);
  temp = store[0].contents;
  temp.splice(0, 1);
  store[0].contents = temp;
console.log(store[0].contents);
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
      statusRestore();
      break;
    case checkSpace > 0:
      // As stated, we need to check to see if the front will move beyond the Queue size
      if (store[0].front + 1 < store[0].size) {
        store[0].front += 1;
        store[0].status.textContent = "Status: One item removed from Queue. Front updated.";
        statusRestore();
      } else if (store[0].front + 1 == store[0].size) {
        store[0].front = 0;
        store[0].status.textContent = "Status: One item removed from Queue. Front updated.";
        statusRestore();
      } else {

      };
      break;
    case checkSpace < 0:
      break;
  }




  // After removing the front, we need to figure out where the new front is ... which typically will be the next in line
  // However, the first case only works when the tail hasn't wrapped around.
  //   store[0].tail = 2; 
  // if ((store[0].front + 1) <= store[0].tail) {
    

  // // This is where it gets tricky now
  // // If the tail moved in front of the front, we have to find where it went
  // } else {
  //   // There are multiple options here
  //   // First, let's find out if there are any more values in the queue
  //   // let checker = -1;
  //   // for (let i = 0; i < store[0].contents.length; i++) {
  //   //   if (store[0].contents[i] != '') {
  //   //     checker = i;
  //   //     break;
  //   //   }
  //   // }
  //   // let checker = store[0].size - store[0].front + store[0].tail + 1;
  //   // console.log(checker);

  //   // Once we've determined if there is a value or not, let's check that there are no values first.
  //   if (checker == -1) {
  //     store[0].status.textContent = "Status: All items removed from Queue.  Cannot remove more.";
  //     // send it to the Clear function
  //     whiteout();
  //   }
  //   // Now, let's find out if the front is at the end of the queue which means looping back on itself, if there is room
  //   if (checker = store[0].contents.length) {
      
  //   }
  // }
  
  // store[0].status.textContent = "Status: Removed item from queue.";
  store[0].frontButton.textContent = "Front: " + store[0].front;
};

// Reset the system back to the default
function whiteout() {
  store[0].contents = [];
  store[0].frontButton.textContent = "Front: 0";
  store[0].tailButton.textContent = "Tail: 0";
  store[0].front = 0;
  store[0].tail = 0;
};

// A delay function to force a pause in state changes
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};

// Used to "blink" the appropirate Queue Contents field so the user can see which one it is referring too
async function blinker(blinkee) {
  let blinkme = "";
  let theClass = "";

  switch (blinkee) {
    case 'front':
      blinkme = store[0]["q1_" + store[0].front];
      theClass = "qFront";
      break;
    
    case 'tail':
      blinkme = store[0]["q1_" + store[0].tail];
      theClass = "qTail";
      break;
  }

  for (i = 0; i < 6; i++) {
    blinkme.classList.toggle(theClass);
    await delay(200);
  }
};

// Used to return the status line to a default value after each change
async function statusRestore() {
  await delay(800);
  store[0].status.textContent = "Status: Awaiting command.";
}







// main();
// class Queue(object):
//     def __init__(self, list=None):
//         if list is None:
//             list = []
//         self.queue = list

//      def get_list(self):
//          return self.queue

//     def size(self):
//         return len(self.queue)

//     def front(self):
//         if self.is_empty():
//             return None
//         return self.queue[0]

//     def tail(self):
//         return self.queue[-1]

//     def deq(self):
//         if self.is_empty():
//             return None
//         return self.queue.pop(0)

//     def enq(self, data=None):
//         self.queue.append(data)

//     def print(self):
//         print(self.queue)

//     def __str__(self):
//         return self.queue.__str__()

//     def __repr__(self):
//         return self.queue.__repr__()

//     def is_empty(self):
//         return len(self.queue) == 0

//     def clear(self):
//         self.queue = []

//     def __eq__(self, other):
//         if isinstance(other, self.__class__):
//             return self.queue == other.queue
//         return False

// def main():
//     q = Queue()
//     q.print()
//     print("Is empty?", q.is_empty())
//     for i in range(1, 7):
//         q.enq(i)
//     print("Front:   ", q.front())
//     print("Deq:     ", q.deq())
//     q.print()
//     print("Is empty?", q.is_empty())

// # Don't run main on import
// if __name__ == "__main__":
//     main()





// # STACK IMPLEMENTATION
// # DO NOT MODIFY

// class Stack(object):
//     def __init__(self, list=None):
//         if list is None:
//             list = []
//         self.stack = list

//     def peek(self):
//         if self.is_empty():
//             return None
//         return self.stack[-1]

//     def pop(self):
//         if self.is_empty():
//             return None
//         return self.stack.pop()

//     def push(self, data=None):
//         self.stack.append(data)

//     def print(self):
//         print(self.stack)

//     def is_empty(self):
//         return len(self.stack) == 0

//     def clear(self):
//         self.stack = []

//     def __str__(self):
//         return self.stack.__str__()

//     def __repr__(self):
//         return self.stack.__repr__()

//     def __eq__(self, other):
//         if isinstance(other, self.__class__):
//             return self.stack == other.stack
//         return False

// def main():
//     s = Stack()
//     s.print()
//     print("Is empty?", s.is_empty())
//     for i in range(1, 7):
//         s.push(i)
//     print("Peek:    ", s.peek())
//     print("Pop:     ", s.pop())
//     s.print()
//     print("Is empty?", s.is_empty())

// # Don't run main on import
// if __name__ == "__main__":
//     main()





// / QUEUE IMPLEMENTATION
// class Queue {
//   constructor(list = []) {
//     this.queue = list;
//   }

//   // getList() {
//   //   return this.queue;
//   // }

//   size() {
//     return this.queue.length;
//   }

//   front() {
//     if (this.isEmpty()) {
//       return null;
//     }
//     return this.queue[0];
//   }

//   tail() {
//     return this.queue[this.queue.length - 1];
//   }

//   deq() {
//     if (this.isEmpty()) {
//       return null;
//     }
//     return this.queue.shift();
//   }

//   enq(data = null) {
//     this.queue.push(data);
//   }

//   print() {
//     console.log(this.queue);
//   }

//   toString() {
//     return this.queue.toString();
//   }

//   valueOf() {
//     return this.queue.valueOf();
//   }

//   isEmpty() {
//     return this.queue.length === 0;
//   }

//   clear() {
//     this.queue = [];
//   }

//   equals(other) {
//     if (other instanceof Queue) {
//       return JSON.stringify(this.queue) === JSON.stringify(other.queue);
//     }
//     return false;
//   }
// }

// function main() {
//     const q = new Queue();
//     console.log(q);
//     console.log("Is empty?", q.isEmpty());
//     // for (let i = 1; i <= 6; i++) {
//     //     q.enq(i);
//     // }
//     blinker(store.q0, "qFront", store.q1, "qTail");
//     console.log("hi");
//     // console.log("Front:   ", q.front());
//     // console.log("Deq:     ", q.deq());
//     // q.print();
//     // console.log("Is empty?", q.isEmpty());
// }