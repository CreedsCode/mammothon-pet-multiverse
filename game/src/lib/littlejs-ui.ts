// This module wraps the global LittleJS UI objects for TypeScript usage
declare global {
  interface Window {
    UIObject: any;
    initUISystem: any;
  }
}

// Create a promise that resolves when the UI system is ready
let uiSystemReady: Promise<void>;

function initializeUISystem() {
  if (!uiSystemReady) {
    uiSystemReady = new Promise((resolve) => {
      // Check if the UI system is already loaded
      if (window.UIObject && window.initUISystem) {
        resolve();
        return;
      }

      // If not loaded, wait for it
      const checkInterval = setInterval(() => {
        if (window.UIObject && window.initUISystem) {
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
export type UIObjectType = any; // We'll improve this later 