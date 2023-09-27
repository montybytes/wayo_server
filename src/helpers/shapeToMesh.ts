import { ExtrudeGeometry, Material, Mesh, Shape } from "three";

interface Shape2MeshOpts {
  depth?: number;
  material?: Material;
}

const convertShapeToMesh = (shape: Shape, options: Shape2MeshOpts): Mesh => {
  let geometry = new ExtrudeGeometry(shape, {
    depth: options.depth ?? 0,
    bevelEnabled: false,
  });

  return new Mesh(geometry, options.material);
};

export default convertShapeToMesh;
