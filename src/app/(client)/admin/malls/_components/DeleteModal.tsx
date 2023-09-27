import Button from "@/src/components/Button";
import { MouseEventHandler, RefObject } from "react";

export default function DeleteModal(props: {
  innerRef: RefObject<HTMLDialogElement>;
  onDelete: MouseEventHandler;
}) {
  const hideModal = () => props.innerRef.current?.close();

  return (
    <dialog
      className="rounded-lg backdrop:bg-neutral-600 backdrop:opacity-70"
      ref={props.innerRef}
    >
      <form className="flex flex-col p-6">
        <span className="text-center">
          Are you sure you want to delete? This action is{" "}
          <span className="font-bold">irreversible</span>
        </span>
        <div className="h-4" />
        <div className="mx-auto flex">
          <Button
            formMethod="dialog"
            type="submit"
            className="bg-neutral-500"
            onClick={hideModal}
          >
            cancel
          </Button>
          <div className="w-4" />
          <Button type="submit" className="bg-red-500" onClick={props.onDelete}>
            delete
          </Button>
        </div>
      </form>
    </dialog>
  );
}
