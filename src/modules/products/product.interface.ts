export type TVarients={
    type: string;
    value: string;
}

export type TProduct = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    variants: [TVarients];
    inventory: {
        quantity: number;
        inStock: boolean;
    };
};

