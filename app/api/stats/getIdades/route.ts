/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from 'next/server'

import { readIdades } from "@/utils/readCsv";

export async function GET(request: NextRequest) {
    try {

        

        const result = readIdades();

        return NextResponse.json({
            status: 200,
            success: true,
            message: "exibindo estatisticas de idade",
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
