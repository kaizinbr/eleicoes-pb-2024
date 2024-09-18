/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import csvToJson, { readCidadesComCod, readCandidatos, readCandidatoRow } from "@/utils/readCsv";

// type Params = {
//     team: string;
// };

export async function GET(request: Request) {
    const csvData = csvToJson();
    // sobrado 19020
    // joilson 13222

    const result = readCidadesComCod();

    return NextResponse.json({
        status: 200,
        success: true,
        message: "Exibindo cidades com seus respectivos códigos",
        length: result.length,
        data: result,
    });
}
