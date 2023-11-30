import {expect, test } from "vitest";
import { toFloat } from "../function";

test("toFloat", ()=>{
    expect(toFloat("10,000")).toBe(10000);
    expect(toFloat("1000")).toBe(1000);
    expect(toFloat("1000.01")).toBe(1000.01);
    expect(toFloat("")).toBe("");
    expect(toFloat("10,000.001001")).toBe(10_000.001001)
})