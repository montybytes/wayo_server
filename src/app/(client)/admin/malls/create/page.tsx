"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Minus, Plus, X } from "react-feather";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

import { Floor } from "@/src/types";

import Button from "@/src/components/Button";
import IconButton from "@/src/components/IconButton";
import PageHeader from "@/src/components/PageHeader";
import TextField from "@/src/components/TextField";

interface MallData {
  name: string | "";
  logo: File | null;
  phoneNumbers: string[];
  emails: string[];
  operatingHours:
    | {
        mon: string;
        tue: string;
        wed: string;
        thu: string;
        fri: string;
        sat: string;
        sun: string;
      }
    | {};
  floors: Floor[];
}

export default function Create() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const logoFileRef = useRef<HTMLInputElement>(null);

  const [mallLogo, setMallLogo] = useState<string | null>();
  const [phoneCount, setPhoneCount] = useState<number>(1);
  const [emailCount, setEmailCount] = useState<number>(1);
  const [sameWeekdayTime, setSameWeekdayTime] = useState<boolean>(true);

  const onPickLogo = (event: ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files;

    if (files && files.length) setMallLogo(URL.createObjectURL(files[0]));
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);

    let formData = data.entries();
    console.log(formData.next());
  };

  const onSaveModelToDisk = () => {
    const exporter = new GLTFExporter();

    // if (mallData.floors.length) {
    //   // let scenes = mallData.floors.map((floor) => floor.floorScene);

    //   exporter.parse(
    //     scenes,
    //     (gltf) => {
    //       let data = JSON.stringify(gltf, null, 2);

    //       console.log(data);

    //       let blob = new Blob([data], { type: "text/plain" });

    //       saveAs(blob, "model.gltf");
    //     },
    //     (error) => console.log(error)
    //   );
    // }
  };

  return (
    <>
      <PageHeader>
        <h1 className="text-2xl font-bold uppercase min-w-max">Add Mall</h1>
        <div className="grow" />
        <Button
          className="ml-auto"
          onClick={() => formRef.current?.requestSubmit()}
        >
          create
        </Button>
      </PageHeader>
      <form
        ref={formRef}
        onSubmit={onFormSubmit}
        className=" mt-4 max-w-5xl mx-auto"
      >
        <section className="flex flex-row items-center">
          <div className="flex aspect-square w-20 min-w-[64px] relative">
            {mallLogo ? (
              <>
                <img
                  src={mallLogo}
                  alt="selected_mall_logo"
                  className="border rounded-lg w-full h-full absolute top-0 left-0 right-0 bottom-0 object-contain"
                />
                <X
                  size={24}
                  className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rounded-full bg-neutral-400 p-1 cursor-pointer flex items-center justify-center"
                  onClick={() => setMallLogo(null)}
                />
              </>
            ) : (
              <>
                <input
                  type="file"
                  name="logo"
                  ref={logoFileRef}
                  onChange={onPickLogo}
                  accept="image/png, image/jpeg"
                  hidden
                />
                <span
                  className="text-xs bg-neutral-100 border rounded-lg cursor-pointer w-full h-full absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-center"
                  onClick={() => logoFileRef.current?.showPicker()}
                >
                  click to set logo
                </span>
              </>
            )}
          </div>
          <div className="min-w-[1rem]" />
          <TextField label="Mall Name" type="text" name="name" required />
        </section>
        <section className="mt-4">
          <h3 className="text-lg font-bold uppercase min-w-max">
            Mall Contact Information
          </h3>
          <div className="ml-4">
            <span className="min-w-max">Phone Number(s):</span>
            {Array.from(Array(phoneCount)).map((_, index) => (
              <div
                key={`phone_number_${index + 1}`}
                className="flex items-center my-1"
              >
                <TextField
                  required={index == 0}
                  type="text"
                  name={`phone_${index + 1}`}
                  placeholder={`Add phone number #${index + 1}`}
                />
                <div className="w-1" />
                {index + 1 < phoneCount ? (
                  <IconButton onClick={() => setPhoneCount(phoneCount - 1)}>
                    <Minus />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setPhoneCount(phoneCount + 1)}>
                    <Plus />
                  </IconButton>
                )}
              </div>
            ))}
            <span>Email(s):</span>
            {Array.from(Array(emailCount)).map((_, index) => (
              <div
                key={`email_${index + 1}`}
                className="flex items-center my-1"
              >
                <TextField
                  type="email"
                  name={`email_${index + 1}`}
                  placeholder={`Add email #${index + 1}`}
                />
                <div className="w-1" />
                {index + 1 < emailCount ? (
                  <IconButton onClick={() => setEmailCount(emailCount - 1)}>
                    <Minus />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setEmailCount(emailCount + 1)}>
                    <Plus />
                  </IconButton>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="mt-4">
          <h3 className="text-lg font-bold uppercase min-w-max">
            Mall Operating Hours
          </h3>
          <div className="ml-4">
            <span className="min-w-max">Weekdays:</span>
            <div className="my-1 ml-2 flex">
              <div>
                <span className="block text-sm min-w-max">Opening</span>
                <input
                  required
                  type="time"
                  name="weekday_opening"
                  className="rounded-lg p-1 max-w-sm placeholder:italic placeholder:text-sm bg-neutral-200"
                />
              </div>
              <div className="w-8" />
              <div>
                <span className="block text-sm min-w-max">Closing</span>
                <input
                  required
                  type="time"
                  name="weekday_closing"
                  className="rounded-lg p-1 max-w-sm placeholder:italic placeholder:text-sm bg-neutral-200"
                />
              </div>
            </div>
          </div>
          <div className="ml-4">
            <span>Weekends:</span>
            <div className="ml-2 flex items-center">
              <label>
                <input
                  type="checkbox"
                  name="copy_weekdays"
                  className="m-1"
                  onChange={() => setSameWeekdayTime(!sameWeekdayTime)}
                  checked={sameWeekdayTime}
                />
                same time as weekdays
              </label>
            </div>
            <div className="my-1 ml-2 flex">
              <div>
                <span className="block text-sm">Opening</span>
                <input
                  type="time"
                  name="weekend_opening"
                  required={sameWeekdayTime == false}
                  disabled={sameWeekdayTime}
                  className={`rounded-lg p-1 max-w-sm placeholder:italic placeholder:text-sm ${
                    sameWeekdayTime ? "bg-neutral-100" : "bg-neutral-200"
                  }`}
                />
              </div>
              <div className="w-8" />
              <div>
                <span className="block text-sm">Closing</span>
                <input
                  type="time"
                  name="weekend_closing"
                  required={sameWeekdayTime == false}
                  disabled={sameWeekdayTime}
                  className={`rounded-lg p-1 max-w-sm placeholder:italic placeholder:text-sm ${
                    sameWeekdayTime ? "bg-neutral-100" : "bg-neutral-200"
                  }`}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="mt-4">
          <h3 className="text-lg font-bold uppercase min-w-max">
            Mall Location
          </h3>
          <div className="flex flex-col ml-4">
            Type to search for a location
            <TextField type="text" placeholder="Type for suggestions" />
          </div>
        </section>
        <section className="mt-4">
          <h3 className="text-lg font-bold uppercase">Mall Navigation Model</h3>
          <div className="ml-4">
            <span>
              Upload floor layout file to generate a 3D model of that floor
            </span>
            <Button
              type="button"
              className="mb-2"
              onClick={() => modalRef.current?.showModal()}
            >
              add floor
            </Button>
            <div className="flex flex-col">
              {/* {mallData.floors.length > 0 && <span>Floors uploaded:</span>}
              <ul className="list-disc">
                {mallData.floors.map((floor, index) => (
                  <li>
                    <div className="flex items-center">
                      {floor.floorName}
                      <div className="w-2" />
                      <IconButton onClick={() => onFloorDelete(index)}>
                        <Trash2 size={20} />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
