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
    Chip
} from "@mantine/core";
import axios from "axios";

import classes from "@/styles/Main.module.css";

export default function SelectCidade({
    cidade,
    setCidade,
}: {
    cidade: string;
    setCidade: (cidade: string) => void;
}) {
    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/getCod/cidades");

                const result = response.data.data.map((cidade: any) => {
                    return `${cidade[0]} - ${cidade[1]}`;
                });

                // console.log(result);
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <Autocomplete
            label="Selecione a cidade"
            placeholder="Digite o nome ou o código da cidade"
            limit={50}
            value={cidade}
            onChange={setCidade}
            data={data}
            disabled={loading}
            comboboxProps={{ shadow: "md" }}
            classNames={{
                input: classes.input + " mb-3",
                dropdown: classes.dropdown,
                option: classes.option,
                label: "mb-2",
            }}
        />
    );
}
