import {
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import convertShapeToMesh from "./shapeToMesh";

const roomMaterial = new MeshStandardMaterial({ color: "#264653" });
const floorMaterial = new MeshStandardMaterial({ color: "#2a9d8f" });

export const convertSvgToModel = (svg: string): Object3D => {
  const parser = new DOMParser();
  const loader = new SVGLoader();

  let group = new Group();

  let svgDoc = parser.parseFromString(svg, "image/svg+xml");

  let elementIds = ["rooms", "floor"];

  elementIds.forEach((id) => {
    let svg = svgDoc.getElementById(id)?.outerHTML ?? "";

    if (!svg) throw "no svg data to parse";

    let result = loader.parse(svg);

    result.paths.forEach((path) => {
      let shapes = SVGLoader.createShapes(path);
      let options = {
        depth: id == "floor" ? 0 : 3,
        material: id == "floor" ? floorMaterial : roomMaterial,
      };

      shapes.forEach((shape) => group.add(convertShapeToMesh(shape, options)));
    });
  });

  let sceneBounds = new Box3().setFromObject(group);
  let sceneSize = sceneBounds.getSize(new Vector3());
  let sceneCenter = sceneBounds.getCenter(new Vector3());

  group.scale.setX(100 / sceneSize.x);
  group.scale.setY(-100 / sceneSize.y);
  group.rotateX(-Math.PI / 2);

  group.children.forEach((child) => {
    let childBounds = new Box3().setFromObject(child);
    let childCenter = childBounds.getCenter(new Vector3());

    let translation = childCenter.sub(sceneCenter);
    translation.z = translation.z + 3 / 2;

    (child as Mesh).geometry.center();

    child.position.copy(translation);
  });

  return group;
};

export default convertSvgToModel;
