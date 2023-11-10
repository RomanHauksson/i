import { SubmitOrderButton } from "./submit-order-button";
import { submitOrder } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrderFormProps {
    stockId: string;
}

export default async function OrderForm( { stockId } : OrderFormProps ) {
    return(
        <form action={submitOrder} className="flex flex-col gap-2">
            <Label htmlFor="share-price">price per share</Label>
            <Input id="share-price" name="share-price" type="number" placeholder="1"/>
            <Label htmlFor="num-shares">number of shares</Label>
            <Input id="num-shares" name="num-shares" type="number" placeholder="10"/>
            <Input id="stock-id" name="stock-id" type="hidden" value={stockId}/>
            <select name="order-type">
                <option value="buy">buy</option>
                <option value="sell">sell</option>
            </select>
            <SubmitOrderButton />
        </form>
    );
}