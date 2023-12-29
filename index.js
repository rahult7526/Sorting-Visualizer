let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "#7182ca";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "white";
        //bars[j].innerText = array[j];
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "white";
        //bars[j + 1].innerText = array[j + 1];
        await sleep(speedFactor);
      }
    }
    await sleep(speedFactor);
  }
  return array;
}

async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "white";
  //bars[leftIndex].innerText = items[leftIndex];
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "white";
  //bars[rightIndex].innerText = items[rightIndex];
  await sleep(speedFactor);
}
async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "lightslategray";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "#7182c";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "#7182ca";
  }
  return items;
}


//write insertion sort function
async function InsertionSort(array) {
  let bars = document.getElementsByClassName("bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "lightslategray";
      //bars[j + 1].innerText = array[j + 1];
      await sleep(speedFactor);

      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "#7182ca";
        }
      }
      j = j - 1;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "white";
    //bars[j + 1].innerText = array[j + 1];
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#7182ca";
  }
  return array;
}


async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "lightblue";
  bars[j].style.backgroundColor = "lightblue";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "#7182ca";
    }
  }
  //bars[i].innerText = array[i];
  //bars[j].innerText = array[j];
  return array;
}

//write mergeSort function
async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  let actualHalf = await mergeSort(left);
  await mergeSort(right);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;

    } else {
      arr[k] = right[j];
      j++;

    }
    
    //visualize it for right and left side
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "white";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
      console.log(arr[k] * heightFactor);
      bars[k + arr.length].style.backgroundColor = "#7182ca";
    }
    await sleep(speedFactor);
    //bars[k].innerText = arr[k];

    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "white";
    await sleep(speedFactor);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "white";
    await sleep(speedFactor);
    j++;
    k++;
  }


  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "#7182ca";
  }

  return arr;
}

function mergeSortD(arr, start, end) {
  if (arr.length < 2) {
    return arr;
  }

  let middle = Math.floor((start + end) / 2);
  let left = arr.slice(start, middle);
  let right = arr.slice(middle, end);

  //mergeSort(left);
  mergeSort(right);
}

async function selectionSort(array) {
  let bars = document.getElementsByClassName("bar");
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      await swap(array, i, minIndex, bars);
    }
  }

  return array;
}

// Update the event handler for the "Sort" button
sort_btn.addEventListener("click", async function () {
  switch (algotouse) {
    case "bubble":
      timeComplexity.textContent = "Time Complexity: O(n^2)";
      timeComplexity.style.backgroundColor = "black";
      timeComplexity.style.width = "17rem";
      timeComplexity.style.height = "3rem";
      timeComplexity.style.textAlign = "center";
      timeComplexity.style.borderRadius = "5px";
      timeComplexity.style.display = "flex";
      timeComplexity.style.justifyContent = "center";
      timeComplexity.style.alignItems = "center";
      await bubbleSort(unsorted_array);
      break;
    case "merge":
      timeComplexity.textContent = "Time Complexity: O(nlogn)";
      timeComplexity.style.backgroundColor = "black";
      timeComplexity.style.width = "17rem";
      timeComplexity.style.height = "3rem";
      timeComplexity.style.textAlign = "center";
      timeComplexity.style.borderRadius = "5px";
      timeComplexity.style.display = "flex";
      timeComplexity.style.justifyContent = "center";
      timeComplexity.style.alignItems = "center";
      await mergeSort(unsorted_array);
      break;
    case "insertion":
      timeComplexity.textContent = "Time Complexity: O(n^2)";
      timeComplexity.style.backgroundColor = "black";
      timeComplexity.style.width = "17rem";
      timeComplexity.style.height = "3rem";
      timeComplexity.style.textAlign = "center";
      timeComplexity.style.borderRadius = "5px";
      timeComplexity.style.display = "flex";
      timeComplexity.style.justifyContent = "center";
      timeComplexity.style.alignItems = "center";
      await InsertionSort(unsorted_array);
      break;
    case "selection":
      timeComplexity.textContent = "Time Complexity: O(n^2)";
      timeComplexity.style.backgroundColor = "black";
      timeComplexity.style.width = "17rem";
      timeComplexity.style.height = "3rem";
      timeComplexity.style.textAlign = "center";
      timeComplexity.style.borderRadius = "5px";
      timeComplexity.style.display = "flex";
      timeComplexity.style.justifyContent = "center";
      timeComplexity.style.alignItems = "center";
      await selectionSort(unsorted_array);
      break;
    case "quick":
      timeComplexity.textContent = "Time Complexity: O(n^2)";
      timeComplexity.style.backgroundColor = "black";
      timeComplexity.style.width = "17rem";
      timeComplexity.style.height = "3rem";
      timeComplexity.style.textAlign = "center";
      timeComplexity.style.borderRadius = "5px";
      timeComplexity.style.display = "flex";
      timeComplexity.style.justifyContent = "center";
      timeComplexity.style.alignItems = "center";
      console.log(unsorted_array.length);
      await quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;
    default:
      await bubbleSort(unsorted_array);
      break;
  }
});