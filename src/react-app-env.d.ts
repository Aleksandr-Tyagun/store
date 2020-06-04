/// <reference types="react-scripts" />

interface Product {
    id: number;
    title: string;
    imageUrl: string;
    category: string;
    price: number;
    available: string;
    slug: string;
    reviews: number;
    date: string;
    sizes: Array;
}

interface CartItem {
    id: number,
    size: string,
    title: string;
    imageUrl: string;
    price: number;
    quantity: number,
}

