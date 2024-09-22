/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import { parse } from "csv-parse/sync";

/**
 * Converts a CSV file to an array of JSON objects where each row in the CSV becomes an object.
 * @param {string} filePath The path to the CSV file.
 * @returns {any[]} An array of objects, each representing a row in the CSV.
 */
export default function csvToJson(filePath?: string): any[] {

    filePath = filePath || "public/data/consulta_cand_2024_PB.csv"; // vai ser um endereço fixo

    const csvFile = fs.readFileSync(filePath, 'utf8');
    const records = parse(csvFile, {
        delimiter: ";", // Especifique o delimitador correto
        columns: true, // Se o CSV tem cabeçalhos
        trim: true,
        skip_empty_lines: true,
        encoding: "latin1",
    });
    return records;
}