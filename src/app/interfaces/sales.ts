export interface Sales {
    column: Column[];
    data:   Data[];
}

export interface Column {
    header:      string;
    field:      string;
    subHeaders?: SubHeader[];
}

export interface SubHeader {
    header: string;
    field:  string;
}

export interface Data {
    productID:   string;
    productName: string;
    salesQ1:     number;
    salesQ2:     number;
    salesQ3:     number;
    salesQ4:     number;
}