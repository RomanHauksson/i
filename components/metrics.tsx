"use client";

import { Card, Metric, Text, Flex, BadgeDelta, DeltaType, Grid } from "@tremor/react";

const categories: {
    title: string;
    metric: string;
    metricPrev: string;
    delta: string;
    deltaType: DeltaType;
}[] = [
    {
        title: "holding value",
        metric: "$ 45,564",
        metricPrev: "$ 40,598",
        delta: "12.2%",
        deltaType: "moderateIncrease",
    },
    {
        title: "total invested",
        metric: "$ 12,699",
        metricPrev: "$ 14,523",
        delta: "12.8%",
        deltaType: "moderateDecrease",
    },
    {
        title: "profit",
        metric: "$ 32,865",
        metricPrev: "$ 26,075",
        delta: "26.0%",
        deltaType: "moderateIncrease",
    },
];

export function SalesCard() {
    const item = categories[0];
    return (
        <Card>
            <Flex alignItems="start">
                <Text>{item.title}</Text>
                <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
            </Flex>
            <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
                <Metric>{item.metric}</Metric>
                {/* <Text className="truncate">from {item.metricPrev}</Text> */}
            </Flex>
        </Card>
    );
}

export function ProfitCard() {
    const item = categories[1];
    return (
        <Card>
            <Flex alignItems="start">
                <Text>{item.title}</Text>
                <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
            </Flex>
            <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
                <Metric>{item.metric}</Metric>
                {/* <Text className="truncate">from {item.metricPrev}</Text> */}
            </Flex>
        </Card>
    );
}

export function CustomersCard() {
    const item = categories[2];
    return (
        <Card>
            <Flex alignItems="start">
                <Text>{item.title}</Text>
                <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
            </Flex>
            <Flex justifyContent="start" alignItems="baseline" className="truncate space-x-3">
                <Metric>{item.metric}</Metric>
                {/* <Text className="truncate">from {item.metricPrev}</Text> */}
            </Flex>
        </Card>
    );
}