/** @fileoverview Utility to preview Gmail label colour combinations. */

/**
 * List of Gmail supported Layer colors.
 * See documentation: https: //developers.google.com/gmail/api/v1/reference/users/labels/create
 * @const {!Set<string>}
 */
const LABEL_SUPPORTED_COLORS = new Set([
  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#efefef',
  '#f3f3f3', '#ffffff', '#464646', '#e7e7e7', '#c2c2c2', '#f6c5be',
  '#f2b2a8', '#e66550', '#ac2b16', '#8a1c0a', '#efa093', '#822111',
  '#fb4c2f', '#cc3a21', '#ff7537', '#ffc8af', '#7a2e0b', '#ffbc6b',
  '#cf8933', '#ffe6c7', '#ffdeb5', '#ffad47', '#ffad46', '#a46a21',
  '#ffd6a2', '#7a4706', '#eaa041', '#fef1d1', '#fcda83', '#aa8831',
  '#f2c960', '#d5ae49', '#fad165', '#fce8b3', '#684e07', '#fdedc1',
  '#594c05', '#fbe983', '#c6f3de', '#b3efd3', '#a2dcc1', '#b9e4d0',
  '#43d692', '#42d692', '#2a9c68', '#094228', '#0b4f30', '#16a765',
  '#68dfa9', '#44b984', '#0b804b', '#076239', '#149e60', '#3dc789',
  '#16a766', '#04502e', '#89d3b2', '#a0eac9', '#1a764d', '#0d3b44',
  '#98d7e4', '#2da2bb', '#b6cff5', '#6d9eeb', '#285bac', '#0d3472',
  '#4986e7', '#3c78d8', '#1c4587', '#4a86e8', '#a4c2f4', '#c9daf8',
  '#e3d7ff', '#b99aff', '#3d188e', '#d0bcf1', '#8e63ce', '#b694e8',
  '#41236d', '#a479e2', '#653e9b', '#e4d7f5', '#f691b3', '#fcdee8',
  '#fbc8d9', '#994a64', '#f691b2', '#fbd3e0', '#711a36', '#b65775',
  '#e07798', '#f7a7c0', '#83334c', '#ebdbde', '#662e37', '#cca6ac',
]);

/** @enum {string} Label layers. */
const Layer = {
  BACKGROUND: 'background',
  TEXT: 'text',
};

/** @const {!Map<string>} Map of layers to CSS properties. */
const LayerId = new Map([
  [Layer.BACKGROUND, 'background'],
  [Layer.TEXT, 'text'],
]);

/** @const {!Map<string>} Map of layers to CSS properties. */
const ColorProperty = new Map([
  [Layer.BACKGROUND, 'backgroundColor'],
  [Layer.TEXT, 'color'],
]);

/**
 * Converts an Hex color into RGB.
 * @param {string} color Hex color to convert to RGB.
 * @return {<!Array<number,number,number>} RGB representation of color.
 */
const _hexToRgb = (hexColor) => {
  const parsedColor =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  return [
    parseInt(parsedColor[1], 16),
    parseInt(parsedColor[2], 16),
    parseInt(parsedColor[3], 16),
  ];
};


/**
 * Finds the closest supported color to a given color.
 * @param {string} color Hex color for which to find closest match.
 * @return {string} Closest matched color to the one selected.
 */
const _findClosestColor = (color) => {
  const colorRgb = _hexToRgb(color);

  let selectedColor;
  let selectedDifference;
  for (const matchColor of LABEL_SUPPORTED_COLORS) {
    const matchColorRgb = _hexToRgb(matchColor);
    const colorDifference = (
      Math.pow((matchColorRgb[0] - colorRgb[0]), 2) +
      Math.pow((matchColorRgb[1] - colorRgb[1]), 2) +
      Math.pow((matchColorRgb[2] - colorRgb[2]), 2)
    );

    if (!selectedDifference || colorDifference < selectedDifference) {
      console.log(selectedDifference, colorDifference);
      console.log('Selecting', matchColor);
      selectedColor = matchColor;
      selectedDifference = colorDifference;
    }
  }

  return selectedColor;
};

/**
 * Updates color for layer.
 * Validates it's a valid color first.
 * If yes, sets the input value to the new Hex.
 * Sets the background or text color to the given color on the preview.
 * @param {string} color Hex color to set.
 * @param {!Layer} layer Layer to which to apply color change.
 */
const updateColor = (color, layer) => {
  color = color.toLowerCase();
  if (!LABEL_SUPPORTED_COLORS.has(color)) {
    const originalColor = color;
    color = _findClosestColor(originalColor);
    alert(`${originalColor} is not a supported color. Using ${color} instead`);
  }

  const layerId = LayerId.get(layer);
  const input = document.querySelector(`#${layerId} > .manual > input`);
  input.value = color;

  const label = document.querySelector('#label');
  const colorProperty = ColorProperty.get(layer);
  label.style[colorProperty] = color;
};

/**
 * Creates a box to select a given color.
 * @param {string} color Hex color for which to create box.
 * @param {!Layer} layer Background or text layer.
 * @return {!Element} Newly created (and document appended) element.
 */
const createColorDiv = (color, layer) => {
  const layerId = LayerId.get(layer);
  const parentLayer = document.querySelector(`#${layerId} > .colors`);

  const colorDiv = document.createElement('div');
  colorDiv.style = `background-color: ${color};`;
  colorDiv.setAttribute('title', color);
  colorDiv.setAttribute('alt', color);

  colorDiv.addEventListener('click', () => {
    updateColor(color, layer);
  });

  parentLayer.appendChild(colorDiv);
  return colorDiv;
};

/**
 * Adds functionality to color input and its button.
 * When enter is pressed or button clicked, it updates color with the input
 * value.
 * @param {!Layer} layer Layer to which to add functionality.
 */
const addUpdateColorInputFunctionality = (layer) => {
  const layerElement = document.querySelector(`#${layer} > .manual`);

  const refreshButton = layerElement.querySelector('button');
  refreshButton.addEventListener('click', (event) => {
    const thisElement = event.target;
    const input = thisElement.parentElement.querySelector('input');
    const color = input.value;
    updateColor(color, layer);
  });

  const inputElement = layerElement.querySelector('input');
  inputElement.addEventListener('keypress', (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13) {
      const thisElement = event.target;
      const input = thisElement.parentElement.querySelector('input');
      const color = input.value;
      updateColor(color, layer);
    }
  });
};


document.addEventListener('DOMContentLoaded', () => {
  for (const labelColor of LABEL_SUPPORTED_COLORS) {
    createColorDiv(labelColor, Layer.BACKGROUND);
    createColorDiv(labelColor, Layer.TEXT);
  }

  addUpdateColorInputFunctionality(Layer.BACKGROUND);
  addUpdateColorInputFunctionality(Layer.TEXT);
});
