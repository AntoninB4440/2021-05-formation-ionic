export interface Session {
    id: number;
    title: string;
    description: string;
    type: string;
    category: string;
    speakers: Array<Number>;
}
