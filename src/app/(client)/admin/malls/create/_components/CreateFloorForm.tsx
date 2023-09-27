import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Scene } from "three";

import Button from "@/src/components/Button";
import Stage from "@/src/components/Stage";
import TextField from "@/src/components/TextField";
import convertSvgToModel from "@/src/helpers/svgToModel";

import { Floor } from "@/src/types";

export default function CreateFloorForm(props: {
  onSubmit: (floor: Floor) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const sceneRef = useRef<Scene>(null);

  const [floorName, setFloorName] = useState("");
  const [floorScene, setFloorScene] = useState<Scene>();

  const onFloorNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFloorName(event.target.value.trim());
  };

  const onFilePicked = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      let file = event.target.files[0];

      let text = await file.text();
      let model = convertSvgToModel(text);

      let scene = new Scene();
      scene.add(model);

      setFloorScene(scene);
    }
  };

  const onFormSubmit = () => {
    if (floorName && floorScene) {
      let floor: Floor = {
        floorName: floorName,
        floorScene: floorScene,
      };
      props.onSubmit(floor);
    }

    resetState();
  };

  const onFormClose = () => resetState();

  const resetState = () => {
    setFloorName("");
    setFloorScene(undefined);

    formRef.current?.reset();
  };

  useEffect(() => {
    if (floorScene) sceneRef.current?.copy(floorScene);
    else sceneRef.current?.clear();
  }, [floorScene]);

  return (
    <form method="dialog" ref={formRef} onSubmit={onFormSubmit}>
      <div className="flex">
        <TextField
          label="Floor Name"
          placeholder="e.g. First Floor/Mezzanine 2"
          onChange={onFloorNameChanged}
          required
        />
        <div className="flex flex-col ml-4">
          Floor Layout
          <input
            ref={fileRef}
            type="file"
            accept=".svg"
            onChange={onFilePicked}
            className="file:bg-wayo-blue file:max-w-xs file:w-fit file:px-4 file:py-2 file:rounded-lg file:border-none file:uppercase file:text-xs file:text-white file:font-semibold text-sm"
            required
          />
        </div>
      </div>
      <span className="text-sm italic mt-4 block">3D Preview below</span>
      <div className="my-1 w-full aspect-video border rounded-lg overflow-clip block">
        <Canvas>
          <Stage />
          <scene ref={sceneRef} />
        </Canvas>
      </div>
      <div className="h-4" />
      <div className="flex justify-center">
        <Button
          type="submit"
          formMethod="dialog"
          formNoValidate
          onClick={onFormClose}
        >
          cancel
        </Button>
        <div className="w-2" />
        <Button type="submit" formMethod="dialog">
          save
        </Button>
      </div>
    </form>
  );
}
