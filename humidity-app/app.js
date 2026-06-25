// Humidity calculation functions
function calculateSaturationVaporPressure(temperatureCelsius) {
    // Magnus formula for saturation vapor pressure (in hPa)
    return 6.112 * Math.exp((17.67 * temperatureCelsius) / (temperatureCelsius + 243.5));
}

function calculateAbsoluteHumidity(temperatureCelsius, relativeHumidity) {
    // Calculate saturation vapor pressure
    const saturationPressure = calculateSaturationVaporPressure(temperatureCelsius);

    // Calculate actual vapor pressure
    const actualVaporPressure = (relativeHumidity / 100) * saturationPressure;

    // Calculate absolute humidity in g/m³
    // Formula: AH = (e * 1000 * Mw) / (R * T)
    // where: e = vapor pressure (hPa), Mw = molecular weight of water (18.01528 g/mol)
    // R = universal gas constant (8.31446 J/(mol·K)), T = temperature in Kelvin
    const absoluteHumidity = (actualVaporPressure * 1000 * 18.01528) / ((temperatureCelsius + 273.15) * 8.31446);

    return absoluteHumidity;
}

// DOM elements
const tempInsideSlider = document.getElementById('temp-inside-slider');
const tempInsideInput = document.getElementById('temp-inside');
const humidityInsideSlider = document.getElementById('humidity-inside-slider');
const humidityInsideInput = document.getElementById('humidity-inside');

const tempOutsideSlider = document.getElementById('temp-outside-slider');
const tempOutsideInput = document.getElementById('temp-outside');
const humidityOutsideSlider = document.getElementById('humidity-outside-slider');
const humidityOutsideInput = document.getElementById('humidity-outside');

const absHumidityInsideDisplay = document.getElementById('abs-humidity-inside');
const absHumidityOutsideDisplay = document.getElementById('abs-humidity-outside');
const recommendationDiv = document.getElementById('recommendation');
const recommendationIcon = document.getElementById('recommendation-icon');
const recommendationText = document.getElementById('recommendation-text');
const humiditySvg = document.getElementById('humidity-graph');

// Sync slider and input
function syncInputs(slider, input) {
    slider.addEventListener('input', () => {
        input.value = slider.value;
        updateCalculations();
    });

    input.addEventListener('input', () => {
        slider.value = input.value;
        updateCalculations();
    });
}

// Setup input synchronization
syncInputs(tempInsideSlider, tempInsideInput);
syncInputs(humidityInsideSlider, humidityInsideInput);
syncInputs(tempOutsideSlider, tempOutsideInput);
syncInputs(humidityOutsideSlider, humidityOutsideInput);

