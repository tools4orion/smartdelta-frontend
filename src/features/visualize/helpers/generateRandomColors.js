export function generateRandomColor() {
  const goldenRatio = 0.618033988749895;
  const hue = (Math.random() + goldenRatio) % 1; // Use the golden ratio to get a more evenly distributed hue range
  const saturation = 50 + Math.random() * 30; // Adjust saturation range for more vibrant colors
  const lightness = 35 + Math.random() * 30; // Adjust lightness range for better visibility
  return `hsl(${hue * 360}, ${saturation}%, ${lightness}%)`;
}
