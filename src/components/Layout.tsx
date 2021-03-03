import { SideBar } from "./SideBar";

export default function Layout(props) {
  return (
    <>
      <SideBar />

      <main>{props.children}</main>
    </>
  );
}
