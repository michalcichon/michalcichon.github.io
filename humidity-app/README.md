# Should I Open The Window?

A simple web application that helps you decide whether opening a window will increase or decrease indoor humidity levels.

## Overview

This app calculates absolute humidity (in g/m³) for both indoor and outdoor conditions based on temperature and relative humidity. It then provides a recommendation on whether opening a window would increase or decrease your indoor humidity.

## Features

- **Dual Input Methods**: Control temperature and humidity using either sliders or text input fields
- **Real-time Calculations**: Instant results as you adjust the values
- **Visual Representation**: Bar chart showing humidity levels for inside and outside
- **Clear Recommendations**: Color-coded advice on whether to open the window
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Installation Required**: Pure HTML, CSS, and JavaScript - no build process needed

## How to Use

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Use a Local Server
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`

### Using the App

1. Enter the current temperature inside (in °C)
2. Enter the current relative humidity inside (in %)
3. Enter the temperature outside (in °C)
4. Enter the relative humidity outside (in %)
5. View the results:
   - Absolute humidity values for both inside and outside
   - Recommendation on whether opening the window will increase or decrease indoor humidity
   - Visual bar chart representation

## How It Works

The app uses psychrometric calculations to determine absolute humidity:

1. **Saturation Vapor Pressure**: Calculated using the Magnus formula
   ```
   es = 6.112 × exp((17.67 × T) / (T + 243.5))
   ```

2. **Actual Vapor Pressure**: Derived from relative humidity
   ```
   e = (RH / 100) × es
   ```

3. **Absolute Humidity**: Computed using the ideal gas law
   ```
   AH = (e × 1000 × 18.01528) / ((T + 273.15) × 8.31446)
   ```

Where:
- T = temperature in °C
- RH = relative humidity in %
- AH = absolute humidity in g/m³

## Technology Stack

- Pure HTML5
- CSS3 (with CSS custom properties)
- Vanilla JavaScript (ES6+)
- SVG for graph visualization

No frameworks or external dependencies required.

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid
- CSS Custom Properties
- SVG

## License

MIT

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements.
