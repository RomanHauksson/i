import PortfolioValue from "./portfolioValue";
import { Grid, Col } from "@tremor/react";
import TradeHistory from "./tradeHistory";
import Assets from "./assets";
import { SalesCard, ProfitCard, CustomersCard } from "./metrics";

export default function Page() {
  return (
    <div className="flex flex-col gap-16">
        <div className="flex h-[96px] items-end">
            <h1>portfolio</h1>
        </div>
        <Grid numItems={3} className="gap-2">
            <SalesCard />
            <ProfitCard />
            <CustomersCard />
            <Col numColSpan={3}>
                <PortfolioValue />
            </Col>
            <Col numColSpan={3}>
                <Assets />
            </Col>
            <Col numColSpan={3}>
                <TradeHistory />
            </Col>
        </Grid>
    </div>
  );
}
