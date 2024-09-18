/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from "next/server";

import csvToJson, {
    readCidadesComCod,
    readCandidatos,
    readCandidatoRow,
    readGrauDeInstrucao,
} from "@/utils/readCsv";

export async function GET(request: NextRequest) {
    try {

        
        const searchParams = request.nextUrl.searchParams
        const cod = searchParams.get('cod')! // codigo do cargo nao pode ser nulo

        // 11 pra prefeito, 13 pra vereador e 12 pra vice
        const result = readGrauDeInstrucao(cod);

        return NextResponse.json({
            status: 200,
            success: true,
            message: "exibindo estatisticas por genero",
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
