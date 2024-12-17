import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
  } from "../components/ui/menubar";
  
const Navbar = () => {
  return (
    <Menubar className="flex m-2 p-8 items- bg-[#7f729a] shadow-xl">
        <MenubarMenu>
            <MenubarTrigger className="text-white font-thin text-3xl">Tracksuit</MenubarTrigger>
        </MenubarMenu>
    </Menubar>

  )
}

export default Navbar