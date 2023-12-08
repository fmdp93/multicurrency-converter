import {expect, test} from "vitest";
import { CurrencyConverter } from "../CurrencyConverter";

test("CurrencyConverter", ()=>{
    let objCurrencyConvert = new CurrencyConverter("PHP", "100", 50, 1, "USD");
    expect(objCurrencyConvert.getConversion()).toBe("");
})