/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import csvToJson, { readCidadesComCod, readCandidatos, readCandidatoRow, readGenero } from "@/utils/readCsv";

// type Params = {
//     team: string;
// };

export async function GET(request: Request) {
    const csvData = csvToJson();
    // sobrado 19020
    // joilson 13222

    // 11 pra prefeito, 13 pra vereador e 12 pra vice

    const result = readGenero("13");
    // console.log(candidatos);
    // csvData.forEach((data, index) => {
    //     // console.log(`Record ${index + 1}:`, data);

    // });

    return NextResponse.json({
        status: 200,
        message: "Not implemented yet",
        data: result,
    });
}
