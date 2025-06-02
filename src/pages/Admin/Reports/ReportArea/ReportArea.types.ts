export interface ReportAreaProps {
    heading: string;
    getData: ()=>void;
    data: {toolName: string, value: number}[];
} 