// Draw humidity graph
function drawHumidityGraph(absHumidityInside, absHumidityOutside) {
    const width = 400;
    const height = 200;
    const padding = 40;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Clear previous graph
    humiditySvg.innerHTML = '';

    // Draw axes
    const axes = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    axes.innerHTML = `
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#94a3b8" stroke-width="2"/>
        <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#94a3b8" stroke-width="2"/>
        <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#64748b">Location</text>
        <text x="15" y="${height / 2}" text-anchor="middle" font-size="12" fill="#64748b" transform="rotate(-90, 15, ${height / 2})">Absolute Humidity (g/m³)</text>
    `;
    humiditySvg.appendChild(axes);

    // Calculate scale
    const maxHumidity = Math.max(absHumidityInside, absHumidityOutside) * 1.2;
    const scale = graphHeight / maxHumidity;

    // Bar positions
    const barWidth = 60;
    const insideX = padding + graphWidth * 0.25 - barWidth / 2;
    const outsideX = padding + graphWidth * 0.75 - barWidth / 2;

    // Draw bars
    const insideHeight = absHumidityInside * scale;
    const outsideHeight = absHumidityOutside * scale;

    const insideBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    insideBar.setAttribute('x', insideX);
    insideBar.setAttribute('y', height - padding - insideHeight);
    insideBar.setAttribute('width', barWidth);
    insideBar.setAttribute('height', insideHeight);
    insideBar.setAttribute('fill', '#3b82f6');
    insideBar.setAttribute('rx', '4');
    humiditySvg.appendChild(insideBar);

    const outsideBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    outsideBar.setAttribute('x', outsideX);
    outsideBar.setAttribute('y', height - padding - outsideHeight);
    outsideBar.setAttribute('width', barWidth);
    outsideBar.setAttribute('height', outsideHeight);
    outsideBar.setAttribute('fill', '#10b981');
    outsideBar.setAttribute('rx', '4');
    humiditySvg.appendChild(outsideBar);

    // Draw connecting line
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', insideX + barWidth / 2);
    line.setAttribute('y1', height - padding - insideHeight);
    line.setAttribute('x2', outsideX + barWidth / 2);
    line.setAttribute('y2', height - padding - outsideHeight);
    line.setAttribute('stroke', '#94a3b8');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('stroke-dasharray', '5,5');
    humiditySvg.appendChild(line);

    // Draw value labels
    const insideLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    insideLabel.setAttribute('x', insideX + barWidth / 2);
    insideLabel.setAttribute('y', height - padding - insideHeight - 8);
    insideLabel.setAttribute('text-anchor', 'middle');
    insideLabel.setAttribute('font-size', '12');
    insideLabel.setAttribute('font-weight', 'bold');
    insideLabel.setAttribute('fill', '#3b82f6');
    insideLabel.textContent = absHumidityInside.toFixed(2);
    humiditySvg.appendChild(insideLabel);

    const outsideLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    outsideLabel.setAttribute('x', outsideX + barWidth / 2);
    outsideLabel.setAttribute('y', height - padding - outsideHeight - 8);
    outsideLabel.setAttribute('text-anchor', 'middle');
    outsideLabel.setAttribute('font-size', '12');
    outsideLabel.setAttribute('font-weight', 'bold');
    outsideLabel.setAttribute('fill', '#10b981');
    outsideLabel.textContent = absHumidityOutside.toFixed(2);
    humiditySvg.appendChild(outsideLabel);

    // Draw location labels
    const insideLocationLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    insideLocationLabel.setAttribute('x', insideX + barWidth / 2);
    insideLocationLabel.setAttribute('y', height - padding + 20);
    insideLocationLabel.setAttribute('text-anchor', 'middle');
    insideLocationLabel.setAttribute('font-size', '14');
    insideLocationLabel.setAttribute('font-weight', '600');
    insideLocationLabel.setAttribute('fill', '#1e293b');
    insideLocationLabel.textContent = 'Inside';
    humiditySvg.appendChild(insideLocationLabel);

    const outsideLocationLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    outsideLocationLabel.setAttribute('x', outsideX + barWidth / 2);
    outsideLocationLabel.setAttribute('y', height - padding + 20);
    outsideLocationLabel.setAttribute('text-anchor', 'middle');
    outsideLocationLabel.setAttribute('font-size', '14');
    outsideLocationLabel.setAttribute('font-weight', '600');
    outsideLocationLabel.setAttribute('fill', '#1e293b');
    outsideLocationLabel.textContent = 'Outside';
    humiditySvg.appendChild(outsideLocationLabel);

    // Add crossing indicator if values are close
    if (Math.abs(absHumidityInside - absHumidityOutside) < maxHumidity * 0.05) {
        const crossingIndicator = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        crossingIndicator.setAttribute('x', width / 2);
        crossingIndicator.setAttribute('y', 30);
        crossingIndicator.setAttribute('text-anchor', 'middle');
        crossingIndicator.setAttribute('font-size', '12');
        crossingIndicator.setAttribute('font-style', 'italic');
        crossingIndicator.setAttribute('fill', '#f59e0b');
        crossingIndicator.textContent = '≈ Similar humidity levels';
        humiditySvg.appendChild(crossingIndicator);
    }
}

// Update calculations and display
function updateCalculations() {
    const tempInside = parseFloat(tempInsideInput.value);
    const humidityInside = parseFloat(humidityInsideInput.value);
    const tempOutside = parseFloat(tempOutsideInput.value);
    const humidityOutside = parseFloat(humidityOutsideInput.value);

    // Calculate absolute humidity
    const absHumidityInside = calculateAbsoluteHumidity(tempInside, humidityInside);
    const absHumidityOutside = calculateAbsoluteHumidity(tempOutside, humidityOutside);

    // Display results
    absHumidityInsideDisplay.textContent = `${absHumidityInside.toFixed(2)} g/m³`;
    absHumidityOutsideDisplay.textContent = `${absHumidityOutside.toFixed(2)} g/m³`;

    // Determine recommendation
    const difference = absHumidityOutside - absHumidityInside;
    const percentDifference = Math.abs(difference / absHumidityInside) * 100;

    recommendationDiv.className = 'recommendation';

    if (percentDifference < 2) {
        // Very similar humidity levels
        recommendationDiv.classList.add('neutral');
        recommendationIcon.textContent = '〰️';
        recommendationText.textContent = 'Opening the window will have minimal effect on indoor humidity (difference < 2%).';
    } else if (difference > 0) {
        // Outside humidity is higher
        recommendationDiv.classList.add('increase');
        recommendationIcon.textContent = '⚠️';
        recommendationText.textContent = `Opening the window will INCREASE indoor humidity by approximately ${percentDifference.toFixed(1)}%.`;
    } else {
        // Outside humidity is lower
        recommendationDiv.classList.add('decrease');
        recommendationIcon.textContent = '✓';
        recommendationText.textContent = `Opening the window will DECREASE indoor humidity by approximately ${percentDifference.toFixed(1)}%.`;
    }

    // Draw graph
    drawHumidityGraph(absHumidityInside, absHumidityOutside);
}

// Initial calculation
updateCalculations();
