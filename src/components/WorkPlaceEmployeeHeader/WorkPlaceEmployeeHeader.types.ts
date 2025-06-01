export interface WorkPlaceEmployeeHeaderProps {
    links: { title: string, link: string }[]
}

export interface userData {
    facilityName: string
    role: string
    toolCribName: string
    workplaceName: string
    workstationCode: string
}

export interface HeaderState {
    modalStatus: boolean
    userData: userData | null
}
export type HeaderAction = {
    type: "MODAL"
} | {
    type: "USER_DATA",
    data: userData
}

export interface HeaderMethods {
    handleModal: () => void
    getUserData: () => void
}