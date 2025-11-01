import { Outlet } from "react-router";

export default function Content() {
  return (
    <div className="content">
      <Outlet />;
    </div>
  );
}
