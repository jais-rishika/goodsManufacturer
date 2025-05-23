export interface SideBarProps {
    setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    sideBarList: {title: string, link: string}[]
    role: string
} 
