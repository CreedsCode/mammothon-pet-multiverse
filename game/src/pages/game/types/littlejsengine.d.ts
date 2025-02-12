declare module 'littlejsengine' {
  interface Vec2 {
    x: number;
    y: number;
    copy(): Vec2;
    add(v: Vec2): Vec2;
    multiply(v: Vec2): Vec2;
  }

  interface Color {
    toString(): string;
  }

  // Global variables and functions
  export const uiDefaultColor: Color;
  export const uiDefaultLineColor: Color;
  export const uiDefaultTextColor: Color;
  export const uiDefaultButtonColor: Color;
  export const uiDefaultHoverColor: Color;
  export const uiDefaultLineWidth: number;
  export const uiDefaultFont: string;

  export function initUISystem(context?: CanvasRenderingContext2D): void;
  export function drawUIRect(pos: Vec2, size: Vec2, color?: Color, lineWidth?: number, lineColor?: Color): void;
  export function drawUILine(posA: Vec2, posB: Vec2, thickness?: number, color?: Color): void;
  export function drawUIText(text: string, pos: Vec2, size: Vec2, color?: Color, lineWidth?: number, lineColor?: Color, align?: string, font?: string): void;
  export function drawUITile(
    pos: Vec2,
    size: Vec2,
    tileInfo: unknown,
    color?: Color,
    angle?: number,
    mirror?: boolean
  ): void;

  export module plugins {
    export * from './uiSystem';
  }
}

declare module 'littlejsengine/plugins/uiSystem' {
  export { UIObject, UIText, UIButton, UICheckbox, UIScrollbar, UITile };
  interface Vec2 {
    x: number;
    y: number;
    copy(): Vec2;
    add(v: Vec2): Vec2;
    multiply(v: Vec2): Vec2;
  }

  interface Color {
    toString(): string;
  }

  // Global variables and functions
  export const uiDefaultColor: Color;
  export const uiDefaultLineColor: Color;
  export const uiDefaultTextColor: Color;
  export const uiDefaultButtonColor: Color;
  export const uiDefaultHoverColor: Color;
  export const uiDefaultLineWidth: number;
  export const uiDefaultFont: string;

  export function initUISystem(context?: CanvasRenderingContext2D): void;
  export function drawUIRect(pos: Vec2, size: Vec2, color?: Color, lineWidth?: number, lineColor?: Color): void;
  export function drawUILine(posA: Vec2, posB: Vec2, thickness?: number, color?: Color): void;
  export function drawUIText(text: string, pos: Vec2, size: Vec2, color?: Color, lineWidth?: number, lineColor?: Color, align?: string, font?: string): void;
  export function drawUITile(
    pos: Vec2,
    size: Vec2,
    tileInfo: unknown,
    color?: Color,
    angle?: number,
    mirror?: boolean
  ): void;

  export class UIObject {
    localPos: Vec2;
    pos: Vec2;
    size: Vec2;
    color: Color;
    lineColor: Color;
    textColor: Color;
    hoverColor: Color;
    lineWidth: number;
    font: string;
    visible: boolean;
    children: UIObject[];
    parent: UIObject | null;
    mouseIsOver: boolean;
    mouseIsHeld: boolean;

    constructor(localPos?: Vec2, size?: Vec2);
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
    constructor(pos: Vec2, size: Vec2, text?: string, align?: string, font?: string);
  }

  export class UIButton extends UIObject {
    text: string;
    constructor(pos: Vec2, size: Vec2, text: string);
  }

  export class UICheckbox extends UIObject {
    checked: boolean;
    constructor(pos: Vec2, size: Vec2, checked?: boolean);
  }

  export class UIScrollbar extends UIObject {
    value: number;
    text: string;
    handleColor: Color;
    constructor(pos: Vec2, size: Vec2, value?: number, text?: string);
  }

  export class UITile extends UIObject {
    constructor(
      pos: Vec2,
      size: Vec2,
      tileInfo: unknown,
      color?: Color,
      angle?: number,
      mirror?: boolean
    );
  }
}