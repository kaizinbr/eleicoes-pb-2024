/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from 'next/server'

import csvToJson, { readCidadesComCod, readCandidatos, readCandidatoRow } from "@/handlers/readCsv";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const codSQ = searchParams.get('codSQ')! 
        // não pode ser o numero dele na urna!!! muita gente tem o mesmo numero
        // pode ser o numero SQ_CANDIDATO tipo 150001993150 pq é unico

        if (!codSQ) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Parâmetros inválidos",
            });
        }

        const result = readCandidatoRow(codSQ);

        return NextResponse.json({
            status: 200,
            success: true,
            message: "exibindo candidatos a partir do código da cidade e do cargo",
            código: codSQ,
            data: result,
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            success: false,
            message: "Ocorreu um erro ao processar a solicitação",
            // error: error?.message,
        });
    }
}
