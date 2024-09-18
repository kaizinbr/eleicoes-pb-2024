/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
    Autocomplete,
    AutocompleteProps,
    Avatar,
    Group,
    Text,
} from "@mantine/core";
import axios from "axios";

const largeData = Array(100_000)
    .fill(0)
    .map((_, index) => `Option ${index}`);

export default function SelectCargo({
    cargo,
    setCargo,
}: {
    cargo: string;
    setCargo: (cargo: string) => void;
}) {
    const [data, setData] = useState<string[]>(["11 - Prefeito", "12 - Vice-Prefeito", "13 - Vereador"]);
    const [value, setValue] = useState("");

    return (
        <Autocomplete
            label="Selecione o cargo"
            placeholder="Digite o nome ou o código da cargo"
            limit={50}
            value={cargo}
            onChange={setCargo}
            data={data}
        />
    );
}
