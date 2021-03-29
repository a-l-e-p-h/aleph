import { LitElement } from "lit-element";

class Control extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      label: { type: String },
      index: { type: Number },
      initialValue: { type: Number },
      minValue: { type: Number },
      maxValue: { type: Number },
      value: { type: Number },
      isDraggable: { type: Boolean },
    };
  }

  map = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  createLabelText = (type, index) => {
    return `${type}_${index}`;
  };

  /**
   * @desc prevents "sticky" mouse behavior if cursor goes outside event listener
   *
   * @param {object} e - event
   * @param {number[]} dimensions - [width, height] of input
   */
  boundsCheck = (e, dimensions) => {
    if (e.offsetX > dimensions[0] - 2 || e.offsetX < 2) {
      this.isDraggable = false;
    }
    if (e.offsetY > dimensions[1] - 2 || e.offsetY < 2) {
      this.isDraggable = false;
    }
  };

  enableDrag() {
    this.isDraggable = true;
  }

  disableDrag() {
    this.isDraggable = false;
  }

  constructor() {
    super();
    this.type = "";
    this.label = "";
    this.index = 0;
    this.initialValue = 64;
    this.minValue = 0;
    this.maxValue = 127;
    this.value = this.initialValue;
    this.isDraggable = false;
  }
}

export default Control;
