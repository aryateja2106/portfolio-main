declare module 'poly-decomp' {
  interface DecompInterface {
    /**
     * Decompose a concave polygon into convex polygons
     */
    quickDecomp(vertices: Array<{x: number, y: number}>): Array<Array<{x: number, y: number}>>;
    
    /**
     * Decompose a concave polygon into convex polygons
     */
    decomp(vertices: Array<{x: number, y: number}>): Array<Array<{x: number, y: number}>>;
    
    /**
     * Makes a polygon clockwise
     */
    makeCCW(vertices: Array<{x: number, y: number}>): void;
  }
  
  const decomp: DecompInterface;
  export default decomp;
}
