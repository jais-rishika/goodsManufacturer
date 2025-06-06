import type { SetStateAction } from "react";

export interface AppState {
    role: string,
    setRole: React.Dispatch<SetStateAction<string>>
}