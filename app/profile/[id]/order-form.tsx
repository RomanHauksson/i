import { SubmitOrderButton } from "./submit-order-button";
import { submitOrder } from "@/app/actions";

interface OrderFormProps {
    stockId: string;
}

export default async function OrderForm( { stockId } : OrderFormProps ) {
    return(
        <form action={submitOrder} className="flex flex-col gap-2">
            <input name="share-price" type="number" placeholder="enter price per share"/>
            <input name="num-shares" type="number" placeholder="enter number of shares to buy"/>
            <input name="stock-id" type="hidden" value={stockId}/>
            <select name="order-type">
                <option value="buy">buy</option>
                <option value="sell">sell</option>
            </select>
            <SubmitOrderButton />
        </form>
    );
}