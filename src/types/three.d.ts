declare global {
  namespace THREE {
    interface Scene {
      add(object: any): void;
      remove(object: any): void;
      children: any[];
      background: any;
    }

    interface WebGLRenderer {
      render(scene: Scene, camera: PerspectiveCamera): void;
      setSize(width: number, height: number): void;
      shadowMap: {
        enabled: boolean;
        type: any;
      };
      setClearColor(color: number, alpha: number): void;
    }

    interface PerspectiveCamera {
      position: {
        set(x: number, y: number, z: number): void;
        x: number;
        y: number;
        z: number;
      };
      lookAt(x: number, y: number, z: number): void;
    }

    interface Mesh {
      position: {
        set(x: number, y: number, z: number): void;
        x: number;
        y: number;
        z: number;
      };
      scale: {
        set(x: number, y: number, z: number): void;
      };
      castShadow: boolean;
      receiveShadow: boolean;
      geometry: any;
    }
  }
}

export {};