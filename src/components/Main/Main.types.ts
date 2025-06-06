import type { SetStateAction } from "react";

export interface MainState {
    role: string,
    setRole: React.Dispatch<SetStateAction<string>>
}

// export interface MainMethods{
//     update
// }