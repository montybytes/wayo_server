export default function ToolBar() {
  return (
    <div className="flex w-full h-9 px-4 bg-neutral-200 items-center">
      <div className="h-full py-2">
        <img src="/logo.png" alt="wayo_logo" className="h-full" />
      </div>
      <div className="grow" />
      <div>Howdy, Admin</div>
    </div>
  );
}
