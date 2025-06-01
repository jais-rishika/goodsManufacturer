export interface WorkPlaceEmployeeHeaderProps {
    links: {title: string, link:string}[]
} 

export interface HeaderState{
    modalStatus: boolean
}
export interface HeaderAction{
    type: "MODAL"
}
export interface HeaderMethods{
    handleModal: ()=> void
}