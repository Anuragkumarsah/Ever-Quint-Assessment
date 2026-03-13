import { getSVG } from "./utils.js";

const numberInput = document.getElementById("numberInput");
const addBtn = document.getElementById("addBtn");
const tagsArea = document.getElementById("tagsArea");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const errorMsg = document.getElementById("errorMsg");
const visualisation = document.getElementById("visualisation");
const inputCard = document.getElementById("input-card");
const inputSection = document.getElementById("inputSection");
const resultSection = document.getElementById("resultSection");
const resultClearBtn = document.getElementById("resultClearBtn");
const toggleBlocksBtn = document.getElementById("toggleBlocksBtn");

let numbers = [];
let computedWater = [];
let showBlocks = true;

function waterStoredPerBlock(height) {
  const n = height.length;
  const leftMax = new Array(n);
  const rightMax = new Array(n);
  const water = new Array(n);

  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  for (let i = 0; i < n; i++) {
    water[i] = Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
  }

  return water;
}

function showError(msg) {
  errorMsg.textContent = msg;
}

function clearError() {
  errorMsg.textContent = "";
}

/* ---- Live elevation-only preview while entering values ---- */
function renderPreview() {
  if (numbers.length === 0) {
    visualisation.innerHTML = "";
    return;
  }
  const zeroWater = new Array(numbers.length).fill(0);
  visualisation.innerHTML = getSVG(numbers, zeroWater, false);
}

function renderTags() {
  tagsArea.innerHTML = "";
  tagsArea.classList.toggle("empty", numbers.length === 0);
  generateBtn.disabled = numbers.length === 0;

  numbers.forEach((num, idx) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.innerHTML = `${num}<button class="remove" data-idx="${idx}" title="Remove">&times;</button>`;
    tagsArea.appendChild(tag);
  });

  renderPreview();
}

function addNumbers(raw) {
  const parts = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s !== "" && !isNaN(s))
    .map(Number);

  if (parts.length === 0) return;

  const hasNegative = parts.some((n) => n < 0);
  if (hasNegative) {
    showError("Negative values are not allowed.");
    return;
  }

  clearError();
  numbers.push(...parts);
  renderTags();
}

/* ---- Switch between input mode and result mode ---- */
function switchToResultMode() {
  inputSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
}

function switchToInputMode() {
  resultSection.classList.add("hidden");
  inputSection.classList.remove("hidden");
}

function resetAll() {
  numbers = [];
  computedWater = [];
  showBlocks = true;
  toggleBlocksBtn.textContent = "Hide Elevation";
  switchToInputMode();
  renderTags();
  visualisation.innerHTML = "";
  numberInput.value = "";
  clearError();
  numberInput.focus();
}

/* ---- Event listeners ---- */
addBtn.addEventListener("click", () => {
  addNumbers(numberInput.value);
  numberInput.value = "";
  numberInput.focus();
});

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNumbers(numberInput.value);
    numberInput.value = "";
  }
});

tagsArea.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const idx = Number(e.target.dataset.idx);
    numbers.splice(idx, 1);
    renderTags();
  }
});

clearBtn.addEventListener("click", resetAll);
resultClearBtn.addEventListener("click", resetAll);

generateBtn.addEventListener("click", () => {
  clearError();

  if (numbers.length === 0) {
    showError("Please add at least one elevation value before generating.");
    return;
  }

  const hasNeg = numbers.some((n) => n < 0);
  if (hasNeg) {
    showError("Negative values are not allowed. Please remove them first.");
    return;
  }

  computedWater = waterStoredPerBlock(numbers);
  showBlocks = true;
  visualisation.innerHTML = getSVG(numbers, computedWater, false);
  switchToResultMode();
});

toggleBlocksBtn.addEventListener("click", () => {
  showBlocks = !showBlocks;
  toggleBlocksBtn.textContent = showBlocks
    ? "Hide Elevation"
    : "Show Elevation";
  visualisation.innerHTML = getSVG(numbers, computedWater, !showBlocks);
});
