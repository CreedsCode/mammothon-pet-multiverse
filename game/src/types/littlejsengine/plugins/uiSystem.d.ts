declare module 'littlejsengine/plugins/uiSystem' {
  export class UIObject {
    localPos: any; // vec2
    pos: any; // vec2
    size: any; // vec2
    color: any;
    lineColor: any;
    textColor: any;
    hoverColor: any;
    lineWidth: number;
    font: string;
    visible: boolean;
    children: UIObject[];
    parent: UIObject | null;
    mouseIsOver: boolean;
    mouseIsHeld: boolean;

    constructor(localPos?: any, size?: any);

    addChild(child: UIObject): void;
    removeChild(child: UIObject): void;
    update(): void;
    render(): void;
    onEnter(): void;
    onLeave(): void;
    onPress(): void;
    onRelease(): void;
    onChange(): void;
  }

  export class UIText extends UIObject {
    text: string;
    align: string;
    constructor(pos: any, size: any, text?: string, align?: string, font?: string);
  }

  export class UIButton extends UIObject {
    text: string;
    constructor(pos: any, size: any, text: string);
  }

  export class UICheckbox extends UIObject {
    checked: boolean;
    constructor(pos: any, size: any, checked?: boolean);
  }

  export function initUISystem(context?: any): void;
  export function drawUIRect(pos: any, size: any, color?: any, lineWidth?: number, lineColor?: any): void;
  export function drawUIText(text: string, pos: any, size: any, color?: any, lineWidth?: number, lineColor?: any, align?: string, font?: string): void;
} 