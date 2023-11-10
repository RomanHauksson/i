import { getLatestPrice } from "@/app/actions";

export default async function Price({ stockId }: {stockId: string}) {
    const latestPrice = await getLatestPrice(stockId);
    if (latestPrice == null) {
        return(<div></div>);
    }
    return(
        <div className="inline-flex items-end gap-2 relative flex-[0_0_auto]">
            <div className="text-2xl">
                ₭ {latestPrice}
            </div>
            {/* <div className="relative w-fit font-h-3 font-[number:var(--h-3-font-weight)] text-[#0a7121] text-[length:var(--h-3-font-size)] tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] whitespace-nowrap [font-style:var(--h-3-font-style)]">
            +1.2%
            </div> */}
        </div>
    );
}