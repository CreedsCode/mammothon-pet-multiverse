// This module wraps the global LittleJS UI objects for TypeScript usage
import type { UIObject, initUISystem as InitUISystemType } from 'littlejsengine/plugins/uiSystem';

declare global {
  interface Window {
    UIObject: typeof UIObject;
    initUISystem: typeof InitUISystemType;
  }
}

// Create a promise that resolves when the UI system is ready
let uiSystemReady: Promise<void>;

function initializeUISystem() {
  if (!uiSystemReady) {
    uiSystemReady = new Promise((resolve) => {
      // Check if the UI system is already loaded
      if ('UIObject' in window && 'initUISystem' in window) {
        resolve();
        return;
      }

      // If not loaded, wait for it
      const checkInterval = setInterval(() => {
        if ('UIObject' in window && 'initUISystem' in window) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }
  return uiSystemReady;
}

// Export async getters for the UI objects
export async function getUIObject() {
  await initializeUISystem();
  return window.UIObject;
}

export async function getInitUISystem() {
  await initializeUISystem();
  return window.initUISystem;
}

// Export types
export type { UIObject };
export type { UIText, UIButton, UICheckbox, UIScrollbar, UITile } from 'littlejsengine/plugins/uiSystem'; 