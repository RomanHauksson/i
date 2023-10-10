"use client";

import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  Text,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Title,
} from "@tremor/react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Trade {
  id: number;
  date: string;
  symbol: string;
  shares: number;
  price: number;
  currentPrice: number;
  delta: number;
  deltaPercent: number;
}

const trades: Trade[] = [
  {
    id: 1,
    date: "2022-01-01",
    symbol: "AAPL",
    shares: 100,
    price: 150,
    currentPrice: 155,
    delta: 5,
    deltaPercent: 3.33,
  },
  {
    id: 2,
    date: "2022-01-02",
    symbol: "GOOG",
    shares: 50,
    price: 2000,
    currentPrice: 2050,
    delta: 50,
    deltaPercent: 2.5,
  },
  {
    id: 3,
    date: "2022-01-03",
    symbol: "TSLA",
    shares: 25,
    price: 1000,
    currentPrice: 950,
    delta: -50,
    deltaPercent: -5,
  },
  {
    id: 4,
    date: "2022-01-04",
    symbol: "AMZN",
    shares: 75,
    price: 3000,
    currentPrice: 3100,
    delta: 100,
    deltaPercent: 3.33,
  },
  {
    id: 5,
    date: "2022-01-05",
    symbol: "MSFT",
    shares: 200,
    price: 250,
    currentPrice: 260,
    delta: 10,
    deltaPercent: 4,
  },
  {
    id: 6,
    date: "2022-01-06",
    symbol: "FB",
    shares: 150,
    price: 300,
    currentPrice: 290,
    delta: -10,
    deltaPercent: -3.33,
  },
  {
    id: 7,
    date: "2022-01-07",
    symbol: "NFLX",
    shares: 50,
    price: 500,
    currentPrice: 480,
    delta: -20,
    deltaPercent: -4,
  },
  {
    id: 8,
    date: "2022-01-08",
    symbol: "NVDA",
    shares: 100,
    price: 400,
    currentPrice: 420,
    delta: 20,
    deltaPercent: 5,
  },
  {
    id: 9,
    date: "2022-01-09",
    symbol: "PYPL",
    shares: 75,
    price: 200,
    currentPrice: 210,
    delta: 10,
    deltaPercent: 5,
  },
  {
    id: 10,
    date: "2022-01-10",
    symbol: "V",
    shares: 150,
    price: 250,
    currentPrice: 240,
    delta: -10,
    deltaPercent: -4,
  },
];

export default function TradeHistory() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (): any => setIsOpen(true);
  const closeModal = (): any => setIsOpen(false);

  return (
    <>
      <Card className="relative mx-auto h-96 overflow-hidden">
        <Title>trade history</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell className="text-right">date</TableHeaderCell>
              <TableHeaderCell className="text-right">symbol</TableHeaderCell>
              <TableHeaderCell className="text-right">shares</TableHeaderCell>
              <TableHeaderCell className="text-right">trade price</TableHeaderCell>
              <TableHeaderCell className="text-right">current price</TableHeaderCell>
              <TableHeaderCell className="text-right">return</TableHeaderCell>
              {/* <TableHeaderCell className="text-right"></TableHeaderCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {trades.map((item) => (
              <TableRow key={item.id}>
                <TableCell><Image className="rounded-full" src="/Roman.jpg" width={32} height={32} alt={"Avatar for Roman"}/></TableCell>
                <TableCell className="text-right">
                  <Text>{item.date}</Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text>{item.symbol}</Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text>{item.shares}</Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text>{item.price}</Text>
                </TableCell>
                <TableCell className="text-right">
                  <Text>{item.currentPrice}</Text>
                </TableCell>
                {/* <TableCell className="text-right">
                  <Text>{item.delta}</Text>
                </TableCell> */}
                <TableCell className="text-right">
                  <Text>{item.deltaPercent}%</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-12 pb-8 absolute rounded-b-lg">
          <Button
            icon={ArrowsPointingOutIcon}
            className="bg-white shadow-md border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
            onClick={openModal}
          >
            Show more
          </Button>
        </div>
      </Card>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-xl transform overflow-hidden ring-tremor bg-white
                                    p-6 text-left align-middle shadow-tremor transition-all rounded-xl"
                >
                  <div className="relative mt-3">
                    <Table className="h-[450px]">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell></TableHeaderCell>
                          <TableHeaderCell className="text-right">date</TableHeaderCell>
                          <TableHeaderCell className="text-right">symbol</TableHeaderCell>
                          <TableHeaderCell className="text-right">shares</TableHeaderCell>
                          <TableHeaderCell className="text-right">trade price</TableHeaderCell>
                          <TableHeaderCell className="text-right">current price</TableHeaderCell>
                          <TableHeaderCell className="text-right">return</TableHeaderCell>
                          {/* <TableHeaderCell className="text-right"></TableHeaderCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trades.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell><Image className="rounded-full" src="/Roman.jpg" width={32} height={32} alt={"Avatar for Roman"}/></TableCell>
                            <TableCell className="text-right">
                              <Text>{item.date}</Text>
                            </TableCell>
                            <TableCell className="text-right">
                              <Text>{item.symbol}</Text>
                            </TableCell>
                            <TableCell className="text-right">
                              <Text>{item.shares}</Text>
                            </TableCell>
                            <TableCell className="text-right">
                              <Text>{item.price}</Text>
                            </TableCell>
                            <TableCell className="text-right">
                              <Text>{item.currentPrice}</Text>
                            </TableCell>
                            {/* <TableCell className="text-right">
                              <Text>{item.delta}</Text>
                            </TableCell> */}
                            <TableCell className="text-right">
                              <Text>{item.deltaPercent}%</Text>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-white z-0 h-20 w-full" />
                    </Table>
                  </div>
                  <Button
                    className="mt-5 w-full bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300"
                    onClick={closeModal}
                  >
                    Go back
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
