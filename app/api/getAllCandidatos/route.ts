/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, type NextRequest } from 'next/server'

import {  readCandidatos } from "@/utils/readCsv";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const cidade = searchParams.get('cidade')!
        const cargo = searchParams.get('cargo')!

        if (!cidade || !cargo) {
            return NextResponse.json({
                status: 400,
                success: false,
                message: "Parâmetros inválidos",
            });
        }

        const result = readCandidatos(cidade, cargo);

        return NextResponse.json({
            status: 200,
            success: true,
            message: "exibindo candidatos a partir do código da cidade e do cargo",
            cidade: cidade,
            cargo: cargo,
            length: result.length,
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
