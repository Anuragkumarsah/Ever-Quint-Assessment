export function waterStoredPerBlock(height: Array<number>) {
  const n = height.length;

  let leftMax = new Array(n);
  let rightMax = new Array(n);
  let water = new Array(n);

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
