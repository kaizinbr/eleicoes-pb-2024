/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import csvToJson, { readCidadesComCod, readCandidatos, readCandidatoRow, readGrauDeInstrucao } from "@/handlers/readCsv";

// type Params = {
//     team: string;
// };

export async function GET(request: Request) {
    const csvData = csvToJson("data/consulta_cand_2024_PB.csv");
    // sobrado 19020
    // joilson 13222

    const result = readGrauDeInstrucao();
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
