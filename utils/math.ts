import * as THREE from 'three';
import { CONFIG } from '../constants';

// Helper to get a random float between min and max
export const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate a random position inside a sphere
export const getScatterPosition = (): THREE.Vector3 => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = Math.cbrt(Math.random()) * CONFIG.SCATTER_RADIUS;
  
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

// Generate a position on a cone surface (The Tree)
// y goes from -height/2 to height/2 approximately
export const getTreePosition = (normalizedHeight: number): THREE.Vector3 => {
  // normalizedHeight 0 (bottom) to 1 (top)
  const y = (normalizedHeight * CONFIG.TREE_HEIGHT) - (CONFIG.TREE_HEIGHT / 2);
  
  // Radius decreases as we go up
  const currentRadius = CONFIG.TREE_RADIUS * (1 - normalizedHeight);
  
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * currentRadius; // Uniform distribution on disk slice, or use just currentRadius for surface only
  
  const x = r * Math.cos(angle);
  const z = r * Math.sin(angle);
  
  return new THREE.Vector3(x, y, z);
};

// Variation for decorations (mostly on surface)
export const getTreeSurfacePosition = (normalizedHeight: number): THREE.Vector3 => {
  const y = (normalizedHeight * CONFIG.TREE_HEIGHT) - (CONFIG.TREE_HEIGHT / 2);
  const currentRadius = Math.max(0.1, CONFIG.TREE_RADIUS * (1 - normalizedHeight));
  
  const angle = Math.random() * Math.PI * 2;
  
  // Push slightly out to sit on needles
  const r = currentRadius + 0.2; 
  
  const x = r * Math.cos(angle);
  const z = r * Math.sin(angle);
  
  return new THREE.Vector3(x, y, z);
};
