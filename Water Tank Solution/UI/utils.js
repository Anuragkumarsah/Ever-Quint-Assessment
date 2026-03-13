/**
 * Returns a SVG for the water tank visualization.
 */
export function getSVG(heights, water, isWithoutBlocks) {
  const n = heights.length;

  const maxColWidth = 50;

  const maxSvgW = 600;
  const chartH = 260;

  const padLeft = 50;
  const padRight = 30;
  const padTop = 50;
  const padBottom = 56;

  const availableW = maxSvgW - padLeft - padRight;
  const colWidth = Math.min(maxColWidth, availableW / n);

  const totalW = Math.max(padLeft + n * colWidth + padRight, maxSvgW);
  const totalH = padTop + chartH + padBottom;

  const maxVal = Math.max(...heights.map((h, i) => h + water[i]), 1);
  const scale = chartH / maxVal;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" preserveAspectRatio="xMidYMid meet">`;

  // Background
  svg += `<rect width="${totalW}" height="${totalH}" rx="12" fill="#1a1d27"/>`;

  // Grid lines
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = padTop + (chartH / gridLines) * i;
    const val = Math.round(maxVal - (maxVal / gridLines) * i);
    svg += `<line x1="${padLeft - 4}" y1="${y}" x2="${totalW - padRight}" y2="${y}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`;
    svg += `<text x="${padLeft - 10}" y="${y + 4}" class="viz-label" text-anchor="end">${val}</text>`;
  }

  const baselineY = padTop + chartH;
  const chartAreaW = totalW - padLeft - padRight;
  const columnsW = n * colWidth;
  const xOffset = padLeft + (chartAreaW - columnsW) / 2;
  for (let i = 0; i < n; i++) {
    const x = xOffset + i * colWidth;

    const elevH = isWithoutBlocks ? 0 : heights[i] * scale;
    if (elevH > 0 && !isWithoutBlocks) {
      svg += `<g class="viz-col">`;
      svg += `<rect x="${x}" y="${baselineY - elevH}" width="${colWidth}" height="${elevH}" fill="#f5c842" stroke="none">`;
      svg += `<title>Elevation: ${heights[i]}</title>`;
      svg += `</rect>`;
      svg += `</g>`;
    }

    const waterH = water[i] * scale;
    if (waterH > 0) {
      svg += `<g class="viz-col">`;
      svg += `<rect x="${x}" y="${baselineY - elevH - waterH}" width="${colWidth}" height="${waterH}" fill="#87CEEB" opacity="0.85" stroke="none">`;
      svg += `<title>Water: ${water[i]} ${water[i] === 1 ? "Unit" : "Units"}</title>`;
      svg += `</rect>`;
      svg += `</g>`;
    }

    svg += `<text x="${x + colWidth / 2}" y="${baselineY + 18}" class="viz-label">${i}</text>`;
  }

  svg += `<line x1="${padLeft}" y1="${baselineY}" x2="${totalW - padRight}" y2="${baselineY}" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>`;

  const legendY = baselineY + 34;
  const legendX = padLeft;
  if (!isWithoutBlocks) {
    svg += `<rect x="${legendX}" y="${legendY}" width="12" height="12" rx="2" fill="#f5c842"/>`;
    svg += `<text x="${legendX + 18}" y="${legendY + 10}" class="viz-legend-text">Elevation</text>`;
  }
  svg += `<rect x="${legendX + 95}" y="${legendY}" width="12" height="12" rx="2" fill="#87CEEB" opacity="0.85"/>`;
  svg += `<text x="${legendX + 113}" y="${legendY + 10}" class="viz-legend-text">Trapped Water</text>`;

  const totalWater = water.reduce((a, b) => a + b, 0);
  svg += `<text x="${totalW - padRight}" y="${legendY + 10}" class="viz-legend-text" text-anchor="end" fill="#87CEEB">Total water: ${totalWater}</text>`;

  svg += `</svg>`;

  return svg;
}
