export type Notebook = {
    id: number;
    title: string;
    notes: Note[];
}

export type Note = {
    value: string,
    id: number;
}

export type Notebooks = Notebook[]