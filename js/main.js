function main() {
    const q = new Queue();
    console.log(q);
    console.log("Is empty?", q.isEmpty());
    // for (let i = 1; i <= 6; i++) {
    //     q.enq(i);
    // }
    blinker(store.q0, "qFront", store.q1, "qTail");
    console.log("hi");
    // console.log("Front:   ", q.front());
    // console.log("Deq:     ", q.deq());
    // q.print();
    // console.log("Is empty?", q.isEmpty());
}

store = {};
store.qSize = 0;
store.qSizeButton = document.getElementById("setSize");
store.q0 = document.getElementById("q0");

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function blinker(headBlinkee, headCell, tailBlinkee, tailCell) {
  for (i = 0; i < 7; i++) {
    headBlinkee.classList.toggle(headCell);
    tailBlinkee.classList.toggle(tailCell);
    await delay(200);
  }
}

function enq() {
  
}

// Increment the size of the Queue or Stack
function setSize(area) {
  switch(area) {
    case "Q": 
      store.qSize += 1;
      store.qSizeButton.innerHTML = "Queue Size: " + (store.qSize + 1);
      addElement(store.qSize, "qp", "QPosition", "q", "qBox");
      break;
    default:
      break;
  }
}

// Create a new element
function addElement (aCount, aClass, aID, a2Class, a2ID) {
  // Create the new element for the position display
  let newPositionElement = document.createElement("span");
  // Set the text for it
  newPositionElement.textContent = aCount;
  // Add the class to the element
  newPositionElement.classList.add(aClass);
  // Set the id of the element
  newPositionElement.id = "q" + aCount;
  // Get the parent element where you want to add the new element
  let parentElement = document.getElementById(aID);
  // Append the new element to the parent
  parentElement.appendChild(newPositionElement); 
  
  if (store.qSize % 9 == 0) {
    let breaker = document.createElement("br");
    parentElement.appendChild(breaker);
  }
  
  let newElement1 = document.createElement("span");
  newElement1.textContent = String.fromCharCode(164);; 
  // Add the class to the element
  newElement1.classList.add(a2Class);
  // Get the parent element where you want to add the new element
  let parentElement1 = document.getElementById(a2ID); 
  // Append the new element to the parent
  parentElement1.appendChild(newElement1);
  
  if (store.qSize % 9 == 0) {
    let breaker = document.createElement("br");
    parentElement1.appendChild(breaker);
  }
  
  const thisKey = "q" + aCount;
  store[thisKey] = document.getElementById("q" + aCount);
};







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