# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static web application (HTML + CSS + JavaScript) that calculates and visualizes humidity changes when opening a window. The app helps users decide whether opening a window will increase or decrease indoor relative humidity.

## Architecture

### Single-Page Application
- **index.html**: Main HTML structure with semantic markup
- **styles.css**: Modern, responsive CSS with mobile-first design
- **app.js**: Vanilla JavaScript for calculations and UI interactions

### Core Functionality

The app uses psychrometric calculations to determine absolute humidity from temperature and relative humidity:

1. **Saturation Vapor Pressure**: Calculated using the Magnus formula
2. **Actual Vapor Pressure**: Derived from relative humidity and saturation pressure
3. **Absolute Humidity**: Computed in g/m³ using the ideal gas law

**Key Formula**:
- Absolute Humidity (g/m³) = (actual_vapor_pressure * 1000 * 18.01528) / ((temperature + 273.15) * 8.31446)

### User Interface Components

- **Temperature Inputs**: Dual input (slider + text field) for inside and outside temperatures (°C)
- **Relative Humidity Inputs**: Dual input (slider + text field) for inside and outside RH (%)
- **Results Display**: Shows absolute humidity values and recommendation
- **Visual Graph**: SVG-based visualization showing humidity levels with crossing point indication
- **Responsive Design**: Works on desktop and mobile devices

### Data Flow

1. User adjusts temperature/humidity via sliders or text inputs
2. Input event triggers calculation update
3. Absolute humidity calculated for both inside and outside
4. Comparison determines if opening window increases/decreases indoor humidity
5. Results displayed with color-coded recommendation
6. Graph updated to show visual representation

## Development

### Running the Application

No build process or server required. Simply open `index.html` in a web browser:

```bash
open index.html
```

Or use a local development server if needed:

```bash
python -m http.server 8000
```

### Testing Changes

Refresh the browser after modifying any files. No compilation or bundling needed.

## Code Conventions

- Use semantic HTML5 elements
- CSS uses custom properties (variables) for theming
- JavaScript uses ES6+ features (const, let, arrow functions, template literals)
- No external dependencies or frameworks
- All code is contained in three files for simplicity
