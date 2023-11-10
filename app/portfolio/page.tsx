import PortfolioValue from "../account/chart";
import { Grid, Col } from "@tremor/react";
import TradeHistory from "@/components/tradeHistory";
import Assets from "../../components/assets";
import { SalesCard, ProfitCard, CustomersCard } from "@/components/metrics";
import PageTitle from "@/components/page-title";

export default function Portfolio() {
  return (
    <div className="flex flex-col gap-16">
        <PageTitle>portfolio</PageTitle>
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
