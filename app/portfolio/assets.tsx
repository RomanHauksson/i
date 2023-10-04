"use client";

import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    BadgeDelta,
    DeltaType,
    Title,
    TextInput,
} from "@tremor/react";
import { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
  
type Person = {
    id: number;
    avartarUrl: string;
    name: string;
    ticker: string;
    shares: number;
    price: number;
    sharePrice: number;
    delta: number;
    deltaPercent: number;
};

const people: Person[] = [
    {
        id: 1,
        avartarUrl: "/Roman.jpg",
        name: "Peter Doe",
        ticker: "PETR",
        shares: 100,
        price: 150,
        sharePrice: 155,
        delta: 5,
        deltaPercent: 3.33,
    },
    {
        id: 2,
        avartarUrl: "/Roman.jpg",
        name: "John Smith",
        ticker: "JONS",
        shares: 50,
        price: 200,
        sharePrice: 205,
        delta: 5,
        deltaPercent: 2.5,
    },
    {
        id: 3,
        avartarUrl: "/Roman.jpg",
        name: "Jane Doe",
        ticker: "JADO",
        shares: 75,
        price: 100,
        sharePrice: 105,
        delta: 5,
        deltaPercent: 5,
    },
    {
        id: 4,
        avartarUrl: "/Roman.jpg",
        name: "Bob Johnson",
        ticker: "BOBJ",
        shares: 200,
        price: 50,
        sharePrice: 55,
        delta: 5,
        deltaPercent: 10,
    },
    {
        id: 5,
        avartarUrl: "/Roman.jpg",
        name: "Alice Lee",
        ticker: "ALIC",
        shares: 150,
        price: 75,
        sharePrice: 80,
        delta: 5,
        deltaPercent: 6.67,
    },
];

export default function Assets() {
    const [searchQuery, setSearchQuery] = useState("");
    const filteredAssets: Person[] = people.filter((item: Person) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <Card>
            <Title>assets</Title>
            <TextInput
                icon={SearchIcon}
                placeholder="search..."
                className="mt-6"
                onChange={(event) => setSearchQuery(event.target.value)}
            />
            <Table className="mt-6">
                <TableHead>
                <TableRow>
                    <TableHeaderCell></TableHeaderCell>
                    <TableHeaderCell>name</TableHeaderCell>
                    <TableHeaderCell>symbol</TableHeaderCell>
                    <TableHeaderCell className="text-right">shares</TableHeaderCell>
                    <TableHeaderCell className="text-right">price</TableHeaderCell>
                    <TableHeaderCell className="text-right">share price</TableHeaderCell>
                    <TableHeaderCell className="text-right">returns</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                </TableRow>
                </TableHead>

                <TableBody>
                {filteredAssets.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell><Image className="rounded-full" src={item.avartarUrl} width={32} height={32} alt={"Avatar for " + item.name}/></TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.ticker}</TableCell>
                        <TableCell className="text-right">{item.shares}</TableCell>
                        <TableCell className="text-right">{item.price}</TableCell>
                        <TableCell className="text-right">{item.sharePrice}</TableCell>
                        <TableCell className="text-right">{item.delta}</TableCell>
                        <TableCell className="text-right">{item.deltaPercent + "%"}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
